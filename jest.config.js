const { defaults } = require('jest-config')

module.exports = {
  'preset': 'jest-expo',
  'setupTestFrameworkScriptFile': '<rootDir>/setup-tests.config.js',
  'transform': {
    /*
     * Stop jest from falling over on its face.
     * cf. https://github.com/expo/expo/issues/2595#issuecomment-440966998
     * cf. https://github.com/facebook/react-native/issues/22175#issuecomment-436959462
     */
    '\\.js$': '<rootDir>/jest.preprocessor.js',
  },
  'transformIgnorePatterns': [
    'node_modules/(?!react-native|react-navigation)/'
  ],
  'coveragePathIgnorePatterns': [
    ...defaults.coveragePathIgnorePatterns,
    '.config.js'
  ]
}
