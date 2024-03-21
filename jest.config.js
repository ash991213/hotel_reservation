module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.', // 현재 디렉토리를 root로 설정합니다. 필요에 따라 조정할 수 있습니다.
    testRegex: '.*\\.spec\\.ts$', // .spec.ts로 끝나는 파일을 테스트 파일로 간주합니다.
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest', // TypeScript 파일을 처리하기 위한 설정입니다.
    },
    collectCoverageFrom: ['**/*.(t|j)s'], // 커버리지를 수집할 파일을 지정합니다.
    coveragePathIgnorePatterns: ['main.ts', 'swagger.ts', 'node_modules', 'module.ts', 'interface.ts'],
    coverageDirectory: './coverage', // 커버리지 리포트를 저장할 디렉토리를 지정합니다.
    testEnvironment: 'node', // node 환경에서 테스트를 실행합니다.
    roots: [
        '<rootDir>/apps/hotels/', // hotels 앱의 루트 디렉토리를 지정합니다. 구조에 맞게 조정해주세요.
        '<rootDir>/libs/', // libs 디렉토리를 지정합니다. 필요에 따라 추가적인 디렉토리를 추가할 수 있습니다.
    ],
    moduleNameMapper: {
        '^@apps/hotels/(.*)$': '<rootDir>/apps/hotels/$1', // 모듈 경로 별칭을 설정합니다.
        '^@libs/entity/(.*)$': '<rootDir>/libs/entity/$1',
        '^@libs/core/(.*)$': '<rootDir>/libs/core/$1',
        '^@libs/utils/(.*)$': '<rootDir>/libs/utils/$1',
        '^@libs/modules/(.*)$': '<rootDir>/libs/modules/$1',
    },
};
