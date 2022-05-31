<template>
    <img class="slider__item" :src="source" alt="slide" />
</template>

<script>
export default {
    props: {
        source: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.slider {
    &__item {
        aspect-ratio: 16/9;
        object-fit: cover;
        object-position: top center;
    }
}
</style>
