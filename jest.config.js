/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          moduleResolution: 'node',
          strict: false,
        },
      },
    ],
  },
  // Allow ts-jest to transform ESM-only packages inside node_modules that
  // React Native ships as ES Modules (async-storage, supabase-js, etc.)
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      '@react-native-async-storage/async-storage|' +
      '@supabase/supabase-js|' +
      '@supabase/realtime-js|' +
      '@supabase/postgrest-js|' +
      '@supabase/storage-js|' +
      '@supabase/functions-js|' +
      'node-fetch|' +
      'cross-fetch|' +
      '@expo/vector-icons|' +
      'expo-modules-core' +
    ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
