// main.js

// Загружаем Mermaid.js через CDN
const mermaidScript = document.createElement('script');
mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'; // Ссылка на актуальную версию
mermaidScript.onload = () => {
  mermaid.initialize({ startOnLoad: false }); // Инициализация Mermaid, чтобы не запускать сразу

  // Функция для рендеринга всех Mermaid диаграмм на странице
  const renderMermaid = async () => {
    // Ищем все элементы с классом 'mermaid' и рендерим их
    const mermaidElements = document.querySelectorAll('.mermaid');
    mermaidElements.forEach(async (element) => {
      const graphDefinition = element.textContent.trim();

      try {
        // Рендерим граф с помощью Mermaid
        const { svg } = await mermaid.render(element.id, graphDefinition);
        element.innerHTML = svg; // Заменяем содержимое элемента на SVG
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    });
  };

  // Вызов функции для рендеринга диаграмм Mermaid
  renderMermaid();
};

// Добавляем Mermaid.js в head страницы
document.head.appendChild(mermaidScript);
