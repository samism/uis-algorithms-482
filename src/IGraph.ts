import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export interface IGraph {
    addVertex(vertex: string): GraphVertex;
    removeVertex(vertex: string): GraphVertex;
    addEdge(origin: string, destination: string, weight: number): GraphEdge;
    addEdgeDirect(newEdge: GraphEdge): GraphEdge;
    getEdge(origin: string, destination: string): GraphEdge;
    getNeighbors(vertex: string): Array<GraphEdge>;
    findMSTWithPrims(rootNode: string): IGraph;
    toString(): string;
}
