import { IGraph } from './IGraph';
import { SimpleGraph } from './SimpleGraph';

describe('graph', () => {
    let graph: IGraph;

    describe('undirected, weighted', () => {
        beforeEach(() => {
            graph = new SimpleGraph(false, true);
            graph.addVertex('a');
            graph.addVertex('b');
            graph.addVertex('c');
            graph.addVertex('d');
            graph.addEdge('a', 'b', 10);
            graph.addEdge('a', 'c', 20);
            graph.addEdge('a', 'd', 60);
            graph.addEdge('b', 'c', 50);
            graph.addEdge('b', 'd', 40);
            graph.addEdge('d', 'c', 30);
        });

        it('minimum spanning tree works', () => {
            const expectedMst: IGraph = new SimpleGraph(false, true);
            expectedMst.addVertex('a');
            expectedMst.addVertex('b');
            expectedMst.addVertex('c');
            expectedMst.addVertex('d');
            expectedMst.addEdge('a', 'b', 10);
            expectedMst.addEdge('a', 'c', 20);
            expectedMst.addEdge('b', 'd', 40);
            expectedMst.addEdge('d', 'c', 30);

            /**
             * a: (b, 10), (c, 20)
             * b: (a, 10), (d, 40)
             * c: (a, 20), (d, 30)
             * d: (b, 40), (c, 30)
             */

            console.log(expectedMst.toString());
            expect(graph.findMSTWithPrims('a').toString()).toBe(expectedMst.toString());
        });
    });

    // describe('directed, unweighted', () => {
    //     beforeEach(() => {
    //         graph = new SimpleGraph(true, false);
    //     });
    // });
    //
    // describe('undirected, unweighted', () => {
    //     beforeEach(() => {
    //         graph = new SimpleGraph(false, false);
    //     });
    // });
    //
    // describe('directed, weighted', () => {
    //     beforeEach(() => {
    //         graph = new SimpleGraph(true, true);
    //     });
    // });
});
