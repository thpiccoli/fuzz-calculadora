# ☕ Guia de Gerenciamento: Cafés, Métodos e Receitas

Este guia foi elaborado para qualquer pessoa da equipe da **Fuzz Cafés** (baristas, marketing, e-commerce ou desenvolvedores) consiga adicionar novos cafés, alterar métodos de preparo e atualizar receitas de forma simples, rápida e segura.

---

## 🗂 Onde os Dados Ficam Armazenados?

Para facilitar a manutenção, os dados estão organizados em três arquivos dedicados dentro da pasta `js/data/`:

| Arquivo | Para que serve? | Quem costuma editar? |
| :--- | :--- | :--- |
| **`js/data/coffees.js`** | Catálogo oficial de cafés (clássicos e microlotes), fotos, notas sensoriais e links da loja. | Marketing / E-commerce / Barista |
| **`js/data/methods.js`** | Métodos de preparo (V60, Prensa, AeroPress, etc.), moagens e passos do cronômetro. | Barista / Mestre de Torra |
| **`js/data/presets.js`** | Doses rápidas pré-configuradas (1 Xícara de 150ml, Caneca de 250ml, Garrafa 500ml, etc.). | Equipe técnica / Barista |

> [!TIP]
> Não é necessário conhecimento avançado de programação para editar esses arquivos. Eles contêm modelos prontos comentados para copiar e colar.

---

## 🟢 Como Adicionar um Novo Café

### Passo 1: Salvar a Foto do Pacote
1. Salve a imagem do pacote na pasta:
   ```
   assets/coffees/nome-do-cafe.jpg
   ```
2. **Recomendações para a imagem**:
   - Formato: `.jpg` ou `.png`.
   - Proporção: Retangular vertical ou quadrada (ex: 800x1000px ou 800x800px).
   - Fundo: Transparente ou neutro escuro com boa iluminação no rótulo.

### Passo 2: Adicionar os Dados do Café
Abra o arquivo [`js/data/coffees.js`](file:///c:/Users/Thiago%20Piccoli/OneDrive/Imagens/fuzz/js/data/coffees.js). Copie e cole o bloco de modelo abaixo no final da lista `FUZZ_COFFEES`:

```javascript
{
  id: "nome-do-cafe",                           // Identificador único (letras minúsculas e hífen)
  name: "Café Nome Exemplo",                    // Nome exibido na vitrine
  subtitle: "Microlote Especial",               // "Clássico" ou "Microlote"
  category: "microlotes",                       // "classicos" ou "microlotes"
  roast: "Média",                               // Torra: Clara, Média-Clara, Média, Média-Escura
  species: "100% Arábica",                      // Ex: 100% Arábica, Canéfora, etc.
  origin: "Mantiqueira de Minas",               // Região produtora
  notes: ["Caramelo", "Frutas Cítricas"],       // Até 3 notas sensoriais principais
  sensory: { sweetness: 5, acidity: 3, body: 4 }, // Escala de 1 a 5 (doçura, acidez, corpo)
  description: "Descrição acolhedora com os principais destaques sensoriais deste café.",
  recommendedRatio: 15,                         // 15 significa proporção 1:15 (20g de café para 300ml de água)
  recommendedMethods: ["v60", "aeropress"],     // IDs dos métodos ideais (veja lista abaixo)
  accentColor: "#eab308",                       // Cor de destaque (hexadecimal)
  badge: "Lançamento",                          // Selinho no card (ex: "Mais Vendido", "Safra 2026")
  islandRegion: "Colina Dourada",               // Região lúdica do mapa Fuzz ("Ilha dos Sabores")
  image: "assets/coffees/nome-do-cafe.jpg",     // Caminho da imagem salva no Passo 1
  shopUrl: "https://www.fuzzcafes.com.br/link"  // Link direto para comprar na loja oficial
},
```

---

## 🟡 Como Editar um Café Existente

Para alterar o link da loja, ajustar uma nota sensorial ou trocar o selo de um café:
1. Abra [`js/data/coffees.js`](file:///c:/Users/Thiago%20Piccoli/OneDrive/Imagens/fuzz/js/data/coffees.js).
2. Localize o café pelo seu `id` (ex: `caramelo`, `abacaxi-2026`).
3. Modifique apenas o campo desejado (por exemplo, atualizar o `shopUrl` ou `badge: "Esgotado"`).
4. Salve o arquivo.

---

## ⚙️ Como Gerenciar Métodos de Preparo e Receitas

Abra o arquivo [`js/data/methods.js`](file:///c:/Users/Thiago%20Piccoli/OneDrive/Imagens/fuzz/js/data/methods.js). Cada método possui a seguinte estrutura:

### 1. Parâmetros Gerais do Método
```javascript
{
  id: "v60",                           // ID único do método
  name: "Hario V60",                   // Nome visível
  type: "Filtro Cônico",               // Tipo de extração
  shortDesc: "Clareza e acidez...",    // Resumo para o card
  defaultRatio: 15,                    // Proporção padrão (1:15)
  minRatio: 12,                        // Proporção mais forte permitida no slider
  maxRatio: 18,                        // Proporção mais suave permitida no slider
  grind: {
    name: "Média-Fina",                // Descritor da moagem
    description: "Semelhante a sal...",// Dica prática de granulometria
    level: 3                           // Nível gráfico (1 = muito fina, 5 = grossa)
  },
  temp: "92°C a 94°C",                 // Temperatura ideal da água
  totalTime: "2m45s a 3m15s",          // Tempo total estimado
  steps: [ ... ]                       // Etapas do cronômetro
}
```

### 2. Passos do Cronômetro Interativo (`steps`)
Cada passo tem:
- `title`: Nome do passo (ex: `"Pré-infusão (Bloom)"`).
- `desc`: Orientação ao usuário de como despejar a água ou aguardar.
- `duration`: Tempo de duração desta etapa **em segundos** (o cronômetro faz a contagem regressiva deste valor).
- `bloom: true` *(opcional)*: Se incluído, a calculadora calcula automaticamente o volume exato da água do bloom (2.5x o peso do pó).

---

## 🛡️ Validação Automática com 1 Comando

Após adicionar ou alterar qualquer café ou receita, você pode testar a integridade dos dados automaticamente.

No terminal, execute:

```bash
node test_data.js
```

*(Ou usando npm: `npm.cmd test`)*

### O que o validador verifica?
- ✅ Se todos os cafés e métodos têm IDs únicos.
- ✅ Se a imagem apontada em cada café realmente existe na pasta `assets/coffees/`.
- ✅ Se os métodos recomendados em cada café existem de verdade.
- ✅ Se as notas, avaliações sensoriais (1 a 5) e passos do timer estão corretos.

Se houver qualquer erro de digitação, o validador mostrará exatamente qual linha e qual campo precisa ser corrigido antes de publicar!
