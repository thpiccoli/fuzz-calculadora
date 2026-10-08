/**
 * Fuzz Cafés - Script de Validação e Integridade de Dados
 * 
 * Executa verificações automáticas no catálogo de cafés, métodos e presets:
 * - Unicidade de IDs
 * - Campos obrigatórios preenchidos
 * - Existência física dos arquivos de imagem no disco
 * - Consistência de métodos recomendados e passos do timer
 * 
 * Uso: node test_data.js
 */

const fs = require('fs');
const path = require('path');

// Carregar módulos de dados
const coffees = require('./js/data/coffees.js');
const methods = require('./js/data/methods.js');
const presets = require('./js/data/presets.js');

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

let errorsCount = 0;
let warningsCount = 0;

function logPass(msg) {
  console.log(`  ${colors.green}✓${colors.reset} ${msg}`);
}

function logError(msg) {
  errorsCount++;
  console.log(`  ${colors.red}✗ ERRO:${colors.reset} ${msg}`);
}

function logWarn(msg) {
  warningsCount++;
  console.log(`  ${colors.yellow}⚠ AVISO:${colors.reset} ${msg}`);
}

console.log(`\n${colors.bold}${colors.cyan}════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bold}   ☕ VALIDADOR DE CATÁLOGO & RECEITAS - FUZZ CAFÉS${colors.reset}`);
console.log(`${colors.cyan}════════════════════════════════════════════════════════════${colors.reset}\n`);

// 1. Validação de Métodos de Preparo
console.log(`${colors.bold}1. Verificando Métodos de Preparo (${methods.length} cadastrados)...${colors.reset}`);
const methodIds = new Set();

methods.forEach((method, idx) => {
  const prefix = `Método #${idx + 1} (${method.id || 'sem id'}):`;

  if (!method.id) {
    logError(`${prefix} O campo 'id' é obrigatório.`);
  } else if (methodIds.has(method.id)) {
    logError(`${prefix} ID duplicado '${method.id}'. Cada método deve ter ID único.`);
  } else {
    methodIds.add(method.id);
  }

  if (!method.name) logError(`${prefix} Nome ausente.`);
  if (!method.type) logError(`${prefix} Tipo ausente.`);
  if (!method.shortDesc) logError(`${prefix} Descrição curta (shortDesc) ausente.`);

  if (!method.defaultRatio || typeof method.defaultRatio !== 'number') {
    logError(`${prefix} defaultRatio deve ser um número positivo.`);
  }

  if (!method.grind || !method.grind.name) {
    logError(`${prefix} Informações de moagem (grind) incompletas.`);
  }

  // Verifica passos do timer
  if (!Array.isArray(method.steps) || method.steps.length === 0) {
    logError(`${prefix} Deve possuir pelo menos 1 passo em 'steps'.`);
  } else {
    method.steps.forEach((step, sIdx) => {
      if (!step.title) logError(`${prefix} Passo ${sIdx + 1} sem título.`);
      if (typeof step.duration !== 'number') logError(`${prefix} Passo ${sIdx + 1} sem duration numérica.`);
    });
  }

  // Verifica ícone oficial PNG
  const methodImgPath = path.join(__dirname, 'assets', 'methods', `${method.id}.png`);
  if (!fs.existsSync(methodImgPath)) {
    logWarn(`${prefix} Imagem oficial não encontrada em assets/methods/${method.id}.png`);
  }
});

if (errorsCount === 0) {
  logPass(`Todos os ${methods.length} métodos estão com estrutura válida.`);
}

// 2. Validação de Cafés
console.log(`\n${colors.bold}2. Verificando Catálogo de Cafés (${coffees.length} cadastrados)...${colors.reset}`);
const coffeeIds = new Set();
const currentErrorsBeforeCoffees = errorsCount;

coffees.forEach((coffee, idx) => {
  const prefix = `Café #${idx + 1} [${coffee.name || coffee.id || 'sem nome'}]:`;

  if (!coffee.id) {
    logError(`${prefix} O campo 'id' é obrigatório.`);
  } else if (coffeeIds.has(coffee.id)) {
    logError(`${prefix} ID duplicado '${coffee.id}'. Cada café deve ter ID único.`);
  } else {
    coffeeIds.add(coffee.id);
  }

  if (!coffee.name) logError(`${prefix} Nome do café ausente.`);
  if (!['classicos', 'microlotes'].includes(coffee.category)) {
    logError(`${prefix} Categoria '${coffee.category}' inválida. Use 'classicos' ou 'microlotes'.`);
  }
  if (!coffee.roast) logError(`${prefix} Torra ausente.`);
  if (!coffee.origin) logError(`${prefix} Origem ausente.`);
  if (!Array.isArray(coffee.notes) || coffee.notes.length === 0) {
    logError(`${prefix} O café deve ter ao menos 1 nota sensorial em 'notes'.`);
  }

  // Sensorial
  if (!coffee.sensory || typeof coffee.sensory.sweetness !== 'number') {
    logError(`${prefix} Atributos sensoriais (sweetness, acidity, body) inválidos.`);
  }

  // Proporção recomendada
  if (!coffee.recommendedRatio || typeof coffee.recommendedRatio !== 'number') {
    logError(`${prefix} Proporção recomendada inválida (deve ser número, ex: 15).`);
  }

  // Métodos recomendados válidos
  if (Array.isArray(coffee.recommendedMethods)) {
    coffee.recommendedMethods.forEach(mId => {
      if (!methodIds.has(mId)) {
        logError(`${prefix} Recomenda o método '${mId}', mas ele não existe na lista de métodos.`);
      }
    });
  } else {
    logError(`${prefix} 'recommendedMethods' deve ser um array com os IDs dos métodos.`);
  }

  // Existência da imagem
  if (!coffee.image) {
    logError(`${prefix} Caminho de imagem (image) ausente.`);
  } else {
    const fullImgPath = path.join(__dirname, coffee.image);
    if (!fs.existsSync(fullImgPath)) {
      logError(`${prefix} Imagem não encontrada no disco: '${coffee.image}'. Verifique a pasta assets/coffees/.`);
    }
  }

  // Link da loja
  if (!coffee.shopUrl || !coffee.shopUrl.startsWith("http")) {
    logWarn(`${prefix} Link de compra (shopUrl) ausente ou inválido.`);
  }
});

if (errorsCount === currentErrorsBeforeCoffees) {
  logPass(`Todos os ${coffees.length} cafés estão consistentes e com fotos existentes.`);
}

// 3. Validação de Presets
console.log(`\n${colors.bold}3. Verificando Presets de Doses Rápidas (${presets.length} cadastrados)...${colors.reset}`);
presets.forEach((p, idx) => {
  if (!p.label || typeof p.waterMl !== 'number' || p.waterMl <= 0) {
    logError(`Preset #${idx + 1} inválido: necessita de label e waterMl > 0.`);
  }
});
logPass(`${presets.length} presets verificados com sucesso.`);

// Resumo Final
console.log(`\n${colors.cyan}════════════════════════════════════════════════════════════${colors.reset}`);
if (errorsCount === 0) {
  console.log(`${colors.green}${colors.bold}🎉 SUCESSO ABSOLUTO! O catálogo de dados está 100% íntegro.${colors.reset}`);
  if (warningsCount > 0) {
    console.log(`${colors.yellow}   (${warningsCount} aviso(s) leve(s) para revisar)${colors.reset}`);
  }
  console.log(`${colors.cyan}════════════════════════════════════════════════════════════${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}${colors.bold}❌ FORAM ENCONTRADOS ${errorsCount} ERRO(S) DE INTEGRIDADE.${colors.reset}`);
  console.log(`   Por favor, corrija os itens listados acima e rode novamente: node test_data.js`);
  console.log(`${colors.cyan}════════════════════════════════════════════════════════════${colors.reset}\n`);
  process.exit(1);
}
