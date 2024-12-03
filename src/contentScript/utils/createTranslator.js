export default async function (language) {
  try {
    const translatorSession = await ai.translator.create({
      sourceLanguage: 'en',
      targetLanguage: language,
    });
    return { translatorSession };
  } catch (error) {
    console.log('Failed to create translator session:', error);
    return { response: null };
  }
}
