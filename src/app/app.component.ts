import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { SceneService } from './scene.service';
import { SimulationService } from './simulation.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(readonly sim: SimulationService, private scene: SceneService) {}

  ngOnInit() {
    this.scene.init(this.canvasRef);
    const ro = new ResizeObserver(() => {
      const el = this.canvasRef.nativeElement;
      this.scene.resize(el.clientWidth, el.clientHeight);
    });
    ro.observe(this.canvasRef.nativeElement);
  }

  ngOnDestroy() { this.scene.destroy(); }

  setSpeed(s: number) { this.sim.setSpeed(s); }
  togglePause() { this.sim.setPaused(!this.sim.isPaused()); }
  setTime(hour: number) { this.sim.setTime(hour); }
  toggleLight() { this.sim.toggleLight(); }

  setIntensity(v: number) { this.sim.setIntensity(v); }
  changeLanes(delta: number) {
    if (delta < 0) {
      // Check if the last lane has trucks — don't allow removing
      const occ = this.sim.laneOccupancies();
      const lastLane = this.sim.activeLanes() - 1;
      if (occ[lastLane] > 0) return; // truck in lane, can't remove
    }
    const n = this.sim.activeLanes() + delta;
    this.sim.setActiveLanes(n);
    this.scene.rebuildLanes(this.sim.activeLanes());
  }
  get speeds() { return [1, 2, 5, 10]; }
  get hours() { return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]; }
  get intensities() { return [1, 2, 4, 6, 12, 24]; }

  lightModeLabel(): string {
    const m = this.sim.manualLight();
    if (m === null) return 'АВТО';
    return m ? 'ЗЕЛЁНЫЙ' : 'КРАСНЫЙ';
  }

  sidebarOpen = true;
  controlsOpen = true;
  zoom(factor: number) { this.scene.zoom(factor); }
  setView(preset: 'top' | 'front' | 'left' | 'right') { this.scene.setView(preset); }
  resetView() { this.scene.resetView(); }

}
