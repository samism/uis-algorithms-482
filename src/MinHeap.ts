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

    private constructor(size: number) {
        this.size = size;
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
        return (childIndex - 1) / 2;
    }

    // private hasLeftChild(index: number): boolean {
    //     return this.getLeftChildIndex(index) < this.size;
    // }
    //
    // private hasRightChild(index: number): boolean {
    //     return this.getRightChildIndex(index) < this.size;
    // }

    private getLeftChild(index: number): number {
        return this.heap[this.getLeftChildIndex(index)];
    }

    private getRightChild(index: number): number {
        return this.heap[this.getRightChildIndex(index)];
    }

    // private hasParent(index: number): boolean {
    //     return index !== 0 && this.getParentIndex(index) >= 0;
    // }

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
    // when removing, element at i is deleted, "last" replaces it.
    // this method ensures that this new element keeps falling down the tree as long as it is greater than its children
    heapifyDown(i: number): void {
        // let currentIndex = i;
        //
        // // if has left child, right child exists
        // while (this.hasLeftChild(currentIndex)) {
        //     let smallerChildIndex = this.getLeftChildIndex(currentIndex);
        //
        //     if (
        //         this.hasRightChild(currentIndex) &&
        //         this.getRightChild(currentIndex) < this.getLeftChild(currentIndex)
        //     ) {
        //         smallerChildIndex = this.getRightChildIndex(currentIndex);
        //     }
        //
        //     if (this.getNode(currentIndex) > this.getNode(smallerChildIndex)) {
        //         break;
        //     }
        //
        //     this.swap(currentIndex, smallerChildIndex);
        //     currentIndex = smallerChildIndex;
        // }

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
        // let currentIndex = i;
        //
        // while (this.hasParent(currentIndex)) {
        //     const parentIndex = this.getParentIndex(currentIndex);
        //
        //     if (this.getNode(i) < this.getNode(parentIndex)) {
        //         this.swap(i, parentIndex);
        //         currentIndex = parentIndex;
        //     }
        // }

        if (i > 1) {
            const parentIndex = this.getParentIndex(i);
            if (this.getNode(i) < this.getNode(parentIndex)) {
                this.swap(i, parentIndex);
                this.heapifyUp(parentIndex);
            }
        }
    }

    insert(v: number): void {
        this.heap.push(v);
        this.size++;
        this.positionMap[v] = this.size;
        this.heapifyUp(this.size);
    }

    deleteNodeAtPosition(i: number): number {
        const [nodeAtPosition] = this.heap.splice(i, 1, this.heap[this.size - 1]);
        delete this.positionMap[nodeAtPosition];
        this.size--;
        this.heapifyDown(i);

        return nodeAtPosition;
    }

    deleteNode(v: number): number {
        const positionOfElement = this.positionMap[v];

        return this.deleteNodeAtPosition(positionOfElement);
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

    startHeap(n: number): IMinHeap {
        return new MinHeap(n);
    }
}
