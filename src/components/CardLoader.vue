<template>
    <content-loader
        :height="410"
        width="100%"
        :speed="2"
        primaryColor="#cccccc"
        secondaryColor="#ecebeb"
        class="card"
    >
        <rect x="0" y="351" rx="0" ry="0" width="250" height="17" />
        <rect x="0" y="373" rx="0" ry="0" width="250" height="13" />
        <rect x="0" y="0" rx="0" ry="0" width="250" height="345" />
    </content-loader>
</template>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
    name: 'CardLoader',
    components: { ContentLoader },
};
</script>
