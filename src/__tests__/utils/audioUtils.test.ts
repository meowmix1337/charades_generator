import { describe, it, expect } from 'vitest';
import { formatTime, playAlarmSound } from '../../utils/audioUtils';

describe('Audio Utils', () => {
  describe('formatTime', () => {
    it('should format seconds into MM:SS format', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(30)).toBe('0:30');
      expect(formatTime(60)).toBe('1:00');
      expect(formatTime(90)).toBe('1:30');
      expect(formatTime(120)).toBe('2:00');
      expect(formatTime(125)).toBe('2:05');
      expect(formatTime(3661)).toBe('61:01');
    });

    it('should pad single digit seconds with zero', () => {
      expect(formatTime(5)).toBe('0:05');
      expect(formatTime(65)).toBe('1:05');
    });

    it('should handle zero correctly', () => {
      expect(formatTime(0)).toBe('0:00');
    });
  });

  describe('playAlarmSound', () => {
    it('should not throw an error when called', () => {
      expect(() => playAlarmSound()).not.toThrow();
    });

    it('should create AudioContext when called', () => {
      playAlarmSound();
      expect(global.AudioContext).toHaveBeenCalled();
    });
  });
});
