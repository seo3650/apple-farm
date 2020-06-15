module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        },
        host: 'ssal.sparcs.org',
        port: '8080'
    }
}