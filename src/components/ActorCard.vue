<template>
    <div class="actor" :key="id">
        <figure class="actor__avatar">
            <img :src="imageURL" :alt="name" v-if="imagePath" />
            <div class="actor__avatar_slug" v-else>
                <img
                    v-if="gender === 1"
                    src="@/assets/img/no_female_image.svg"
                    alt="female avatar"
                />
                <img v-else src="@/assets/img/no_male_image.svg" alt="male avatar" />
            </div>
        </figure>
        <p class="actor__name">{{ name }}</p>
        <p class="actor__character">{{ character }}</p>
    </div>
</template>
<script>
import { POSTER_URL_SM } from '@/constants';
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
    computed: {
        imageURL() {
            return POSTER_URL_SM + this.imagePath;
        },
    },
};
</script>
<style lang="scss">
.actor {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7rem;
    text-align: center;

    &__avatar {
        @media screen and (max-width: 576px) {
            padding: 0 var(--bs-gutter-x);
        }
        &_slug {
            background: #e6e6e6;
            max-width: 300px;
        }

        svg,
        img {
            max-width: 100%;
        }
    }

    &__name {
        margin-top: auto;
        color: #424242;
    }

    &__character {
        font-size: 0.75rem;
        color: #9e9e9e;
    }
}
</style>
