import { useEffect, useRef } from "react";
import anime from "animejs";
import Link from "@/compat/Link";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = anime.timeline({ easing: "easeOutExpo" });
    animation
      .add({ targets: root.querySelectorAll("[data-reveal]"), opacity: [0, 1], translateY: [22, 0], delay: anime.stagger(110), duration: 850 })
      .add({ targets: root.querySelectorAll(".signal-node"), scale: [0, 1], opacity: [0, 1], delay: anime.stagger(90), duration: 700 }, "-=500")
      .add({ targets: root.querySelectorAll(".signal-path"), strokeDashoffset: [anime.setDashoffset, 0], opacity: [0, 0.72], delay: anime.stagger(100), duration: 1100 }, "-=700");

    return () => animation.pause();
  }, []);

  return (
    <section ref={heroRef} id="home" className="hero-stage relative isolate overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="hero-layout">
          <div className="hero-copy">
            <div data-reveal className="hero-eyebrow"><span className="hero-eyebrow-dot" /> YOUTH-LED. FUTURE-READY.</div>
            <h1 data-reveal className="hero-heading">
              The next chapter<br />
              <span>belongs to us.</span>
            </h1>
            <p data-reveal className="hero-description">
              Youth Notion equips young people with the civic knowledge, digital tools, and confidence to shape a better future for their communities.
            </p>
            <div data-reveal className="hero-actions">
              <Link href="/#about" className="hero-primary">Discover our mission <span aria-hidden="true">↗</span></Link>
              <Link href="#current-projects" className="hero-secondary">Explore our work <span aria-hidden="true">→</span></Link>
            </div>
            <div data-reveal className="hero-proof"><span className="proof-line" /> A generation of changemakers, connected.</div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-outer"><i /><i /><i /></div>
            <div className="art-orbit orbit-middle"><i /><i /></div>
            <div className="art-orbit orbit-inner"><i /></div>
            <div className="art-core">
              <svg viewBox="0 0 180 180" role="presentation">
                <defs><linearGradient id="coreGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b4e875"/><stop offset="1" stopColor="#69c9b6"/></linearGradient></defs>
                <circle cx="90" cy="90" r="64" fill="none" stroke="url(#coreGlow)" strokeOpacity=".28" />
                <path d="M43 110c2-16 12-26 27-29m40 0c15 3 25 13 27 29M48 124c9-11 21-16 35-16s26 5 35 16" fill="none" stroke="url(#coreGlow)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="69" cy="68" r="11" fill="none" stroke="url(#coreGlow)" strokeWidth="1.5" />
                <circle cx="111" cy="68" r="11" fill="none" stroke="url(#coreGlow)" strokeWidth="1.5" />
                <circle cx="90" cy="89" r="14" fill="none" stroke="url(#coreGlow)" strokeWidth="1.5" />
                <path d="M69 48v-7m42 7v-7M90 65v-9" stroke="url(#coreGlow)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="69" cy="39" r="3" fill="#c5ee91" />
                <circle cx="111" cy="39" r="3" fill="#c5ee91" />
                <circle cx="90" cy="52" r="3" fill="#c5ee91" />
              </svg>
              <div className="core-label">YOUTH<br/>IN MOTION</div>
            </div>
            <svg className="signal-map" viewBox="0 0 620 520">
              <path className="signal-path" d="M75 155 205 90 300 185 430 115 540 190M105 350 205 90M105 350l185-45 140 120 110-175M300 185l-10 120 105 120M430 115l-30 190" />
              <path className="signal-path signal-path-dash" d="M75 155 105 350 255 430 395 425 540 190" />
              {[[75,155],[205,90],[300,185],[430,115],[540,190],[105,350],[290,305],[430,380],[395,425],[255,430]].map(([cx, cy], i) => <g className="signal-node" key={i}><circle cx={cx} cy={cy} r={i === 2 || i === 6 ? 8 : 5} /><circle className="node-halo" cx={cx} cy={cy} r="15" /></g>)}
            </svg>
            <div className="art-caption"><span>01 / 03</span><span>Ideas become impact</span></div>
            <div className="art-card"><span className="art-card-icon">✳</span><span>Curiosity<br/>creates change</span><span className="art-card-arrow">↗</span></div>
          </div>
        </div>
      </div>
      <div className="hero-bottom-line" aria-hidden="true"><span>YOUTH NOTION</span><span>LEARN · CONNECT · LEAD</span><span>EST. FOR WHAT’S NEXT</span></div>
    </section>
  );
};

export default Hero;
