import { IMinHeap } from './IMinHeap';

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

    private constructor() {
        this.size = 0;
        this.heap = [];
        this.positionMap = {};
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private getLeftChild(index: number): number {
        return this.heap[this.getLeftChildIndex(index)];
    }

    private getRightChild(index: number): number {
        return this.heap[this.getRightChildIndex(index)];
    }

    private getNode(index: number): number {
        return this.heap[index];
    }

    private swap(i: number, j: number): void {
        // swap node values
        const tempNode = this.getNode(i);
        const newNode = this.getNode(j);
        this.heap[i] = newNode;
        this.heap[j] = tempNode;

        // swap positions of values
        const tempNodePosition = this.positionMap[tempNode];
        this.positionMap[tempNode] = this.positionMap[newNode];
        this.positionMap[newNode] = tempNodePosition;
    }

    // for removal
    heapifyDown(i: number): void {
        let smallerChildIndex = -1;

        if (2 * i > this.size) {
            return;
        } else if (2 * i < this.size) {
            const leftChildIndex = this.getLeftChildIndex(i);
            const rightChildIndex = this.getRightChildIndex(i);
            const leftChild = this.getLeftChild(i);
            const rightChild = this.getRightChild(i);
            const smallerChildNode = Math.min(leftChild, rightChild);

            if (smallerChildNode === leftChild) {
                smallerChildIndex = leftChildIndex;
            } else if (smallerChildNode === rightChild) {
                smallerChildIndex = rightChildIndex;
            }
        } else if (2 * i === this.size) {
            smallerChildIndex = this.getLeftChildIndex(i);
        }

        if (this.getNode(smallerChildIndex) < this.getNode(i)) {
            this.swap(i, smallerChildIndex);
            this.heapifyDown(smallerChildIndex);
        }
    }

    // on insertion
    heapifyUp(i: number): void {
        if (i > 0) {
            const parentIndex = this.getParentIndex(i);
            if (this.getNode(i) < this.getNode(parentIndex)) {
                this.swap(i, parentIndex);
                this.heapifyUp(parentIndex);
            }
        }
    }

    insert(v: number): void {
        this.heap.push(v);
        this.positionMap[v] = this.size;
        this.size++;
        this.heapifyUp(this.size - 1);
    }

    deleteNodeAtPosition(i: number): number | Error {
        if (i < 0 || i > this.size - 1 || this.size === 0) {
            throw new Error("Can't delete Node at that index.");
        }

        const [nodeAtPosition] = this.heap.splice(i, 1, this.heap.pop() as number);
        this.size--;
        this.heapifyDown(i);
        delete this.positionMap[nodeAtPosition];

        return nodeAtPosition;
    }

    deleteNode(v: number): number | Error {
        return this.deleteNodeAtPosition(this.positionMap[v] || -1);
    }

    findMin(): number {
        return this.getNode(0);
    }

    extractMin(): number {
        const min = this.findMin();
        this.deleteNodeAtPosition(0);

        return min;
    }

    changeKey(v: number, newValue: number): void {
        if (v === newValue) {
            return;
        }

        const positionOfNode = this.positionMap[v];
        this.heap[positionOfNode] = newValue;

        if (newValue > v) {
            this.heapifyDown(positionOfNode);
        } else if (newValue < v) {
            this.heapifyUp(positionOfNode);
        }
    }

    public toString() {
        return `[${this.heap.join(', ')}]`;
    }

    public static startHeap(): IMinHeap {
        return new MinHeap();
    }
}
