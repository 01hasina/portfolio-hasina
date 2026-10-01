'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, Check, Github, Globe2, Heart, Linkedin, Mail, Menu, Moon, Music2, Sun, X } from 'lucide-react';
import { profile } from '@/data/profile';
import { experience } from '@/data/experience';
import { education } from '@/data/education';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { achievement, engagement } from '@/data/achievements';

function SocialLink({ kind }: { kind: 'github' | 'linkedin' }) {
  const url = profile[kind];
  const Icon = kind === 'github' ? Github : Linkedin;
  if (!url) return <span className="social-placeholder" title={`${kind} profile not provided`} aria-label={`${kind} profile not provided`}><Icon size={17} /> <span className="sr-only">{kind} profile to be added</span></span>;
  return <a className="social-link" href={url} target="_blank" rel="noreferrer" aria-label={kind}><Icon size={17} /></a>;
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    setDark(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);
  const toggleTheme = () => { const next = !dark; setDark(next); localStorage.setItem('theme', next ? 'dark' : 'light'); };
  const closeMenu = () => setMenuOpen(false);
  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setFormMessage('');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Message could not be sent.');
      setFormMessage(result.message); form.reset();
    } catch (error) { setFormMessage(error instanceof Error ? error.message : 'Something went wrong.'); }
    finally { setSending(false); }
  }
  const links = [['Home', '#home'], ['About', '#about'], ['Experience', '#experience'], ['Skills', '#skills'], ['Projects', '#projects'], ['Education', '#education'], ['Contact', '#contact']];

  return <>
    <header className="navbar"><div className="nav-inner"><a href="#home" className="wordmark" aria-label="Hasina Ramisedra home">HR<span>.</span></a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}</nav>
      <div className="nav-actions"><button className="icon-button theme-button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button><div className="nav-social"><SocialLink kind="linkedin" /><SocialLink kind="github" /></div><a className="cv-button" href={profile.cvUrl} download><ArrowDownToLine size={15} /> CV</a><button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
    </div></header>

    <main>
      <section id="home" className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> AI & DATA SCIENCE · MADAGASCAR</div><h1>Building digital<br />solutions with <em>code,</em><br />data &amp; AI.</h1><p className="hero-subtitle">{profile.description}</p><p className="hero-description">Currently pursuing a Master’s degree in AI and Data Science, I combine software development experience with an interest in data, machine learning and emerging technologies.</p><div className="hero-buttons"><a className="button button-dark" href="#projects">View my projects <ArrowRight size={16} /></a><a className="button button-outline" href="#contact">Contact me <ArrowUpRight size={15} /></a></div><p className="availability"><Globe2 size={14} /> Based in {profile.location} <span>·</span> Open to new opportunities</p></div>
        <div className="hero-art" aria-label="Abstract illustration representing connected ideas"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-core"><span>HR</span><small>CODE · DATA · AI</small></div><span className="orbit-node node-a">&lt;/&gt;</span><span className="orbit-node node-b">01</span><span className="orbit-node node-c">✳</span><span className="art-label label-top">curiosity → creation</span><span className="art-label label-bottom">digital ideas, thoughtfully built</span></div>
      </section>

      <div className="marquee-band"><div className="marquee-content">{['WEB DEVELOPMENT', 'ARTIFICIAL INTELLIGENCE', 'DATA SCIENCE', 'SOFTWARE DEVELOPMENT'].map((x, i) => <span key={x}>{x}<b>✳</b></span>)}</div></div>

      <section id="about" className="section-wrap section-block"><div className="section-heading"><p className="eyebrow">01 / A LITTLE ABOUT ME</p><h2>Curious by nature.<br /><em>Builder by choice.</em></h2></div><div className="about-grid"><div className="about-main"><p className="lead">Passionnée par les systèmes d'information et le développement de solutions numériques, je développe progressivement mes compétences à travers des expériences en développement web, backend, programmation et intelligence artificielle.</p><p>Actuellement en Master en IA et Data Science à l'Institut National Supérieur de l'Informatique, je souhaite approfondir mes compétences techniques et construire une expertise solide dans le domaine du DevOps.</p><p>J'aime apprendre, découvrir de nouvelles technologies et transformer des besoins concrets en solutions numériques utiles.</p></div><div className="values-card"><span className="card-index">A few things I bring</span>{['Rigueur et sens de l’organisation', 'Sens des responsabilités', 'Esprit d’équipe', 'Sérieuse et engagée'].map((item) => <div className="value-row" key={item}><Check size={15} />{item}</div>)}</div></div></section>

      <section id="experience" className="section-wrap section-block tinted"><div className="section-heading heading-row"><div><p className="eyebrow">02 / WHERE I’VE LEARNED</p><h2>Experience<span className="accent">.</span></h2></div><p className="heading-note">A growing practice shaped by real projects and collaborative work.</p></div><div className="experience-list">{experience.map((item, i) => <article className="experience-card" key={item.company}><div className="exp-number">0{i + 1}</div><div className="exp-content"><div className="exp-topline"><h3>{item.company}{item.recent && <span className="current-badge">Recent</span>}</h3><span className="exp-period">{item.period}</span></div><p className="exp-role">{item.role}</p><p className="exp-description">{item.description}</p><div className="tag-list">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div><ArrowUpRight className="exp-arrow" size={18} /></article>)}</div></section>

      <section id="skills" className="section-wrap section-block"><div className="section-heading heading-row"><div><p className="eyebrow">03 / WHAT I WORK WITH</p><h2>Skills &amp; interests<span className="accent">.</span></h2></div><p className="heading-note">A foundation in software, with room to keep exploring.</p></div><div className="skills-grid">{skills.map((group, i) => <article className="skill-card" key={group.title}><span className="skill-count">0{i + 1}</span><h3>{group.title}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div></section>

      <section id="projects" className="section-wrap section-block project-section"><div className="section-heading heading-row"><div><p className="eyebrow">04 / SELECTED WORK</p><h2>Projects<span className="accent">.</span></h2></div><p className="heading-note">Work developed as part of professional internships.</p></div><div className="projects-grid">{projects.map((project, i) => <article className={`project-card project-${i + 1}`} key={project.title}><div className="project-visual"><div className="visual-grid"/><div className="visual-symbol">{i === 0 ? <><span className="sound-wave">▂▄▆█▆▄▂</span><span className="visual-caption">BLIT / SONO</span></> : i === 1 ? <><span className="car-line">↗</span><span className="visual-caption">PLAN · RESERVE · GO</span></> : <><span className="commerce-mark">e.</span><span className="visual-caption">DIGITAL COMMERCE</span></>}</div><span className="project-no">0{i + 1}</span></div><div className="project-info"><div className="project-eyebrow">{project.eyebrow}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tag-list">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><span className="details-link">Project details <ArrowRight size={14} /></span></div></div></article>)}</div></section>

      <section id="education" className="section-wrap section-block tinted"><div className="section-heading heading-row"><div><p className="eyebrow">05 / THE LEARNING NEVER STOPS</p><h2>Education<span className="accent">.</span></h2></div><p className="heading-note">Learning across computer science, data and responsible technology.</p></div><div className="education-layout"><div className="education-list">{education.map(item => <article className={`education-item ${item.current ? 'education-current' : ''}`} key={item.degree}><div className="edu-marker"/><div><div className="edu-period">{item.period}{item.current && <span className="current-badge">In progress</span>}</div><h3>{item.degree}</h3><p>{item.school}</p></div></article>)}</div><aside className="language-card"><p className="eyebrow">LANGUAGES</p><div className="language-row"><strong>Malagasy</strong><span>Langue maternelle</span></div><div className="language-row"><strong>Français</strong><span>Courant · parlé &amp; écrit</span></div><div className="language-row"><strong>English</strong><span>Intermediate · spoken &amp; written</span></div></aside></div></section>

      <section className="section-wrap section-block recognition"><div className="recognition-main"><p className="eyebrow">06 / RECOGNITION &amp; ENGAGEMENT</p><div className="recognition-mark">✳</div><div className="recognition-copy"><span className="recognition-kicker">DISTINCTION · {achievement.edition}</span><h2>{achievement.title}</h2><p>{achievement.description}</p><span className="recognition-meta">{achievement.place} <i>·</i> {achievement.period}</span></div></div><div className="engagement-card"><span className="engagement-icon"><Heart size={18}/></span><p className="eyebrow">YOUTH ENGAGEMENT</p><h3>{engagement.title}</h3><p className="engagement-org">{engagement.organization}</p><p className="engagement-description">{engagement.description}</p><span className="engagement-period">{engagement.period}</span></div></section>

      <section className="interest-band"><div className="interest-inner"><div><p className="eyebrow">BEYOND THE SCREEN</p><h2>Responsible tech.<br /><em>Room for wonder.</em></h2></div><div className="interest-right"><p>An interest in responsible digital practices and the relationship between technology and environmental sustainability.</p><span className="greenit-label">GREEN IT &amp; CIRCULAR ECONOMY · DIGITAL AID MONACO · 2024</span><div className="hobbies"><span><BookOpen size={15}/> Reading</span><span><Globe2 size={15}/> Travel</span><span><Music2 size={15}/> Music</span></div></div></div></section>

      <section id="contact" className="section-wrap section-block contact-section"><div className="contact-copy"><p className="eyebrow">07 / YOUR TURN</p><h2>Let’s<br /><em>connect.</em></h2><p>Interested in my profile, a project or a professional opportunity? Feel free to get in touch.</p><div className="contact-details"><a href={`mailto:${profile.email}`}><Mail size={16}/>{profile.email}<ArrowUpRight size={14}/></a><a href={`tel:${profile.phone.replaceAll(' ', '')}`}><span className="phone-icon">↗</span>{profile.phone}</a><span><Globe2 size={16}/>{profile.location}</span></div></div><form className="contact-form" onSubmit={submitContact}><div className="form-row"><label>Name<input name="name" autoComplete="name" placeholder="Your name" required minLength={2} maxLength={100}/></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254}/></label></div><label>Message<textarea name="message" placeholder="Tell me what’s on your mind..." required minLength={10} maxLength={5000} rows={5}/></label><div className="form-submit"><button className="button button-dark" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <ArrowRight size={16}/></button>{formMessage && <p className="form-message" role="status">{formMessage}</p>}</div><p className="form-privacy">Your details are only used to reply to your message.</p></form></section>
    </main>
    <footer className="footer"><div className="footer-main"><a href="#home" className="wordmark">HR<span>.</span></a><p>Built with Next.js, TypeScript &amp; curiosity.</p><div className="footer-links"><a href={`mailto:${profile.email}`}>Email</a><SocialLink kind="github"/><SocialLink kind="linkedin"/></div></div><div className="footer-bottom"><span>© 2026 Hasina Ramisedra.</span><a href="#home">Back to top <ArrowDown size={13} className="back-top-icon"/></a></div></footer>
    <button className="mobile-menu-scrim" onClick={closeMenu} aria-label="Close navigation" hidden={!menuOpen}/>
  </>;
}
