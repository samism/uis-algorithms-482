import { IGraph } from './IGraph';
import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export class SimpleGraph implements IGraph {
    private readonly vertices: Array<GraphVertex>;
    private readonly directed: boolean;
    private readonly weighted: boolean;

    constructor(directed: boolean, weighted: boolean) {
        this.vertices = [];
        this.directed = directed;
        this.weighted = weighted;
    }

    addEdge(originLabel: string, destinationLabel: string, weight: number): GraphEdge {
        const originVertex = this.vertices.find(vertex => vertex.name === originLabel);
        const destinationVertex = this.vertices.find(vertex => vertex.name === destinationLabel);
        const edge: GraphEdge = new GraphEdge(originLabel, destinationLabel, weight);

        if (originVertex && destinationVertex) {
            originVertex.edges.push(edge);
            destinationVertex.edges.push(edge);
            return edge;
        }

        throw new Error(
            `Could not find the vertices for edge: origin ${originLabel} and destination ${destinationLabel}.`,
        );
    }

    addVertex(vertexLabel: string): GraphVertex {
        const vertex: GraphVertex = new GraphVertex(vertexLabel);

        if (!this.vertices.find(vertex => vertex.name === vertexLabel)) {
            this.vertices.push(vertex);
        }

        return vertex;
    }

    removeVertex(vertexLabel: string): GraphVertex {
        const vertexIndex = this.vertices.findIndex(vertex => vertex.name === vertexLabel);
        const [deleted] = this.vertices.splice(vertexIndex, 1);

        return deleted;
    }

    getEdge(originLabel: string, destinationLabel: string): GraphEdge {
        const originVertex = this.vertices.find(vertex => vertex.name === originLabel);

        if (!originVertex) {
            throw new Error(`Could not find the origin vertex for edge: origin ${originLabel}.`);
        }

        const edge = originVertex.edges.find(edge => edge.destination.name === destinationLabel);

        if (!edge) {
            throw new Error(`Could not find edge for origin ${originLabel} and destination ${destinationLabel}.`);
        }

        return edge;
    }

    getNeighbors(vertexLabel: string): Array<GraphEdge> {
        const vertex = this.vertices.find(vertex => vertex.name === vertexLabel);

        if (vertex) {
            return vertex.edges;
        }

        return [];
    }

    toString(): string {
        return this.vertices
            .map(vertex => {
                const name = vertex.name;
                const edges = vertex.edges.map(edge => `(${edge.destination.name}, ${edge.weight})`);

                return `${name}: ${edges.join(', ')}`;
            })
            .join('\n');
    }
}
