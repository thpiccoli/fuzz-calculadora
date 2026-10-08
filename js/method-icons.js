/**
 * Fuzz Cafés - Ícones Estilo Cartoon / Pop-Art dos Métodos de Preparo
 * Inspirados na identidade ilustrada da Fuzz (Mico Nico, Ilha dos Sabores e embalagens retrô).
 * Traço marcante em café escuro (#1e201d), cores vivas (laranja Fuzz, âmbar, turquesa retrô) e brilhos cartoon.
 */

const METHOD_ICONS = {
  v60: `<img src="assets/methods/v60.png" alt="Hario V60" class="method-img" loading="lazy" />`,
  "french-press": `<img src="assets/methods/french-press.png" alt="Prensa Francesa" class="method-img" loading="lazy" />`,
  aeropress: `<img src="assets/methods/aeropress.png" alt="AeroPress" class="method-img" loading="lazy" />`,
  moka: `<img src="assets/methods/moka.png" alt="Cafeteira Italiana" class="method-img" loading="lazy" />`,
  melitta: `<img src="assets/methods/melitta.png" alt="Filtro Tradicional" class="method-img" loading="lazy" />`,
  clever: `<img src="assets/methods/clever.png" alt="Clever Dripper" class="method-img" loading="lazy" />`,
  chemex: `<img src="assets/methods/chemex.png" alt="Chemex" class="method-img" loading="lazy" />`,
  "cold-brew": `<img src="assets/methods/cold-brew.png" alt="Cold Brew" class="method-img" loading="lazy" />`,
  espresso: `<img src="assets/methods/espresso.png" alt="Espresso" class="method-img" loading="lazy" />`,
};

const METHOD_SVG_FALLBACKS = {
  v60: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Hario V60">
      <path d="M25 8 C23 5 26 3 25 1" stroke="#ff7e00" stroke-width="2" stroke-linecap="round"/>
      <path d="M33 7 C31 4 34 2 33 0" stroke="#ffaa00" stroke-width="2" stroke-linecap="round"/>
      <path d="M41 8 C39 5 42 3 41 1" stroke="#ff7e00" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Jarra de vidro inferior (servidor) -->
      <path d="M22 36 L18 52 C17.5 56 20 58 24 58 L42 58 C46 58 48.5 56 48 52 L44 36 Z" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Café extraído na jarra -->
      <path d="M20 46 L46 46 L44.8 53 C44.5 55 43 56 40.5 56 L25.5 56 C23 56 21.5 55 21.2 53 Z" fill="#b45309" stroke="#1e201d" stroke-width="1.8"/>
      <!-- Brilho cartoon na jarra -->
      <path d="M21 48 L22 53" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <!-- Alça da jarra -->
      <path d="M46 39 C52 40 54 46 51 51 C49.5 53.5 47 54.5 45 54.5" fill="none" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      
      <!-- Base do suporte V60 -->
      <path d="M15 32 C15 30 51 30 51 32 C51 34 15 34 15 32 Z" fill="#ffaa00" stroke="#1e201d" stroke-width="2.6"/>
      
      <!-- Cone V60 em Laranja Fuzz -->
      <path d="M12 12 L54 12 L36 32 L30 32 Z" fill="#ff7e00" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Filtro de papel cônico branco/creme -->
      <path d="M16 13 L50 13 L34 30 L32 30 Z" fill="#fffdfa" stroke="#1e201d" stroke-width="1.8"/>
      <!-- Cama de café moído no filtro -->
      <path d="M19 16 L47 16 L34 27 L32 27 Z" fill="#6b3a19"/>
      <!-- Ranhuras espirais cartoon do V60 -->
      <path d="M23 15 C28 20 30 24 33 28" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
      <!-- Brilho no cone -->
      <path d="M15 15 L22 25" stroke="#fef08a" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    </svg>
  `,

  // 2. Prensa Francesa (French Press - Vidro azul cartoon, êmbolo com botão laranja, café espumoso)
  "french-press": `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Prensa Francesa">
      <!-- Botão do êmbolo (bola laranja cartoon) -->
      <circle cx="32" cy="7" r="4.5" fill="#ff7e00" stroke="#1e201d" stroke-width="2.4"/>
      <circle cx="30.5" cy="5.5" r="1.2" fill="#ffffff"/>
      <!-- Haste metálica do êmbolo -->
      <line x1="32" y1="11" x2="32" y2="34" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      
      <!-- Tampa metálica arredondada -->
      <path d="M19 16 C19 13.5 45 13.5 45 16 L45 18 L19 18 Z" fill="#38bdf8" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      
      <!-- Corpo de vidro cilíndrico -->
      <rect x="20" y="18" width="24" height="40" rx="4" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6"/>
      <!-- Café em infusão dentro da prensa -->
      <rect x="21.5" y="34" width="21" height="22.5" rx="2" fill="#78350f"/>
      <!-- Camada de borra prensada no fundo -->
      <rect x="21.5" y="52" width="21" height="4.5" rx="2" fill="#451a03"/>
      
      <!-- Filtro de tela prensando -->
      <line x1="21" y1="34" x2="43" y2="34" stroke="#ffaa00" stroke-width="3" stroke-linecap="round"/>
      <line x1="21" y1="34" x2="43" y2="34" stroke="#1e201d" stroke-width="1.2" stroke-dasharray="2 2"/>
      
      <!-- Reflexo cartoon no vidro -->
      <path d="M23 22 L23 48" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      
      <!-- Alça preta/turquesa ergonômica -->
      <path d="M44 24 C52 24 54 32 52 42 C50 47 46 48 44 48" fill="none" stroke="#1e201d" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M44 24 C52 24 54 32 52 42 C50 47 46 48 44 48" fill="none" stroke="#38bdf8" stroke-width="1.4" stroke-linecap="round"/>
      
      <!-- Pezinhos da prensa -->
      <rect x="21" y="58" width="4" height="3" rx="1" fill="#1e201d"/>
      <rect x="39" y="58" width="4" height="3" rx="1" fill="#1e201d"/>
    </svg>
  `,

  // 3. AeroPress (Câmara transparente com marcas de dosagem 1-2-3, êmbolo com vedação e gotas)
  aeropress: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="AeroPress">
      <!-- Manopla superior do êmbolo (apoio largo) -->
      <rect x="22" y="5" width="20" height="5" rx="2.5" fill="#1e201d" stroke="#1e201d" stroke-width="2"/>
      <rect x="26" y="6" width="8" height="2" rx="1" fill="#ff7e00"/>
      <!-- Haste do êmbolo -->
      <rect x="26.5" y="10" width="11" height="15" fill="#f8fafc" stroke="#1e201d" stroke-width="2.4"/>
      <!-- Borracha de vedação do êmbolo em laranja Fuzz -->
      <rect x="25" y="24" width="14" height="5" rx="2" fill="#ff7e00" stroke="#1e201d" stroke-width="2.4"/>
      
      <!-- Tubo principal da Aeropress (acrílico translúcido) -->
      <rect x="23" y="17" width="18" height="34" rx="3" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6"/>
      
      <!-- Marcas cartoon de xícaras: (1), (2), (3) -->
      <circle cx="28" cy="28" r="1.8" fill="#ff7e00" stroke="#1e201d" stroke-width="1"/>
      <circle cx="28" cy="35" r="1.8" fill="#ff7e00" stroke="#1e201d" stroke-width="1"/>
      <circle cx="28" cy="42" r="1.8" fill="#ff7e00" stroke="#1e201d" stroke-width="1"/>
      <line x1="32" y1="28" x2="36" y2="28" stroke="#1e201d" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="32" y1="35" x2="36" y2="35" stroke="#1e201d" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="32" y1="40" x2="36" y2="40" stroke="#1e201d" stroke-width="1.8" stroke-linecap="round"/>
      
      <!-- Café sob pressão na base -->
      <rect x="24.5" y="38" width="15" height="12" rx="1.5" fill="#92400e"/>
      
      <!-- Tampa de filtro perfurada inferior -->
      <path d="M20 51 L44 51 L42 56 L22 56 Z" fill="#1e201d" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      
      <!-- Caneca cartoon receptora embaixo com jato de café -->
      <path d="M19 56 L45 56 L43 62 L21 62 Z" fill="#ffaa00" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      <!-- Gotas / fluxo saindo da tampa -->
      <circle cx="32" cy="58" r="1.5" fill="#ff7e00"/>
    </svg>
  `,

  // 4. Cafeteira Italiana / Moka (Octogonal estilizada retrô com alça preta e vapor cartoon)
  moka: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Cafeteira Italiana Moka">
      <!-- Vapor cartoon aromático -->
      <path d="M22 6 C20 4 22 2 20 0" stroke="#ffaa00" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 4 C26 2 28 0 27 -2" stroke="#ff7e00" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Pomo da tampa -->
      <circle cx="32" cy="8" r="3.2" fill="#1e201d" stroke="#1e201d" stroke-width="1.5"/>
      <!-- Tampa cônica -->
      <path d="M22 14 L32 10 L42 14 Z" fill="#38bdf8" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      
      <!-- Bico de servir da moka -->
      <path d="M22 14 L16 19 L22 22" fill="#38bdf8" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      
      <!-- Coletor superior facetado (estilo cartoon prateado/turquesa) -->
      <path d="M22 14 L42 14 L39 32 L25 32 Z" fill="#e2e8f0" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Vincos facetados com brilho -->
      <line x1="29" y1="14" x2="30" y2="32" stroke="#ffffff" stroke-width="2.2"/>
      <line x1="35" y1="14" x2="34" y2="32" stroke="#cbd5e1" stroke-width="1.8"/>
      
      <!-- Faixa da cinta central (anel preto com friso laranja) -->
      <rect x="23" y="32" width="18" height="5" rx="1.5" fill="#1e201d" stroke="#1e201d" stroke-width="2"/>
      <rect x="25" y="33.5" width="14" height="2" rx="0.8" fill="#ff7e00"/>
      
      <!-- Caldeira inferior (base para ferver água) -->
      <path d="M24 37 L40 37 L43 56 C43 58 41 59 39 59 L25 59 C23 59 21 58 21 56 Z" fill="#cbd5e1" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      
      <!-- Válvula de segurança dourada da moka -->
      <circle cx="23" cy="46" r="2.4" fill="#f59e0b" stroke="#1e201d" stroke-width="1.6"/>
      
      <!-- Alça de baquelite curva em arco cartoon -->
      <path d="M41 18 C50 18 53 26 49 36 C47 41 42 43 39 43" fill="none" stroke="#1e201d" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M41 18 C50 18 53 26 49 36 C47 41 42 43 39 43" fill="none" stroke="#ff7e00" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `,

  // 5. Filtro Tradicional Melitta (Porta-filtro amarelo ensolarado + caneca turquesa retrô)
  melitta: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Filtro Tradicional Melitta">
      <!-- Vapor cartoon saindo da caneca -->
      <path d="M27 7 C25 4 28 2 27 0" stroke="#ff7e00" stroke-width="2" stroke-linecap="round"/>
      <path d="M37 6 C35 3 38 1 37 -1" stroke="#ffaa00" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Suporte do porta-filtro trapezoidal em Amarelo/Âmbar quente -->
      <path d="M13 12 L51 12 L41 33 L23 33 Z" fill="#ffaa00" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      
      <!-- Filtro de papel dobrado clássico -->
      <path d="M17 13 L47 13 L39 31 L25 31 Z" fill="#fffdfa" stroke="#1e201d" stroke-width="1.8"/>
      <!-- Pó de café no filtro -->
      <path d="M20 17 L44 17 L38 29 L26 29 Z" fill="#6b3a19"/>
      
      <!-- Alça do suporte Melitta -->
      <path d="M49 16 C55 18 56 26 44 28" fill="none" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      
      <!-- Prato/base do suporte apoiado na caneca -->
      <rect x="18" y="33" width="28" height="4" rx="2" fill="#ff7e00" stroke="#1e201d" stroke-width="2.2"/>
      
      <!-- Caneca de cerâmica em Turquesa Fuzz retrô -->
      <path d="M20 38 L44 38 L42 56 C42 58 40 59 38 59 L26 59 C24 59 22 58 22 56 Z" fill="#38bdf8" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Brilho cartoon na caneca -->
      <path d="M24 43 L24 53" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <!-- Alça da caneca -->
      <path d="M43 42 C49 43 50 51 43 54" fill="none" stroke="#1e201d" stroke-width="2.8" stroke-linecap="round"/>
    </svg>
  `,

  // 6. Clever Dripper (Cone transparente com tampa turquesa e sistema inteligente de válvula)
  clever: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Clever Dripper">
      <!-- Tampa em Turquesa Fuzz -->
      <path d="M13 11 C20 8 44 8 51 11 L48 14 L16 14 Z" fill="#38bdf8" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      
      <!-- Cone Clever transparente -->
      <path d="M14 14 L50 14 L38 37 L26 37 Z" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Filtro com café em imersão total -->
      <path d="M17 15 L47 15 L36 35 L28 35 Z" fill="#fffdfa" stroke="#1e201d" stroke-width="1.6"/>
      <path d="M19 18 L45 18 L35 34 L29 34 Z" fill="#92400e"/>
      
      <!-- Alça do Clever -->
      <path d="M47 18 C54 21 54 29 42 33" fill="none" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      
      <!-- Mecanismo de válvula inteligente na base (anel laranja Fuzz) -->
      <rect x="24" y="37" width="16" height="7" rx="2.5" fill="#ff7e00" stroke="#1e201d" stroke-width="2.4"/>
      <!-- Indicador da válvula (cadeado/gota) -->
      <circle cx="32" cy="40.5" r="2" fill="#fef08a" stroke="#1e201d" stroke-width="1.2"/>
      
      <!-- Pés de liberação que encaixam no servidor -->
      <path d="M19 45 L45 45 M22 48 L42 48" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      <!-- Jarra receptora cartoon abaixo -->
      <path d="M23 49 L41 49 L43 59 C43 60 41 61 39 61 L25 61 C23 61 21 60 21 59 Z" fill="#ffffff" stroke="#1e201d" stroke-width="2" stroke-linejoin="round"/>
      <!-- Gotas caindo quando acionada -->
      <circle cx="32" cy="54" r="1.5" fill="#ffaa00"/>
    </svg>
  `,

  // 7. Chemex (Ampulheta cartoon com colar de madeira quente, cordão vermelho com conta e café dourado)
  chemex: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Chemex">
      <!-- Bocal de servir do vidro superior -->
      <path d="M16 9 L48 9" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M15 8 L17 12" stroke="#1e201d" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Cone de vidro superior -->
      <path d="M16 10 L48 10 L37 28 L27 28 Z" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Filtro espesso dobrado Chemex -->
      <path d="M18 11 L46 11 L35 27 L29 27 Z" fill="#fffdfa" stroke="#1e201d" stroke-width="1.8"/>
      <path d="M21 15 L43 15 L34 25 L30 25 Z" fill="#78350f"/>
      
      <!-- Cintura / Colar de madeira natural em Caramelo vibrante -->
      <rect x="25.5" y="28" width="13" height="9" rx="3" fill="#ea580c" stroke="#1e201d" stroke-width="2.4"/>
      <!-- Cordão de couro com laço vermelho e conta de madeira -->
      <line x1="25.5" y1="32.5" x2="38.5" y2="32.5" stroke="#fef08a" stroke-width="2.2"/>
      <circle cx="34" cy="35" r="2.2" fill="#fef08a" stroke="#1e201d" stroke-width="1.4"/>
      <path d="M34 37 L36 41 M33 37 L32 40" stroke="#fef08a" stroke-width="1.8" stroke-linecap="round"/>
      
      <!-- Bojo inferior em vidro (balão arredondado cartoon) -->
      <path d="M27 37 L37 37 L49 54 C50 57 48 59 45 59 L19 59 C16 59 14 57 15 54 Z" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Café extraído aromático no fundo -->
      <path d="M21 47 L43 47 L47 55 C47.5 56.5 46.5 57.5 45 57.5 L19 57.5 C17.5 57.5 16.5 56.5 17 55 Z" fill="#b45309" stroke="#1e201d" stroke-width="1.6"/>
      <!-- Brilho cartoon no bojo da Chemex -->
      <path d="M20 50 C18 52 19 54 22 55" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <!-- Botão de nível de vidro da Chemex -->
      <circle cx="32" cy="49" r="1.8" fill="#38bdf8" stroke="#1e201d" stroke-width="1"/>
    </svg>
  `,

  // 8. Cold Brew (Jarra mason jar cartoon com tampa retrô, cubos de gelo flutuando e café gelado escuro)
  "cold-brew": `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Cold Brew">
      <!-- Cristais de gelo e frescor no ar -->
      <path d="M20 6 L20 2 M18 4 L22 4" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M44 8 L44 4 M42 6 L46 6" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>
      
      <!-- Tampa de metal da jarra (estilo Mason Jar em Laranja Fuzz) -->
      <rect x="23" y="9" width="18" height="5" rx="2" fill="#ff7e00" stroke="#1e201d" stroke-width="2.4"/>
      <rect x="21" y="14" width="22" height="3" fill="#ffaa00" stroke="#1e201d" stroke-width="1.8"/>
      
      <!-- Corpo da garrafa/jarra de vidro robusta -->
      <path d="M21 17 L43 17 L45 55 C45 58 43 59 40 59 L24 59 C21 59 19 58 19 55 Z" fill="#e0f2fe" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      
      <!-- Café gelado encorpado escuro -->
      <path d="M20.5 28 L43.5 28 L44.5 54 C44.5 56.5 43 57.5 40 57.5 L24 57.5 C21 57.5 19.5 56.5 19.5 54 Z" fill="#451a03"/>
      
      <!-- Cubos de gelo cartoon estilizados flutuando com brilho -->
      <rect x="23" y="24" width="7" height="7" rx="2" fill="#38bdf8" stroke="#1e201d" stroke-width="1.8" transform="rotate(12 23 24)"/>
      <rect x="24.5" y="25.5" width="2" height="2" rx="0.5" fill="#ffffff" transform="rotate(12 23 24)"/>
      
      <rect x="33" y="22" width="8" height="8" rx="2" fill="#7dd3fc" stroke="#1e201d" stroke-width="1.8" transform="rotate(-8 33 22)"/>
      <rect x="34.5" y="23.5" width="2.5" height="2.5" rx="0.5" fill="#ffffff" transform="rotate(-8 33 22)"/>
      
      <!-- Gotas de condensação no vidro -->
      <circle cx="41" cy="38" r="1.4" fill="#38bdf8"/>
      <circle cx="23" cy="44" r="1.4" fill="#38bdf8"/>
      <circle cx="41" cy="46" r="1.2" fill="#38bdf8"/>
      
      <!-- Reflexo cartoon na jarra -->
      <path d="M22 32 L22 48" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
    </svg>
  `,

  // 9. Espresso (Porta-filtro duplo com bicas pingando e xícara de porcelana com crema aveludada)
  espresso: `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="method-svg" aria-label="Espresso">
      <!-- Cabo do porta-filtro (em baquelite preto com anel laranja) -->
      <path d="M6 18 L19 21 L19 26 L6 23 Z" fill="#1e201d" stroke="#1e201d" stroke-width="2.2" stroke-linejoin="round"/>
      <rect x="15" y="20" width="3" height="6" rx="1" fill="#ff7e00"/>
      
      <!-- Anel de encaixe do grupo da máquina em Turquesa/Cromo -->
      <rect x="18" y="15" width="28" height="6" rx="2" fill="#38bdf8" stroke="#1e201d" stroke-width="2.4"/>
      <!-- Aletas de encaixe -->
      <line x1="22" y1="15" x2="22" y2="12" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      <line x1="42" y1="15" x2="42" y2="12" stroke="#1e201d" stroke-width="2.6" stroke-linecap="round"/>
      
      <!-- Cesto porta-filtro de aço inox -->
      <path d="M21 21 L43 21 L40 30 L24 30 Z" fill="#e2e8f0" stroke="#1e201d" stroke-width="2.4" stroke-linejoin="round"/>
      
      <!-- Bicos duplos de saída (spouts) -->
      <path d="M28 30 L27 35 M36 30 L37 35" stroke="#1e201d" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Fios contínuos de espresso cremoso descendo -->
      <line x1="27" y1="35" x2="29" y2="42" stroke="#ff7e00" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="37" y1="35" x2="35" y2="42" stroke="#ff7e00" stroke-width="2.2" stroke-linecap="round"/>
      
      <!-- Xícara tulipa de porcelana clássica com pires -->
      <ellipse cx="32" cy="58" rx="15" ry="3" fill="#ffaa00" stroke="#1e201d" stroke-width="2.4"/>
      <path d="M22 41 L42 41 L40 55 C40 57 38 58 36 58 L28 58 C26 58 24 57 24 55 Z" fill="#fffdfa" stroke="#1e201d" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- Alça da xícara -->
      <path d="M41 44 C47 45 47 51 40 53" fill="none" stroke="#1e201d" stroke-width="2.4" stroke-linecap="round"/>
      
      <!-- Crema aveludada dourada espessa no topo do café -->
      <ellipse cx="32" cy="43" rx="8" ry="2.5" fill="#f59e0b" stroke="#1e201d" stroke-width="1.4"/>
      <ellipse cx="32" cy="43.5" rx="5" ry="1.2" fill="#b45309"/>
      
      <!-- Pingo/gota caindo no centro da crema -->
      <circle cx="32" cy="38" r="1.4" fill="#ff7e00"/>
    </svg>
  `
};
