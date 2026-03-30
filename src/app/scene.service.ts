import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SimulationService } from './simulation.service';

// Zone 8: 6 horizontal lanes, trucks sit at registration booths on the LEFT side
const LANE_ZS = [-8, -10, -12, -14, -16, -18]; // z positions for each lane (1=bottom, 6=top in 3D: more negative = further north)
const SLOT_XS = [-18]; // x position where truck sits during registration (at booth)
const MAX_LANE = 1;
// Main road: east→west along z=0, then branch north at x=5
const MAIN_ROAD: [number, number][] = [[35, 0], [30, 0], [25, 0], [20, 0], [15, 0], [10, 0], [5, 0], [0, 0], [-5, 0], [-10, 0], [-20, 0], [-30, 0]];
const BRANCH_ROAD: [number, number][] = [[5, 0], [5, -3], [5, -6], [5, -9], [5, -12], [5, -18], [5, -22]];
const TRUCK_COLORS = [0xc0392b, 0x2980b9, 0x27ae60, 0xe67e22, 0x8e44ad, 0x16a085, 0xd35400, 0x2c3e50];

interface TruckObj {
  id: number; root: THREE.Group; wheels: THREE.Object3D[];
  speed: number; heading: THREE.Vector3;
  yaw: number; steeringAngle: number;
  target: THREE.Vector3 | null; wpQueue: THREE.Vector3[];
  wpDone: (() => void) | null; inSlot: boolean;
  waitTimer: number; zoneIdx: number;
  zonePath: ZoneNode[]; skipZ9: boolean; laneAssigned: number;
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
  private zone8!: ZoneNode; private truckGroup!: THREE.Group;
  private idCounter = 1; private spawnTimer = 0; private nextSpawn = 5; private z8Queue: TruckObj[] = [];
  private truckTemplate: THREE.Group | null = null; private templateReady = false;
  private tlRed!: THREE.MeshStandardMaterial; private tlGreen!: THREE.MeshStandardMaterial;
  private panelMats: THREE.MeshStandardMaterial[] = [];
  private roadMat!: THREE.MeshStandardMaterial; private roadScroll = 0;
  private focus = new THREE.Vector3(0, 0, -8);
  private dist = 45; private pitch = 45; private yaw = 0;
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
    this.truckGroup = new THREE.Group();
    this.scene.add(this.truckGroup);
    this.loadTruckTemplate().then(() => { for (let i = 0; i < 8; i++) this.spawnTruck(); });
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
    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    for (let i = 0; i < 55; i++) {
      const rx = rng(-140, 140), rz = rng(-120, 100) - 10;
      if (Math.abs(rx) < 25 && Math.abs(rz + 10) < 30) continue;
      const w = rng(0.8, 4.5), h = rng(0.15, 1.0), d = rng(0.6, 3.5), v = rng(0.42, 0.62);
      this.M(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({
        color: new THREE.Color(v * 1.05, v, v * 0.88), roughness: 0.96, flatShading: true
      }), rx, h / 2, rz, false, 0, rng(0, Math.PI));
    }
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
    // Connecting road: branch → zone 8 (wide curve)
    mkRoad([[5, -14], [3, -15], [0, -15], [-2, -14]]);
    // Fill asphalt between branch and zone 8
    this.M(new THREE.BoxGeometry(8, 0.04, 8), this.roadMat, 1, 0.02, -13);
    // Zone 8 area road surface
    this.M(new THREE.BoxGeometry(18, 0.04, 16), this.roadMat, -9, 0.02, -13);
    // Exit area — large asphalt around ГКО + ГТИ + connection to main road
    this.M(new THREE.BoxGeometry(12, 0.04, 6), this.roadMat, -22.5, 0.02, -13);
    this.M(new THREE.BoxGeometry(6, 0.04, 14), this.roadMat, -25, 0.02, -7);
    // Exit road: zone 8 → ГКО → ГТИ (behind) → turn south → main road
    mkRoad([[-20, -20], [-20, -13], [-25, -13], [-25, -8], [-25, -3], [-25, 0]]);
  }

  private buildBuildings() {
    const roofC = (c: number) => new THREE.Color(c).lerp(new THREE.Color(0x506070), 0.45);
    const b = (x: number, z: number, sx: number, sy: number, sz: number, col: number, lbl: string, tip: string) => {
      this.M(new THREE.BoxGeometry(sx + 0.35, 0.18, sz + 0.35), new THREE.MeshStandardMaterial({ color: 0x8a8880 }), x, 0.09, z);
      const wall = this.M(new THREE.BoxGeometry(sx, sy, sz), new THREE.MeshStandardMaterial({ color: col, roughness: 0.78 }), x, sy / 2, z, true);
      this.registerLabel(wall, tip);
      const rm = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.2, sy * 0.11, sz + 0.2), new THREE.MeshStandardMaterial({ color: roofC(col) }));
      rm.position.set(x, sy + sy * 0.055 - 0.02, z); rm.castShadow = true; this.scene.add(rm);
      this.registerLabel(rm, tip); this.addSprite(lbl, x, z, sy + 1.0, 2.4, 0.65);
    };
    // Погран. контроль — on main road, right side
    b(20, -3, 3.0, 2.5, 2.0, 0xd8dcc8, 'Погран.контроль', 'Пограничный контроль\nФиксация АТС\nВремя: 2-3 мин');
    // Весы №1 — further down branch road, east side
    b(8, -10, 3.8, 2.2, 2.0, 0xe8e0ce, 'Весы №1', 'Весы №1\nВесогабаритный контроль\nВремя: 5 мин');
    // ГКО — exit of Zone 8, on the edge (north side of exit road)
    b(-20, -17, 2.5, 2.8, 2.0, 0xe2d8c8, 'ГКО', 'ГКО\nГос. контроль отправлений');
    // ГТИ процесс — behind ГКО, also on the edge (north side)
    b(-25, -17, 3.0, 2.5, 2.0, 0xdcd0c0, 'Процесс ГТИ', 'Процесс ГТИ\nВремя: 2 мин');
  }

  private buildZone8Lanes() {
    const lineM = new THREE.MeshStandardMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.7 });
    const lc = [0xc0d8ff, 0xccf0b8, 0xc0d8ff, 0xccf0b8, 0xc0d8ff, 0xccf0b8];
    for (let li = 0; li < LANE_ZS.length; li++) {
      const lz = LANE_ZS[li];
      // Horizontal lane strip
      this.M(new THREE.BoxGeometry(14, 0.05, 1.4), new THREE.MeshStandardMaterial({ color: lc[li], transparent: true, opacity: 0.35 }), -9, 0.025, lz);
      // Lane divider line
      if (li < LANE_ZS.length - 1) this.M(new THREE.BoxGeometry(14, 0.02, 0.06), lineM, -9, 0.03, (lz + LANE_ZS[li + 1]) / 2);
      // Slot marker
      this.M(new THREE.BoxGeometry(0.08, 0.02, 1.2), lineM, SLOT_XS[0], 0.03, lz);
      // Registration booth at left end of each lane
      this.addBooth(SLOT_XS[0] - 1.5, lz, `П.${li + 1}`);
    }
    // Overhead canopy
    const ch = LANE_ZS[0] - LANE_ZS[LANE_ZS.length - 1] + 3;
    this.M(new THREE.BoxGeometry(2.6, 0.22, ch), new THREE.MeshStandardMaterial({ color: 0x2c4460, roughness: 0.7 }),
      SLOT_XS[0] - 1.5, 4.0, (LANE_ZS[0] + LANE_ZS[LANE_ZS.length - 1]) / 2, true);
  }

  private addBooth(x: number, z: number, label: string) {
    this.M(new THREE.BoxGeometry(2.0, 0.15, 1.6), new THREE.MeshStandardMaterial({ color: 0x282e38 }), x, 0.08, z);
    const wall = this.M(new THREE.BoxGeometry(1.8, 3.6, 1.4), new THREE.MeshStandardMaterial({ color: 0x4a6278, roughness: 0.75 }), x, 1.85, z, true);
    this.M(new THREE.BoxGeometry(0.06, 0.8, 0.9), new THREE.MeshStandardMaterial({ color: 0x88c0ee, transparent: true, opacity: 0.65, metalness: 0.35 }), x + 0.93, 2.2, z);
    this.addSprite(label, x, z, 4.2, 1.1, 0.45);
    this.registerLabel(wall, `${label}\nКабина регистрации\nВремя: 20-25 мин`);
  }

  private buildBorderFence() {
    const postM = new THREE.MeshStandardMaterial({ color: 0xc0b8a8, roughness: 0.9 });
    const railM = new THREE.MeshStandardMaterial({ color: 0xb0a898, roughness: 0.85 });
    // Fence around zone 8 compound
    for (const [fx, fzStart, fzEnd] of [[-2, -6, -20], [-22, -6, -20]] as [number, number, number][]) {
      for (let fz = fzStart; fz >= fzEnd; fz -= 2.5) this.M(new THREE.BoxGeometry(0.18, 1.6, 0.18), postM, fx, 0.8, fz, true);
      const len = Math.abs(fzEnd - fzStart);
      this.M(new THREE.BoxGeometry(0.1, 0.1, len), railM, fx, 1.4, (fzStart + fzEnd) / 2);
      this.M(new THREE.BoxGeometry(0.1, 0.1, len), railM, fx, 0.75, (fzStart + fzEnd) / 2);
    }
  }

  private buildGate() {
    const pm = new THREE.MeshStandardMaterial({ color: 0x1e1e22, roughness: 0.75 });
    this.M(new THREE.CylinderGeometry(0.07, 0.08, 2.0, 8), pm, -2, 1.0, -6, true);
    this.M(new THREE.CylinderGeometry(0.07, 0.08, 2.0, 8), pm, -22, 1.0, -6, true);
    this.M(new THREE.CylinderGeometry(0.06, 0.06, 20, 8), new THREE.MeshStandardMaterial({ color: 0xdd2222 }), -12, 1.95, -6, true, 0, 0, Math.PI / 2);
    const wm = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
    for (let si = 0; si < 10; si++) this.M(new THREE.BoxGeometry(0.7, 0.14, 0.14), wm, -21 + si * 2, 1.95, -5.98);
  }

  private buildTrafficLight() {
    const g = new THREE.Group(); g.position.set(25, 0, -3);
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
  }

  private updateTrafficLight() {
    const g = this.sim.isGreen();
    this.tlRed.emissiveIntensity = g ? 0.05 : 1.8; this.tlRed.color.set(g ? 0x440808 : 0xff1111);
    this.tlGreen.emissiveIntensity = g ? 1.8 : 0.05; this.tlGreen.color.set(g ? 0x11ff22 : 0x084408);
  }

  private buildMonitoringPanel() {
    // Positioned on branch road between весы and zone 8 entry
    const g = new THREE.Group(); g.position.set(8, 3.0, -2); g.rotation.y = Math.PI;
    const a = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m);
    };
    for (const px of [-1.2, 1.2]) a(new THREE.CylinderGeometry(0.055, 0.075, 3.4, 10), new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.7 }), px, -1.1, 0);
    a(new THREE.BoxGeometry(2.66, 1.62, 0.06), new THREE.MeshStandardMaterial({ color: 0x242430, roughness: 0.6, metalness: 0.4 }), 0, 0, 0.04);
    a(new THREE.BoxGeometry(2.6, 1.55, 0.1), new THREE.MeshStandardMaterial({ color: 0x060610, roughness: 0.95 }));
    this.addBoardSprite('ПОЛОСЫ', g, 0, 0.58, -0.06, 120, 30, 16);
    this.panelMats = [];
    for (let i = 0; i < 6; i++) {
      const lx = THREE.MathUtils.lerp(-0.95, 0.95, i / 5);
      this.addBoardSprite(`${i + 1}`, g, lx, 0.20, -0.06, 40, 24, 14);
      const mat = new THREE.MeshStandardMaterial({ color: 0x18dd22, emissive: 0x0a9910, emissiveIntensity: 1.5, roughness: 0.3 });
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.36, 0.12), mat);
      box.position.set(lx, -0.14, -0.07); g.add(box); this.panelMats.push(mat);
    }
    this.scene.add(g); this.registerLabel(g, 'Экран-распределитель\nЗагрузка полос регистрации');
    // Second monitoring panel — west side of branch road, facing incoming trucks
    const g2 = new THREE.Group(); g2.position.set(2, 3.0, -14); g2.rotation.y = Math.PI;
    const a2 = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
      const m2 = new THREE.Mesh(geo, mat); m2.position.set(x, y, z); g2.add(m2);
    };
    for (const px of [-0.9, 0.9]) a2(new THREE.CylinderGeometry(0.05, 0.07, 3.2, 10), new THREE.MeshStandardMaterial({ color: 0x1e1e24, roughness: 0.7 }), px, -1.0, 0);
    a2(new THREE.BoxGeometry(2.2, 1.4, 0.06), new THREE.MeshStandardMaterial({ color: 0x242430, roughness: 0.6, metalness: 0.4 }), 0, 0, 0.04);
    a2(new THREE.BoxGeometry(2.1, 1.3, 0.1), new THREE.MeshStandardMaterial({ color: 0x060610, roughness: 0.95 }));
    this.addBoardSprite('ПОЛОСЫ', g2, 0, 0.45, -0.06, 100, 26, 14);
    for (let i = 0; i < 6; i++) {
      const lx = THREE.MathUtils.lerp(-0.75, 0.75, i / 5);
      this.addBoardSprite(`${i + 1}`, g2, lx, 0.15, -0.08, 32, 20, 12);
      const mat2 = new THREE.MeshStandardMaterial({ color: 0x18dd22, emissive: 0x0a9910, emissiveIntensity: 1.5, roughness: 0.3 });
      const box2 = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.36, 0.12), mat2);
      box2.position.set(lx, -0.12, -0.08); g2.add(box2); this.panelMats.push(mat2);
    }
    this.scene.add(g2); this.registerLabel(g2, 'Экран-распределитель №2\nПеред входом в полосы');
  }

  private updatePanelMats() {
    const occ = this.sim.laneOccupancies();
    for (let i = 0; i < this.panelMats.length; i++) {
      const cnt = occ[i % 6] ?? 0, m = this.panelMats[i];
      if (cnt >= 1) { m.color.set(0xff3322); m.emissive.set(0xaa0808); m.emissiveIntensity = 1.2; }
      else { m.color.set(0x18dd22); m.emissive.set(0x0a9910); m.emissiveIntensity = 0.9; }
    }
  }

  private buildFlagPoles() {
    const pm = new THREE.MeshStandardMaterial({ color: 0xc8c8c8, metalness: 0.6, roughness: 0.4 });
    const fm = new THREE.MeshStandardMaterial({ color: 0xd50000, side: THREE.DoubleSide, roughness: 0.7 });
    for (const [x, z] of [[-2, -10], [-22, -10]]) {
      this.M(new THREE.CylinderGeometry(0.045, 0.055, 6.0, 8), pm, x, 3.0, z, true);
      this.M(new THREE.PlaneGeometry(1.0, 0.62), fm, x + 0.5, 5.7, z);
    }
  }

  private addSprite(text: string, x: number, z: number, y: number, w: number, h: number) {
    const c = document.createElement('canvas'); c.width = 256; c.height = 80;
    const ctx = c.getContext('2d')!; ctx.clearRect(0, 0, 256, 80);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    text.split('\n').forEach((l, i) => ctx.fillText(l, 128, 26 + i * 25));
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
    s.position.set(x, y, z); s.scale.set(w, h, 1); this.scene.add(s);
  }

  private addBoardSprite(text: string, g: THREE.Group, x: number, y: number, z: number, cw: number, ch: number, fs: number) {
    const c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const ctx = c.getContext('2d')!; ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = '#aaccff'; ctx.font = `bold ${fs}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, cw / 2, ch / 2);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), depthTest: false, transparent: true }));
    s.position.set(x, y, z); s.scale.set(cw / 90, ch / 90, 1); g.add(s);
  }

  private loadGLB(path: string, scale: number, rotY = -Math.PI / 2): Promise<THREE.Group | null> {
    return new Promise(resolve => {
      new GLTFLoader().load(path, gltf => {
        const wrapper = new THREE.Group(); const inner = gltf.scene;
        inner.scale.setScalar(scale); inner.rotation.y = rotY;
        inner.traverse(o => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; o.receiveShadow = true; } });
        wrapper.add(inner); resolve(wrapper);
      }, undefined, () => resolve(null));
    });
  }

  private async loadTruckTemplate(): Promise<void> {
    const cargo = await this.loadGLB('/assets/models/truck.glb', 0.5);
    this.truckTemplate = cargo ?? this.buildProceduralTruck(0xcc3322);
    this.templateReady = true;
  }

  private buildProceduralTruck(color: number): THREE.Group {
    const g = new THREE.Group(); const Y = 0.1;
    const tmat = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.12 });
    const trailer = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.38, 0.48), tmat);
    trailer.position.set(0.45, Y + 0.19, 0); trailer.castShadow = true; g.add(trailer);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.44, 0.44), new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.28 }));
    cab.position.set(1.1, Y + 0.22, 0); cab.castShadow = true; g.add(cab);
    return g;
  }

  private tickSpawn(dt: number) {
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.nextSpawn) {
      this.spawnTimer = 0; if (this.sim.isGreen()) this.spawnTruck();
      this.nextSpawn = this.sim.getSpawnIntervalSeconds();
    }
  }

  private spawnTruck() {
    if (!this.templateReady || this.trucks.length >= 35) return;
    const id = this.idCounter++; const color = TRUCK_COLORS[(id - 1) % TRUCK_COLORS.length];
    let mesh: THREE.Group;
    if (this.truckTemplate) {
      mesh = this.truckTemplate.clone();
      mesh.traverse(o => {
        if ((o as THREE.Mesh).isMesh) {
          const orig = (o as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (orig?.isMeshStandardMaterial) { const m = orig.clone(); m.color.lerp(new THREE.Color(color), 0.45); (o as THREE.Mesh).material = m; }
        }
      });
    } else { mesh = this.buildProceduralTruck(color); }
    mesh.position.set(35, 0, 0); mesh.rotation.y = 0;
    this.truckGroup.add(mesh); this.sim.truckEntered();
    const t: TruckObj = {
      id, root: mesh, wheels: [], speed: 0, heading: new THREE.Vector3(-1, 0, 0),
      yaw: 0, steeringAngle: 0, target: null, wpQueue: [], wpDone: null,
      inSlot: false, waitTimer: 0, zoneIdx: -1,
      zonePath: [...this.zones], skipZ9: false, laneAssigned: -1,
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
    // Zone 1: Погран.контроль on main road (2-3 min)
    this.zones.push(make(1, 2, 3, 20, 0, [[[20, 0]]]));
    // Zone 2: Весы — 2 parallel lanes so trucks don't jam (5 min)
    this.zones.push(make(2, 3, 5, 5, -10, [[[5, -9]], [[5, -11]]], [[10, 0], [5, 0], [5, -5]]));
    // Zone 3: Накопитель / queue (5 min)
    this.zones.push(make(3, 3, 5, 3, -14, [[[3, -14]]], [[5, -12], [5, -14]]));
    // Zone 8: Registration — 6 horizontal lanes, 1 truck per lane, 20-25 min
    const z8 = make(8, 20, 25, -2, -13,
      z8Slots.map(lane => lane.map(v => [v.x, v.z] as [number, number])),
      [[3, -14], [0, -14], [-2, -13]], true, MAX_LANE);
    this.zones.push(z8); this.zone8 = z8;
    // Zone 5: ГКО → ГТИ (behind ГКО), 2-3 min processing
    this.zones.push(make(5, 2, 3, -25, -13, [[[-25, -13]]], [[-20, -13]]));
  }

  private tickZones(dt: number) {
    const sd = dt * this.sim.simSpeed();
    for (const zone of this.zones) {
      for (const lane of zone.lanes) {
        if (!lane.trucks.length) continue;
        lane.elapsed[0] += sd; lane.remaining[0] -= sd;
        if (lane.remaining[0] <= 0) {
          const done = lane.trucks.shift()!; lane.elapsed.shift(); lane.remaining.shift();
          if (lane.trucks.length) lane.remaining[0] = this.rand(zone.minT, zone.maxT);
          this.advance(done);
        }
      }
    }
    this.sim.updateLanes(
      this.zone8.lanes.map(l => l.trucks.length),
      this.zone8.lanes.map(l => ({ processing: l.trucks.length > 0, remaining: l.remaining[0] ?? 0, queueCount: 0 })),
      this.z8Queue.length
    );
  }

  private advance(t: TruckObj) {
    t.inSlot = false; t.zoneIdx++;
    if (t.zoneIdx >= t.zonePath.length) { this.exitTruck(t); return; }
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
      t.waitTimer = 0.4;
      if (zone.id === 8) {
        if (!this.z8Queue.includes(t)) this.z8Queue.push(t);
        const qi = this.z8Queue.indexOf(t);
        this.moveTo(t, new THREE.Vector3(-2 + qi * 2.2, 0.15, -13));
      }
      return;
    }
    if (zone.id === 8) this.z8Queue = this.z8Queue.filter(q => q !== t);
    const lane = zone.lanes[li];
    const slots = zone.slotsByLane[Math.min(li, zone.slotsByLane.length - 1)];
    const pos = slots[0];
    lane.trucks.push(t); lane.elapsed.push(0);
    lane.remaining.push(lane.trucks.length === 1 ? this.rand(zone.minT, zone.maxT) : 0);
    t.inSlot = true; t.laneAssigned = li;
    if (zone.id === 8) this.sim.logDistribution(t.id, li);
    this.moveTo(t, pos);
  }

  private exitTruck(t: TruckObj) {
    this.sim.truckExited();
    this.followPath(t, [
      new THREE.Vector3(-25, 0.15, -8), new THREE.Vector3(-25, 0.15, -3),
      new THREE.Vector3(-25, 0.15, 0), new THREE.Vector3(-32, 0.15, 0),
    ], () => { this.truckGroup.remove(t.root); this.trucks = this.trucks.filter(x => x !== t); });
  }

  private moveTo(t: TruckObj, pos: THREE.Vector3, cb?: () => void) { t.target = pos.clone(); t.wpQueue = []; if (cb) t.wpDone = cb; }
  private followPath(t: TruckObj, wps: THREE.Vector3[], cb: () => void) { t.wpQueue = wps.map(p => p.clone()); t.wpDone = cb; t.target = null; this.stepPath(t); }
  private stepPath(t: TruckObj) { if (!t.wpQueue.length) { const cb = t.wpDone; t.wpDone = null; cb?.(); return; } t.target = t.wpQueue.shift()!; }

  private tickTrucks(dt: number) {
    const sd = this.sim.simSpeed(), sDt = dt * sd, redLight = !this.sim.isGreen();
    for (const t of this.trucks) {
      if (t.waitTimer > 0) { t.waitTimer -= sDt; if (t.waitTimer <= 0) this.tryEnter(t, t.zonePath[t.zoneIdx]); continue; }
      if (redLight && t.root.position.x > 27 && !t.inSlot) {
        t.speed = Math.max(0, t.speed - 12 * sDt);
        if (t.speed > 0.01) t.root.position.addScaledVector(t.heading, t.speed * dt); continue;
      }
      if (!t.target) { t.speed = Math.max(0, t.speed - 8 * sDt); if (t.speed > 0.01) t.root.position.addScaledVector(t.heading, t.speed * dt); continue; }
      const dx = t.target.x - t.root.position.x, dz = t.target.z - t.root.position.z, dist = Math.hypot(dx, dz);
      if (dist < 0.2) { t.root.position.x = t.target.x; t.root.position.z = t.target.z; t.speed = 0; t.target = null;
        if (t.wpQueue.length) this.stepPath(t); else { const cb = t.wpDone; t.wpDone = null; cb?.(); } continue; }
      const pd = new THREE.Vector3(dx / dist, 0, dz / dist);
      let top = 8 * sd * (0.9 + (t.id % 6) * 0.02);
      if (!t.inSlot) top = this.carFollow(t, top, pd);
      const dot = t.heading.dot(pd);
      const tp = dot < 0.85 ? THREE.MathUtils.clamp((dot - 0.3) / 0.55, 0.3, 1) : 1;
      const desired = Math.min(top, top * dist / 3.0) * tp;
      t.speed += (desired - t.speed) * Math.min(4.0 * sDt, 0.92); t.speed = Math.max(0, t.speed);
      if (t.speed < 0.01) continue;
      const tr = THREE.MathUtils.clamp(2.5 / (1 + t.speed * 0.04), 0.6, 3.5);
      t.heading.lerp(pd, Math.min(tr * sDt, 1)).normalize();
      t.root.position.addScaledVector(t.heading, t.speed * dt);
      const ta = Math.atan2(-t.heading.z, t.heading.x) + Math.PI;
      let rd = ta - t.root.rotation.y;
      while (rd > Math.PI) rd -= 2 * Math.PI; while (rd < -Math.PI) rd += 2 * Math.PI;
      t.root.rotation.y += rd * Math.min(5.0 * dt, 1); t.yaw = t.root.rotation.y;
    }
  }

  private carFollow(t: TruckObj, top: number, pd: THREE.Vector3): number {
    for (const o of this.trucks) {
      if (o === t) continue;
      const dx = o.root.position.x - t.root.position.x, dz = o.root.position.z - t.root.position.z;
      const ahead = dx * pd.x + dz * pd.z;
      if (ahead <= 0 || ahead > 6) continue;
      if (Math.hypot(dx - pd.x * ahead, dz - pd.z * ahead) > 1.2) continue;
      top = Math.min(top, Math.max(top * 0.12, top * (ahead - 2.0) / 4.0));
    }
    return top;
  }

  private rand(min: number, max: number) { return min + Math.random() * (max - min); }
}
