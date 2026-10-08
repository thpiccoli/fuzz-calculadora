/**
 * Fuzz Cafés - Aplicação Principal (App)
 * Gerenciamento de eventos, DOM, reatividade e renderização.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Instâncias dos controladores
  const calc = new CoffeeCalculator(FUZZ_DATA);
  const timer = new BrewTimer();

  // Estado local da UI
  let activeCategoryFilter = "todos";

  // Elementos do DOM
  const coffeeGridEl = document.getElementById("coffeeGrid");
  const methodsGridEl = document.getElementById("methodsGrid");
  const presetsContainerEl = document.getElementById("presetsContainer");
  const categoryFiltersEl = document.getElementById("categoryFilters");

  // Inputs da Calculadora
  const waterInputEl = document.getElementById("waterInput");
  const coffeeInputEl = document.getElementById("coffeeInput");
  const waterBoxEl = document.getElementById("waterBox");
  const coffeeBoxEl = document.getElementById("coffeeBox");
  const ratioSliderEl = document.getElementById("ratioSlider");
  const ratioValueDisplayEl = document.getElementById("ratioValueDisplay");
  const intensityButtonsEl = document.querySelectorAll(".intensity-btn");

  // Botões de Stepper
  const waterStepMinusEl = document.getElementById("waterStepMinus");
  const waterStepPlusEl = document.getElementById("waterStepPlus");
  const coffeeStepMinusEl = document.getElementById("coffeeStepMinus");
  const coffeeStepPlusEl = document.getElementById("coffeeStepPlus");

  // Card de Resumo (Coluna Direita)
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

  // Seção de Passos
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

  // Menu Mobile
  const mobileMenuToggleEl = document.getElementById("mobileMenuToggle");
  const mobileNavDrawerEl = document.getElementById("mobileNavDrawer");
  const mobileNavCloseEl = document.getElementById("mobileNavClose");

  // Barra Flutuante Mobile
  const mobileStickyBarEl = document.getElementById("mobileStickyBar");
  const mobileStickyWaterEl = document.getElementById("mobileStickyWater");
  const mobileStickyCoffeeEl = document.getElementById("mobileStickyCoffee");
  const mobileStickyMethodEl = document.getElementById("mobileStickyMethod");
  const mobileStickyRatioEl = document.getElementById("mobileStickyRatio");
  const mobileStickyBtnEl = document.getElementById("mobileStickyBtn");
  const mobileStickyInfoEl = document.getElementById("mobileStickyInfo");

  // Controles do Carrossel e Navegação entre Passos
  const coffeeScrollWrapperEl = document.getElementById("coffeeScrollWrapper");
  const coffeePrevBtnEl = document.getElementById("coffeePrevBtn");
  const coffeeNextBtnEl = document.getElementById("coffeeNextBtn");
  const btnGotoSummaryEl = document.getElementById("btnGotoSummary");

  // Animação de rolagem com aceleração e desaceleração suave (easeInOutCubic)
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

  // Função auxiliar para rolar suavemente até o próximo passo com feedback visual
  function scrollToStep(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const headerHeight = 85;
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - headerHeight);
    
    smoothScrollTo(targetY, 800);

    // Destaque luminoso sutil ao chegar na etapa de destino
    el.classList.remove("step-arrival-glow");
    void el.offsetWidth; // Força reflow para reiniciar animação
    el.classList.add("step-arrival-glow");
  }

  // --------------------------------------------------------------------------
  // Renderizadores de Componentes
  // --------------------------------------------------------------------------

  // Renderiza os Cafés da Fuzz
  function renderCoffees() {
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

    // Adiciona eventos de clique aos cards com avanço suave automático
    coffeeGridEl.querySelectorAll(".coffee-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.coffeeId;
        calc.selectCoffee(id);
        renderCoffees();
        // Avança suavemente para o Passo 2 (Métodos) com tempo para ver a seleção
        setTimeout(() => scrollToStep("sectionMethods"), 450);
      });
    });
  }

  // Mapeamento e obtenção dos ícones ilustrados para cada método
  function getMethodIconSvg(methodId) {
    if (typeof METHOD_ICONS !== "undefined" && METHOD_ICONS[methodId]) {
      return METHOD_ICONS[methodId];
    }
    return `<img src="assets/methods/${methodId}.png" alt="${methodId}" class="method-img" loading="lazy" />`;
  }

  // Dicas do Mascote Nico para cada Método
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
      void boxEl.offsetWidth; // trigger reflow
      boxEl.classList.add("nico-tip-pulse");
    }
  }

  // Renderiza Métodos de Preparo com Ilustrações Realistas
  function renderMethods() {
    methodsGridEl.innerHTML = FUZZ_DATA.methods.map(m => {
      const isSelected = calc.selectedMethod.id === m.id;
      const iconSvg = getMethodIconSvg(m.id);

      return `
        <button type="button" class="method-btn ${isSelected ? 'selected' : ''}" data-method-id="${m.id}" title="${m.name} - ${m.shortDesc}">
          <span class="method-icon">${iconSvg}</span>
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
        // Dá tempo para o usuário ler a dica do Nico antes de rolar suavemente
        setTimeout(() => scrollToStep("sectionInputs"), 950);
      });
    });
  }

  // Renderiza Doses Rápidas (Presets)
  function renderPresets() {
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
        // Avança suavemente para o Resultado (Ficha de Extração)
        setTimeout(() => scrollToStep("sectionSummary"), 400);
      });
    });
  }

  // Renderiza Passos do Método Atual Adaptados às Quantidades
  function renderMethodSteps(state) {
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

  // --------------------------------------------------------------------------
  // Atualização Reativa do Estado da Calculadora
  // --------------------------------------------------------------------------
  calc.subscribe(state => {
    // Atualiza Inputs sem causar loops se o usuário estiver digitando
    if (document.activeElement !== waterInputEl) {
      waterInputEl.value = state.waterMl;
    }
    if (document.activeElement !== coffeeInputEl) {
      coffeeInputEl.value = state.coffeeGrams;
    }

    // Marca visualmente qual campo orientou o cálculo
    if (state.activeInputMode === "coffee") {
      coffeeBoxEl.classList.add("active-mode");
      waterBoxEl.classList.remove("active-mode");
    } else {
      waterBoxEl.classList.add("active-mode");
      coffeeBoxEl.classList.remove("active-mode");
    }

    // Atualiza Slider e proporção
    ratioSliderEl.min = state.method.minRatio;
    ratioSliderEl.max = state.method.maxRatio;
    ratioSliderEl.value = state.ratio;
    ratioValueDisplayEl.textContent = `1 : ${state.ratio}`;

    // Atualiza botões de intensidade
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

    // Atualiza Card de Resumo (Coluna Direita)
    if (summaryCoffeeImgEl && state.coffee.image) {
      summaryCoffeeImgEl.src = state.coffee.image;
      summaryCoffeeImgEl.alt = state.coffee.name;
    }
    summaryCoffeeNameEl.textContent = state.coffee.name;
    summaryCoffeeBadgeEl.textContent = state.coffee.subtitle;
    summaryCoffeeNotesEl.innerHTML = state.coffee.notes.map(n => `<span class="flavor-stamp">● ${n}</span>`).join("");
    summaryMethodNameEl.textContent = state.method.name;
    if (summaryMethodIconEl) {
      summaryMethodIconEl.innerHTML = getMethodIconSvg(state.method.id);
    }

    // Atualiza fala do Nico sobre a proporção
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

    summaryWaterMlEl.textContent = `${state.waterMl} ml`;
    summaryCoffeeGramsEl.textContent = `${state.coffeeGrams} g`;
    summaryBloomWaterEl.textContent = `${state.bloomWater} ml`;
    summaryRatioDisplayEl.textContent = `1 : ${state.ratio} (${state.intensity})`;

    summaryGrindNameEl.textContent = `${state.grind.name} (${state.grind.description})`;
    summaryTempEl.textContent = state.temp;
    summaryTimeEl.textContent = state.totalTime;

    summaryShopLinkEl.href = state.coffee.shopUrl || "https://www.fuzzcafes.com.br/";
    summaryShopLinkEl.textContent = `Comprar ${state.coffee.name} na Fuzz Cafés ↗`;

    // Atualiza Barra Flutuante Mobile
    if (mobileStickyWaterEl) mobileStickyWaterEl.textContent = `${state.waterMl}ml`;
    if (mobileStickyCoffeeEl) mobileStickyCoffeeEl.textContent = `${state.coffeeGrams}g`;
    if (mobileStickyMethodEl) mobileStickyMethodEl.textContent = state.method.name;
    if (mobileStickyRatioEl) mobileStickyRatioEl.textContent = `1:${state.ratio}`;

    // Atualiza passos adaptados
    renderMethodSteps(state);
    renderPresets();
  });

  // --------------------------------------------------------------------------
  // Eventos de Entrada e Controles da Calculadora
  // --------------------------------------------------------------------------

  // Alteração de Volume de Água
  waterInputEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      calc.setWaterMl(val);
    }
  });

  // Alteração de Gramas de Café
  coffeeInputEl.addEventListener("input", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      calc.setCoffeeGrams(val);
    }
  });

  // Steppers de Água (+50ml / -50ml)
  waterStepMinusEl.addEventListener("click", () => {
    calc.setWaterMl(Math.max(50, calc.waterMl - 50));
  });
  waterStepPlusEl.addEventListener("click", () => {
    calc.setWaterMl(calc.waterMl + 50);
  });

  // Steppers de Café (+1g / -1g)
  coffeeStepMinusEl.addEventListener("click", () => {
    calc.setCoffeeGrams(Math.max(5, calc.coffeeGrams - 1));
  });
  coffeeStepPlusEl.addEventListener("click", () => {
    calc.setCoffeeGrams(calc.coffeeGrams + 1);
  });

  // Slider de Proporção
  ratioSliderEl.addEventListener("input", (e) => {
    calc.setRatio(Number(e.target.value));
  });

  // Botões de Intensidade (Suave, Equilibrado, Encorpado)
  intensityButtonsEl.forEach(btn => {
    btn.addEventListener("click", () => {
      calc.setIntensityLevel(btn.dataset.intensity);
    });
  });

  // Filtros de Categoria de Café
  categoryFiltersEl.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFiltersEl.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.dataset.category;
      renderCoffees();
    });
  });

  // --------------------------------------------------------------------------
  // Cronômetro Interativo (Brew Timer Modal)
  // --------------------------------------------------------------------------
  btnOpenTimerEl.addEventListener("click", () => {
    const state = calc.getState();
    timerMethodTagEl.textContent = `${state.method.name} • ${state.coffee.name}`;
    timerModalOverlayEl.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  function closeTimerModal() {
    timer.pause();
    timerModalOverlayEl.classList.remove("open");
    document.body.style.overflow = "";
  }

  btnCloseTimerEl.addEventListener("click", closeTimerModal);

  // Fecha clicando fora do card
  timerModalOverlayEl.addEventListener("click", (e) => {
    if (e.target === timerModalOverlayEl) {
      closeTimerModal();
    }
  });

  // Fecha o cronômetro ao pressionar a tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && timerModalOverlayEl.classList.contains("open")) {
      closeTimerModal();
    }
  });

  btnTimerStartEl.addEventListener("click", () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  });

  btnTimerResetEl.addEventListener("click", () => {
    timer.reset();
  });

  btnTimerPrevStepEl.addEventListener("click", () => {
    timer.skipPrev();
  });

  btnTimerNextStepBtnEl.addEventListener("click", () => {
    timer.skipNext();
  });

  // Reatividade do Cronômetro
  timer.subscribe(tState => {
    timerDisplayEl.textContent = tState.formattedTime;
    btnTimerStartEl.textContent = tState.isRunning ? "Pausar" : (tState.seconds > 0 ? "Retomar" : "Iniciar");

    // Barra de progresso
    if (timerProgressBarEl) {
      timerProgressBarEl.style.width = `${tState.progressPercent}%`;
    }

    // Badge e tempo restante do passo atual
    if (timerStepBadgeEl) {
      timerStepBadgeEl.textContent = `Etapa ${tState.currentStepIndex + 1} de ${tState.totalSteps}`;
    }
    if (timerStepRemainingEl) {
      timerStepRemainingEl.textContent = tState.isFinished ? "Concluído" : `${tState.formattedStepRemaining} restante`;
    }

    // Atualiza mascote Nico no Cronômetro
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

    if (tState.currentStep) {
      timerStepTitleEl.textContent = tState.currentStep.title;
      timerStepDescEl.textContent = tState.currentStep.desc;
    } else if (tState.isFinished) {
      timerStepTitleEl.textContent = "Extração Concluída! 🎉";
      timerStepDescEl.textContent = "Seu café Fuzz está pronto para ser degustado. Bom proveito!";
    }

    // Prévia do próximo passo
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

  // --------------------------------------------------------------------------
  // Cópia da Receita para Área de Transferência
  // --------------------------------------------------------------------------
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

  function showToast(msg) {
    fuzzToastEl.querySelector(".toast-message").textContent = msg;
    fuzzToastEl.classList.add("show");
    setTimeout(() => {
      fuzzToastEl.classList.remove("show");
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // Menu Mobile Drawer
  // --------------------------------------------------------------------------
  if (mobileMenuToggleEl && mobileNavDrawerEl) {
    mobileMenuToggleEl.addEventListener("click", () => {
      mobileNavDrawerEl.classList.add("open");
      document.body.style.overflow = "hidden";
    });
    
    function closeMobileDrawer() {
      mobileNavDrawerEl.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (mobileNavCloseEl) {
      mobileNavCloseEl.addEventListener("click", closeMobileDrawer);
    }

    mobileNavDrawerEl.addEventListener("click", (e) => {
      if (e.target === mobileNavDrawerEl) {
        closeMobileDrawer();
      }
    });

    mobileNavDrawerEl.querySelectorAll(".mobile-drawer-link").forEach(link => {
      link.addEventListener("click", closeMobileDrawer);
    });
  }

  // --------------------------------------------------------------------------
  // Barra Flutuante Mobile - Eventos de Ação Rápida
  // --------------------------------------------------------------------------
  if (mobileStickyBtnEl) {
    mobileStickyBtnEl.addEventListener("click", () => {
      btnOpenTimerEl.click();
    });
  }

  if (mobileStickyInfoEl) {
    mobileStickyInfoEl.addEventListener("click", () => {
      scrollToStep("sectionSummary");
    });
  }

  // Controles de rolagem por setas do Carrossel de Cafés
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

  // Botão de avançar para o resumo a partir das quantidades
  if (btnGotoSummaryEl) {
    btnGotoSummaryEl.addEventListener("click", () => {
      scrollToStep("sectionSummary");
    });
  }

  // --------------------------------------------------------------------------
  // Ações de Navegação Desktop & Atalhos Rápidos
  // --------------------------------------------------------------------------
  const btnHeroStartEl = document.getElementById("btnHeroStart");
  const btnHeroTimerEl = document.getElementById("btnHeroTimer");
  const btnRestartRecipeEl = document.getElementById("btnRestartRecipe");
  const btnStepTimerEl = document.getElementById("btnStepTimer");
  const btnStepRestartEl = document.getElementById("btnStepRestart");
  const desktopScrollTopBtnEl = document.getElementById("desktopScrollTopBtn");

  // Botão do Hero: Começar a Preparar (leva direto ao Passo 1)
  if (btnHeroStartEl) {
    btnHeroStartEl.addEventListener("click", () => {
      scrollToStep("sectionGrains");
    });
  }

  // Botão do Hero: Abrir Cronômetro Direto
  if (btnHeroTimerEl) {
    btnHeroTimerEl.addEventListener("click", () => {
      btnOpenTimerEl.click();
    });
  }

  // Botão da Ficha de Extração: Recomeçar / Trocar Grão
  if (btnRestartRecipeEl) {
    btnRestartRecipeEl.addEventListener("click", () => {
      scrollToStep("sectionGrains");
    });
  }

  // Botão ao final das Instruções (Passo 4): Iniciar Cronômetro
  if (btnStepTimerEl) {
    btnStepTimerEl.addEventListener("click", () => {
      btnOpenTimerEl.click();
    });
  }

  // Botão ao final das Instruções (Passo 4): Voltar ao Passo 1
  if (btnStepRestartEl) {
    btnStepRestartEl.addEventListener("click", () => {
      scrollToStep("sectionGrains");
    });
  }

  // Botão Flutuante Desktop: Voltar ao Topo
  if (desktopScrollTopBtnEl) {
    desktopScrollTopBtnEl.addEventListener("click", () => {
      smoothScrollTo(0, 850);
    });

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 380) {
        desktopScrollTopBtnEl.classList.add("visible");
      } else {
        desktopScrollTopBtnEl.classList.remove("visible");
      }
    }, { passive: true });
  }

  // Inicialização inicial dos blocos
  renderCoffees();
  renderMethods();
  renderPresets();
});
