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
npm install @zheni/performance-tracker
```

or

```
yarn add @zheni/performance-tracker
```

## Usage

```ts
import {PerformanceTracker} from 'performance-tracker';

const tracker = PerformanceTracker.getInstance();

tracker.track('start');
// Some code here
tracker.track('middle');
// Some more code here
tracker.track('end');

console.log(tracker.getDiffAll()); // Logs the time differences between all tracked markers

console.log(tracker.getDiff('start', 'middle')); // Logs the time difference between 'start' and 'middle' markers

console.log(tracker.getDiff('middle', 'end')); // Logs the time difference between 'middle' and 'end' markers
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
