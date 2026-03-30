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

  // Real monthly data — trucks per hour (Кол-во АТС за месяц)
  private readonly HOURLY: Record<number, number> = {
    0: 8, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,
    8: 114, 9: 244, 10: 375, 11: 431,
    12: 395, 13: 437, 14: 514, 15: 488,
    16: 532, 17: 551, 18: 521, 19: 351,
    20: 544, 21: 501, 22: 400, 23: 223,
  };

  // Intensity multiplier (0.1 = very few, 1 = normal, 3 = triple)
  readonly intensity = signal(1);
  setIntensity(v: number) { this.intensity.set(v); }

  getSpawnIntervalSeconds(): number {
    const monthly = this.HOURLY[this.simHour()] ?? 0;
    if (monthly <= 0) return 9999;
    // Convert monthly to per-minute: monthly / 30 days = daily, / 60 = per minute
    const perMinute = (monthly / 30) / 60;
    const rate = perMinute * this.intensity();
    if (rate <= 0) return 9999;
    return (1 / rate) / this.simSpeed();
  }

  // Per-lane time adjustment in minutes (added to base 20-25 min)
  readonly laneDelays = signal<number[]>([0, 0, 0, 0, 0, 0]);
  adjustLaneDelay(lane: number, delta: number) {
    this.laneDelays.update(d => { const n = [...d]; n[lane] = Math.max(-15, Math.min(60, n[lane] + delta)); return n; });
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
