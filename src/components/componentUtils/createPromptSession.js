const createPromptSession = async ({ systemPrompt }) => {
  const capabilities = await ai.languageModel.capabilities();

  if (capabilities.available === 'no') {
    return '';
  }

  const session = await ai.languageModel.create({ systemPrompt });
  return session;
};

export default createPromptSession;
