import { GraphVertex } from './GraphVertex';
import { v4 as uuid } from 'uuid';

export class GraphEdge {
    private readonly _weight: number;
    private readonly _origin: GraphVertex;
    private readonly _destination: GraphVertex;

    constructor(origin: GraphVertex, destination: GraphVertex, weight: number) {
        this._origin = origin;
        this._destination = destination;
        this._weight = weight;
    }

    get weight(): number {
        return this._weight;
    }

    get origin(): GraphVertex {
        return this._origin;
    }

    get destination(): GraphVertex {
        return this._destination;
    }

    toString(): string {
        return `${this._origin.name}->${this._destination.name}`;
    }
}
