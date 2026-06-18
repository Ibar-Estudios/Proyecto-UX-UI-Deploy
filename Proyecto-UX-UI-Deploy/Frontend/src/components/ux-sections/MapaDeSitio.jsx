import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Paletas por sección ───────────────────────────────────────────────────
const PALETTE = {
  indigo: {
    gradient: 'from-indigo-600 to-blue-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-300',
    borderLight: 'border-indigo-200',
    text: 'text-indigo-700',
    textDark: 'text-indigo-900',
    dot: 'bg-indigo-500',
    line: 'bg-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    nodeL1: 'bg-indigo-100 border-indigo-300 text-indigo-800',
    nodeL2: 'bg-white border-indigo-200 text-indigo-600',
    coreBadge: 'bg-indigo-600 text-white',
  },
  violet: {
    gradient: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50',
    border: 'border-violet-300',
    borderLight: 'border-violet-200',
    text: 'text-violet-700',
    textDark: 'text-violet-900',
    dot: 'bg-violet-500',
    line: 'bg-violet-200',
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    nodeL1: 'bg-violet-100 border-violet-300 text-violet-800',
    nodeL2: 'bg-white border-violet-200 text-violet-600',
  },
  emerald: {
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    borderLight: 'border-emerald-200',
    text: 'text-emerald-700',
    textDark: 'text-emerald-900',
    dot: 'bg-emerald-500',
    line: 'bg-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    nodeL1: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    nodeL2: 'bg-white border-emerald-200 text-emerald-600',
  },
  slate: {
    gradient: 'from-slate-500 to-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    borderLight: 'border-slate-200',
    text: 'text-slate-600',
    textDark: 'text-slate-800',
    dot: 'bg-slate-400',
    line: 'bg-slate-200',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
    nodeL1: 'bg-slate-100 border-slate-300 text-slate-700',
    nodeL2: 'bg-white border-slate-200 text-slate-500',
  },
};

// ─── Nodo nivel 2 (hoja) ──────────────────────────────────────────────────
function NodoL2({ nodo, palette, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-2"
    >
      <div className={`w-5 h-px ${palette.line}`} />
      <div className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${palette.nodeL2}`}>
        {nodo.nombre}
      </div>
    </motion.div>
  );
}

// ─── Nodo nivel 1 (rama) ──────────────────────────────────────────────────
function NodoL1({ nodo, palette, delay, expanded, onToggle }) {
  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center gap-2"
      >
        <div className={`w-8 h-px ${palette.line}`} />
        <button
          onClick={tieneHijos ? onToggle : undefined}
          className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border font-bold transition-all
            ${palette.nodeL1}
            ${tieneHijos ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : 'cursor-default'}`}
        >
          {nodo.nombre}
          {tieneHijos && (
            <span className="text-xs opacity-60">{expanded ? '▲' : '▼'}</span>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {tieneHijos && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-14 flex flex-col gap-2 border-l-2 border-dashed pl-4"
            style={{ borderColor: 'currentColor' }}
          >
            {nodo.hijos.map((hijo, i) => (
              <NodoL2
                key={hijo.id}
                nodo={hijo}
                palette={palette}
                delay={i * 0.04}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tarjeta de sección principal (nivel 0) ───────────────────────────────
function SeccionCard({ nodo, index, globalExpanded }) {
  const palette = PALETTE[nodo.color] || PALETTE.slate;
  const [expandedHijos, setExpandedHijos] = useState({});

  // Sync con el estado global de expand/collapse
  useEffect(() => {
    if (globalExpanded === true) {
      const all = {};
      (nodo.hijos || []).forEach(h => { all[h.id] = true; });
      setExpandedHijos(all);
    } else if (globalExpanded === false) {
      setExpandedHijos({});
    }
  }, [globalExpanded]);

  const toggleHijo = (id) => {
    setExpandedHijos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalNodos = (nodo.hijos || []).reduce((acc, h) => {
    return acc + 1 + (h.hijos ? h.hijos.length : 0);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`rounded-3xl border-2 ${palette.border} overflow-hidden shadow-xl`}
    >
      {/* Header de la sección */}
      <div className={`bg-gradient-to-r ${palette.gradient} p-6`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{nodo.icono}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white text-2xl font-black">{nodo.nombre}</h3>
                {nodo.esCore && (
                  <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full border border-white/30">
                    ⚡ Hub central
                  </span>
                )}
              </div>
              <p className="text-white/75 text-sm leading-relaxed max-w-lg">
                {nodo.descripcion}
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white/60 text-xs mb-1">Sub-secciones</p>
            <p className="text-white text-2xl font-black">{totalNodos}</p>
          </div>
        </div>
      </div>

      {/* Árbol de hijos */}
      <div className={`${palette.bg} p-6 space-y-3`}>
        {(nodo.hijos || []).map((hijo, i) => (
          <NodoL1
            key={hijo.id}
            nodo={hijo}
            palette={palette}
            delay={i * 0.06}
            expanded={!!expandedHijos[hijo.id]}
            onToggle={() => toggleHijo(hijo.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Vista de árbol horizontal (resumen visual) ───────────────────────────
function ArbolResumen({ nodos }) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="max-w-max">
        {/* Raíz */}
        <div className="flex flex-col items-center mb-2">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl">
            📱 App
          </div>
          <div className="w-px h-6 bg-slate-300" />
        </div>

        {/* Línea horizontal conectora */}
        <div className="relative flex items-start justify-center gap-0">
          {/* Línea horizontal */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-slate-300" />

          {nodos.map((nodo, i) => {
            const palette = PALETTE[nodo.color] || PALETTE.slate;
            return (
              <div key={nodo.id} className="flex flex-col items-center px-3 pt-0">
                {/* Línea vertical desde la horizontal */}
                <div className="w-px h-6 bg-slate-300 mb-2" />

                {/* Nodo L0 */}
                <div className={`bg-gradient-to-br ${palette.gradient} text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-lg flex items-center gap-2 mb-2 whitespace-nowrap`}>
                  <span>{nodo.icono}</span>
                  {nodo.nombre}
                  {nodo.esCore && <span className="text-white/70 text-xs">⚡</span>}
                </div>

                {/* Línea vertical hacia hijos */}
                <div className="w-px h-4 bg-slate-200 mb-2" />

                {/* Hijos L1 */}
                <div className="flex flex-col gap-1.5 items-center">
                  {(nodo.hijos || []).map((hijo, j) => (
                    <div key={hijo.id} className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${palette.nodeL1} whitespace-nowrap`}>
                      {hijo.nombre}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function MapaDeSitio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('detalle');
  const [globalExpanded, setGlobalExpanded] = useState(null);

  useEffect(() => {
    axios.get('/ux-sections/MapaDeSitio')
      .then(res => { setData(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando Mapa de Sitio...</p>
      </div>
    );
  }

  const msData = data?.data || {};
  const nodos = msData.nodos || [];

  const totalSecciones = nodos.length;
  const totalSubsecciones = nodos.reduce((acc, n) =>
    acc + (n.hijos || []).reduce((a, h) => a + 1 + (h.hijos ? h.hijos.length : 0), 0), 0
  );
  const totalNiveles = 3;

  return (
    <div className="min-h-[80vh] py-10 px-8">
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
          className="space-y-14"
        >
          {/* HEADER */}
          <div className="text-center pt-2">
            <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">
              {data?.title || 'Mapa de Sitio 🗺️'}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-emerald-500 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* CRITERIO */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              Criterio de arquitectura
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{msData.criterio}</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Secciones principales', value: totalSecciones, icon: '📂' },
              { label: 'Sub-secciones', value: totalSubsecciones, icon: '🗂️' },
              { label: 'Niveles de profundidad', value: totalNiveles, icon: '📊' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 text-center"
              >
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-slate-200">
            {[
              { id: 'detalle', label: '🗂️ Vista detallada' },
              { id: 'arbol', label: '🌿 Vista árbol' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-bold rounded-t-xl border-b-2 transition-all
                  ${tab === t.id
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB: DETALLE */}
          <AnimatePresence mode="wait">
            {tab === 'detalle' && (
              <motion.div
                key="detalle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Controles expand/collapse */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setGlobalExpanded(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-200 transition-all"
                  >
                    Expandir todo ▼
                  </button>
                  <button
                    onClick={() => setGlobalExpanded(false)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 transition-all"
                  >
                    Colapsar todo ▲
                  </button>
                </div>

                {/* Leyenda de niveles */}
                <div className="flex flex-wrap gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 w-full mb-1">Leyenda</p>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700" />
                    <span className="text-xs text-slate-600 font-medium">Sección principal (Nivel 0)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-indigo-100 border border-indigo-300" />
                    <span className="text-xs text-slate-600 font-medium">Sub-sección (Nivel 1) — clic para expandir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-white border border-indigo-200" />
                    <span className="text-xs text-slate-600 font-medium">Pantalla/funcionalidad (Nivel 2)</span>
                  </div>
                </div>

                {/* Tarjetas de secciones */}
                {nodos.map((nodo, i) => (
                  <SeccionCard
                    key={nodo.id}
                    nodo={nodo}
                    index={i}
                    globalExpanded={globalExpanded}
                  />
                ))}
              </motion.div>
            )}

            {/* TAB: ÁRBOL */}
            {tab === 'arbol' && (
              <motion.div
                key="arbol"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <p className="text-sm text-slate-500 bg-white rounded-xl border border-slate-100 p-5">
                  Vista compacta del árbol de navegación. Muestra los niveles 0 y 1 de la arquitectura.
                  Para ver el nivel 2 usá la <button onClick={() => setTab('detalle')} className="text-indigo-600 font-bold underline">vista detallada</button>.
                </p>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                  <ArbolResumen nodos={nodos} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}