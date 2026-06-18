<<<<<<< HEAD
const mongoose = require('mongoose');

const uxSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    unique: true,
  },
  title: { type: String, required: true },  // Título visible, ej. "1. Research"
  description: { type: String },  // Texto introductorio
  content: {
    type: String,
    default: ''
  }, // Contenido principal Markdown/HTML
  data: { type: mongoose.Schema.Types.Mixed },  // JSON flexible: encuestas[], journey steps[], etc.
  images: [{
    url: { type: String },
    alt: { type: String },
    caption: { type: String }
  }],
  metrics: { type: mongoose.Schema.Types.Mixed },  // Para gráficos: { satisfaction: 8.5, nps: 70 }
  isPublished: { type: Boolean, default: false }  // Para preview antes de publicar
}, {
  timestamps: true  // createdAt, updatedAt automáticos
});


=======
const mongoose = require('mongoose');

const uxSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
    unique: true,
  },
  title: { type: String, required: true },  // Título visible, ej. "1. Research"
  description: { type: String },  // Texto introductorio
  content: {
    type: String,
    default: ''
  }, // Contenido principal Markdown/HTML
  data: { type: mongoose.Schema.Types.Mixed },  // JSON flexible: encuestas[], journey steps[], etc.
  images: [{
    url: { type: String },
    alt: { type: String },
    caption: { type: String }
  }],
  metrics: { type: mongoose.Schema.Types.Mixed },  // Para gráficos: { satisfaction: 8.5, nps: 70 }
  isPublished: { type: Boolean, default: false }  // Para preview antes de publicar
}, {
  timestamps: true  // createdAt, updatedAt automáticos
});


>>>>>>> a02ea68a0dd3b4b0007f6d0d68dafcd8ce3d88cc
module.exports = mongoose.model('UxSection', uxSectionSchema);