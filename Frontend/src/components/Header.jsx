import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // En el home el header se oculta — el Home tiene su propio hero completo
  if (isHome) return null;

  return (
    <header
      style={{
        background: "rgba(10,10,15,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 2rem",
        height: "64px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + nombre */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src="/images/Icons/Logo.png"
            alt="Kairos"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              filter: "invert(1) brightness(0.9)",
              opacity: 0.9,
            }}
          />
          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #c7d2fe, #a5b4fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "Georgia, serif",
            }}
          >
            Kairos
          </span>
        </Link>

        {/* Centro — lema */}
        <span
          className="hidden lg:block"
          style={{
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(148,163,184,0.45)",
            fontWeight: 500,
          }}
        >
          Tu plan, al ritmo de tu vida.
        </span>

        {/* Volver home */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "7px 14px",
            color: "rgba(148,163,184,0.7)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(129,140,248,0.1)";
            e.currentTarget.style.borderColor = "rgba(129,140,248,0.3)";
            e.currentTarget.style.color = "#c7d2fe";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(148,163,184,0.7)";
          }}
        >
          ← Inicio
        </Link>
      </div>
    </header>
  );
}