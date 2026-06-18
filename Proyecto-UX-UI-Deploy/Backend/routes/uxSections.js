<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const UxSection = require('../models/UxSection');
const { 
  getAllSections, 
  getSectionByName, 
  createSection 
} = require('../controllers/uxSectionsController');

router.get('/', getAllSections);
router.get('/:sectionName', getSectionByName);
router.post('/', createSection);
router.put('/:sectionName', async (req, res) => {
  try {
    console.log('PUT:', req.params.sectionName);
    const section = await UxSection.findOneAndUpdate(
      { sectionName: req.params.sectionName, isPublished: true },
      { $set: req.body },
      { new: true }
    );
    if (!section) return res.status(404).json({ success: false, message: 'No encontrada' });
    res.json({ success: true, data: section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:sectionName', async (req, res) => {
  try {
    const section = await UxSection.findOneAndDelete({
      sectionName: req.params.sectionName,
      isPublished: true
    });
    
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'No encontrada' 
      });
    }
    
    res.json({ 
      success: true, 
      message: `🗑️ ${req.params.sectionName} eliminada`,
      deleted: section.sectionName 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});
=======
const express = require('express');
const router = express.Router();
const UxSection = require('../models/UxSection');
const { 
  getAllSections, 
  getSectionByName, 
  createSection 
} = require('../controllers/uxSectionsController');

router.get('/', getAllSections);
router.get('/:sectionName', getSectionByName);
router.post('/', createSection);
router.put('/:sectionName', async (req, res) => {
  try {
    console.log('PUT:', req.params.sectionName);
    const section = await UxSection.findOneAndUpdate(
      { sectionName: req.params.sectionName, isPublished: true },
      { $set: req.body },
      { new: true }
    );
    if (!section) return res.status(404).json({ success: false, message: 'No encontrada' });
    res.json({ success: true, data: section });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:sectionName', async (req, res) => {
  try {
    const section = await UxSection.findOneAndDelete({
      sectionName: req.params.sectionName,
      isPublished: true
    });
    
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'No encontrada' 
      });
    }
    
    res.json({ 
      success: true, 
      message: `🗑️ ${req.params.sectionName} eliminada`,
      deleted: section.sectionName 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});
>>>>>>> a02ea68a0dd3b4b0007f6d0d68dafcd8ce3d88cc
module.exports = router;