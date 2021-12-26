module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/main.scss";`,
            },
        },
    },

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
    },
};

// @import "@/assets/scss/_variables.scss";
// @import "@/assets/scss/_fonts.scss";
// @import "@/assets/scss/lib/_custom-grid.scss";
// @import "@/assets/scss/lib/_normalize.scss";
