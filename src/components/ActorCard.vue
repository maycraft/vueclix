<template>
    <div class="actor-card" :key="id" @click="$emit('detail')">
        <figure class="actor-card__avatar">
            <img :src="imagePath" :alt="name" v-if="imagePath" />
            <div class="actor-card__avatar_slug" v-else>
                <img
                    v-if="gender === 1"
                    src="@/assets/img/no_female_image.svg"
                    alt="female avatar"
                />
                <img v-else src="@/assets/img/no_male_image.svg" alt="male avatar" />
            </div>
        </figure>
        <div class="actor-card__wrapper">
            <p class="actor-card__name ellipsis">{{ name }}</p>
            <p class="actor-card__character ellipsis">{{ character }}</p>
        </div>
    </div>
</template>
<script>
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
            type: String,
            required: true,
        },
        gender: {
            type: Number,
            required: true,
        },
    },
    // computed: {
    //     imageURL() {
    //         return POSTER_URL_SM + this.imagePath;
    //     },
    // },
};
</script>
<style lang="scss">
.actor-card {
    @include make-col(6);
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7rem;
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
        overflow: hidden;
        height: 100%;

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
