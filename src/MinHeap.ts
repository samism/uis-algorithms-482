import { IMinHeap } from './IMinHeap';

export class MinHeap implements IMinHeap {
    private readonly _maximumSize: number;
    private _size: number;
    private readonly _heap: Record<string, number>[]; // vertex id and its weight
    private readonly _positionMap: Map<Record<string, number>, number>; // O(1) lookup of value's index in the array

    private constructor(maximumSize: number) {
        this._maximumSize = maximumSize;
        this._size = 0;
        this._heap = [];
        this._positionMap = new Map<Record<string, number>, number>();
    }

    /**
     * Inserts a new node into the heap.
     *
     * @param v Node object with it's ID and priority as a key-value pair.
     */
    public insert(v: Record<string, number>): void {
        if (this._size === this._maximumSize) {
            // This is where you would typically create a new array with double the size
            // and copy over contents of current one into the new one.
            // However, in JavaScript, arrays are always dynamically sized, skipping.
        }

        this._heap.push(v);
        this._positionMap.set(v, this._size);
        this._size++;
        this.heapifyUp(this._size - 1);
    }

    /**
     * Deletes a node by it's ID
     *
     * @param v Node object with it's ID and priority as a key-value pair.
     */
    public deleteNode(v: Record<string, number>): Record<string, number> {
        const nodeIndex = this._positionMap.get(v);

        if (nodeIndex === undefined) {
            throw new Error("Can't delete Node at that index.");
        }

        return this.deleteNodeAtPosition(nodeIndex);
    }

    /**
     * Finds the id of the node with the lowest priority.
     */
    public findMin(): string {
        return this.getNodeKey(0);
    }

    /**
     * Finds the node with the least priority, deletes it, and returns the ID of that node.
     */
    public extractMin(): string {
        const min = this.findMin();
        this.deleteNodeAtPosition(0);

        return min;
    }

    /**
     * Replaces an existing node's priority with a new priority, then re-balances the heap.
     *
     * @param v Node object with it's ID and priority as a key-value pair.
     * @param newPriority A floating point or integer value.
     */
    public changeKey(v: Record<string, number>, newPriority: number): void {
        // don't proceed if trying to change node's priority to its existing value

        if (
            this._heap.find(record => {
                const nodePriority = this.getNodePriority(this._positionMap.get(v));
                return record === v && nodePriority === newPriority;
            })
        ) {
            return;
        }

        const positionOfNode: number | undefined = this._positionMap.get(v);

        if (positionOfNode === undefined) {
            throw new Error("Can't access Node at that index!");
        }

        const currentKey = this.getNodeKey(positionOfNode);
        const currentPriority = this.getNodePriority(positionOfNode);

        const newRecord: Record<string, number> = { [currentKey]: newPriority };

        this._heap[positionOfNode] = newRecord;
        this._positionMap.delete(v);
        this._positionMap.set(newRecord, positionOfNode);

        if (newPriority > currentPriority) {
            this.heapifyDown(positionOfNode);
        } else if (newPriority < currentPriority) {
            this.heapifyUp(positionOfNode);
        }
    }

    public toString(): string {
        return `[${this._heap.map((record, index) => this.getNodePriority(index)).join(', ')}]`;
    }

    public isEmpty(): boolean {
        return this._size === 0;
    }

    public static startHeap(n: number): IMinHeap {
        return new MinHeap(n);
    }

    /**
     * Deletes a node by its index in the underlying array.
     * Assumes that the index is accurately from the position map.
     *
     * @param i Index of node
     */
    private deleteNodeAtPosition(i: number): Record<string, number> {
        const [nodeAtPosition] = this._heap.splice(i, 1, this._heap.pop() as Record<string, number>);

        this._positionMap.set(this.getNode(this._size - 1), i);
        this._positionMap.delete(nodeAtPosition);
        this._size--;
        this.heapifyDown(i);

        return nodeAtPosition;
    }

    /**
     * Swaps two nodes in the underlying array, as well as their current positions in the position map.
     *
     * @param i Node to swap
     * @param j Node to swap
     */
    private swap(i: number, j: number): void {
        // swap node values
        const tempNode: Record<string, number> = this.getNode(i);
        const newNode: Record<string, number> = this.getNode(j);
        this._heap[i] = newNode;
        this._heap[j] = tempNode;

        // swap positions of values
        const tempNodePosition = this._positionMap.get(tempNode);
        const newNodePosition = this._positionMap.get(newNode);

        if (tempNodePosition === undefined || newNodePosition === undefined) {
            throw new Error("Can't swap nodes: At least one position is null.");
        }

        this._positionMap.set(tempNode, newNodePosition);
        this._positionMap.set(newNode, tempNodePosition);
    }

    /**
     * Re-balances the heap on removal to maintain a complete binary min heap structure.
     * Recursive implementation of my own.
     *
     * @param i Index of the node that was just removed.
     */
    private heapifyDown(i: number): void {
        const leftChildIndex = this.getLeftChildIndex(i);
        const rightChildIndex = this.getRightChildIndex(i);

        let smallerChildIndex = i;
        let smallerChildPriority = this.getNodePriority(smallerChildIndex);

        if (leftChildIndex < this._size && smallerChildPriority > this.getNodePriority(leftChildIndex)) {
            smallerChildIndex = leftChildIndex;
            smallerChildPriority = this.getNodePriority(smallerChildIndex);
        }

        if (rightChildIndex < this._size && smallerChildPriority > this.getNodePriority(rightChildIndex)) {
            smallerChildIndex = rightChildIndex;
        }

        if (smallerChildIndex !== i) {
            this.swap(i, smallerChildIndex);
            this.heapifyDown(smallerChildIndex);
        }
    }

    /**
     * Re-balances the heap on insert to maintain a complete binary min heap structure.
     * Recursive implementation per Tardos and Klienberg.
     *
     * @param i Index of node that was just inserted ("last node").
     */
    private heapifyUp(i: number): void {
        if (i > 0) {
            const parentIndex = this.getParentIndex(i);

            if (this.getNodePriority(i) < this.getNodePriority(parentIndex)) {
                this.swap(i, parentIndex);
                this.heapifyUp(parentIndex);
            }
        }
    }

    /**
     * Returns a node by index, according to the index in the position map.
     *
     * @param index Index of node to find
     */
    private getNode(index: number | undefined): Record<string, number> {
        if (index === undefined || index > this._size - 1) {
            throw new Error(`Can't get record for node at index that doesn't exist!`);
        }

        const positionsArray = Array.from(this._positionMap.entries());
        return positionsArray.filter(([, nodeElement]) => nodeElement === index)[0][0];
    }

    /**
     * Returns key for node at given index.
     *
     * @param index Index of node
     */
    private getNodeKey(index: number | undefined): string {
        const [nodeKey] = Object.keys(this.getNode(index));

        return nodeKey;
    }

    /**
     * Returns priority for node at given index.
     *
     * @param index Index of node
     */
    private getNodePriority(index: number | undefined): number {
        const [nodePriority] = Object.values(this.getNode(index));

        return nodePriority;
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
}
