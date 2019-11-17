export interface IMinHeap {
    insert(v: Record<string, number>): void;
    deleteNode(v: Record<string, number>): Record<string, number>;
    findMin(): string;
    extractMin(): string;
    changeKey(v: Record<string, number>, newPriority: number): void;
    toString(): string;
}
