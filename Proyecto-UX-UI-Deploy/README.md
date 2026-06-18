# Kairos — Tu plan ejecutado en el tiempo justo.

> *Tu plan, al ritmo de tu vida.*

Proyecto integrador de la **Diplomatura en Diseño UX/UI** — GlobalAcademy 2026.
Documentación completa del proceso UX para una app de acompañamiento en tiempo real dirigida a jóvenes de 18 a 30 años que estudian y trabajan simultáneamente.

---

## ¿Qué es Kairos?

**Kairos** (del griego: *el momento oportuno*) es una app de gestión del tiempo que no solo ayuda a planificar el día, sino que acompaña al usuario mientras lo ejecuta. La diferencia central respecto a la competencia: Kairos avisa cuando el tiempo se está agotando, antes de que sea tarde.

> *"No hay algo que me diga: estás en tiempo crítico."* — Francisco, entrevistado

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + React Router v7 + Tailwind v4 |
| Backend | Node.js + Express 5 |
| Base de datos | MongoDB + Mongoose 9 |
| Animaciones | Framer Motion |
| HTTP Client | Axios |

Arquitectura **MVC** en el backend con seeds JSON para poblar la base de datos. Patrón de componentes por sección UX en el frontend.

---

## Proceso UX documentado

El proyecto cubre el proceso UX completo en 16 secciones:

| # | Sección | Descripción |
|---|---------|-------------|
| 01 | Research | Investigación de problemática con fuentes periodísticas y análisis de redes sociales |
| 02 | Planteamiento | Problemática, usuario objetivo, solución y objetivos de la app |
| 03 | User Personas | Matías García y Valentina Ríos — perfiles construidos desde las entrevistas |
| 04 | Encuestas | Encuesta cuantitativa a 10 personas con análisis de hallazgos |
| 05 | Entrevistas | 4 entrevistas en profundidad con informe de validación de proto-persona |
| 06 | Mapa de Empatía | ¿Qué piensa, siente, dice, hace, oye y ve el usuario? |
| 07 | User Journey Map | 5 etapas con curva emocional, canales y oportunidades |
| 08 | Point of View | Declaración POV en formato usuario / necesidad / insight |
| 09 | Storytelling | Narrativa inicio-nudo-desenlace sobre la User Persona |
| 10 | Storyboard | Representación gráfica del storytelling en 6 viñetas |
| 11 | Benchmarking | Análisis de Google Calendar, Notion y Todoist |
| 12 | CardSorting | Ejercicio con 4 usuarios y 20 tarjetas de funcionalidades |
| 13 | Dendrograma & Matriz | Análisis de similitud y clusters emergentes del CardSorting |
| 14 | Mapa de Sitio | Arquitectura de la información en 3 niveles de profundidad |
| 15 | Task Flow | Flujos lineales: ejecutar el día y planificar el día |
| 16 | User Flow | Flujos con decisiones condicionales y manejo de errores |

---

## Instalación

### Requisitos
- Node.js 18+
- MongoDB (local o Atlas)

### Backend

```bash
cd my-proyect-ux-back
npm install
npm run seed        # Poblar la base de datos con los seeds
npm run dev         # Puerto 5000
```

### Frontend

```bash
cd my-proyect-ux
npm install
npm start           # Puerto 3000
```

---

## Estructura del proyecto

```
kairos/
├── my-proyect-ux/                  # Frontend React
│   ├── public/
│   │   └── images/Icons/Logo.png   # Logo de Kairos
│   └── src/
│       ├── components/
│       │   ├── ux-sections/        # Componente por cada sección UX
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── SectionsNav.jsx
│       │   └── SectionViewer.jsx   # Viewer genérico para secciones con seeds
│       └── App.js
│
└── my-proyect-ux-back/             # Backend Express
    ├── controllers/
    ├── models/
    ├── routes/
    └── seeds/                      # JSONs con el contenido de cada sección UX
```

---

## User Personas

### Matías García — 21 años
Estudiante de Sistemas + soporte técnico part-time. Logra organizarse pero pierde la noción del tiempo durante la ejecución. Necesita acompañamiento activo, no otro planificador.

### Valentina Ríos — 24 años
Emprendedora de diseño + estudiante. Sus horarios cambian cada semana y la acumulación la desborda. Tiene herramientas pero no logra la constancia.

---

## MVP — Funcionalidad principal

> Acompañamiento en tiempo real durante la ejecución del día.

**Imprescindibles:** alertas en tiempo crítico · carga rápida de tareas · progreso del día visible · reorganización ante imprevistos · onboarding en 60 segundos · soporte para horarios variables.

**Deseables:** sistema de recompensas · historial semanal · sugerencias inteligentes · integración con Google Calendar.

---

## Identidad de marca

- **Nombre:** Kairos *(griego: el momento oportuno)*
- **Eslogan:** Kairos: tu plan ejecutado en el tiempo justo.
- **Lema:** Tu plan, al ritmo de tu vida.

---

## Autor

**Ibar Caubet** — Full Stack Developer  
Diplomatura en Diseño UX/UI · GlobalAcademy · 2026
