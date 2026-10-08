/**
 * Fuzz Cafés - Predefinições de Doses Rápidas
 * 
 * Atalhos rápidos de volume de água em ml para facilitar o preparo do dia a dia.
 */

const FUZZ_PRESETS = [
  { label: "1 Xícara", waterMl: 150, icon: "coffee" },
  { label: "1 Caneca", waterMl: 250, icon: "mug" },
  { label: "2 Xícaras", waterMl: 300, icon: "users" },
  { label: "Garrafa (500ml)", waterMl: 500, icon: "thermometer" },
  { label: "Garrafa Grande (750ml)", waterMl: 750, icon: "flasks" }
];

// Suporte para ambiente de navegador e Node.js
if (typeof window !== "undefined") {
  window.FUZZ_PRESETS = FUZZ_PRESETS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = FUZZ_PRESETS;
}
