import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Terminal as TerminalIcon, Copy, ExternalLink, Command, Code2, Cpu,
  Network, ShieldCheck, ChevronRight,
} from "lucide-react";
import { experience, notes, projects, skills, type Project } from "./data";

const navItems = ["About", "Projects", "Skills", "Experience", "Notes", "Contact"];
const email = "amoolkumar10@gmail.com"

function Terminal({ onNavigate }: { onNavigate: (section: string) => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = useMemo(() => ["help", "whoami", "about", "projects", "skills", "experience", "contact", "resume", "clear"], []);

  function run(raw: string) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") { setHistory([]); setInput(""); return; }
    let response = "";
    if (command === "help") response = "Available: whoami, about, projects, skills, experience, contact, resume, clear";
    else if (command === "whoami") response = "Amool Kuldiya — Software Engineer. Building reliable software and exploring systems.";
    else if (command === "resume") response = "RESUME_LINK";
    else if (commands.includes(command)) {
      response = `Navigating to ${command}…`;
      if (command !== "whoami" && command !== "help") onNavigate(command);
    } else response = `command not found: ${command}. Type 'help' to see available commands.`;
    setHistory((old) => [...old, `$ ${raw}`, response]);
    setInput("");
    setCursor(-1);
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>amool@engineering-lab: ~</span>
        <span className="terminal-live"><i /> ONLINE</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-output">
          <p><span className="prompt">amool@lab</span>:<span className="path">~</span>$ <span className="muted">type help to explore</span></p>
          {history.map((line, i) => (
            <p
              key={`${i}-${line}`}
              className={
                line.startsWith("$")
                  ? "command-line"
                  : "response-line"
              }
            >
              {line === "RESUME_LINK" ? (
                <a
                  href="https://drive.google.com/file/d/1FPdwOXdjr5u1-UPExdYJAnWAiYU6FFgL/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  Open my resume ↗
                </a>
              ) : (
                line
              )}
            </p>
          ))}
        </div>
        <form className="terminal-input-row" onSubmit={(e) => { e.preventDefault(); run(input); }}>
          <label htmlFor="terminal-command"><span className="prompt">amool@lab</span>:<span className="path">~</span>$</label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") { e.preventDefault(); const next = Math.min(cursor + 1, history.filter(x => x.startsWith("$")).length - 1); setCursor(next); setInput(history.filter(x => x.startsWith("$")).slice().reverse()[next]?.slice(2) ?? ""); }
              if (e.key === "Tab") { e.preventDefault(); const match = commands.find(c => c.startsWith(input.toLowerCase())); if (match) setInput(match); }
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="try: projects"
            aria-label="Terminal command"
          />
          <button type="submit" className="terminal-run" aria-label="Run command"><ArrowRight size={15} /></button>
        </form>
        <div className="terminal-hints">{["help", "projects", "skills", "contact"].map(c => <button key={c} onClick={() => run(c)}>{c}</button>)}</div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 22, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: .2 }}>
            <div className="modal-top"><span className="eyebrow">{project.number} / PROJECT BRIEF</span><button className="icon-button" onClick={onClose} aria-label="Close project details"><X size={19} /></button></div>
            <p className="eyebrow green">{project.category}</p>
            <h2 id="modal-title">{project.name}</h2>
            <p className="modal-lead">{project.description}</p>
            <div className="modal-grid">
              <div><h3>Problem</h3><p>{project.problem}</p></div>
              <div><h3>Approach</h3><p>{project.solution}</p></div>
            </div>
            <h3>Engineering notes</h3>
            <ul className="detail-list">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="tag-row">{project.stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="modal-actions"><a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={16} /></a>{project.demo && <a className="button button-quiet" href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={15} /></a>}</div>
            <p className="fine-print">Project status: {project.status}. Details will be expanded as implementation evidence and demos become available.</p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [active, setActive] = useState("Home");
  const [selected, setSelected] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id === "home" ? "Home" : visible.target.id[0].toUpperCase() + visible.target.id.slice(1));
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, .2, .5] });
    document.querySelectorAll("main section[id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navigate = (name: string) => {
    const id = name.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(name[0].toUpperCase() + name.slice(1));
    setMenuOpen(false);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setActive("Home")}><span className="brand-mark">a.</span><span>AMOOL<span className="brand-muted">.K</span></span></a>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {navItems.map(item => <a key={item} className={active === item ? "active" : ""} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-right"><span className="availability"><i /> OPEN TO OPPORTUNITIES</span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="overline"><span className="overline-line" /> SOFTWARE ENGINEER <span className="overline-dot">/</span> INDIA</div>
            <h1>Building reliable<br /><span className="accent-text">software.</span></h1>
            <p className="hero-subtitle">Exploring systems. Shipping useful tools.</p>
            <p className="hero-description">I'm Amool — a software engineer working across frontend applications, backend services and the systems that connect them.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={16} /></a><a className="button button-quiet" href="https://github.com/Amool-kk" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a><a className="button button-quiet" href="https://www.linkedin.com/in/amool-kuldiya/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a></div>
            <div className="hero-meta"><span><span className="meta-dot" /> Currently building with React Native & Go</span></div>
          </div>
          <div className="hero-terminal"><div className="terminal-label"><TerminalIcon size={14} /> INTERACTIVE SHELL <span>TRY A COMMAND</span></div><Terminal onNavigate={navigate} /><p className="terminal-caption"><Command size={12} /> Type <code>help</code> to see what you can explore.</p></div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="section-wrap content-section" id="about">
          <div className="section-kicker">01 / ABOUT</div>
          <div className="section-heading-row"><h2>Curious by nature.<br /><span className="muted-heading">Engineer by practice.</span></h2><p className="section-intro">I enjoy turning practical problems into software that is useful, understandable and dependable.</p></div>
          <div className="about-grid">
            <div className="about-copy"><p>I'm a Software Engineer with 2+ years of professional experience building and improving production applications, primarily with React Native, React, JavaScript and TypeScript.</p><p>My day-to-day work has involved large-screen application experiences, map-based interfaces, debugging, performance improvements and automated testing. I also enjoy exploring how software behaves beyond the UI.</p><p>Outside my core work, I'm building with Go and learning more about networking, backend architecture, distributed systems and observability through hands-on projects.</p><a className="text-link" href="https://github.com/Amool-kk" target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={15} /></a></div>
            <div className="profile-panel"><div className="panel-title"><span>ENGINEERING PROFILE</span><span className="panel-status">● ACTIVE</span></div>{[{ k: "CURRENT ROLE", v: "Software Developer" }, { k: "EXPERIENCE", v: "2+ Years" }, { k: "CORE", v: "React Native · React · TS" }, { k: "EXPLORING", v: "Go · Networking · Systems" }, { k: "LOCATION", v: "India · Remote-friendly" }].map(row => <div className="profile-row" key={row.k}><span>{row.k}</span><strong>{row.v}</strong></div>)}</div>
          </div>
        </section>

        <section className="section-wrap content-section" id="projects">
          <div className="section-kicker">02 / SELECTED WORK</div>
          <div className="section-heading-row"><h2>Things I've<br /><span className="muted-heading">been building.</span></h2><p className="section-intro">A selection of projects that reflect what I like working on: useful tools, thoughtful interfaces and reliable systems.</p></div>
          <div className="projects-grid">{projects.map(project => <button className="project-card" key={project.id} onClick={() => setSelected(project)}><div className="project-card-top"><span>{project.number} / {project.category}</span><ArrowUpRight size={18} /></div><div className={`project-art art-${project.id}`}><div className="art-grid" />{project.id === "bytebridge" ? <Network size={54} /> : project.id === "atomyne" ? <Code2 size={54} /> : project.id === "hookreceiver" ? <TerminalIcon size={54} /> : <Cpu size={54} />}<span className="art-index">{project.number}</span></div><div className="project-card-body"><div className="project-title-row"><h3>{project.name}</h3><span className="status-dot" title={project.status} /></div><p>{project.summary}</p><div className="tag-row">{project.stack.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><span className="project-open">VIEW PROJECT <ChevronRight size={14} /></span></div></button>)}</div>
        </section>

        <section className="section-wrap content-section" id="skills">
          <div className="section-kicker">03 / TECHNICAL ARSENAL</div>
          <div className="section-heading-row"><h2>Tools of the<br /><span className="muted-heading">trade.</span></h2><p className="section-intro">A practical toolkit built through production work, internships and hands-on projects. The labels distinguish experience from areas I'm actively developing.</p></div>
          <div className="skills-grid">{skills.map(group => <div className="skill-group" key={group.group}><div className="skill-group-top"><h3>{group.group}</h3><span>{group.level}</span></div><div className="tag-row">{group.items.map(item => <span className="skill-chip" key={item}>{item}</span>)}</div></div>)}</div>
        </section>

        <section className="section-wrap content-section" id="experience">
          <div className="section-kicker">04 / EXPERIENCE</div>
          <div className="section-heading-row"><h2>The engineering<br /><span className="muted-heading">journey.</span></h2><p className="section-intro">Experience across production software, frontend integrations and infrastructure monitoring.</p></div>
          <div className="timeline">{experience.map((job, i) => <article className="timeline-item" key={job.company}><div className="timeline-marker">{String(i + 1).padStart(2, "0")}</div><div className="timeline-content"><div className="timeline-heading"><div><h3>{job.role}</h3><p>{job.company} <span>/ {job.kind}</span></p></div><time>{job.period}</time></div><ul>{job.points.map(point => <li key={point}>{point}</li>)}</ul><div className="tag-row">{job.stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div></article>)}</div>
          <div className="community-note"><ShieldCheck size={19} /><div><strong>Community & leadership</strong><p>Technical Lead — GNU/Linux Users' Group, NIT Durgapur · Junior Developer — Google Developer Student Clubs, NIT Durgapur.</p></div></div>
        </section>

        <section className="section-wrap content-section" id="notes">
          <div className="section-kicker">05 / ENGINEERING NOTES</div>
          <div className="section-heading-row"><h2>Learning in<br /><span className="muted-heading">the open.</span></h2><p className="section-intro">Experiments, technical questions and lessons from building. Notes link to public writing and project work.</p></div>
          <div className="notes-list">{notes.map((note, i) => <a className="note-row" href={note.url} target="_blank" rel="noreferrer" key={note.title}><span className="note-number">0{i + 1}</span><div className="note-main"><span>{note.category}</span><h3>{note.title}</h3><p>{note.detail}</p></div><ArrowUpRight size={19} /></a>)}</div>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <div className="section-kicker">06 / CONTACT</div><div className="contact-panel"><div><p className="eyebrow green">HAVE A GOOD PROBLEM?</p><h2>Let's build<br />something useful.</h2><p className="contact-copy">I'm interested in thoughtful engineering teams, useful products and problems worth solving.</p></div><div className="contact-actions"><a className="button button-primary" href={`mailto:${email}`}><Mail size={16} /> Send an email <ArrowUpRight size={15} /></a><a className="button button-quiet" href="https://www.linkedin.com/in/amool-kuldiya/" target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a><a className="button button-quiet" href="https://github.com/Amool-kk" target="_blank" rel="noreferrer"><Github size={16} /> Follow on GitHub</a><button className="copy-email" onClick={copyEmail}><Copy size={13} /> {copied ? "Copied" : "Copy email address"}</button></div></div>
        </section>
      </main>
      <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">a.</span><span>AMOOL<span className="brand-muted">.K</span></span></a><span>Built with curiosity. Maintained with care.</span><span>© {new Date().getFullYear()} Amool Kuldiya</span></footer>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
