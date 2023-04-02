"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTracker = void 0;
class PerformanceTracker {
    constructor(isDisabled) {
        this.formatter = (label1, label2, diff) => `${label1} -> ${label2} ${diff} ms`;
        this.isDisabled = isDisabled;
        this.timestamps = [];
        this.markers = {};
    }
    static getInstance(clean = false, isDisabled = false) {
        if (!PerformanceTracker.instance || clean) {
            PerformanceTracker.instance = new PerformanceTracker(isDisabled);
        }
        return PerformanceTracker.instance;
    }
    track(marker) {
        if (this.isDisabled) {
            return;
        }
        if (!this.markers[marker]) {
            this.markers[marker] = [];
        }
        this.timestamps.push({ marker, timestamp: performance.now() });
        this.markers[marker].push(this.timestamps.length - 1);
    }
    flush() {
        this.timestamps = [];
        this.markers = {};
    }
    getLabels() {
        return Object.keys(this.markers);
    }
    setFormatter(formatterFunc) {
        this.formatter = formatterFunc;
    }
    getDiffAll(startIdx = 1, endIdx) {
        if (this.isDisabled) {
            return 'performance-tracker is disabled';
        }
        const markers = Object.keys(this.markers);
        if (markers.length < startIdx + 1) {
            return 'no tracked timestamps';
        }
        if (!endIdx) {
            endIdx = this.timestamps.length;
        }
        const events = [];
        for (let i = startIdx; i < endIdx; i++) {
            const mark1 = this.timestamps[i - 1];
            const mark2 = this.timestamps[i];
            const diff = Math.abs(mark2.timestamp - mark1.timestamp).toFixed(2);
            const displayLabel1Idx = this.markers[mark1.marker].indexOf(i - 1);
            const displayLabel2Idx = this.markers[mark2.marker].indexOf(i);
            const displayLabel1 = `${mark1.marker}${displayLabel1Idx > 0 ? ` (${displayLabel1Idx + 1})` : ''}`;
            const displayLabel2 = `${mark2.marker}${displayLabel2Idx > 0 ? ` (${displayLabel2Idx + 1})` : ''}`;
            events.push({
                message: this.formatter(displayLabel1, displayLabel2, diff),
                label1: displayLabel1,
                label2: displayLabel2,
                diff,
            });
        }
        return events;
    }
    getDiff(label1, label2) {
        const { idx: idx1, displayLabel: displayLabel1 } = this.getLabelInfo(label1);
        const { idx: idx2, displayLabel: displayLabel2 } = this.getLabelInfo(label2);
        const diff = Math.abs(this.timestamps[idx2].timestamp - this.timestamps[idx1].timestamp).toFixed(2);
        return {
            message: this.formatter(displayLabel1, displayLabel2, diff),
            label1: displayLabel1,
            label2: displayLabel2,
            diff,
        };
    }
    getDiffBetween(label1, label2) {
        const { idx: idx1 } = this.getLabelInfo(label1);
        const { idx: idx2 } = this.getLabelInfo(label2);
        return this.getDiffAll(idx1 + 1, idx2 + 1);
    }
    getLabelInfo(label) {
        let idx, displayLabel;
        if (typeof label === 'string') {
            idx = this.markers[label][this.markers[label].length - 1];
            displayLabel = label;
        }
        else {
            idx =
                label.trackType === 'last'
                    ? this.markers[label.label][this.markers[label.label].length - 1]
                    : this.markers[label.label][0];
            displayLabel = label.label;
        }
        return { idx, displayLabel };
    }
}
exports.PerformanceTracker = PerformanceTracker;
//# sourceMappingURL=index.js.map