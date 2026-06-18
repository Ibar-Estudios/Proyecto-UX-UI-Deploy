const UxSectionsService = require('../services/uxSectionsService');

const getAllSections = async (req, res) => {
  try {
    const sections = await UxSectionsService.getAll();
    res.json({ 
      success: true, 
      count: sections.length, 
      data: sections 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const getSectionByName = async (req, res) => {
  try {
    const section = await UxSectionsService.getByName(req.params.sectionName);
    if (!section) {
      return res.status(404).json({ 
        success: false, 
        message: 'Sección no encontrada' 
      });
    }
    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const createSection = async (req, res) => {
  try {
    const section = await UxSectionsService.create({
      ...req.body,
      isPublished: true
    });
    res.status(201).json({ success: true, data: section });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};
// const updateSection = async (req, res) => {
//   try {
//     const section = await UxSectionsService.update(
//       req.params.sectionName, 
//       req.body
//     );
    
//     if (!section) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Sección no encontrada' 
//       });
//     }
    
//     res.json({ success: true, data: section });
//   } catch (error) {
//     res.status(400).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

module.exports = {
  getAllSections,
  getSectionByName,
  createSection,
//   updateSection, 
//   deleteSection...
};