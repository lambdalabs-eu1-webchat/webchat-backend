const axios = require('axios');

const GOOGLE_TRANSLATE_DOMAIN =
  'https://translation.googleapis.com/language/translate/v2';

async function translateToEnglish(textToTranslate) {
  try {
    Array.isArray(textToTranslate) ? textToTranslate : [textToTranslate];
    // take an array of strings to translate
    const encodedArr = textToTranslate.map(text => {
      // encode text characters with UTF-8 encoding of the character
      let encodedText = encodeURIComponent(text);
      return `&q=${encodedText}`;
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
    // encode text characters with UTF-8 encoding of the character
    let encodedQueryString = encodeURIComponent(textToTranslate);
    const targetLang = targetLanguage ? targetLanguage : 'en';

    /**
     * Query string takes:
     * @target = REQUIRED = target language
     * @key = REQUIRED = valid API key
     * @q = REQUIRED = text to translate.
     * @model = OPTIONAL = translation model; nmt =  Neural Machine Translation
     */
    const translate = await axios.post(
      `${GOOGLE_TRANSLATE_DOMAIN}?target=${targetLang}&model=nmt&key=${
        process.env.TRANSLATE_API
      }&q=${encodedQueryString}`
    );
    return translate.data.data.translations[0].translatedText;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  translateToEnglish,
  translateFromEnglish,
};
