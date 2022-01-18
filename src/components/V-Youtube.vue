<template>
    <div class="relation video">
        <div class="relation__ratio">
            <v-loader
                v-if="!isLoaded"
                loader="bars"
                :isFullPage="false"
                color="#FF0101"
                :opacity="1"
            ></v-loader>
            <iframe
                v-show="isLoaded"
                @load="loadVideo"
                class="relation__content"
                :src="'https://www.youtube.com/embed/' + videoKey"
                title="YouTube video player"
                allowFullScreen
            ></iframe>
        </div>
    </div>
</template>
<script>
import VLoader from '@/components/V-Loader';
export default {
    name: 'v-youtube',
    props: {
        videoKey: {
            type: String,
            required: true,
        },
    },
    components: {
        VLoader,
    },
    data() {
        return {
            isLoaded: false,
        };
    },
    methods: {
        loadVideo() {
            this.isLoaded = true;
        },
    },
};
</script>
<style lang="scss">
.relation {
    margin: 0 auto;
    position: relative;
}

.relation__ratio {
    padding-top: 56.25%;
    height: 0;
}

.relation__content {
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.video {
    max-width: 700px;
    margin-bottom: 1rem;
}
</style>
