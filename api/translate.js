// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate');

async function quickstart(
  projectId = process.env.PROJECT_ID // Your GCP Project Id
) {
  try {
    // Instantiates a client
    const translate = new Translate({ projectId });

    // The text to translate
    const text = 'Hello, world!';

    // The target language
    const target = 'sk';

    // Translates some text into Slovak
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  } catch (error) {
    console.error(error);
  }
}

quickstart();
