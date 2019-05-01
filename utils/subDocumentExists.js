const errorMessage = require('../utils/errorMessage');

const subDocumentExists = async (parentDocument, modelSubResource, subDocumentId) => {
  try {
    const subDocument = await parentDocument[modelSubResource].id(subDocumentId);
    if (subDocument) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = subDocumentExists;
