import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function SceneIllustration({ numero, tipo }) {
  if (numero === '01') return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <div className="w-28 h-20 bg-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
          <div className="space-y-1.5 w-16">
            <div className="h-1.5 bg-slate-400 rounded" />
            <div className="h-1.5 bg-slate-400 rounded w-3/4" />
            <div className="h-1.5 bg-slate-400 rounded" />
            <div className="h-1.5 bg-slate-400 rounded w-1/2" />
          </div>
        </div>
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">21:00</span>
        <div className="w-16 h-1.5 bg-slate-500 rounded mx-auto mt-1" />
      </div>
      <div className="text-3xl">😐</div>
    </div>
  );

  if (numero === '02') return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative w-24 h-24">
        <div className="w-24 h-24 rounded-full border-4 border-slate-400 flex items-center justify-center bg-slate-700">
          <div className="absolute w-1 h-10 bg-slate-300 rounded origin-bottom" style={{ transform: 'rotate(-60deg)', bottom: '50%', left: '50%', marginLeft: -2 }} />
          <div className="absolute w-0.5 h-8 bg-red-500 rounded origin-bottom" style={{ transform: 'rotate(80deg)', bottom: '50%', left: '50%', marginLeft: -1 }} />
          <div className="w-2 h-2 bg-slate-300 rounded-full z-10" />
        </div>
      </div>
      <div className="text-2xl">❓</div>
    </div>
  );

  if (numero === '03') return (
    <div className="flex items-center justify-center gap-3">
      {['📅', '✅', '🤖'].map((icon, i) => (
        <div key={i} className="relative">
          <div className="text-3xl opacity-60">{icon}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-red-500 text-4xl font-black opacity-90">✕</div>
          </div>
        </div>
      ))}
    </div>
  );

  if (numero === '04') return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-36 bg-slate-800 rounded-2xl border-2 border-slate-600 flex flex-col items-center pt-4 gap-1.5 px-2">
          <div className="w-full bg-red-900 border border-red-600 rounded-lg p-1.5">
            <div className="text-red-400 text-xs font-bold flex items-center gap-1">⏰ Tiempo crítico</div>
            <div className="text-slate-300 text-xs">Te quedan 20 min para Parcial</div>
          </div>
          <div className="w-full space-y-1 mt-1">
            <div className="h-2 bg-indigo-600 rounded w-full" />
            <div className="h-2 bg-slate-600 rounded w-4/5" />
            <div className="h-2 bg-slate-600 rounded w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );

  if (numero === '05') return (
    <div className="flex flex-col items-center justify-center gap-2 w-full px-2">
      <div className="text-xs text-slate-300 font-semibold">Progreso del día</div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: '70%' }} />
      </div>
      <div className="text-green-400 text-xs font-bold">70% completado</div>
      <div className="w-full space-y-1 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
          <div className="text-xs text-slate-400 line-through">Estudiar para parcial</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-600 flex-shrink-0" />
          <div className="text-xs text-slate-300">Entregar TP viernes</div>
          <span className="text-yellow-400 text-sm">⭐</span>
        </div>
      </div>
      <div className="bg-green-900 border border-green-600 text-green-300 text-xs rounded-lg px-3 py-1 mt-1">
        ¡Vas muy bien! Próxima: Gym 💪
      </div>
    </div>
  );

  if (numero === '06') return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="text-5xl">😊</div>
      <div className="bg-green-900 border border-green-600 text-green-300 text-xs rounded-xl px-4 py-2 text-center">
        <div className="font-bold">Semana completada 🎉</div>
        <div className="text-green-400 mt-0.5">Gym retomado · 5 días seguidos</div>
      </div>
    </div>
  );

  return <div className="text-4xl text-center">🎬</div>;
}

export default function Storyboard() {
  const [escenas, setEscenas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/ux-sections/Storyboard')
      .then(res => {
        setEscenas(res.data.data?.data?.escenas || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando 10.Storyboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-10 px-2 py-10"
    >
      {/* Link para regresar al home */}
      <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
        ← Volver Home
      </a>
      
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-5xl lg:text-6xl font-bold bg-clip-text text-blue-900 mb-4">
          Storyboard 🎬
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6" />
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Secuencia visual de <strong className="text-slate-700">6 escenas</strong> que muestra el recorrido de Matías — desde el problema hasta el resultado final con el producto.
        </p>
      </div>

      {/* Grid de escenas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {escenas.map((escena, i) => (
          <motion.div
            key={escena.numero}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#2a2a2a] rounded-2xl overflow-hidden border border-slate-700 shadow-xl flex flex-col"
          >
            {/* Label escena */}
            <div className="px-4 pt-4 pb-1 text-slate-400 text-sm font-medium">
              Escena {escena.numero}
            </div>

            {/* Ilustración */}
            <div className="h-44 flex items-center justify-center px-4 py-2">
              <SceneIllustration numero={escena.numero} tipo={escena.tipo} />
            </div>

            {/* Contenido */}
            <div className="px-4 pb-5 flex flex-col gap-2 flex-1">
              {/* Badge tipo */}
              <span
                className="self-start text-white text-xs font-bold px-3 py-1 rounded-full"
                style={{ backgroundColor: escena.tipoColor }}
              >
                {escena.tipo}
              </span>

              <h3 className="text-white font-bold text-lg leading-snug">
                {escena.titulo}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {escena.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        {[
          { label: 'Problema', color: '#c0392b' },
          { label: 'Solución', color: '#2980b9' },
          { label: 'Resultado', color: '#27ae60' },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-sm font-medium text-slate-700">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
