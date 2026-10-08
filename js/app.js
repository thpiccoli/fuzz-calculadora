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
  const summaryBloomWaterEl = document.getElementById("summaryBloomWater");
  const summaryRatioDisplayEl = document.getElementById("summaryRatioDisplay");
  const summaryGrindNameEl = document.getElementById("summaryGrindName");
  const summaryTempEl = document.getElementById("summaryTemp");
  const summaryTimeEl = document.getElementById("summaryTime");
  const summaryShopLinkEl = document.getElementById("summaryShopLink");

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
  const timerNextStepEl = document.getElementById("timerNextStep");
  const btnTimerStartEl = document.getElementById("btnTimerStart");
  const btnTimerResetEl = document.getElementById("btnTimerReset");
  const btnTimerPrevStepEl = document.getElementById("btnTimerPrevStep");
  const btnTimerNextStepBtnEl = document.getElementById("btnTimerNextStepBtn");

  // Toast e Cópia
  const btnCopyRecipeEl = document.getElementById("btnCopyRecipe");
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
            <p class="coffee-card__subtitle">${c.species} &bull; Torra ${c.roast}</p>
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

    const steps = state.method.steps;
    timer.setSteps(steps);

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
      let dynamicDesc = s.desc;
      if (s.bloom) {
        dynamicDesc = `Despeje exatamente ${state.bloomWater}ml de água quente em espiral sobre o pó. Aguarde 40 segundos para liberar os aromas e dióxido de carbono.`;
      } else if (s.title.includes("1º Despejo")) {
        dynamicDesc = `Despeje em círculos suaves até a balança marcar cerca de ${state.firstPour}ml.`;
      } else if (s.title.includes("2º Despejo") || s.title.includes("Final")) {
        dynamicDesc = `Complete calmamente até alcançar o volume total de ${state.finalPour}ml.`;
      }

      return `
        <div class="step-item">
          <div class="step-item__icon">${idx + 1}</div>
          <div class="step-item__content">
            <h4>${s.title}</h4>
            <p>${dynamicDesc}</p>
          </div>
        </div>
      `;
    }).join("");

    methodStepsContainerEl.innerHTML = tipBanner + stepsHtml;
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

    if (summaryWaterMlEl) summaryWaterMlEl.textContent = `${state.waterMl} ml`;
    if (summaryCoffeeGramsEl) summaryCoffeeGramsEl.textContent = `${state.coffeeGrams} g`;
    if (summaryBloomWaterEl) summaryBloomWaterEl.textContent = `${state.bloomWater} ml`;
    if (summaryRatioDisplayEl) summaryRatioDisplayEl.textContent = `1 : ${state.ratio} (${state.intensity})`;

    if (summaryGrindNameEl) summaryGrindNameEl.textContent = `${state.grind.name} (${state.grind.description})`;
    if (summaryTempEl) summaryTempEl.textContent = state.temp;
    if (summaryTimeEl) summaryTimeEl.textContent = state.totalTime;

    if (summaryShopLinkEl) {
      summaryShopLinkEl.href = state.coffee.shopUrl || "https://www.fuzzcafes.com.br/";
      summaryShopLinkEl.textContent = `Comprar ${state.coffee.name} na Fuzz Cafés ↗`;
    }

    // Barra Flutuante Mobile
    if (mobileStickyWaterEl) mobileStickyWaterEl.textContent = `${state.waterMl}ml`;
    if (mobileStickyCoffeeEl) mobileStickyCoffeeEl.textContent = `${state.coffeeGrams}g`;
    if (mobileStickyMethodEl) mobileStickyMethodEl.textContent = state.method.name;
    if (mobileStickyRatioEl) mobileStickyRatioEl.textContent = `1:${state.ratio}`;

    // Atualiza passos adaptados e presets ativos
    renderMethodSteps(state);
    renderPresets();
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

  function openTimerModal() {
    if (!timerModalOverlayEl) return;
    const state = calc.getState();
    if (timerMethodTagEl) {
      timerMethodTagEl.textContent = `${state.method.name} • ${state.coffee.name}`;
    }
    timerModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeTimerModal() {
    if (!timerModalOverlayEl) return;
    timer.pause();
    timerModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (btnOpenTimerEl) btnOpenTimerEl.addEventListener("click", openTimerModal);
  if (btnCloseTimerEl) btnCloseTimerEl.addEventListener("click", closeTimerModal);

  if (timerModalOverlayEl) {
    timerModalOverlayEl.addEventListener("click", (e) => {
      if (e.target === timerModalOverlayEl) closeTimerModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && timerModalOverlayEl && timerModalOverlayEl.classList.contains("open")) {
      closeTimerModal();
    }
  });

  if (btnTimerStartEl) {
    btnTimerStartEl.addEventListener("click", () => {
      if (timer.isRunning) {
        timer.pause();
      } else {
        timer.start();
      }
    });
  }

  if (btnTimerResetEl) btnTimerResetEl.addEventListener("click", () => timer.reset());
  if (btnTimerPrevStepEl) btnTimerPrevStepEl.addEventListener("click", () => timer.skipPrev());
  if (btnTimerNextStepBtnEl) btnTimerNextStepBtnEl.addEventListener("click", () => timer.skipNext());

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
        timerStepDescEl.textContent = tState.currentStep.desc;
      } else if (tState.isFinished) {
        timerStepTitleEl.textContent = "Extração Concluída! 🎉";
        timerStepDescEl.textContent = "Seu café Fuzz está pronto para ser degustado. Bom proveito!";
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
  });

  // ==========================================================================
  // 9. UTILITÁRIOS DA INTERFACE (CÓPIA, TOAST, MENU MOBILE, BARRA FIXA)
  // ==========================================================================

  function showToast(msg) {
    if (!fuzzToastEl) return;
    fuzzToastEl.querySelector(".toast-message").textContent = msg;
    fuzzToastEl.classList.add("show");
    setTimeout(() => {
      fuzzToastEl.classList.remove("show");
    }, 3200);
  }

  // Cópia da Receita Formatada
  if (btnCopyRecipeEl) {
    btnCopyRecipeEl.addEventListener("click", () => {
      const state = calc.getState();
      const recipeText = `☕ RECEITA DE PREPARO - FUZZ CAFÉS
Grão: ${state.coffee.name} (${state.coffee.subtitle})
Método: ${state.method.name}
Volume de Água: ${state.waterMl} ml
Pó de Café: ${state.coffeeGrams} g (Proporção 1:${state.ratio})
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

  // Inicialização dos Blocos Visuais
  renderCoffees();
  renderMethods();
  renderPresets();
});
