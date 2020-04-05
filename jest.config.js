module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': '@sucrase/jest-plugin',
  },
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'svelte'],
}
