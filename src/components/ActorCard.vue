<template>
    <div class="actor-card" :key="id" @click="$emit('detail')">
        <image-item :source="imagePath" :title="name" class="actor-card__avatar" />
        <div class="actor-card__wrapper">
            <p :title="name" class="actor-card__name ellipsis">{{ name }}</p>
            <p :title="character" class="actor-card__character ellipsis">{{ character }}</p>
        </div>
    </div>
</template>
<script>
import ImageItem from '@/components/ImageItem.vue';

export default {
    name: 'ActorCard',
    props: {
        id: {
            type: Number,
            required: true,
        },
        imagePath: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        character: {
            type: [String, null],
            required: true,
        },
        gender: {
            type: Number,
            required: true,
        },
    },
    components: {
        ImageItem,
    },
};
</script>
<style lang="scss">
.actor-card {
    @include make-col(6);
    display: flex;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    background: white;
    position: relative;
    transition: transform 0.35s ease;

    @include media-breakpoint-up(sm) {
        @include make-col(4);
    }

    @include media-breakpoint-up(md) {
        @include make-col(3);
    }

    @include media-breakpoint-up(lg) {
        @include make-col(2);
    }

    &__wrapper {
        height: 20%;
    }

    &__avatar {
        margin-bottom: 5px;
        border-radius: 5px 5px 0 0;

        &_slug {
            background: #e6e6e6;
            position: relative;
            padding: 75% 0%;
            overflow: hidden;

            img {
                position: absolute;
                top: 0;
                left: 0;
                object-fit: cover;
            }
        }
    }

    &__name {
        color: #424242;
    }

    &__character {
        font-size: 13px;
        color: #9e9e9e;
    }

    &:hover {
        @extend %scale-card;
    }
}
</style>
