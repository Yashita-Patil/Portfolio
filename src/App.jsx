import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

const colors = {
  greenDark: "#1a2e1a",
  greenMid: "#243d24",
  greenLight: "#2f5230",
  amber: "#e8a020",
  amberLight: "#f5c842",
  cream: "#f5f0e8",
  creamDark: "#ece5d5",
  black: "#0d0d0d",
  rust: "#b85a18",
};

const styles = {
  globalFont: `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');`,
};

/* ── HOOK: scroll-triggered fade-in ── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── FADE WRAPPER ── */
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── NAV ── */
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(26,46,26,0.97)" : colors.greenDark,
      backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 52px",
      transition: "background 0.3s",
      borderBottom: scrolled ? `1px solid rgba(232,160,32,0.15)` : "none",
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.1rem", color: colors.cream,
        display: "flex", alignItems: "center", gap: 10,
        cursor: "pointer",
      }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span style={{ color: colors.amber }}>✦</span> Yashita Patil
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["about", "experience", "projects", "skills"].map(id => (
          <button key={id} onClick={() => scroll(id)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: active === id ? colors.amber : colors.cream,
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem", letterSpacing: "0.05em",
            opacity: active === id ? 1 : 0.8,
            transition: "color 0.2s, opacity 0.2s",
          }}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <button onClick={() => scroll("contact")} style={{
          background: colors.amber, color: colors.black,
          border: "none", cursor: "pointer",
          padding: "10px 22px", borderRadius: 30,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.75rem", fontWeight: 700,
          letterSpacing: "0.04em",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = colors.amberLight}
          onMouseLeave={e => e.target.style.background = colors.amber}
        >
          Get in touch!
        </button>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section id="home" style={{
      background: colors.greenDark,
      minHeight: "100vh",
      padding: "110px 52px 80px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 60,
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* BG text */}
      <div style={{
        position: "absolute", right: -80, top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(6rem,14vw,12rem)",
        WebkitTextStroke: `1.5px rgba(232,160,32,0.12)`,
        color: "transparent",
        pointerEvents: "none", whiteSpace: "nowrap",
        letterSpacing: "-0.02em",
      }}>
        PORTFOLIO
      </div>

      {/* Left */}
      <div style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
        position: "relative", zIndex: 2,
      }}>
        <span style={{
          display: "inline-block",
          background: colors.amber, color: colors.black,
          fontSize: "0.68rem", fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          padding: "6px 18px", borderRadius: 20,
          marginBottom: 28, fontFamily: "'Space Mono', monospace",
        }}>
          Full Stack Developer
        </span>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(4rem,9vw,8.5rem)",
          lineHeight: 0.88, color: colors.cream,
          marginBottom: 36,
        }}>
          PORT
          <span style={{
            display: "block",
            WebkitTextStroke: `1.5px ${colors.amber}`,
            color: "transparent",
          }}>
            FOLIO
          </span>
        </h1>

        <p style={{
          color: colors.cream, opacity: 0.65,
          fontSize: "0.83rem", lineHeight: 1.95,
          maxWidth: 380, marginBottom: 38,
          fontFamily: "'Space Mono', monospace",
        }}>
          I love building things for the web and solving problems through clean, functional code.
          I approach challenges in a rational, pragmatic way — crafting solutions that are simple and impactful.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "✉", label: "patilyashita22@gmail.com", href: "mailto:patilyashita22@gmail.com" },
            { icon: "✆", label: "+91 7498242447", href: "tel:7498242447" },
            { icon: "in", label: "linkedin.com/in/yashita-patil", href: "#" },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} style={{
              color: colors.amber, fontSize: "0.78rem",
              textDecoration: "none", letterSpacing: "0.03em",
              fontFamily: "'Space Mono', monospace",
              display: "flex", alignItems: "center", gap: 10,
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.65"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <span style={{
                background: `rgba(232,160,32,0.12)`,
                border: `1px solid rgba(232,160,32,0.35)`,
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", flexShrink: 0,
              }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Right */}
      <div style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
        display: "flex", justifyContent: "center",
        position: "relative", zIndex: 2,
      }}>
        {/* Photo */}
        <div style={{
          width: 320, height: 400,
          background: `linear-gradient(135deg, ${colors.rust} 0%, #7a3510 100%)`,
          clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
          position: "relative", overflow: "hidden",
          flexShrink: 0,
        }}>
          <img
            src="/photo.jpg"
            alt="Yashita Patil"
            onError={e => { e.currentTarget.style.display = "none"; }}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute", bottom: 20, left: 20,
            background: "rgba(0,0,0,0.55)",
            color: colors.cream,
            padding: "8px 16px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem", letterSpacing: "0.06em",
            backdropFilter: "blur(4px)",
          }}>
            📍 Pune, India
          </div>
        </div>

        {/* Badge */}
        <div style={{
          position: "absolute", bottom: 20, right: "calc(50% - 200px)",
          background: colors.amber,
          width: 86, height: 86, borderRadius: "50%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontFamily: "'DM Serif Display', serif",
          fontSize: "2rem", color: colors.black,
          lineHeight: 1,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          YP
        </div>
      </div>

      {/* Scroll down */}
      <a href="#about" onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
        style={{
          position: "absolute", bottom: 36, left: "50%",
          transform: "translateX(-50%)",
          background: colors.amber, color: colors.black,
          width: 88, height: 88, borderRadius: "50%",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textDecoration: "none",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.62rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.07em",
          gap: 3, zIndex: 5,
          animation: "pulse 2.5s ease-in-out infinite",
        }}>
        <span style={{ fontSize: "1.2rem" }}>↓</span>
        Scroll
      </a>
    </section>
  );
}

/* ── TICKER ── */
function Ticker() {
  const items = ["MERN Stack", "JavaScript", "React.js", "Node.js", "HTML & CSS", "MongoDB", "JSON APIs", "Full Stack Dev", "Responsive Design", "API Integration"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: colors.black,
      overflow: "hidden", padding: "22px 0",
      display: "flex",
    }}>
      <div style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "ticker 22s linear infinite",
      }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.15rem",
            color: i % 2 === 0 ? colors.amber : `rgba(232,160,32,0.3)`,
            flexShrink: 0,
          }}>
            {i % 1 === 0 && i % 2 !== 0 ? "✦" : t}
            {i % 2 === 0 && <span style={{ color: "rgba(245,240,232,0.25)", marginLeft: 48 }}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── ABOUT ── */
function About() {
  return (
    <section id="about" style={{
      background: colors.cream,
      padding: "100px 52px",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80, alignItems: "start",
    }}>
      <FadeUp>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.8rem,5vw,4.5rem)",
          lineHeight: 1, marginBottom: 28, color: colors.black,
        }}>
          Hello,<br />I'm <span style={{ color: colors.amber, fontStyle: "italic" }}>Yashita!</span>
        </h2>
        <p style={{
          fontSize: "0.85rem", lineHeight: 2, color: "#3a3a3a",
          fontFamily: "'Space Mono', monospace", maxWidth: 420,
        }}>
          I am a dynamic Full Stack Developer and intern at Sumago Infotech Private Ltd,
          skilled in building responsive web applications using the MERN Stack, JavaScript,
          HTML, and CSS — integrating third-party services through JSON APIs.
          <br /><br />
          I have a proven ability to collaborate effectively with teams to achieve project
          goals and enhance software performance. Currently based in Pune, India.
        </p>
        <a href="mailto:patilyashita22@gmail.com" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: colors.amber, color: colors.black,
          padding: "13px 30px", borderRadius: 30,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.78rem", fontWeight: 700,
          textDecoration: "none", marginTop: 32,
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = colors.amberLight}
          onMouseLeave={e => e.currentTarget.style.background = colors.amber}
        >
          ✉ Get in touch
        </a>
      </FadeUp>

      <FadeUp delay={150} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Contact card */}
        <div style={{
          background: colors.greenDark, color: colors.cream,
          padding: "28px 32px",
          clipPath: "polygon(0 0,100% 0,100% 85%,95% 100%,0 100%)",
        }}>
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.5rem", color: colors.amber, marginBottom: 14,
          }}>Contact</h3>
          <p style={{ fontSize: "0.8rem", lineHeight: 2, opacity: 0.85, fontFamily: "'Space Mono', monospace" }}>
            📍 Pune, India 411001<br />
            ✉ patilyashita22@gmail.com<br />
            📞 +91 7498242447
          </p>
        </div>
        {/* Soft skills */}
        <div style={{
          background: colors.greenDark, color: colors.cream,
          padding: "28px 32px",
          clipPath: "polygon(0 0,100% 0,100% 85%,95% 100%,0 100%)",
        }}>
          <h3 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1.5rem", color: colors.amber, marginBottom: 14,
          }}>Soft Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["#Creativity", "#Communication", "#Collaboration", "#Detail-oriented", "#Problem-solving", "#Adaptability"].map(s => (
              <span key={s} style={{
                background: "rgba(232,160,32,0.12)",
                border: `1px solid ${colors.amber}`,
                color: colors.amber,
                padding: "5px 14px", borderRadius: 20,
                fontSize: "0.7rem", letterSpacing: "0.05em",
                fontFamily: "'Space Mono', monospace",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

/* ── EXPERIENCE & EDUCATION ── */
const timelineItemStyle = {
  display: "grid",
  gridTemplateColumns: "90px 1fr",
  gap: 16,
  paddingBottom: 36,
  paddingLeft: 20,
  borderLeft: `2px solid rgba(26,46,26,0.2)`,
  position: "relative",
};

function TimelineItem({ year, title, sub, desc }) {
  return (
    <div style={{ ...timelineItemStyle }}>
      <div style={{
        position: "absolute", left: -9, top: 4,
        color: colors.amber, fontSize: "0.9rem",
        lineHeight: 1,
      }}>◆</div>
      <span style={{
        fontSize: "0.68rem", color: colors.amber,
        fontWeight: 700, letterSpacing: "0.06em",
        fontFamily: "'Space Mono', monospace",
        paddingTop: 2, lineHeight: 1.5,
      }}>{year}</span>
      <div>
        <h4 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.05rem", marginBottom: 4, color: colors.black,
        }}>{title}</h4>
        <p style={{ fontSize: "0.7rem", opacity: 0.55, marginBottom: 8, fontFamily: "'Space Mono', monospace" }}>{sub}</p>
        <p style={{ fontSize: "0.78rem", lineHeight: 1.85, opacity: 0.7, fontFamily: "'Space Mono', monospace" }}>{desc}</p>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{
      background: colors.creamDark,
      padding: "100px 52px",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80,
    }}>
      <FadeUp>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.2rem,4vw,3.5rem)",
          lineHeight: 1, marginBottom: 40, color: colors.black,
        }}>
          Edu<span style={{ color: colors.amber, fontStyle: "italic" }}>cation</span>
        </h2>
        <div>
          <TimelineItem
            year="2025–2028"
            title="MIT Academy of Engineering"
            sub="B.Tech in Computer Engineering"
            desc="Currently pursuing a Bachelor's degree in Computer Engineering with a focus on software development, full stack web technologies, AI-based applications, and modern computing practices."
          />

          <TimelineItem
            year="2022–2025"
            title="Government Polytechnic, Nashik"
            sub="Diploma in Computer Engineering"
            desc="Completed diploma studies with a strong foundation in programming, database management, web development, and software engineering principles through academic and project-based learning."
          />
          <TimelineItem
            year="2022"
            title="Shri N.T. Mundada Global View School"
            sub="SSC — Amalner, Jalgaon"
            desc="Completed secondary education with a strong academic foundation."
          />
        </div>
      </FadeUp>

      <FadeUp delay={150}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.2rem,4vw,3.5rem)",
          lineHeight: 1, marginBottom: 40, color: colors.black,
        }}>
          Experi<span style={{ color: colors.amber, fontStyle: "italic" }}>ence</span>
        </h2>
        <div>
          <TimelineItem
            year="01/2025 – 06/2025"
            title="Intern — Sumago Infotech Pvt Ltd"
            sub="Nashik, IN"
            desc="Developed responsive web apps with JavaScript, HTML & CSS. Collaborated with teams on project requirements, integrated third-party APIs, assisted in debugging, and completed design projects aligned with legal and performance standards."
          />
        </div>
      </FadeUp>
    </section>
  );
}

/* ── PROJECTS ── */
const projects = [
  {
    num: "01",
    tag: "Full Stack",
    title: "Elavare – AI Career Assistant",
    desc: "An AI-powered career guidance platform built using the MERN Stack. Features career planning tools, interview preparation modules, onboarding forms, and AI-based mock interview quiz generation through API integration.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "REST API"],
    featured: true,
  },
  {
    num: "02",
    tag: "Machine Learning",
    title: "Crop Disease Detection System",
    desc: "A machine learning-based web application designed to detect crop diseases from uploaded plant images. Includes image processing, disease prediction, and a user-friendly interface for real-time analysis and monitoring.",
    stack: ["Python", "Machine Learning", "Flask", "React", "OpenCV"],
  },
  {
    num: "03",
    tag: "Full Stack",
    title: "Carbon Footprint Scanner",
    desc: "A web-based application that analyzes and estimates users’ carbon footprint based on daily activities and resource consumption. Features interactive dashboards, environmental impact calculations, and responsive UI design.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JavaScript", "REST API"],
  },
  {
    num: "04",
    tag: "Coming Soon",
    title: "Project 4",
    desc: null,
    stack: [],
    placeholder: true,
  },
];

function ProjectCard({ p }) {
  const [hovered, setHovered] = useState(false);

  if (p.placeholder) {
    return (
      <div style={{
        background: `rgba(232,160,32,0.05)`,
        border: `1.5px dashed rgba(232,160,32,0.28)`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", minHeight: 200,
        padding: 36,
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>🚧</div>
        <strong style={{ color: colors.amber, fontSize: "1rem", fontFamily: "'DM Serif Display', serif", display: "block", marginBottom: 8 }}>
          Project 4 — Coming Soon
        </strong>
        <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.78rem", fontFamily: "'Space Mono', monospace" }}>
          This project will be added shortly.<br />Stay tuned!
        </p>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? colors.greenLight : colors.greenMid,
        padding: 36, position: "relative", overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.3s ease, background 0.3s ease",
        ...(p.featured ? { gridRow: "span 2" } : {}),
      }}
    >
      <div style={{
        position: "absolute", top: 10, right: 18,
        fontFamily: "'DM Serif Display', serif",
        fontSize: "5rem", color: "rgba(232,160,32,0.08)",
        lineHeight: 1, pointerEvents: "none",
      }}>{p.num}</div>

      <span style={{
        display: "inline-block",
        background: colors.amber, color: colors.black,
        fontSize: "0.63rem", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        padding: "4px 12px", borderRadius: 12,
        marginBottom: 20,
        fontFamily: "'Space Mono', monospace",
      }}>{p.tag}</span>

      <h3 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: p.featured ? "2rem" : "1.5rem",
        color: colors.cream, lineHeight: 1.2, marginBottom: 14,
      }}>{p.title}</h3>

      <p style={{
        fontSize: "0.78rem", color: "rgba(245,240,232,0.6)",
        lineHeight: 1.85, marginBottom: 26,
        fontFamily: "'Space Mono', monospace",
      }}>{p.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {p.stack.map(s => (
          <span key={s} style={{
            border: `1px solid rgba(232,160,32,0.4)`,
            color: colors.amber, fontSize: "0.65rem",
            padding: "4px 10px", borderRadius: 10,
            letterSpacing: "0.05em",
            fontFamily: "'Space Mono', monospace",
          }}>{s}</span>
        ))}
      </div>

      <div style={{
        position: "absolute", bottom: 28, right: 28,
        width: 42, height: 42, borderRadius: "50%",
        background: hovered ? colors.amberLight : colors.amber,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem", color: colors.black,
        transition: "background 0.2s",
      }}>→</div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ background: colors.greenDark, padding: "100px 52px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 60,
      }}>
        <FadeUp>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.8rem,5vw,4.5rem)",
            lineHeight: 1, color: colors.cream, margin: 0,
          }}>
            My <span style={{ color: colors.amber, fontStyle: "italic" }}>Work</span>
          </h2>
        </FadeUp>
        <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          style={{
            color: colors.amber, fontSize: "0.78rem",
            textDecoration: "none",
            borderBottom: `1px solid ${colors.amber}`,
            paddingBottom: 2,
            fontFamily: "'Space Mono', monospace",
          }}>
          Collaborate →
        </a>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
        gap: 24,
      }}>
        {projects.map((p, i) => (
          <FadeUp key={p.num} delay={i * 80}>
            <ProjectCard p={p} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ── CERTIFICATIONS ── */
const certs = [
  { icon: "🏆", title: "MERN Stack Developer", desc: "Certified in full stack development using MongoDB, Express.js, React, and Node.js. Covers end-to-end application development and deployment." },
  { icon: "💻", title: "C++ Programming", desc: "Certified in C++ fundamentals including OOP, data structures, memory management, and algorithm design." },
  { icon: "⚙️", title: "C Programming", desc: "Certified in C programming with expertise in procedural programming, pointers, file handling, and system-level concepts." },
];

function Certifications() {
  return (
    <section id="certifications" style={{ background: colors.cream, padding: "100px 52px" }}>
      <FadeUp>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.8rem,5vw,4.5rem)",
          lineHeight: 1, marginBottom: 56, color: colors.black,
        }}>
          Certifi<span style={{ color: colors.amber, fontStyle: "italic" }}>cations</span>
        </h2>
      </FadeUp>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
      }}>
        {certs.map((c, i) => (
          <FadeUp key={c.title} delay={i * 100}>
            <CertCard cert={c} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function CertCard({ cert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.greenDark,
        padding: "32px",
        clipPath: "polygon(0 0,100% 0,100% 90%,90% 100%,0 100%)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.25s ease",
        cursor: "default",
      }}>
      <span style={{ fontSize: "2rem", display: "block", marginBottom: 14 }}>{cert.icon}</span>
      <h4 style={{
        fontFamily: "'DM Serif Display', serif",
        color: colors.amber, fontSize: "1.1rem", marginBottom: 8,
      }}>{cert.title}</h4>
      <p style={{
        color: "rgba(245,240,232,0.6)", fontSize: "0.76rem", lineHeight: 1.75,
        fontFamily: "'Space Mono', monospace",
      }}>{cert.desc}</p>
    </div>
  );
}

/* ── SKILLS ── */
const skillGroups = [
  { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"], highlight: ["HTML", "CSS"] },
  { label: "Backend", skills: ["Node.js", "Express.js", "MongoDB", "REST API", "JSON APIs"] },
  { label: "Tools & Other", skills: ["Git & GitHub", "Project Management", "API Integration", "Debugging", "C / C++"] },
];

const languages = [
  { name: "English", level: "Proficient", pct: 80 },
  { name: "Hindi", level: "Native", pct: 100 },
  { name: "Marathi", level: "Native", pct: 100 },
];

function Skills() {
  return (
    <section id="skills" style={{
      background: colors.black,
      padding: "100px 52px",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: 80,
    }}>
      <FadeUp>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.8rem,5vw,4.5rem)",
          lineHeight: 1, marginBottom: 48, color: colors.cream,
        }}>
          Tech<br /><span style={{ color: colors.amber, fontStyle: "italic" }}>Skills</span>
        </h2>
        {skillGroups.map(g => (
          <div key={g.label} style={{ marginBottom: 32 }}>
            <h4 style={{
              fontFamily: "'DM Serif Display', serif",
              color: colors.amber, fontSize: "1.1rem", marginBottom: 14,
            }}>{g.label}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {g.skills.map(s => {
                const hl = g.highlight?.includes(s);
                return (
                  <SkillPill key={s} label={s} highlight={hl} />
                );
              })}
            </div>
          </div>
        ))}
      </FadeUp>

      <FadeUp delay={150}>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "2rem",
          lineHeight: 1, marginBottom: 40, color: colors.cream,
        }}>
          Lang<span style={{ color: colors.amber, fontStyle: "italic" }}>uages</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {languages.map(l => (
            <div key={l.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: colors.cream, fontSize: "1.05rem",
                }}>{l.name}</span>
                <span style={{
                  fontSize: "0.7rem", color: colors.amber,
                  letterSpacing: "0.06em",
                  fontFamily: "'Space Mono', monospace",
                }}>{l.level}</span>
              </div>
              <div style={{ height: 3, background: "rgba(245,240,232,0.1)", borderRadius: 2 }}>
                <div style={{
                  height: "100%", width: `${l.pct}%`,
                  background: colors.amber, borderRadius: 2,
                  transition: "width 1s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 16, marginTop: 56,
        }}>
          {[
            { val: "6mo+", label: "Industry Experience" },
            { val: "3+", label: "Certifications" },
            { val: "MERN", label: "Primary Stack" },
            { val: "2028", label: "Will be Graduating By 2028" },
          ].map(s => (
            <div key={s.label} style={{
              background: colors.greenDark,
              padding: "20px 22px",
              clipPath: "polygon(0 0,100% 0,100% 80%,92% 100%,0 100%)",
            }}>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "1.8rem", color: colors.amber, lineHeight: 1,
              }}>{s.val}</div>
              <div style={{
                fontSize: "0.68rem", color: "rgba(245,240,232,0.5)",
                marginTop: 6, fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.05em",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

function SkillPill({ label, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered || highlight ? "rgba(232,160,32,0.12)" : "rgba(245,240,232,0.06)",
        border: `1px solid ${highlight || hovered ? colors.amber : "rgba(245,240,232,0.15)"}`,
        color: highlight || hovered ? colors.amber : colors.cream,
        padding: "8px 18px", borderRadius: 20,
        fontSize: "0.75rem", letterSpacing: "0.04em",
        fontFamily: "'Space Mono', monospace",
        cursor: "default",
        transition: "all 0.2s ease",
      }}>
      {label}
    </span>
  );
}

/* ── EmailJS credentials ── */
// Replace these three values with your own from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = "service_rsf1qv5";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_hg8redq";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY = "XEMhFBsfGxK4MMdL0";   // e.g. "aBcDeFgHiJkLmNoP"

/* ── CONTACT ── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSend = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: "patilyashita22@gmail.com",
          reply_to: form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" style={{
      background: colors.greenDark,
      padding: "100px 52px",
      position: "relative", overflow: "hidden",
    }}>
      {/* bg text */}
      <div style={{
        position: "absolute", bottom: -60, right: -40,
        fontFamily: "'DM Serif Display', serif",
        fontSize: "14rem",
        WebkitTextStroke: `1px rgba(232,160,32,0.07)`,
        color: "transparent", lineHeight: 1,
        pointerEvents: "none", userSelect: "none",
      }}>YP</div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: 80, position: "relative", zIndex: 2,
      }}>
        <FadeUp>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.8rem,5vw,4.5rem)",
            lineHeight: 1, color: colors.cream, marginBottom: 22,
          }}>
            Let's<br /><span style={{ color: colors.amber, fontStyle: "italic" }}>Connect!</span>
          </h2>
          <p style={{
            fontSize: "0.82rem", color: "rgba(245,240,232,0.6)",
            lineHeight: 1.95, marginBottom: 40,
            fontFamily: "'Space Mono', monospace", maxWidth: 360,
          }}>
            I'm open to full-time roles, freelance projects, and exciting collaborations.
            Drop me a message and let's build something great together.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {[
              { icon: "📍", label: "Location", val: "Pune, India 411001" },
              { icon: "✉", label: "Email", val: "patilyashita22@gmail.com" },
              { icon: "📞", label: "Phone", val: "+91 7498242447" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(232,160,32,0.12)",
                  border: `1px solid ${colors.amber}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", flexShrink: 0,
                }}>{c.icon}</div>
                <div>
                  <div style={{
                    fontSize: "0.64rem", color: colors.amber,
                    letterSpacing: "0.09em", textTransform: "uppercase",
                    fontFamily: "'Space Mono', monospace", marginBottom: 2,
                  }}>{c.label}</div>
                  <div style={{ fontSize: "0.8rem", color: colors.cream, fontFamily: "'Space Mono', monospace" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={150}>
          {sent ? (
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: "100%", gap: 16, textAlign: "center",
            }}>
              <div style={{ fontSize: "3.5rem" }}>✦</div>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                color: colors.amber, fontSize: "2rem",
              }}>Message Sent!</h3>
              <p style={{
                color: "rgba(245,240,232,0.65)", fontSize: "0.82rem",
                fontFamily: "'Space Mono', monospace",
              }}>Thank you! I'll get back to you soon at {form.email}.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                style={{
                  marginTop: 12,
                  background: "transparent",
                  border: `1px solid ${colors.amber}`,
                  color: colors.amber,
                  padding: "10px 26px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(232,160,32,0.1)"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; }}
              >
                Send another
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { key: "name", label: "Your Name", placeholder: "Jane Smith", type: "text" },
                { key: "email", label: "Email Address", placeholder: "jane@example.com", type: "email" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{
                    display: "block", fontSize: "0.68rem", color: colors.amber,
                    letterSpacing: "0.09em", textTransform: "uppercase",
                    fontFamily: "'Space Mono', monospace", marginBottom: 8,
                  }}>{f.label}</label>
                  <input
                    id={`contact-${f.key}`}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(245,240,232,0.06)",
                      border: `1px solid rgba(245,240,232,0.15)`,
                      color: colors.cream, padding: "14px 18px",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.8rem", outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = colors.amber}
                    onBlur={e => e.target.style.borderColor = "rgba(245,240,232,0.15)"}
                  />
                </div>
              ))}
              <div>
                <label style={{
                  display: "block", fontSize: "0.68rem", color: colors.amber,
                  letterSpacing: "0.09em", textTransform: "uppercase",
                  fontFamily: "'Space Mono', monospace", marginBottom: 8,
                }}>Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  style={{
                    width: "100%", resize: "vertical",
                    background: "rgba(245,240,232,0.06)",
                    border: `1px solid rgba(245,240,232,0.15)`,
                    color: colors.cream, padding: "14px 18px",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.8rem", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = colors.amber}
                  onBlur={e => e.target.style.borderColor = "rgba(245,240,232,0.15)"}
                />
              </div>

              {error && (
                <p style={{
                  color: "#f87171", fontSize: "0.75rem",
                  fontFamily: "'Space Mono', monospace",
                  background: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  padding: "10px 16px",
                }}>{error}</p>
              )}

              <button
                id="send-message-btn"
                onClick={handleSend}
                disabled={sending}
                style={{
                  background: sending ? "rgba(232,160,32,0.5)" : colors.amber,
                  color: colors.black,
                  padding: "15px 36px", border: "none",
                  cursor: sending ? "not-allowed" : "pointer",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem", fontWeight: 700,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  alignSelf: "flex-start",
                  clipPath: "polygon(0 0,100% 0,100% 72%,93% 100%,0 100%)",
                  transition: "background 0.2s",
                  display: "flex", alignItems: "center", gap: 8,
                }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.background = colors.amberLight; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.background = colors.amber; }}
              >
                {sending ? "Sending..." : "Send Message →"}
              </button>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{
      background: colors.black,
      padding: "26px 52px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', serif",
        color: colors.cream, fontSize: "1rem",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ color: colors.amber }}>✦</span> Yashita Patil
      </span>
      <p style={{
        fontSize: "0.7rem", color: "rgba(245,240,232,0.3)",
        fontFamily: "'Space Mono', monospace",
      }}>
         © Yashita Patil. All rights reserved.
      </p>
    </footer>
  );
}

/* ── ROOT APP ── */
export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "about", "experience", "projects", "skills", "contact"];
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes pulse {
          0%,100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.07); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.greenDark}; }
        ::-webkit-scrollbar-thumb { background: ${colors.amber}; border-radius: 3px; }
      `}</style>
      <Nav active={activeSection} />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
