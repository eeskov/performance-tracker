import {PerformanceTracker} from '../dist';

async function main() {
  const tracker = PerformanceTracker.getInstance();
  tracker.track('TEST');
  tracker.track('START');
  for (let i = 0; i < 5; i++) {
    tracker.track('START_LOOP');
    if (i === 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    tracker.track('END_LOOP');
  }
  tracker.track('END');
  tracker.track('TEST');

  console.log(tracker.getDiffAll());

  console.log(tracker.getDiff('START', 'END'));

  console.log(
    'first START_LOOP, first END_LOOP',
    tracker.getDiff(
      {label: 'START_LOOP', trackType: 'first'},
      {label: 'END_LOOP', trackType: 'first'},
    ),
  );
  console.log(
    'first START_LOOP, last END_LOOP',
    tracker.getDiff(
      {label: 'START_LOOP', trackType: 'first'},
      {label: 'END_LOOP', trackType: 'last'},
    ),
  );

  console.log(
    tracker.getDiffBetween(
      {
        label: 'START_LOOP',
        trackType: 'first',
      },
      'END_LOOP',
    ),
  );
}

void main();
