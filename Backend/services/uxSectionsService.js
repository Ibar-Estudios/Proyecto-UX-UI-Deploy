<<<<<<< HEAD
const UxSection = require('../models/UxSection');

class UxSectionsService {
  static async getAll() {
    return await UxSection.find({ isPublished: true });
  }

  static async getByName(sectionName) {
    return await UxSection.findOne({ 
      sectionName, 
      isPublished: true 
    });
  }

  static async create(sectionData) {
    const section = new UxSection(sectionData);
    return await section.save();
  }

  static async update(sectionName, updateData) {
    return await UxSection.findOneAndUpdate(
      { sectionName, isPublished: true },
      updateData,
      { new: true }
    );
  }

  static async delete(sectionName) {
    return await UxSection.findOneAndDelete({ 
      sectionName, 
      isPublished: true 
    });
  }
}

=======
const UxSection = require('../models/UxSection');

class UxSectionsService {
  static async getAll() {
    return await UxSection.find({ isPublished: true });
  }

  static async getByName(sectionName) {
    return await UxSection.findOne({ 
      sectionName, 
      isPublished: true 
    });
  }

  static async create(sectionData) {
    const section = new UxSection(sectionData);
    return await section.save();
  }

  static async update(sectionName, updateData) {
    return await UxSection.findOneAndUpdate(
      { sectionName, isPublished: true },
      updateData,
      { new: true }
    );
  }

  static async delete(sectionName) {
    return await UxSection.findOneAndDelete({ 
      sectionName, 
      isPublished: true 
    });
  }
}

>>>>>>> a02ea68a0dd3b4b0007f6d0d68dafcd8ce3d88cc
module.exports = UxSectionsService;