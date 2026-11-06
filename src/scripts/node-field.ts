/**
 * A quiet field of drifting nodes that link up when they come close, and lean
 * towards the pointer. Draws on a 2D canvas, pauses when off screen, and
 * renders a single still frame for people who prefer reduced motion.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };

const COLORS = ["168, 220, 92", "79, 179, 196"]; // lime, teal
const LINK_DISTANCE = 130;

export function mountNodeField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const ctx = context;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: -9999, y: -9999 };
  let nodes: Node[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let visible = true;

  const seed = () => {
    const count = Math.round(Math.min(90, (width * height) / 14000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.4 + 0.6,
      hue: Math.random() > 0.7 ? 1 : 0,
    }));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance > LINK_DISTANCE) continue;
        ctx.strokeStyle = `rgba(${COLORS[1]}, ${(1 - distance / LINK_DISTANCE) * 0.22})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const node of nodes) {
      const near = Math.max(0, 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / 180);
      ctx.fillStyle = `rgba(${COLORS[node.hue]}, ${0.45 + near * 0.55})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + near * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const step = () => {
    for (const node of nodes) {
      // Gentle pull towards the pointer when it is near.
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 200 && distance > 1) {
        node.vx += (dx / distance) * 0.004;
        node.vy += (dy / distance) * 0.004;
      }
      node.vx *= 0.995;
      node.vy *= 0.995;
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < -20) node.x = width + 20;
      if (node.x > width + 20) node.x = -20;
      if (node.y < -20) node.y = height + 20;
      if (node.y > height + 20) node.y = -20;
    }
  };

  const loop = () => {
    if (!visible) {
      frame = 0;
      return;
    }
    step();
    draw();
    frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (!reducedMotion && !frame) frame = requestAnimationFrame(loop);
  };

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }).observe(canvas);

  const host = canvas.parentElement ?? canvas;
  host.addEventListener(
    "pointermove",
    (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    },
    { passive: true },
  );
  host.addEventListener("pointerleave", () => {
    pointer.x = pointer.y = -9999;
  });

  resize();
  start();
}
