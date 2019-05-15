const { Translate } = require('@google-cloud/translate');
const axios = require('axios');

const GOOGLE_TRANSLATE_DOMAIN =
  'https://translation.googleapis.com/language/translate/v2';

async function translateToEnglish(textToTranslate) {
  try {
    const encodedArr = [];
    // take a string or array of strings to translate
    textToTranslate.forEach(text => {
      // encode text characters with UTF-8 encoding of the character
      let encodedText = encodeURIComponent(text);
      encodedArr.push(`&q=${encodedText}`);
    });
    // create single encoded query string
    const encodedQueryString = encodedArr.join('');

    /**
     * Query string takes:
     * @target = REQUIRED = target language
     * @key = REQUIRED = valid API key
     * @q = REQUIRED = text to translate. Repeat this parameter to translate multiple text inputs.
     * @model = OPTIONAL = translation model; nmt =  Neural Machine Translation
     */
    const translate = await axios.post(
      `${GOOGLE_TRANSLATE_DOMAIN}?target=en&model=nmt&key=${
        process.env.TRANSLATE_API
      }${encodedQueryString}`
    );
    return translate.data.data.translations;
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
