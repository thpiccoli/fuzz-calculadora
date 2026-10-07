/**
 * Fuzz Cafés - Cronômetro Interativo de Preparo (Brew Timer)
 * Auxilia o usuário passo a passo com contagem regressiva e alertas sonoros.
 */

class BrewTimer {
  constructor() {
    this.isRunning = false;
    this.seconds = 0;
    this.timerInterval = null;
    this.currentStepIndex = 0;
    this.steps = [];
    this.listeners = [];
    this.audioCtx = null;
  }

  setSteps(steps) {
    this.steps = steps || [];
    this.reset();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    this.notify();
  }

  notify() {
    const totalDuration = this.getTotalDuration();
    const progressPercent = totalDuration > 0 ? Math.min(100, Math.round((this.seconds / totalDuration) * 100)) : 0;
    
    // Calcula tempo restante do passo atual
    const stepRemaining = this.getStepRemainingSeconds();
    const nextStep = this.steps[this.currentStepIndex + 1] || null;

    const state = {
      isRunning: this.isRunning,
      seconds: this.seconds,
      formattedTime: this.formatTime(this.seconds),
      currentStepIndex: this.currentStepIndex,
      currentStep: this.steps[this.currentStepIndex] || null,
      nextStep: nextStep,
      stepRemainingSeconds: stepRemaining,
      formattedStepRemaining: this.formatTime(stepRemaining),
      progressPercent: progressPercent,
      steps: this.steps,
      totalSteps: this.steps.length,
      isFinished: this.isFinished()
    };
    this.listeners.forEach(fn => fn(state));
  }

  getTotalDuration() {
    return this.steps.reduce((acc, s) => acc + (s.duration || 30), 0);
  }

  getStepRemainingSeconds() {
    if (!this.steps || this.steps.length === 0) return 0;
    let accumulated = 0;
    for (let i = 0; i <= this.currentStepIndex; i++) {
      accumulated += (this.steps[i].duration || 30);
    }
    const remaining = Math.max(0, accumulated - this.seconds);
    return remaining;
  }

  formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  start() {
    if (this.isRunning) return;
    this.initAudio();
    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      this.seconds++;
      this.updateStepIndex();
      this.notify();
    }, 1000);
    this.notify();
  }

  pause() {
    if (!this.isRunning) return;
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.notify();
  }

  reset() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.seconds = 0;
    this.currentStepIndex = 0;
    this.notify();
  }

  // Avança manualmente para o próximo passo
  skipNext() {
    if (this.currentStepIndex < this.steps.length - 1) {
      let accumulated = 0;
      for (let i = 0; i <= this.currentStepIndex; i++) {
        accumulated += (this.steps[i].duration || 30);
      }
      this.seconds = accumulated;
      this.currentStepIndex++;
      this.playChime();
      this.notify();
    }
  }

  // Volta para o início do passo atual ou anterior
  skipPrev() {
    if (this.currentStepIndex > 0) {
      let accumulated = 0;
      for (let i = 0; i < this.currentStepIndex - 1; i++) {
        accumulated += (this.steps[i].duration || 30);
      }
      this.seconds = accumulated;
      this.currentStepIndex--;
      this.notify();
    } else {
      this.seconds = 0;
      this.notify();
    }
  }

  updateStepIndex() {
    if (!this.steps || this.steps.length === 0) return;
    
    let accumulated = 0;
    let newIndex = 0;
    
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i];
      const dur = step.duration || 30;
      if (this.seconds >= accumulated && this.seconds < accumulated + dur) {
        newIndex = i;
        break;
      }
      accumulated += dur;
      if (i === this.steps.length - 1 && this.seconds >= accumulated) {
        newIndex = i;
      }
    }

    if (newIndex !== this.currentStepIndex) {
      this.currentStepIndex = newIndex;
      this.playChime();
    }
  }

  isFinished() {
    if (!this.steps || this.steps.length === 0) return false;
    const total = this.getTotalDuration();
    return this.seconds >= total && total > 0;
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playChime() {
    try {
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.4);
    } catch (e) {
      // Navegador com áudio bloqueado
    }
  }
}
