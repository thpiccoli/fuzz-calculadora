# ☕ Fuzz Cafés - Calculadora de Preparo de Café

Uma landing page interativa, elegante e ultrarrápida construída especialmente para a torrefação artesanal **Fuzz Cafés** ([fuzzcafes.com.br](https://www.fuzzcafes.com.br/)). 

A aplicação calcula a proporção perfeita (*brew ratio*) entre água e café moído para diferentes métodos de preparo e microlotes exclusivos da Fuzz, com cronômetro interativo passo a passo e alertas sonoros.

---

## 📚 Manuais e Documentação Rápida

- 📋 **[Manual de Gerenciamento de Cafés e Receitas](docs/GUIA_CAFES_E_RECEITAS.md)**: Como cadastrar novos cafés, mudar fotos, links da loja, métodos de preparo e passos do timer.
- 🏗️ **[Arquitetura e Guia Técnico](docs/ARQUITETURA_E_DESENVOLVIMENTO.md)**: Detalhamento do funcionamento do código, reatividade da calculadora, Web Audio API e fluxo de dados.
- 🛒 **[Instruções de Integração com o Menu da Tray](INTEGRACAO_MENU.md)**: Como adicionar a calculadora no cabeçalho da loja virtual da Fuzz.

---

## 🚀 Funcionalidades

- **Identidade Visual Fiel à Fuzz Cafés**:
  - Paleta com preto profundo, toques quentes de caramelo/torra (`#ff7e00`), tipografia limpa, ilustrações artísticas dos métodos e o mascote Nico.
  - Barra de navegação oficial integrada e rodapé institucional do Rio de Janeiro.
- **Cálculo Bidirecional de Proporção**:
  - *Quero X ml de bebida* $\rightarrow$ calcula as gramas exatas de pó.
  - *Tenho X gramas de café* $\rightarrow$ calcula os ml de água necessários.
  - Botões de incremento rápido (+50ml/-50ml, +1g/-1g).
  - Doses pré-definidas (1 Xícara de 150ml, Caneca de 250ml, 2 Xícaras de 300ml, Garrafa de 500ml, Prensa de 750ml).
  - Controle de intensidade (Mais Suave 1:17, Equilibrado 1:15, Mais Encorpado 1:13, ou slider livre).
- **Catálogo Oficial com Notas Sensoriais**:
  - Filtro entre *Todos*, *Clássicos* (*Caramelo*, *Chocolate*, *Frutado*, *Amendoado*) e *Microlotes* (*Cocada Robusta Amazônico*, *Doce de Leite Conilon*, *Abacaxi 2026*, *Melancia*).
  - Notas de sabor, régua de doçura/acidez e proporção recomendada pelo mestre de torra.
  - Botão com link direto para comprar na loja virtual oficial da Fuzz.
- **9 Métodos de Extração**:
  - Hario V60, Prensa Francesa, AeroPress, Cafeteira Italiana (Moka), Filtro Melitta, Clever Dripper, Chemex, Cold Brew e Espresso.
  - Indicação de moagem (com granulometria ilustrada), temperatura da água e tempo total estimado.
- **Guia Passo a Passo & Cronômetro Interativo (Brew Timer)**:
  - Instruções dinâmicas calculadas para a dose escolhida (com cálculo automático da água de pré-infusão / Bloom).
  - Cronômetro modal com contagem regressiva e alertas sonoros suaves em cada troca de etapa (Web Audio API nativo, sem dependências).
- **Modo Japanese Iced Coffee**:
  - Extração coada diretamente sobre o gelo com divisão automática de 40% gelo na jarra e 60% água quente no filtro para selar aromas e resfriamento imediato.
- **Diário de Extração (Brew Log) com Diagnóstico do Nico**:
  - Pós-preparo com avaliação de sabor (Ácido/Ralo 🍋, Equilibrado ✨, Amargo/Seco 😖), diagnóstico técnico imediato do Mascote Nico, estrelas e notas do moedor.
  - Histórico salvo no dispositivo com botão de **1 toque "⚡ Repetir esta Receita"**.
- **Calculadora de Rendimento e Economia por Xícara**:
  - Mostra o rendimento real do pacote de 250g da Fuzz (~12 a 16 xícaras) e o custo estimado por dose (~R$ 3,40 a R$ 3,80).
- **Gerador de Card para Instagram Stories (9:16)**:
  - Cria cards verticais em Canvas 1080x1920 para download em PNG ou compartilhamento nativo.
- **Modo Bancada Tela Cheia & Gestos Touch**:
  - Expansão do timer em tela cheia com números gigantes legíveis a mais de 1 metro na bancada e suporte a gestos de swipe (deslizar) para trocar etapas no smartphone.
- **PWA & Funcionamento Offline (Service Worker v2)**:
  - Banner para adicionar à tela inicial do celular e navegação rápida 100% offline.

---

## 📁 Estrutura de Arquivos

```
fuzz/
├── index.html                     # Interface principal da calculadora
├── manifest.json                  # Manifesto PWA para instalação no celular
├── sw.js                          # Service Worker para funcionamento offline
├── package.json                   # Scripts de teste e metadados
├── test_data.js                   # Validador automático do catálogo e imagens
├── test_calc.js                   # Testes unitários dos cálculos e proporções
├── test_diary.js                  # Testes unitários do diário de extração
├── test_yield_economy.js          # Testes unitários de rendimento e custo por xícara
├── INTEGRACAO_MENU.md            # Guia de integração na loja Tray
├── README.md                      # Esta documentação
│
├── docs/                          # Manuais detalhados
│   ├── GUIA_CAFES_E_RECEITAS.md   # Passo a passo para cadastrar cafés e receitas
│   └── ARQUITETURA_E_DESENVOLVIMENTO.md # Guia técnico de desenvolvimento
│
├── js/
│   ├── data/                      # Dados desacoplados para fácil manutenção
│   │   ├── coffees.js            # Cafés, notas sensoriais, preços e fotos
│   │   ├── methods.js            # Métodos, moagens e passos do timer
│   │   └── presets.js            # Doses rápidas pré-configuradas
│   ├── data.js                   # Centralizador global dos dados
│   ├── calculator.js             # Lógica matemática e reatividade (Ratio)
│   ├── timer.js                  # Cronômetro com Web Audio API e vibração
│   ├── diary.js                  # Diário de cafés e diagnósticos do Nico
│   ├── method-icons.js           # Ícones ilustrados dos métodos
│   └── app.js                    # Controlador visual da interface
│
├── css/
│   └── styles.css                # Estilos visuais e design system responsivo
│
└── assets/
    ├── logo-fuzz.png             # Logo oficial
    ├── coffees/                  # Fotos dos pacotes de café
    ├── mascot/                   # Ilustrações do Nico
    └── methods/                  # Ilustrações dos métodos de preparo
```

---

## 💻 Como Rodar e Testar

### 1. Abrir no Navegador
Por ser construído em Vanilla JS sem dependências compiladas, basta usar um servidor local:

```bash
# Com Python:
python -m http.server 3000

# Ou com Node.js:
npm start
```

### 2. Suíte Completa de Testes
```bash
npm test
```
