import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Paletas por color de persona ─────────────────────────────────────────
const PALETTES = {
  indigo: {
    gradient: 'from-indigo-600 to-blue-700',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    accent: 'bg-indigo-500',
    border: 'border-indigo-200',
    tag: 'bg-indigo-50 text-indigo-700',
    dot: 'bg-indigo-500',
    icon: 'text-indigo-500',
    quote: 'border-indigo-400 bg-indigo-50',
    quoteText: 'text-indigo-900',
    sectionBg: 'bg-indigo-50',
    pill: 'bg-indigo-600 text-white',
  },
  rose: {
    gradient: 'from-rose-500 to-pink-700',
    badge: 'bg-rose-100 text-rose-700 border-rose-200',
    accent: 'bg-rose-500',
    border: 'border-rose-200',
    tag: 'bg-rose-50 text-rose-700',
    dot: 'bg-rose-500',
    icon: 'text-rose-500',
    quote: 'border-rose-400 bg-rose-50',
    quoteText: 'text-rose-900',
    sectionBg: 'bg-rose-50',
    pill: 'bg-rose-500 text-white',
  },
};

// ─── Mapa de imágenes por persona ─────────────────────────────────────────
const AVATAR_IMAGES = {
  'Matías García': '/images/Icons/perfil_matias.jpg',
  'Valentina Ríos': '/images/Icons/perfil_valentina.jpg',
};

// ─── Avatar con imagen ────────────────────────────────────────────────────
function Avatar({ nombre, palette, size = 'lg' }) {
  const src = AVATAR_IMAGES[nombre];
  const sizePx = size === 'lg' ? 96 : 48;
  const padding = size === 'lg' ? '10px' : '6px';

  return (
    <img
      src={src}
      alt={nombre}
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: '50%',
        padding,
        background: palette || '#1a1830',
        objectFit: 'cover',
      }}
    />
  );
}


// ─── Sección interna con ícono ─────────────────────────────────────────────
function InfoSection({ titulo, icono, items, palette, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl border ${palette.border} p-5 ${palette.sectionBg}`}
    >
      <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
        <span>{icono}</span> {titulo}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`w-2 h-2 rounded-full ${palette.dot} mt-1.5 flex-shrink-0`} />
            <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Tarjeta completa de una User Persona ─────────────────────────────────
function PersonaCard({ persona, index }) {
  const palette = PALETTES[persona.color] || PALETTES.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
    >
      {/* ── Header de la tarjeta ── */}
      <div className={`bg-gradient-to-br ${palette.gradient} p-8`}>
        <div className="flex items-start gap-6">
          <Avatar nombre={persona.nombre} palette={palette} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                User Persona
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-1">
              {persona.nombre}
            </h2>
            <p className="text-white/80 text-sm font-medium">{persona.edad} años · {persona.profesion}</p>
            <p className="text-white/60 text-xs mt-1">📍 {persona.ubicacion}</p>
          </div>
        </div>

        {/* Frase representativa */}
        <div className="mt-6 bg-white/15 rounded-2xl p-5 border border-white/20">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Frase representativa</p>
          <p className="text-white font-semibold text-base italic leading-relaxed">
            "{persona.frase}"
          </p>
        </div>
      </div>

      {/* ── Cuerpo de la tarjeta ── */}
      <div className="p-8 space-y-6">

        {/* Biografía */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Mini biografía</p>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 rounded-2xl p-5 border border-slate-100">
            {persona.biografia}
          </p>
        </div>

        {/* Justificación */}
        <div className={`rounded-2xl border-l-4 ${palette.border} p-5 ${palette.sectionBg}`}>
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
            🎯 Justificación
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {persona.justificacion}
          </p>
        </div>

        {/* Grid de 3 columnas: Objetivos / Frustraciones / Motivaciones */}
        <div className="grid md:grid-cols-3 gap-4">
          <InfoSection
            titulo="Objetivos"
            icono="🎯"
            items={persona.objetivos}
            palette={palette}
            delay={0.1}
          />
          <InfoSection
            titulo="Frustraciones"
            icono="😤"
            items={persona.frustraciones}
            palette={palette}
            delay={0.2}
          />
          <InfoSection
            titulo="Motivaciones"
            icono="✨"
            items={persona.motivaciones}
            palette={palette}
            delay={0.3}
          />
        </div>

        {/* Uso de tecnología */}
        <InfoSection
          titulo="Uso de la tecnología"
          icono="📱"
          items={persona.tecnologia}
          palette={palette}
          delay={0.4}
        />

      </div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function UserPersona() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/ux-sections/UserPersona')
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando User Personas...</p>
      </div>
    );
  }

  const personas = data?.data?.personas || [];

  return (
    <div className="min-h-[80vh] py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-3 mb-20 text-blue-600 hover:text-blue-800 font-bold text-2xl"
        >
          ← Volver Home
        </a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* ── HEADER ── */}
          <div className="text-center pt-4">
            <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">
              {data?.title || 'User Personas 👤'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-rose-500 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* ── BANNER explicativo ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="flex-1">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">
                ¿Por qué dos personas?
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Matías y Valentina representan los dos perfiles más frecuentes detectados en el research:
                el usuario que <span className="text-indigo-400 font-bold">pierde la noción del tiempo</span> durante la ejecución,
                y el usuario que <span className="text-rose-400 font-bold">tiene herramientas pero no logra mantener la constancia</span>.
                Ambos comparten el mismo problema central pero lo experimentan desde lugares diferentes,
                lo que confirma que el producto debe resolver la ejecución — no solo la planificación.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <Avatar nombre="Matías García" palette={PALETTES.indigo} size="sm" />
                <span className="text-xs text-slate-400">Matías</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Avatar nombre="Valentina Ríos" palette={PALETTES.rose} size="sm" />
                <span className="text-xs text-slate-400">Valentina</span>
              </div>
            </div>
          </motion.div>

          {/* ── TARJETAS ── */}
          <div className="space-y-12">
            {personas.map((persona, i) => (
              <PersonaCard key={persona.id} persona={persona} index={i} />
            ))}
          </div>

          {/* ── NOTA comparativa al pie ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-3">
                Matías — Origen en entrevistas
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Perfil construido a partir de <strong>Francisco</strong> (pérdida de noción temporal, necesidad de alertas)
                y <strong>Gastón</strong> (perfil control que revela qué mentalidad funciona).
                Representa al usuario que planifica con intención pero falla por no percibir el tiempo.
              </p>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
              <p className="text-xs font-black uppercase tracking-widest text-rose-400 mb-3">
                Valentina — Origen en entrevistas
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Perfil construido a partir de <strong>Barbara</strong> (horarios variables, sistema híbrido, necesidad de gamificación)
                y <strong>Constantino</strong> (saturación que genera ansiedad y abandono de actividades).
                Representa al usuario que tiene herramientas pero no logra la constancia.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}