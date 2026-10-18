const assert = require("assert");
const coffees = require("./js/data/coffees.js");

console.log("--- TESTANDO RENDIMENTO DO PACOTE & CUSTO POR XÍCARA ---");

// Valida que todos os cafés têm preço e peso do pacote
coffees.forEach(c => {
  assert.ok(typeof c.price === "number" && c.price > 0, `Café ${c.name} deve ter preço numérico positivo`);
  assert.strictEqual(c.packageWeight, 250, `Café ${c.name} deve ter pacote de 250g`);
});

// Simula preparo de 20g de Café Caramelo (R$ 46,00)
const caramelo = coffees.find(c => c.id === "caramelo");
const grams = 20;
const expectedCups = Math.floor(caramelo.packageWeight / grams); // 250 / 20 = 12
const expectedCost = ((caramelo.price / caramelo.packageWeight) * grams).toFixed(2); // (46 / 250) * 20 = 3.68

assert.strictEqual(expectedCups, 12, "Deveria render 12 xícaras de 20g");
assert.strictEqual(expectedCost, "3.68", "Deveria custar R$ 3,68 por dose");

// Simula preparo de 15g de Café Melancia (Microlote R$ 58,00)
const melancia = coffees.find(c => c.id === "melancia");
const melanciaCups = Math.floor(melancia.packageWeight / 15); // 250 / 15 = 16
const melanciaCost = ((melancia.price / melancia.packageWeight) * 15).toFixed(2); // (58 / 250) * 15 = 3.48

assert.strictEqual(melanciaCups, 16, "Deveria render 16 xícaras de 15g");
assert.strictEqual(melanciaCost, "3.48", "Deveria custar R$ 3,48 por dose");

console.log("✓ Todos os testes de Rendimento & Economia passaram com sucesso!");
