import { useEffect, useRef } from "react";
import type * as ThreeTypes from "three";
import SingleTeam from "./SingleTeam";
import { teamData } from "@/data/team";

const Team = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const roster = rosterRef.current;
    if (!roster || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    const cards = Array.from(roster.querySelectorAll<HTMLElement>(".team-card"));
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target as HTMLElement;
        const index = cards.indexOf(card);
        const animation = card.animate(
          [
            { opacity: 0, transform: "translateY(22px) scale(0.985)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: 560,
            delay: (index % 4) * 75,
            easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
          },
        );
        animation.onfinish = () => animation.cancel();
        animations.push(animation);
        observer.unobserve(card);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    cards.forEach((card) => observer.observe(card));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  useEffect(() => {
    const host = sceneRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let renderer: import("three").WebGLRenderer | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let removePointerListener = () => {};
    let disposeScene = () => {};

    const startScene = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !host) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1200);
        camera.position.z = 510;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);

        const constellation = new THREE.Group();
        scene.add(constellation);

        const globe = new THREE.Mesh(
          new THREE.IcosahedronGeometry(112, 2),
          new THREE.MeshBasicMaterial({
            color: 0x9bd69d,
            wireframe: true,
            transparent: true,
            opacity: 0.16,
          }),
        );
        constellation.add(globe);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(78, 32, 24),
          new THREE.MeshBasicMaterial({
            color: 0x7cc59f,
            transparent: true,
            opacity: 0.035,
          }),
        );
        constellation.add(core);

        const points: ThreeTypes.Vector3[] = [];
        const count = 92;
        for (let i = 0; i < count; i += 1) {
          const y = 1 - (i / (count - 1)) * 2;
          const radius = Math.sqrt(1 - y * y);
          const angle = Math.PI * (3 - Math.sqrt(5)) * i;
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * radius * 155,
              y * 155,
              Math.sin(angle) * radius * 155,
            ),
          );
        }

        const pointGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const pointCloud = new THREE.Points(
          pointGeometry,
          new THREE.PointsMaterial({
            color: 0xb9e69d,
            size: 2.5,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
          }),
        );
        constellation.add(pointCloud);

        const segments: number[] = [];
        for (let i = 0; i < points.length; i += 1) {
          for (let j = i + 1; j < points.length; j += 1) {
            const distance = points[i].distanceTo(points[j]);
            if (distance < 59 && Math.random() > 0.36) {
              segments.push(
                points[i].x,
                points[i].y,
                points[i].z,
                points[j].x,
                points[j].y,
                points[j].z,
              );
            }
          }
        }
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(segments, 3),
        );
        const lines = new THREE.LineSegments(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: 0x8ec9b1,
            transparent: true,
            opacity: 0.21,
          }),
        );
        constellation.add(lines);

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
          target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
        };
        host.addEventListener("pointermove", onPointerMove, { passive: true });
        removePointerListener = () =>
          host.removeEventListener("pointermove", onPointerMove);

        const resize = () => {
          if (!renderer || !host) return;
          const { width, height } = host.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = width < 640 ? 590 : 510;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();

        const animate = () => {
          if (disposed || !renderer) return;
          pointer.x += (target.x - pointer.x) * 0.025;
          pointer.y += (target.y - pointer.y) * 0.025;
          constellation.rotation.y = pointer.x + (reducedMotion ? 0 : performance.now() * 0.00008);
          constellation.rotation.x = pointer.y;
          renderer.render(scene, camera);
          if (!reducedMotion) frame = requestAnimationFrame(animate);
        };
        animate();

        disposeScene = () => {
          cancelAnimationFrame(frame);
          resizeObserver?.disconnect();
          removePointerListener();
          pointGeometry.dispose();
          lineGeometry.dispose();
          globe.geometry.dispose();
          (globe.material as ThreeTypes.Material).dispose();
          core.geometry.dispose();
          (core.material as ThreeTypes.Material).dispose();
          (pointCloud.material as ThreeTypes.Material).dispose();
          (lines.material as ThreeTypes.Material).dispose();
          renderer?.dispose();
          renderer?.domElement.remove();
          scene.clear();
        };
      } catch {
        host.classList.add("team-network-fallback");
      }
    };

    void startScene();
    return () => {
      disposed = true;
      disposeScene();
    };
  }, []);

  return (
    <section id="team" className="team-section">
      <div className="container team-roster-wrap">
        <div className="team-roster-heading">
          <div>
            <p>OUR PEOPLE</p>
            <h3>Different skills. Shared purpose.</h3>
          </div>
          <span>{String(teamData.length).padStart(2, "0")} TEAM MEMBERS</span>
        </div>
        <div ref={rosterRef} className="team-roster-grid">
          {teamData.map((team) => <SingleTeam key={team.id} team={team} />)}
        </div>
      </div>
    </section>
  );
};

export default Team;
