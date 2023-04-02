import {PerfomanceLoggerFormatter, PerformanceTracker} from '../dist';

describe('PerformanceTracker', () => {
  let tracker: PerformanceTracker;

  beforeEach(() => {
    tracker = PerformanceTracker.getInstance(true, false);
  });

  describe('track', () => {
    it('should add timestamp to markers object', () => {
      tracker.track('start');
      expect(tracker.getLabels()).toEqual(['start']);
    });

    it('should add multiple timestamps to markers object for the same label', () => {
      tracker.track('start');
      tracker.track('start');
      tracker.track('end');
      expect(tracker.getLabels()).toEqual(['start', 'end']);
      expect(tracker.getDiffAll()).toHaveLength(2);
    });

    it('should not add timestamp when disabled', () => {
      const disabledTracker = PerformanceTracker.getInstance(true, true);
      disabledTracker.track('start');
      expect(disabledTracker.getLabels()).toEqual([]);
    });
  });

  describe('flush', () => {
    it('should clear all timestamps and labels', () => {
      tracker.track('start');
      tracker.flush();
      expect(tracker.getLabels()).toEqual([]);
      expect(tracker.getDiffAll()).toEqual('no tracked timestamps');
    });
  });

  describe('getLabels', () => {
    it('should return empty array when no timestamps are tracked', () => {
      expect(tracker.getLabels()).toEqual([]);
    });

    it('should return all labels tracked', () => {
      tracker.track('start');
      tracker.track('end');
      expect(tracker.getLabels()).toEqual(['start', 'end']);
    });
  });

  describe('setFormatter', () => {
    it('should set the formatter function', () => {
      const formatter: PerfomanceLoggerFormatter = (label1, label2, diff) =>
        `Difference between ${label1} and ${label2} is 0 milliseconds`;
      tracker.setFormatter(formatter);
      tracker.track('start');
      tracker.track('end');
      const result = tracker.getDiffAll()[0];
      if (typeof result === 'object') {
        result.diff = '0';
      }

      expect(result).toEqual({
        message: 'Difference between start and end is 0 milliseconds',
        label1: 'start',
        label2: 'end',
        diff: '0',
      });
    });
  });

  describe('getDiffAll', () => {
    it('should return "no tracked timestamps" when no timestamps are tracked', () => {
      expect(tracker.getDiffAll()).toEqual('no tracked timestamps');
    });

    it('should return "performance-tracker is disabled" when tracker is disabled', () => {
      const disabledTracker = PerformanceTracker.getInstance(true, true);
      disabledTracker.track('start');
      disabledTracker.track('end');
      expect(disabledTracker.getDiffAll()).toEqual(
        'performance-tracker is disabled',
      );
    });

    it('should return all diffs between timestamps when labels are not specified', () => {
      tracker.track('start');
      tracker.track('middle');
      tracker.track('end');

      const result = tracker.getDiffAll();

      if (!Array.isArray(result)) {
        throw new Error('getDiffAll result should an array');
      }
      expect(
        result.map((trackedEvent) => ({
          ...trackedEvent,
          message: `${trackedEvent.label1} -> ${trackedEvent.label2} 0.00 ms`,
          diff: '0.00',
        })),
      ).toEqual([
        {
          message: 'start -> middle 0.00 ms',
          label1: 'start',
          label2: 'middle',
          diff: '0.00',
        },
        {
          message: 'middle -> end 0.00 ms',
          label1: 'middle',
          label2: 'end',
          diff: '0.00',
        },
      ]);
    });
  });

  describe('getDiff', () => {
    it('should return diffs between specified labels', () => {
      tracker.track('start');
      tracker.track('middle');
      tracker.track('end');
      const result = tracker.getDiff(
        {label: 'start', trackType: 'last'},
        {label: 'end', trackType: 'last'},
      );
      result.diff = '0.00';
      expect(result).toEqual({
        message: 'start -> end 0.00 ms',
        label1: 'start',
        label2: 'end',
        diff: '0.00',
      });
    });
  });

  describe('getDiffBetween', () => {
    it('should return all diffs between specified labels', () => {
      tracker.track('start');
      tracker.track('middle');
      tracker.track('end');

      const result = tracker.getDiffBetween(
        {label: 'start', trackType: 'last'},
        {label: 'end', trackType: 'last'},
      );

      if (!Array.isArray(result)) {
        throw new Error('result of getDiffBetween should be an array');
      }
      expect(
        result.map((trackedEvent) => ({
          ...trackedEvent,
          message: `${trackedEvent.label1} -> ${trackedEvent.label2} 0.00 ms`,
          diff: '0.00',
        })),
      ).toEqual([
        {
          message: 'start -> middle 0.00 ms',
          label1: 'start',
          label2: 'middle',
          diff: '0.00',
        },
        {
          message: 'middle -> end 0.00 ms',
          label1: 'middle',
          label2: 'end',
          diff: '0.00',
        },
      ]);
    });
  });
});
