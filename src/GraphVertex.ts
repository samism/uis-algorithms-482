import { GraphEdge } from './GraphEdge';

export class GraphVertex {
    private readonly _name: string;
    private readonly _edges: Array<GraphEdge>;

    constructor(name: string) {
        this._name = name;
        this._edges = [];
    }

    get name(): string {
        return this._name;
    }

    get edges(): Array<GraphEdge> {
        return this._edges;
    }
}
