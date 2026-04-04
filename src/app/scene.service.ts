import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SimulationService } from './simulation.service';

// Zone 8: 6 horizontal lanes, trucks sit at registration booths on the LEFT side
const LANE_ZS = [-8, -12, -16, -26, -30, -34]; // z positions: lanes 1-3 (4 apart), gap for GKO, lanes 4-6
// 4 slot positions per lane: 1 at booth (processing) + 3 waiting in line — far left in X
const SLOT_XS = [-36, -33, -27, -21];
const MAX_LANE = 4;
// Zone 9: Накопитель — 10 lanes × 10 slots = 100 capacity, north of main road (positive Z)
const NAK_LANE_ZS = [7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const NAK_SLOT_XS = [-11, -15.5, -20, -24.5, -29, -33.5, -38, -42.5, -47, -51.5];
const NAK_MAX_PER_LANE = 10;
// Main road: east→west along z=0 — extended east to X=65
const MAIN_ROAD: [number, number][] = [[65, 0], [60, 0], [55, 0], [50, 0], [45, 0], [40, 0], [35, 0], [30, 0], [25, 0], [20, 0], [15, 0], [10, 0], [5, 0], [0, 0], [-5, 0], [-10, 0], [-20, 0], [-30, 0], [-40, 0], [-50, 0], [-55, 0]];
const BRANCH_ROAD: [number, number][] = [[5, 0], [5, -3], [5, -6], [5, -9]];
const TRUCK_COLORS = [
  0xc0392b, 0x2980b9, 0x27ae60, 0xe67e22, 0x8e44ad, 0x16a085, 0xd35400, 0x2c3e50,
  0xf1c40f, 0xe74c3c, 0x1abc9c, 0x3498db, 0x9b59b6, 0xe67e22, 0x2ecc71, 0xf39c12,
  0x1a5276, 0x6c3483, 0x0e6655, 0x784212, 0x1b2631, 0x922b21, 0x1a7a4a, 0xd4ac0d,
  0x5d6d7e, 0xff6b6b, 0x48dbfb, 0xff9f43, 0x1dd1a1, 0xa29bfe,
];

interface TruckObj {
  id: number; root: THREE.Group; wheels: THREE.Object3D[];
  speed: number; heading: THREE.Vector3;
  yaw: number; steeringAngle: number;
  target: THREE.Vector3 | null; wpQueue: THREE.Vector3[];
  wpDone: (() => void) | null; inSlot: boolean;
  waitTimer: number; zoneIdx: number;
  zonePath: ZoneNode[]; skipZ9: boolean; laneAssigned: number;
  isLarge: boolean;
  enpBlink: ReturnType<typeof setInterval> | null;
}
interface LaneData { trucks: TruckObj[]; elapsed: number[]; remaining: number[]; }
interface ZoneNode {
  id: number; minT: number; maxT: number;
  entryPt: THREE.Vector3; preWps: THREE.Vector3[];
  slotsByLane: THREE.Vector3[][]; lanes: LaneData[];
  sequential: boolean; maxPerLane: number; nextLane: number;
}

@Injectable({ providedIn: 'root' })
export class SceneService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private raf = 0; private clock = new THREE.Clock();
  private trucks: TruckObj[] = []; private zones: ZoneNode[] = [];
  private zone8!: ZoneNode; private zone9!: ZoneNode; private truckGroup!: THREE.Group;
  private idCounter = 1; private spawnTimer = 0; private nextSpawn = 5;
  private z8Queue: TruckObj[] = []; private z9Queue: TruckObj[] = [];
  private truckTemplate: THREE.Group | null = null; private templateReady = false; private glbRotY = 0;
  private largeTruckTemplate: THREE.Group | null = null;
  private tlRed!: THREE.MeshStandardMaterial; private tlGreen!: THREE.MeshStandardMaterial;
  private roadMat!: THREE.MeshStandardMaterial; private roadScroll = 0;
  private focus = new THREE.Vector3(-10, 0, -10);
  private dist = 65; private pitch = 45; private yaw = 0;

  zoom(factor: number) {
    this.dist = THREE.MathUtils.clamp(this.dist * factor, 5, 180);
    this.applyCamera();
  }

  setView(preset: 'top' | 'front' | 'left' | 'right') {
    const views: Record<string, { yaw: number; pitch: number; dist: number }> = {
      top:   { yaw: 0,   pitch: 85, dist: 80 },
      front: { yaw: 180, pitch: 20, dist: 75 },
      left:  { yaw: 90,  pitch: 30, dist: 75 },
      right: { yaw: -90, pitch: 30, dist: 75 },
    };
    const v = views[preset];
    this.yaw = v.yaw; this.pitch = v.pitch; this.dist = v.dist;
    this.applyCamera();
  }

  resetView() {
    this.focus.set(-10, 0, -10);
    this.dist = 65; this.pitch = 45; this.yaw = 0;
    this.applyCamera();
  }
  private dragging = false; private lastXY = { x: 0, y: 0 };
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private tooltipEl: HTMLDivElement | null = null;
  private labelMap = new Map<THREE.Object3D, string>();

  constructor(private sim: SimulationService) {}

  init(ref: ElementRef<HTMLCanvasElement>) {
    const el = ref.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas: el, antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.setSize(el.clientWidth, el.clientHeight, false);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x6490c8);
    this.scene.fog = new THREE.FogExp2(0x8aaac4, 0.005);
    this.camera = new THREE.PerspectiveCamera(58, el.clientWidth / el.clientHeight, 0.3, 400);
    this.applyCamera();
    this.buildLights(); this.buildGround(); this.buildMountains();
    this.buildRoad(); this.buildZoneNodes(); this.buildBuildings();
    this.buildZone8Lanes();
    this.buildGate(); this.buildTrafficLight(); this.buildMonitoringPanel();
    this.buildZone9Fence(); this.buildZone9Lanes();
    this.truckGroup = new THREE.Group();
    this.scene.add(this.truckGroup);
    this.loadTruckTemplates().then(() => { this.spawnTruck(); });
    this.createTooltip(el); this.bindEvents(el); this.loop();
  }

  destroy() { cancelAnimationFrame(this.raf); this.renderer.dispose(); }
  resize(w: number, h: number) {
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  private loop() {
    this.raf = requestAnimationFrame(() => this.loop());
    const raw = Math.min(this.clock.getDelta(), 0.1);
    this.sim.tickTime(raw);
    if (!this.sim.isPaused()) {
      this.tickSpawn(raw); this.tickZones(raw); this.tickTrucks(raw);
      this.roadScroll += raw * 0.12;
      if (this.roadMat.map) this.roadMat.map.offset.y = this.roadScroll;
    }
    this.updateTrafficLight(); this.updatePanelMats();
    this.renderer.render(this.scene, this.camera);
  }

  private applyCamera() {
    const yr = THREE.MathUtils.degToRad(this.yaw), pr = THREE.MathUtils.degToRad(this.pitch);
    const off = new THREE.Vector3(Math.cos(pr) * Math.sin(yr), Math.sin(pr), Math.cos(pr) * Math.cos(yr)).multiplyScalar(this.dist);
    this.camera.position.copy(this.focus).add(off); this.camera.lookAt(this.focus);
  }

  private bindEvents(el: HTMLCanvasElement) {
    el.addEventListener('wheel', e => {
      this.dist = THREE.MathUtils.clamp(this.dist * (e.deltaY > 0 ? 1.1 : 0.9), 5, 180); this.applyCamera();
    }, { passive: true });
    el.addEventListener('mousedown', e => { this.dragging = true; this.lastXY = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mouseup', () => { this.dragging = false; });
    window.addEventListener('mousemove', e => {
      if (this.dragging) {
        const dx = e.clientX - this.lastXY.x, dy = e.clientY - this.lastXY.y;
        this.lastXY = { x: e.clientX, y: e.clientY };
        const right = new THREE.Vector3().crossVectors(this.camera.getWorldDirection(new THREE.Vector3()), THREE.Object3D.DEFAULT_UP).normalize();
        const fwd = new THREE.Vector3(-right.z, 0, right.x).normalize();
        this.focus.addScaledVector(right, -dx * this.dist * 0.0009);
        this.focus.addScaledVector(fwd, dy * this.dist * 0.0009);
        this.applyCamera();
      }
      const rect = el.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.updateTooltip(e.clientX, e.clientY);
    });
  }

  private createTooltip(el: HTMLCanvasElement) {
    this.tooltipEl = document.createElement('div');
    Object.assign(this.tooltipEl.style, {
      position: 'fixed', pointerEvents: 'none', zIndex: '1000',
      background: 'rgba(10,14,24,0.92)', color: '#ccd8ee',
      padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
      fontFamily: 'Segoe UI, Arial, sans-serif', lineHeight: '1.5',
      border: '1px solid #2a3a5a', display: 'none', maxWidth: '220px',
    });
    el.parentElement!.appendChild(this.tooltipEl);
  }

  private updateTooltip(mx: number, my: number) {
    if (!this.tooltipEl) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    let label = '';
    for (const hit of this.raycaster.intersectObjects(this.scene.children, true)) {
      let obj: THREE.Object3D | null = hit.object;
      while (obj) {
        if (this.labelMap.has(obj)) { label = this.labelMap.get(obj)!; break; }
        const truck = this.trucks.find(t => t.root === obj);
        if (truck) {
          const zn = truck.zoneIdx >= 0 && truck.zoneIdx < truck.zonePath.length ? `Зона ${truck.zonePath[truck.zoneIdx].id}` : 'Транзит';
          label = `ТС #${truck.id}\n${truck.inSlot ? 'Обработка' : 'Движение'}\n${zn}${truck.laneAssigned >= 0 ? ` | П.${truck.laneAssigned + 1}` : ''}`;
          break;
        }
        obj = obj.parent;
      }
      if (label) break;
    }
    if (label) {
      this.tooltipEl.innerHTML = label.replace(/\n/g, '<br>');
      Object.assign(this.tooltipEl.style, { display: 'block', left: (mx + 14) + 'px', top: (my + 14) + 'px' });
    } else { this.tooltipEl.style.display = 'none'; }
  }

  private registerLabel(obj: THREE.Object3D, label: string) { this.labelMap.set(obj, label); }

  private M(geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, cast = false, rx = 0, ry = 0, rz = 0): THREE.Mesh {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz);
    m.castShadow = cast; m.receiveShadow = true; this.scene.add(m); return m;
  }

  private buildLights() {
    const sun = new THREE.DirectionalLight(0xfff4e8, 2.8);
    sun.position.set(35, 70, 25); sun.castShadow = true; sun.shadow.mapSize.setScalar(2048);
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 160;
    sun.shadow.camera.left = sun.shadow.camera.bottom = -60; sun.shadow.camera.right = sun.shadow.camera.top = 60;
    sun.shadow.bias = -0.001; this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x88b4e8, 0.55); fill.position.set(-15, 25, -10); this.scene.add(fill);
    this.scene.add(new THREE.AmbientLight(0xb8ccf0, 0.75));
  }

  private buildGround() {
    this.M(new THREE.PlaneGeometry(320, 260), new THREE.MeshStandardMaterial({ color: 0xb0a080, roughness: 0.97 }), 0, 0, -10, false, -Math.PI / 2);
  }

  private buildMountains() {
    const mk = (x: number, z: number, h: number, r: number, c: number) => {
      const g = new THREE.Group();
      const m = (cr: number, rs: number, rr: number, rh: number, py: number) => {
        const mesh = new THREE.Mesh(new THREE.ConeGeometry(rr, rh, 7), new THREE.MeshStandardMaterial({ color: cr, roughness: rs, flatShading: true }));
        mesh.position.y = py; g.add(mesh);
      };
      m(c, 0.94, r, h, h / 2); m(new THREE.Color(c).multiplyScalar(0.72).getHex(), 0.96, r * 0.65, h * 0.45, h * 0.52);
      m(0xe8eef8, 0.88, r * 0.35, h * 0.28, h * 0.86); g.position.set(x, 0, z); this.scene.add(g);
    };
    mk(-55, -85, 62, 34, 0x7a7870); mk(-25, -95, 70, 42, 0x6e6c68);
    mk(12, -105, 78, 48, 0x686664); mk(52, -90, 62, 38, 0x72706c);
    mk(85, -65, 50, 30, 0x787470); mk(-95, -55, 55, 32, 0x706e6c);
    mk(-105, -22, 44, 27, 0x747270); mk(95, -22, 42, 24, 0x787672);
    mk(-72, 25, 40, 24, 0x6e6c68); mk(72, 28, 45, 28, 0x706e6a);
    mk(30, -125, 88, 55, 0x646260); mk(-48, -115, 82, 50, 0x626060);
  }

  private buildRoad() {
    const S = 512, c = document.createElement('canvas'); c.width = c.height = S;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#303038'; ctx.fillRect(0, 0, S, S);
    for (let i = 0; i < 1600; i++) { const v = 38 + Math.random() * 24; ctx.fillStyle = `rgb(${v},${v},${v})`; ctx.fillRect(Math.random() * S, Math.random() * S, 1.5, 1.5); }
    ctx.setLineDash([68, 48]); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,255,170,0.48)';
    ctx.beginPath(); ctx.moveTo(S / 2, 0); ctx.lineTo(S / 2, S); ctx.stroke();
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 4);
    this.roadMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.88, metalness: 0.03, color: 0x484850 });
    // Main road segments
    const mkRoad = (pts: [number, number][]) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
        const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz);
        const m = new THREE.Mesh(new THREE.BoxGeometry(len, 0.04, 3.6), this.roadMat);
        m.position.set((ax + bx) / 2, 0.02, (az + bz) / 2);
        m.rotation.y = -Math.atan2(dz, dx); m.receiveShadow = true; this.scene.add(m);
      }
    };
    mkRoad(MAIN_ROAD);
    mkRoad(BRANCH_ROAD);
    // VGK area road surface
    this.M(new THREE.BoxGeometry(8, 0.04, 8), this.roadMat, 5, 0.02, -10);
    // Straight road from VGK west to registration lanes
    this.M(new THREE.BoxGeometry(30, 0.04, 4), this.roadMat, -10, 0.02, -13);
    // Zone 8 area road surface (lanes area + backyard behind booths)
    this.M(new THREE.BoxGeometry(32, 0.04, 32), this.roadMat, -29, 0.02, -21);
    // Exit road behind booths (backyard) connecting to exit
    this.M(new THREE.BoxGeometry(6, 0.04, 32), this.roadMat, -44, 0.02, -21);
    // Exit road: north from lanes to main road
    this.M(new THREE.BoxGeometry(3.6, 0.04, 10), this.roadMat, -45, 0.02, -2);
  }

  private buildBuildings() {
    const roofC = (c: number) => new THREE.Color(c).lerp(new THREE.Color(0x506070), 0.45);
    const b = (x: number, z: number, sx: number, sy: number, sz: number, col: number, lbl: string, tip: string) => {
      this.M(new THREE.BoxGeometry(sx + 0.35, 0.18, sz + 0.35), new THREE.MeshStandardMaterial({ color: 0x8a8880 }), x, 0.09, z);
      const wall = this.M(new THREE.BoxGeometry(sx, sy, sz), new THREE.MeshStandardMaterial({ color: col, roughness: 0.78 }), x, sy / 2, z, true);
      this.registerLabel(wall, tip);
      const rm = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.2, sy * 0.11, sz + 0.2), new THREE.MeshStandardMaterial({ color: roofC(col) }));
      rm.position.set(x, sy + sy * 0.055 - 0.02, z); rm.castShadow = true; this.scene.add(rm);
      this.registerLabel(rm, tip); this.addSprite(lbl, x, z, sy + 2.2, 2.4, 0.65);
    };
    // Погран. контроль — normal building on the side of road
    b(20, -4, 3.0, 2.5, 2.0, 0xd8dcc8, 'Погран.контроль', 'Пограничный контроль\nФиксация АТС\nВремя: 1 мин');
    // Весы (ВГК) — two wide bays, outer walls only, ground line divider
    const wTip = 'Весы (ВГК)\nВесогабаритный контроль\n2 полосы\nВремя: 3-5 мин';
    const wm = new THREE.MeshStandardMaterial({ color: 0xe8e0ce, roughness: 0.78 });
    // Left wall (x=1.5) and right wall (x=8.5) — shorter, open north/south for trucks
    const wl = this.M(new THREE.BoxGeometry(0.3, 3.0, 3.0), wm, 1.5, 1.5, -10, true); this.registerLabel(wl, wTip);
    this.M(new THREE.BoxGeometry(0.3, 3.0, 3.0), wm, 8.5, 1.5, -10, true);
    // Ground center line divider
    this.M(new THREE.BoxGeometry(0.08, 0.06, 3.0), new THREE.MeshStandardMaterial({ color: 0xffff88 }), 5, 0.03, -10);
    // Roof
    this.M(new THREE.BoxGeometry(7.5, 0.25, 4.0), new THREE.MeshStandardMaterial({ color: 0xd0ccc0, roughness: 0.8 }), 5, 3.15, -10, true);
    this.addSprite('Весы (ВГК)', 5, -10, 5.5, 3.0, 0.8);
    // ГКО — exit of Zone 8
    // ГКО — in the gap between lane 3 (z=-16) and lane 4 (z=-26)
    b(SLOT_XS[0] - 3, -21, 3.0, 2.8, 4.0, 0xe2d8c8, 'ГКО', 'ГКО\nГос. контроль отправлений');
    // Зона регистрации label
    this.addSprite('Зона регистрации', -28, -35, 5.0, 4.5, 0.9);
  }

  private buildZone8Lanes() {
    const lineM = new THREE.MeshStandardMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.7 });
    const lc = [0xc0d8ff, 0xccf0b8, 0xc0d8ff, 0xccf0b8, 0xc0d8ff, 0xccf0b8];
    for (let li = 0; li < LANE_ZS.length; li++) {
      const lz = LANE_ZS[li];
      // Lane strip — fits between booth gaps and within asphalt
      const stripW = SLOT_XS[SLOT_XS.length - 1] - SLOT_XS[0] + 2;
      const stripCx = (SLOT_XS[0] + SLOT_XS[SLOT_XS.length - 1]) / 2;
      this.M(new THREE.BoxGeometry(stripW, 0.05, 2.4), new THREE.MeshStandardMaterial({ color: lc[li], transparent: true, opacity: 0.35 }), stripCx, 0.025, lz);
      if (li < LANE_ZS.length - 1) this.M(new THREE.BoxGeometry(stripW, 0.02, 0.06), lineM, stripCx, 0.03, (lz + LANE_ZS[li + 1]) / 2);
      this.M(new THREE.BoxGeometry(0.08, 0.02, 1.2), lineM, SLOT_XS[0], 0.03, lz);
      // Booth sits BETWEEN this lane and next (offset by half spacing toward next lane)
      if (li < LANE_ZS.length - 1) {
        const boothZ = (lz + LANE_ZS[li + 1]) / 2;
        if (li !== 2) this.addBooth(SLOT_XS[0] - 3, boothZ, `П.${li + 1}`);
      }
    }
    // First booth above lane 1, last booth below lane 6
    this.addBooth(SLOT_XS[0] - 3, LANE_ZS[0] + 2, 'П.0');
    this.addBooth(SLOT_XS[0] - 3, LANE_ZS[LANE_ZS.length - 1] - 2, `П.${LANE_ZS.length}`);
    // One continuous overhead canopy across all lanes + booths above/below
    const ch = LANE_ZS[0] - LANE_ZS[LANE_ZS.length - 1] + 8;
    this.M(new THREE.BoxGeometry(2.6, 0.22, ch), new THREE.MeshStandardMaterial({ color: 0x2c4460, roughness: 0.7 }),
      SLOT_XS[0] - 3, 4.0, (LANE_ZS[0] + LANE_ZS[LANE_ZS.length - 1]) / 2, true);
  }

  private addBooth(x: number, z: number, label: string) {
    this.M(new THREE.BoxGeometry(2.0, 0.15, 1.6), new THREE.MeshStandardMaterial({ color: 0x282e38 }), x, 0.08, z);
    const wall = this.M(new THREE.BoxGeometry(1.8, 3.6, 1.4), new THREE.MeshStandardMaterial({ color: 0x4a6278, roughness: 0.75 }), x, 1.85, z, true);
    this.M(new THREE.BoxGeometry(0.06, 0.8, 0.9), new THREE.MeshStandardMaterial({ color: 0x88c0ee, transparent: true, opacity: 0.65, metalness: 0.35 }), x + 0.93, 2.2, z);
    //this.addSprite(label, x, z, 4.2, 1.1, 0.45);
    this.registerLabel(wall, `${label}\nКабина регистрации\nВремя: 20-25 мин`);
  }

  private buildBorderFence() {
    const postM = new THREE.MeshStandardMaterial({ color: 0xc0b8a8, roughness: 0.9 });
    const railM = new THREE.MeshStandardMaterial({ color: 0xb0a898, roughness: 0.85 });
    // Fence around zone 8 compound
    for (const [fx, fzStart, fzEnd] of [[-16, -6, -36], [-42, -6, -36]] as [number, number, number][]) {
      for (let fz = fzStart; fz >= fzEnd; fz -= 2.5) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, fx, 0.8, fz, true);
      const len = Math.abs(fzEnd - fzStart);
      this.M(new THREE.BoxGeometry(0.1, 0.1, len), railM, fx, 1.4, (fzStart + fzEnd) / 2);
      this.M(new THREE.BoxGeometry(0.1, 0.1, len), railM, fx, 0.75, (fzStart + fzEnd) / 2);
    }
  }

  private buildGate() {
    const pm = new THREE.MeshStandardMaterial({ color: 0x1e1e22, roughness: 0.75 });
    const bm = new THREE.MeshStandardMaterial({ color: 0xdd2222 });
    const wm = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    // Entry into zone 8 — no gate barrier needed
    // Exit gate — west end of lanes, before main road
    this.M(new THREE.CylinderGeometry(0.07, 0.08, 2.0, 8), pm, -43, 1.0, -2, true);
    this.M(new THREE.CylinderGeometry(0.07, 0.08, 2.0, 8), pm, -47, 1.0, -2, true);
    this.M(new THREE.CylinderGeometry(0.06, 0.06, 4, 8), bm, -45, 1.95, -2, true, 0, 0, Math.PI / 2);
    for (let si = 0; si < 3; si++) this.M(new THREE.BoxGeometry(0.5, 0.14, 0.14), wm, -46.2 + si * 1.2, 1.95, -1.98);
    this.addSprite('Ворота (выход)', -45, -2, 2.8, 3.0, 0.55);
  }

  private buildTrafficLight() {
    const g = new THREE.Group(); g.position.set(22, 0, -3);
    const a = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m);
    };
    a(new THREE.CylinderGeometry(0.055, 0.078, 2.2, 10), new THREE.MeshStandardMaterial({ color: 0x1a1a1e }), 0, 1.1, 0);
    a(new THREE.BoxGeometry(0.24, 0.56, 0.2), new THREE.MeshStandardMaterial({ color: 0x0e0e0e }), 0, 2.15, 0);
    this.tlRed = new THREE.MeshStandardMaterial({ color: 0xdd1111, emissive: 0x880808, emissiveIntensity: 0.2, roughness: 0.2 });
    a(new THREE.SphereGeometry(0.078, 12, 8), this.tlRed, 0, 2.3, 0.11);
    this.tlGreen = new THREE.MeshStandardMaterial({ color: 0x11dd22, emissive: 0x08aa10, emissiveIntensity: 1.5, roughness: 0.2 });
    a(new THREE.SphereGeometry(0.078, 12, 8), this.tlGreen, 0, 2.06, 0.11);
    this.scene.add(g); this.registerLabel(g, 'Светофор\nКонтроль входа ТС');
    // this.addSprite('Светофор', 25, -3, 3.0, 2.0, 0.55);
  }

  private updateTrafficLight() {
    const g = this.sim.isGreen();
    this.tlRed.emissiveIntensity = g ? 0.05 : 1.8; this.tlRed.color.set(g ? 0x440808 : 0xff1111);
    this.tlGreen.emissiveIntensity = g ? 1.8 : 0.05; this.tlGreen.color.set(g ? 0x11ff22 : 0x084408);
  }

  private screenCanvases: HTMLCanvasElement[] = [];
  private screenTextures: THREE.CanvasTexture[] = [];

  private buildMonitoringPanel() {
    const mkScreen = (gPos: [number, number, number], gRotY: number, sw: number, sh: number) => {
      const g = new THREE.Group(); g.position.set(...gPos); g.rotation.y = gRotY;
      const a = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
        const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m);
      };
      for (const px of [-sw / 2 - 0.15, sw / 2 + 0.15])
        a(new THREE.CylinderGeometry(0.055, 0.075, 3.4, 10), new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.7 }), px, -1.1, 0);
      // Dynamic screen — canvas texture with initial content
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 320;
      const ctx0 = cv.getContext('2d')!;
      ctx0.fillStyle = '#0a0e18'; ctx0.fillRect(0, 0, 512, 320);
      ctx0.fillStyle = '#88aaee'; ctx0.font = 'bold 28px Arial'; ctx0.textAlign = 'center';
      ctx0.fillText(`ПОЛОСЫ РЕГИСТРАЦИИ  0/${this.sim.maxCapacity()}`, 256, 32);
      for (let i = 0; i < 6; i++) {
        const y = 52 + i * 44;
        ctx0.fillStyle = '#8899bb'; ctx0.font = 'bold 22px Arial'; ctx0.textAlign = 'left';
        ctx0.fillText(`П.${i + 1}`, 10, y + 20);
        for (let s = 0; s < 4; s++) { ctx0.fillStyle = '#2a2a3a'; ctx0.fillRect(70 + s * 90, y + 2, 80, 28); }
        ctx0.fillStyle = '#88ccaa'; ctx0.font = '20px Arial'; ctx0.textAlign = 'right';
        ctx0.fillText('--', 502, y + 22);
      }
      const tex = new THREE.CanvasTexture(cv); tex.minFilter = THREE.LinearFilter;
      const screenMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), screenMat);
      screen.position.set(0, 0, -0.06);
      screen.rotation.y = Math.PI; // flip to face the same direction as group front
      g.add(screen);
      // Back panel
      a(new THREE.BoxGeometry(sw + 0.1, sh + 0.1, 0.06), new THREE.MeshStandardMaterial({ color: 0x1a1a24, roughness: 0.8 }), 0, 0, 0);
      this.scene.add(g); this.screenCanvases.push(cv); this.screenTextures.push(tex);
      this.registerLabel(g, 'Экран-распределитель\nЗагрузка полос регистрации');
    };
    mkScreen([16, 3.0, -4], Math.PI, 2.6, 1.6);
    mkScreen([-1, 3.0, -15], Math.PI, 2.2, 1.3);
    this.updatePanelMats(); // draw initial state so screens aren't black
  }

  private updatePanelMats() {
    const details = this.sim.laneDetails();
    const occ = this.sim.laneOccupancies();
    const total = occ.reduce((a, b) => a + b, 0);
    for (let si = 0; si < this.screenCanvases.length; si++) {
      const cv = this.screenCanvases[si], ctx = cv.getContext('2d')!;
      const W = cv.width, H = cv.height;
      // Background
      ctx.fillStyle = '#0a0e18'; ctx.fillRect(0, 0, W, H);
      // Title
      ctx.fillStyle = '#88aaee'; ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center';
      ctx.fillText(`ПОЛОСЫ РЕГИСТРАЦИИ  ${total}/${this.sim.maxCapacity()}`, W / 2, 32);
      // Lane rows
      for (let i = 0; i < 6; i++) {
        const y = 52 + i * 44, info = details[i], cnt = occ[i];
        // Lane label
        ctx.fillStyle = '#8899bb'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'left';
        ctx.fillText(`П.${i + 1}`, 10, y + 20);
        // 4 slot bars
        for (let s = 0; s < 4; s++) {
          const bx = 70 + s * 90, filled = s < cnt;
          const isProcessing = s === 0 && info.processing;
          ctx.fillStyle = filled ? (isProcessing ? '#22cc33' : '#ff9900') : '#2a2a3a';
          ctx.fillRect(bx, y + 2, 80, 28); ctx.strokeStyle = '#1a1a2a'; ctx.strokeRect(bx, y + 2, 80, 28);
        }
        // Remaining time
        ctx.fillStyle = '#88ccaa'; ctx.font = '20px Arial'; ctx.textAlign = 'right';
        ctx.fillText(info.processing ? `${info.remaining.toFixed(0)}м` : '--', W - 10, y + 22);
      }
      this.screenTextures[si].needsUpdate = true;
    }
  }

  private buildFlagPoles() {
    const pm = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.6, roughness: 0.4 });
    const fm = new THREE.MeshStandardMaterial({ color: 0xd50000, side: THREE.DoubleSide, roughness: 0.7 });
    for (const [x, z] of [[-20, -8], [-40, -36]]) {
      this.M(new THREE.CylinderGeometry(0.045, 0.055, 6.0, 8), pm, x, 3.0, z, true);
      this.M(new THREE.PlaneGeometry(1.0, 0.62), fm, x + 0.5, 5.7, z);
    }
  }

  private addSprite(text: string, x: number, z: number, y: number, w: number, h: number) {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
    const ctx = c.getContext('2d')!;
    // Bold dark background pill
    ctx.fillStyle = 'rgba(8,12,24,0.88)';
    ctx.beginPath(); ctx.roundRect(8, 8, 1008, 240, 24); ctx.fill();
    // Subtle border
    ctx.strokeStyle = 'rgba(136,170,238,0.5)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(8, 8, 1008, 240, 24); ctx.stroke();
    // Text — white, large, sharp
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 96px Arial';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = text.split('\n');
    const lineH = 104;
    const startY = 128 - ((lines.length - 1) * lineH) / 2;
    lines.forEach((l, i) => ctx.fillText(l, 512, startY + i * lineH));
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true, sizeAttenuation: true }));
    s.position.set(x, y, z); s.scale.set(w * 3.5, h * 3.5, 1); this.scene.add(s);
  }


  private loadGLB(path: string, scale: number, rotY = 0): Promise<THREE.Group | null> {
    return new Promise(resolve => {
      new GLTFLoader().load(path, gltf => {
        const wrapper = new THREE.Group(); const inner = gltf.scene;
        inner.scale.setScalar(scale); inner.rotation.y = rotY;
        inner.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
        wrapper.add(inner); resolve(wrapper);
      }, undefined, () => resolve(null));
    });
  }

  private async loadTruckTemplates(): Promise<void> {
    const [cargo, large] = await Promise.all([
      this.loadGLB('assets/models/truck.glb', 0.4),
      this.loadGLB('assets/models/large_truck.glb', 0.5, -Math.PI / 2),
    ]);
    if (cargo) { this.glbRotY = 0; cargo.children[0].position.y = 0.92; }
    this.truckTemplate = cargo ?? this.buildProceduralTruck(0xcc3322);
    this.templateReady = true;
    if (large) { large.children[0].position.y = 0.87; }
    this.largeTruckTemplate = large ?? this.buildProceduralLargeTruck(0x2244aa);
  }

  private buildProceduralLargeTruck(color: number): THREE.Group {
    const g = new THREE.Group(); const Y = 0.12;
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.15 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.9, 2.8), mat);
    body.position.set(0, Y + 0.5, -0.5); body.castShadow = true; g.add(body);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.85, 0.8),
      new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 }));
    cab.position.set(0, Y + 0.47, 1.2); cab.castShadow = true; g.add(cab);
    return g;
  }

  private buildProceduralTruck(color: number): THREE.Group {
    const g = new THREE.Group(); const Y = 0.12;
    const tmat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.12 });
    // Truck faces +Z: cab at +Z, trailer behind at -Z
    const trailer = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.55, 1.4), tmat);
    trailer.position.set(0, Y + 0.28, -0.35); trailer.castShadow = true; g.add(trailer);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.6), new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.28 }));
    cab.position.set(0, Y + 0.3, 0.7); cab.castShadow = true; g.add(cab);
    return g;
  }

  private tickSpawn(dt: number) {
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.nextSpawn) {
      this.spawnTimer = 0;
      const nextIsLarge = Math.random() < 0.30;
      // Only block spawn on red light for regular trucks
      if (!nextIsLarge && !this.sim.isGreen()) return;
      const last = this.trucks[this.trucks.length - 1];
      if (last && last.root.position.x > 55) return;
      this.spawnTruck(nextIsLarge);
      this.nextSpawn = this.sim.getSpawnIntervalSeconds();
    }
  }

  private spawnTruck(isLarge = false) {
    if (!this.templateReady || this.trucks.length >= 60) return;
    const id = this.idCounter++; const color = TRUCK_COLORS[(id - 1) % TRUCK_COLORS.length];
    let mesh: THREE.Group;
    const template = isLarge ? this.largeTruckTemplate : this.truckTemplate;
    if (template) {
      mesh = template.clone();
      if (!isLarge && this.glbRotY && mesh.children[0]) mesh.children[0].rotation.y = this.glbRotY;
      mesh.traverse(o => {
        if ((o as THREE.Mesh).isMesh) {
          const orig = (o as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (orig?.isMeshStandardMaterial) {
            const m = orig.clone();
            m.color.lerp(new THREE.Color(color), isLarge ? 0.2 : 0.45);
            (o as THREE.Mesh).material = m;
          }
        }
      });
    } else {
      mesh = isLarge ? this.buildProceduralLargeTruck(color) : this.buildProceduralTruck(color);
    }
    mesh.position.set(isLarge ? 65 : 35, 0, 0); mesh.rotation.y = 0;
    this.truckGroup.add(mesh); this.sim.truckEntered();
    const zonePath = isLarge
      ? [this.zones[0], this.zones[1], this.zone9]
      : [this.zones[0], this.zones[1], this.zone8];
    const t: TruckObj = {
      id, root: mesh, wheels: [], speed: 0, heading: new THREE.Vector3(-1, 0, 0),
      yaw: 0, steeringAngle: 0, target: null, wpQueue: [], wpDone: null,
      inSlot: false, waitTimer: 0, zoneIdx: -1,
      zonePath, skipZ9: false, laneAssigned: -1,
      isLarge, enpBlink: null,
    };
    this.trucks.push(t); this.advance(t);
  }

  private buildZoneNodes() {
    const z8Slots = LANE_ZS.map(lz => SLOT_XS.map(sx => new THREE.Vector3(sx, 0.15, lz)));
    const make = (id: number, minT: number, maxT: number, ex: number, ez: number,
      slotsPerLane: [number, number][][], preWps: [number, number][] = [], seq = false, mpl = 999): ZoneNode => ({
      id, minT, maxT, entryPt: new THREE.Vector3(ex, 0.15, ez),
      preWps: preWps.map(([x, z]) => new THREE.Vector3(x, 0.15, z)),
      slotsByLane: slotsPerLane.map(l => l.map(([x, z]) => new THREE.Vector3(x, 0.15, z))),
      lanes: slotsPerLane.map(() => ({ trucks: [], elapsed: [], remaining: [] })),
      sequential: seq, maxPerLane: mpl, nextLane: 0,
    });
    // Zone 1: Погран.контроль — stays on road center (0.5-1 min)
    this.zones.push(make(1, 0.5, 1, 20, 0, [[[20, 0]]]));
    // Zone 2: Весы (ВГК) — 2 bays at x=3.5 and x=6.5, z=-10, entry from north
    this.zones.push(make(2, 3, 5, 5, -6, [[[3.5, -10]], [[6.5, -10]]],
      [[17, 0], [10, 0], [5, 0], [5, -3], [5, -6]], false, 1));
    // Zone 8: Registration — 6 lanes far west, straight west road from VGK
    const z8 = make(8, 20, 25, -15, -13,
      z8Slots.map(lane => lane.map(v => [v.x, v.z] as [number, number])),
      [[5, -13], [0, -13], [-5, -13], [-10, -13], [-15, -13]], false, MAX_LANE);
    this.zones.push(z8); this.zone8 = z8;
    // Zone 9: Накопитель — 10 lanes north of main road, large vehicles only
    const z9 = make(9, 60, 120, -13, 4,
      NAK_LANE_ZS.map(lz => NAK_SLOT_XS.map(sx => [sx, lz] as [number, number])),
      [[-13, 0], [-13, 2], [-13, 4]], false, NAK_MAX_PER_LANE);
    this.zones.push(z9); this.zone9 = z9;
  }

  private tickZones(dt: number) {
    const sd = dt * this.sim.simSpeed();
    for (const zone of this.zones) {
      for (const lane of zone.lanes) {
        if (!lane.trucks.length) continue;
        lane.elapsed[0] += sd; lane.remaining[0] -= sd;
        if (lane.remaining[0] <= 0) {
          const done = lane.trucks.shift()!; lane.elapsed.shift(); lane.remaining.shift();
          // Shift remaining trucks forward to their new slot positions
          if (zone === this.zone8) {
            const li = done.laneAssigned;
            const slots = zone.slotsByLane[Math.min(li, zone.slotsByLane.length - 1)];
            for (let i = 0; i < lane.trucks.length; i++) {
              const s = slots[Math.min(i, slots.length - 1)];
              const tx = i === 0 ? s.x - 3 : s.x;
              this.moveTo(lane.trucks[i], new THREE.Vector3(tx, 0.15, LANE_ZS[li]));
            }
            if (lane.trucks.length) { lane.remaining[0] = this.rand(zone.minT, zone.maxT) + this.sim.laneDelays()[li]; }
          } else if (zone === this.zone9) {
            const li = done.laneAssigned;
            const slots = zone.slotsByLane[Math.min(li, zone.slotsByLane.length - 1)];
            for (let i = 0; i < lane.trucks.length; i++) {
              const s = slots[Math.min(i, slots.length - 1)];
              this.moveTo(lane.trucks[i], new THREE.Vector3(s.x, 0.15, NAK_LANE_ZS[li]));
            }
            if (lane.trucks.length) lane.remaining[0] = this.rand(zone.minT, zone.maxT);
          } else {
            if (lane.trucks.length) lane.remaining[0] = this.rand(zone.minT, zone.maxT);
          }
          this.advance(done);
        }
      }
    }
    this.sim.updateLanes(
      this.zone8.lanes.map(l => l.trucks.length),
      this.zone8.lanes.map(l => ({
        processing: l.trucks.length > 0,
        remaining: l.remaining[0] ?? 0,
        queueCount: Math.max(0, l.trucks.length - 1),
      })),
      this.z8Queue.length
    );
  }

  private advance(t: TruckObj) {
    t.inSlot = false; t.zoneIdx++;
    if (t.zoneIdx >= t.zonePath.length) { this.exitTruck(t); return; }
    // Truck leaving zone 1 (погран.контроль) = passed the traffic light (only regular trucks count)
    if (t.zoneIdx === 1 && !t.isLarge) this.sim.truckPassedLight();
    const zone = t.zonePath[t.zoneIdx];
    this.followPath(t, [...zone.preWps, zone.entryPt], () => this.tryEnter(t, zone));
  }

  private tryEnter(t: TruckObj, zone: ZoneNode) {
    if (!this.trucks.includes(t)) return;
    let li = -1;
    if (zone.sequential) {
      for (let a = 0; a < zone.lanes.length; a++) {
        const idx = zone.nextLane % zone.lanes.length; zone.nextLane++;
        if (zone.lanes[idx].trucks.length < zone.maxPerLane) { li = idx; break; }
      }
    } else {
      let best = Infinity;
      for (let i = 0; i < zone.lanes.length; i++) {
        const cnt = zone.lanes[i].trucks.length;
        if (cnt < zone.maxPerLane && cnt < best) { best = cnt; li = i; }
      }
    }
    if (li < 0) {
      t.waitTimer = 1.0;
      if (zone.id === 8) {
        if (!this.z8Queue.includes(t)) this.z8Queue.push(t);
        const qi = this.z8Queue.indexOf(t);
        this.moveTo(t, new THREE.Vector3(-15 + (qi + 1) * 2.5, 0.15, -13));
      }
      if (zone.id === 9) {
        if (!this.z9Queue.includes(t)) this.z9Queue.push(t);
        const qi = this.z9Queue.indexOf(t);
        this.moveTo(t, new THREE.Vector3(-13, 0.15, 2 + (qi + 1) * 3));
      }
      return;
    }
    if (zone.id === 8) this.z8Queue = this.z8Queue.filter(q => q !== t);
    if (zone.id === 9) { this.z9Queue = this.z9Queue.filter(q => q !== t); this.sim.nakopitelEntered(); }
    const lane = zone.lanes[li];
    const si = lane.trucks.length; // position in lane (0=at booth, 1-3=waiting)
    const slots = zone.slotsByLane[Math.min(li, zone.slotsByLane.length - 1)];
    const pos = slots[Math.min(si, slots.length - 1)];
    lane.trucks.push(t); lane.elapsed.push(0);
    const baseTime = si === 0 ? this.rand(zone.minT, zone.maxT) : 0;
    const delay = zone.id === 8 ? this.sim.laneDelays()[li] : 0;
    lane.remaining.push(baseTime + delay);
    t.inSlot = true; t.laneAssigned = li;
    if (zone.id === 8) this.sim.logDistribution(t.id, li);
    if (zone.id === 9) {
      const laneZ = NAK_LANE_ZS[li];
      this.followPath(t, [
        new THREE.Vector3(-10, 0.15, laneZ),
        new THREE.Vector3(pos.x, 0.15, laneZ),
      ], () => {});
    } else if (zone.id === 8) {
      const laneZ = LANE_ZS[li];
      const targetX = si === 0 ? pos.x - 3 : pos.x;
      this.followPath(t, [
        new THREE.Vector3(-16, 0.15, laneZ),
        new THREE.Vector3(targetX, 0.15, laneZ),
      ], () => {});
    } else if (zone.id === 2) {
      // VGK: move to bay x at entry z=-7, then straight south through building to slot
      this.followPath(t, [
        new THREE.Vector3(pos.x, 0.15, -7),
        new THREE.Vector3(pos.x, 0.15, pos.z),
      ], () => {});
    } else {
      this.moveTo(t, pos);
    }
  }

  private exitTruck(t: TruckObj) {
    if (t.isLarge) {
      const laneIdx = Math.max(0, Math.min(t.laneAssigned >= 0 ? t.laneAssigned : 0, NAK_LANE_ZS.length - 1));
      const lz = NAK_LANE_ZS[laneIdx];
      this.followPath(t, [
        new THREE.Vector3(-10, 0.15, lz),
        new THREE.Vector3(-8, 0.15, lz),
        new THREE.Vector3(-8, 0.15, 4),
        new THREE.Vector3(-8, 0.15, 0),
      ], () => {
        this.startEnpBlink(t);
        const ms = (this.rand(60, 120) / this.sim.simSpeed()) * 1000;
        setTimeout(() => {
          this.stopEnpBlink(t);
          this.sim.nakopitelExited();
          this.sim.truckExited(true);
          this.followPath(t, [
            new THREE.Vector3(-20, 0.15, 0),
            new THREE.Vector3(-55, 0.15, 0),
          ], () => { this.truckGroup.remove(t.root); this.trucks = this.trucks.filter(x => x !== t); });
        }, ms);
      });
    } else {
      this.sim.truckExited(false);
      const lz = t.laneAssigned >= 0 ? LANE_ZS[t.laneAssigned] : -15;
      this.followPath(t, [
        new THREE.Vector3(-40, 0.15, lz), new THREE.Vector3(-45, 0.15, lz),
        new THREE.Vector3(-45, 0.15, -2), new THREE.Vector3(-45, 0.15, 0),
        new THREE.Vector3(-50, 0.15, 0),
      ], () => { this.truckGroup.remove(t.root); this.trucks = this.trucks.filter(x => x !== t); });
    }
  }

  private startEnpBlink(t: TruckObj) {
    const light = new THREE.PointLight(0xffaa00, 0, 8);
    light.position.set(0, 2.5, 0);
    t.root.add(light);
    let on = false;
    t.enpBlink = setInterval(() => { on = !on; light.intensity = on ? 3.5 : 0; }, 500);
  }

  private stopEnpBlink(t: TruckObj) {
    if (t.enpBlink) { clearInterval(t.enpBlink); t.enpBlink = null; }
    const l = t.root.children.find(c => c instanceof THREE.PointLight);
    if (l) t.root.remove(l);
  }

  private moveTo(t: TruckObj, pos: THREE.Vector3, cb?: () => void) { t.target = pos.clone(); t.wpQueue = []; if (cb) t.wpDone = cb; }
  private followPath(t: TruckObj, wps: THREE.Vector3[], cb: () => void) { t.wpQueue = wps.map(p => p.clone()); t.wpDone = cb; t.target = null; this.stepPath(t); }
  private stepPath(t: TruckObj) { if (!t.wpQueue.length) { const cb = t.wpDone; t.wpDone = null; cb?.(); return; } t.target = t.wpQueue.shift()!; }

  private tickTrucks(dt: number) {
    const sd = this.sim.simSpeed(), sDt = dt * sd, redLight = !this.sim.isGreen();
    for (const t of this.trucks) {
      if (t.waitTimer > 0) { t.waitTimer -= sDt; if (t.waitTimer <= 0) this.tryEnter(t, t.zonePath[t.zoneIdx]); continue; }
      // Stop at red light — only freeze regular trucks at or before погран.контроль (zone 0)
      if (redLight && !t.inSlot && t.zoneIdx <= 0 && !t.isLarge) {
        t.speed = Math.max(0, t.speed - 10 * dt); continue;
      }
      // No target — brake
      if (!t.target) { t.speed = Math.max(0, t.speed - 10 * dt); continue; }
      const dx = t.target.x - t.root.position.x, dz = t.target.z - t.root.position.z;
      const dist = Math.hypot(dx, dz);
      // Reached target — clamp step to avoid overshooting
      if (dist < 0.5) {
        t.root.position.x = t.target.x; t.root.position.z = t.target.z;
        t.speed = 0; t.target = null;
        if (t.wpQueue.length) this.stepPath(t);
        else { const cb = t.wpDone; t.wpDone = null; cb?.(); }
        continue;
      }
      // Direction to target
      const dirX = dx / dist, dirZ = dz / dist;
      // Speed: accelerate, slow near target
      const maxSpd = 8 * sd;
      const desired = Math.min(maxSpd, maxSpd * Math.min(dist / 3.0, 1));
      t.speed += (desired - t.speed) * Math.min(8 * dt, 0.5);
      t.speed = THREE.MathUtils.clamp(t.speed, 0, maxSpd);
      // Move — clamp step to prevent overshooting
      const step = Math.min(t.speed * dt, dist - 0.4);
      if (step <= 0) { t.speed = 0; continue; }
      t.root.position.x += dirX * step;
      t.root.position.z += dirZ * step;
      // Face direction — use standard +Z forward formula
      t.root.rotation.y = Math.atan2(dirX, dirZ);
    }
  }


  private buildZone9Fence() {
    const postM = new THREE.MeshStandardMaterial({ color: 0xb8b0a0, roughness: 0.9 });
    const railM = new THREE.MeshStandardMaterial({ color: 0xa8a098, roughness: 0.85 });
    const gateBarM = new THREE.MeshStandardMaterial({ color: 0xdd2222 });
    // Fence bounds: X=-10..-52, Z=6..36
    const X0 = -10, X1 = -52, Z0 = 6, Z1 = 36;
    // South fence (Z=Z0), gap at X=-11..-17 (entry gate)
    for (let x = X0; x >= X1; x -= 2.5) {
      if (x > -11 || x < -17) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, x, 0.8, Z0, true);
    }
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X1 - (-17))), railM, (X1 + (-17)) / 2, 1.4, Z0);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X1 - (-17))), railM, (X1 + (-17)) / 2, 0.75, Z0);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X0 - (-11))), railM, (X0 + (-11)) / 2, 1.4, Z0);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X0 - (-11))), railM, (X0 + (-11)) / 2, 0.75, Z0);
    // Entry gate bar (south face, over entry gap)
    this.M(new THREE.BoxGeometry(6, 0.18, 0.18), gateBarM, -14, 2.2, Z0, true);
    // North fence (Z=Z1)
    for (let x = X0; x >= X1; x -= 2.5) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, x, 0.8, Z1, true);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X1 - X0)), railM, (X0 + X1) / 2, 1.4, Z1);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Math.abs(X1 - X0)), railM, (X0 + X1) / 2, 0.75, Z1);
    // West fence (X=X1)
    for (let z = Z0; z <= Z1; z += 2.5) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, X1, 0.8, z, true);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Z1 - Z0), railM, X1, 1.4, (Z0 + Z1) / 2, false, 0, Math.PI / 2);
    this.M(new THREE.BoxGeometry(0.1, 0.1, Z1 - Z0), railM, X1, 0.75, (Z0 + Z1) / 2, false, 0, Math.PI / 2);
    // East fence (X=X0), gap at Z=7..11 (exit gate)
    for (let z = Z0; z <= Z1; z += 2.5) {
      if (z < 7 || z > 11) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, X0, 0.8, z, true);
    }
    this.M(new THREE.BoxGeometry(0.1, 0.1, Z0 - Z0 + 1), railM, X0, 1.4, Z0);
    const eastFenceLen1 = Math.abs(Z1 - 11);
    this.M(new THREE.BoxGeometry(0.1, 0.1, eastFenceLen1), railM, X0, 1.4, (Z1 + 11) / 2, false, 0, Math.PI / 2);
    this.M(new THREE.BoxGeometry(0.1, 0.1, eastFenceLen1), railM, X0, 0.75, (Z1 + 11) / 2, false, 0, Math.PI / 2);
    // Exit gate bar (east face, over exit gap)
    this.M(new THREE.BoxGeometry(0.18, 0.18, 4), gateBarM, X0, 2.2, 9, true);
    // Road surface inside накопитель
    this.M(new THREE.BoxGeometry(42, 0.04, 30), this.roadMat, -31, 0.02, 21);
    // Entry road (Z=0 to Z=6 at X=-13)
    this.M(new THREE.BoxGeometry(4, 0.04, 6), this.roadMat, -13, 0.02, 3);
    // Exit road stub (X=-10 to X=-5 at Z=9)
    this.M(new THREE.BoxGeometry(5, 0.04, 4), this.roadMat, -7.5, 0.02, 9);
    this.addSprite('Накопитель', -31, 21, 5.0, 4.5, 0.9);
  }

  private buildZone9Lanes() {
    const lc = [0xf0d8c0, 0xe8c8b8, 0xf0d8c0, 0xe8c8b8, 0xf0d8c0,
                0xe8c8b8, 0xf0d8c0, 0xe8c8b8, 0xf0d8c0, 0xe8c8b8];
    for (let li = 0; li < NAK_LANE_ZS.length; li++) {
      const lz = NAK_LANE_ZS[li];
      const stripW = Math.abs(NAK_SLOT_XS[NAK_SLOT_XS.length - 1] - NAK_SLOT_XS[0]) + 6;
      const stripCx = (NAK_SLOT_XS[0] + NAK_SLOT_XS[NAK_SLOT_XS.length - 1]) / 2;
      this.M(new THREE.BoxGeometry(stripW, 0.05, 2.2),
        new THREE.MeshStandardMaterial({ color: lc[li], transparent: true, opacity: 0.3 }),
        stripCx, 0.025, lz);
    }
  }

  private rand(min: number, max: number) { return min + Math.random() * (max - min); }
}
