module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_fonts.scss";
                    @import "@/assets/scss/lib/_custom-grid.scss";
                    @import "@/assets/scss/lib/_normalize.scss";
                `,
            },
        },
    },
};
