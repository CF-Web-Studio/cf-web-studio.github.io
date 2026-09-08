/**
 * NÚCLEO CF — o objeto assinatura.
 *
 * Um anel aberto (a mesma DNA do símbolo "cf") que atravessa quatro estados:
 *
 *   IDEIA      partículas dispersas, sem ordem
 *   TRAÇO      as partículas encontram a circunferência: o desenho técnico
 *   ESTRUTURA  o traço ganha profundidade e as cordas estruturais aparecem
 *   MATÉRIA    o volume fecha, a luz entra, vira objeto
 *
 * Renderizado em canvas 2D com projeção própria — sem dependências externas.
 * Todo o custo é proporcional a `count`, que é definido pelo tier do device.
 */

import { clamp, easeInOut, lerp } from './motion';

const TAU = Math.PI * 2;

/** Abertura do anel, em radianos — o mesmo "vão" do símbolo da marca. */
const GAP = 0.42;

export interface NucleoOptions {
  /** Quantidade de partículas. */
  count: number;
  /** Densidade de cordas estruturais (0 = nenhuma). */
  chords: number;
}

interface Particle {
  /** posição dispersa (estado IDEIA) */
  sx: number; sy: number; sz: number;
  /** ângulo no anel e no tubo */
  u: number; v: number;
  /** raio do tubo (variação para dar espessura orgânica ao volume) */
  tube: number;
  /** atraso de chegada, para o objeto se organizar em ondas */
  delay: number;
  /** brilho base */
  glow: number;
  /* buffers de projeção */
  px: number; py: number; pz: number; scale: number;
}

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Nucleo {
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private chordPairs: Array<[number, number]> = [];
  private order: Particle[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;

  /** parallax do ponteiro, suavizado */
  private targetTiltX = 0;
  private targetTiltY = 0;
  private tiltX = 0;
  private tiltY = 0;

  constructor(private canvas: HTMLCanvasElement, private options: NucleoOptions) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Canvas 2D indisponível');
    this.ctx = ctx;
    this.build();
  }

  private build() {
    const rand = mulberry(20260908);
    const { count, chords } = this.options;
    const ringPoints: number[] = [];

    for (let i = 0; i < count; i++) {
      const t = i / count;
      // distribui no arco aberto (deixa o vão da marca)
      const u = GAP / 2 + t * (TAU - GAP);
      const v = rand() * TAU;
      const tube = 0.13 + rand() * 0.145;

      this.particles.push({
        sx: (rand() - 0.5) * 3.4,
        sy: (rand() - 0.5) * 2.1,
        sz: (rand() - 0.5) * 3.4,
        u,
        v,
        tube,
        delay: rand() * 0.42,
        glow: 0.35 + rand() * 0.65,
        px: 0, py: 0, pz: 0, scale: 0,
      });

      if (i % 3 === 0) ringPoints.push(i);
    }

    this.order = this.particles.slice();

    // Estrutura: uma fita seguindo o anel (curto alcance) e poucas cordas
    // longas atravessando o interior. Nada de moiré — isso é desenho técnico.
    const len = ringPoints.length;
    const link = (a: number, b: number) => {
      if (b < len) this.chordPairs.push([ringPoints[a], ringPoints[b]]);
    };
    for (let i = 0; i < len; i++) {
      link(i, i + 1);
      if (chords >= 2 && i % 2 === 0) link(i, i + 2);
      if (chords >= 3 && i % 4 === 0) link(i, i + 5);
      if (i % 16 === 0) link(i, i + Math.floor(len * 0.34));
    }
  }

  resize(width: number, height: number, dpr: number) {
    this.w = width;
    this.h = height;
    this.dpr = dpr;
    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  setPointer(nx: number, ny: number) {
    this.targetTiltY = nx * 0.28;
    this.targetTiltX = ny * 0.18;
  }

  /**
   * @param time    tempo em ms (para a rotação contínua)
   * @param resolve 0 → 1, o progresso narrativo IDEIA → MATÉRIA
   * @param fade    opacidade global (usado na saída do hero)
   * @param spin    se false, congela a rotação (reduced motion)
   */
  render(time: number, resolve: number, fade: number, spin: boolean) {
    const { ctx, w, h, dpr } = this;
    if (w === 0 || h === 0) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (fade <= 0.001) return;

    const r = clamp(resolve);
    // duas metades da narrativa
    const toLine = easeInOut(clamp(r / 0.5));          // IDEIA → TRAÇO
    const toVolume = easeInOut(clamp((r - 0.42) / 0.58)); // TRAÇO → MATÉRIA

    this.tiltX = lerp(this.tiltX, this.targetTiltX, 0.055);
    this.tiltY = lerp(this.tiltY, this.targetTiltY, 0.055);

    const spinAngle = spin ? time * 0.000075 : 0.9;
    const yaw = spinAngle + this.tiltY;
    // o anel começa quase de frente (desenho técnico) e tomba ao ganhar volume
    const pitch = lerp(-0.06, 0.5, toVolume) + this.tiltX;

    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    const cosX = Math.cos(pitch), sinX = Math.sin(pitch);

    const R = 1;
    // o objeto recua um pouco ao ganhar volume: fechado, ele precisa caber inteiro
    const unit = Math.min(w, h) * (w < 640 ? 0.36 : 0.335) * lerp(1, 0.74, toVolume);
    const cx = w / 2;
    const cy = h / 2;
    const camera = 4.4;

    const parts = this.particles;

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      // chegada em ondas: cada partícula tem seu próprio atraso
      const local = clamp((toLine - p.delay * 0.5) / (1 - p.delay * 0.5 || 1));
      const lv = clamp((toVolume - p.delay * 0.35) / (1 - p.delay * 0.35 || 1));

      // TRAÇO: circunferência achatada no plano da tela
      const lx = Math.cos(p.u) * R;
      const ly = Math.sin(p.u) * R;
      const lz = 0;

      // MATÉRIA: toro com espessura
      const tr = R + p.tube * Math.cos(p.v);
      const mx = Math.cos(p.u) * tr;
      const my = p.tube * Math.sin(p.v);
      const mz = Math.sin(p.u) * tr;

      let x = lerp(p.sx, lx, local);
      let y = lerp(p.sy, ly, local);
      let z = lerp(p.sz, lz, local);

      x = lerp(x, mx, lv);
      y = lerp(y, my, lv);
      z = lerp(z, mz, lv);

      // rotação Y depois X
      const x1 = x * cosY + z * sinY;
      const z1 = z * cosY - x * sinY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const persp = camera / (camera - z2);
      p.px = cx + x1 * unit * persp;
      p.py = cy + y1 * unit * persp;
      p.pz = z2;
      p.scale = persp;
    }

    // ---- cordas estruturais (o momento "blueprint") -------------------------
    // presentes no traço, desaparecem quando a matéria fecha
    const structure = Math.sin(clamp(r / 0.92) * Math.PI) ** 1.5;
    if (structure > 0.02) {
      ctx.lineWidth = Math.max(0.5, 0.7 * (w > 900 ? 1 : 0.8));
      for (let i = 0; i < this.chordPairs.length; i++) {
        const [a, b] = this.chordPairs[i];
        const pa = parts[a];
        const pb = parts[b];
        const depth = (pa.pz + pb.pz) * 0.5;
        const alpha = structure * 0.26 * fade * (0.4 + 0.6 * (depth + 1) * 0.5);
        if (alpha < 0.006) continue;
        ctx.strokeStyle = `rgba(71, 200, 191, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.stroke();
      }
    }

    // ---- contorno do anel (o "traço" propriamente dito) ---------------------
    const outline = Math.sin(clamp(toLine) * Math.PI * 0.92) * (1 - toVolume * 0.72);
    if (outline > 0.02) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(47, 169, 162, ${(outline * 0.62 * fade).toFixed(3)})`;
      ctx.beginPath();
      const steps = 96;
      for (let s = 0; s <= steps; s++) {
        const u = GAP / 2 + (s / steps) * (TAU - GAP);
        const x = Math.cos(u) * R;
        const y = Math.sin(u) * R;
        const x1 = x * cosY;
        const z1 = -x * sinY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;
        const persp = camera / (camera - z2);
        const sxp = cx + x1 * unit * persp;
        const syp = cy + y1 * unit * persp;
        if (s === 0) ctx.moveTo(sxp, syp);
        else ctx.lineTo(sxp, syp);
      }
      ctx.stroke();
    }

    // ---- partículas ---------------------------------------------------------
    // pinta de trás para a frente — ordenação in-place, sem alocar por quadro
    const order = this.order;
    order.sort((a, b) => a.pz - b.pz);
    const baseSize = w < 640 ? 1.25 : 1.5;

    for (let i = 0; i < order.length; i++) {
      const p = order[i];
      const depth = (p.pz + 1) * 0.5; // 0 fundo → 1 frente
      const size = baseSize * p.scale * lerp(0.85, 1.15, depth) * lerp(0.9, 1.12, toVolume);
      const alpha =
        fade *
        p.glow *
        lerp(0.42, 1, depth) *
        lerp(0.5, 1, toLine) *
        lerp(0.85, 1, toVolume);
      if (alpha < 0.01) continue;

      // gradiente de material: navy no fundo → teal → quase branco na crista
      let cr: number, cg: number, cb: number;
      const heat = clamp(depth * 0.75 + toVolume * 0.3);
      if (heat < 0.55) {
        const t = heat / 0.55;
        cr = lerp(38, 47, t); cg = lerp(74, 169, t); cb = lerp(122, 162, t);
      } else {
        const t = (heat - 0.55) / 0.45;
        cr = lerp(47, 226, t); cg = lerp(169, 244, t); cb = lerp(162, 238, t);
      }

      ctx.fillStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${Math.min(alpha, 1).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.px, p.py, Math.max(0.35, size), 0, TAU);
      ctx.fill();
    }

    // ---- luz do núcleo, só quando a matéria fecha ---------------------------
    {
      const glow = 0.35 + toVolume * 0.65;
      const rad = unit * 1.05;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, `rgba(47, 169, 162, ${(0.09 * glow * fade).toFixed(3)})`);
      g.addColorStop(0.5, `rgba(22, 41, 79, ${(0.1 * glow * fade).toFixed(3)})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, TAU);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
  }
}

/** Orçamento de partículas por capacidade do dispositivo. */
export function nucleoBudget(tier: 'low' | 'mid' | 'high'): NucleoOptions {
  if (tier === 'low') return { count: 420, chords: 1 };
  if (tier === 'mid') return { count: 760, chords: 2 };
  return { count: 1100, chords: 3 };
}
