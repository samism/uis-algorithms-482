import { GraphEdge } from './GraphEdge';

export class GraphVertex {
    private name: string;
    private edges: Array<GraphEdge>;

    constructor(name: string) {
        this.name = name;
        this.edges = [];
    }
}
