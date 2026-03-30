# Torugart 3D Simulation — Handoff Notes

## Project
Angular 17.3 + Three.js 3D border crossing simulation at `~/Desktop/torugart-3d`.
Simulates truck flow through the Torugart border crossing (Kyrgyzstan-China).

## Dev Server
```bash
cd ~/Desktop/torugart-3d && npx ng serve --host 0.0.0.0 --port 4200
```
Open https://localhost:4200 in browser.

## What Was Done (latest session)

### Fixed Issues
1. **GLB truck model wasn't loading** — Angular didn't serve `public/models/`. Moved to `src/assets/models/truck.glb`. Loader path changed to `/assets/models/truck.glb`.
2. **Downloaded truck model** — `truck.glb` (Quaternius cargo, 327KB, CC0) at `src/assets/models/`.
3. **Removed Smart Bazhy building** — Was massive 7m×16.5m, dominated the scene. User requested removal.
4. **Traffic light moved** — From (-3.2, 0, -4.2) at Zone 8 gate to (18, 0, 1.5) at road entrance per the process schema.
5. **Movement system** — Tried bicycle kinematic model but it caused trucks to overshoot at high sim speeds (steering rate didn't scale with speed multiplier). Reverted to heading-lerp with smooth rotation which works reliably.
6. **Truck model wrapper** — GLB loaded into wrapper THREE.Group so the model's internal rotation offset doesn't conflict with simulation's rotation.y updates.
7. **Panel CSS** — Changed canvas from `width: 100%` to `min-width: 0` so flex layout works and panel stays visible.
8. **Added controls** — Time picker (select hour 8-23), speed buttons (1x/2x/5x/10x), pause.
9. **Torugart environment** — Mountains (14 Tian Shan cones with snow caps), rocky terrain, border fence, red/white gate barrier, flag poles.

### Current State
- Build: **CLEAN** (`npm run build` succeeds)
- Line counts: scene.service.ts=663, all under 700
- Cargo truck GLB model loads correctly
- Panel has: time picker, speed control, pause, lane status, traffic light status

## What Still Needs Attention

### 1. ~~Trucks may appear small or wrong orientation~~ (FIXED)
Truck scale increased to 1.1. Military model removed — only cargo truck remains. The `loadGLB()` accepts a `rotY` parameter (default `-Math.PI / 2`) for easy orientation adjustment if needed.

### 2. ~~Movement naturalness~~ (FIXED)
Implemented:
- Speed-dependent turn rate (`turnRate = clamp(1.2 / (1 + speed * 0.18), 0.3, 2.2)`) — trucks turn slower at high speed
- Turn-angle deceleration — trucks slow down before sharp turns (dot product penalty)
- Wider L-bend arc into Zone 8 with 7 pre-waypoints (was 5) for smoother curves

### 3. Schema compliance
The user's schema (Excel процесс МПТП) shows this flow:
```
Светофор → Погран.контроль → Весы №1/№2 → Зона накопителя → Экран-распределитель → Зона регистрации (6 полос × 4 АТС) → ГКО → Убытие
```
The 3D scene has all these zones but the user wants the layout to closely match the schema image.

### 4. ~~No Playwright MCP available~~ (RESOLVED)
Playwright MCP is now connected and available for browser testing.

## Key Files
- `src/app/scene.service.ts` — 3D scene, truck movement, zone logic (663 lines)
- `src/app/simulation.service.ts` — State signals, spawn rates (60 lines)
- `src/app/app.component.html` — Control panel template (71 lines)
- `src/app/app.component.ts` — Component with ResizeObserver (43 lines)
- `src/app/app.component.css` — Dark panel styling (102 lines)
- `src/assets/models/truck.glb` — Quaternius cargo truck

## Schema Reference
The user's process schema image shows the border crossing flow. Key elements:
- Traffic light controls entry (red when Zone 8 has 24 trucks)
- 6 registration lanes, 4 trucks per lane, 15-25 min processing
- Экран-распределитель (LED board) shows lane availability above Zone 8 entry
- Trucks enter from right (east), flow left (west), then turn south into Zone 8 lanes
