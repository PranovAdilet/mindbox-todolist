

const config = {
    verbose: true,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.scss$': 'identity-obj-proxy', //identity-obj-proxy
    },
    transform: {'\\.scss$': 'jest-transform-stub',} //jest-transform-stub
};

export default config
