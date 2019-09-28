import { IGraph } from './IGraph';
import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export class SimpleGraph implements IGraph {
    private vertices: Array<GraphVertex>;

    constructor() {
        this.vertices = [];
    }

    addEdge(origin: GraphVertex, destination: GraphVertex): GraphEdge {
        return undefined;
    }

    addVertex(vertex: GraphVertex): GraphVertex {
        return undefined;
    }

    removeVertex(vertex: GraphVertex): GraphVertex {
        return undefined;
    }

    getEdge(origin: GraphVertex, destination: GraphVertex): GraphEdge {
        return undefined;
    }

    getNeighbors(vertex: GraphVertex): Array<GraphEdge> {
        return undefined;
    }
}
