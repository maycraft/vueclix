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

// @import "@/assets/scss/_variables.scss";
// @import "@/assets/scss/_fonts.scss";
// @import "@/assets/scss/lib/_custom-grid.scss";
// @import "@/assets/scss/lib/_normalize.scss";
