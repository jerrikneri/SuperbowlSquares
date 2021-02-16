module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: 8090,
        host: 'squares.test',
        proxy: {
            '/api': {
                target: 'https://superbowl.test/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
        // proxy: 'https://superbowl.test'
        // proxy: {
        //     '^/api': {
        //         target: 'https://superbowl.test/api',
        //         changeOrigin: true,
        //         secure: true,
        //         pathRewrite: {'^/api': '/api'},
        //         logLevel: 'debug' 
        //     },
        // }
    }
};
