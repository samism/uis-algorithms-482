import { promises } from 'fs';
import * as path from 'path';
import os from 'os';
import inquirer from 'inquirer';

import { SimpleGraph } from './SimpleGraph';

function initializeGraph(fileContent: Buffer): void {
    const [header, ...vertices]: string[] = fileContent.toString().split('\r\n');

    const graph: SimpleGraph = ((header: string): SimpleGraph => {
        switch (header) {
            case 'directed unweighted':
                return new SimpleGraph(true, false);
            case 'directed weighted':
                return new SimpleGraph(true, true);
            case 'undirected unweighted':
                return new SimpleGraph(false, false);
            case 'undirected weighted':
                return new SimpleGraph(false, true);
            default:
                return new SimpleGraph(false, false);
        }
    })(header);

    vertices
        .filter(vertex => vertex) // only iterate lines with content (not falsy)
        .forEach(vertex => {
            const [origin, destination, weight] = vertex.split('=');

            graph.addVertex(origin);

            if (destination) {
                graph.addVertex(destination);
                graph.addEdge(origin, destination, +weight);
            }
        });

    console.log(graph.toString());
}

inquirer
    .prompt([
        {
            type: 'input',
            name: 'inputFileName',
            message: 'Place your graph inputs in a .txt file. Path to file (relative or absolute): ',
            filter: (input: string): any => input.trim().replace('~', os.homedir()),
            validate: (input: string): boolean => !!input.match(/^([~.])?\/([A-z0-9-_+]+\/)*([A-z0-9-_+]+\.(txt))$/),
        },
    ])
    .then(({ inputFileName }) => promises.readFile(path.resolve(__dirname, inputFileName)))
    .then(fileContent => initializeGraph(fileContent))
    .catch(error => console.error(error));
