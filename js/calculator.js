/**
 * Fuzz Cafés - Módulo da Calculadora
 * Gerencia o cálculo bidirecional de proporções (Ratio Água : Café),
 * doses rápidas e intensidades.
 */

class CoffeeCalculator {
  constructor(data) {
    this.data = data;
    this.selectedCoffee = data.coffees[0]; // Padrão: Café Caramelo
    this.selectedMethod = data.methods[0]; // Padrão: Hario V60
    this.ratio = this.selectedMethod.defaultRatio; // 1:15
    this.waterMl = 300; // 300ml padrão
    this.coffeeGrams = this.round(this.waterMl / this.ratio, 1); // 20g
    this.activeInputMode = 'water'; // 'water' ou 'coffee'
    this.listeners = [];
  }

  // Registra ouvintes para atualizar a UI
  subscribe(listener) {
    this.listeners.push(listener);
    this.notify();
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(fn => fn(state));
  }

  getState() {
    const bloomWater = Math.round(this.coffeeGrams * 2.5);
    const firstPour = Math.round((this.waterMl - bloomWater) * 0.5 + bloomWater);
    const finalPour = Math.round(this.waterMl);

    return {
      coffee: this.selectedCoffee,
      method: this.selectedMethod,
      ratio: this.ratio,
      waterMl: Math.round(this.waterMl),
      coffeeGrams: this.round(this.coffeeGrams, 1),
      yieldMl: this.getYieldMl(),
      activeInputMode: this.activeInputMode,
      bloomWater,
      firstPour,
      finalPour,
      steps: this.getCalculatedSteps(),
      intensity: this.getIntensityLabel(),
      grind: this.selectedMethod.grind,
      temp: this.getRecommendedTemp(),
      tempTip: this.getRoastTempTip(),
      totalTime: this.selectedMethod.totalTime
    };
  }

  getYieldMl() {
    const water = Math.round(this.waterMl);
    const coffee = this.coffeeGrams;
    const methodId = this.selectedMethod ? this.selectedMethod.id : "v60";

    if (methodId === "espresso") {
      return water;
    }
    if (methodId === "moka") {
      return Math.max(10, Math.round(water - coffee * 2.2));
    }
    // Métodos coados e imersão: retenção de ~2.0ml por grama de café
    const retention = Math.round(coffee * 2.0);
    return Math.max(10, Math.round(water - retention));
  }

  getRecommendedTemp() {
    const method = this.selectedMethod;
    if (!method) return "92°C a 94°C";
    return method.temp;

    /* NOTA SOBRE FILOSOFIA FUZZ CAFÉS:
     * A Fuzz foca em perfis sensoriais, terroir e doçura natural do grão,
     * não utilizando cor/grau de torra como parâmetro de extração.
     * Mantido comentado para referência futura se necessário:
    const coffee = this.selectedCoffee;
    const roast = coffee ? coffee.roast : "Média";

    if (roast === "Média-Clara" || roast === "Clara") {
      return "93°C a 95°C";
    }
    if (roast === "Média-Escura" || roast === "Escura") {
      return "89°C a 91°C";
    }
    return "91°C a 93°C";
    */
  }

  getRoastTempTip() {
    // Comentado conforme filosofia da Fuzz (sem parâmetro de cor de torra)
    return "";
    /*
    const coffee = this.selectedCoffee;
    const roast = coffee ? coffee.roast : "Média";
    if (roast === "Média-Clara" || roast === "Clara") {
      return "Torra Clara: extrai mais doçura e acidez viva";
    }
    if (roast === "Média-Escura" || roast === "Escura") {
      return "Torra Escura: evita amargor excessivo";
    }
    return "Torra Média: equilíbrio padrão ouro";
    */
  }

  getCalculatedSteps() {
    if (!this.selectedMethod || !Array.isArray(this.selectedMethod.steps)) {
      return [];
    }

    const bloomWater = Math.round(this.coffeeGrams * 2.5);
    const firstPour = Math.round((this.waterMl - bloomWater) * 0.5 + bloomWater);
    const finalPour = Math.round(this.waterMl);
    const coffeeGrams = this.round(this.coffeeGrams, 1);
    const waterMl = Math.round(this.waterMl);
    const methodId = this.selectedMethod.id;

    return this.selectedMethod.steps.map(step => {
      let desc = step.desc;

      // Hario V60
      if (methodId === "v60") {
        if (step.title.includes("Adicionar o Pó")) {
          desc = `Coloque exatamente <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído no filtro, dê leves batidinhas na lateral para nivelar a cama de café e tare a balança.`;
        } else if (step.bloom || step.title.includes("Bloom") || step.title.includes("Pré-infusão")) {
          desc = `Despeje exatamente <strong class="step-value-highlight">${bloomWater}ml</strong> de água quente em espiral sobre o pó. Aguarde 40 segundos para liberar os aromas e dióxido de carbono.`;
        } else if (step.title.includes("1º Despejo")) {
          desc = `Despeje em círculos suaves até a balança marcar cerca de <strong class="step-value-highlight">${firstPour}ml</strong>.`;
        } else if (step.title.includes("2º Despejo") || step.title.includes("Final")) {
          desc = `Complete calmamente até alcançar o volume total de <strong class="step-value-highlight">${finalPour}ml</strong>.`;
        }
      }
      // Prensa Francesa
      else if (methodId === "french-press") {
        if (step.title.includes("Colocar o Pó")) {
          desc = `Adicione os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído grosso no fundo da prensa e coloque sobre a balança tarada.`;
        } else if (step.title.includes("Despejo Total")) {
          desc = `Despeje todos os <strong class="step-value-highlight">${waterMl}ml</strong> de água quente vigorosamente, garantindo que todo o pó fique molhado.`;
        }
      }
      // AeroPress
      else if (methodId === "aeropress") {
        if (step.title.includes("Método Invertido") || step.title.includes("Pó")) {
          desc = `Coloque os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído no tubo da Aeropress e tare a balança.`;
        } else if (step.title.includes("Despejo e Mistura")) {
          desc = `Despeje todos os <strong class="step-value-highlight">${waterMl}ml</strong> de água quente em 15 segundos e mexa com a espátula por 15 segundos.`;
        }
      }
      // Cafeteira Italiana
      else if (methodId === "moka") {
        if (step.title.includes("Água Quente")) {
          desc = `Adicione cerca de <strong class="step-value-highlight">${waterMl}ml</strong> de água já pré-aquecida na caldeira até a altura logo abaixo da válvula de segurança.`;
        } else if (step.title.includes("Encher o Funil")) {
          desc = `Preencha o funil com cerca de <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído até o topo, nivelando sem compactar nem pressionar com força.`;
        }
      }
      // Filtro Tradicional (Melitta)
      else if (methodId === "melitta") {
        if (step.title.includes("Adicionar o Pó")) {
          desc = `Coloque os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído médio, espalhe uniformemente e zere a balança.`;
        } else if (step.bloom || step.title.includes("Pré-infusão")) {
          desc = `Molhe todo o pó com exatamente <strong class="step-value-highlight">${bloomWater}ml</strong> de água e aguarde 40 segundos.`;
        } else if (step.title.includes("Despejos Contínuos")) {
          desc = `Verta a água com calma em movimentos circulares até alcançar o total de <strong class="step-value-highlight">${waterMl}ml</strong>, mantendo um nível constante no filtro.`;
        }
      }
      // Clever Dripper
      else if (methodId === "clever") {
        if (step.title.includes("Água Primeiro ou Café")) {
          desc = `Coloque os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído e despeje todos os <strong class="step-value-highlight">${waterMl}ml</strong> de água com a Clever sobre uma superfície plana (válvula fechada).`;
        }
      }
      // Chemex
      else if (methodId === "chemex") {
        if (step.title.includes("Pó e Bloom")) {
          desc = `Adicione os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café, zere a balança e faça a pré-infusão com exatamente <strong class="step-value-highlight">${bloomWater}ml</strong> de água por 45 segundos.`;
        } else if (step.title.includes("Despejos em Espiral")) {
          desc = `Despeje a água em círculos sem encostar nas laterais do cone até alcançar <strong class="step-value-highlight">${waterMl}ml</strong>.`;
        }
      }
      // Cold Brew
      else if (methodId === "cold-brew") {
        if (step.title.includes("Mistura Inicial")) {
          desc = `Misture os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído muito grosso com <strong class="step-value-highlight">${waterMl}ml</strong> de água fresca filtrada em um recipiente ou jarra de infusão.`;
        }
      }
      // Espresso
      else if (methodId === "espresso") {
        if (step.title.includes("Distribuição e Compactação")) {
          desc = `Distribua os <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído uniformemente no porta-filtro e aperte com o tamper reto a 15-20kg de pressão.`;
        } else if (step.title.includes("Extração sob Pressão")) {
          desc = `Ligue a bomba e cronometre: a bebida deve cair em fio de mel, extraindo cerca de <strong class="step-value-highlight">${waterMl}ml</strong> em 25 a 30 segundos.`;
        }
      }
      // Fallback genérico para métodos futuros
      else {
        if (step.bloom || step.title.includes("Bloom") || step.title.includes("Pré-infusão")) {
          desc = `Despeje exatamente <strong class="step-value-highlight">${bloomWater}ml</strong> de água quente em espiral sobre o pó. Aguarde ${step.duration || 40} segundos para liberar os aromas e dióxido de carbono.`;
        } else if (step.title.includes("1º Despejo")) {
          desc = `Despeje em círculos suaves até a balança marcar cerca de <strong class="step-value-highlight">${firstPour}ml</strong>.`;
        } else if (step.title.includes("2º Despejo") || step.title.includes("Final")) {
          desc = `Complete calmamente até alcançar o volume total de <strong class="step-value-highlight">${finalPour}ml</strong>.`;
        } else if (step.title.includes("Pó")) {
          desc = `Coloque <strong class="step-value-highlight">${coffeeGrams}g</strong> de café moído e prepare para a extração.`;
        }
      }

      return {
        ...step,
        desc
      };
    });
  }

  // Atualização a partir do volume de água desejado
  setWaterMl(ml) {
    const val = Math.max(1, Math.min(3000, Number(ml) || 0));
    this.waterMl = val;
    this.coffeeGrams = this.round(this.waterMl / this.ratio, 1);
    this.activeInputMode = 'water';
    this.notify();
  }

  // Atualização a partir do peso de café disponível
  setCoffeeGrams(grams) {
    const val = Math.max(0.5, Math.min(250, Number(grams) || 0));
    this.coffeeGrams = val;
    this.waterMl = Math.round(this.coffeeGrams * this.ratio);
    this.activeInputMode = 'coffee';
    this.notify();
  }

  // Atualiza a proporção personalizada (Ratio: 1:X)
  setRatio(newRatio) {
    const r = Math.max(1, Math.min(30, Number(newRatio)));
    this.ratio = r;
    if (this.activeInputMode === 'coffee') {
      this.waterMl = Math.round(this.coffeeGrams * this.ratio);
    } else {
      this.coffeeGrams = this.round(this.waterMl / this.ratio, 1);
    }
    this.notify();
  }

  // Seleciona um café da Fuzz
  selectCoffee(coffeeId) {
    const found = this.data.coffees.find(c => c.id === coffeeId);
    if (found) {
      this.selectedCoffee = found;
      // Se o café tiver uma proporção sugerida e o método estiver no padrão, podemos harmonizar
      this.notify();
    }
  }

  // Seleciona o método de preparo
  selectMethod(methodId) {
    const found = this.data.methods.find(m => m.id === methodId);
    if (found) {
      this.selectedMethod = found;
      this.ratio = found.defaultRatio;
      if (this.activeInputMode === 'coffee') {
        this.waterMl = Math.round(this.coffeeGrams * this.ratio);
      } else {
        this.coffeeGrams = this.round(this.waterMl / this.ratio, 1);
      }
      this.notify();
    }
  }

  // Atalhos de intensidade (Suave, Equilibrado, Encorpado)
  setIntensityLevel(level) {
    const baseRatio = this.selectedMethod.defaultRatio;
    if (level === 'suave') {
      this.setRatio(baseRatio + 2);
    } else if (level === 'equilibrado') {
      this.setRatio(baseRatio);
    } else if (level === 'encorpado') {
      this.setRatio(Math.max(1, baseRatio - 2));
    }
  }

  getIntensityLabel() {
    const base = this.selectedMethod.defaultRatio;
    const diff = this.ratio - base;
    if (diff >= 1.5) return 'Suave / Floral';
    if (diff <= -1.5) return 'Encorpado / Marcante';
    return 'Equilibrado (Padrão Fuzz)';
  }

  // Aplica predefinição rápida de volume
  applyPreset(waterMl) {
    this.setWaterMl(waterMl);
  }

  round(num, decimals = 1) {
    const factor = Math.pow(10, decimals);
    return Math.round((num + Number.EPSILON) * factor) / factor;
  }
}
