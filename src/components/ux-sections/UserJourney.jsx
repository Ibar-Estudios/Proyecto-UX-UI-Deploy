import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const ROWS = ['acciones', 'pensamientos', 'emocion', 'dolores', 'oportunidades'];
const ROW_LABELS = {
  acciones: 'Acciones',
  pensamientos: 'Pensamientos',
  emocion: 'Emoción',
  dolores: 'Dolor',
  oportunidades: 'Oportunidad',
};

function CurvaEmocional({ etapas }) {
  const W = 700, H = 120, PAD = 24;
  const cols = etapas.length;
  const xs = etapas.map((_, i) => PAD + (i / (cols - 1)) * (W - PAD * 2));
  const ys = etapas.map(e => H - PAD - ((e.curva / 100) * (H - PAD * 2)));

  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="flex items-center gap-2 mb-1 px-2">
        <span className="text-xs text-slate-400 font-mono">+ positivo</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 400 }}>
        {/* Grid lines */}
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#334155" strokeWidth="1" />
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#334155" strokeWidth="1" />
        {/* Path */}
        <path d={path} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Points */}
        {xs.map((x, i) => (
          <circle key={i} cx={x} cy={ys[i]} r="5" fill={etapas[i].color} stroke="#1e293b" strokeWidth="2" />
        ))}
      </svg>
      <div className="flex items-center gap-2 px-2">
        <span className="text-xs text-slate-400 font-mono">- negativo</span>
      </div>
    </div>
  );
}

export default function UserJourney() {
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/ux-sections/UserJourney')
      .then(res => {
        setEtapas(res.data.data?.data?.etapas || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent" />
        <p className="text-xl text-slate-400">Cargando 7.User Journey...</p>
      </div>
    );
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-full mx-auto space-y-10 px-2 py-10"
    >
      {/* Link para regresar al home */}
      <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
        ← Volver Home
      </a>
      
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">
          User Journey Map 🗺️
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6" />
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Recorrido emocional y funcional de <strong className="text-slate-700">Matías</strong> a través de las 5 etapas clave — desde que detecta el problema hasta encontrar el producto ideal.
        </p>
      </div>

      {/* Tabla principal */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xl bg-white">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr>
              {/* Columna label */}
              <th className="w-32 bg-slate-900 p-4" />
              {etapas.map((e, i) => (
                <th
                  key={i}
                  className="p-4 text-white text-sm font-bold text-center"
                  style={{ backgroundColor: e.color }}
                >
                  <div className="text-xs opacity-70 mb-1">{e.numero}.</div>
                  {e.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <tr key={row} className={ri % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                {/* Label fila */}
                <td className="bg-slate-900 text-slate-200 text-xs font-bold uppercase tracking-widest p-4 text-center align-middle">
                  <div style={{ writingMode: 'horizontal-tb' }}>{ROW_LABELS[row]}</div>
                </td>

                {etapas.map((e, ei) => (
                  <td key={ei} className="p-4 align-top border-l border-slate-100">
                    {row === 'emocion' ? (
                      <div className="text-center space-y-1">
                        <div className="text-2xl">{e.emoji}</div>
                        <div className="text-xs font-semibold text-slate-600">{e.emocion}</div>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {(Array.isArray(e[row]) ? e[row] : [e[row]]).map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                            <span
                              className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: e.color }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Fila curva emocional */}
            <tr className="bg-slate-900">
              <td className="bg-slate-900 text-slate-200 text-xs font-bold uppercase tracking-widest p-4 text-center">
                Curva emocional
              </td>
              <td colSpan={etapas.length} className="p-4">
                <CurvaEmocional etapas={etapas} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leyenda etapas */}
      <div className="flex flex-wrap gap-3 justify-center">
        {etapas.map((e, i) => (
          <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
            <span className="text-sm font-medium text-slate-700">{e.numero}. {e.nombre}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
