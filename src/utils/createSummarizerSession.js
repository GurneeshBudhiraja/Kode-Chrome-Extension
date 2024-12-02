const createSummarizerSession = async ({ type, format, length }) => {
  const canSummarize = await ai.summarizer.capabilities();
  let summarizer;
  if (canSummarize && canSummarize.available !== 'no') {
    if (canSummarize.available === 'readily') {
      // The summarizer can immediately be used.
      summarizer = await ai.summarizer.create({ type, format, length });
      return summarizer;
    } else {
      // The summarizer can be used after the model download.
      summarizer = await ai.summarizer.create();
      summarizer.addEventListener('downloadprogress', (e) => {
        console.log(e.loaded, e.total);
      });
      await summarizer.ready;
      summarizer = await ai.summarizer.create({ type, format, length });
      return summarizer;
    }
  } else {
    console.log('NOT SUPPORTED');
    return '';
  }
};

export default createSummarizerSession;
