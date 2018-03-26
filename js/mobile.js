planFontSize = 100;
planWidth = 375;
screenWidth = window.screen.width;
htmlFontSize = planFontSize * screenWidth / planWidth;
html = document.querySelector('html');
html.style.fontSize = `${htmlFontSize}px`;
