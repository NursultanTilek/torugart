import { Injectable, signal, computed } from '@angular/core';

export interface LaneInfo {
  processing: boolean;
  remaining: number; // minutes left
  queueCount: number;
}

export interface DistributionEntry {
  truckId: number;
  lane: number;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly simSpeed = signal(2);
  readonly isPaused = signal(false);
  readonly simMinutes = signal(8 * 60);
  readonly totalProcessed = signal(0);
  readonly inSystem = signal(0);
  readonly laneOccupancies = signal<number[]>([0, 0, 0, 0, 0, 0]);
  readonly laneDetails = signal<LaneInfo[]>([
    { processing: false, remaining: 0, queueCount: 0 },
    { processing: false, remaining: 0, queueCount: 0 },
    { processing: false, remaining: 0, queueCount: 0 },
    { processing: false, remaining: 0, queueCount: 0 },
    { processing: false, remaining: 0, queueCount: 0 },
    { processing: false, remaining: 0, queueCount: 0 },
  ]);
  readonly zone8Total = computed(() => this.laneOccupancies().reduce((a, b) => a + b, 0));

  // Manual traffic light override: null = auto, true = green, false = red
  readonly manualLight = signal<boolean | null>(null);
  readonly isGreen = computed(() => {
    const manual = this.manualLight();
    if (manual !== null) return manual;
    return this.zone8Total() < 24;
  });

  // Distribution log — last 15 assignments
  readonly distributionLog = signal<DistributionEntry[]>([]);

  readonly timeString = computed(() => {
    const m = Math.floor(this.simMinutes());
    const h = Math.floor(m / 60) % 24;
    const min = m % 60;
    return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
  });

  readonly simHour = computed(() => Math.floor(this.simMinutes() / 60) % 24);

  // Real trucks/day distribution by hour (from spreadsheet)
  private readonly HOURLY: Record<number, number> = {
    8: 4.75, 9: 10.2, 10: 15.6, 11: 18.0,
    12: 16.5, 13: 18.2, 14: 21.4, 15: 20.3,
    16: 22.2, 17: 23.0, 18: 21.7, 19: 14.6,
    20: 22.7, 21: 20.9, 22: 16.7, 23: 9.3
  };

  getSpawnIntervalSeconds(): number {
    const rate = this.HOURLY[this.simHour()] ?? 0;
    if (rate <= 0) return 9999;
    return (60 / rate) / this.simSpeed();
  }

  setSpeed(s: number) { this.simSpeed.set(s); }
  setPaused(p: boolean) { this.isPaused.set(p); }
  setTime(hour: number) { this.simMinutes.set(hour * 60); }

  tickTime(realDelta: number) {
    if (this.isPaused()) return;
    this.simMinutes.update(m => m + realDelta * this.simSpeed());
  }

  truckEntered() { this.inSystem.update(n => n + 1); }
  truckExited() {
    this.inSystem.update(n => Math.max(0, n - 1));
    this.totalProcessed.update(n => n + 1);
  }

  readonly waitingQueue = signal(0);

  updateLanes(occ: number[], details: LaneInfo[], queueCount: number) {
    this.laneOccupancies.set([...occ]);
    this.laneDetails.set([...details]);
    this.waitingQueue.set(queueCount);
  }

  toggleLight() {
    const cur = this.manualLight();
    if (cur === null) this.manualLight.set(false);      // auto → red
    else if (cur === false) this.manualLight.set(true);  // red → green
    else this.manualLight.set(null);                     // green → auto
  }

  logDistribution(truckId: number, lane: number) {
    const entry: DistributionEntry = { truckId, lane, time: this.timeString() };
    this.distributionLog.update(log => [entry, ...log].slice(0, 15));
  }
}
