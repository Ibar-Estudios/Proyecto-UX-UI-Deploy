import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/research',          label: 'Research',                    n: '01' },
  { to: '/planteamiento',     label: 'Planteamiento',               n: '02' },
  { to: '/user-persona',      label: 'User Persona',                n: '03' },
  { to: '/encuestas',         label: 'Encuestas',                   n: '04' },
  { to: '/entrevistas',       label: 'Entrevistas',                 n: '05' },
  { to: '/mapa-empatia',      label: 'Mapa de Empatía',             n: '06' },
  { to: '/user-journey',      label: 'User Journey',                n: '07' },
  { to: '/PointOfView',       label: 'Point of View',               n: '08' },
  { to: '/storytelling',      label: 'Storytelling',                n: '09' },
  { to: '/storyboard',        label: 'Storyboard',                  n: '10' },
  { to: '/benchmarking',      label: 'Benchmarking',                n: '11' },
  { to: '/cardsorting',       label: 'Card Sorting',                n: '12' },
  { to: '/dendrograma&matriz',label: 'Dendrograma & Matriz',        n: '13' },
  { to: '/mapadesitio',       label: 'Mapa de Sitio',               n: '14' },
  { to: '/taskflow',          label: 'Task Flow',                   n: '15' },
  { to: '/userflow',          label: 'User Flow',                   n: '16' },
];

export default function SectionsNav() {
  const location = useLocation();

  return (
    <nav
      style={{
        width: '100%',
        height: '100vh',
        background: 'rgba(8,8,12,0.98)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header del nav */}
      <div
        style={{
          padding: '1.5rem 1.25rem 1rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          flexShrink: 0,
        }}
      >
        {/* Logo + nombre */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            marginBottom: '1rem',
          }}
        >
          <img
            src="/images/Icons/Logo.png"
            alt="Kairos"
            style={{
              width: '28px',
              height: '28px',
              objectFit: 'contain',
              filter: 'invert(1) brightness(0.88)',
              opacity: 0.9,
            }}
          />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #c7d2fe, #a5b4fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: 'Georgia, serif',
            }}
          >
            Kairos
          </span>
        </Link>

        {/* Título sección */}
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(100,116,139,0.6)',
            fontWeight: 600,
          }}
        >
          Proceso UX · 16 secciones
        </p>
      </div>

      {/* Lista de secciones — scroll independiente */}
      <ul
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.75rem 0.75rem',
          margin: 0,
          listStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {navItems.map(({ to, label, n }) => {
          const isActive = location.pathname === to;

          return (
            <li key={to} style={{ marginBottom: '2px' }}>
              <Link
                to={to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                  background: isActive
                    ? 'rgba(99,102,241,0.14)'
                    : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(129,140,248,0.25)' : 'transparent'}`,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {/* Número */}
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: isActive ? '#818cf8' : 'rgba(100,116,139,0.45)',
                    minWidth: '20px',
                    transition: 'color 0.18s ease',
                  }}
                >
                  {n}
                </span>

                {/* Indicador activo */}
                <span
                  style={{
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: isActive ? '#818cf8' : 'rgba(100,116,139,0.25)',
                    flexShrink: 0,
                    transition: 'background 0.18s ease',
                  }}
                />

                {/* Label */}
                <span
                  style={{
                    fontSize: '12.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#c7d2fe' : 'rgba(148,163,184,0.6)',
                    transition: 'all 0.18s ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  {label}
                </span>

                {/* Flecha activo */}
                {isActive && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '10px',
                      color: '#6366f1',
                      opacity: 0.7,
                    }}
                  >
                    →
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer del nav */}
      <div
        style={{
          padding: '0.75rem 1.25rem 1rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: '10px',
            color: 'rgba(100,116,139,0.35)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Tu plan, al ritmo de tu vida.
        </p>
      </div>
    </nav>
  );
}