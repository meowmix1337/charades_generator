// Generate a beep sound using Web Audio API
export function playAlarmSound() {
  try {
    const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);

    // Play three beeps
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      oscillator2.frequency.value = 800;
      oscillator2.type = 'sine';
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      oscillator2.start(audioContext.currentTime);
      oscillator2.stop(audioContext.currentTime + 1);
    }, 200);

    setTimeout(() => {
      const oscillator3 = audioContext.createOscillator();
      const gainNode3 = audioContext.createGain();
      oscillator3.connect(gainNode3);
      gainNode3.connect(audioContext.destination);
      oscillator3.frequency.value = 800;
      oscillator3.type = 'sine';
      gainNode3.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      oscillator3.start(audioContext.currentTime);
      oscillator3.stop(audioContext.currentTime + 1);
    }, 400);
  } catch (error) {
    console.error('Failed to play alarm sound:', error);
  }
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
