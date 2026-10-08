/**
 * Fuzz Cafés - Catálogo Oficial de Cafés
 * 
 * GUIA RÁPIDO PARA ADICIONAR UM NOVO CAFÉ:
 * 1. Copie o bloco de modelo (TEMPLATE) no final deste arquivo.
 * 2. Cole dentro da lista FUZZ_COFFEES abaixo.
 * 3. Coloque a foto do pacote em: assets/coffees/nome-do-cafe.jpg
 * 4. Valide rodando no terminal: node test_data.js
 */

const FUZZ_COFFEES = [
  {
    id: "caramelo",
    name: "Café Caramelo",
    subtitle: "Clássico",
    category: "classicos", // "classicos" ou "microlotes"
    roast: "Média",
    species: "100% Arábica",
    origin: "Mantiqueira de Minas / Alta Mogiana",
    notes: ["Caramelo", "Chocolate ao leite", "Baunilha"],
    sensory: { sweetness: 5, acidity: 2, body: 4 }, // Escala de 1 a 5
    description: "Doçura acentuada e notas confortáveis de caramelo e chocolate ao leite. O café perfeito para o dia a dia, com finalização limpa e aveludada.",
    recommendedRatio: 15, // Proporção sugerida 1:15 (ex: 20g café para 300ml água)
    recommendedMethods: ["v60", "melitta", "moka", "french-press"],
    accentColor: "#d97706",
    badge: "Mais Vendido",
    islandRegion: "Caverna de Caramelo",
    image: "assets/coffees/caramelo.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/caramelo-classico"
  },
  {
    id: "chocolate",
    name: "Café Chocolate",
    subtitle: "Clássico",
    category: "classicos",
    roast: "Média-Escura",
    species: "100% Arábica",
    origin: "Cerrado Mineiro",
    notes: ["Cacau 70%", "Trufa", "Açúcar mascavo"],
    sensory: { sweetness: 3, acidity: 1, body: 5 },
    description: "Perfil encorpado e intenso, com notas profundas de cacau e trufa. Excelente puro e perfeito para bebidas com leite.",
    recommendedRatio: 14, // 1:14
    recommendedMethods: ["moka", "french-press", "espresso", "aeropress"],
    accentColor: "#78350f",
    badge: "Intenso",
    islandRegion: "Cascata de Chocolate",
    image: "assets/coffees/chocolate.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/chocolate-classico"
  },
  {
    id: "frutado",
    name: "Café Frutado",
    subtitle: "Clássico",
    category: "classicos",
    roast: "Média-Clara",
    species: "100% Arábica",
    origin: "Caparaó / Matas de Minas",
    notes: ["Frutas amarelas", "Pêssego", "Flor de laranjeira"],
    sensory: { sweetness: 4, acidity: 5, body: 3 },
    description: "Acidez cítrica vibrante e brilhante, corpo delicado e perfume floral marcante. Uma experiência refrescante e complexa.",
    recommendedRatio: 16, // 1:16
    recommendedMethods: ["v60", "chemex", "aeropress", "clever"],
    accentColor: "#ea580c",
    badge: "Floral & Cítrico",
    islandRegion: "Pomar Gigante",
    image: "assets/coffees/frutado.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/frutado-classico"
  },
  {
    id: "amendoado",
    name: "Café Amendoado",
    subtitle: "Clássico",
    category: "classicos",
    roast: "Média",
    species: "100% Arábica",
    origin: "Sul de Minas",
    notes: ["Avelã", "Castanha de caju", "Melaço"],
    sensory: { sweetness: 4, acidity: 2, body: 4 },
    description: "Equilíbrio absoluto com notas ricas de castanhas tostadas, avelã e finalização longa. Altamente versátil em qualquer método.",
    recommendedRatio: 15, // 1:15
    recommendedMethods: ["melitta", "v60", "french-press", "clever"],
    accentColor: "#92400e",
    badge: "Equilibrado",
    islandRegion: "Alpes de Amêndoas",
    image: "assets/coffees/amendoado.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/amendoado-classico"
  },
  {
    id: "cocada",
    name: "Café Cocada",
    subtitle: "Microlote Robusta Amazônico",
    category: "microlotes",
    roast: "Média",
    species: "Canéfora (Robusta Amazônico)",
    origin: "Rondônia / Amazônia",
    notes: ["Coco tostado", "Melaço de cana", "Especiarias doces"],
    sensory: { sweetness: 5, acidity: 1, body: 5 },
    description: "Microlote exótico e premiado de Robusta Amazônico de cultivo agroecológico. Crema densa, corpo sedoso e doçura impressionante de cocada.",
    recommendedRatio: 14, // 1:14
    recommendedMethods: ["aeropress", "moka", "french-press", "v60"],
    accentColor: "#b45309",
    badge: "Raro & Exótico",
    islandRegion: "Pico Amazônico",
    image: "assets/coffees/cocada.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/cocada-microlote"
  },
  {
    id: "doce-de-leite",
    name: "Café Doce de Leite",
    subtitle: "Microlote Conilon Especial",
    category: "microlotes",
    roast: "Média",
    species: "Conilon Especial",
    origin: "Espírito Santo",
    notes: ["Doce de leite", "Caramelo tostado", "Cremosidade"],
    sensory: { sweetness: 5, acidity: 2, body: 4 },
    description: "Processamento fermentado cuidadoso que ressalta notas amendoadas cremosas lembrando doce de leite artesanal em tacho de cobre.",
    recommendedRatio: 15, // 1:15
    recommendedMethods: ["v60", "aeropress", "melitta", "cold-brew"],
    accentColor: "#ca8a04",
    badge: "Edição Especial",
    islandRegion: "Bosque dos Conilons",
    image: "assets/coffees/docedeleite.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/docedeleite-microlote"
  },
  {
    id: "abacaxi-2026",
    name: "Café Abacaxi 2026",
    subtitle: "Microlote Arábica Fermentado",
    category: "microlotes",
    roast: "Média-Clara",
    species: "100% Arábica Fermentado",
    origin: "Mantiqueira de Minas",
    notes: ["Abacaxi maduro", "Acidez málica", "Frutas tropicais"],
    sensory: { sweetness: 4, acidity: 5, body: 3 },
    description: "Fermentação induzida revelando notas tropicais explosivas de abacaxi maduro com acidez brilhante e retrogosto prolongado.",
    recommendedRatio: 16, // 1:16
    recommendedMethods: ["v60", "chemex", "aeropress", "cold-brew"],
    accentColor: "#eab308",
    badge: "Safra 2026",
    islandRegion: "Pomar Tropical",
    image: "assets/coffees/abacaxi.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/abacaxi2026-microlote"
  },
  {
    id: "melancia",
    name: "Café Melancia",
    subtitle: "Microlote Arábica Especial",
    category: "microlotes",
    roast: "Clara",
    species: "100% Arábica",
    origin: "Caparaó",
    notes: ["Melancia fresca", "Floral sutil", "Framboesa"],
    sensory: { sweetness: 4, acidity: 4, body: 2 },
    description: "Perfil sensorial ultra elegante, fresco e translúcido. Notas refrescantes de melancia e flores brancas.",
    recommendedRatio: 16, // 1:16
    recommendedMethods: ["v60", "chemex", "aeropress"],
    accentColor: "#f43f5e",
    badge: "Microtorra Rara",
    islandRegion: "Oásis Refrescante",
    image: "assets/coffees/melancia.jpg",
    shopUrl: "https://www.fuzzcafes.com.br/cafesespeciais/melancia2026-microlote"
  }
];

/*
=== MODELO PARA COPIAR E COLAR (TEMPLATE) ===
{
  id: "novo-cafe",                           // Identificador único (letras minúsculas e hífen)
  name: "Café Exemplo",                      // Nome exibido
  subtitle: "Microlote",                     // "Clássico" ou "Microlote"
  category: "microlotes",                    // "classicos" ou "microlotes"
  roast: "Média",                            // Clara, Média-Clara, Média, Média-Escura ou Escura
  species: "100% Arábica",                   // Espécie / Variedade
  origin: "Região Produtora",                // Origem do lote
  notes: ["Nota 1", "Nota 2", "Nota 3"],     // Até 3 notas sensoriais principais
  sensory: { sweetness: 4, acidity: 3, body: 4 }, // Escala de 1 a 5
  description: "Descrição rápida e convidativa do perfil deste café.",
  recommendedRatio: 15,                      // 15 = 1:15 (proporção sugerida)
  recommendedMethods: ["v60", "aeropress"],  // IDs dos métodos ideais
  accentColor: "#ff7e00",                    // Cor temática (laranja, âmbar, etc.)
  badge: "Novidade",                         // Selo no card (opcional)
  islandRegion: "Região da Ilha",            // Região lúdica do mapa da Fuzz
  image: "assets/coffees/novo-cafe.jpg",      // Foto na pasta assets/coffees
  shopUrl: "https://www.fuzzcafes.com.br/"   // Link do produto na loja
}
*/

// Suporte para ambiente de navegador e Node.js
if (typeof window !== "undefined") {
  window.FUZZ_COFFEES = FUZZ_COFFEES;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = FUZZ_COFFEES;
}
