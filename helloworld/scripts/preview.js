document.addEventListener('DOMContentLoaded', async () => {
  // Обработчик для спойлеров
  document.querySelectorAll('.spoiler details').forEach((details) => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        details.style.animation = 'fadeIn 0.5s';
      }
    });
  });

  // Инициализация Mermaid.js
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false });

    document.querySelectorAll('.mermaid').forEach(async (codeBlock, index) => {
      const graphDefinition = codeBlock.textContent.trim();
      const graphContainer = document.createElement('div');
      graphContainer.classList.add('mermaid');
      
      try {
        const { svg } = await mermaid.render(`graph-${index}`, graphDefinition);
        graphContainer.innerHTML = svg;
        codeBlock.replaceWith(graphContainer);
      } catch (error) {
        console.error("Ошибка рендеринга Mermaid:", error);
      }
    });
  }
});
