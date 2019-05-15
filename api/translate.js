const { Translate } = require('@google-cloud/translate');
const axios = require('axios');

const GOOGLE_DOMAIN =
  'https://translation.googleapis.com/language/translate/v2';

async function translateToEnglish(textToTranslate) {
  try {
    const translate = await axios.post(
      `${GOOGLE_DOMAIN}?target=en&key=${
        process.env.TRANSLATE_API
      }&q=${textToTranslate}`
    );

    console.log(translate);

    return translate;
  } catch (error) {
    console.error(error);
  }
}

async function translateFromEnglish(textToTranslate, targetLanguage) {
  try {
    const projectId = process.env.PROJECT_ID;
    const translate = new Translate({ projectId });

    const translateOptions = {
      to: targetLanguage,
      model: 'nmt', // specify Neural Machine Translation (NMT) model
    };

    const [translation] = await translate.translate(
      textToTranslate,
      translateOptions
    );

    return translation;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  translateToEnglish,
  translateFromEnglish,
};
