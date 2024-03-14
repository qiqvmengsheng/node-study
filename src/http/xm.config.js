module.exports = {
  serve: {
    proxy: {
      '/api': {
        target: 'http://localhost:2000',
        changeOrigin: true,
      },
    },
  },
}
