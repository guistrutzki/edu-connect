module.exports = api => {
  api.cache(true)
  return {
    presets: [
      [
        'babel-preset-expo',
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@utils': './src/utils',
            '@screens': './src/screens',
            '@components': './src/components',
            '@routes': './src/routes',
            '@services': './src/services',
          },
        },
      ],
    ],
  }
}
