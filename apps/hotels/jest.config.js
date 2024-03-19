module.exports = {
    rootDir: 'apps',
    displayName: name,
    name,
    preset: 'ts-jest',
    coveragePathIgnorePatterns: ['main.ts', 'swagger.ts', 'node_modules', 'module.ts', 'interface.ts'],
    setupFilesAfterEnv: ['../../../tests/common-initialization.js', '../tests/initialization.js'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../../../',
    }),
};
