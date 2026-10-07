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
      activeInputMode: this.activeInputMode,
      bloomWater,
      firstPour,
      finalPour,
      intensity: this.getIntensityLabel(),
      grind: this.selectedMethod.grind,
      temp: this.selectedMethod.temp,
      totalTime: this.selectedMethod.totalTime
    };
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
