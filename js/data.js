/**
 * Fuzz Cafés - Dados de Cafés, Métodos de Preparo e Proporções
 */

const FUZZ_DATA = {
  // Cafés do catálogo Fuzz Cafés
  coffees: [
    {
      id: "caramelo",
      name: "Café Caramelo",
      subtitle: "Clássico",
      category: "classicos",
      roast: "Média",
      species: "100% Arábica",
      origin: "Mantiqueira de Minas / Alta Mogiana",
      notes: ["Caramelo", "Chocolate ao leite", "Baunilha"],
      sensory: { sweetness: 5, acidity: 2, body: 4 },
      description: "Doçura acentuada e notas confortáveis de caramelo e chocolate ao leite. O café perfeito para o dia a dia, com finalização limpa e aveludada.",
      recommendedRatio: 15, // 1:15
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
  ],

  // Métodos de preparo
  methods: [
    {
      id: "v60",
      name: "Hario V60",
      type: "Filtro Cônico",
      shortDesc: "Clareza, acidez brilhante e notas florais destacadas.",
      icon: "coffee",
      defaultRatio: 15, // 1:15 (ex: 20g café para 300ml água)
      minRatio: 12,
      maxRatio: 18,
      grind: {
        name: "Média-Fina",
        description: "Semelhante a sal marinho ou açúcar cristal fino",
        level: 3 // 1 = muito fina, 5 = muito grossa
      },
      temp: "92°C a 94°C",
      totalTime: "2m45s a 3m15s",
      steps: [
        { time: 0, title: "Escaldar e Aquecer", desc: "Escalde o filtro de papel com água quente para retirar o gosto residual e pré-aquecer o suporte. Descarte essa água.", duration: 0 },
        { time: 0, title: "Adicionar o Pó", desc: "Coloque o café moído no filtro, dê leves batidinhas na lateral para nivelar a cama de café e tare a balança.", duration: 0 },
        { time: 0, title: "Pré-infusão (Bloom)", desc: "Despeje cerca de 2 a 3x o peso do pó em água (em círculos suaves). Deixe o café florar e liberar os gases por 40 segundos.", duration: 40, bloom: true },
        { time: 40, title: "1º Despejo Contínuo", desc: "Despeje a água em círculos suaves do centro para fora (sem tocar nas bordas) até atingir cerca de 60% da água total.", duration: 40 },
        { time: 80, title: "2º Despejo Final", desc: "Complete lentamente com o restante da água até o volume total. Dê um leve movimento circular suave.", duration: 30 },
        { time: 110, title: "Drenagem e Servir", desc: "Aguarde toda a água filtrar pela cama de pó. Homogeneize a jarra e sirva!", duration: 45 }
      ]
    },
    {
      id: "french-press",
      name: "Prensa Francesa",
      type: "Imersão Total",
      shortDesc: "Corpo denso, textura aveludada e óleos naturais preservados.",
      icon: "filter",
      defaultRatio: 14, // 1:14 (ex: 21g para 300ml)
      minRatio: 11,
      maxRatio: 16,
      grind: {
        name: "Grossa",
        description: "Semelhante a sal grosso ou pimenta moída rústica",
        level: 5
      },
      temp: "90°C a 93°C",
      totalTime: "4m00s",
      steps: [
        { time: 0, title: "Escaldar a Prensa", desc: "Passe água quente na prensa francesa para aquecer o vidro. Descarte a água.", duration: 0 },
        { time: 0, title: "Colocar o Pó", desc: "Adicione o café moído grosso no fundo da prensa e coloque sobre a balança tarada.", duration: 0 },
        { time: 0, title: "Despejo Total de Água", desc: "Despeje toda a água quente vigorosamente, garantindo que todo o pó fique molhado.", duration: 30 },
        { time: 30, title: "Infusão Estática", desc: "Coloque o êmbolo por cima apenas para segurar o calor, sem baixar. Aguarde 3 minutos e 30 segundos de infusão.", duration: 210 },
        { time: 240, title: "Quebrar a Crosta e Pressionar", desc: "Com uma colher, quebre a crosta superficial, retire a espuma se desejar, e baixe o êmbolo de forma suave e contínua.", duration: 20 },
        { time: 260, title: "Servir Imediatamente", desc: "Sirva todo o café nas xícaras para não continuar super-extraindo na prensa.", duration: 0 }
      ]
    },
    {
      id: "aeropress",
      name: "AeroPress",
      type: "Imersão + Pressão",
      shortDesc: "Versatilidade incrível, acidez equilibrada e extração limpa.",
      icon: "zap",
      defaultRatio: 13, // 1:13 (ex: 15g para 200ml)
      minRatio: 10,
      maxRatio: 16,
      grind: {
        name: "Média a Média-Fina",
        description: "Pouco mais fino que o filtro tradicional de papel",
        level: 2.5
      },
      temp: "85°C a 90°C",
      totalTime: "2m00s",
      steps: [
        { time: 0, title: "Preparar o Filtro", desc: "Posicione o filtro de papel na tampa e lave com água quente.", duration: 0 },
        { time: 0, title: "Método Invertido ou Tradicional", desc: "Coloque o café moído no tubo da Aeropress e tare a balança.", duration: 0 },
        { time: 0, title: "Despejo e Mistura", desc: "Despeje toda a água quente em 15 segundos e mexa com a espátula por 15 segundos.", duration: 30 },
        { time: 30, title: "Infusão", desc: "Encaixe a tampa e aguarde a infusão completar 1 minuto.", duration: 60 },
        { time: 90, title: "Pressionar o Êmbolo", desc: "Vire sobre a caneca/jarra e pressione o êmbolo suavemente durante 30 segundos até ouvir o som de ar ('hiss').", duration: 30 }
      ]
    },
    {
      id: "moka",
      name: "Cafeteira Italiana",
      type: "Pressão de Vapor",
      shortDesc: "Café encorpado, forte e marcante, lembrando um espresso.",
      icon: "flame",
      defaultRatio: 10, // 1:10 (ex: 18g para 180ml)
      minRatio: 8,
      maxRatio: 12,
      grind: {
        name: "Fina a Média-Fina",
        description: "Mais fina que filtro de papel, sem ser pó talco",
        level: 2
      },
      temp: "Água já quente na base",
      totalTime: "3m00s a 4m00s",
      steps: [
        { time: 0, title: "Água Quente na Base", desc: "Adicione água já pré-aquecida na caldeira até a altura logo abaixo da válvula de segurança.", duration: 0 },
        { time: 0, title: "Encher o Funil", desc: "Preencha o funil com café moído até o topo, nivelando sem compactar nem pressionar com força.", duration: 0 },
        { time: 0, title: "Fogo Baixo", desc: "Rosqueie a parte de cima com cuidado usando um pano e leve ao fogo baixo com a tampa aberta.", duration: 0 },
        { time: 0, title: "Extração Contínua", desc: "Assim que o café começar a subir em fio cor de avelã contínuo, baixe o fogo. Ao começar a borbulhar ar, retire imediatamente e resfrie a base na torneira.", duration: 180 }
      ]
    },
    {
      id: "melitta",
      name: "Filtro Tradicional",
      type: "Filtro Trapezoidal",
      shortDesc: "O clássico do dia a dia brasileiro: equilibrado e acolhedor.",
      icon: "droplet",
      defaultRatio: 15, // 1:15
      minRatio: 12,
      maxRatio: 17,
      grind: {
        name: "Média",
        description: "Textura de areia de praia",
        level: 3
      },
      temp: "92°C a 94°C",
      totalTime: "3m30s",
      steps: [
        { time: 0, title: "Dobrar e Escaldar", desc: "Dobre as bordas frisadas do filtro, encaixe no suporte e escalde com água fervente.", duration: 0 },
        { time: 0, title: "Adicionar o Pó", desc: "Coloque o café moído médio, espalhe uniformemente e zere a balança.", duration: 0 },
        { time: 0, title: "Pré-infusão", desc: "Molhe todo o pó com cerca de 50ml a 80ml de água e aguarde 40 segundos.", duration: 40, bloom: true },
        { time: 40, title: "Despejos Contínuos", desc: "Verta a água com calma em movimentos circulares, mantendo um nível constante no filtro.", duration: 90 },
        { time: 130, title: "Drenagem Final", desc: "Deixe o café terminar de filtrar até a última gota e aprecie.", duration: 50 }
      ]
    },
    {
      id: "clever",
      name: "Clever Dripper",
      type: "Imersão com Filtro",
      shortDesc: "A textura da prensa com a pureza e limpeza do filtro de papel.",
      icon: "cup-soda",
      defaultRatio: 15,
      minRatio: 13,
      maxRatio: 17,
      grind: {
        name: "Média",
        description: "Semelhante a sal grosso moderado",
        level: 3.5
      },
      temp: "92°C",
      totalTime: "3m30s",
      steps: [
        { time: 0, title: "Escaldar com a Válvula Aberta", desc: "Coloque o filtro, escalde sobre uma jarra e descarte a água.", duration: 0 },
        { time: 0, title: "Água Primeiro ou Café", desc: "Coloque o café moído e despeje toda a água com a Clever sobre uma superfície plana (válvula fechada).", duration: 30 },
        { time: 30, title: "Infusão Total", desc: "Dê uma mexida rápida na superfície com colher e tampe. Aguarde 2 minutos e 30 segundos.", duration: 150 },
        { time: 180, title: "Liberação do Café", desc: "Posicione a Clever sobre a jarra para destravar a válvula e liberar a extração limpa.", duration: 45 }
      ]
    },
    {
      id: "chemex",
      name: "Chemex",
      type: "Filtro Especial Espesso",
      shortDesc: "Bebida ultra límpida, com destaque para notas delicadas e florais.",
      icon: "flask-conical",
      defaultRatio: 16,
      minRatio: 14,
      maxRatio: 18,
      grind: {
        name: "Média-Grossa",
        description: "Moagem mais graúda para compensar o filtro espesso",
        level: 4
      },
      temp: "93°C a 95°C",
      totalTime: "4m00s",
      steps: [
        { time: 0, title: "Posicionar Filtro", desc: "Coloque o filtro dobrado com as 3 camadas voltadas para o bico e escalde com bastante água quente.", duration: 0 },
        { time: 0, title: "Pó e Bloom", desc: "Adicione o café, zere a balança e faça a pré-infusão com o dobro do peso de pó por 45 segundos.", duration: 45, bloom: true },
        { time: 45, title: "Despejos em Espiral", desc: "Despeje a água em círculos sem encostar nas laterais do cone até alcançar a medida.", duration: 120 },
        { time: 165, title: "Escoamento Final", desc: "Aguarde a finalização do fluxo e descarte o filtro.", duration: 60 }
      ]
    },
    {
      id: "cold-brew",
      name: "Cold Brew",
      type: "Infusão Longa a Frio",
      shortDesc: "Bebida suave, naturalmente doce e com baixíssima acidez.",
      icon: "snowflake",
      defaultRatio: 10, // 1:10 para concentrado ou 1:12 pronto
      minRatio: 8,
      maxRatio: 12,
      grind: {
        name: "Muito Grossa",
        description: "Pedaços rústicos de grão para evitar excesso de finos",
        level: 5
      },
      temp: "Água fria / Temperatura ambiente",
      totalTime: "12h a 18h",
      steps: [
        { time: 0, title: "Mistura Inicial", desc: "Misture o café moído muito grosso com água fresca filtrada em um recipiente ou jarra de infusão.", duration: 0 },
        { time: 0, title: "Homogeneização", desc: "Misture bem com uma colher para garantir que todo o pó absorva a água fria.", duration: 0 },
        { time: 0, title: "Geladeira por 14 a 18 horas", desc: "Tampe e leve à geladeira por 14 a 18 horas de extração lenta e suave.", duration: 0 },
        { time: 0, title: "Filtragem e Serviço", desc: "Filtre com filtro de papel ou pano fino. Sirva com pedras de gelo, água tônica ou leite!", duration: 0 }
      ]
    },
    {
      id: "espresso",
      name: "Espresso",
      type: "Alta Pressão (9 bar)",
      shortDesc: "Concentrado, encorpado, com crema dourada aveludada.",
      icon: "gauge",
      defaultRatio: 2, // 1:2 (ex: 18g para 36g de bebida)
      minRatio: 1.5,
      maxRatio: 3,
      grind: {
        name: "Muito Fina",
        description: "Textura quase como farinha de trigo fina",
        level: 1
      },
      temp: "92°C a 94°C",
      totalTime: "25s a 30s",
      steps: [
        { time: 0, title: "Distribuição e Compactação", desc: "Distribua o pó uniformemente no porta-filtro e aperte com o tamper reto a 15-20kg de pressão.", duration: 0 },
        { time: 0, title: "Purgar o Grupo", desc: "Purge água quente pelo grupo da máquina por 2 segundos antes de travar o porta-filtro.", duration: 0 },
        { time: 0, title: "Extração sob Pressão", desc: "Ligue a bomba e cronometre: a bebida deve cair em fio de mel, extraindo o dobro do peso em 25 a 30 segundos.", duration: 30 }
      ]
    }
  ],

  // Predefinições de porções comuns
  presets: [
    { label: "1 Xícara", waterMl: 150, icon: "coffee" },
    { label: "1 Caneca", waterMl: 250, icon: "mug" },
    { label: "2 Xícaras", waterMl: 300, icon: "users" },
    { label: "Garrafa (500ml)", waterMl: 500, icon: "thermometer" },
    { label: "Garrafa Grande (750ml)", waterMl: 750, icon: "flasks" }
  ]
};
