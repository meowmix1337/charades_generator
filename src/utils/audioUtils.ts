// Play bell sound for round end
export function playAlarmSound() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();

    // Bell sound with harmonics
    const frequencies = [880, 1320, 1760]; // A5 and harmonics for bell-like sound

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      // Different gain levels for harmonics
      const initialGain = index === 0 ? 0.4 : 0.2 / (index + 1);
      gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    });

    // Second "ding" after a short pause
    setTimeout(() => {
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        const initialGain = index === 0 ? 0.4 : 0.2 / (index + 1);
        gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1.5);
      });
    }, 300);
  } catch (error) {
    console.error('Failed to play alarm sound:', error);
  }
}

// Play a single beep for countdown
export function playCountdownBeep() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600; // Higher frequency for countdown beep
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (error) {
    console.error('Failed to play countdown beep:', error);
  }
}

// Play alerting start beep for final countdown
export function playStartBeep() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();

    // First high tone
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    oscillator1.frequency.value = 800; // Higher and louder
    oscillator1.type = 'sine';
    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.2);

    // Second even higher tone for emphasis
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 1000; // Even higher
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.35, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 0.25);
    }, 100);
  } catch (error) {
    console.error('Failed to play start beep:', error);
  }
}

// Play skip button sound (descending tones for "moving on" feel)
export function playSkipSound() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Descending frequency sweep from 500Hz to 350Hz
    oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(350, audioContext.currentTime + 0.15);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (error) {
    console.error('Failed to play skip sound:', error);
  }
}

// Play correct button sound (bell-like with harmonics)
export function playCorrectSound() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();

    // Bell sound with harmonics - brighter, more celebratory
    const frequencies = [1047, 1568, 2093]; // C6 and harmonics for bright bell-like sound

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      // Louder and different gain levels for harmonics
      const initialGain = index === 0 ? 0.5 : 0.25 / (index + 1);
      gainNode.gain.setValueAtTime(initialGain, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    });
  } catch (error) {
    console.error('Failed to play correct sound:', error);
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
