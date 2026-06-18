import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PALETTE = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', bar: 'bg-indigo-500', header: 'from-indigo-600 to-blue-700', dot: 'bg-indigo-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500', header: 'from-emerald-500 to-teal-600', dot: 'bg-emerald-500' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', bar: 'bg-violet-500', header: 'from-violet-600 to-purple-700', dot: 'bg-violet-500' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', bar: 'bg-slate-400', header: 'from-slate-600 to-slate-800', dot: 'bg-slate-400' },
};

// ─── Color según score ─────────────────────────────────────────────────────
function scoreColor(score) {
  if (score === 100) return 'bg-indigo-700 text-white';
  if (score >= 75) return 'bg-indigo-400 text-white';
  if (score >= 50) return 'bg-violet-300 text-white';
  if (score >= 25) return 'bg-slate-200 text-slate-600';
  return 'bg-white text-slate-300';
}

// ─── Dendrograma visual por cluster ───────────────────────────────────────
function DendroCluster({ cluster, index }) {
  const p = PALETTE[cluster.color] || PALETTE.slate;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border ${p.border} overflow-hidden shadow-lg`}
    >
      {/* Header del cluster */}
      <div className={`bg-gradient-to-r ${p.header} px-6 py-4 flex items-center justify-between`}>
        <h3 className="text-white font-black text-lg">{cluster.nombre}</h3>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-sm">Similitud promedio</span>
          <span className="bg-white/20 text-white font-black px-3 py-1 rounded-full text-sm border border-white/30">
            {cluster.similitudPromedio}%
          </span>
        </div>
      </div>

      {/* Árbol jerárquico visual */}
      <div className={`${p.bg} p-6`}>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">
          Estructura jerárquica
        </p>

        {/* Nodo raíz */}
        <div className="flex flex-col items-center">
          <div className={`${p.dot} w-4 h-4 rounded-full shadow-lg mb-2`} />
          <div className="w-px h-6 bg-slate-300" />

          {/* Rama horizontal */}
          <div className="relative flex items-start justify-center w-full">
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-slate-300" />

            {/* Sub-clusters por pares de mayor score */}
            <div className="grid grid-cols-2 gap-4 w-full mt-0">
              {/* Grupo A — las primeras tarjetas */}
              <div className="flex flex-col items-center pt-4">
                <div className="w-px h-4 bg-slate-300 mb-2" />
                <div className={`w-3 h-3 rounded-full ${p.dot} mb-2`} />
                <div className="w-px h-4 bg-slate-300 mb-2" />
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {cluster.tarjetas.slice(0, Math.ceil(cluster.tarjetas.length / 2)).map((t, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded-lg border ${p.border} bg-white ${p.text} font-medium text-center`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grupo B — las últimas tarjetas */}
              <div className="flex flex-col items-center pt-4">
                <div className="w-px h-4 bg-slate-300 mb-2" />
                <div className={`w-3 h-3 rounded-full ${p.dot} opacity-70 mb-2`} />
                <div className="w-px h-4 bg-slate-300 mb-2" />
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {cluster.tarjetas.slice(Math.ceil(cluster.tarjetas.length / 2)).map((t, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded-lg border ${p.border} bg-white ${p.text} font-medium text-center`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de similitud promedio */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-bold">Fuerza del cluster</p>
            <p className={`text-sm font-black ${p.text}`}>{cluster.similitudPromedio}%</p>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cluster.similitudPromedio}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
              className={`h-full ${p.bar} rounded-full`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Matriz de similitud de un cluster ────────────────────────────────────
function MatrizCluster({ cluster, index }) {
  const p = PALETTE[cluster.color] || PALETTE.slate;

  // Construir matriz desde los pares
  const tarjetas = cluster.tarjetas;
  const scoreMap = {};
  cluster.pares.forEach(par => {
    scoreMap[`${par.a}|||${par.b}`] = par.score;
    scoreMap[`${par.b}|||${par.a}`] = par.score;
  });

  const getScore = (a, b) => {
    if (a === b) return -1; // diagonal
    return scoreMap[`${a}|||${b}`] || 0;
  };

  // Etiquetas cortas para la matriz
  const shortLabel = (t) => {
    const words = t.split(' ');
    return words.length <= 3 ? t : words.slice(0, 3).join(' ') + '…';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${p.header} px-6 py-4`}>
        <h3 className="text-white font-black">{cluster.nombre}</h3>
        <p className="text-white/70 text-xs mt-1">Matriz de similitud — % de participantes que agruparon el par junto</p>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="w-32 p-1" />
              {tarjetas.map((t, i) => (
                <th key={i} className="p-1 max-w-[80px]">
                  <div className={`${p.text} font-bold text-center leading-tight`} style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: '80px', display: 'flex', alignItems: 'center' }}>
                    {shortLabel(t)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tarjetas.map((rowT, ri) => (
              <tr key={ri}>
                <td className={`p-2 font-medium ${p.text} text-right pr-3 max-w-[120px]`}>
                  {shortLabel(rowT)}
                </td>
                {tarjetas.map((colT, ci) => {
                  const score = getScore(rowT, colT);
                  return (
                    <td key={ci} className="p-1 text-center">
                      {score === -1 ? (
                        <div className={`w-10 h-10 mx-auto rounded-lg ${p.dot} opacity-30`} />
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: (ri * tarjetas.length + ci) * 0.01 }}
                          className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center font-black text-xs ${scoreColor(score)}`}
                        >
                          {score > 0 ? `${score}%` : '—'}
                        </motion.div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Leyenda */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {[
            { label: '100%', color: 'bg-indigo-700 text-white' },
            { label: '75%', color: 'bg-indigo-400 text-white' },
            { label: '50%', color: 'bg-violet-300 text-white' },
            { label: '25%', color: 'bg-slate-200 text-slate-600' },
            { label: '0%', color: 'bg-white text-slate-300 border border-slate-100' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded ${item.color} flex items-center justify-center text-xs font-bold`} />
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Informe ───────────────────────────────────────────────────────────────
function Informe({ informe }) {
  const sections = [
    { key: 'hallazgos', icon: '🔍', title: 'Principales hallazgos', color: 'indigo' },
    { key: 'erroresDetectados', icon: '⚠️', title: 'Errores detectados', color: 'amber' },
    { key: 'ajustesArquitectura', icon: '🏗️', title: 'Ajustes a la arquitectura', color: 'emerald' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-900 dot-indigo',
    amber: 'bg-amber-50 border-amber-200 text-amber-900',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };

  const dotMap = {
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
  };

  return (
    <div className="space-y-6">
      {sections.map((s, i) => (
        <motion.div key={s.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className={`rounded-2xl border p-6 ${colorMap[s.color]}`}>
          <p className="text-xs font-black uppercase tracking-widest mb-4 opacity-70 flex items-center gap-2">
            <span>{s.icon}</span> {s.title}
          </p>
          <ul className="space-y-3">
            {informe[s.key].map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full ${dotMap[s.color]} mt-1.5 flex-shrink-0`} />
                <p className="text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function Dendrograma() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('dendrograma');

  useEffect(() => {
    axios.get('/ux-sections/Dendrograma')
      .then(res => { setData(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando análisis...</p>
      </div>
    );
  }

  const dData = data?.data || {};
  const clusters = dData.clusters || [];
  const informe = dData.informe || {};

  return (
    <div className="min-h-[80vh] py-10 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Link para regresar al home */}
        <a href="/" className="inline-flex items-center gap-3 mb-20 text-blue-600 hover:text-blue-800 font-bold text-2xl">
          ← Volver Home
        </a>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-14">

          {/* HEADER */}
          <div className="text-center pt-2">
            <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">{data?.title || 'Dendrograma 📊'}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{data?.description}</p>
          </div>

          {/* EXPLICACIÓN */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">¿Qué muestra este análisis?</p>
            <p className="text-slate-300 text-sm leading-relaxed">{dData.explicacion}</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clusters.map((c, i) => {
              const p = PALETTE[c.color] || PALETTE.slate;
              return (
                <div key={i} className={`rounded-2xl border ${p.border} ${p.bg} p-5 text-center`}>
                  <p className={`text-3xl font-black ${p.text}`}>{c.similitudPromedio}%</p>
                  <p className={`text-xs font-bold mt-1 ${p.text} opacity-70`}>{c.nombre}</p>
                </div>
              );
            })}
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-slate-200">
            {[
              { id: 'dendrograma', label: '🌿 Dendrograma' },
              { id: 'matriz', label: '📊 Matriz de similitud' },
              { id: 'informe', label: '📋 Informe' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-bold rounded-t-xl border-b-2 transition-all
                  ${tab === t.id ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {tab === 'dendrograma' && (
              <motion.div key="dendro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6">
                {clusters.map((c, i) => <DendroCluster key={c.id} cluster={c} index={i} />)}
              </motion.div>
            )}

            {tab === 'matriz' && (
              <motion.div key="matriz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-8">
                {clusters.map((c, i) => <MatrizCluster key={c.id} cluster={c} index={i} />)}
              </motion.div>
            )}

            {tab === 'informe' && (
              <motion.div key="informe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Informe informe={informe} />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}