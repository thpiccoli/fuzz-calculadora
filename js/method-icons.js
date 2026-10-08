/**
 * Fuzz Cafés - Mapeamento de Ilustrações dos Métodos de Preparo
 * 
 * Vincula cada método à sua ilustração oficial (estilo cartoon/pop-art)
 * localizada na pasta assets/methods/.
 */

const METHOD_ICONS = {
  v60: `<img src="assets/methods/v60.png" alt="Hario V60" class="method-img" loading="lazy" />`,
  "french-press": `<img src="assets/methods/french-press.png" alt="Prensa Francesa" class="method-img" loading="lazy" />`,
  aeropress: `<img src="assets/methods/aeropress.png" alt="AeroPress" class="method-img" loading="lazy" />`,
  moka: `<img src="assets/methods/moka.png" alt="Cafeteira Italiana" class="method-img" loading="lazy" />`,
  melitta: `<img src="assets/methods/melitta.png" alt="Filtro Tradicional" class="method-img" loading="lazy" />`,
  clever: `<img src="assets/methods/clever.png" alt="Clever Dripper" class="method-img" loading="lazy" />`,
  chemex: `<img src="assets/methods/chemex.png" alt="Chemex" class="method-img" loading="lazy" />`,
  "cold-brew": `<img src="assets/methods/cold-brew.png" alt="Cold Brew" class="method-img" loading="lazy" />`,
  espresso: `<img src="assets/methods/espresso.png" alt="Espresso" class="method-img" loading="lazy" />`
};

/**
 * Retorna a tag <img> correspondente ao método
 * @param {string} methodId Identificador do método
 * @param {string} altLabel Texto descritivo opcional
 */
function getMethodIconHtml(methodId, altLabel = "") {
  return METHOD_ICONS[methodId] || `<img src="assets/methods/${methodId}.png" alt="${altLabel || methodId}" class="method-img" loading="lazy" />`;
}

// Suporte para ambiente de navegador e Node.js
if (typeof window !== "undefined") {
  window.METHOD_ICONS = METHOD_ICONS;
  window.getMethodIconHtml = getMethodIconHtml;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { METHOD_ICONS, getMethodIconHtml };
}
