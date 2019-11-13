export interface IMinHeap {
    heapifyDown(i: number): void;
    heapifyUp(i: number): void;
    insert(v: number): void;
    deleteNodeAtPosition(i: number): number;
    deleteNode(v: number): void;
    findMin(): number;
    extractMin(): number;
    changeKey(v: number, newValue: number): void;
    startHeap(n: number): IMinHeap;
}
