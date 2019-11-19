import { IGraph } from './IGraph';
import { GraphVertex } from './GraphVertex';
import { GraphEdge } from './GraphEdge';
import { IMinHeap } from './IMinHeap';
import { MinHeap } from './MinHeap';

export class SimpleGraph implements IGraph {
    private readonly _vertices: GraphVertex[];
    private readonly _directed: boolean;
    private readonly _weighted: boolean;

    constructor(directed: boolean, weighted: boolean) {
        this._vertices = [];
        this._directed = directed;
        this._weighted = weighted;
    }

    public findMSTWithPrims(rootNodeLabel: string): IGraph {
        if (this._directed) {
            throw new Error(`Prim's algorithm requires an undirected graph.`);
        }

        const minimumSpanningTree: IGraph = new SimpleGraph(false, true);
        const rootNode: GraphVertex | undefined = this._vertices.find(vertex => vertex.name === rootNodeLabel);

        if (rootNode === undefined) {
            throw new Error(`Cannot find root node ${rootNodeLabel}!`);
        }

        const priorityQueue: IMinHeap = MinHeap.startHeap(rootNode.edges.length);
        const visitedVertices: GraphVertex[] = [rootNode];
        const allEdges: GraphEdge[] = this._vertices.map(vertex => vertex.edges).flat();

        // add all possible edges off of rootNode to the priority queue
        rootNode.edges.forEach(edge => priorityQueue.insert({ [edge.toString()]: edge.weight }));
        minimumSpanningTree.addVertexDirect(new GraphVertex(rootNode.name));

        while (!priorityQueue.isEmpty()) {
            const nextSmallestEdgeName: string = priorityQueue.extractMin();
            const nextSmallestEdge: GraphEdge | undefined = allEdges.find(
                edge => edge.toString() === nextSmallestEdgeName,
            );

            if (nextSmallestEdge === undefined) {
                throw new Error('Something went wrong locating minEdge!');
            }

            const smallestEdgeDestinationVertex: GraphVertex = nextSmallestEdge.destination;

            if (!visitedVertices.some(visitedVertex => visitedVertex.name === smallestEdgeDestinationVertex.name)) {
                const newVertex = new GraphVertex(smallestEdgeDestinationVertex.name);
                visitedVertices.push(newVertex);
                minimumSpanningTree.addVertexDirect(newVertex);
                minimumSpanningTree.addEdgeDirect(nextSmallestEdge);

                // remove unchosen options from consideration next iteration
                if (smallestEdgeDestinationVertex.edges.length) {
                    priorityQueue.clear();
                }

                // add all possible edges off of newly visited node
                smallestEdgeDestinationVertex.edges.forEach(edge => {
                    priorityQueue.insert({ [edge.toString()]: edge.weight });
                });

                debugger;
            }
        }

        return minimumSpanningTree;
    }

    public addEdgeDirect(newEdge: GraphEdge): GraphEdge {
        const allEdges: GraphEdge[] = this._vertices.map(vertex => vertex.edges).flat();

        if (
            !allEdges.some(
                existingEdge =>
                    existingEdge.origin === newEdge.origin &&
                    existingEdge.destination === newEdge.destination &&
                    existingEdge.weight === newEdge.weight,
            )
        ) {
            return this.addEdge(newEdge.origin, newEdge.destination, newEdge.weight);
        }

        return newEdge;
    }

    public addEdge(origin: GraphVertex, destination: GraphVertex, weight: number): GraphEdge {
        const originVertex = this._vertices.find(vertex => vertex.name === origin.name);
        const destinationVertex = this._vertices.find(vertex => vertex.name === destination.name);

        if (!originVertex || !destinationVertex) {
            throw new Error(
                `Could not find the vertices for edge: origin ${origin.name} and destination ${destination.name}.`,
            );
        }

        const edge: GraphEdge = new GraphEdge(origin, destination, weight);
        originVertex.edges.push(edge);

        if (!this._directed && origin !== destination) {
            const complimentingEdge: GraphEdge = new GraphEdge(destination, origin, weight);
            destinationVertex.edges.push(complimentingEdge);

            return complimentingEdge;
        }

        return edge;
    }

    public addVertexDirect(vertex: GraphVertex): GraphVertex {
        if (!this._vertices.some(existingVertex => existingVertex.name === vertex.name)) {
            this._vertices.push(vertex);
        }

        return vertex;
    }

    public addVertex(vertexLabel: string): GraphVertex {
        const vertex: GraphVertex = new GraphVertex(vertexLabel);

        if (!this._vertices.find(vertex => vertex.name === vertexLabel)) {
            this._vertices.push(vertex);
        }
        return vertex;
    }

    public removeVertex(vertexLabel: string): GraphVertex {
        const vertexIndex = this._vertices.findIndex(vertex => vertex.name === vertexLabel);
        const [deleted] = this._vertices.splice(vertexIndex, 1);

        if (!deleted) {
            throw new Error(`Could not find the vertex: ${vertexLabel}.`);
        }

        return deleted;
    }

    public getEdge(originLabel: string, destinationLabel: string): GraphEdge {
        const originVertex = this._vertices.find(vertex => vertex.name === originLabel);

        if (!originVertex) {
            throw new Error(`Could not find the origin vertex for edge: origin ${originLabel}.`);
        }

        const edge = originVertex.edges.find(edge => edge.destination.name === destinationLabel);

        if (!edge) {
            throw new Error(`Could not find edge for origin ${originLabel} and destination ${destinationLabel}.`);
        }

        return edge;
    }

    public getNeighbors(vertexLabel: string): Array<GraphEdge> {
        const vertex = this._vertices.find(vertex => vertex.name === vertexLabel);

        if (!vertex) {
            throw new Error(`Could not find the vertex: ${vertexLabel}.`);
        }

        return vertex.edges;
    }

    public toString(): string {
        return this._vertices
            .map(vertex => {
                const name = vertex.name;
                const edges = vertex.edges.map(edge =>
                    this._weighted ? `(${edge.destination.name}, ${edge.weight})` : edge.destination.name,
                );

                return `${name}: ${edges.join(', ')}`;
            })
            .join('\n');
    }

    public get vertices(): GraphVertex[] {
        return this._vertices;
    }

    public get directed(): boolean {
        return this._directed;
    }

    public get weighted(): boolean {
        return this._weighted;
    }
}
