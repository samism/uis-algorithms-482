export interface IMinHeap {
    heapifyDown(i: number): void;
    heapifyUp(i: number): void;
    insert(v: number): void;
    deleteNodeAtPosition(i: number): number | Error;
    deleteNode(v: number): number | Error;
    findMin(): number;
    extractMin(): number;
    changeKey(v: number, newValue: number): void;
}
