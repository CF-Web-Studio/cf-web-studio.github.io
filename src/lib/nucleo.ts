/**
 * O NÚCLEO — objeto do hero (CLAUDE.md § "Onde mexer").
 *
 * WebGL escrito à mão, sem dependência nova: a regra 1 do projeto manda
 * verificar se dá para escrever antes de trazer uma lib, e Three.js está
 * explicitamente fora. São ~0 bytes de dependência para um objeto que
 * responde a ponteiro, scroll e tempo — coisa que a imagem estática que
 * estava aqui não fazia.
 *
 * O que ele é: uma nuvem de nós sobre uma esfera de Fibonacci, ligados aos
 * vizinhos mais próximos, dentro de dois anéis orbitais inclinados. Os anéis
 * citam o símbolo da marca (o anel duplo do `cf`) — o objeto do hero e a
 * marca são a mesma ideia em escalas diferentes.
 *
 * NÃO cria RAF próprio: expõe `render()` para ser chamado pelo loop único da
 * página (`subscribe()` em src/lib/motion.ts).
 */

type Tier = 'low' | 'mid' | 'high';

export type NucleoHandle = {
  /** Desenha um quadro. Chamado pelo loop único da página. */
  render(timeMs: number): void;
  /** Reajusta buffers ao tamanho do canvas. */
  resize(): void;
  /** Alvo do ponteiro em coordenadas normalizadas (-1..1). */
  setPointer(x: number, y: number): void;
  /** Progresso de scroll da seção (0..1). */
  setProgress(p: number): void;
  destroy(): void;
};

/* ------------------------------------------------------------------ *
 * mat4 mínimo — só o que este objeto usa.
 * ------------------------------------------------------------------ */
type M4 = Float32Array;

const m4identity = (): M4 =>
  new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

function m4perspective(fovY: number, aspect: number, near: number, far: number): M4 {
  const f = 1 / Math.tan(fovY / 2);
  const nf = 1 / (near - far);
  const o = m4identity();
  o[0] = f / aspect;
  o[5] = f;
  o[10] = (far + near) * nf;
  o[11] = -1;
  o[14] = 2 * far * near * nf;
  o[15] = 0;
  return o;
}

function m4mul(a: M4, b: M4): M4 {
  const o = new Float32Array(16) as M4;
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  }
  return o;
}

function m4rotY(rad: number): M4 {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const o = m4identity();
  o[0] = c;
  o[2] = -s;
  o[8] = s;
  o[10] = c;
  return o;
}

function m4rotX(rad: number): M4 {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const o = m4identity();
  o[5] = c;
  o[6] = s;
  o[9] = -s;
  o[10] = c;
  return o;
}

function m4translate(x: number, y: number, z: number): M4 {
  const o = m4identity();
  o[12] = x;
  o[13] = y;
  o[14] = z;
  return o;
}

/* ------------------------------------------------------------------ *
 * Geometria
 * ------------------------------------------------------------------ */

/** Esfera de Fibonacci: distribuição uniforme sem polos aglomerados. */
function fibonacciSphere(n: number): Float32Array {
  const pts = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    // leve irregularidade radial: um núcleo perfeito parece render de biblioteca
    const jitter = 0.9 + 0.14 * Math.sin(i * 12.9898);
    pts[i * 3] = Math.cos(th) * r * jitter;
    pts[i * 3 + 1] = y * jitter;
    pts[i * 3 + 2] = Math.sin(th) * r * jitter;
  }
  return pts;
}

/** Liga cada nó aos `k` vizinhos mais próximos, sem duplicar arestas. */
function neighbourEdges(pts: Float32Array, k: number): Float32Array {
  const n = pts.length / 3;
  const seen = new Set<number>();
  const out: number[] = [];
  const best = new Array<{ i: number; d: number }>(k);

  for (let i = 0; i < n; i++) {
    for (let s = 0; s < k; s++) best[s] = { i: -1, d: Infinity };
    const ax = pts[i * 3];
    const ay = pts[i * 3 + 1];
    const az = pts[i * 3 + 2];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = pts[j * 3] - ax;
      const dy = pts[j * 3 + 1] - ay;
      const dz = pts[j * 3 + 2] - az;
      const d = dx * dx + dy * dy + dz * dz;
      for (let s = 0; s < k; s++) {
        if (d < best[s].d) {
          for (let t = k - 1; t > s; t--) best[t] = best[t - 1];
          best[s] = { i: j, d };
          break;
        }
      }
    }
    for (let s = 0; s < k; s++) {
      const j = best[s].i;
      if (j < 0) continue;
      const key = i < j ? i * n + j : j * n + i;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(
        pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2],
        pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2],
      );
    }
  }
  return new Float32Array(out);
}

/** Anel orbital inclinado — o par cita o anel duplo do símbolo `cf`. */
function ring(radius: number, segments: number, tiltX: number, tiltZ: number): Float32Array {
  const out = new Float32Array(segments * 2 * 3);
  const cx = Math.cos(tiltX);
  const sx = Math.sin(tiltX);
  const cz = Math.cos(tiltZ);
  const sz = Math.sin(tiltZ);
  const at = (i: number): [number, number, number] => {
    const a = (i / segments) * Math.PI * 2;
    let x = Math.cos(a) * radius;
    let y = 0;
    let z = Math.sin(a) * radius;
    // tilt X
    const y1 = y * cx - z * sx;
    const z1 = y * sx + z * cx;
    y = y1;
    z = z1;
    // tilt Z
    const x1 = x * cz - y * sz;
    const y2 = x * sz + y * cz;
    x = x1;
    y = y2;
    return [x, y, z];
  };
  for (let i = 0; i < segments; i++) {
    const a = at(i);
    const b = at((i + 1) % segments);
    out.set(a, i * 6);
    out.set(b, i * 6 + 3);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Shaders
 * ------------------------------------------------------------------ */

const VERT_POINTS = `
attribute vec3 aPos;
attribute float aSeed;
uniform mat4 uMVP;
uniform float uTime;
uniform float uSize;
varying float vFar;
varying float vSeed;
void main() {
  // respiração: cada nó pulsa na própria fase, então o conjunto nunca "bate junto"
  float breath = sin(uTime * 0.55 + aSeed * 6.2831) * 0.5 + 0.5;
  vec3 p = aPos * (1.0 + breath * 0.045);
  vec4 clip = uMVP * vec4(p, 1.0);
  gl_Position = clip;
  vFar = clamp((clip.w - 1.7) / 2.3, 0.0, 1.0);
  vSeed = aSeed;
  // clamp obrigatorio: fora de ALIASED_POINT_SIZE_RANGE o driver pode estourar
  gl_PointSize = clamp(uSize * (1.0 + (1.0 - vFar) * 1.4), 1.0, 14.0);
}`;

const FRAG_POINTS = `
precision mediump float;
varying float vFar;
varying float vSeed;
uniform vec3 uNear;
uniform vec3 uFarCol;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float a = smoothstep(0.25, 0.0, d);
  vec3 col = mix(uNear, uFarCol, vFar * 0.85 + vSeed * 0.15);
  // PRE-MULTIPLICADO: com alpha direto a soma aditiva ultrapassa o alpha e o
  // compositor da pagina le isso como estouro — o hero virava um borrao branco.
  float alpha = a * mix(0.38, 0.04, vFar);
  gl_FragColor = vec4(col * alpha, alpha);
}`;

const VERT_LINES = `
attribute vec3 aPos;
uniform mat4 uMVP;
uniform float uTime;
varying float vFar;
void main() {
  float breath = sin(uTime * 0.55 + aPos.y * 3.0) * 0.5 + 0.5;
  vec4 clip = uMVP * vec4(aPos * (1.0 + breath * 0.045), 1.0);
  gl_Position = clip;
  vFar = clamp((clip.w - 1.7) / 2.3, 0.0, 1.0);
}`;

const FRAG_LINES = `
precision mediump float;
varying float vFar;
uniform vec3 uColor;
uniform float uAlpha;
void main() {
  float a = mix(uAlpha, 0.0, vFar);
  gl_FragColor = vec4(uColor * a, a);  // pre-multiplicado
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function program(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const v = compile(gl, gl.VERTEX_SHADER, vs);
  const f = compile(gl, gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const p = gl.createProgram();
  if (!p) return null;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

/** Orçamento por capacidade do aparelho (§32): menos nós, menos DPR. */
const BUDGET: Record<Tier, { nodes: number; k: number; dpr: number; size: number }> = {
  low: { nodes: 190, k: 2, dpr: 1.25, size: 2.2 },
  mid: { nodes: 380, k: 2, dpr: 1.5, size: 2.0 },
  high: { nodes: 620, k: 3, dpr: 1.75, size: 1.8 },
};

/**
 * Cria o núcleo. Devolve `null` se WebGL não estiver disponível — o chamador
 * mantém a composição estática, que continua sendo uma imagem válida (§30).
 */
export function createNucleo(
  canvas: HTMLCanvasElement,
  opts: { tier: Tier; colorNear?: string; colorFar?: string; colorLine?: string },
): NucleoHandle | null {
  const ctx =
    (canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true }) as
      | WebGLRenderingContext
      | null) ??
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
  if (!ctx) return null;
  // Um canvas so entrega UM contexto: se o anterior foi perdido, getContext
  // devolve o mesmo objeto morto. Sem esta guarda, uma remontagem (StrictMode,
  // troca de rota) deixaria o hero renderizando nada para sempre.
  if (ctx.isContextLost()) return null;
  // fixa o tipo não-nulo: dentro dos closures o TS perderia o narrowing
  const gl: WebGLRenderingContext = ctx;

  const budget = BUDGET[opts.tier];
  const progPoints = program(gl, VERT_POINTS, FRAG_POINTS);
  const progLines = program(gl, VERT_LINES, FRAG_LINES);
  if (!progPoints || !progLines) return null;

  /* --------------------------------- geometria --------------------------- */
  const nodes = fibonacciSphere(budget.nodes);
  const edges = neighbourEdges(nodes, budget.k);
  const rings = new Float32Array([
    ...ring(1.42, 96, 0.42, 0.18),
    ...ring(1.62, 96, -0.55, 0.9),
  ]);
  const seeds = new Float32Array(budget.nodes);
  for (let i = 0; i < budget.nodes; i++) seeds[i] = (Math.sin(i * 78.233) * 0.5 + 0.5);

  const buf = (data: Float32Array) => {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return b;
  };
  const bNodes = buf(nodes);
  const bSeeds = buf(seeds);
  const bEdges = buf(edges);
  const bRings = buf(rings);

  const near = hexToRgb(opts.colorNear ?? '#47c8bf');
  const far = hexToRgb(opts.colorFar ?? '#2b446b');
  const line = hexToRgb(opts.colorLine ?? '#2fa9a2');

  /* --------------------------------- estado ------------------------------ */
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
  // O StrictMode monta o efeito duas vezes. Sem esta flag, o render() da
  // instancia ja destruida continua sendo chamado com programas deletados —
  // "object does not belong to this context" no console, e nada desenhado.
  let disposed = false;
  let progress = 0;
  let w = 0;
  let h = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, budget.dpr);
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width * dpr));
    h = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
  }
  resize();

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);

  const uni = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
  const uP = {
    mvp: uni(progPoints, 'uMVP'),
    time: uni(progPoints, 'uTime'),
    size: uni(progPoints, 'uSize'),
    near: uni(progPoints, 'uNear'),
    far: uni(progPoints, 'uFarCol'),
  };
  const uL = {
    mvp: uni(progLines, 'uMVP'),
    time: uni(progLines, 'uTime'),
    color: uni(progLines, 'uColor'),
    alpha: uni(progLines, 'uAlpha'),
  };
  const aPosP = gl.getAttribLocation(progPoints, 'aPos');
  const aSeedP = gl.getAttribLocation(progPoints, 'aSeed');
  const aPosL = gl.getAttribLocation(progLines, 'aPos');

  function mvp(t: number): M4 {
    // ponteiro com inércia: o objeto persegue o cursor, nunca cola nele
    ptr.x += (ptr.tx - ptr.x) * 0.05;
    ptr.y += (ptr.ty - ptr.y) * 0.05;

    const model = m4mul(
      m4rotY(t * 0.06 + ptr.x * 0.55 + progress * 0.9),
      m4rotX(ptr.y * -0.38 + progress * 0.3),
    );
    // scroll aproxima a câmera: transformação espacial de verdade, não translate
    const view = m4translate(0, 0, -(3.35 - progress * 0.85));
    const proj = m4perspective((46 * Math.PI) / 180, w / Math.max(1, h), 0.1, 60);
    return m4mul(proj, m4mul(view, model));
  }

  function render(timeMs: number) {
    if (disposed || gl.isContextLost()) return;
    const t = timeMs / 1000;
    const M = mvp(t);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // linhas primeiro, em alpha normal: são estrutura, não brilho
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // pre-multiplicado
    gl.useProgram(progLines);
    gl.uniformMatrix4fv(uL.mvp, false, M);
    gl.uniform1f(uL.time, t);
    gl.uniform3fv(uL.color, line);

    gl.bindBuffer(gl.ARRAY_BUFFER, bEdges);
    gl.enableVertexAttribArray(aPosL);
    gl.vertexAttribPointer(aPosL, 3, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uL.alpha, 0.30);
    gl.drawArrays(gl.LINES, 0, edges.length / 3);

    gl.bindBuffer(gl.ARRAY_BUFFER, bRings);
    gl.vertexAttribPointer(aPosL, 3, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uL.alpha, 0.68);
    gl.drawArrays(gl.LINES, 0, rings.length / 3);

    // nós em blend aditivo: o núcleo acende onde há densidade
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.useProgram(progPoints);
    gl.uniformMatrix4fv(uP.mvp, false, M);
    gl.uniform1f(uP.time, t);
    gl.uniform1f(uP.size, budget.size * Math.min(window.devicePixelRatio || 1, budget.dpr));
    gl.uniform3fv(uP.near, near);
    gl.uniform3fv(uP.far, far);

    gl.bindBuffer(gl.ARRAY_BUFFER, bNodes);
    gl.enableVertexAttribArray(aPosP);
    gl.vertexAttribPointer(aPosP, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, bSeeds);
    gl.enableVertexAttribArray(aSeedP);
    gl.vertexAttribPointer(aSeedP, 1, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.POINTS, 0, budget.nodes);
  }

  return {
    render,
    resize,
    setPointer(x, y) {
      ptr.tx = x;
      ptr.ty = y;
    },
    setProgress(p) {
      progress = p;
    },
    destroy() {
      disposed = true;
      // NUNCA chamar WEBGL_lose_context.loseContext() aqui: ele mata o contexto
      // do elemento de forma permanente, e como um canvas so entrega um
      // contexto, a proxima montagem herdaria um contexto morto. Liberar os
      // recursos basta — o GC recolhe o contexto junto com o canvas.
      if (gl.isContextLost()) return;
      [bNodes, bSeeds, bEdges, bRings].forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(progPoints);
      gl.deleteProgram(progLines);
    },
  };
}
