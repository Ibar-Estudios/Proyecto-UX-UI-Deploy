import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const COMENTARIOS = [
  {
    imagen: '/images/research/comentario-1.jpeg',
    plataforma: 'Reddit',
    analisis: 'El usuario describe perfectamente el perfil de Matías: trabaja y estudia simultáneamente, con horarios rotativos que le impiden desconectar. La frase "lo malo es que yo me organizaba el tiempo" encierra toda la ironía del problema — saber que hay que organizarse no alcanza si no hay un sistema que acompañe.'
  },
  {
    imagen: '/images/research/comentario-2.jpeg',
    plataforma: 'Reddit — r/productivity',
    analisis: 'Futuro estudiante universitario que ya percibe que el tiempo "se le escapa como agua" antes de empezar. Observa a otros que sí logran organizarse y lo ve casi como magia. Este comentario valida que el problema aparece antes de ingresar a la universidad y que los usuarios son conscientes de él pero no saben cómo resolverlo.'
  },
  {
    imagen: '/images/research/comentario-3.jpeg',
    plataforma: 'Reddit — r/productivity',
    analisis: 'Usuario con horario siempre cambiante y constantes interrupciones que le impiden reconcentrarse. Conecta directamente con Barbara — horarios rotativos — y con la necesidad de alertas proactivas. La pregunta resume el diferencial del producto: cómo mantenerse concentrado y retomar la tarea cuando algo te saca del flujo.'
  }
];

const NOTICIAS = [
  {
    imagen: '/images/research/noticia-1.jpeg',
    fuente: 'Infobae',
    analisis: 'El artículo contextualiza el problema a escala social: la sensación de falta de tiempo dejó de ser una excepción para convertirse en una percepción cotidiana. "Las listas de tareas se alargan y los objetivos cumplidos suelen ser pocos" es exactamente lo que nuestros encuestados confirmaron. El problema no es individual — es sistémico.'
  },
  {
    imagen: '/images/research/noticia-2.png',
    fuente: 'Artículo sobre universitarios en Chile',
    analisis: 'La cita del psicólogo educacional Diego Figueroa es clave: cuando no tenemos los recursos para enfrentar lo que la vida nos exige, el estrés genera cortisol que daña el cerebro y desordena los horarios. Esto explica científicamente por qué Constantino dejó el gimnasio — no fue falta de tiempo sino estrés por saturación.'
  },
  {
    imagen: '/images/research/noticia-3.png',
    fuente: 'Universidad de Mendoza — Sede Río Cuarto',
    analisis: 'La Universidad de Mendoza organizó un taller sobre gestión del tiempo para ingresantes universitarios, confirmando que el problema es tan extendido que las propias instituciones lo abordan de forma institucional. Entre los temas emergentes se destacaron la dificultad para organizar tiempos ante múltiples demandas — exactamente los hallazgos de nuestra investigación.'
  }
];

function ArticleCard({ item }) {
  const isLink = typeof item === 'string' && item.startsWith('🔗 http');
  const isSeparator = typeof item === 'string' && item.startsWith('━');
  const isLabel = typeof item === 'string' && item.startsWith('📄');

  if (isSeparator) return <hr className="border-slate-200 my-4" />;

  if (isLink) {
    const url = item.replace('🔗 ', '');
    return (
      <li className="flex items-center gap-2">
        <span className="text-blue-400">🔗</span>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="text-blue-600 underline text-sm hover:text-blue-800 break-all">
          {url}
        </a>
      </li>
    );
  }

  return (
    <li className={`flex items-start gap-3 ${isLabel ? 'mt-4' : ''}`}>
      {!isLabel && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
      <span className={isLabel ? 'font-black text-slate-900 text-base' : 'text-sm text-slate-700 leading-relaxed'}>
        {item}
      </span>
    </li>
  );
}

function ImageCard({ item, index, tipo }) {
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);
  const esComentario = tipo === 'comentario';

  const badgeClass = esComentario
    ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
    : 'bg-emerald-100 text-emerald-700 border-emerald-200';
  const borderClass = esComentario ? 'border-indigo-200' : 'border-emerald-200';
  const accentClass = esComentario ? 'border-indigo-500' : 'border-emerald-500';
  const btnClass = esComentario
    ? 'bg-indigo-600 hover:bg-indigo-700'
    : 'bg-emerald-600 hover:bg-emerald-700';
  const label = esComentario ? '💬 Comentario' : '📰 Noticia';
  const subtitulo = esComentario ? item.plataforma : item.fuente;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gradient-to-br from-slate-200 to-blue-300 rounded-2xl border ${borderClass} shadow-lg overflow-hidden flex flex-col`}
    >
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeClass}`}>
          {label}
        </span>
        <span className="text-xs text-slate-400 font-medium">{subtitulo}</span>
      </div>

      {/* Imagen a full width */}
      <div className="px-5 pb-4">
        <img
          src={item.imagen}
          alt={`${tipo} ${index + 1}`}
          className="w-full rounded-xl border border-slate-100 shadow-sm"
          style={{ maxHeight: '500px', objectFit: 'contain' }}
        />
      </div>

      {/* Botón toggle */}
      <div className="px-5 pb-5">
        <button
          onClick={() => setMostrarAnalisis(!mostrarAnalisis)}
          className={`w-full ${btnClass} text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`}
        >
          {mostrarAnalisis ? '▲ Ocultar análisis' : '▼ Ver análisis'}
        </button>

        {mostrarAnalisis && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`mt-4 p-4 bg-slate-50 rounded-xl border-l-4 ${accentClass}`}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Análisis</p>
            <p className="text-sm text-slate-700 leading-relaxed">{item.analisis}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function Research() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/ux-sections/Research')
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
        <p className="text-xl text-slate-500">Cargando 1.Research...</p>
      </div>
    );
  }

  // Busca las keys del data de forma flexible para evitar problemas con emojis
  const dataObj = data?.data || {};
  const articulosKey = Object.keys(dataObj).find(k => k.includes('Artículos') || k.includes('Problemática'));
  const competidoresKey = Object.keys(dataObj).find(k => k.includes('Competidores'));
  const conclusionesKey = Object.keys(dataObj).find(k => k.includes('Conclusiones'));

  const articulos = articulosKey ? dataObj[articulosKey] : [];
  const competidores = competidoresKey ? dataObj[competidoresKey] : [];
  const conclusiones = conclusionesKey ? dataObj[conclusionesKey] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto space-y-16 px-10 py-5"
    >
      {/* Link para regresar al home */}
      <a href="/" className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 font-bold text-2xl">
        ← Volver Home
      </a>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl lg:text-7xl font-black text-blue-900 mb-4">
          Research 🔍
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8" />
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {data?.description}
        </p>
      </div>

      {/* Contexto general */}
      {data?.content && (
        <div
          className="bg-gradient-to-br from-slate-200 to-blue-300 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-slate-200/50"
          dangerouslySetInnerHTML={{
            __html: data.content
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>')
              .replace(/\n\n/g, '</p><p class="mb-6">')
              .replace(/^/, '<p class="mb-6 leading-relaxed text-lg text-slate-800">')
          }}
        />
      )}

      {/* Investigación de Problemática */}
      {articulos.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
            <h2 className="text-3xl font-black text-slate-700">Investigación de Problemática</h2>
          </div>
          <p className="text-slate-500 text-base">Artículos y fuentes académicas que corroboran el problema.</p>
          <div className="bg-gradient-to-br from-slate-200 to-blue-300 rounded-2xl border border-slate-200 shadow-xl p-8">
            <ul className="space-y-2">
              {articulos.map((item, i) => <ArticleCard key={i} item={item} />)}
            </ul>
          </div>
        </section>
      )}

      {/* Comentarios — 2 columnas */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
          <h2 className="text-3xl font-black text-slate-700">Investigación de Usuarios</h2>
        </div>
        <p className="text-slate-500 text-base">
          Análisis de comentarios reales en redes sociales donde los usuarios discuten esta necesidad.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {COMENTARIOS.map((item, i) => (
            <ImageCard key={i} item={item} index={i} tipo="comentario" />
          ))}
        </div>
      </section>

      {/* Noticias — 2 columnas */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
          <h2 className="text-3xl font-black text-slate-700">Noticias y Medios</h2>
        </div>
        <p className="text-slate-500 text-base">
          Cobertura periodística que confirma que el problema trasciende lo individual y es de escala social.
        </p>
        <div className="grid md:grid-cols-2 gap-8 ">
          {NOTICIAS.map((item, i) => (
            <ImageCard key={i} item={item} index={i} tipo="noticia" />
          ))}
        </div>
      </section>

      {/* Competidores */}
      {competidores.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
            <h2 className="text-3xl font-black text-slate-700">Competidores Identificados</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {competidores.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-gradient-to-br from-slate-200 to-blue-300 border border-slate-200 rounded-2xl p-5 shadow-md"
              >
                <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Conclusiones */}
      {conclusiones.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-1 h-10 bg-gradient-to-b from-slate-600 to-slate-900 rounded-full" />
            <h2 className="text-3xl font-black text-slate-700">Conclusiones del Research</h2>
          </div>
          <div className="bg-slate-900 rounded-2xl p-8 shadow-2xl">
            <ul className="space-y-4">
              {conclusiones.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </motion.div>
  );
}