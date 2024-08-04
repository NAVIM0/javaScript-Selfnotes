(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  const body = document.querySelector('body');
  if (body) body.addEventListener('click', () => header.style.color = 'blue');
  console.error("Element not found");
})();
//# sourceMappingURL=codingChallenge#2.js.map