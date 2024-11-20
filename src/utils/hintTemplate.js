const hintObj = [
  {
    hintNumber: 1,
    isLocked: true,
    description: 'Crack the Surface',
    tooltip: 'A gentle nudge to help you get started.',
    aiResponse: 'A gentle nudge ', // TODO: change in production
  },
  {
    hintNumber: 2,
    isLocked: true,
    description: 'Find the Pattern',
    tooltip: 'A suggestion to focus on key concepts or techniques.',
    aiResponse: 'A suggestion to focus on key concepts or techniques.',
  },
  {
    hintNumber: 3,
    isLocked: true,
    description: 'Trace the Path',
    tooltip: 'A detailed walkthrough of the thought process or a dry run.',
    aiResponse: 'A detailed walkthrough of the thought process or a dry run.',
  },
  {
    hintNumber: 4,
    isLocked: true,
    description: 'Unveil the Solution',
    tooltip:
      "The complete solution for when you're ready to compare your approach.",
    aiResponse:
      "The complete solution for when you're ready to compare your approach.",
  },
];

function hintTemplate(quesName, lastUpdated, hints = hintObj) {
  return {
    [quesName]: { quesName, lastUpdated, hints },
  };
}
export default hintTemplate;
