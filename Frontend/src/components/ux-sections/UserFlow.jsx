import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Paletas ───────────────────────────────────────────────────────────────
const PALETTE = {
  indigo: {
    gradient: 'from-indigo-600 to-blue-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    nodoAccion: 'bg-white border-indigo-300 text-slate-800',
    nodoDecision: 'bg-indigo-600 text-white',
    number: 'bg-indigo-600 text-white',
  },
  violet: {
    gradient: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    text: 'text-violet-700',
    dot: 'bg-violet-500',
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    nodoAccion: 'bg-white border-violet-300 text-slate-800',
    nodoDecision: 'bg-violet-600 text-white',
    number: 'bg-violet-600 text-white',
  },
};

// ─── Iconos por tipo de nodo ───────────────────────────────────────────────
const TIPO_CONFIG = {
  inicio: { icon: '▶', label: 'Inicio', bg: 'bg-slate-800 text-white', shape: 'rounded-full' },
  accion: { icon: '▭', label: 'Pantalla', bg: 'bg-white border-2 text-slate-800', shape: 'rounded-2xl' },
  decision: { icon: '◆', label: 'Decisión', bg: 'bg-amber-400 text-white', shape: 'rounded-xl rotate-0' },
  error: { icon: '⚠', label: 'Error', bg: 'bg-rose-500 text-white', shape: 'rounded-2xl' },
  'fin-rama': { icon: '⤵', label: 'Converge', bg: 'bg-slate-400 text-white', shape: 'rounded-2xl' },
  fin: { icon: '⏹', label: 'Fin', bg: 'bg-slate-900 text-white', shape: 'rounded-full' },
};

// ─── Nodo individual en el flujo ───────────────────────────────────────────
function Nodo({ nodo, palette, index, isActive, onClick }) {
  const config = TIPO_CONFIG[nodo.tipo] || TIPO_CONFIG.accion;
  const esDecision = nodo.tipo === 'decision';
  const esError = nodo.tipo === 'error';
  const esFinRama = nodo.tipo === 'fin-rama';
  const esInicioFin = nodo.tipo === 'inicio' || nodo.tipo === 'fin';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col items-center"
    >
      {/* Conector superior */}
      {index > 0 && (
        <div className="flex flex-col items-center mb-1">
          <div className="w-px h-6 bg-slate-300" />
          <div className="w-2 h-2 border-b-2 border-r-2 border-slate-300 rotate-45 -mt-1.5" />
        </div>
      )}

      {/* Tarjeta del nodo */}
      <button
        onClick={esInicioFin || esFinRama ? undefined : onClick}
        className={`w-full max-w-lg transition-all text-left
          ${esInicioFin || esFinRama ? 'cursor-default' : 'cursor-pointer hover:-translate-y-0.5'}`}
      >
        <div className={`rounded-2xl border-2 overflow-hidden shadow-md transition-all
          ${isActive ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-lg'}
          ${esDecision ? 'border-amber-300' : ''}
          ${esError ? 'border-rose-300' : ''}
          ${esFinRama ? 'border-slate-300' : ''}
          ${esInicioFin ? 'border-slate-700' : ''}
          ${!esDecision && !esError && !esFinRama && !esInicioFin ? `border-slate-200` : ''}
        `}>

          {/* Barra de tipo */}
          <div className={`px-4 py-2 flex items-center gap-2
            ${esDecision ? 'bg-amber-400' : ''}
            ${esError ? 'bg-rose-500' : ''}
            ${esFinRama ? 'bg-slate-400' : ''}
            ${esInicioFin ? 'bg-slate-800' : ''}
            ${!esDecision && !esError && !esFinRama && !esInicioFin ? `bg-gradient-to-r ${palette.gradient}` : ''}
          `}>
            <span className="text-white text-xs font-black uppercase tracking-widest">
              {config.icon} {config.label}
            </span>
            {nodo.pantalla && (
              <span className="ml-auto text-white/60 text-xs font-medium truncate max-w-[200px]">
                {nodo.pantalla}
              </span>
            )}
          </div>

          {/* Contenido */}
          <div className="bg-white p-4">
            <h4 className="font-black text-slate-900 text-sm mb-1 leading-tight">
              {nodo.titulo}
            </h4>
            {nodo.descripcion && (
              <p className="text-xs text-slate-500 leading-relaxed">
                {nodo.descripcion}
              </p>
            )}

            {/* Condicionales de decisión */}
            {esDecision && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                  <p className="text-xs font-black text-emerald-700 mb-0.5">✅ SI</p>
                  <p className="text-xs text-emerald-600">{nodo.labelSi}</p>
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                  <p className="text-xs font-black text-rose-700 mb-0.5">❌ NO</p>
                  <p className="text-xs text-rose-600">{nodo.labelNo}</p>
                </div>
              </div>
            )}

            {/* Resolución de error */}
            {esError && isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 bg-rose-50 border border-rose-200 rounded-xl p-3"
              >
                <p className="text-xs font-black text-rose-700 mb-1">🔧 Resolución</p>
                <p className="text-xs text-rose-600 leading-relaxed">{nodo.resolucion}</p>
              </motion.div>
            )}
            {esError && !isActive && nodo.resolucion && (
              <p className="text-xs text-rose-400 mt-2 italic">
                Tocá para ver la resolución →
              </p>
            )}

            {/* Convergencia */}
            {esFinRama && (
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <p className="text-xs text-slate-500 italic">{nodo.descripcion}</p>
              </div>
            )}
          </div>
        </div>
      </button>
    </motion.div>
  );
}

// ─── Tarjeta de flujo completo ─────────────────────────────────────────────
function FlujoCard({ flujo, flujoIndex }) {
  const palette = PALETTE[flujo.color] || PALETTE.indigo;
  const [nodoActivo, setNodoActivo] = useState(null);

  const decisiones = flujo.nodos.filter(n => n.tipo === 'decision').length;
  const errores = flujo.nodos.filter(n => n.tipo === 'error').length;
  const pantallas = flujo.nodos.filter(n => n.tipo === 'accion').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: flujoIndex * 0.1 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${palette.gradient} p-8`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{flujo.icono}</span>
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                {flujo.subtitulo}
              </p>
              <h2 className="text-white text-2xl font-black mb-2">{flujo.nombre}</h2>
              <p className="text-white/75 text-sm leading-relaxed max-w-xl">
                {flujo.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Escenario */}
        <div className="mt-5 bg-white/15 rounded-2xl p-5 border border-white/20">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
            👤 User Persona: {flujo.userPersona}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Pantallas', value: pantallas, icon: '▭' },
            { label: 'Decisiones', value: decisiones, icon: '◆' },
            { label: 'Errores cubiertos', value: errores, icon: '⚠' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/15 rounded-xl p-3 text-center border border-white/20">
              <p className="text-white text-xl font-black">{stat.value}</p>
              <p className="text-white/60 text-xs mt-0.5">{stat.icon} {stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="px-8 pt-6 pb-2">
        <div className="flex flex-wrap gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 w-full mb-1">
            Leyenda — Tocá un nodo para expandirlo
          </p>
          {[
            { color: 'bg-slate-800', label: 'Inicio / Fin' },
            { color: `bg-gradient-to-r ${palette.gradient}`, label: 'Pantalla / Acción' },
            { color: 'bg-amber-400', label: 'Decisión condicional' },
            { color: 'bg-rose-500', label: 'Error + resolución' },
            { color: 'bg-slate-400', label: 'Converge con otro flujo' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-lg ${item.color} flex-shrink-0`} />
              <span className="text-xs text-slate-600 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nodos del flujo */}
      <div className="px-8 pb-8 pt-4">
        <div className="flex flex-col items-center space-y-0">
          {flujo.nodos.map((nodo, i) => (
            <Nodo
              key={nodo.id}
              nodo={nodo}
              palette={palette}
              index={i}
              isActive={nodoActivo === nodo.id}
              onClick={() => setNodoActivo(nodoActivo === nodo.id ? null : nodo.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Resumen de ambos flujos ───────────────────────────────────────────────
function ResumenFlujos({ flujos }) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {flujos.map((flujo, i) => {
          const palette = PALETTE[flujo.color] || PALETTE.indigo;
          const decisiones = flujo.nodos.filter(n => n.tipo === 'decision');
          const errores = flujo.nodos.filter(n => n.tipo === 'error');

          return (
            <motion.div key={flujo.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border ${palette.border} ${palette.bg} p-6 space-y-5`}>

              {/* Título */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">{flujo.icono}</span>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{flujo.subtitulo}</p>
                  <h3 className={`font-black text-lg ${palette.text}`}>{flujo.nombre}</h3>
                </div>
              </div>

              {/* Decisiones */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  ◆ Decisiones condicionales
                </p>
                <div className="space-y-2">
                  {decisiones.map((d, j) => (
                    <div key={j} className="bg-white rounded-xl border border-amber-200 p-3">
                      <p className="text-xs font-black text-amber-700 mb-2">{d.titulo}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-emerald-50 rounded-lg px-2 py-1.5">
                          <p className="text-xs font-bold text-emerald-700">✅ {d.labelSi}</p>
                        </div>
                        <div className="bg-rose-50 rounded-lg px-2 py-1.5">
                          <p className="text-xs font-bold text-rose-700">❌ {d.labelNo}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Errores */}
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  ⚠ Errores cubiertos
                </p>
                <div className="space-y-2">
                  {errores.map((e, j) => (
                    <div key={j} className="bg-white rounded-xl border border-rose-200 p-3">
                      <p className="text-xs font-black text-rose-700 mb-1">{e.titulo}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{e.resolucion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nota de convergencia */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="bg-slate-900 rounded-2xl p-6 shadow-2xl">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
          🔗 Convergencia entre flujos
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Ambos flujos están interconectados: si el usuario abre la app sin plan activo en el <span className="text-indigo-400 font-bold">User Flow A</span>,
          el sistema lo redirige automáticamente al <span className="text-violet-400 font-bold">User Flow B</span> para planificar.
          Del mismo modo, al finalizar la planificación en el <span className="text-violet-400 font-bold">User Flow B</span>,
          el sistema activa el Dashboard convergiendo con el <span className="text-indigo-400 font-bold">User Flow A</span> para la ejecución.
        </p>
      </motion.div>

      {/* Link a Figma-Fijgam */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="bg-slate-900 rounded-2xl p-6 shadow-2xl mt-6 flex items-center justify-center flex-col">
        <h2 className="text-slate-300 text-sm leading-relaxed font-bold">
          ¿Querés ver los flujos interactivos en FigJam?
        </h2>
        <button className="text-slate-300 text-sm leading-relaxed mt-4 bg-gray-500 rounded-lg px-4 py-2 hover:bg-gray-600 transition-colors">
          <a href="https://www.figma.com/board/2YwZEev6HRdZgpjejGCtvh/Task-Flow---GA?node-id=0-1&t=bkrIJBSvsh67uEYf-1https://www.figma.com/board/7KZb0nS1O45sgDb9CSkhGW/User-Flow---GA?node-id=0-1&t=SR3xqHg2EI2pieXN-1" target="_blank" className="flex justify-center align-center">
            <img src="/images/Icons/fijgam.png" alt="Logo de FigJam" className="w-10 pr-1" />User Flow FigJam
          </a>
        </button>
      </motion.div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function UserFlow() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('flujos');

  useEffect(() => {
    axios.get('/ux-sections/UserFlow')
      .then(res => { setData(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando User Flow...</p>
      </div>
    );
  }

  const ufData = data?.data || {};
  const flujos = ufData.flujos || [];

  return (
    <div className="min-h-[80vh] py-10 px-8">
      <div className="max-w-5xl mx-auto">
        <a href="/" className="inline-flex items-center gap-3 mb-20 text-blue-600 hover:text-blue-800 font-bold text-2xl">
          ← Volver Home
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-14">

          {/* HEADER */}
          <div className="text-center pt-2">
            <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">
              {data?.title || 'User Flow 🗺️'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              ¿Qué es un User Flow?
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{ufData.descripcion}</p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-slate-200">
            {[
              { id: 'flujos', label: '🗺️ Flujos completos' },
              { id: 'resumen', label: '📊 Decisiones y errores' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-bold rounded-t-xl border-b-2 transition-all
                  ${tab === t.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {tab === 'flujos' && (
              <motion.div key="flujos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-12">
                {flujos.map((flujo, i) => (
                  <FlujoCard key={flujo.id} flujo={flujo} flujoIndex={i} />
                ))}
              </motion.div>
            )}

            {tab === 'resumen' && (
              <motion.div key="resumen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResumenFlujos flujos={flujos} />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}