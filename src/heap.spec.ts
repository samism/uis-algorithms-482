import { MinHeap } from './MinHeap';
import { IMinHeap } from './IMinHeap';
import * as faker from 'faker';

describe('binary min heap', () => {
    let minHeap: IMinHeap;

    beforeEach(() => {
        // "max" elements = enough to fit tree of height 5
        minHeap = MinHeap.startHeap(Math.pow(2, 5 + 1) - 1);
    });

    it('insertion and heapify-up work as expected', () => {
        minHeap.insert({ [faker.random.uuid()]: 1 });
        minHeap.insert({ [faker.random.uuid()]: 2 });
        minHeap.insert({ [faker.random.uuid()]: 3 });
        minHeap.insert({ [faker.random.uuid()]: 4 });
        expect(minHeap.toString()).toBe('[1, 2, 3, 4]');
        minHeap.insert({ [faker.random.uuid()]: -2 });
        expect(minHeap.toString()).toBe('[-2, 1, 3, 4, 2]');
    });

    it('removal by name and heapify-down work as expected', () => {
        const nodeToDelete = { [faker.random.uuid()]: 1 };
        minHeap.insert(nodeToDelete);
        minHeap.insert({ [faker.random.uuid()]: 2 });
        minHeap.insert({ [faker.random.uuid()]: 3 });
        minHeap.insert({ [faker.random.uuid()]: 4 });
        expect(minHeap.toString()).toBe('[1, 2, 3, 4]');
        minHeap.deleteNode(nodeToDelete);
        expect(minHeap.toString()).toBe('[2, 4, 3]');
    });

    it('extractMin works as expected', () => {
        const keyWithMinimumPriority = faker.random.uuid();
        minHeap.insert({ [keyWithMinimumPriority]: 2 });
        minHeap.insert({ [faker.random.uuid()]: 4 });
        minHeap.insert({ [faker.random.uuid()]: 10 });
        minHeap.insert({ [faker.random.uuid()]: 3 });
        minHeap.insert({ [faker.random.uuid()]: 15 });
        minHeap.insert({ [faker.random.uuid()]: 20 });
        expect(minHeap.extractMin()).toBe(keyWithMinimumPriority);
        expect(minHeap.toString()).toBe('[3, 4, 10, 20, 15]');
    });

    it('changeKey works as expected for new key greater than current one', () => {
        const nodeToChange = { [faker.random.uuid()]: 4 };
        minHeap.insert({ [faker.random.uuid()]: 2 });
        minHeap.insert(nodeToChange);
        minHeap.insert({ [faker.random.uuid()]: 10 });
        minHeap.insert({ [faker.random.uuid()]: 3 });
        minHeap.insert({ [faker.random.uuid()]: 15 });
        minHeap.insert({ [faker.random.uuid()]: 20 });
        minHeap.insert({ [faker.random.uuid()]: 29 });
        minHeap.insert({ [faker.random.uuid()]: 61 });
        minHeap.changeKey(nodeToChange, 62);
        expect(minHeap.toString()).toBe('[2, 3, 10, 61, 15, 20, 29, 62]');
    });

    it('changeKey works as expected for new key less than current one', () => {
        const nodeToChange = { [faker.random.uuid()]: 61 };
        minHeap.insert({ [faker.random.uuid()]: 2 });
        minHeap.insert({ [faker.random.uuid()]: 4 });
        minHeap.insert({ [faker.random.uuid()]: 3 });
        minHeap.insert({ [faker.random.uuid()]: 10 });
        minHeap.insert({ [faker.random.uuid()]: 15 });
        minHeap.insert({ [faker.random.uuid()]: 20 });
        minHeap.insert({ [faker.random.uuid()]: 29 });
        minHeap.insert(nodeToChange);
        minHeap.changeKey(nodeToChange, -2);
        expect(minHeap.toString()).toBe('[-2, 2, 3, 4, 15, 20, 29, 10]');
    });
});
