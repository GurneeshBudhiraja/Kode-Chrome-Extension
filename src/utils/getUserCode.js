function getUserCode() {
  const nodes = document.querySelectorAll('.view-line');
  if (!nodes.length) return null;
  return extractCode(nodes);
}

function extractCode(nodes) {
  const fullCode = Array.from(nodes)
    .map((codeLine) => codeLine.textContent || '')
    .join('\n');

  return fullCode;
}

export default getUserCode;
