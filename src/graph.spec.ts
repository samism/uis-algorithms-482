import { IGraph } from './IGraph';
import { SimpleGraph } from './SimpleGraph';

describe('graph', () => {
    let graph: IGraph;

    describe('undirected, weighted', () => {
        beforeEach(() => {
            graph = new SimpleGraph(false, true);
            const vertexA = graph.addVertex('a');
            const vertexB = graph.addVertex('b');
            const vertexC = graph.addVertex('c');
            const vertexD = graph.addVertex('d');
            graph.addEdge(vertexA, vertexB, 10);
            graph.addEdge(vertexA, vertexC, 20);
            graph.addEdge(vertexA, vertexD, 60);
            graph.addEdge(vertexB, vertexC, 50);
            graph.addEdge(vertexB, vertexD, 40);
            graph.addEdge(vertexD, vertexC, 30);
        });

        it('minimum spanning tree works', () => {
            const expectedMst: IGraph = new SimpleGraph(false, true);
            const vertexA = expectedMst.addVertex('a');
            const vertexB = expectedMst.addVertex('b');
            const vertexC = expectedMst.addVertex('c');
            const vertexD = expectedMst.addVertex('d');
            expectedMst.addEdge(vertexA, vertexB, 10);
            expectedMst.addEdge(vertexD, vertexC, 30);
            expectedMst.addEdge(vertexB, vertexD, 40);

            const expectedMstVertices = expectedMst.vertices.map(vertex => vertex.name);
            const expectedMstEdges = expectedMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            const resultingMst = graph.findMSTWithPrims('a');
            const resultingMstVertices = resultingMst.vertices.map(vertex => vertex.name);
            const resultingMstEdges = resultingMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            expect(resultingMstVertices.sort()).toEqual(expectedMstVertices.sort());
            expect(resultingMstEdges.sort()).toEqual(expectedMstEdges.sort());
        });
    });
});
