import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// ─── Paletas ───────────────────────────────────────────────────────────────
const PALETTE = {
  indigo: {
    gradient: "from-indigo-600 to-blue-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    line: "bg-indigo-200",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    stepUser: "bg-indigo-600 text-white border-indigo-600",
    stepSystem: "bg-white text-indigo-700 border-indigo-300",
    connector: "border-indigo-200",
    number: "bg-indigo-600 text-white",
    pantalla: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  violet: {
    gradient: "from-violet-600 to-purple-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    dot: "bg-violet-500",
    line: "bg-violet-200",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    stepUser: "bg-violet-600 text-white border-violet-600",
    stepSystem: "bg-white text-violet-700 border-violet-300",
    connector: "border-violet-200",
    number: "bg-violet-600 text-white",
    pantalla: "bg-violet-50 text-violet-600 border-violet-200",
  },
};

// ─── Tipo de paso ──────────────────────────────────────────────────────────
function TipoBadge({ tipo, palette }) {
  if (tipo === "accion-usuario") {
    return (
      <span
        className={`text-xs font-black px-3 py-1 rounded-full border ${palette.badge} flex items-center gap-1.5`}
      >
        👤 Acción del usuario
      </span>
    );
  }
  return (
    <span className="text-xs font-black px-3 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-200 flex items-center gap-1.5">
      ⚙️ Respuesta del sistema
    </span>
  );
}

// ─── Paso individual ───────────────────────────────────────────────────────
function Paso({ paso, index, palette, isLast, isActive, onClick }) {
  const esUsuario = paso.tipo === "accion-usuario";

  return (
    <div className="flex gap-4 items-stretch">
      {/* Columna izquierda: número + línea conectora */}
      <div className="flex flex-col items-center flex-shrink-0">
        <button
          onClick={onClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg transition-all
            ${isActive ? palette.number + " scale-110 shadow-xl" : "bg-slate-200 text-slate-600 hover:scale-105"}`}
        >
          {paso.orden}
        </button>
        {!isLast && (
          <div
            className={`w-0.5 flex-1 mt-2 ${isActive ? palette.dot.replace("bg-", "bg-") : "bg-slate-200"} min-h-[2rem]`}
            style={{ backgroundColor: isActive ? undefined : "#e2e8f0" }}
          />
        )}
      </div>

      {/* Contenido del paso */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.07 }}
        onClick={onClick}
        className={`flex-1 mb-6 rounded-2xl border-2 p-5 cursor-pointer transition-all
          ${isActive
            ? esUsuario
              ? `${palette.stepUser} shadow-xl scale-[1.01]`
              : `border-slate-300 bg-white shadow-xl scale-[1.01]`
            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md"
          }`}
      >
        {/* Header del paso */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h4
            className={`font-black text-base leading-tight
            ${isActive && esUsuario ? "text-white" : "text-slate-900"}`}
          >
            {paso.titulo}
          </h4>
          <TipoBadge tipo={paso.tipo} palette={palette} />
        </div>

        {/* Descripción */}
        <p
          className={`text-sm leading-relaxed mb-3
          ${isActive && esUsuario ? "text-white/85" : "text-slate-600"}`}
        >
          {paso.descripcion}
        </p>

        {/* Pantalla */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-black uppercase tracking-widest
            ${isActive && esUsuario ? "text-white/60" : "text-slate-400"}`}
          >
            Pantalla
          </span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border
            ${isActive && esUsuario
                ? "bg-white/20 text-white border-white/30"
                : `${palette.pantalla}`
              }`}
          >
            {paso.pantalla}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Tarjeta de flujo completo ─────────────────────────────────────────────
function FlujoCard({ flujo, index }) {
  const palette = PALETTE[flujo.color] || PALETTE.indigo;
  const [pasoActivo, setPasoActivo] = useState(null);

  const handlePaso = (id) => setPasoActivo(pasoActivo === id ? null : id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
              <h2 className="text-white text-2xl font-black mb-2">
                {flujo.nombre}
              </h2>
              <p className="text-white/75 text-sm leading-relaxed max-w-xl">
                {flujo.descripcion}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-white/60 text-xs mb-1">Pasos</p>
            <p className="text-white text-3xl font-black">
              {flujo.pasos.length}
            </p>
          </div>
        </div>

        {/* Escenario */}
        <div className="mt-6 bg-white/15 rounded-2xl p-5 border border-white/20">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
            👤 User Persona: {flujo.userPersona} — Escenario
          </p>
          <p className="text-white text-sm italic leading-relaxed">
            "{flujo.escenario}"
          </p>
        </div>
      </div>

      {/* Flujo de pasos */}
      <div className="p-8">
        {/* Leyenda */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 w-full">
            Hacé click en un paso para destacarlo
          </p>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${palette.dot}`} />
            <span className="text-xs text-slate-600 font-medium">
              Acción del usuario
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-600 font-medium">
              Respuesta del sistema
            </span>
          </div>
        </div>

        {/* Pasos */}
        <div>
          {flujo.pasos.map((paso, i) => (
            <Paso
              key={paso.id}
              paso={paso}
              index={i}
              palette={palette}
              isLast={i === flujo.pasos.length - 1}
              isActive={pasoActivo === paso.id}
              onClick={() => handlePaso(paso.id)}
            />
          ))}
        </div>

        {/* Fin del flujo */}
        <div className={`flex items-center gap-3 mt-2 ml-14`}>
          <div
            className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${palette.gradient} text-white font-black text-sm shadow-lg`}
          >
            ✅ Fin del flujo — {flujo.nombre}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Resumen visual comparativo ────────────────────────────────────────────
function ResumenComparativo({ flujos }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {flujos.map((flujo, i) => {
        const palette = PALETTE[flujo.color] || PALETTE.indigo;
        const usuarioSteps = flujo.pasos.filter(
          (p) => p.tipo === "accion-usuario",
        ).length;
        const sistemaSteps = flujo.pasos.filter(
          (p) => p.tipo === "respuesta-sistema",
        ).length;

        return (
          <motion.div
            key={flujo.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl border ${palette.border} ${palette.bg} p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{flujo.icono}</span>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {flujo.subtitulo}
                </p>
                <h3 className={`font-black text-lg ${palette.text}`}>
                  {flujo.nombre}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-100 p-3 text-center">
                <p className="text-2xl font-black text-slate-900">
                  {flujo.pasos.length}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Pasos totales</p>
              </div>
              <div
                className={`rounded-xl border p-3 text-center ${palette.badge}`}
              >
                <p className="text-2xl font-black">{usuarioSteps}</p>
                <p className="text-xs mt-0.5 opacity-80">Acciones usuario</p>
              </div>
              <div className="bg-slate-100 rounded-xl border border-slate-200 p-3 text-center">
                <p className="text-2xl font-black text-slate-700">
                  {sistemaSteps}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Resp. sistema</p>
              </div>
            </div>

            {/* Mini timeline */}
            <div className="mt-4 flex gap-1">
              {flujo.pasos.map((paso, j) => (
                <div
                  key={j}
                  title={paso.titulo}
                  className={`flex-1 h-2 rounded-full transition-all
                    ${paso.tipo === "accion-usuario" ? palette.dot : "bg-slate-300"}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-xs text-slate-400">Inicio</p>
              <p className="text-xs text-slate-400">Fin</p>
            </div>
          </motion.div>
        );
      })}


      {/* Link a Figma-Fijgam */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="bg-slate-900 rounded-2xl p-6 shadow-2xl mt-6 flex items-center justify-center flex-col">
        <h2 className="text-slate-300 text-sm leading-relaxed font-bold">
          ¿Querés ver los flujos interactivos en FigJam?
        </h2>
        <button className="text-slate-300 text-sm leading-relaxed mt-4 bg-gray-500 rounded-lg px-4 py-2 hover:bg-gray-600 transition-colors">
          <a href="https://www.figma.com/board/2YwZEev6HRdZgpjejGCtvh/Task-Flow---GA?node-id=0-1&t=bkrIJBSvsh67uEYf-1" target="_blank" className="flex justify-center align-center">
            <img src="/images/Icons/fijgam.png" alt="Logo de FigJam" className="w-10 pr-1" />Task Flow FigJam
          </a>
        </button>
      </motion.div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function TaskFlow() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("flujos");

  useEffect(() => {
    axios
      .get("/ux-sections/TaskFlow")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando Task Flow...</p>
      </div>
    );
  }

  const tfData = data?.data || {};
  const flujos = tfData.flujos || [];

  return (
    <div className="min-h-[80vh] py-10 px-8">
      <div className="max-w-5xl mx-auto">
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
              {data?.title || "Task Flow 🔀"}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto mb-8" />
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {data?.description}
            </p>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3">
              ¿Qué es un Task Flow?
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {tfData.descripcion}
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 border-b border-slate-200">
            {[
              { id: "flujos", label: "🔀 Flujos detallados" },
              { id: "resumen", label: "📊 Resumen comparativo" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-bold rounded-t-xl border-b-2 transition-all
                  ${tab === t.id
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {tab === "flujos" && (
              <motion.div
                key="flujos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-12"
              >
                {flujos.map((flujo, i) => (
                  <FlujoCard key={flujo.id} flujo={flujo} index={i} />
                ))}
              </motion.div>
            )}

            {tab === "resumen" && (
              <motion.div
                key="resumen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResumenComparativo flujos={flujos} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
