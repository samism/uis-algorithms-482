import { GraphVertex } from './GraphVertex';

export class GraphEdge {
    private readonly _weight: number;
    private readonly _origin: GraphVertex;
    private readonly _destination: GraphVertex;

    constructor(origin: string, destination: string, weight = 1) {
        this._origin = new GraphVertex(origin);
        this._destination = new GraphVertex(destination);
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
}
