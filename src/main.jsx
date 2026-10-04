import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Camera, ChevronRight, ExternalLink, Filter, Github, Layers3, Mail, Menu, Play, ShieldCheck, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './styles/global.css';
import { aiLabs, appliedProjects, allLabNodes, credentials, disciplines, journey, profile, securityProjects, sqlLabs, tools, toolLinks, walkthroughs } from './data/content.js';
import CinematicScroll from './components/CinematicScroll.jsx';
import { ImageModal, PdfModal } from './components/MediaModal.jsx';

gsap.registerPlugin(ScrollToPlugin);

function useMotionCursor() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || window.innerWidth < 900) return undefined;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return undefined;
    let x=innerWidth/2, y=innerHeight/2, rx=x, ry=y, raf=0;
    const move = (e) => { x=e.clientX; y=e.clientY; dot.style.transform=`translate3d(${x}px,${y}px,0)`; };
    const loop = () => { rx+=(x-rx)*0.13; ry+=(y-ry)*0.13; ring.style.transform=`translate3d(${rx}px,${ry}px,0)`; raf=requestAnimationFrame(loop); };
    const over = (e) => { if(e.target.closest('a,button,[data-cursor="hover"]')) document.body.classList.add('cursor-focus'); };
    const out = (e) => { if(!e.target.closest('a,button,[data-cursor="hover"]')) document.body.classList.remove('cursor-focus'); };
    addEventListener('pointermove', move, {passive:true}); document.addEventListener('pointerover', over); document.addEventListener('pointerout', out); raf=requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); document.removeEventListener('pointerover', over); document.removeEventListener('pointerout', out); };
  }, []);
}

function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const items=[...document.querySelectorAll('[data-reveal]')];
    const obs=new IntersectionObserver((entries)=>entries.forEach((entry)=>entry.isIntersecting&&entry.target.classList.add('is-visible')),{threshold:0.12});
    items.forEach(i=>obs.observe(i));
    return ()=>obs.disconnect();
  },[]);
}

function TiltCard({children, className=''}) {
  const ref=useRef(null);
  const move=(e)=>{ const el=ref.current; if(!el || innerWidth<900 || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r=el.getBoundingClientRect(); const x=((e.clientX-r.left)/r.width-.5)*2; const y=((e.clientY-r.top)/r.height-.5)*2; el.style.transform=`perspective(1400px) rotateX(${(-y*3.2).toFixed(2)}deg) rotateY(${(x*4.2).toFixed(2)}deg) translateY(-7px)`; };
  const leave=()=>{if(ref.current) ref.current.style.transform='';};
  return <article ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt-card ${className}`} data-reveal>{children}</article>;
}

function SecurityProjectCard({project,index}){
  return <TiltCard className="project-card security-card">
    <div className="project-number">{project.number}</div><div className="project-card-top"><span>{project.category}</span><Github size={18}/></div>
    <div className="project-track"><ShieldCheck size={13}/> PRIMARY TRACK</div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map(x=><span key={x}>{x}</span>)}</div>
    <a className="inline-link" href={project.repo} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={15}/></a><span className={`project-orb orb-${index}`} aria-hidden="true"/>
  </TiltCard>;
}

function AppliedCard({project,onOpen}){
  return <TiltCard className="project-card applied-card">
    <div className="applied-media"><img src={project.visual} alt="" loading="lazy"/><div className="applied-index">{project.number}</div></div>
    <div className="project-card-top"><span>{project.category}</span><BrainCircuit size={18}/></div><div className="project-track applied-track"><Layers3 size={13}/> SUPPORTING ENGINEERING TRACK</div>
    <h3>{project.name}</h3><p>{project.description}</p><div className="tag-row">{project.stack.slice(0,5).map(x=><span key={x}>{x}</span>)}</div>
    <div className="applied-actions"><button className="inline-link button-reset" type="button" onClick={()=>onOpen(project)}>Technical view <ChevronRight size={15}/></button><a className="inline-link" href={project.repo} target="_blank" rel="noreferrer">{project.repoLabel || 'GitHub'} <ArrowUpRight size={15}/></a></div>
  </TiltCard>;
}

function LabCard({item,onImage,onPdf}){ return <article className="lab-card" data-reveal><div className="lab-thumb"><img src={item.image} alt="" loading="lazy"/><button type="button" onClick={()=>onImage(item)}>Preview</button></div><div className="lab-copy"><span className="eyebrow">{item.level||'SQL LAB'}</span><h3>{item.title}</h3><div className="lab-actions"><button type="button" onClick={()=>onPdf(item)}>Report <ExternalLink size={14}/></button><a href={item.pdf} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={14}/></a></div></div></article>; }

function WalkthroughList({onPdf}){ return <div className="walkthrough-list">{walkthroughs.map(item=><article className="walkthrough" key={item.number} data-reveal><div className="walk-number">{item.number}</div><div className="walk-copy"><span className="eyebrow">VIDEO + REPORT</span><h3>{item.title}</h3></div><div className="walk-actions"><a className="circle-button" href={item.video} target="_blank" rel="noreferrer" aria-label={`Watch ${item.title}`}><Play size={15}/></a><button className="circle-button" type="button" onClick={()=>onPdf({title:item.title,pdf:item.pdf})} aria-label={`Open report for ${item.title}`}><ExternalLink size={15}/></button></div></article>)}</div>; }

function NodeArchive(){ const [active,setActive]=useState(null); const selected=useMemo(()=>allLabNodes.find(x=>x.id===active),[active]); return <section className="node-archive" data-reveal><div className="node-archive-copy"><span className="eyebrow">22 / SECURITY ARCHIVE NODES</span><h3>Evidence is preserved as a single visual archive.</h3><p>Seven AI labs, five SQL labs and ten walkthrough/report records remain individually addressable while the cinematic system presents the portfolio as one continuous body of assessment work.</p>{selected&&<div className="node-selected"><small>{selected.group}</small><strong>{selected.label}</strong></div>}</div><div className="node-cloud" aria-label="Assessment node archive">{allLabNodes.map((node,i)=><button key={node.id} type="button" className={`cloud-node ${node.accent} ${active===node.id?'active':''}`} onMouseEnter={()=>setActive(node.id)} onFocus={()=>setActive(node.id)} onClick={()=>setActive(node.id)}><span/>{String(i+1).padStart(2,'0')}</button>)}</div></section>; }

function BridgeMatrix(){ return <section className="section bridge-section" data-reveal><div className="bridge-head"><span className="eyebrow">ENGINEERING INTERSECTION</span><h2>Security is the core. Applied AI expands the systems view.</h2><p>Computer vision consumes sensor data. Machine learning turns data into models and decisions. Robotics connects perception to physical action. Security cuts across every layer: models, APIs, data, devices, identities and trust boundaries.</p></div><div className="bridge-grid">{[['01','CYBERSECURITY','Primary role focus','Assess interfaces, trust boundaries, applications, APIs and AI systems.'],['02','MACHINE LEARNING','Active learning track','Build models, evaluate pipelines, understand data quality and model behavior.'],['03','COMPUTER VISION','Applied systems work','Perception pipelines, detection, classification, XAI and edge inference.'],['04','ROBOTICS','Systems integration','Sensors, simulation, control and human-to-machine interaction.']].map(([n,t,k,d])=><article key={n}><span>{n}</span><h3>{t}</h3><strong>{k}</strong><p>{d}</p></article>)}</div></section>; }

function ProjectModal({project,onClose}){ if(!project) return null; return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${project.name} technical view`} onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><div className="media-modal project-modal"><div className="modal-bar"><div><span className="eyebrow">{project.track} / {project.category}</span><h3>{project.name}</h3></div><button className="icon-btn" onClick={onClose} aria-label="Close"><X size={18}/></button></div><div className="project-detail"><img src={project.visual} alt=""/><div><p>{project.description}</p><p>{project.detail}</p><div className="detail-stack">{project.stack.map(x=><span key={x}>{x}</span>)}</div></div></div><div className="modal-actions"><a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">Open GitHub <Github size={15}/></a></div></div></div>; }

function App(){
  const progressRef=useRef(0); const [menuOpen,setMenuOpen]=useState(false); const [chapter,setChapter]=useState(0); const [pdfItem,setPdfItem]=useState(null); const [imageItem,setImageItem]=useState(null); const [projectItem,setProjectItem]=useState(null); const [filter,setFilter]=useState('ALL');
  useMotionCursor(); useReveal();
  const scrollTo=(id)=>{setMenuOpen(false);gsap.to(window,{duration:.85,ease:'power3.inOut',scrollTo:{y:`#${id}`,offsetY:86}})};
  useEffect(()=>{ const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches; document.documentElement.classList.toggle('reduced-motion',reduce); return undefined; },[]);
  const filtered=useMemo(()=>filter==='ALL'?appliedProjects:appliedProjects.filter(x=>x.track===filter || x.category===filter),[filter]);
  const filterItems=[['ALL','ALL WORK']];
  return <div className="site-shell"><div className="cursor-dot"/><div className="cursor-ring"/><header className="site-header"><a className="wordmark" href="#top"><span>M/</span> MOE HTET AR KAR</a><div className="chapter-label"><span>SCENE</span><b>0{chapter+1}</b></div><nav className={menuOpen?'nav-open':''} aria-label="Primary">{['profile','security','archive','intelligence','journey','credentials','contact'].map(id=><button key={id} onClick={()=>scrollTo(id)}>{id}</button>)}</nav><button className="menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button></header>
  <main id="top">
    <CinematicScroll progressRef={progressRef} onChapter={setChapter}>
      <section className="intro-spacer"><div className="intro-lockup" data-reveal><span className="eyebrow">MOE HTET AR KAR (PHOE CHO)</span><h1>Security<br/><span>first.</span></h1><p>{profile.role}<br/><em>{profile.specialization}</em></p><div className="intro-actions"><a className="button button-primary" href={profile.cv} target="_blank" rel="noreferrer">View CV <ArrowUpRight size={17}/></a><button className="button button-soft" onClick={()=>scrollTo('security')}>Explore work <ArrowDown size={17}/></button></div><div className="intro-note"><span><ShieldCheck size={14}/> PRIMARY FOCUS</span><span>Cybersecurity Engineering</span><span>↘</span></div></div></section>

      <section id="profile" className="section section-profile"><div className="section-grid"><div><span className="eyebrow">01 / PROFILE</span><h2>{profile.headline}</h2></div><div className="copy-stack"><p>{profile.bio}</p><p>Recruiter-facing positioning is intentional: cybersecurity remains the primary role identity, while machine learning, computer vision and robotics are presented as supporting engineering experience and active learning work.</p></div></div><div className="discipline-grid">{disciplines.map((d,i)=><article key={d.key} data-reveal><span className="discipline-index">0{i+1}</span><h3>{d.title}</h3><p>{d.text}</p></article>)}</div></section>

      <section id="security" className="section projects-section security-section"><div className="section-head"><div><span className="eyebrow">02 / PRIMARY WORK</span><h2>Security engineering first.</h2></div><p>Five independent codebases demonstrate the main professional direction: AI/LLM security, penetration testing, endpoint analysis and security tooling.</p></div><div className="projects-grid">{securityProjects.map((p,i)=><SecurityProjectCard project={p} index={i} key={p.id}/>)}</div></section>

      <section id="archive" className="section lab-section"><div className="section-head"><div><span className="eyebrow">03 / SECURITY EVIDENCE</span><h2>Labs, reports, walkthroughs.</h2></div><p>22 evidence nodes connect the assessment artifacts without merging their underlying files or contexts.</p></div><div className="archive-metrics"><div><strong>07</strong><span>AI Security Labs</span></div><div><strong>05</strong><span>PortSwigger SQL Labs</span></div><div><strong>10</strong><span>Walkthroughs / Reports</span></div><div><strong>22</strong><span>Security Archive Nodes</span></div></div><div className="lab-archive">{aiLabs.map(item=><LabCard key={item.id} item={item} onImage={setImageItem} onPdf={setPdfItem}/>)}</div><div className="sql-intro"><span className="eyebrow">SQL INJECTION ARCHIVE</span><h3>Web security training with the evidence kept beside the learning record.</h3></div><div className="sql-grid">{sqlLabs.map(item=><LabCard key={item.id} item={item} onImage={setImageItem} onPdf={setPdfItem}/>)}</div><NodeArchive/></section>

      <section id="intelligence" className="section intelligence-section"><div className="intelligence-hero" data-reveal><div><span className="eyebrow">04 / APPLIED INTELLIGENCE</span><h2>The supporting engineering track.</h2></div><p>Machine learning, computer vision and edge systems are not presented as competing identities. They show the broader systems work that supports the primary cybersecurity path.</p></div><div className="track-bar"><div className="track-label"><Camera size={15}/><span>13 APPLIED PROJECTS</span></div><div className="filter-row" role="group" aria-label="Filter applied projects">{filterItems.map(([value,label])=><button key={value} type="button" className={filter===value?'active':''} onClick={()=>setFilter(value)}><Filter size={13}/>{label}</button>)}</div></div><div className="projects-grid applied-grid">{filtered.map(project=><AppliedCard project={project} onOpen={setProjectItem} key={project.id}/>)}</div></section>

      <BridgeMatrix/>

      <section className="section research-section"><div className="section-head"><div><span className="eyebrow">05 / WALKTHROUGHS & REPORTS</span><h2>Ten technical evidence records.</h2></div><p>Each row keeps the walkthrough, report and access path together.</p></div><WalkthroughList onPdf={setPdfItem}/></section>

      <section className="section tools-section"><div className="section-grid"><div><span className="eyebrow">06 / TOOLCHAIN</span><h2>Tools mapped to the work.</h2></div><div><div className="tools-cloud">{tools.map(tool=><span key={tool}>{tool}</span>)}</div><div className="tool-links">{toolLinks.map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name}<ExternalLink size={13}/></a>)}</div></div></div></section>

      <section id="journey" className="section journey-section"><div className="section-head"><div><span className="eyebrow">07 / TECHNICAL JOURNEY</span><h2>From fundamentals to applied AI security.</h2></div><p>The sequence shows progression rather than pretending every domain has equal professional depth.</p></div><div className="journey">{journey.map(([num,title,text])=><article key={num}><div className="journey-num">{num}</div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section id="credentials" className="section credentials-section"><div className="section-head"><div><span className="eyebrow">08 / CREDENTIALS</span><h2>Training and professional learning.</h2></div><p>Verification links remain explicit and separate from project claims.</p></div><div className="credential-grid">{credentials.map(c=><a key={c.name} className="credential" href={c.url} target="_blank" rel="noreferrer"><span>{c.name.slice(0,2).toUpperCase()}</span><div><strong>{c.name}</strong><small>{c.type}</small></div><ExternalLink size={15}/></a>)}</div></section>

      <section id="contact" className="section contact-section"><div className="contact-layout"><div><span className="eyebrow">09 / CONTACT</span><h2>For cybersecurity engineering, AI security and technical assessment work.</h2><p>GitHub and email remain the primary contact surfaces.</p></div><div className="contact-stack"><a className="contact-card" href={`mailto:${profile.email}`}><Mail/><span><small>Email</small><strong>{profile.email}</strong></span><ArrowUpRight/></a><a className="contact-card" href={profile.github} target="_blank" rel="noreferrer"><Github/><span><small>GitHub</small><strong>github.com/moe1112025</strong></span><ArrowUpRight/></a><a className="contact-card" href="https://www.youtube.com/playlist?list=PLBD2UMuXHY1w" target="_blank" rel="noreferrer"><Play/><span><small>AI Security Labs</small><strong>Walkthrough playlist</strong></span><ArrowUpRight/></a></div></div><footer><span>© 2026 Moe Htet Ar Kar (Phoe Cho)</span><span>Cybersecurity Engineer · AI Red Teamer · Penetration Tester</span></footer></section>
    </CinematicScroll>
  </main>
  <PdfModal item={pdfItem} onClose={()=>setPdfItem(null)}/><ImageModal item={imageItem} onClose={()=>setImageItem(null)}/><ProjectModal project={projectItem} onClose={()=>setProjectItem(null)}/>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
