/**
 * Fuzz Cafés - Centralizador de Dados
 * 
 * Agrupa os módulos individuais de dados para fácil manutenção:
 * - Cafés: js/data/coffees.js
 * - Métodos & Receitas: js/data/methods.js
 * - Doses Rápidas: js/data/presets.js
 */

let coffeesData = typeof FUZZ_COFFEES !== "undefined" ? FUZZ_COFFEES : [];
let methodsData = typeof FUZZ_METHODS !== "undefined" ? FUZZ_METHODS : [];
let presetsData = typeof FUZZ_PRESETS !== "undefined" ? FUZZ_PRESETS : [];

// Suporte para Node.js (execução de testes e scripts de validação)
if (typeof require !== "undefined") {
  try {
    if (!coffeesData.length) coffeesData = require("./data/coffees.js");
    if (!methodsData.length) methodsData = require("./data/methods.js");
    if (!presetsData.length) presetsData = require("./data/presets.js");
  } catch (err) {
    // Variáveis já disponíveis no contexto
  }
}

const FUZZ_DATA = {
  coffees: coffeesData,
  methods: methodsData,
  presets: presetsData
};

// Exposição global no navegador
if (typeof window !== "undefined") {
  window.FUZZ_DATA = FUZZ_DATA;
}

// Exposição no Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = FUZZ_DATA;
}
