import { GraphEdge } from './GraphEdge';
import { v4 as uuid } from 'uuid';

export class GraphVertex {
    private readonly _name: string;
    private readonly _edges: Array<GraphEdge>;
    private readonly _uuid: string;

    constructor(name: string) {
        this._name = name;
        this._edges = [];
        this._uuid = uuid();
    }

    get name(): string {
        return this._name;
    }

    get edges(): Array<GraphEdge> {
        return this._edges;
    }

    get id(): string {
        return this._uuid;
    }
}
