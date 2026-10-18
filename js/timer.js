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
    this.isMuted = false;
    this.hasPlayedFinishedFanfare = false;
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
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
      isMuted: this.isMuted,
      isVoiceEnabled: this.isVoiceEnabled,
      hasWakeLock: !!this.wakeLock,
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

  async requestWakeLock() {
    if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          this.wakeLock = null;
        });
      } catch (err) {
        this.wakeLock = null;
      }
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      try {
        this.wakeLock.release().catch(() => {});
      } catch (e) {}
      this.wakeLock = null;
    }
  }

  start() {
    if (this.isRunning) return;
    this.initAudio();
    this.requestWakeLock();
    this.isRunning = true;

    this.timerInterval = setInterval(() => {
      this.seconds++;
      this.checkCountdownBeep();
      this.updateStepIndex();
      this.notify();
    }, 1000);
    this.notify();
  }

  pause() {
    if (!this.isRunning) return;
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.releaseWakeLock();
    this.notify();
  }

  reset() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.seconds = 0;
    this.currentStepIndex = 0;
    this.hasPlayedFinishedFanfare = false;
    this.releaseWakeLock();
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
      this.triggerVibration([60, 40, 60]);
      this.notify();
    } else if (this.currentStepIndex === this.steps.length - 1 && !this.isFinished()) {
      this.seconds = this.getTotalDuration();
      if (!this.hasPlayedFinishedFanfare) {
        this.hasPlayedFinishedFanfare = true;
        this.playFinishedFanfare();
        this.triggerVibration([100, 50, 100, 50, 250]);
        this.releaseWakeLock();
      }
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
      this.triggerVibration([60, 40, 60]);
    }

    if (this.isFinished() && !this.hasPlayedFinishedFanfare) {
      this.hasPlayedFinishedFanfare = true;
      this.playFinishedFanfare();
      this.triggerVibration([100, 50, 100, 50, 250]);
      this.releaseWakeLock();
    }
  }

  checkCountdownBeep() {
    if (this.isMuted || !this.steps || this.steps.length === 0) return;
    const remaining = this.getStepRemainingSeconds();
    const currentStep = this.steps[this.currentStepIndex];
    const duration = currentStep ? (currentStep.duration || 0) : 0;
    
    // Toca bip preventivo sonoro aos 5s, 4s, 3s, 2s e 1s (para dar tempo de pegar o bule)
    if (duration > 6 && remaining >= 1 && remaining <= 5) {
      this.playCountdownBeep(remaining);
      const vibeDuration = remaining <= 2 ? 45 : 30;
      this.triggerVibration(vibeDuration);
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

  playCountdownBeep(remaining) {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      
      // Tom suave ascendente progressivo (5s -> 440Hz, 4s -> 494Hz, 3s -> 554Hz, 2s -> 622Hz, 1s -> 740Hz)
      const frequencies = {
        5: 440,
        4: 494,
        3: 554,
        2: 622,
        1: 740
      };
      const freq = frequencies[remaining] || 520;
      const volume = remaining === 1 ? 0.12 : (remaining === 2 ? 0.10 : 0.08);

      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.14);
    } catch (e) {}
  }

  playChime() {
    if (this.isMuted) return;
    try {
      this.initAudio();
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

  triggerVibration(pattern) {
    try {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch (e) {}
  }

  playFinishedFanfare() {
    if (this.isMuted) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Fanfarra comemorativa de Café Pronto: arpejo triunfal C5 -> E5 -> G5 -> C6
      const notes = [
        { freq: 523.25, time: 0.00, dur: 0.22 }, // C5 (Dó)
        { freq: 659.25, time: 0.16, dur: 0.22 }, // E5 (Mi)
        { freq: 783.99, time: 0.32, dur: 0.28 }, // G5 (Sol)
        { freq: 1046.50, time: 0.50, dur: 0.85 } // C6 (Dó agudo com sustentação prolongada)
      ];

      const now = this.audioCtx.currentTime;

      notes.forEach(note => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle'; // Timbre doce de sino
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        gain.gain.setValueAtTime(0.001, now + note.time);
        gain.gain.linearRampToValueAtTime(0.24, now + note.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + note.time);
        osc.stop(now + note.time + note.dur);
      });
    } catch (e) {}
  }
}
