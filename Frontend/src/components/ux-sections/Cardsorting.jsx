import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PALETTE = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-500', badge: 'bg-indigo-100 text-indigo-700', header: 'from-indigo-600 to-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', header: 'from-emerald-500 to-teal-600' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', dot: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', header: 'from-violet-600 to-purple-700' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', dot: 'bg-slate-500', badge: 'bg-slate-100 text-slate-700', header: 'from-slate-600 to-slate-800' },
};

const CONSENSO_LABEL = {
  'alto': { label: 'Consenso alto', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'medio': { label: 'Consenso medio', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  'medio-bajo': { label: 'Consenso medio-bajo', color: 'bg-rose-100 text-rose-700 border-rose-200' },
};

const PARTICIPANT_COLORS = {
  francisco: 'from-blue-500 to-indigo-600',
  maria: 'from-rose-500 to-pink-600',
  martin: 'from-amber-500 to-orange-600',
  sebastian: 'from-emerald-500 to-teal-600',
};

// ─── Tarjeta individual ────────────────────────────────────────────────────
function Card({ texto, highlight = false }) {
  return (
    <div className={`text-sm px-3 py-2 rounded-xl border font-medium leading-tight transition-all
      ${highlight
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
        : 'bg-white text-slate-700 border-slate-200 shadow-sm'
      }`}>
      {texto}
    </div>
  );
}

// ─── Tarjeta de participante ───────────────────────────────────────────────
function ParticipantCard({ participante, index, tarjetaSeleccionada }) {
  const [expanded, setExpanded] = useState(false);
  const gradient = PARTICIPANT_COLORS[participante.id] || 'from-slate-500 to-slate-700';
  const sinNombre = participante.nota != null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{participante.rol}</p>
            <h3 className="text-white text-2xl font-black">{participante.nombre}</h3>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs mb-1">Tarjetas usadas</p>
            <p className="text-white text-3xl font-black">{participante.totalUsadas}<span className="text-white/50 text-lg">/20</span></p>
          </div>
        </div>
        {sinNombre && (
          <div className="mt-3 bg-white/15 rounded-xl px-4 py-2 border border-white/20">
            <p className="text-white/80 text-xs leading-relaxed">⚠️ {participante.nota}</p>
          </div>
        )}
      </div>

      {/* Categorías */}
      <div className="p-6 space-y-4">
        {sinNombre ? (
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Tarjetas ({participante.totalUsadas})
            </p>
            <div className="flex flex-wrap gap-2">
              {participante.categorias.map((cat, i) => (
                <Card
                  key={i}
                  texto={cat.tarjetas[0]}
                  highlight={tarjetaSeleccionada && cat.tarjetas[0] === tarjetaSeleccionada}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              {participante.categorias.length} categorías creadas
            </p>
            {participante.categorias.map((cat, i) => (
              <div key={i} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <p className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  {cat.nombre}
                  <span className="ml-auto text-xs text-slate-400 font-medium">{cat.tarjetas.length} tarjetas</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.tarjetas.map((t, j) => (
                    <Card
                      key={j}
                      texto={t}
                      highlight={tarjetaSeleccionada && t === tarjetaSeleccionada}
                    />
                  ))}
                </div>
              </div>
            ))}
            {participante.sinCategorizar && participante.sinCategorizar.length > 0 && (
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                <p className="text-sm font-black text-amber-700 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  Sin categorizar
                  <span className="ml-auto text-xs text-amber-500 font-medium">{participante.sinCategorizar.length} tarjetas</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {participante.sinCategorizar.map((t, j) => (
                    <div key={j} className="text-xs px-3 py-1.5 rounded-xl border border-amber-200 bg-white text-amber-700 font-medium">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Cluster emergente ─────────────────────────────────────────────────────
function ClusterCard({ cluster, index, onSelectTarjeta, tarjetaSeleccionada }) {
  const p = PALETTE[cluster.color] || PALETTE.slate;
  const consenso = CONSENSO_LABEL[cluster.consenso];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border ${p.border} ${p.bg} p-6`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className={`text-base font-black ${p.text}`}>{cluster.nombre}</h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border flex-shrink-0 ${consenso.color}`}>
          {consenso.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {cluster.tarjetas.map((t, i) => (
          <button
            key={i}
            onClick={() => onSelectTarjeta(tarjetaSeleccionada === t ? null : t)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer
              ${tarjetaSeleccionada === t
                ? `${p.dot.replace('bg-', 'bg-')} bg-opacity-100 bg-indigo-600 text-white border-indigo-600`
                : `bg-white ${p.text} ${p.border} hover:shadow-md`
              }`}
          >
            {t}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function CardSorting() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);
  const [tab, setTab] = useState('participantes');

  useEffect(() => {
    axios.get('/ux-sections/CardSorting')
      .then(res => { setData(res.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando CardSorting...</p>
      </div>
    );
  }

  const csData = data?.data || {};
  const participantes = csData.participantes || [];
  const clusters = csData.clusters || [];
  const tarjetas = csData.tarjetas || [];

  return (
    <div className="min-h-[80vh] py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-14">
          {/* Link para regresar al home */}
          <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
            ← Volver Home
          </a>
          {/* HEADER */}
          <div className="text-center pt-2">
            <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-blue-900 mb-4">{data?.title || 'CardSorting 🃏'}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{data?.description}</p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Participantes', value: participantes.length, icon: '👥' },
              { label: 'Tarjetas totales', value: tarjetas.length, icon: '🃏' },
              { label: 'Clusters emergentes', value: clusters.length, icon: '🔵' },
              { label: 'Categorías únicas', value: '7', icon: '📂' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 text-center">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* NOTA METODOLÓGICA */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">⚠️ Nota metodológica</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              Martín y Sebastián completaron el ejercicio pero no nombraron sus categorías, colocando cada tarjeta en un grupo individual.
              Sus respuestas son válidas para el análisis de similitud pero tienen menor peso cualitativo en la definición de clusters
              conceptuales. Francisco usó 13 de las 20 tarjetas, dejando 7 sin categorizar. Solo María completó el ejercicio en su totalidad con categorías nombradas.
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-slate-200 pb-0">
            {[
              { id: 'participantes', label: '👥 Respuestas por participante' },
              { id: 'clusters', label: '🔵 Clusters emergentes' },
              { id: 'tarjetas', label: '🃏 Las 20 tarjetas' },
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

          {/* TAB: PARTICIPANTES */}
          <AnimatePresence mode="wait">
            {tab === 'participantes' && (
              <motion.div key="participantes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 gap-6">
                {participantes.map((p, i) => (
                  <ParticipantCard key={p.id} participante={p} index={i} tarjetaSeleccionada={tarjetaSeleccionada} />
                ))}
              </motion.div>
            )}

            {/* TAB: CLUSTERS */}
            {tab === 'clusters' && (
              <motion.div key="clusters" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-6">
                <p className="text-sm text-slate-500 leading-relaxed bg-white rounded-xl border border-slate-100 p-5">
                  Los clusters representan los agrupamientos mentales que emergieron con mayor consenso entre los participantes.
                  <strong className="text-slate-700"> Hacé click en cualquier tarjeta</strong> para ver cómo la categorizó cada participante.
                </p>
                {tarjetaSeleccionada && (
                  <div className="bg-indigo-600 text-white rounded-2xl p-4 flex items-center justify-between">
                    <p className="text-sm font-bold">📌 Filtrando: <span className="font-black">"{tarjetaSeleccionada}"</span></p>
                    <button onClick={() => setTarjetaSeleccionada(null)} className="text-white/70 hover:text-white text-xs underline">
                      Limpiar filtro
                    </button>
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-5">
                  {clusters.map((c, i) => (
                    <ClusterCard key={c.id} cluster={c} index={i}
                      onSelectTarjeta={setTarjetaSeleccionada}
                      tarjetaSeleccionada={tarjetaSeleccionada} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB: TARJETAS */}
            {tab === 'tarjetas' && (
              <motion.div key="tarjetas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-wrap gap-3">
                  {tarjetas.map((t, i) => (
                    <motion.button key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => { setTarjetaSeleccionada(tarjetaSeleccionada === t ? null : t); setTab('clusters'); }}
                      className="bg-white border border-slate-200 shadow-sm hover:shadow-md text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer text-left">
                      <span className="text-slate-400 text-xs font-bold mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {t}
                    </motion.button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-6 text-center">
                  Hacé click en cualquier tarjeta para verla destacada en los clusters
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}