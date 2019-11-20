import { IGraph } from './IGraph';
import { SimpleGraph } from './SimpleGraph';

describe('graph', () => {
    let graph: IGraph;
    let expectedMst: IGraph;

    describe('undirected, weighted', () => {
        beforeEach(() => {
            graph = new SimpleGraph(false, true);
            expectedMst = new SimpleGraph(false, true);
        });

        it('MST works (personal case)', () => {
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

            const mstVertexA = expectedMst.addVertex('a');
            const mstVertexB = expectedMst.addVertex('b');
            const mstVertexC = expectedMst.addVertex('c');
            const mstVertexD = expectedMst.addVertex('d');
            expectedMst.addEdge(mstVertexA, mstVertexB, 10);
            expectedMst.addEdge(mstVertexA, mstVertexC, 30);
            expectedMst.addEdge(mstVertexC, mstVertexD, 40);

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

        it('MST official test case 1', () => {
            const vertexR = graph.addVertex('r');
            const vertexA = graph.addVertex('a');
            const vertexB = graph.addVertex('b');
            const vertexD = graph.addVertex('d');
            const vertexC = graph.addVertex('c');
            const vertexE = graph.addVertex('e');
            const vertexH = graph.addVertex('h');
            const vertexF = graph.addVertex('f');
            const vertexG = graph.addVertex('g');
            graph.addEdge(vertexR, vertexA, 2.2);
            graph.addEdge(vertexR, vertexB, 6.4);
            graph.addEdge(vertexR, vertexD, 12.5);
            graph.addEdge(vertexD, vertexC, 1.0);
            graph.addEdge(vertexD, vertexE, 9.75);
            graph.addEdge(vertexE, vertexH, 4.0);
            graph.addEdge(vertexE, vertexF, 3.4);
            graph.addEdge(vertexF, vertexG, 1.4);

            const mstVertexR = expectedMst.addVertex('r');
            const mstVertexA = expectedMst.addVertex('a');
            const mstVertexB = expectedMst.addVertex('b');
            const mstVertexD = expectedMst.addVertex('d');
            const mstVertexC = expectedMst.addVertex('c');
            const mstVertexE = expectedMst.addVertex('e');
            const mstVertexH = expectedMst.addVertex('h');
            const mstVertexF = expectedMst.addVertex('f');
            const mstVertexG = expectedMst.addVertex('g');
            expectedMst.addEdge(mstVertexR, mstVertexA, 2.2);
            expectedMst.addEdge(mstVertexR, mstVertexB, 6.4);
            expectedMst.addEdge(mstVertexR, mstVertexD, 12.5);
            expectedMst.addEdge(mstVertexD, mstVertexC, 1.0);
            expectedMst.addEdge(mstVertexD, mstVertexE, 9.75);
            expectedMst.addEdge(mstVertexE, mstVertexH, 4.0);
            expectedMst.addEdge(mstVertexE, mstVertexF, 3.4);
            expectedMst.addEdge(mstVertexF, mstVertexG, 1.4);

            const expectedMstVertices = expectedMst.vertices.map(vertex => vertex.name);
            const expectedMstEdges = expectedMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            const resultingMst = graph.findMSTWithPrims('r');
            const resultingMstVertices = resultingMst.vertices.map(vertex => vertex.name);
            const resultingMstEdges = resultingMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            expect(resultingMstVertices.sort()).toEqual(expectedMstVertices.sort());
            expect(resultingMstEdges.sort()).toEqual(expectedMstEdges.sort());
        });

        it('MST official test case 2', () => {
            const vertexR = graph.addVertex('r');
            const vertexA = graph.addVertex('a');
            const vertexB = graph.addVertex('b');
            const vertexD = graph.addVertex('d');
            const vertexC = graph.addVertex('c');
            const vertexE = graph.addVertex('e');
            const vertexH = graph.addVertex('h');
            const vertexF = graph.addVertex('f');
            const vertexG = graph.addVertex('g');
            graph.addEdge(vertexR, vertexA, 2.2);
            graph.addEdge(vertexR, vertexB, 6.4);
            graph.addEdge(vertexR, vertexD, 12.5);
            graph.addEdge(vertexD, vertexC, 1.0);
            graph.addEdge(vertexD, vertexE, 9.75);
            graph.addEdge(vertexE, vertexH, 4.0);
            graph.addEdge(vertexE, vertexF, 3.4);
            graph.addEdge(vertexF, vertexG, 1.4);
            graph.addEdge(vertexA, vertexB, 7.0);
            graph.addEdge(vertexA, vertexC, 14.5);
            graph.addEdge(vertexR, vertexC, 10.3);
            graph.addEdge(vertexB, vertexD, 18.8);
            graph.addEdge(vertexB, vertexE, 31.1);
            graph.addEdge(vertexB, vertexH, 30.5);
            graph.addEdge(vertexC, vertexE, 12.6);
            graph.addEdge(vertexC, vertexG, 23.5);
            graph.addEdge(vertexD, vertexH, 13.0);
            graph.addEdge(vertexH, vertexF, 8.8);
            graph.addEdge(vertexH, vertexG, 12.8);

            const mstVertexR = expectedMst.addVertex('r');
            const mstVertexA = expectedMst.addVertex('a');
            const mstVertexB = expectedMst.addVertex('b');
            const mstVertexD = expectedMst.addVertex('d');
            const mstVertexC = expectedMst.addVertex('c');
            const mstVertexE = expectedMst.addVertex('e');
            const mstVertexH = expectedMst.addVertex('h');
            const mstVertexF = expectedMst.addVertex('f');
            const mstVertexG = expectedMst.addVertex('g');
            expectedMst.addEdge(mstVertexR, mstVertexA, 2.2);
            expectedMst.addEdge(mstVertexR, mstVertexB, 6.4);
            expectedMst.addEdge(mstVertexR, mstVertexC, 10.3);
            expectedMst.addEdge(mstVertexC, mstVertexD, 1.0);
            expectedMst.addEdge(mstVertexD, mstVertexE, 9.75);
            expectedMst.addEdge(mstVertexE, mstVertexH, 4.0);
            expectedMst.addEdge(mstVertexE, mstVertexF, 3.4);
            expectedMst.addEdge(mstVertexF, mstVertexG, 1.4);

            const expectedMstVertices = expectedMst.vertices.map(vertex => vertex.name);
            const expectedMstEdges = expectedMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            const resultingMst = graph.findMSTWithPrims('r');
            const resultingMstVertices = resultingMst.vertices.map(vertex => vertex.name);
            const resultingMstEdges = resultingMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            expect(resultingMstVertices.sort()).toEqual(expectedMstVertices.sort());
            expect(resultingMstEdges.sort()).toEqual(expectedMstEdges.sort());
        });

        it('MST official test case 3', () => {
            const vertexR = graph.addVertex('r');
            const vertexA = graph.addVertex('a');
            const vertexB = graph.addVertex('b');
            const vertexD = graph.addVertex('d');
            const vertexC = graph.addVertex('c');
            const vertexE = graph.addVertex('e');
            const vertexF = graph.addVertex('f');
            graph.addEdge(vertexR, vertexA, 2.0);
            graph.addEdge(vertexR, vertexC, 1.0);
            graph.addEdge(vertexA, vertexC, 3.0);
            graph.addEdge(vertexA, vertexD, 10.0);
            graph.addEdge(vertexB, vertexR, 4.0);
            graph.addEdge(vertexB, vertexE, 5.0);
            graph.addEdge(vertexC, vertexB, 2.0);
            graph.addEdge(vertexC, vertexD, 2.0);
            graph.addEdge(vertexC, vertexE, 8.0);
            graph.addEdge(vertexC, vertexF, 4.0);
            graph.addEdge(vertexD, vertexF, 6.0);
            graph.addEdge(vertexF, vertexE, 1.0);

            const mstVertexR = expectedMst.addVertex('r');
            const mstVertexA = expectedMst.addVertex('a');
            const mstVertexB = expectedMst.addVertex('b');
            const mstVertexD = expectedMst.addVertex('d');
            const mstVertexC = expectedMst.addVertex('c');
            const mstVertexE = expectedMst.addVertex('e');
            const mstVertexF = expectedMst.addVertex('f');
            expectedMst.addEdge(mstVertexR, mstVertexA, 2.0);
            expectedMst.addEdge(mstVertexR, mstVertexC, 1.0);
            expectedMst.addEdge(mstVertexC, mstVertexF, 4.0);
            expectedMst.addEdge(mstVertexC, mstVertexB, 2.0);
            expectedMst.addEdge(mstVertexC, mstVertexD, 2.0);
            expectedMst.addEdge(mstVertexF, mstVertexE, 1.0);

            const expectedMstVertices = expectedMst.vertices.map(vertex => vertex.name);
            const expectedMstEdges = expectedMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            const resultingMst = graph.findMSTWithPrims('r');
            const resultingMstVertices = resultingMst.vertices.map(vertex => vertex.name);
            const resultingMstEdges = resultingMst.vertices
                .map(vertex => vertex.edges.map(edge => edge.toString()))
                .flat();

            expect(resultingMstVertices.sort()).toEqual(expectedMstVertices.sort());
            expect(resultingMstEdges.sort()).toEqual(expectedMstEdges.sort());
        });
    });
});
