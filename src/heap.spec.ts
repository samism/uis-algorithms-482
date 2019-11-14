import { MinHeap } from './MinHeap';
import { IMinHeap } from './IMinHeap';

describe('binary min heap', () => {
    let minHeap: IMinHeap;

    beforeEach(() => {
        minHeap = MinHeap.startHeap();
    });

    it('insertion and heapify-up work as expected', () => {
        minHeap.insert(1);
        minHeap.insert(2);
        minHeap.insert(3);
        minHeap.insert(4);
        expect(minHeap.toString()).toBe('[1, 2, 3, 4]');
        minHeap.insert(-2);
        expect(minHeap.toString()).toBe('[-2, 1, 3, 4, 2]');
    });

    it('removal by name and heapify-down work as expected', () => {
        minHeap.insert(1);
        minHeap.insert(2);
        minHeap.insert(3);
        minHeap.insert(4);
        expect(minHeap.toString()).toBe('[1, 2, 3, 4]');
        minHeap.deleteNode(1);
        expect(minHeap.toString()).toBe('[2, 4, 3]');
    });

    it('removal by position and heapify-down work as expected', () => {
        minHeap.insert(2);
        minHeap.insert(4);
        minHeap.insert(3);
        minHeap.insert(10);
        minHeap.insert(15);
        minHeap.insert(20);
        minHeap.deleteNodeAtPosition(1);
        expect(minHeap.toString()).toBe('[2, 10, 3, 20, 15]');
    });

    it('extractMin works as expected', () => {
        minHeap.insert(2);
        minHeap.insert(4);
        minHeap.insert(3);
        minHeap.insert(10);
        minHeap.insert(15);
        minHeap.insert(20);
        expect(minHeap.extractMin()).toBe(2);
        expect(minHeap.toString()).toBe('[3, 4, 20, 10, 15]');
    });

    it('changeKey works as expected for new key greater than current one', () => {
        minHeap.insert(2);
        minHeap.insert(4);
        minHeap.insert(3);
        minHeap.insert(10);
        minHeap.insert(15);
        minHeap.insert(20);
        minHeap.insert(29);
        minHeap.insert(61);
        minHeap.changeKey(4, 62);
        expect(minHeap.toString()).toBe('[2, 10, 3, 61, 15, 20, 29, 62]');
    });

    it('changeKey works as expected for new key less than current one', () => {
        minHeap.insert(2);
        minHeap.insert(4);
        minHeap.insert(3);
        minHeap.insert(10);
        minHeap.insert(15);
        minHeap.insert(20);
        minHeap.insert(29);
        minHeap.insert(61);
        minHeap.changeKey(61, -2);
        expect(minHeap.toString()).toBe('[-2, 2, 3, 4, 15, 20, 29, 10]');
    });
});
