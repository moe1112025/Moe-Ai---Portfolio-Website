import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CinematicScene from './CinematicScene.jsx';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { tag:'01 / SECURITY CORE', title:'Cybersecurity Engineer', copy:'AI red teaming, penetration testing and security engineering define the primary professional focus.' },
  { tag:'02 / ASSESSMENT', title:'Assess the system, not just the prompt.', copy:'The methodology follows applications, APIs, authentication, context, agents, tools, trust boundaries and evidence.' },
  { tag:'03 / ENGINEERING', title:'Build repeatable assessment systems.', copy:'Python, FastAPI, testing, reporting and automation turn individual experiments into reusable engineering work.' },
  { tag:'04 / APPLIED INTELLIGENCE', title:'Then move deeper into data, vision and models.', copy:'Machine learning, computer vision and edge inference appear as a supporting engineering track—not as a replacement for the security core.' },
  { tag:'05 / BRIDGE', title:'One engineering mindset. Multiple systems.', copy:'Security, machine learning, computer vision and robotics intersect through data, models, interfaces, sensors and system boundaries.' },
];

export default function CinematicScroll({ children, progressRef, onChapter }) {
  const railRef = useRef(null);
  const stageRef = useRef(null);
  const panelRefs = useRef([]);

  useLayoutEffect(() => {
    const rail = railRef.current;
    const stage = stageRef.current;
    if (!rail || !stage) return undefined;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, autoRaf: false });
    const raf = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: rail,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15,
        pin: stage,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          stage.style.setProperty('--story-progress', self.progress.toFixed(4));
          const index = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
          onChapter?.(index);
          panelRefs.current.forEach((el, i) => {
            if (!el) return;
            const local = self.progress * chapters.length - i;
            const focus = 0.50;
            const distance = Math.abs(local - focus);
            const opacity = Math.max(0, 1 - distance * 2.2);
            const y = (local - focus) * 30;
            el.style.opacity = opacity.toFixed(3);
            el.style.transform = `translate3d(0, ${y}px, 0) scale(${0.975 + opacity * 0.025})`;
          });
        },
      });
      gsap.fromTo('.site-header', { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.15 });
      gsap.utils.toArray('[data-entrance]').forEach((element) => {
        gsap.fromTo(element, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
      return () => trigger.kill();
    }, rail);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [onChapter, progressRef]);

  return (
    <>
      <section ref={railRef} className="story-rail" aria-label="Cinematic engineering narrative">
        <div ref={stageRef} className="story-stage">
          <div className="story-canvas"><CinematicScene progressRef={progressRef} /></div>
          <div className="story-vignette" />
          <div className="story-grid" />
          <div className="story-scanline" />
          <div className="story-division" aria-hidden="true" />
          <div className="story-copy-wrap">
            {chapters.map((chapter, index) => (
              <div key={chapter.tag} ref={(el) => { panelRefs.current[index] = el; }} className="story-panel">
                <span className="eyebrow">{chapter.tag}</span>
                <h2>{chapter.title}</h2>
                <p>{chapter.copy}</p>
              </div>
            ))}
          </div>
          <div className="story-progress"><span>SCENE</span><i /><span>SCROLL</span></div>
        </div>
      </section>
      {children}
    </>
  );
}
