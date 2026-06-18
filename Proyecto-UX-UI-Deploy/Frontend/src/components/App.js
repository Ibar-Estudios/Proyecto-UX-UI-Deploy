<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Research from "./ux-sections/Research";
import Planteamiento from "./ux-sections/Planteamiento";
import UserPersona from "./ux-sections/UserPersona";
import Encuestas from "./ux-sections/Encuestas";
import Entrevistas from "./ux-sections/Entrevistas";
import EmpatiaMapa from "./ux-sections/EmpatiaMapa";
import UserJourney from "./ux-sections/UserJourney";
import PointOfView from "./ux-sections/PointOfView";
import Storytelling from "./ux-sections/Storytelling";
import Storyboard from "./ux-sections/Storyboard";
import Benchmarking from './ux-sections/Benchmarking';
import CardSorting from "./ux-sections/Cardsorting";
import Dendrograma_Matriz from "./ux-sections/Dendrograma&matriz";
import MapaDeSitio from "./ux-sections/MapaDeSitio";
import TaskFlow from "./ux-sections/TaskFlow";
import UserFlow from "./ux-sections/UserFlow";
import Header from "./Header";
import Footer from "./Footer";
import SectionsNav from "./SectionsNav";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ─── Etapas del proceso ────────────────────────────────────────────────────
const ETAPAS = [
  { n: "01", label: "Research",                     path: "/research" },
  { n: "02", label: "Planteamiento",                path: "/planteamiento" },
  { n: "03", label: "User Persona",                 path: "/user-persona" },
  { n: "04", label: "Encuestas",                    path: "/encuestas" },
  { n: "05", label: "Entrevistas",                  path: "/entrevistas" },
  { n: "06", label: "Mapa de Empatía",              path: "/mapa-empatia" },
  { n: "07", label: "User Journey",                 path: "/user-journey" },
  { n: "08", label: "Point of View",                path: "/PointOfView" },
  { n: "09", label: "Storytelling",                 path: "/storytelling" },
  { n: "10", label: "Storyboard",                   path: "/storyboard" },
  { n: "11", label: "Benchmarking",                 path: "/benchmarking" },
  { n: "12", label: "Card Sorting",                 path: "/cardsorting" },
  { n: "13", label: "Dendrograma & Matriz",         path: "/dendrograma&matriz" },
  { n: "14", label: "Mapa de Sitio",                path: "/mapadesitio" },
  { n: "15", label: "Task Flow",                    path: "/taskflow" },
  { n: "16", label: "User Flow",                    path: "/userflow" },
];

// ─── Home ──────────────────────────────────────────────────────────────────
const Home = () => {
  const canvasRef = useRef(null);

  // Partículas sutiles de fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,170,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0e1a 50%, #080c18 100%)",
      }}
    >
      {/* Canvas partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Glow central difuso */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(99,80,220,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Línea decorativa izquierda */}
      <div
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: 0.25 }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #a0a0c0)" }} />
        <span style={{ writingMode: "vertical-lr", fontSize: "10px", letterSpacing: "0.3em", color: "#a0a0c0", fontFamily: "monospace" }}>
          KAIROS · 2026
        </span>
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, #a0a0c0, transparent)" }} />
      </div>

      {/* Línea decorativa derecha */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: 0.25 }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #a0a0c0)" }} />
        <span style={{ writingMode: "vertical-lr", fontSize: "10px", letterSpacing: "0.3em", color: "#a0a0c0", fontFamily: "monospace" }}>
          UX · RESEARCH
        </span>
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, #a0a0c0, transparent)" }} />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center max-w-5xl mx-auto">

        {/* Logo Kairos */}
        <div
          className="mb-10"
          style={{
            animation: "fadeInDown 0.9s ease both",
          }}
        >
          <img
            src="/images/Icons/Logo.png"
            alt="Kairos"
            style={{
              width: "140px",
              height: "140px",
              objectFit: "contain",
              filter: "invert(1) brightness(0.92)",
              opacity: 0.93,
            }}
          />
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px",
            padding: "6px 18px",
            animation: "fadeIn 1.1s ease both 0.2s",
            opacity: 0,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#818cf8",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Proyecto Integrador · Diseño UX
          </span>
        </div>

        {/* Título */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            color: "#f1f1f5",
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            animation: "fadeInUp 0.9s ease both 0.3s",
            opacity: 0,
          }}
        >
          Un proceso{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #818cf8, #c084fc, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            UX completo
          </span>
          <br />
          para entender por qué<br />fallamos en la ejecución.
        </h1>

        {/* Separador */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #818cf8, transparent)",
            marginBottom: "1.8rem",
            animation: "fadeIn 1s ease both 0.5s",
            opacity: 0,
          }}
        />

        {/* Descripción */}
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            maxWidth: "560px",
            marginBottom: "1.2rem",
            animation: "fadeIn 1s ease both 0.6s",
            opacity: 0,
          }}
        >
          Investigamos por qué los jóvenes que planifican su día
          igual no logran cumplirlo — y diseñamos la solución
          desde la empatía y los datos reales.
        </p>

        {/* Cita */}
        <p
          style={{
            color: "#475569",
            fontSize: "0.88rem",
            fontStyle: "italic",
            marginBottom: "3.5rem",
            animation: "fadeIn 1s ease both 0.7s",
            opacity: 0,
          }}
        >
          'TU PLAN EJECUTADO EN EL TIEMPO JUSTO'
        </p>

        {/* Etapas */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          style={{
            maxWidth: "720px",
            animation: "fadeIn 1s ease both 0.85s",
            opacity: 0,
          }}
        >
          {ETAPAS.map(({ n, label, path }) => (
            <Link
              key={n}
              to={path}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                fontSize: "12px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "999px",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(129,140,248,0.12)";
                e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
                e.currentTarget.style.color = "#c7d2fe";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              <span style={{ color: "#6366f1", fontWeight: 700, fontSize: "10px" }}>{n}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/research"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: "14px",
            fontSize: "1rem",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(99,80,220,0.35), 0 4px 24px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            animation: "fadeInUp 0.9s ease both 1s",
            opacity: 0,
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 0 60px rgba(99,80,220,0.5), 0 8px 32px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(99,80,220,0.35), 0 4px 24px rgba(0,0,0,0.4)";
          }}
        >
          <span>Ver el proceso completo</span>
          <span style={{ fontSize: "1.1rem" }}>→</span>
        </Link>

        {/* Lema */}
        <p
          style={{
            color: "#334155",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "2.5rem",
            animation: "fadeIn 1s ease both 1.2s",
            opacity: 0,
          }}
        >
          Tu plan, al ritmo de tu vida.
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex"
        style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f0e1a 50%, #080c18 100%)" }}
      >
        {/* Sidebar fija */}
        <div
          className="w-80 sticky top-0 h-screen overflow-hidden lg:block hidden z-40"
          style={{
            background: "rgba(8,8,12,0.98)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <SectionsNav />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main
            className="flex-1 overflow-y-auto"
            style={{ padding: "2rem 2rem 0 2rem" }}
          >
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <Routes>
                <Route path="/"                   element={<Home />} />
                <Route path="/research"           element={<Research />} />
                <Route path="/planteamiento"      element={<Planteamiento />} />
                <Route path="/user-persona"       element={<UserPersona />} />
                <Route path="/encuestas"          element={<Encuestas />} />
                <Route path="/entrevistas"        element={<Entrevistas />} />
                <Route path="/mapa-empatia"       element={<EmpatiaMapa />} />
                <Route path="/user-journey"       element={<UserJourney />} />
                <Route path="/PointOfView"        element={<PointOfView />} />
                <Route path="/storytelling"       element={<Storytelling />} />
                <Route path="/storyboard"         element={<Storyboard />} />
                <Route path="/benchmarking"       element={<Benchmarking />} />
                <Route path="/cardsorting"        element={<CardSorting />} />
                <Route path="/dendrograma&matriz" element={<Dendrograma_Matriz />} />
                <Route path="/mapadesitio"        element={<MapaDeSitio />} />
                <Route path="/taskflow"           element={<TaskFlow />} />
                <Route path="/userflow"           element={<UserFlow />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

=======
import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Research from "./ux-sections/Research";
import Planteamiento from "./ux-sections/Planteamiento";
import UserPersona from "./ux-sections/UserPersona";
import Encuestas from "./ux-sections/Encuestas";
import Entrevistas from "./ux-sections/Entrevistas";
import EmpatiaMapa from "./ux-sections/EmpatiaMapa";
import UserJourney from "./ux-sections/UserJourney";
import PointOfView from "./ux-sections/PointOfView";
import Storytelling from "./ux-sections/Storytelling";
import Storyboard from "./ux-sections/Storyboard";
import Benchmarking from './ux-sections/Benchmarking';
import CardSorting from "./ux-sections/Cardsorting";
import Dendrograma_Matriz from "./ux-sections/Dendrograma&matriz";
import MapaDeSitio from "./ux-sections/MapaDeSitio";
import TaskFlow from "./ux-sections/TaskFlow";
import UserFlow from "./ux-sections/UserFlow";
import Header from "./Header";
import Footer from "./Footer";
import SectionsNav from "./SectionsNav";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ─── Etapas del proceso ────────────────────────────────────────────────────
const ETAPAS = [
  { n: "01", label: "Research",                     path: "/research" },
  { n: "02", label: "Planteamiento",                path: "/planteamiento" },
  { n: "03", label: "User Persona",                 path: "/user-persona" },
  { n: "04", label: "Encuestas",                    path: "/encuestas" },
  { n: "05", label: "Entrevistas",                  path: "/entrevistas" },
  { n: "06", label: "Mapa de Empatía",              path: "/mapa-empatia" },
  { n: "07", label: "User Journey",                 path: "/user-journey" },
  { n: "08", label: "Point of View",                path: "/PointOfView" },
  { n: "09", label: "Storytelling",                 path: "/storytelling" },
  { n: "10", label: "Storyboard",                   path: "/storyboard" },
  { n: "11", label: "Benchmarking",                 path: "/benchmarking" },
  { n: "12", label: "Card Sorting",                 path: "/cardsorting" },
  { n: "13", label: "Dendrograma & Matriz",         path: "/dendrograma&matriz" },
  { n: "14", label: "Mapa de Sitio",                path: "/mapadesitio" },
  { n: "15", label: "Task Flow",                    path: "/taskflow" },
  { n: "16", label: "User Flow",                    path: "/userflow" },
];

// ─── Home ──────────────────────────────────────────────────────────────────
const Home = () => {
  const canvasRef = useRef(null);

  // Partículas sutiles de fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,170,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #0f0e1a 50%, #080c18 100%)",
      }}
    >
      {/* Canvas partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Glow central difuso */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(99,80,220,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Línea decorativa izquierda */}
      <div
        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: 0.25 }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #a0a0c0)" }} />
        <span style={{ writingMode: "vertical-lr", fontSize: "10px", letterSpacing: "0.3em", color: "#a0a0c0", fontFamily: "monospace" }}>
          KAIROS · 2026
        </span>
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, #a0a0c0, transparent)" }} />
      </div>

      {/* Línea decorativa derecha */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: 0.25 }}
      >
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, #a0a0c0)" }} />
        <span style={{ writingMode: "vertical-lr", fontSize: "10px", letterSpacing: "0.3em", color: "#a0a0c0", fontFamily: "monospace" }}>
          UX · RESEARCH
        </span>
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, #a0a0c0, transparent)" }} />
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center max-w-5xl mx-auto">

        {/* Logo Kairos */}
        <div
          className="mb-10"
          style={{
            animation: "fadeInDown 0.9s ease both",
          }}
        >
          <img
            src="/images/Icons/Logo.png"
            alt="Kairos"
            style={{
              width: "140px",
              height: "140px",
              objectFit: "contain",
              filter: "invert(1) brightness(0.92)",
              opacity: 0.93,
            }}
          />
        </div>

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "999px",
            padding: "6px 18px",
            animation: "fadeIn 1.1s ease both 0.2s",
            opacity: 0,
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#818cf8",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Proyecto Integrador · Diseño UX
          </span>
        </div>

        {/* Título */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 900,
            lineHeight: 1.08,
            color: "#f1f1f5",
            marginBottom: "1.5rem",
            letterSpacing: "-0.03em",
            fontFamily: "Georgia, 'Times New Roman', serif",
            animation: "fadeInUp 0.9s ease both 0.3s",
            opacity: 0,
          }}
        >
          Un proceso{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #818cf8, #c084fc, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            UX completo
          </span>
          <br />
          para entender por qué<br />fallamos en la ejecución.
        </h1>

        {/* Separador */}
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #818cf8, transparent)",
            marginBottom: "1.8rem",
            animation: "fadeIn 1s ease both 0.5s",
            opacity: 0,
          }}
        />

        {/* Descripción */}
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.05rem",
            lineHeight: 1.75,
            maxWidth: "560px",
            marginBottom: "1.2rem",
            animation: "fadeIn 1s ease both 0.6s",
            opacity: 0,
          }}
        >
          Investigamos por qué los jóvenes que planifican su día
          igual no logran cumplirlo — y diseñamos la solución
          desde la empatía y los datos reales.
        </p>

        {/* Cita */}
        <p
          style={{
            color: "#475569",
            fontSize: "0.88rem",
            fontStyle: "italic",
            marginBottom: "3.5rem",
            animation: "fadeIn 1s ease both 0.7s",
            opacity: 0,
          }}
        >
          'TU PLAN EJECUTADO EN EL TIEMPO JUSTO'
        </p>

        {/* Etapas */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          style={{
            maxWidth: "720px",
            animation: "fadeIn 1s ease both 0.85s",
            opacity: 0,
          }}
        >
          {ETAPAS.map(({ n, label, path }) => (
            <Link
              key={n}
              to={path}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                fontSize: "12px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "999px",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(129,140,248,0.12)";
                e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
                e.currentTarget.style.color = "#c7d2fe";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#94a3b8";
              }}
            >
              <span style={{ color: "#6366f1", fontWeight: 700, fontSize: "10px" }}>{n}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/research"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            color: "#fff",
            padding: "16px 40px",
            borderRadius: "14px",
            fontSize: "1rem",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(99,80,220,0.35), 0 4px 24px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
            animation: "fadeInUp 0.9s ease both 1s",
            opacity: 0,
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 0 60px rgba(99,80,220,0.5), 0 8px 32px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(99,80,220,0.35), 0 4px 24px rgba(0,0,0,0.4)";
          }}
        >
          <span>Ver el proceso completo</span>
          <span style={{ fontSize: "1.1rem" }}>→</span>
        </Link>

        {/* Lema */}
        <p
          style={{
            color: "#334155",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "2.5rem",
            animation: "fadeIn 1s ease both 1.2s",
            opacity: 0,
          }}
        >
          Tu plan, al ritmo de tu vida.
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <div
        className="min-h-screen flex"
        style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f0e1a 50%, #080c18 100%)" }}
      >
        {/* Sidebar fija */}
        <div
          className="w-80 sticky top-0 h-screen overflow-hidden lg:block hidden z-40"
          style={{
            background: "rgba(8,8,12,0.98)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <SectionsNav />
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main
            className="flex-1 overflow-y-auto"
            style={{ padding: "2rem 2rem 0 2rem" }}
          >
            <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
              <Routes>
                <Route path="/"                   element={<Home />} />
                <Route path="/research"           element={<Research />} />
                <Route path="/planteamiento"      element={<Planteamiento />} />
                <Route path="/user-persona"       element={<UserPersona />} />
                <Route path="/encuestas"          element={<Encuestas />} />
                <Route path="/entrevistas"        element={<Entrevistas />} />
                <Route path="/mapa-empatia"       element={<EmpatiaMapa />} />
                <Route path="/user-journey"       element={<UserJourney />} />
                <Route path="/PointOfView"        element={<PointOfView />} />
                <Route path="/storytelling"       element={<Storytelling />} />
                <Route path="/storyboard"         element={<Storyboard />} />
                <Route path="/benchmarking"       element={<Benchmarking />} />
                <Route path="/cardsorting"        element={<CardSorting />} />
                <Route path="/dendrograma&matriz" element={<Dendrograma_Matriz />} />
                <Route path="/mapadesitio"        element={<MapaDeSitio />} />
                <Route path="/taskflow"           element={<TaskFlow />} />
                <Route path="/userflow"           element={<UserFlow />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

>>>>>>> a02ea68a0dd3b4b0007f6d0d68dafcd8ce3d88cc
export default App;