import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';

export interface IGraph {
    addVertex(vertex: GraphVertex): GraphVertex;
    removeVertex(vertex: GraphVertex): GraphVertex;
    addEdge(origin: GraphVertex, destination: GraphVertex): GraphEdge;
    getEdge(origin: GraphVertex, destination: GraphVertex): GraphEdge;
    getNeighbors(vertex: GraphVertex): Array<GraphEdge>;
}
