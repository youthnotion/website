/**
 * The team page's constellation. Each person is a small octagon laid out on a
 * sunflower spiral, linked to their nearest neighbours. Light travels along the
 * links, and every few seconds one person is highlighted and named in the
 * caption. Hovering a star names that person instead. Pauses off screen, and
 * draws one still frame for people who prefer reduced motion.
 */

type Member = { name: string; role: string; lead: boolean };
type Star = Member & { ux: number; uy: number; x: number; y: number; phase: number; glow: number };
type Pulse = { from: number; to: number; progress: number };

const LIME = "168, 220, 92";
const TEAL = "79, 179, 196";
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const LINKS_PER_STAR = 2;
const SPOTLIGHT_MS = 2800;
const HOVER_RADIUS = 34;

export function mountConstellation(root: HTMLElement) {
  const canvas = root.querySelector("canvas");
  const caption = root.querySelector<HTMLElement>("[data-caption]");
  const context = canvas?.getContext("2d");
  if (!canvas || !caption || !context) return;
  const ctx = context;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const members: Member[] = JSON.parse(root.dataset.constellation ?? "[]");
  const nameEl = caption.querySelector("strong")!;
  const roleEl = caption.querySelector("span")!;

  const stars: Star[] = members.map((member, index) => {
    const radius = Math.sqrt((index + 0.5) / members.length);
    const angle = index * GOLDEN_ANGLE;
    return { ...member, ux: radius * Math.cos(angle), uy: radius * Math.sin(angle), x: 0, y: 0, phase: index * 1.7, glow: 0 };
  });

  // Each star links to its nearest neighbours; `from < to` keeps pairs unique.
  const links = new Set<string>();
  stars.forEach((star, index) => {
    stars
      .map((other, otherIndex) => ({ otherIndex, distance: Math.hypot(star.ux - other.ux, star.uy - other.uy) }))
      .filter(({ otherIndex }) => otherIndex !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, LINKS_PER_STAR)
      .forEach(({ otherIndex }) => links.add([Math.min(index, otherIndex), Math.max(index, otherIndex)].join("-")));
  });
  const linkPairs = [...links].map((link) => link.split("-").map(Number) as [number, number]);

  const pulses: Pulse[] = [];
  let width = 0;
  let height = 0;
  let spotlight = -1;
  let hovered = -1;
  let lastSwitch = 0;
  let order: number[] = [];
  let frame = 0;
  let visible = true;

  const nextSpotlight = () => {
    if (!order.length) order = stars.map((_, index) => index).sort(() => Math.random() - 0.5);
    return order.pop()!;
  };

  const showCaption = (index: number) => {
    if (index === -1) return;
    const star = stars[index];
    nameEl.textContent = star.name;
    roleEl.textContent = star.role;
    if (!reducedMotion) caption.animate([{ opacity: 0, translate: "-50% 6px" }, { opacity: 1, translate: "-50% 0" }], 360);
  };

  const place = (time: number) => {
    // Leave room for the caption below the constellation.
    const cx = width / 2;
    const cy = height * 0.45;
    const radius = Math.min(width, height) * 0.42;
    for (const star of stars) {
      star.x = cx + star.ux * radius + Math.sin(time / 2400 + star.phase) * 5;
      star.y = cy + star.uy * radius + Math.cos(time / 2900 + star.phase) * 5;
    }
  };

  const octagon = (x: number, y: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i + Math.PI / 8;
      ctx[i ? "lineTo" : "moveTo"](x + r * Math.cos(angle), y + r * Math.sin(angle));
    }
    ctx.closePath();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    const active = hovered !== -1 ? hovered : spotlight;

    ctx.lineWidth = 1;
    for (const [from, to] of linkPairs) {
      const lit = from === active || to === active;
      ctx.strokeStyle = lit ? `rgba(${LIME}, 0.55)` : `rgba(${TEAL}, 0.2)`;
      ctx.beginPath();
      ctx.moveTo(stars[from].x, stars[from].y);
      ctx.lineTo(stars[to].x, stars[to].y);
      ctx.stroke();
    }

    for (const pulse of pulses) {
      const a = stars[pulse.from];
      const b = stars[pulse.to];
      ctx.fillStyle = `rgba(${LIME}, ${Math.sin(pulse.progress * Math.PI)})`;
      ctx.beginPath();
      ctx.arc(a.x + (b.x - a.x) * pulse.progress, a.y + (b.y - a.y) * pulse.progress, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const star of stars) {
      const base = star.lead ? 9 : 5.5;
      if (star.glow > 0.01) {
        octagon(star.x, star.y, base + 8 + star.glow * 6);
        ctx.strokeStyle = `rgba(${LIME}, ${star.glow * 0.8})`;
        ctx.stroke();
        octagon(star.x, star.y, base + 16 + star.glow * 8);
        ctx.fillStyle = `rgba(${LIME}, ${star.glow * 0.1})`;
        ctx.fill();
      }
      octagon(star.x, star.y, base + star.glow * 2);
      ctx.fillStyle = star.lead || star.glow > 0.5 ? `rgb(${LIME})` : `rgba(${TEAL}, ${0.8 + star.glow * 0.2})`;
      ctx.fill();
    }
  };

  const tick = (time: number) => {
    if (!visible) {
      frame = 0;
      return;
    }

    if (time - lastSwitch > SPOTLIGHT_MS && hovered === -1) {
      lastSwitch = time;
      spotlight = nextSpotlight();
      showCaption(spotlight);
    }

    const active = hovered !== -1 ? hovered : spotlight;
    stars.forEach((star, index) => {
      star.glow += ((index === active ? 1 : 0) - star.glow) * 0.08;
    });

    if (pulses.length < 5 && Math.random() < 0.03) {
      const [a, b] = linkPairs[Math.floor(Math.random() * linkPairs.length)];
      pulses.push(Math.random() > 0.5 ? { from: a, to: b, progress: 0 } : { from: b, to: a, progress: 0 });
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].progress += 0.012;
      if (pulses[i].progress >= 1) pulses.splice(i, 1);
    }

    place(time);
    draw();
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!reducedMotion && !frame) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    place(0);
    draw();
  };

  root.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let nearest = -1;
    let nearestDistance = HOVER_RADIUS;
    stars.forEach((star, index) => {
      const distance = Math.hypot(star.x - x, star.y - y);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    if (nearest === hovered) return;
    hovered = nearest;
    showCaption(hovered);
    root.style.cursor = hovered === -1 ? "" : "pointer";
    if (reducedMotion) {
      stars.forEach((star, index) => (star.glow = index === hovered ? 1 : 0));
      draw();
    }
  });
  root.addEventListener("pointerleave", () => {
    hovered = -1;
    if (reducedMotion) {
      stars.forEach((star) => (star.glow = 0));
      draw();
    }
  });

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }).observe(canvas);

  resize();
  start();
}
