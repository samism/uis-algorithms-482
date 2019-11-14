import { IMinHeap } from './IMinHeap';

/**
 * Array-based implementation
 * Parent -> (childIndex - 1) / 2
 * Left Child -> 2 * parentIndex + 1
 * Right Child -> 2 * parentIndex + 2
 */
export class MinHeap implements IMinHeap {
    private readonly _heap: number[];
    private readonly _positionMap: Record<number, number>; // O(1) lookup of value's index in the array
    private _size: number;

    private constructor() {
        this._size = 0;
        this._heap = [];
        this._positionMap = {};
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
        return this._heap[this.getLeftChildIndex(index)];
    }

    private getRightChild(index: number): number {
        return this._heap[this.getRightChildIndex(index)];
    }

    private getNode(index: number): number {
        return this._heap[index];
    }

    private swap(i: number, j: number): void {
        // swap node values
        const tempNode = this.getNode(i);
        const newNode = this.getNode(j);
        this._heap[i] = newNode;
        this._heap[j] = tempNode;

        // swap positions of values
        const tempNodePosition = this._positionMap[tempNode];
        this._positionMap[tempNode] = this._positionMap[newNode];
        this._positionMap[newNode] = tempNodePosition;
    }

    // for removal
    heapifyDown(i: number): void {
        let smallerChildIndex = -1;

        if (2 * i > this._size) {
            return;
        } else if (2 * i < this._size) {
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
        } else if (2 * i === this._size) {
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
        this._heap.push(v);
        this._positionMap[v] = this._size;
        this._size++;
        this.heapifyUp(this._size - 1);
    }

    deleteNodeAtPosition(i: number): number | Error {
        if (i < 0 || i > this._size - 1 || this._size === 0) {
            throw new Error("Can't delete Node at that index.");
        }

        const [nodeAtPosition] = this._heap.splice(i, 1, this._heap.pop() as number);
        this._size--;
        this.heapifyDown(i);
        delete this._positionMap[nodeAtPosition];

        return nodeAtPosition;
    }

    deleteNode(v: number): number | Error {
        return this.deleteNodeAtPosition(this._positionMap[v] || -1);
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

        const positionOfNode = this._positionMap[v];
        this._heap[positionOfNode] = newValue;

        if (newValue > v) {
            this.heapifyDown(positionOfNode);
        } else if (newValue < v) {
            this.heapifyUp(positionOfNode);
        }
    }

    public toString() {
        return `[${this._heap.join(', ')}]`;
    }

    public static startHeap(): IMinHeap {
        return new MinHeap();
    }
}
