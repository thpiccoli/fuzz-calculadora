/**
 * Fuzz Cafés - Módulo do Diário de Extração (Brew Log)
 * 
 * Permite salvar histórico de preparos, avaliar o sabor da xícara com
 * diagnóstico interativo do Mascote Nico e repetir qualquer receita com 1 clique.
 */

const FUZZ_DIARY_STORAGE_KEY = "fuzz_brew_diary";

const NICO_TASTE_DIAGNOSTICS = {
  acid: {
    label: "Ácido / Ralo (Subextraído)",
    badgeClass: "taste-badge--acid",
    emoji: "🍋",
    mascotImg: "assets/mascot/nico-binoculars-badge.png",
    title: "Diagnóstico: Café Subextraído!",
    tip: "A água passou rápido demais ou não conseguiu extrair os açúcares e óleos essenciais do grão. <strong>Dica do Nico:</strong> afine 1 ou 2 cliques no moedor ou aumente a temperatura da água (94°C a 96°C) na próxima vez!"
  },
  balanced: {
    label: "Equilibrado & Delicioso (No Ponto!)",
    badgeClass: "taste-badge--balanced",
    emoji: "✨",
    mascotImg: "assets/mascot/nico-drinking-badge.png",
    title: "Diagnóstico: Extração Perfeita na Mosca! 🎉",
    tip: "Harmonia espetacular entre doçura natural, acidez prazerosa e finalização sedosa. <strong>Dica do Nico:</strong> salve esta receita como favorita e guarde a regulagem do seu moedor!"
  },
  bitter: {
    label: "Amargo / Seco (Superextraído)",
    badgeClass: "taste-badge--bitter",
    emoji: "😖",
    mascotImg: "assets/mascot/nico-compass-badge.png",
    title: "Diagnóstico: Café Superextraído!",
    tip: "Houve contato excessivo com a água ou os finos de moagem secaram a língua (adstringência). <strong>Dica do Nico:</strong> engrosse 1 ou 2 cliques no moedor ou faça despejos mais suaves para acelerar o fluxo."
  }
};

class BrewDiary {
  constructor(storageKey = FUZZ_DIARY_STORAGE_KEY) {
    this.storageKey = storageKey;
    this.entries = this.loadEntries();
    this.listeners = [];
  }

  loadEntries() {
    try {
      if (typeof localStorage === "undefined") return [];
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn("Erro ao carregar diário do localStorage:", e);
      return [];
    }
  }

  saveEntries() {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.storageKey, JSON.stringify(this.entries));
      }
      this.notify();
    } catch (e) {
      console.warn("Erro ao salvar diário no localStorage:", e);
    }
  }

  addEntry({
    coffeeId,
    coffeeName,
    coffeeImage,
    methodId,
    methodName,
    isIced = false,
    coffeeGrams,
    waterMl,
    hotWaterMl = null,
    iceGrams = null,
    ratio,
    intensity = "Equilibrado",
    taste = "balanced", // 'acid' | 'balanced' | 'bitter'
    rating = 5, // 1 a 5
    grindName = "",
    notes = ""
  }) {
    const diag = NICO_TASTE_DIAGNOSTICS[taste] || NICO_TASTE_DIAGNOSTICS.balanced;
    const now = new Date();

    const formattedDate = now.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const formattedTime = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const newEntry = {
      id: "brew_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      timestamp: Date.now(),
      dateStr: `${formattedDate} às ${formattedTime}`,
      coffeeId,
      coffeeName,
      coffeeImage,
      methodId,
      methodName,
      isIced,
      coffeeGrams: Number(coffeeGrams),
      waterMl: Number(waterMl),
      hotWaterMl: hotWaterMl !== null ? Number(hotWaterMl) : null,
      iceGrams: iceGrams !== null ? Number(iceGrams) : null,
      ratio: Number(ratio),
      intensity,
      taste,
      tasteLabel: diag.label,
      tasteEmoji: diag.emoji,
      nicoTip: diag.tip,
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      grindName,
      notes: (notes || "").trim()
    };

    // Insere no topo (mais recente primeiro)
    this.entries.unshift(newEntry);
    this.saveEntries();
    return newEntry;
  }

  deleteEntry(id) {
    this.entries = this.entries.filter(e => e.id !== id);
    this.saveEntries();
  }

  clearAll() {
    this.entries = [];
    this.saveEntries();
  }

  getEntries() {
    return [...this.entries];
  }

  getCount() {
    return this.entries.length;
  }

  subscribe(listener) {
    if (typeof listener === "function") {
      this.listeners.push(listener);
      listener(this.getEntries());
    }
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    const data = this.getEntries();
    this.listeners.forEach(fn => {
      try {
        fn(data);
      } catch (err) {
        console.error("Erro no listener do Diário:", err);
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.BrewDiary = BrewDiary;
  window.NICO_TASTE_DIAGNOSTICS = NICO_TASTE_DIAGNOSTICS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BrewDiary, NICO_TASTE_DIAGNOSTICS };
}
