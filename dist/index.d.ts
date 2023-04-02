export interface PerfomanceLoggerFormatter {
    (label1: string, label2: string, diff: string): string;
}
export interface LabelDiff {
    label: string;
    trackType: 'first' | 'last';
}
export interface TrackedEvent {
    message: string;
    label1: string;
    label2: string;
    diff: string;
}
export declare class PerformanceTracker {
    private readonly isDisabled;
    private markers;
    private timestamps;
    private formatter;
    static instance: PerformanceTracker | null;
    constructor(isDisabled: boolean);
    static getInstance(clean?: boolean, isDisabled?: boolean): PerformanceTracker;
    track(marker: string): void;
    flush(): void;
    getLabels(): string[];
    setFormatter(formatterFunc: PerfomanceLoggerFormatter): void;
    getDiffAll(startIdx?: number, endIdx?: number): TrackedEvent[] | string;
    getDiff(label1: string | LabelDiff, label2: string | LabelDiff): TrackedEvent;
    getDiffBetween(label1: string | LabelDiff, label2: string | LabelDiff): string | TrackedEvent[];
    private getLabelInfo;
}
