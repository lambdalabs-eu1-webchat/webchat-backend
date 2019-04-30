const { models } = require('../models/index');

const documentExists = async (filterObj, modelResource) => {
  try {
    const [document] = await models[modelResource].where(filterObj);
    if (document) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = documentExists;
