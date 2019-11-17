import { GraphVertex } from './GraphVertex';
import { v4 as uuid } from 'uuid';

export class GraphEdge {
    private readonly _weight: number;
    private readonly _origin: GraphVertex;
    private readonly _destination: GraphVertex;
    private readonly _uuid: string;

    constructor(origin: string, destination: string, weight: number) {
        this._origin = new GraphVertex(origin);
        this._destination = new GraphVertex(destination);
        this._weight = weight;
        this._uuid = uuid();
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

    get id(): string {
        return this._uuid;
    }
}
