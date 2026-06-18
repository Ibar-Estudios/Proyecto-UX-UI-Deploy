import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer
      style={{
        background: "rgba(8,8,12,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: isHome ? "2rem 2rem 2.5rem" : "1.5rem 2rem 2rem",
        marginTop: isHome ? "0" : "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Separador decorativo */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.4), transparent)",
            marginBottom: "0.25rem",
          }}
        />

        {/* Logo pequeño */}
        <Link to="/" style={{ textDecoration: "none", opacity: 0.5 }}>
          <img
            src="/images/Icons/Logo.png"
            alt="Kairos"
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
              filter: "invert(1) brightness(0.8)",
            }}
          />
        </Link>

        {/* Nombre y stack */}
        <p
          style={{
            color: "rgba(148,163,184,0.5)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Ibar Caubet
          <span style={{ color: "rgba(99,102,241,0.4)", margin: "0 10px" }}>·</span>
          Full Stack Developer
          <span style={{ color: "rgba(99,102,241,0.4)", margin: "0 10px" }}>·</span>
          2026
        </p>

        {/* Stack técnico */}
        <p
          style={{
            color: "rgba(100,116,139,0.35)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          React · Express · MongoDB · Node.js
        </p>
      </div>
    </footer>
  );
}