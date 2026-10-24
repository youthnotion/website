import React, { useEffect, useRef } from "react";
import TerraLogo from "@/components/Common/TerraLogo";
import Image from "@/compat/Image";

const CurrentProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const host = sceneHostRef.current;
    if (!section || !host) return;

    let disposed = false;
    let visible = false;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let scene: import("three").Scene | undefined;
    let camera: import("three").OrthographicCamera | undefined;
    let artwork: import("three").Group | undefined;
    let disposeScene = () => {};
    let ornaments: { group: import("three").Group; phase: number; speed: number; x: number; y: number }[] = [];

    const initialize = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !host) return;

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 4, -4, 0.1, 80);
        camera.position.z = 18;

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);

        artwork = new THREE.Group();
        scene.add(artwork);

        const palette = [0x32d6c4, 0x49c9fa, 0xffa45e, 0xb694ff, 0xff70a6];
        const geometries = [
          new THREE.IcosahedronGeometry(0.58, 1),
          new THREE.OctahedronGeometry(0.55, 0),
          new THREE.TorusKnotGeometry(0.38, 0.075, 56, 8),
          new THREE.DodecahedronGeometry(0.53, 0),
          new THREE.TorusGeometry(0.48, 0.035, 7, 48),
        ];
        const positions = [
          [-0.44, 0.28], [-0.2, -0.3], [0.04, 0.2], [0.27, -0.28], [0.45, 0.3],
          [-0.48, -0.12], [0.48, -0.12],
        ];

        ornaments = positions.map(([x, y], index) => {
          const color = palette[index % palette.length];
          const group = new THREE.Group();
          const geometry = geometries[index % geometries.length];
          const wire = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
              color,
              wireframe: index % 3 !== 2,
              transparent: true,
              opacity: index % 3 === 2 ? 0.38 : 0.32,
            }),
          );
          group.add(wire);
          const halo = new THREE.Mesh(
            new THREE.SphereGeometry(0.82, 16, 12),
            new THREE.MeshBasicMaterial({
              color,
              transparent: true,
              opacity: 0.07,
              depthWrite: false,
            }),
          );
          group.add(halo);
          group.position.set(
            x * 4 * (host!.clientWidth / Math.max(host!.clientHeight, 1)),
            y * 4,
            -1.5 - (index % 3) * 0.4,
          );
          artwork!.add(group);
          return { group, phase: index * 1.17, speed: 0.12 + (index % 3) * 0.035, x, y };
        });

        const motePositions: number[] = [];
        const moteColors: number[] = [];
        const color = new THREE.Color();
        for (let i = 0; i < 84; i += 1) {
          const x = Math.sin(i * 127.1) * 0.5 + 0.5;
          const y = Math.sin(i * 311.7 + 2) * 0.5 + 0.5;
          motePositions.push((x - 0.5) * 15, (y - 0.5) * 7.3, -2.2);
          color.setHex(palette[i % palette.length]);
          moteColors.push(color.r, color.g, color.b);
        }
        const moteGeometry = new THREE.BufferGeometry();
        moteGeometry.setAttribute("position", new THREE.Float32BufferAttribute(motePositions, 3));
        moteGeometry.setAttribute("color", new THREE.Float32BufferAttribute(moteColors, 3));
        artwork.add(
          new THREE.Points(
            moteGeometry,
            new THREE.PointsMaterial({
              size: 2.5,
              sizeAttenuation: false,
              vertexColors: true,
              transparent: true,
              opacity: 0.7,
              depthWrite: false,
            }),
          ),
        );

        disposeScene = () => {
          scene?.traverse((object) => {
            if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line)) return;
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          });
        };

        const pointer = { x: 0, y: 0 };
        const handlePointer = (event: PointerEvent) => {
          const rect = section!.getBoundingClientRect();
          pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        const clearPointer = () => { pointer.x = 0; pointer.y = 0; };
        section.addEventListener("pointermove", handlePointer);
        section.addEventListener("pointerleave", clearPointer);

        const resize = () => {
          if (!host || !renderer || !camera) return;
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          const aspect = width / height;
          camera.left = -4 * aspect;
          camera.right = 4 * aspect;
          camera.top = 4;
          camera.bottom = -4;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          ornaments.forEach(({ group, x, y }) => {
            group.position.x = x * camera!.right;
            group.position.y = y * 4;
          });
          renderer.render(scene!, camera);
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let elapsed = 0;
        const render = () => {
          elapsed += 0.012;
          artwork!.rotation.y += (pointer.x * 0.045 - artwork!.rotation.y) * 0.018;
          artwork!.rotation.x += (-pointer.y * 0.028 - artwork!.rotation.x) * 0.018;
          ornaments.forEach(({ group, phase, speed, x, y }, index) => {
            group.rotation.x = elapsed * speed + phase;
            group.rotation.y = elapsed * speed * 1.4 + phase;
            group.position.x = x * camera!.right;
            group.position.y = y * 4 + Math.sin(elapsed * 0.7 + phase) * 0.14;
            group.scale.setScalar(1.08 + Math.sin(elapsed * 1.1 + index) * 0.045);
          });
          renderer!.render(scene!, camera!);
          if (!reducedMotion && visible && !disposed) {
            raf = window.requestAnimationFrame(render);
          }
        };

        intersectionObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          window.cancelAnimationFrame(raf);
          if (visible) {
            if (reducedMotion) renderer!.render(scene!, camera!);
            else raf = window.requestAnimationFrame(render);
          }
        }, { rootMargin: "100px" });
        intersectionObserver.observe(host);

        return () => {
          section.removeEventListener("pointermove", handlePointer);
          section.removeEventListener("pointerleave", clearPointer);
        };
      } catch {
        host?.classList.add("projects-scene-unavailable");
      }
    };

    let removePointerListeners = () => {};
    initialize().then((cleanup) => {
      if (cleanup) {
        if (disposed) cleanup();
        else removePointerListeners = cleanup;
      }
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf);
      removePointerListeners();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      disposeScene();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} id="current-projects" className="projects-section relative isolate overflow-hidden py-16 bg-gray-50 dark:bg-dark-2">
      <div ref={sceneHostRef} className="projects-three-background" aria-hidden="true" />
      <div className="container relative z-10 mx-auto px-4">
        <h2 className="mb-6 text-3xl font-bold text-dark dark:text-white text-center">Current Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Example projects, replace with real data */}
          <a href="https://youthnotion.github.io/TERRA/" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none block">
            <h3 className="terra-project-heading mb-2 text-xl font-semibold text-dark dark:text-white">
              <TerraLogo size="project" />
              <span>Project TERRA</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">TRACKING AND ENVIRONMENTAL REAL-TIME RESPONSE APPARATUS</p>
          </a>
          <a href="https://youthnotion.github.io/sunagorik" target="_blank" rel="noopener noreferrer" className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none block">
            <h3 className="sunagorik-project-heading mb-2 text-xl font-semibold text-dark dark:text-white">
              <Image
                src="/images/projects/sunagorik-logo.png"
                alt="Project Sunagorik logo"
                width={42}
                height={42}
              />
              <span>Project Sunagorik</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">Promoting civic awareness and community engagement among youth.</p>
          </a>
          <button className="rounded-lg bg-white dark:bg-dark-3 p-6 shadow-md text-left transition hover:shadow-lg focus:outline-none" type="button">
            <h3 className="mb-2 text-xl font-semibold text-dark dark:text-white">Tech4Youth</h3>
            <p className="text-gray-700 dark:text-gray-300">Integrating technology for youth development and innovation.</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
