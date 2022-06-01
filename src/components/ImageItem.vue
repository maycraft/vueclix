<template>
    <figure v-lazyload class="image__wrapper">
        <skeleton-block class="image__loader" effect="wave" />
        <img class="image__item" :data-url="source" :alt="title" />
    </figure>
</template>

<script>
import LazyLoadDirective from '@/utils/LazyLoadDirective.js';
import 'skeleton-elements/scss';

import { SkeletonBlock } from 'skeleton-elements/vue';

export default {
    props: {
        source: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
    },
    directives: {
        lazyload: LazyLoadDirective,
    },
    components: {
        SkeletonBlock,
    },
};
</script>

<style lang="scss">
.image {
    &__wrapper {
        position: relative;
        padding-top: 140%;
        height: 0;
        width: 100%;
        overflow: hidden;

        &.loaded {
            .image {
                &__item {
                    visibility: visible;
                    opacity: 1;
                }
                &__loader {
                    display: none;
                }
            }
        }
    }

    &__loader {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    &__item {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        visibility: hidden;
    }
}
</style>
