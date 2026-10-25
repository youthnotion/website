import { useEffect, useRef } from "react";
import anime from "animejs";
import * as THREE from "three";
import Link from "@/compat/Link";

const steps = [
  { number: "01", name: "Awareness", detail: "Understand the issues shaping our communities.", mark: "◎" },
  { number: "02", name: "Practical skills", detail: "Build the tools and confidence to take part.", mark: "✳" },
  { number: "03", name: "Youth leadership", detail: "Turn ideas into action alongside others.", mark: "↗" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeline = anime.timeline({ easing: "easeOutExpo" });
    timeline
      .add({ targets: section.querySelectorAll("[data-about-reveal]"), opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(100), duration: 800 })
      .add({ targets: section.querySelector(".about-flow-line"), strokeDashoffset: [anime.setDashoffset, 0], duration: 1200 }, "-=500")
      .add({ targets: section.querySelectorAll(".about-step-marker"), scale: [0.65, 1], opacity: [0, 1], delay: anime.stagger(170), duration: 650 }, "-=900")
      .add({ targets: section.querySelector(".about-impact-pulse"), scale: [0.7, 1], opacity: [0.3, 1], duration: 850 }, "-=700");

    return () => timeline.pause();
  }, []);

  useEffect(() => {
    const host = sceneHostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      host.classList.add("about-three-unavailable");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9.2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const network = new THREE.Group();
    scene.add(network);
    const anchors = [
      new THREE.Vector3(-3.2, -0.18, 0.05),
      new THREE.Vector3(-1.05, 0.55, -0.28),
      new THREE.Vector3(1.05, -0.48, 0.35),
      new THREE.Vector3(3.2, 0.2, -0.05),
    ];
    const anchorMats = [0xb8dd8b, 0x76c4aa, 0x92d19a, 0xc3e99a].map((color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.96 }));
    const anchorMeshes = anchors.map((position, index) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(index === 3 ? 0.105 : 0.082, 20, 20), anchorMats[index]);
      mesh.position.copy(position);
      network.add(mesh);
      return mesh;
    });

    const routeMaterial = new THREE.LineBasicMaterial({ color: 0x95c58c, transparent: true, opacity: 0.47 });
    const routeCurves: THREE.QuadraticBezierCurve3[] = [];
    for (let i = 0; i < anchors.length - 1; i++) {
      const from = anchors[i];
      const to = anchors[i + 1];
      const control = new THREE.Vector3((from.x + to.x) / 2, (from.y + to.y) / 2 + (i % 2 ? -0.38 : 0.42), (from.z + to.z) / 2 + 0.28);
      const curve = new THREE.QuadraticBezierCurve3(from, control, to);
      routeCurves.push(curve);
      network.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), routeMaterial));
    }

    const signalMaterials = [0xc7f38e, 0x8de0bd, 0xb3e9a1].map((color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.96 }));
    const signalGlowMaterials = [0xc7f38e, 0x8de0bd, 0xb3e9a1].map((color) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.17, depthWrite: false }));
    const signals = signalMaterials.map((material, index) => {
      const courier = new THREE.Group();
      const glow = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), signalGlowMaterials[index]);
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), material);
      courier.add(glow, core);
      network.add(courier);
      return courier;
    });

    const random = (seed: number) => {
      const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return value - Math.floor(value);
    };
    const particles: { mesh: THREE.Mesh; base: THREE.Vector3; phase: number }[] = [];
    const particleColors = [0x8ec98f, 0x75bfae, 0xc1e894];
    const edgePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 38; i++) {
      const cluster = i % anchors.length;
      const center = anchors[cluster];
      const base = new THREE.Vector3(center.x + (random(i + 1) - 0.5) * 1.05, center.y + (random(i + 39) - 0.5) * 1.1, center.z + (random(i + 81) - 0.5) * 1.55);
      const material = new THREE.MeshBasicMaterial({ color: particleColors[cluster % particleColors.length], transparent: true, opacity: 0.55 + random(i + 9) * 0.3 });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.018 + random(i + 17) * 0.022, 8, 8), material);
      mesh.position.copy(base);
      network.add(mesh);
      particles.push({ mesh, base, phase: random(i + 111) * Math.PI * 2 });
      if (random(i + 201) > 0.27) {
        edgePoints.push(base, center);
      }
    }
    network.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(edgePoints), new THREE.LineBasicMaterial({ color: 0x74aea0, transparent: true, opacity: 0.2 })));

    const pointer = { x: 0, y: 0 };
    const handlePointer = (event: PointerEvent) => {
      const rect = host!.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const clearPointer = () => { pointer.x = 0; pointer.y = 0; };
    host.addEventListener("pointermove", handlePointer);
    host.addEventListener("pointerleave", clearPointer);

    const resizeObserver = new ResizeObserver(() => {
      const width = host!.clientWidth;
      const height = host!.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = width < 460 ? 10.4 : 9.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    let frame = 0;
    let raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = () => {
      const time = frame * 0.012;
      network.rotation.y += ((pointer.x * 0.12) - network.rotation.y) * 0.025;
      network.rotation.x += ((-pointer.y * 0.065) - network.rotation.x) * 0.025;
      particles.forEach(({ mesh, base, phase }) => {
        mesh.position.y = base.y + Math.sin(time + phase) * 0.045;
        mesh.position.x = base.x + Math.cos(time * 0.8 + phase) * 0.025;
      });
      anchorMeshes.forEach((mesh, index) => {
        const pulse = 1 + Math.sin(time * 1.4 + index * 1.5) * 0.075;
        mesh.scale.setScalar(pulse);
      });
      signals.forEach((signal, index) => {
        const journey = (time * 0.2 + index / signals.length) % 1;
        const routePosition = journey * routeCurves.length;
        const routeIndex = Math.min(Math.floor(routePosition), routeCurves.length - 1);
        signal.position.copy(routeCurves[routeIndex].getPoint(routePosition - routeIndex));
      });
      renderer.render(scene, camera);
      frame++;
      if (!reducedMotion) raf = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", handlePointer);
      host.removeEventListener("pointerleave", clearPointer);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-story">
      <div className="container">
        <div className="about-intro" data-about-reveal>
          <div className="about-copy">
            <span className="about-kicker">WHY YOUTH NOTION</span>
            <h2>Potential becomes progress when young people can take part.</h2>
            <p>Youth Notion helps young people understand the challenges around them, gain practical skills, and lead action that makes a difference in their communities.</p>
            <Link href="/projects" className="about-link">See what we’re building <span aria-hidden="true">↗</span></Link>
          </div>
          <div ref={sceneHostRef} className="about-three" role="img" aria-label="An animated three-dimensional network connecting youth awareness, skills, leadership, and community impact">
            <span className="about-three-caption">CONNECTED IDEAS. SHARED PROGRESS.</span>
          </div>
        </div>

        <div className="about-journey" aria-label="How Youth Notion turns potential into community impact">
          <svg className="about-flow" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="about-flow-line" d="M70 50H930" />
          </svg>
          <div className="about-steps">
            {steps.map((step) => (
              <article className="about-step" key={step.number} data-about-reveal>
                <div className="about-step-marker"><span>{step.mark}</span></div>
                <span className="about-step-number">{step.number} / THE JOURNEY</span>
                <h3>{step.name}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
            <article className="about-step about-impact" data-about-reveal>
              <div className="about-step-marker about-impact-pulse"><span>✦</span></div>
              <span className="about-step-number">THE OUTCOME</span>
              <h3>Community impact</h3>
              <p>More informed, capable young people shaping a stronger future together.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
