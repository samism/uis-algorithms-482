const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    roots: ['<rootDir>/src'],
    verbose: true,
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        ...tsjPreset.transform,
    },
    testMatch: ['**/*.spec.(ts|js)'],
};
