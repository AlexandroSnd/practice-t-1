setTimeout(() => {
  const detailsElements = document.querySelectorAll('.spoiler details');
  detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        details.style.animation = 'fadeIn 1s';
      }
    });
  });
}, 1000);
