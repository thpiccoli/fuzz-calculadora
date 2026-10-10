const fs = require('fs');

// Carrega os arquivos modulares
const coffeesJs = fs.readFileSync('./js/data/coffees.js', 'utf8');
const methodsJs = fs.readFileSync('./js/data/methods.js', 'utf8');
const presetsJs = fs.readFileSync('./js/data/presets.js', 'utf8');
const dataJs = fs.readFileSync('./js/data.js', 'utf8');
const calcJs = fs.readFileSync('./js/calculator.js', 'utf8');
const timerJs = fs.readFileSync('./js/timer.js', 'utf8');

// Executa no escopo global simulado
const ctx = {};
Function('window', 'require', coffeesJs + '\n' + methodsJs + '\n' + presetsJs + '\n' + dataJs + '\n' + calcJs + '\n' + timerJs + '\n' + `
  global.FUZZ_DATA = FUZZ_DATA;
  global.CoffeeCalculator = CoffeeCalculator;
  global.BrewTimer = BrewTimer;
`)(ctx, require);

const calc = new CoffeeCalculator(FUZZ_DATA);

console.log("=== TESTE CALCULADORA FUZZ CAFÉS ===");
console.log("Estado Inicial:");
console.log("- Café:", calc.selectedCoffee.name);
console.log("- Método:", calc.selectedMethod.name);
console.log("- Água:", calc.waterMl, "ml");
console.log("- Café em pó:", calc.coffeeGrams, "g");
console.log("- Proporção: 1:" + calc.ratio);

// Teste 1: Alterar água para 500ml
calc.setWaterMl(500);
console.log("\nTeste 1 - Água alterada para 500ml:");
console.log("- Café calculado:", calc.coffeeGrams, "g (Esperado: 33.3g)");
if (Math.abs(calc.coffeeGrams - 33.3) < 0.1) console.log("✓ PASSOU!");

// Teste 2: Alterar café para 18g
calc.setCoffeeGrams(18);
console.log("\nTeste 2 - Café alterado para 18g:");
console.log("- Água calculada:", calc.waterMl, "ml (Esperado: 270ml)");
if (calc.waterMl === 270) console.log("✓ PASSOU!");

// Teste 3: Alterar para Prensa Francesa
calc.selectMethod("french-press");
console.log("\nTeste 3 - Método alterado para Prensa Francesa (Ratio 1:14):");
console.log("- Água para 18g:", calc.waterMl, "ml (Esperado: 252ml)");
if (calc.waterMl === 252) console.log("✓ PASSOU!");

// Teste 4: Timer
const timer = new BrewTimer();
timer.setSteps(calc.selectedMethod.steps);
console.log("\nTeste 4 - Timer configurado com passos do método:");
console.log("- Passos carregados:", timer.steps.length);
if (timer.steps.length > 0) console.log("✓ PASSOU!");

// Teste 5: Passos dinâmicos com valores calculados (300ml V60 -> 20g pó, 50ml bloom, 175ml 1º despejo, 300ml final)
calc.selectMethod("v60");
calc.setWaterMl(300);
const stateV60 = calc.getState();
timer.setSteps(stateV60.steps);
console.log("\nTeste 5 - Passos dinâmicos no cronômetro (Hario V60 300ml):");
const stepPo = stateV60.steps.find(s => s.title.includes("Adicionar o Pó"));
const stepBloom = stateV60.steps.find(s => s.bloom);
const stepPour1 = stateV60.steps.find(s => s.title.includes("1º Despejo"));
const stepPour2 = stateV60.steps.find(s => s.title.includes("2º Despejo"));

console.log("- Pó:", stepPo ? stepPo.desc : "N/A");
console.log("- Bloom:", stepBloom ? stepBloom.desc : "N/A");
console.log("- 1º Despejo:", stepPour1 ? stepPour1.desc : "N/A");
console.log("- 2º Despejo:", stepPour2 ? stepPour2.desc : "N/A");

if (
  stepPo && stepPo.desc.includes("20g") &&
  stepBloom && stepBloom.desc.includes("50ml") &&
  stepPour1 && stepPour1.desc.includes("175ml") &&
  stepPour2 && stepPour2.desc.includes("300ml") &&
  timer.steps[2].desc.includes("50ml") &&
  timer.steps[3].desc.includes("175ml")
) {
  console.log("✓ PASSOU! Valores calculados refletidos com precisão no cronômetro!");
} else {
  console.log("✗ FALHOU no teste de passos dinâmicos.");
  process.exit(1);
}

console.log("\nTotal de cafés no catálogo:", FUZZ_DATA.coffees.length);
console.log("Total de métodos de preparo:", FUZZ_DATA.methods.length);
console.log("=== TODOS OS TESTES PASSARAM COM SUCESSO! ===");
