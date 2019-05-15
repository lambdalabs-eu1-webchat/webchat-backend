const { Translate } = require('@google-cloud/translate');

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
