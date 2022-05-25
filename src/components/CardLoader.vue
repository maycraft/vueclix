<template>
    <content-loader
        viewBox="0 0 250 350"
        :speed="2"
        primaryColor="#cccccc"
        secondaryColor="#ecebeb"
    >
        <rect x="4" y="0" rx="0" ry="0" width="297" height="508" />
    </content-loader>
</template>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
    name: 'CardLoader',
    components: { ContentLoader },
};
</script>
