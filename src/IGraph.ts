import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export interface IGraph {
    vertices: GraphVertex[];

    addVertexDirect(vertex: GraphVertex): GraphVertex;
    addVertex(vertexLabel: string): GraphVertex;
    removeVertex(vertex: string): GraphVertex;
    addEdge(origin: GraphVertex, destination: GraphVertex, weight: number): GraphEdge;
    addEdgeDirect(newEdge: GraphEdge): GraphEdge;
    getEdge(origin: string, destination: string): GraphEdge;
    getNeighbors(vertex: string): Array<GraphEdge>;
    findMSTWithPrims(rootNode: string): IGraph;
    toString(): string;
}
