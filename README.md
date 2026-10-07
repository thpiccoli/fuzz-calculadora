# ☕ Fuzz Cafés - Calculadora de Preparo de Café

Uma landing page interativa e elegante construída especialmente para a torrefação artesanal **Fuzz Cafés** ([fuzzcafes.com.br](https://www.fuzzcafes.com.br/)). 

A aplicação calcula a proporção perfeita (brew ratio) entre água e café moído para diferentes métodos de preparo e microlotes exclusivos da Fuzz, com cronômetro interativo passo a passo.

---

## 🚀 Funcionalidades

- **Identidade Visual Fiel à Fuzz Cafés**:
  - Paleta com preto profundo, toques quentes de caramelo/torra (`#ff7e00`), tipografia limpa e logo oficial.
  - Barra de menu com os links oficiais e o novo item em destaque: **Calculadora de Preparo**.
  - Rodapé com dados de contato da torrefação no Rio de Janeiro.

- **Cálculo Bidirecional de Proporção**:
  - *Quero X ml de bebida* $\rightarrow$ calcula as gramas exatas de pó.
  - *Tenho X gramas de café* $\rightarrow$ calcula os ml de água necessários.
  - Botões de incremento rápido (+50ml/-50ml, +1g/-1g).
  - Doses pré-definidas (1 Xícara de 150ml, Caneca de 250ml, 2 Xícaras de 300ml, Garrafa de 500ml, Prensa de 750ml).
  - Controle de intensidade (Mais Suave 1:17, Equilibrado 1:15, Mais Encorpado 1:13, ou slider livre).

- **Catálogo de Cafés Fuzz com Notas Sensoriais**:
  - Filtro entre *Todos*, *Clássicos* (*Caramelo*, *Chocolate*, *Frutado*, *Amendoado*) e *Microlotes* (*Cocada Robusta Amazônico*, *Doce de Leite Conilon*, *Abacaxi 2026*, *Melancia*).
  - Indicação de notas de sabor, nível de doçura/acidez e proporção recomendada pelo mestre de torra.
  - Link direto para compra na loja da Fuzz.

- **9 Métodos de Extração**:
  - Hario V60, Prensa Francesa, AeroPress, Cafeteira Italiana (Moka), Filtro Melitta, Clever Dripper, Chemex, Cold Brew e Espresso.
  - Orientação de moagem (com granulometria indicada), temperatura da água e tempo total.

- **Guia Passo a Passo & Cronômetro Interativo (Brew Timer)**:
  - Instruções com volumes de água dinâmicos calculados para a dose escolhida (incluindo cálculo automático de água do Bloom / pré-infusão).
  - Cronômetro modal com alertas sonoros sutis em cada transição de etapa (Web Audio API nativo).

- **Compartilhamento**:
  - Botão de cópia da receita formatada com 1 clique para WhatsApp ou bloco de notas.

---

## 📁 Estrutura de Arquivos

```
fuzz/
├── index.html               # Página web principal
├── css/
│   └── styles.css          # Estilos e design system Fuzz Cafés
├── js/
│   ├── data.js             # Cafés Fuzz, métodos, proporções e passos
│   ├── calculator.js       # Lógica matemática e estado reativo
│   ├── timer.js            # Cronômetro de preparo com Web Audio API
│   └── app.js              # Controlador principal da interface e eventos
├── assets/
│   └── logo-fuzz.png       # Logo oficial da Fuzz Cafés
├── INTEGRACAO_MENU.md      # Instruções de integração no menu da Tray
└── README.md               # Esta documentação
```

---

## 💻 Como Rodar Localmente

Basta abrir o arquivo `index.html` em qualquer navegador, ou iniciar um servidor HTTP local:

```bash
# Com Python:
python -m http.server 3000

# Ou com Node.js:
npx serve
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
