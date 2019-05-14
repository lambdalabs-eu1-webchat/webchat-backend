// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate');

async function translate(textToTranslate, targetLanguage) {
  try {
    const projectId = process.env.PROJECT_ID; // Project Id from JSON file
    // Instantiates a client
    const translate = new Translate({ projectId });

    // Detects the language. "textToTranslate" can be an array of strings for detecting the languages
    // of multiple texts.
    let [detections] = await translate.detect(textToTranslate);
    detections = Array.isArray(detections) ? detections : [detections];

    const translatedTextPromise = detections.map(async detection => {
      const { input, confidence, language } = detection;

      const translateOptions = {
        to: targetLanguage.code,
        model: 'nmt', // specify Neural Machine Translation (NMT) model
      };

      // take every detected language from "textToTranslate" and translate it to english
      const [translation] = await translate.translate(input, translateOptions);
      return {
        translation,
        input,
        confidence,
        inputLang: language,
        translationLang: translateOptions.to,
      };
    });
    const translatedText = await Promise.all(translatedTextPromise);

    return translatedText;
  } catch (error) {
    console.error(error);
  }
}

async function getLanguages() {
  try {
    const projectId = process.env.PROJECT_ID; // Project Id from JSON file
    // Instantiates a client
    const translate = new Translate({ projectId });

    // Lists available translation language with their names in English (the default).
    let [languages] = await translate.getLanguages();

    return languages;
  } catch (error) {
    console.error(error);
  }
}

async function translateToEnglish(textToTranslate) {
  try {
    const projectId = process.env.PROJECT_ID;
    const translate = new Translate({ projectId });

    // Detects the language. "textToTranslate" can be an array of strings for detecting the languages
    // of multiple texts.
    let [detections] = await translate.detect(textToTranslate);
    detections = Array.isArray(detections) ? detections : [detections];

    const translatedTextPromise = detections.map(async detection => {
      const { input, confidence, language } = detection;

      const translateOptions = {
        to: 'en',
        model: 'nmt', // specify Neural Machine Translation (NMT) model
      };

      // take every detected language from "textToTranslate" and translate it to english
      const [translation] = await translate.translate(input, translateOptions);
      return {
        translation,
        input,
        confidence,
        inputLang: language,
        translationLang: translateOptions.to,
      };
    });
    const translatedText = await Promise.all(translatedTextPromise);

    return translatedText;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { translate, getLanguages, translateToEnglish };
