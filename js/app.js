/**
 * Fuzz Cafés - Aplicação Principal (App)
 * 
 * SUMÁRIO DAS SEÇÕES:
 * 1. Inicialização & Elementos do DOM
 * 2. Utilitários de Navegação e Scroll Suave
 * 3. Módulo 1: Catálogo de Cafés & Carrossel
 * 4. Módulo 2: Métodos de Preparo & Dicas do Nico
 * 5. Módulo 3: Doses Rápidas (Presets) & Passos de Extração
 * 6. Sincronização Reativa do Estado (Observer)
 * 7. Manipulação de Inputs da Calculadora & Steppers
 * 8. Módulo do Cronômetro Interativo (Brew Timer Modal)
 * 9. Utilitários da Interface (Cópia, Toast, Menu Mobile, Barra Fixa)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. INICIALIZAÇÃO & ELEMENTOS DO DOM
  // ==========================================================================

  // Instâncias dos controladores de lógica
  const calc = new CoffeeCalculator(FUZZ_DATA);
  const timer = new BrewTimer();

  // Estado local da UI
  let activeCategoryFilter = "todos";

  // Elementos do Catálogo e Métodos
  const coffeeGridEl = document.getElementById("coffeeGrid");
  const methodsGridEl = document.getElementById("methodsGrid");
  const presetsContainerEl = document.getElementById("presetsContainer");
  const categoryFiltersEl = document.getElementById("categoryFilters");

  // Inputs e Controles da Calculadora
  const waterInputEl = document.getElementById("waterInput");
  const coffeeInputEl = document.getElementById("coffeeInput");
  const waterBoxEl = document.getElementById("waterBox");
  const coffeeBoxEl = document.getElementById("coffeeBox");
  const ratioSliderEl = document.getElementById("ratioSlider");
  const ratioValueDisplayEl = document.getElementById("ratioValueDisplay");
  const intensityButtonsEl = document.querySelectorAll(".intensity-btn");

  // Estilo de Preparo: Quente vs No Gelo (Japanese Iced)
  const btnStyleHotEl = document.getElementById("btnStyleHot");
  const btnStyleIcedEl = document.getElementById("btnStyleIced");
  const icedInfoBannerEl = document.getElementById("icedInfoBanner");

  // Botões de Incremento (+ / -)
  const waterStepMinusEl = document.getElementById("waterStepMinus");
  const waterStepPlusEl = document.getElementById("waterStepPlus");
  const coffeeStepMinusEl = document.getElementById("coffeeStepMinus");
  const coffeeStepPlusEl = document.getElementById("coffeeStepPlus");

  // Card de Resumo (Ficha de Extração)
  const summaryCoffeeImgEl = document.getElementById("summaryCoffeeImg");
  const summaryCoffeeNameEl = document.getElementById("summaryCoffeeName");
  const summaryCoffeeBadgeEl = document.getElementById("summaryCoffeeBadge");
  const summaryCoffeeNotesEl = document.getElementById("summaryCoffeeNotes");
  const summaryMethodNameEl = document.getElementById("summaryMethodName");
  const summaryMethodIconEl = document.getElementById("summaryMethodIcon");
  const summaryWaterMlEl = document.getElementById("summaryWaterMl");
  const summaryCoffeeGramsEl = document.getElementById("summaryCoffeeGrams");
  const summaryIcedRowEl = document.getElementById("summaryIcedRow");
  const summaryIcedDivisionEl = document.getElementById("summaryIcedDivision");
  const summaryYieldMlEl = document.getElementById("summaryYieldMl");
  const summaryBloomWaterEl = document.getElementById("summaryBloomWater");
  const summaryRatioDisplayEl = document.getElementById("summaryRatioDisplay");
  const summaryGrindNameEl = document.getElementById("summaryGrindName");
  const summaryTempEl = document.getElementById("summaryTemp");
  const summaryTempTipEl = document.getElementById("summaryTempTip");
  const summaryTimeEl = document.getElementById("summaryTime");
  const summaryShopLinkEl = document.getElementById("summaryShopLink");

  // Guia de Moedores Modal
  const grinderModalOverlayEl = document.getElementById("grinderModalOverlay");
  const btnOpenGrinderGuideEl = document.getElementById("btnOpenGrinderGuide");
  const btnCloseGrinderModalEl = document.getElementById("btnCloseGrinderModal");
  const grinderModalMethodEl = document.getElementById("grinderModalMethod");
  const grinderModalGrindEl = document.getElementById("grinderModalGrind");

  // Passos de Preparo
  const methodStepsContainerEl = document.getElementById("methodStepsContainer");

  // Cronômetro Modal
  const timerModalOverlayEl = document.getElementById("timerModalOverlay");
  const btnOpenTimerEl = document.getElementById("btnOpenTimer");
  const btnCloseTimerEl = document.getElementById("btnCloseTimer");
  const timerDisplayEl = document.getElementById("timerDisplay");
  const timerProgressBarEl = document.getElementById("timerProgressBar");
  const timerMethodTagEl = document.getElementById("timerMethodTag");
  const timerStepBadgeEl = document.getElementById("timerStepBadge");
  const timerStepRemainingEl = document.getElementById("timerStepRemaining");
  const timerStepTitleEl = document.getElementById("timerStepTitle");
  const timerStepDescEl = document.getElementById("timerStepDesc");
  const timerStepBoxEl = document.getElementById("timerStepBox");
  const timerNextStepEl = document.getElementById("timerNextStep");
  const btnTimerStartEl = document.getElementById("btnTimerStart");
  const btnTimerResetEl = document.getElementById("btnTimerReset");
  const btnTimerPrevStepEl = document.getElementById("btnTimerPrevStep");
  const btnTimerNextStepBtnEl = document.getElementById("btnTimerNextStepBtn");
  const btnToggleMuteEl = document.getElementById("btnToggleMute");

  // Modal do Card Stories (Instagram / WhatsApp)
  const btnOpenStoryCardEl = document.getElementById("btnOpenStoryCard");
  const storyModalOverlayEl = document.getElementById("storyModalOverlay");
  const btnCloseStoryModalEl = document.getElementById("btnCloseStoryModal");
  const storyCanvasEl = document.getElementById("storyCanvas");
  const btnDownloadStoryImageEl = document.getElementById("btnDownloadStoryImage");
  const btnNativeShareStoryEl = document.getElementById("btnNativeShareStory");

  // Toast, Cópia, Compartilhamento, Impressão e Favoritos
  const btnCopyRecipeEl = document.getElementById("btnCopyRecipe");
  const btnShareWhatsAppEl = document.getElementById("btnShareWhatsApp");
  const btnSaveFavoriteEl = document.getElementById("btnSaveFavorite");
  const btnCopyShareLinkEl = document.getElementById("btnCopyShareLink");
  const btnPrintRecipeEl = document.getElementById("btnPrintRecipe");
  const saveFavoriteIconEl = document.getElementById("saveFavoriteIcon");
  const saveFavoriteTextEl = document.getElementById("saveFavoriteText");
  const fuzzToastEl = document.getElementById("fuzzToast");

  // Menu Mobile Drawer
  const mobileMenuToggleEl = document.getElementById("mobileMenuToggle");
  const mobileNavDrawerEl = document.getElementById("mobileNavDrawer");
  const mobileNavCloseEl = document.getElementById("mobileNavClose");

  // Barra Flutuante Mobile
  const mobileStickyWaterEl = document.getElementById("mobileStickyWater");
  const mobileStickyCoffeeEl = document.getElementById("mobileStickyCoffee");
  const mobileStickyMethodEl = document.getElementById("mobileStickyMethod");
  const mobileStickyRatioEl = document.getElementById("mobileStickyRatio");
  const mobileStickyBtnEl = document.getElementById("mobileStickyBtn");
  const mobileStickyInfoEl = document.getElementById("mobileStickyInfo");

  // Carrossel de Cafés e Navegação de Passos
  const coffeeScrollWrapperEl = document.getElementById("coffeeScrollWrapper");
  const coffeePrevBtnEl = document.getElementById("coffeePrevBtn");
  const coffeeNextBtnEl = document.getElementById("coffeeNextBtn");
  const btnGotoSummaryEl = document.getElementById("btnGotoSummary");

  // ==========================================================================
  // 2. UTILITÁRIOS DE NAVEGAÇÃO E SCROLL SUAVE
  // ==========================================================================

  /**
   * Rolagem suave com aceleração cúbica
   */
  function smoothScrollTo(targetY, duration = 800) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    let startTime = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      window.scrollTo(0, startY + diff * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Rola até um elemento por ID com compensação do cabeçalho fixo
   */
  function scrollToStep(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const headerHeight = 85;
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - headerHeight);

    smoothScrollTo(targetY, 800);

    // Efeito de destaque ao chegar no passo
    el.classList.remove("step-arrival-glow");
    void el.offsetWidth;
    el.classList.add("step-arrival-glow");
  }

  // ==========================================================================
  // 3. MÓDULO 1: CATÁLOGO DE CAFÉS & CARROSSEL
  // ==========================================================================

  function renderCoffees() {
    if (!coffeeGridEl) return;

    const coffees = FUZZ_DATA.coffees.filter(c => {
      if (activeCategoryFilter === "todos") return true;
      return c.category === activeCategoryFilter;
    });

    coffeeGridEl.innerHTML = coffees.map(c => {
      const isSelected = calc.selectedCoffee.id === c.id;
      const notesHtml = c.notes.map(n => `<span class="flavor-stamp">● ${n}</span>`).join("");
      const islandHtml = c.islandRegion ? `<span class="coffee-card__island-tag">🏝️ ${c.islandRegion}</span>` : '';

      return `
        <div class="coffee-card ${isSelected ? 'selected' : ''}" data-coffee-id="${c.id}">
          <div class="coffee-card__image-wrap">
            <span class="coffee-card__badge">${c.badge || c.subtitle}</span>
            <img src="${c.image}" alt="${c.name}" class="coffee-card__image" loading="lazy" />
          </div>
          <div class="coffee-card__content">
            <h3 class="coffee-card__title">${c.name}</h3>
            ${islandHtml}
            <p class="coffee-card__subtitle">${c.species}<!-- &bull; Torra ${c.roast} (removido conforme filosofia Fuzz) --></p>
            <div class="coffee-card__notes">${notesHtml}</div>
            <div class="coffee-card__meta">
              <span>Doçura: ${'★'.repeat(c.sensory.sweetness)}${'☆'.repeat(5 - c.sensory.sweetness)}</span>
              <span>Ratio: 1:${c.recommendedRatio}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Adiciona evento de clique para seleção e transição suave
    coffeeGridEl.querySelectorAll(".coffee-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.coffeeId;
        calc.selectCoffee(id);
        renderCoffees();
        setTimeout(() => scrollToStep("sectionMethods"), 450);
      });
    });
  }

  // ==========================================================================
  // 4. MÓDULO 2: MÉTODOS DE PREPARO & DICAS DO BARISTA NICO
  // ==========================================================================

  const nicoMethodTips = {
    v60: "O Hario V60 destaca acidez brilhante e notas florais limpas com clareza máxima!",
    "french-press": "Na Prensa Francesa, os óleos naturais trazem corpo denso e textura aveludada irresistível!",
    aeropress: "A AeroPress combina imersão e pressão para um café super versátil, rápido e limpo!",
    moka: "A Cafeteira Italiana entrega um café bem encorpado, forte e marcante, lembrando um espresso!",
    melitta: "O filtro Melitta tradicional traz conforto equilibrado e extração uniforme para o dia a dia!",
    clever: "O Clever junta o melhor da imersão com a clareza do filtro de papel. Muito fácil de acertar!",
    chemex: "O filtro espesso da Chemex retém óleos pesados para uma bebida cristalina e super elegante!",
    "cold-brew": "Extração lenta a frio: zero amargor agressivo e muita doçura natural com gelo!",
    espresso: "Pressão máxima para criar aquela crema dourada espessa e sabor ultra concentrado!"
  };

  function updateNicoMethodTip(methodId) {
    const tipEl = document.getElementById("nicoTipText");
    const tagEl = document.getElementById("nicoTipTag");
    const boxEl = document.getElementById("nicoMethodTipBox");
    const methodObj = FUZZ_DATA.methods.find(m => m.id === methodId);

    if (tipEl && nicoMethodTips[methodId]) {
      tipEl.textContent = nicoMethodTips[methodId];
    }
    if (tagEl && methodObj) {
      tagEl.textContent = `Dica do Barista Nico (${methodObj.name}):`;
    }
    if (boxEl) {
      boxEl.classList.remove("nico-tip-pulse");
      void boxEl.offsetWidth;
      boxEl.classList.add("nico-tip-pulse");
    }
  }

  function renderMethods() {
    if (!methodsGridEl) return;

    methodsGridEl.innerHTML = FUZZ_DATA.methods.map(m => {
      const isSelected = calc.selectedMethod.id === m.id;
      const iconHtml = typeof getMethodIconHtml === "function" 
        ? getMethodIconHtml(m.id, m.name) 
        : `<img src="assets/methods/${m.id}.png" alt="${m.name}" class="method-img" loading="lazy" />`;

      return `
        <button type="button" class="method-btn ${isSelected ? 'selected' : ''}" data-method-id="${m.id}" title="${m.name} - ${m.shortDesc}">
          <span class="method-icon">${iconHtml}</span>
          <span class="method-name">${m.name}</span>
          <span class="method-ratio-hint">1:${m.defaultRatio} &bull; ${m.grind.name}</span>
        </button>
      `;
    }).join("");

    updateNicoMethodTip(calc.selectedMethod.id);

    methodsGridEl.querySelectorAll(".method-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.methodId;
        calc.selectMethod(id);
        renderMethods();
        renderPresets();
        updateNicoMethodTip(id);
        setTimeout(() => scrollToStep("sectionInputs"), 950);
      });
    });
  }

  // ==========================================================================
  // 5. MÓDULO 3: DOSES RÁPIDAS (PRESETS) & PASSOS DE EXTRAÇÃO
  // ==========================================================================

  function renderPresets() {
    if (!presetsContainerEl) return;

    // Se o método atual for Cold Brew, exibe doses de infusão a frio adequadas (500ml, 1L, 1.5L ou Pacote 250g)
    if (calc.selectedMethod.id === "cold-brew") {
      const coldPresets = [
        { label: "Garrafa (500ml)", val: 500, type: "water" },
        { label: "Jarra 1 Litro", val: 1000, type: "water" },
        { label: "Jarra Grande (1.5L)", val: 1500, type: "water" },
        { label: "📦 Pacote 250g Fechado", val: 250, type: "coffee" }
      ];

      presetsContainerEl.innerHTML = coldPresets.map(p => {
        const isActive = p.type === "coffee"
          ? Math.round(calc.coffeeGrams) === p.val
          : Math.round(calc.waterMl) === p.val;
        return `
          <button type="button" class="preset-chip ${isActive ? 'active' : ''}" data-type="${p.type}" data-val="${p.val}">
            ${p.label}
          </button>
        `;
      }).join("");

      presetsContainerEl.querySelectorAll(".preset-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          if (chip.dataset.type === "coffee") {
            calc.setCoffeeGrams(Number(chip.dataset.val));
          } else {
            calc.applyPreset(Number(chip.dataset.val));
          }
          renderPresets();
          setTimeout(() => scrollToStep("sectionSummary"), 400);
        });
      });
      return;
    }

    presetsContainerEl.innerHTML = FUZZ_DATA.presets.map(p => {
      const isActive = Math.round(calc.waterMl) === p.waterMl;
      return `
        <button type="button" class="preset-chip ${isActive ? 'active' : ''}" data-ml="${p.waterMl}">
          ${p.label}
        </button>
      `;
    }).join("");

    presetsContainerEl.querySelectorAll(".preset-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const ml = Number(chip.dataset.ml);
        calc.applyPreset(ml);
        renderPresets();
        setTimeout(() => scrollToStep("sectionSummary"), 400);
      });
    });
  }

  function renderMethodSteps(state) {
    if (!methodStepsContainerEl) return;

    const steps = state.steps || state.method.steps;
    
    // Atualiza os passos no cronômetro com os valores calculados
    if (!timer.isRunning) {
      timer.setSteps(steps);
    } else {
      timer.steps = steps;
      timer.notify();
    }

    const tip = nicoMethodTips[state.method.id];
    const tipBanner = tip ? `
      <div class="step-nico-banner">
        <img src="assets/mascot/nico-barista-badge.png" alt="Nico Barista" class="step-nico-avatar" />
        <div class="step-nico-text">
          <span class="step-nico-tag">Segredo de Extração no ${state.method.name}:</span>
          <p>${tip}</p>
        </div>
      </div>
    ` : "";

    const stepsHtml = steps.map((s, idx) => {
      return `
        <div class="step-item">
          <div class="step-item__icon">${idx + 1}</div>
          <div class="step-item__content">
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        </div>
      `;
    }).join("");

    // Se for Cold Brew, inclui o card oficial de drinks da Fuzz Cafés
    let coldBrewDrinksHtml = "";
    if (state.method.id === "cold-brew") {
      coldBrewDrinksHtml = `
        <div class="cold-brew-drinks-card">
          <div class="cold-brew-drinks-header">
            <span>🍹</span>
            <h4>Receitas de Drinks Fuzz com seu Cold Brew</h4>
          </div>
          <div class="cold-brew-drinks-grid">
            <div class="cold-brew-drink-item">
              <strong>🍸 Cold Brew Tônica</strong>
              <p>100ml de Cold Brew filtrado + 150ml de água tônica gelada + pedras de gelo e rodela de laranja ou limão siciliano.</p>
            </div>
            <div class="cold-brew-drink-item">
              <strong>🥛 Iced Latte Cremoso</strong>
              <p>100ml de Cold Brew concentrado + 100ml de leite integral ou de aveia bem gelado + cubos de gelo na jarra.</p>
            </div>
          </div>
        </div>
      `;
    }

    methodStepsContainerEl.innerHTML = tipBanner + stepsHtml + coldBrewDrinksHtml;
  }

  // ==========================================================================
  // 6. SINCRONIZAÇÃO REATIVA DO ESTADO (OBSERVER)
  // ==========================================================================

  calc.subscribe(state => {
    // Sincroniza inputs evitando conflito com o foco do usuário
    if (waterInputEl && document.activeElement !== waterInputEl) {
      waterInputEl.value = state.waterMl;
    }
    if (coffeeInputEl && document.activeElement !== coffeeInputEl) {
      coffeeInputEl.value = state.coffeeGrams;
    }

    // Destaque visual do campo ativo
    if (waterBoxEl && coffeeBoxEl) {
      if (state.activeInputMode === "coffee") {
        coffeeBoxEl.classList.add("active-mode");
        waterBoxEl.classList.remove("active-mode");
      } else {
        waterBoxEl.classList.add("active-mode");
        coffeeBoxEl.classList.remove("active-mode");
      }
    }

    // Slider de proporção
    if (ratioSliderEl && ratioValueDisplayEl) {
      ratioSliderEl.min = state.method.minRatio;
      ratioSliderEl.max = state.method.maxRatio;
      ratioSliderEl.value = state.ratio;
      ratioValueDisplayEl.textContent = `1 : ${state.ratio}`;
    }

    // Botões de intensidade
    const baseRatio = state.method.defaultRatio;
    intensityButtonsEl.forEach(btn => {
      const type = btn.dataset.intensity;
      let target = baseRatio;
      if (type === "suave") target = baseRatio + 2;
      if (type === "encorpado") target = Math.max(1, baseRatio - 2);

      if (Number(state.ratio) === target) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Ficha de Resumo (Coluna Direita)
    if (summaryCoffeeImgEl && state.coffee.image) {
      summaryCoffeeImgEl.src = state.coffee.image;
      summaryCoffeeImgEl.alt = state.coffee.name;
    }
    if (summaryCoffeeNameEl) summaryCoffeeNameEl.textContent = state.coffee.name;
    if (summaryCoffeeBadgeEl) summaryCoffeeBadgeEl.textContent = state.coffee.subtitle;
    if (summaryCoffeeNotesEl) {
      summaryCoffeeNotesEl.innerHTML = state.coffee.notes.map(n => `<span class="flavor-stamp">● ${n}</span>`).join("");
    }
    if (summaryMethodNameEl) summaryMethodNameEl.textContent = state.method.name;
    if (summaryMethodIconEl) {
      summaryMethodIconEl.innerHTML = typeof getMethodIconHtml === "function" 
        ? getMethodIconHtml(state.method.id, state.method.name) 
        : `<img src="assets/methods/${state.method.id}.png" alt="${state.method.name}" class="method-img" loading="lazy" />`;
    }

    // Balão de fala do Nico sobre a intensidade
    const nicoSpeechEl = document.getElementById("nicoRatioSpeechText");
    if (nicoSpeechEl) {
      const r = Number(state.ratio);
      if (r >= 16.5) {
        nicoSpeechEl.textContent = "Delicado, leve e aromático como a brisa fresca da Ilha! 🍃";
      } else if (r <= 13.5) {
        nicoSpeechEl.textContent = "Poderoso, denso e encorpado para dar energia à expedição! ⚡";
      } else {
        nicoSpeechEl.textContent = "Equilíbrio padrão ouro da Fuzz! Doçura e corpo em harmonia perfeita. ☕✨";
      }
    }

    // Atualização de Estilo Quente vs No Gelo
    if (btnStyleHotEl && btnStyleIcedEl) {
      btnStyleHotEl.classList.toggle("active", !state.isIcedActive);
      btnStyleIcedEl.classList.toggle("active", state.isIcedActive);
      if (!state.isIcedCompatible) {
        btnStyleIcedEl.classList.add("disabled");
        btnStyleIcedEl.title = "Modo Japanese Iced não é indicado para este método";
      } else {
        btnStyleIcedEl.classList.remove("disabled");
        btnStyleIcedEl.title = "Extração coada direto sobre cubos de gelo";
      }
    }
    if (icedInfoBannerEl) {
      icedInfoBannerEl.style.display = state.isIcedActive ? "flex" : "none";
    }
    if (summaryIcedRowEl) {
      summaryIcedRowEl.style.display = state.isIcedActive ? "flex" : "none";
      if (summaryIcedDivisionEl && state.isIcedActive) {
        summaryIcedDivisionEl.innerHTML = `<strong>${state.iceGrams}g gelo</strong> + <strong>${state.hotWaterMl}ml água quente</strong>`;
      }
    }

    if (summaryWaterMlEl) {
      summaryWaterMlEl.textContent = state.isIcedActive 
        ? `${state.waterMl} ml (${state.hotWaterMl}ml quente + ${state.iceGrams}g gelo)`
        : `${state.waterMl} ml`;
    }
    if (summaryCoffeeGramsEl) summaryCoffeeGramsEl.textContent = `${state.coffeeGrams} g`;
    if (summaryYieldMlEl) summaryYieldMlEl.textContent = `~${state.yieldMl} ml`;
    if (summaryBloomWaterEl) summaryBloomWaterEl.textContent = `${state.bloomWater} ml`;
    if (summaryRatioDisplayEl) summaryRatioDisplayEl.textContent = `1 : ${state.ratio} (${state.intensity})`;

    if (summaryGrindNameEl) summaryGrindNameEl.textContent = `${state.grind.name} (${state.grind.description})`;
    if (summaryTempEl) summaryTempEl.textContent = state.temp;
    if (summaryTempTipEl) summaryTempTipEl.textContent = state.tempTip || state.coffee.roast;
    if (summaryTimeEl) summaryTimeEl.textContent = state.totalTime;

    if (summaryShopLinkEl) {
      summaryShopLinkEl.href = state.coffee.shopUrl || "https://www.fuzzcafes.com.br/";
      summaryShopLinkEl.textContent = `Comprar ${state.coffee.name} na Fuzz Cafés ↗`;
    }

    // Cálculo do Rendimento do Pacote & Custo por Xícara
    const summaryPackCupsEl = document.getElementById("summaryPackCups");
    const summaryCupCostEl = document.getElementById("summaryCupCost");
    if (summaryPackCupsEl && summaryCupCostEl) {
      const pkgWeight = state.coffee.packageWeight || 250;
      const price = state.coffee.price || 46.00;
      const cups = Math.max(1, Math.floor(pkgWeight / (state.coffeeGrams || 15)));
      const cupCost = ((price / pkgWeight) * (state.coffeeGrams || 15)).toFixed(2).replace('.', ',');
      summaryPackCupsEl.textContent = `~${cups} xícaras`;
      summaryCupCostEl.textContent = `R$ ${cupCost}`;
    }

    // Barra Flutuante Mobile
    if (mobileStickyWaterEl) mobileStickyWaterEl.textContent = `${state.waterMl}ml`;
    if (mobileStickyCoffeeEl) mobileStickyCoffeeEl.textContent = `${state.coffeeGrams}g`;
    if (mobileStickyMethodEl) {
      mobileStickyMethodEl.textContent = state.isIcedActive ? `🧊 ${state.method.name}` : state.method.name;
    }
    if (mobileStickyRatioEl) mobileStickyRatioEl.textContent = `1:${state.ratio}`;

    // Atualiza passos adaptados e presets ativos
    renderMethodSteps(state);
    renderPresets();

    // Sincronização de URL (Deep Linking) e status de favorito
    syncUrlParams(state);
    checkFavoriteStatus(state);
  });

  // ==========================================================================
  // 7. MANIPULAÇÃO DE INPUTS DA CALCULADORA & STEPPERS
  // ==========================================================================

  if (waterInputEl) {
    waterInputEl.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val)) calc.setWaterMl(val);
    });
  }

  if (coffeeInputEl) {
    coffeeInputEl.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val)) calc.setCoffeeGrams(val);
    });
  }

  if (waterStepMinusEl) {
    waterStepMinusEl.addEventListener("click", () => {
      calc.setWaterMl(Math.max(50, calc.waterMl - 50));
    });
  }

  if (waterStepPlusEl) {
    waterStepPlusEl.addEventListener("click", () => {
      calc.setWaterMl(calc.waterMl + 50);
    });
  }

  if (coffeeStepMinusEl) {
    coffeeStepMinusEl.addEventListener("click", () => {
      calc.setCoffeeGrams(Math.max(5, calc.coffeeGrams - 1));
    });
  }

  if (coffeeStepPlusEl) {
    coffeeStepPlusEl.addEventListener("click", () => {
      calc.setCoffeeGrams(calc.coffeeGrams + 1);
    });
  }

  if (ratioSliderEl) {
    ratioSliderEl.addEventListener("input", (e) => {
      calc.setRatio(Number(e.target.value));
    });
  }

  intensityButtonsEl.forEach(btn => {
    btn.addEventListener("click", () => {
      calc.setIntensityLevel(btn.dataset.intensity);
    });
  });

  // Alternador de Estilo Quente vs No Gelo (Japanese Iced)
  if (btnStyleHotEl) {
    btnStyleHotEl.addEventListener("click", () => {
      calc.setIcedMode(false);
    });
  }

  if (btnStyleIcedEl) {
    btnStyleIcedEl.addEventListener("click", () => {
      if (calc.isIcedCompatible()) {
        calc.setIcedMode(true);
        showToast("🧊 Modo Japanese Iced: 40% gelo na jarra + 60% água quente!");
      } else {
        showToast("Modo Japanese Iced é ideal para V60, Chemex, Melitta ou AeroPress!");
      }
    });
  }

  if (categoryFiltersEl) {
    categoryFiltersEl.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        categoryFiltersEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategoryFilter = btn.dataset.category;
        renderCoffees();
      });
    });
  }

  // ==========================================================================
  // 8. MÓDULO DO CRONÔMETRO INTERATIVO (BREW TIMER MODAL)
  // ==========================================================================

  // Screen Wake Lock API (mantém a tela acesa durante o preparo)
  let wakeLockSentinel = null;

  async function requestWakeLock() {
    try {
      if ("wakeLock" in navigator && !wakeLockSentinel) {
        wakeLockSentinel = await navigator.wakeLock.request("screen");
        wakeLockSentinel.addEventListener("release", () => {
          wakeLockSentinel = null;
        });
      }
    } catch (e) {
      // Ignora silenciosamente se o dispositivo não permitir ou não tiver bateria
    }
  }

  async function releaseWakeLock() {
    if (wakeLockSentinel) {
      try {
        await wakeLockSentinel.release();
      } catch (e) {}
      wakeLockSentinel = null;
    }
  }

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible" && timerModalOverlayEl && timerModalOverlayEl.classList.contains("open")) {
      await requestWakeLock();
    }
  });

  // Controle de Áudio / Mudo
  const isMutedSaved = localStorage.getItem("fuzz_timer_muted") === "true";
  timer.setMuted(isMutedSaved);

  function updateMuteButtonUI(isMuted) {
    if (!btnToggleMuteEl) return;
    btnToggleMuteEl.textContent = isMuted ? "🔇" : "🔊";
    btnToggleMuteEl.classList.toggle("muted", isMuted);
    btnToggleMuteEl.title = isMuted ? "Desmutar som (M)" : "Silenciar som (M)";
    btnToggleMuteEl.setAttribute("aria-label", isMuted ? "Desmutar som do cronômetro" : "Silenciar som do cronômetro");
  }

  function toggleTimerMute() {
    const newMuted = timer.toggleMute();
    localStorage.setItem("fuzz_timer_muted", String(newMuted));
    updateMuteButtonUI(newMuted);
  }

  if (btnToggleMuteEl) {
    btnToggleMuteEl.addEventListener("click", toggleTimerMute);
    updateMuteButtonUI(timer.isMuted);
  }

  function openTimerModal() {
    if (!timerModalOverlayEl) return;
    const state = calc.getState();
    const steps = state.steps || state.method.steps;
    if (!timer.isRunning && timer.seconds === 0) {
      timer.setSteps(steps);
    }
    if (timerMethodTagEl) {
      const modeText = state.isIcedActive ? " (Japanese Iced)" : "";
      timerMethodTagEl.textContent = `${state.method.name}${modeText} • ${state.coffee.name}`;
    }
    updateMuteButtonUI(timer.isMuted);
    timerModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
    requestWakeLock();
  }

  function closeTimerModal() {
    if (!timerModalOverlayEl) return;
    timer.pause();
    timerModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
    releaseWakeLock();
  }

  if (btnOpenTimerEl) btnOpenTimerEl.addEventListener("click", openTimerModal);
  if (btnCloseTimerEl) btnCloseTimerEl.addEventListener("click", closeTimerModal);

  if (timerModalOverlayEl) {
    timerModalOverlayEl.addEventListener("click", (e) => {
      if (e.target === timerModalOverlayEl) closeTimerModal();
    });
  }

  // Atalhos de Teclado no Desktop para o Cronômetro
  document.addEventListener("keydown", (e) => {
    if (!timerModalOverlayEl || !timerModalOverlayEl.classList.contains("open")) return;

    if (e.key === "Escape") {
      closeTimerModal();
    } else if (e.code === "Space") {
      e.preventDefault();
      if (timer.isRunning) {
        timer.pause();
      } else {
        timer.start();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      timer.skipNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      timer.skipPrev();
    } else if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      const state = calc.getState();
      const steps = state.steps || state.method.steps;
      lastActiveStepIndex = 0;
      timer.setSteps(steps);
    } else if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      toggleTimerMute();
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleTimerFullscreen();
    }
  });

  // Modo Bancada Tela Cheia (Fullscreen API)
  const btnToggleFullscreenEl = document.getElementById("btnToggleFullscreen");

  function toggleTimerFullscreen() {
    if (!timerModalOverlayEl) return;
    const isFs = timerModalOverlayEl.classList.toggle("is-fullscreen-active");
    if (btnToggleFullscreenEl) {
      btnToggleFullscreenEl.textContent = isFs ? "⤦" : "⛶";
      btnToggleFullscreenEl.title = isFs ? "Sair da tela cheia (F)" : "Modo Bancada Tela Cheia (F)";
    }

    try {
      if (isFs && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (!isFs && document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {}
  }

  if (btnToggleFullscreenEl) {
    btnToggleFullscreenEl.addEventListener("click", toggleTimerFullscreen);
  }

  // Gestos Touch no Celular (Swipe para trocar etapas e Tap no timer para pausar/retomar)
  const timerCardEl = timerModalOverlayEl ? timerModalOverlayEl.querySelector(".timer-modal-card") : null;
  let touchStartX = 0;
  let touchStartY = 0;

  if (timerCardEl) {
    timerCardEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    timerCardEl.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Se o movimento for horizontal e maior que 45px
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        if (diffX < 0) {
          // Swipe para esquerda: Avançar etapa
          timer.skipNext();
          if (navigator.vibrate) navigator.vibrate(30);
        } else {
          // Swipe para direita: Voltar etapa
          timer.skipPrev();
          if (navigator.vibrate) navigator.vibrate(30);
        }
      }
    }, { passive: true });
  }

  // Toque no display gigante do timer para Iniciar / Pausar
  if (timerDisplayEl) {
    timerDisplayEl.addEventListener("click", () => {
      if (timer.isRunning) {
        timer.pause();
      } else {
        timer.start();
      }
      if (navigator.vibrate) navigator.vibrate(25);
    });
  }

  if (btnTimerStartEl) {
    btnTimerStartEl.addEventListener("click", () => {
      if (timer.isRunning) {
        timer.pause();
      } else {
        timer.start();
      }
    });
  }

  if (btnTimerResetEl) {
    btnTimerResetEl.addEventListener("click", () => {
      const state = calc.getState();
      const steps = state.steps || state.method.steps;
      lastActiveStepIndex = 0;
      timer.setSteps(steps);
    });
  }
  if (btnTimerPrevStepEl) btnTimerPrevStepEl.addEventListener("click", () => timer.skipPrev());
  if (btnTimerNextStepBtnEl) btnTimerNextStepBtnEl.addEventListener("click", () => timer.skipNext());

  let lastActiveStepIndex = -1;

  // Inscrição reativa do cronômetro
  timer.subscribe(tState => {
    if (timerDisplayEl) timerDisplayEl.textContent = tState.formattedTime;
    if (btnTimerStartEl) {
      btnTimerStartEl.textContent = tState.isRunning ? "Pausar" : (tState.seconds > 0 ? "Retomar" : "Iniciar");
    }

    if (timerProgressBarEl) {
      timerProgressBarEl.style.width = `${tState.progressPercent}%`;
    }

    if (timerStepBadgeEl) {
      timerStepBadgeEl.textContent = `Etapa ${tState.currentStepIndex + 1} de ${tState.totalSteps}`;
    }
    if (timerStepRemainingEl) {
      timerStepRemainingEl.textContent = tState.isFinished ? "Concluído" : `${tState.formattedStepRemaining} restante`;
    }

    // Destaque visual e animação vibrante ao avançar/mudar de etapa no cronômetro
    if (lastActiveStepIndex !== tState.currentStepIndex) {
      if (lastActiveStepIndex !== -1 && timerStepBoxEl) {
        timerStepBoxEl.classList.remove("step-change-pulse");
        void timerStepBoxEl.offsetWidth; // Força reflow para reiniciar animação
        timerStepBoxEl.classList.add("step-change-pulse");
        setTimeout(() => {
          if (timerStepBoxEl) timerStepBoxEl.classList.remove("step-change-pulse");
        }, 700);
      }
      lastActiveStepIndex = tState.currentStepIndex;
    }

    // Atualiza ilustração e fala do mascote Nico no cronômetro
    const timerMascotImgEl = document.getElementById("timerMascotImg");
    const timerMascotTextEl = document.getElementById("timerMascotText");
    if (timerMascotImgEl && timerMascotTextEl) {
      if (tState.isFinished) {
        timerMascotImgEl.src = "assets/mascot/nico-drinking-badge.png";
        timerMascotTextEl.textContent = "Café pronto! Extração perfeita concluída. Agora é só servir e saborear! ☕🎉";
      } else if (tState.isRunning) {
        timerMascotImgEl.src = "assets/mascot/nico-binoculars-badge.png";
        timerMascotTextEl.textContent = "Nico com binóculos: acompanhando cada segundo da sua extração!";
      } else {
        timerMascotImgEl.src = "assets/mascot/nico-barista-badge.png";
        timerMascotTextEl.textContent = "Tudo pronto! Aperte Iniciar para começar a sua aventura sensorial.";
      }
    }

    if (timerStepTitleEl && timerStepDescEl) {
      if (tState.currentStep) {
        timerStepTitleEl.textContent = tState.currentStep.title;
        timerStepDescEl.innerHTML = tState.currentStep.desc;
      } else if (tState.isFinished) {
        timerStepTitleEl.textContent = "Extração Concluída! 🎉";
        timerStepDescEl.innerHTML = "Seu café Fuzz está pronto para ser degustado. Bom proveito!";
      }
    }

    if (timerNextStepEl) {
      if (tState.nextStep) {
        timerNextStepEl.style.display = "block";
        timerNextStepEl.textContent = `Próximo: ${tState.nextStep.title}`;
      } else if (tState.isFinished) {
        timerNextStepEl.style.display = "none";
      } else {
        timerNextStepEl.style.display = "block";
        timerNextStepEl.textContent = "Última etapa em andamento";
      }
    }

    // Ao finalizar a extração, expande o card de degustação para o usuário avaliar
    if (tState.isFinished) {
      const cardEl = document.getElementById("timerTastingCard");
      if (cardEl && cardEl.classList.contains("collapsed")) {
        cardEl.classList.remove("collapsed");
      }
    }
  });

  // ==========================================================================
  // 9. UTILITÁRIOS DA INTERFACE (CÓPIA, TOAST, STORIES CARD, MENU MOBILE)
  // ==========================================================================

  function showToast(msg) {
    if (!fuzzToastEl) return;
    fuzzToastEl.querySelector(".toast-message").textContent = msg;
    fuzzToastEl.classList.add("show");
    setTimeout(() => {
      fuzzToastEl.classList.remove("show");
    }, 3200);
  }

  // ==========================================================================
  // MÓDULO DO CARD STORIES (INSTAGRAM / WHATSAPP - CANVAS 1080x1920)
  // ==========================================================================
  function openStoryCardModal() {
    if (!storyModalOverlayEl || !storyCanvasEl) return;
    const state = calc.getState();
    renderStoryCardToCanvas(state);
    storyModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeStoryCardModal() {
    if (!storyModalOverlayEl) return;
    storyModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (btnOpenStoryCardEl) btnOpenStoryCardEl.addEventListener("click", openStoryCardModal);
  if (btnCloseStoryModalEl) btnCloseStoryModalEl.addEventListener("click", closeStoryCardModal);
  if (storyModalOverlayEl) {
    storyModalOverlayEl.addEventListener("click", (e) => {
      if (e.target === storyModalOverlayEl) closeStoryCardModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && storyModalOverlayEl && storyModalOverlayEl.classList.contains("open")) {
      closeStoryCardModal();
    }
  });

  // Renderizador no Canvas (1080x1920)
  function renderStoryCardToCanvas(state) {
    const canvas = storyCanvasEl;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 1080;
    const H = 1920;

    // Fundo Degradê Escuro Premium Fuzz
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#191a18");
    bgGrad.addColorStop(0.5, "#222521");
    bgGrad.addColorStop(1, "#121312");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Efeito radial sutil de calor/brilho no topo direito
    const radG = ctx.createRadialGradient(W * 0.8, H * 0.18, 50, W * 0.8, H * 0.18, 650);
    radG.addColorStop(0, state.isIcedActive ? "rgba(102, 217, 232, 0.18)" : "rgba(255, 126, 0, 0.18)");
    radG.addColorStop(1, "transparent");
    ctx.fillStyle = radG;
    ctx.fillRect(0, 0, W, H);

    // Moldura elegante
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 4;
    roundRect(ctx, 40, 40, W - 80, H - 80, 48);
    ctx.stroke();

    // Topo: Badge Oficial Fuzz
    ctx.fillStyle = state.isIcedActive ? "#66d9e8" : "#ff7e00";
    ctx.font = "800 28px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("☕ FUZZ CAFÉS ESPECIAIS • RECEITA OFICIAL", W / 2, 140);

    // Linha divisória
    ctx.strokeStyle = state.isIcedActive ? "rgba(102, 217, 232, 0.3)" : "rgba(255, 126, 0, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 180, 170);
    ctx.lineTo(W / 2 + 180, 170);
    ctx.stroke();

    // Nome do Café
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px 'Fredoka', 'Lilita One', sans-serif";
    ctx.fillText(state.coffee.name.toUpperCase(), W / 2, 270);

    // Subtítulo do café
    ctx.fillStyle = "#ffb066";
    ctx.font = "600 32px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(state.coffee.subtitle, W / 2, 330);

    // Pílulas de Notas Sensoriais
    if (state.coffee.notes && state.coffee.notes.length) {
      const notesText = state.coffee.notes.join("  •  ");
      ctx.fillStyle = "#dedcd7";
      ctx.font = "500 28px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(`Notas: ${notesText}`, W / 2, 390);
    }

    // Card Central Principal de Preparo
    const cardX = 90;
    const cardY = 460;
    const cardW = W - 180;
    const cardH = 960;

    ctx.fillStyle = "#262925";
    ctx.strokeStyle = "#383c36";
    ctx.lineWidth = 3;
    roundRect(ctx, cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.stroke();

    // Método de Preparo no topo do card
    ctx.fillStyle = state.isIcedActive ? "#66d9e8" : "#ff922b";
    ctx.font = "800 34px 'Plus Jakarta Sans', sans-serif";
    const methodStyleTag = state.isIcedActive ? `🧊 JAPANESE ICED • ${state.method.name.toUpperCase()}` : `♨️ ${state.method.name.toUpperCase()}`;
    ctx.fillText(methodStyleTag, W / 2, cardY + 75);

    // Linha divisória interna
    ctx.strokeStyle = "#343832";
    ctx.beginPath();
    ctx.moveTo(cardX + 40, cardY + 115);
    ctx.lineTo(cardX + cardW - 40, cardY + 115);
    ctx.stroke();

    // Grade com 4 caixas de parâmetros essenciais
    const boxW = (cardW - 120) / 2;
    const boxH = 220;

    // Caixa 1: Volume de Líquido / Água
    drawMetricBox(ctx, cardX + 40, cardY + 160, boxW, boxH, 
      state.isIcedActive ? "BEBIDA TOTAL" : "ÁGUA TOTAL", 
      `${state.waterMl} ml`, 
      state.isIcedActive ? `♨️ ${state.hotWaterMl}ml quente + 🧊 ${state.iceGrams}g gelo` : "Filtrada / Mineral");

    // Caixa 2: Pó de Café
    drawMetricBox(ctx, cardX + 80 + boxW, cardY + 160, boxW, boxH, 
      "PÓ DE CAFÉ", 
      `${state.coffeeGrams} g`, 
      `Proporção 1 : ${state.ratio}`);

    // Caixa 3: Moagem Indicada
    drawMetricBox(ctx, cardX + 40, cardY + 420, boxW, boxH, 
      "MOAGEM INDICADA", 
      state.grind.name, 
      state.grind.description.length > 32 ? state.grind.description.substring(0, 30) + '...' : state.grind.description);

    // Caixa 4: Tempo e Temperatura
    drawMetricBox(ctx, cardX + 80 + boxW, cardY + 420, boxW, boxH, 
      "TEMPO & TEMPERATURA", 
      state.totalTime, 
      state.temp);

    // Resumo de Bloom & Rendimento
    ctx.fillStyle = "#1c1e1b";
    roundRect(ctx, cardX + 40, cardY + 680, cardW - 80, 220, 24);
    ctx.fill();

    ctx.fillStyle = "#ffb066";
    ctx.font = "700 26px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🌿 PRÉ-INFUSÃO (BLOOM):", cardX + 70, cardY + 740);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 28px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`${state.bloomWater} ml por 40 segundos`, cardX + 440, cardY + 740);

    ctx.fillStyle = "#ffb066";
    ctx.font = "700 26px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("☕ RENDIMENTO ESTIMADO:", cardX + 70, cardY + 820);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 28px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(`~${state.yieldMl} ml de café especial`, cardX + 440, cardY + 820);

    // Rodapé do Stories: Mascote Nico e Branding
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 36px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Extraia o seu melhor café com a Fuzz!", W / 2, 1540);

    ctx.fillStyle = "#a8a59d";
    ctx.font = "500 28px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Calculadora online: fuzzcafes.com.br", W / 2, 1600);

    // Botão / Pílula Instagram
    ctx.fillStyle = state.isIcedActive ? "#66d9e8" : "#ff7e00";
    roundRect(ctx, W / 2 - 190, 1670, 380, 76, 38);
    ctx.fill();

    ctx.fillStyle = "#1e201d";
    ctx.font = "800 30px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("@fuzzcafes", W / 2, 1718);
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function drawMetricBox(ctx, x, y, w, h, label, mainVal, subVal) {
    ctx.fillStyle = "#1e201d";
    ctx.strokeStyle = "#383c36";
    ctx.lineWidth = 2;
    roundRect(ctx, x, y, w, h, 20);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#a8a59d";
    ctx.font = "700 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(label, x + w / 2, y + 48);

    ctx.fillStyle = "#ff7e00";
    ctx.font = "900 44px 'Fredoka', 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(mainVal, x + w / 2, y + 115);

    ctx.fillStyle = "#dedcd7";
    ctx.font = "500 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText(subVal, x + w / 2, y + 172);
  }

  if (btnDownloadStoryImageEl) {
    btnDownloadStoryImageEl.addEventListener("click", () => {
      if (!storyCanvasEl) return;
      const link = document.createElement("a");
      link.download = `receita-fuzz-${calc.selectedCoffee.id}-${calc.selectedMethod.id}.png`;
      link.href = storyCanvasEl.toDataURL("image/png");
      link.click();
      showToast("📸 Card para Stories baixado com sucesso!");
    });
  }

  if (btnNativeShareStoryEl) {
    btnNativeShareStoryEl.addEventListener("click", async () => {
      if (!storyCanvasEl) return;
      try {
        storyCanvasEl.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], `receita-fuzz-${calc.selectedCoffee.id}.png`, { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `Receita Fuzz Cafés - ${calc.selectedCoffee.name}`,
              text: `Confira minha receita de café especial na Calculadora da Fuzz Cafés!`
            });
            showToast("Compartilhado com sucesso!");
          } else {
            // Fallback para download
            const link = document.createElement("a");
            link.download = `receita-fuzz-${calc.selectedCoffee.id}.png`;
            link.href = storyCanvasEl.toDataURL("image/png");
            link.click();
            showToast("Imagem salva! Agora publique nos seus Stories.");
          }
        }, "image/png");
      } catch (err) {
        showToast("Imagem pronta para baixar!");
      }
    });
  }

  // Cópia da Receita Formatada
  if (btnCopyRecipeEl) {
    btnCopyRecipeEl.addEventListener("click", () => {
      const state = calc.getState();
      const styleText = state.isIcedActive 
        ? `\nEstilo: 🧊 No Gelo (Japanese Iced: ${state.hotWaterMl}ml quente + ${state.iceGrams}g gelo)`
        : `\nEstilo: ♨️ Quente Tradicional`;
      const recipeText = `☕ RECEITA DE PREPARO - FUZZ CAFÉS
Grão: ${state.coffee.name} (${state.coffee.subtitle})
Método: ${state.method.name}${styleText}
Volume de Água: ${state.waterMl} ml
Pó de Café: ${state.coffeeGrams} g (Proporção 1:${state.ratio})
Bebida Estimada na Xícara: ~${state.yieldMl} ml
Pré-infusão (Bloom): ${state.bloomWater} ml por 40 seg
Moagem: ${state.grind.name}
Temperatura da Água: ${state.temp}
Tempo Total Estimado: ${state.totalTime}

Calculado via Calculadora Fuzz Cafés (www.fuzzcafes.com.br)`;

      navigator.clipboard.writeText(recipeText).then(() => {
        showToast("Receita copiada para a área de transferência!");
      }).catch(() => {
        showToast("Erro ao copiar receita.");
      });
    });
  }

  // ==========================================================================
  // COMPARTILHAMENTO, LINK DIRETO & FAVORITOS (FASE 3)
  // ==========================================================================

  const FAVORITE_STORAGE_KEY = "fuzz_favorite_recipe";

  /**
   * Constrói a URL canônica para compartilhamento com os parâmetros atuais
   */
  function buildRecipeUrl(state) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("cafe", state.coffee.id);
    url.searchParams.set("metodo", state.method.id);
    url.searchParams.set("agua", state.waterMl);
    url.searchParams.set("ratio", state.ratio);
    return url.toString();
  }

  /**
   * Atualiza a barra de endereço silenciosamente sem recarregar a página
   */
  function syncUrlParams(state) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("cafe", state.coffee.id);
      url.searchParams.set("metodo", state.method.id);
      url.searchParams.set("agua", state.waterMl);
      url.searchParams.set("ratio", state.ratio);
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      // Falha silenciosa em navegadores com restrições de sandbox
    }
  }

  /**
   * Verifica se a configuração atual é idêntica à salva como favorita
   */
  function checkFavoriteStatus(state) {
    if (!btnSaveFavoriteEl || !saveFavoriteIconEl || !saveFavoriteTextEl) return;
    try {
      const savedRaw = localStorage.getItem(FAVORITE_STORAGE_KEY);
      if (!savedRaw) {
        btnSaveFavoriteEl.classList.remove("is-favorite");
        saveFavoriteIconEl.textContent = "⭐";
        saveFavoriteTextEl.textContent = "Salvar Padrão";
        return;
      }
      const saved = JSON.parse(savedRaw);
      const isMatch = saved.coffeeId === state.coffee.id &&
                      saved.methodId === state.method.id &&
                      Number(saved.waterMl) === Number(state.waterMl) &&
                      Number(saved.ratio) === Number(state.ratio);

      if (isMatch) {
        btnSaveFavoriteEl.classList.add("is-favorite");
        saveFavoriteIconEl.textContent = "★";
        saveFavoriteTextEl.textContent = "Receita Padrão";
      } else {
        btnSaveFavoriteEl.classList.remove("is-favorite");
        saveFavoriteIconEl.textContent = "⭐";
        saveFavoriteTextEl.textContent = "Salvar Padrão";
      }
    } catch (e) {
      btnSaveFavoriteEl.classList.remove("is-favorite");
    }
  }

  /**
   * Salva a receita atual no localStorage como favorita/padrão
   */
  function toggleSaveFavorite() {
    const state = calc.getState();
    try {
      const savedRaw = localStorage.getItem(FAVORITE_STORAGE_KEY);
      let isAlreadyFavorite = false;
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        isAlreadyFavorite = saved.coffeeId === state.coffee.id &&
                            saved.methodId === state.method.id &&
                            Number(saved.waterMl) === Number(state.waterMl) &&
                            Number(saved.ratio) === Number(state.ratio);
      }

      if (isAlreadyFavorite) {
        localStorage.removeItem(FAVORITE_STORAGE_KEY);
        checkFavoriteStatus(state);
        showToast("Receita padrão removida!");
      } else {
        const payload = {
          coffeeId: state.coffee.id,
          methodId: state.method.id,
          waterMl: state.waterMl,
          ratio: state.ratio,
          savedAt: new Date().toISOString()
        };
        localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(payload));
        checkFavoriteStatus(state);
        showToast(`⭐ Receita salva como padrão para suas próximas visitas!`);
      }
    } catch (e) {
      showToast("Não foi possível salvar a receita favorita no navegador.");
    }
  }

  // Compartilhamento via WhatsApp
  if (btnShareWhatsAppEl) {
    btnShareWhatsAppEl.addEventListener("click", () => {
      const state = calc.getState();
      const shareUrl = buildRecipeUrl(state);
      const text = `☕ *Minha Receita Fuzz Cafés:*
Grão: ${state.coffee.name} (${state.coffee.subtitle})
Método: ${state.method.name}
Volume: ${state.waterMl}ml | Café: ${state.coffeeGrams}g (1:${state.ratio})
Rendimento na Xícara: ~${state.yieldMl}ml
Temperatura: ${state.temp}
Moagem: ${state.grind.name}

Abra a receita interativa com cronômetro aqui:
${shareUrl}`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Copiar Link Direto para a Receita
  if (btnCopyShareLinkEl) {
    btnCopyShareLinkEl.addEventListener("click", () => {
      const state = calc.getState();
      const shareUrl = buildRecipeUrl(state);
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("🔗 Link direto da receita copiado!");
      }).catch(() => {
        showToast("Erro ao copiar o link da receita.");
      });
    });
  }

  // Imprimir Ficha de Bancada Minimalista
  if (btnPrintRecipeEl) {
    btnPrintRecipeEl.addEventListener("click", () => {
      window.print();
    });
  }

  // Salvar Receita Favorita
  if (btnSaveFavoriteEl) {
    btnSaveFavoriteEl.addEventListener("click", toggleSaveFavorite);
  }

  // Modal do Guia de Moedores
  function openGrinderGuide() {
    if (!grinderModalOverlayEl) return;
    const state = calc.getState();
    if (grinderModalMethodEl) grinderModalMethodEl.textContent = state.method.name;
    if (grinderModalGrindEl) {
      grinderModalGrindEl.textContent = `${state.grind.name} (Nível ${state.grind.level})`;
    }

    // Destaque visual da coluna correspondente ao nível de moagem do método atual
    const table = grinderModalOverlayEl.querySelector(".grinder-table");
    if (table) {
      const currentLevel = String(state.grind.level);
      table.querySelectorAll("th, td").forEach(cell => {
        const level = cell.dataset.level;
        if (level && level === currentLevel) {
          cell.classList.add("col-active");
        } else {
          cell.classList.remove("col-active");
        }
      });
    }

    grinderModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeGrinderGuide() {
    if (!grinderModalOverlayEl) return;
    grinderModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (btnOpenGrinderGuideEl) btnOpenGrinderGuideEl.addEventListener("click", openGrinderGuide);
  if (btnCloseGrinderModalEl) btnCloseGrinderModalEl.addEventListener("click", closeGrinderGuide);

  if (grinderModalOverlayEl) {
    grinderModalOverlayEl.addEventListener("click", (e) => {
      if (e.target === grinderModalOverlayEl) closeGrinderGuide();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && grinderModalOverlayEl && grinderModalOverlayEl.classList.contains("open")) {
      closeGrinderGuide();
    }
  });

  // Menu Mobile Drawer
  if (mobileMenuToggleEl && mobileNavDrawerEl) {
    mobileMenuToggleEl.addEventListener("click", () => {
      mobileNavDrawerEl.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    function closeMobileDrawer() {
      mobileNavDrawerEl.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (mobileNavCloseEl) mobileNavCloseEl.addEventListener("click", closeMobileDrawer);

    mobileNavDrawerEl.addEventListener("click", (e) => {
      if (e.target === mobileNavDrawerEl) closeMobileDrawer();
    });

    mobileNavDrawerEl.querySelectorAll(".mobile-drawer-link").forEach(link => {
      link.addEventListener("click", closeMobileDrawer);
    });
  }

  // Barra Flutuante Mobile
  if (mobileStickyBtnEl) {
    mobileStickyBtnEl.addEventListener("click", openTimerModal);
  }

  if (mobileStickyInfoEl) {
    mobileStickyInfoEl.addEventListener("click", () => {
      scrollToStep("sectionSummary");
    });
  }

  // Setas do Carrossel de Cafés
  if (coffeePrevBtnEl && coffeeScrollWrapperEl) {
    coffeePrevBtnEl.addEventListener("click", () => {
      coffeeScrollWrapperEl.scrollBy({ left: -260, behavior: "smooth" });
    });
  }

  if (coffeeNextBtnEl && coffeeScrollWrapperEl) {
    coffeeNextBtnEl.addEventListener("click", () => {
      coffeeScrollWrapperEl.scrollBy({ left: 260, behavior: "smooth" });
    });
  }

  // Botões de Ação Rápida entre Seções
  if (btnGotoSummaryEl) {
    btnGotoSummaryEl.addEventListener("click", () => scrollToStep("sectionSummary"));
  }

  const btnHeroStartEl = document.getElementById("btnHeroStart");
  const btnHeroTimerEl = document.getElementById("btnHeroTimer");
  const btnRestartRecipeEl = document.getElementById("btnRestartRecipe");
  const btnStepTimerEl = document.getElementById("btnStepTimer");
  const btnStepRestartEl = document.getElementById("btnStepRestart");
  const desktopScrollTopBtnEl = document.getElementById("desktopScrollTopBtn");

  if (btnHeroStartEl) {
    btnHeroStartEl.addEventListener("click", () => scrollToStep("sectionGrains"));
  }
  if (btnHeroTimerEl) {
    btnHeroTimerEl.addEventListener("click", openTimerModal);
  }
  if (btnRestartRecipeEl) {
    btnRestartRecipeEl.addEventListener("click", () => scrollToStep("sectionGrains"));
  }
  if (btnStepTimerEl) {
    btnStepTimerEl.addEventListener("click", openTimerModal);
  }
  if (btnStepRestartEl) {
    btnStepRestartEl.addEventListener("click", () => scrollToStep("sectionGrains"));
  }

  // Botão Desktop: Voltar ao Topo
  if (desktopScrollTopBtnEl) {
    desktopScrollTopBtnEl.addEventListener("click", () => smoothScrollTo(0, 850));

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 380) {
        desktopScrollTopBtnEl.classList.add("visible");
      } else {
        desktopScrollTopBtnEl.classList.remove("visible");
      }
    }, { passive: true });
  }

  /**
   * Carrega estado inicial a partir de URL Query Params (Deep Link) ou Receita Favorita do localStorage
   */
  function loadInitialStateFromUrlOrFavorite() {
    let loadedFromSource = false;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlCoffee = params.get("cafe") || params.get("grao");
      const urlMethod = params.get("metodo");
      const urlWater = params.get("agua");
      const urlRatio = params.get("ratio");
      const urlCoffeeGrams = params.get("po") || params.get("cafe_g");

      // 1. Prioridade: Parâmetros na URL
      if (urlCoffee || urlMethod || urlWater || urlRatio || urlCoffeeGrams) {
        if (urlCoffee) calc.selectCoffee(urlCoffee);
        if (urlMethod) calc.selectMethod(urlMethod);
        if (urlRatio) calc.setRatio(parseFloat(urlRatio));
        if (urlWater) calc.setWaterMl(parseFloat(urlWater));
        if (urlCoffeeGrams) calc.setCoffeeGrams(parseFloat(urlCoffeeGrams));
        loadedFromSource = true;
      }
      // 2. Segunda prioridade: Receita favorita salva pelo usuário
      else {
        const savedRaw = localStorage.getItem(FAVORITE_STORAGE_KEY);
        if (savedRaw) {
          const saved = JSON.parse(savedRaw);
          if (saved.coffeeId) calc.selectCoffee(saved.coffeeId);
          if (saved.methodId) calc.selectMethod(saved.methodId);
          if (saved.ratio) calc.setRatio(parseFloat(saved.ratio));
          if (saved.waterMl) calc.setWaterMl(parseFloat(saved.waterMl));
          loadedFromSource = true;
        }
      }
    } catch (e) {
      console.warn("Aviso ao carregar estado inicial da receita:", e);
    }
    return loadedFromSource;
  }

  // Carrega estado inicial personalizado se existir
  loadInitialStateFromUrlOrFavorite();

  // ==========================================================================
  // 10. MÓDULO DO DIÁRIO DE EXTRAÇÃO (BREW LOG) & DIAGNÓSTICO SENSORIAL DO NICO
  // ==========================================================================
  const brewDiary = typeof BrewDiary !== "undefined" ? new BrewDiary() : null;

  // Elementos do Diário
  const btnOpenDiaryHeaderEl = document.getElementById("btnOpenDiaryHeader");
  const headerDiaryBadgeEl = document.getElementById("headerDiaryBadge");
  const btnOpenDiaryDrawerEl = document.getElementById("btnOpenDiaryDrawer");
  const drawerDiaryBadgeEl = document.getElementById("drawerDiaryBadge");
  const btnOpenDiarySummaryEl = document.getElementById("btnOpenDiarySummary");
  const summaryDiaryCountEl = document.getElementById("summaryDiaryCount");
  
  const diaryModalOverlayEl = document.getElementById("diaryModalOverlay");
  const btnCloseDiaryModalEl = document.getElementById("btnCloseDiaryModal");
  const btnCloseDiaryModalFooterEl = document.getElementById("btnCloseDiaryModalFooter");
  const btnClearAllDiaryEl = document.getElementById("btnClearAllDiary");
  const diaryListContainerEl = document.getElementById("diaryListContainer");
  const diaryModalCountTextEl = document.getElementById("diaryModalCountText");

  // Elementos do Tasting Card no Timer Modal
  const timerTastingCardEl = document.getElementById("timerTastingCard");
  const btnToggleTastingCardEl = document.getElementById("btnToggleTastingCard");
  const tasteOptionButtonsEl = document.querySelectorAll(".btn-taste-option");
  const nicoDiagnosisImgEl = document.getElementById("nicoDiagnosisImg");
  const nicoDiagnosisTitleEl = document.getElementById("nicoDiagnosisTitle");
  const nicoDiagnosisTipEl = document.getElementById("nicoDiagnosisTip");
  const tastingStarsGroupEl = document.getElementById("tastingStarsGroup");
  const tastingNotesInputEl = document.getElementById("tastingNotesInput");
  const btnSaveTastingEl = document.getElementById("btnSaveTasting");

  let currentSelectedTaste = "balanced";
  let currentRating = 5;

  function updateDiaryBadges(count) {
    if (headerDiaryBadgeEl) {
      headerDiaryBadgeEl.textContent = count;
      headerDiaryBadgeEl.style.display = count > 0 ? "flex" : "none";
    }
    if (drawerDiaryBadgeEl) {
      drawerDiaryBadgeEl.textContent = count;
      drawerDiaryBadgeEl.style.display = count > 0 ? "inline-block" : "none";
    }
    if (summaryDiaryCountEl) {
      summaryDiaryCountEl.textContent = count;
    }
    if (diaryModalCountTextEl) {
      diaryModalCountTextEl.textContent = count === 1 ? "1 preparo salvo" : `${count} preparos salvos`;
    }
  }

  function setTastingDiagnosis(tasteKey) {
    currentSelectedTaste = tasteKey;
    const diagMap = typeof NICO_TASTE_DIAGNOSTICS !== "undefined" ? NICO_TASTE_DIAGNOSTICS : {
      acid: { label: "Ácido / Ralo", emoji: "🍋", mascotImg: "assets/mascot/nico-binoculars-badge.png", title: "Diagnóstico: Café Subextraído!", tip: "Dica do Nico: afine 1 ou 2 cliques no moedor ou use água mais quente (94°C a 96°C)!" },
      balanced: { label: "Equilibrado", emoji: "✨", mascotImg: "assets/mascot/nico-drinking-badge.png", title: "Diagnóstico: Extração Perfeita na Mosca! 🎉", tip: "Harmonia perfeita entre doçura, acidez e corpo sedoso. Salve essa receita!" },
      bitter: { label: "Amargo / Seco", emoji: "😖", mascotImg: "assets/mascot/nico-compass-badge.png", title: "Diagnóstico: Café Superextraído!", tip: "Dica do Nico: engrosse 1 ou 2 cliques no moedor ou suavize o despejo da água!" }
    };

    const diag = diagMap[tasteKey] || diagMap.balanced;

    tasteOptionButtonsEl.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.taste === tasteKey);
    });

    if (nicoDiagnosisImgEl) nicoDiagnosisImgEl.src = diag.mascotImg;
    if (nicoDiagnosisTitleEl) nicoDiagnosisTitleEl.textContent = diag.title;
    if (nicoDiagnosisTipEl) nicoDiagnosisTipEl.innerHTML = diag.tip;
  }

  function openDiaryModal() {
    if (!diaryModalOverlayEl) return;
    renderDiaryList();
    diaryModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDiaryModal() {
    if (!diaryModalOverlayEl) return;
    diaryModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  function renderDiaryList() {
    if (!diaryListContainerEl || !brewDiary) return;
    const entries = brewDiary.getEntries();
    updateDiaryBadges(entries.length);

    if (entries.length === 0) {
      diaryListContainerEl.innerHTML = `
        <div class="diary-empty-state">
          <img src="assets/mascot/nico-barista-badge.png" alt="Nico Barista" class="diary-empty-img" />
          <h4>Seu diário está em branco!</h4>
          <p>Prepare uma xícara com o cronômetro, avalie o sabor e salve a sua receita favorita para consultá-la ou repeti-la sempre que quiser.</p>
        </div>
      `;
      return;
    }

    diaryListContainerEl.innerHTML = entries.map(entry => {
      const icedTag = entry.isIced ? `<span class="diary-iced-tag">🧊 No Gelo</span>` : "";
      const starsHtml = "★".repeat(entry.rating) + "☆".repeat(5 - entry.rating);
      const tasteClass = entry.taste === "acid" ? "taste-pill--acid" : (entry.taste === "bitter" ? "taste-pill--bitter" : "taste-pill--balanced");
      const notesHtml = entry.notes ? `<div class="diary-entry__notes">"${entry.notes}"</div>` : "";

      return `
        <div class="diary-entry-card" data-entry-id="${entry.id}">
          <div class="diary-entry__top-row">
            <div>
              <span class="diary-entry__meta">${entry.dateStr}</span>
              <h4 class="diary-entry__title">${entry.methodName} • ${entry.coffeeName} ${icedTag}</h4>
            </div>
            <span class="diary-entry__stars">${starsHtml}</span>
          </div>

          <div class="diary-entry__recipe-specs">
            <span>💧 <strong>${entry.waterMl}ml</strong> água</span>
            <span>☕ <strong>${entry.coffeeGrams}g</strong> pó</span>
            <span>⚖️ <strong>1:${entry.ratio}</strong></span>
            ${entry.isIced && entry.hotWaterMl ? `<span>(🔥 ${entry.hotWaterMl}ml + 🧊 ${entry.iceGrams}g)</span>` : ''}
          </div>

          <div class="diary-entry__taste-row">
            <span class="taste-pill ${tasteClass}">
              <span>${entry.tasteEmoji}</span>
              <span>${entry.tasteLabel}</span>
            </span>
          </div>

          ${notesHtml}

          <div class="diary-entry__actions">
            <button type="button" class="btn-diary-repeat" data-entry-id="${entry.id}">
              ⚡ Repetir esta Receita
            </button>
            <button type="button" class="btn-diary-delete" data-entry-id="${entry.id}" title="Excluir este preparo">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Eventos de Repetir e Excluir
    diaryListContainerEl.querySelectorAll(".btn-diary-repeat").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.entryId;
        const entry = entries.find(e => e.id === id);
        if (entry) {
          if (entry.coffeeId) calc.selectCoffee(entry.coffeeId);
          if (entry.methodId) calc.selectMethod(entry.methodId);
          if (entry.ratio) calc.setRatio(entry.ratio);
          if (entry.coffeeGrams) calc.setCoffeeGrams(entry.coffeeGrams);
          if (typeof entry.isIced === "boolean") calc.setIcedMode(entry.isIced);

          closeDiaryModal();
          renderCoffees();
          renderMethods();
          renderPresets();
          scrollToStep("sectionSummary");
          showToast(`⚡ Receita carregada: ${entry.coffeeName} no ${entry.methodName}!`);
        }
      });
    });

    diaryListContainerEl.querySelectorAll(".btn-diary-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.entryId;
        brewDiary.deleteEntry(id);
        renderDiaryList();
        showToast("Registro removido do diário.");
      });
    });
  }

  if (brewDiary) {
    brewDiary.subscribe(entries => {
      updateDiaryBadges(entries.length);
    });
  }

  if (btnOpenDiaryHeaderEl) btnOpenDiaryHeaderEl.addEventListener("click", openDiaryModal);
  if (btnOpenDiaryDrawerEl) {
    btnOpenDiaryDrawerEl.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof closeMobileDrawer === "function") closeMobileDrawer();
      openDiaryModal();
    });
  }
  if (btnOpenDiarySummaryEl) btnOpenDiarySummaryEl.addEventListener("click", openDiaryModal);
  if (btnCloseDiaryModalEl) btnCloseDiaryModalEl.addEventListener("click", closeDiaryModal);
  if (btnCloseDiaryModalFooterEl) btnCloseDiaryModalFooterEl.addEventListener("click", closeDiaryModal);

  if (diaryModalOverlayEl) {
    diaryModalOverlayEl.addEventListener("click", (e) => {
      if (e.target === diaryModalOverlayEl) closeDiaryModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && diaryModalOverlayEl && diaryModalOverlayEl.classList.contains("open")) {
      closeDiaryModal();
    }
  });

  if (btnClearAllDiaryEl) {
    btnClearAllDiaryEl.addEventListener("click", () => {
      if (confirm("Deseja realmente limpar todo o histórico do seu diário?")) {
        if (brewDiary) {
          brewDiary.clearAll();
          renderDiaryList();
          showToast("Diário limpo com sucesso.");
        }
      }
    });
  }

  if (btnToggleTastingCardEl && timerTastingCardEl) {
    btnToggleTastingCardEl.addEventListener("click", () => {
      timerTastingCardEl.classList.toggle("collapsed");
    });
  }

  tasteOptionButtonsEl.forEach(btn => {
    btn.addEventListener("click", () => {
      setTastingDiagnosis(btn.dataset.taste);
    });
  });

  if (tastingStarsGroupEl) {
    const starButtons = tastingStarsGroupEl.querySelectorAll(".star-btn");
    starButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        currentRating = Number(btn.dataset.value) || 5;
        starButtons.forEach(b => {
          const val = Number(b.dataset.value);
          b.classList.toggle("active", val <= currentRating);
        });
      });
    });
  }

  if (btnSaveTastingEl) {
    btnSaveTastingEl.addEventListener("click", () => {
      if (!brewDiary) return;
      const state = calc.getState();
      const notes = tastingNotesInputEl ? tastingNotesInputEl.value : "";
      
      brewDiary.addEntry({
        coffeeId: state.coffee.id,
        coffeeName: state.coffee.name,
        coffeeImage: state.coffee.image,
        methodId: state.method.id,
        methodName: state.method.name,
        isIced: state.isIcedActive,
        coffeeGrams: state.coffeeGrams,
        waterMl: state.waterMl,
        hotWaterMl: state.hotWaterMl,
        iceGrams: state.iceGrams,
        ratio: state.ratio,
        intensity: state.intensity,
        taste: currentSelectedTaste,
        rating: currentRating,
        grindName: state.grind.name,
        notes: notes
      });

      showToast("💾 Extração salva no seu Diário de Cafés!");
      btnSaveTastingEl.textContent = "✓ Salvo no Diário!";
      btnSaveTastingEl.disabled = true;
      setTimeout(() => {
        if (btnSaveTastingEl) {
          btnSaveTastingEl.textContent = "💾 Salvar no Meu Diário de Cafés";
          btnSaveTastingEl.disabled = false;
        }
      }, 3000);
    });
  }

  // ==========================================================================
  // 11. BANNER DE INSTALAÇÃO DO APP (PWA ADD TO HOME SCREEN)
  // ==========================================================================
  const pwaInstallBannerEl = document.getElementById("pwaInstallBanner");
  const btnPwaInstallEl = document.getElementById("btnPwaInstall");
  const btnPwaDismissEl = document.getElementById("btnPwaDismiss");
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const dismissed = localStorage.getItem("fuzz_pwa_dismissed") === "true";
    if (!dismissed && pwaInstallBannerEl) {
      pwaInstallBannerEl.style.display = "flex";
    }
  });

  if (btnPwaInstallEl) {
    btnPwaInstallEl.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === "accepted") {
          showToast("🎉 Calculadora Fuzz instalada com sucesso!");
        }
        deferredPrompt = null;
        if (pwaInstallBannerEl) pwaInstallBannerEl.style.display = "none";
      } else {
        // Instrução para iOS Safari
        showToast("📱 No iPhone: toque em Compartilhar ➔ 'Adicionar à Tela de Início'!");
      }
    });
  }

  if (btnPwaDismissEl) {
    btnPwaDismissEl.addEventListener("click", () => {
      if (pwaInstallBannerEl) pwaInstallBannerEl.style.display = "none";
      localStorage.setItem("fuzz_pwa_dismissed", "true");
    });
  }

  // Inicialização dos Blocos Visuais
  renderCoffees();
  renderMethods();
  renderPresets();

  // Registro do Service Worker (PWA Offline)
  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").then(reg => {
        console.log("Fuzz Cafés: PWA Service Worker registrado com sucesso:", reg.scope);
      }).catch(err => {
        console.warn("Fuzz Cafés: Registro do Service Worker indisponível:", err);
      });
    });
  }
});
