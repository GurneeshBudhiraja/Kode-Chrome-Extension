const createSession = async (paramObject = {}) => {
  const capabilities = await ai.languageModel.capabilities();

  if (capabilities.available === 'no') {
    return { session: null };
  }

  const session = await ai.languageModel.create(paramObject);
  return { session };
};

export default createSession;
