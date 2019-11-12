import { IMinHeap } from './IMinHeap';
import { left, right } from 'inquirer/lib/utils/readline';

/**
 * Array-based implementation
 * Parent -> (childIndex - 1) / 2
 * Left Child -> 2 * parentIndex + 1
 * Right Child -> 2 * parentIndex + 2
 */
export class MinHeap implements IMinHeap {
    private readonly heap: number[];
    private readonly positionMap: Record<number, number>; // O(1) lookup of value's index in the array
    private size: number;

    private constructor(size: number) {
        this.size = size;
        this.heap = [];
        this.positionMap = {};
    }

    heapifyDown(i: number): void {
        let recentlyReplacedNode = this.heap[i];
        let leftChild = this.heap[2 * i + 1];
        let rightChild = this.heap[2 * i + 2];

        while((leftChild || rightChild) && Math.min(leftChild, rightChild) < recentlyReplacedNode) {
            //swap
        }
    }

    heapifyUp(i: number): void {}

    insert(v: number): void {}

    deleteValueAtPosition(i: number): number {
        const [nodeAtPosition] = this.heap.splice(i, 1, this.heap[this.size - 1]);
        this.size--;
        this.heapifyDown(i);

        return nodeAtPosition;
    }

    deleteValue(v: number): number {
        const positionOfElement = this.positionMap[v];

        return this.deleteValueAtPosition(positionOfElement);
    }

    findMin(): number {
        return this.heap[0];
    }

    extractMin(): number {
        const min = this.findMin();
        this.deleteValueAtPosition(0);

        return min;
    }

    changeKey(v: number, newValue: number): void {
        const positionOfElement = this.positionMap[v];
        this.heap[positionOfElement] = newValue;
    }

    startHeap(n: number): IMinHeap {
        return new MinHeap(n);
    }
}
