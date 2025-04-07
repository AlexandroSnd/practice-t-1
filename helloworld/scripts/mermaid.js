setTimeout(() => {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default'
    });
  }
}, 1000);
