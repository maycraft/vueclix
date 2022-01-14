<template>
    <loading
        :active="true"
        :color="color"
        :loader="type"
        :background-color="bgColor"
        :width="100"
        :is-full-page="isFullPage"
    ></loading>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'v-loader',
    components: {
        Loading,
    },
    props: {
        type: {
            type: String,
            default: 'dots',
        },
        isFullPage: {
            type: Boolean,
            default: true,
        },
        bgColor: {
            type: String,
            default: '#000',
        },
        color: {
            type: String,
            default: '#0277bd',
        },
    },
};
</script>
