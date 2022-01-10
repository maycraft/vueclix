<template>
    <loading
        :active="true"
        color="#0277bd"
        :loader="type"
        background-color="#000"
        :width="100"
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
    },
};
</script>
