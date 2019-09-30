import { IGraph } from './IGraph';
import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export class SimpleGraph implements IGraph {
    private vertices: Array<GraphVertex>;
    private directed: boolean;
    private weighted: boolean;

    constructor(directed: boolean, weighted: boolean) {
        this.vertices = [];
        this.directed = directed;
        this.weighted = weighted;
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
