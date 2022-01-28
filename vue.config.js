module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vueclix/' : '/',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/main.scss";`,
            },
        },
    },
    devServer: {
        clientLogLevel: 'info',
    },
};
