# Performance Tracker

This package provides a simple and efficient way to track and measure the performance of your JavaScript/TypeScript code. It helps to identify bottlenecks in your code and allows you to measure the time difference between different sections of your code. The PerformanceTracker class is designed to be easily integrated into any project.

## Features

- Track and measure the performance of different sections of your code
- Get time differences between any two markers
- Customize the output format
- Singleton pattern, easily accessible from anywhere in your code
  Enable/disable tracking as needed

## Installation

```
npm install @eeskov/performance-tracker
```

or

```
yarn add @eeskov/performance-tracker
```

## Usage

```ts
import {PerformanceTracker} from 'eeskov/performance-tracker';

const tracker = PerformanceTracker.getInstance();

tracker.track('START');
for (let i = 0; i < 5; i++) {
  tracker.track('START_LOOP');
  if (i === 3) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  tracker.track('END_LOOP');
}
tracker.track('END');

console.log(tracker.getDiffAll()); // Logs the time differences between all tracked markers

console.log(tracker.getDiff('START', 'END')); // Logs the time difference between 'start' and 'middle' markers
/*
{
  message: 'START -> END 1016.58 ms',
  label1: 'START',
  label2: 'END',
  diff: '1016.58'
}
*/

console.log(
  tracker.getDiffBetween(
    {
      label: 'START_LOOP',
      trackType: 'first',
    },
    'END_LOOP',
  ),
); // Logs all the time differences between START_LOOP and END_LOPP tracked markers
```

## API

`PerformanceTracker.getInstance(clean = false, isDisabled = false)`: Returns the singleton instance of the PerformanceTracker

`track(marker: string)`: Adds a new marker with the specified label

`getDiffAll()`: Returns an array of TrackedEvent objects or a string if the performance tracker is disabled

`getDiff(label1: string | LabelDiff, label2: string | LabelDiff)`: Returns a TrackedEvent object representing the time difference between two markers

`getDiffBetween(label1: string | LabelDiff, label2: string | LabelDiff)`: Returns an array of TrackedEvent objects representing the time differences between two markers

`flush()`: Resets the stored timestamps and markers

`getLabels()`: Returns an array of marker labels

`setFormatter(formatterFunc: PerfomanceLoggerFormatter)`: Sets a custom formatter function for the output

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the package.

## License

This package is released under the MIT License.
