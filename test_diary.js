const assert = require("assert");
const { BrewDiary, NICO_TASTE_DIAGNOSTICS } = require("./js/diary.js");

console.log("--- TESTANDO BREW DIARY ---");

// Mock de localStorage
let mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = val; },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { mockStorage = {}; }
};

const diary = new BrewDiary();
assert.strictEqual(diary.getCount(), 0, "Diário deve iniciar vazio");

// Adiciona uma entrada equilibrada
const entry1 = diary.addEntry({
  coffeeId: "caramelo",
  coffeeName: "Café Caramelo",
  methodId: "v60",
  methodName: "Hario V60",
  isIced: false,
  coffeeGrams: 20,
  waterMl: 300,
  ratio: 15,
  intensity: "Equilibrado",
  taste: "balanced",
  rating: 5,
  grindName: "Média-Fina",
  notes: "14 cliques no Timemore C3"
});

assert.strictEqual(diary.getCount(), 1, "Diário deve ter 1 entrada");
assert.strictEqual(entry1.taste, "balanced");
assert.strictEqual(entry1.rating, 5);
assert.strictEqual(entry1.coffeeName, "Café Caramelo");

// Adiciona uma entrada amarga
const entry2 = diary.addEntry({
  coffeeId: "chocolate",
  coffeeName: "Café Chocolate",
  methodId: "chemex",
  methodName: "Chemex",
  isIced: true,
  coffeeGrams: 30,
  waterMl: 450,
  hotWaterMl: 270,
  iceGrams: 180,
  ratio: 15,
  intensity: "Equilibrado",
  taste: "bitter",
  rating: 3,
  notes: "Ficou muito seco na boca"
});

assert.strictEqual(diary.getCount(), 2, "Diário deve ter 2 entradas");
assert.strictEqual(diary.getEntries()[0].id, entry2.id, "Mais recente deve vir primeiro");
assert.strictEqual(diary.getEntries()[0].isIced, true);
assert.ok(diary.getEntries()[0].nicoTip.includes("engrosse 1 ou 2 cliques"));

// Teste de exclusão
diary.deleteEntry(entry1.id);
assert.strictEqual(diary.getCount(), 1, "Após exclusão deve restar 1");
assert.strictEqual(diary.getEntries()[0].id, entry2.id);

// Teste de limpeza total
diary.clearAll();
assert.strictEqual(diary.getCount(), 0, "Após clearAll deve estar vazio");

console.log("✓ Todos os 7 testes do Diário de Extração passaram com sucesso!");
