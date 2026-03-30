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

  get speeds() { return [1, 2, 5, 10]; }
  get hours() { return [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; }

  lightModeLabel(): string {
    const m = this.sim.manualLight();
    if (m === null) return 'АВТО';
    return m ? 'ЗЕЛЁНЫЙ' : 'КРАСНЫЙ';
  }

}
