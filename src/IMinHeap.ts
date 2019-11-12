export interface IMinHeap {
    heapifyUp(i: number): void;
    heapifyDown(i: number): void;
    startHeap(n: number): IMinHeap;
    insert(v: number): void;
    findMin(): number;
    deleteValueAtPosition(i: number): number;
    deleteValue(v: number): void;
    extractMin(): number;
    changeKey(v: number, newValue: number): void;
}
