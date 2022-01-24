<template>
    <div className="card" @click="handleClick" v-if="isLoaded">
        <div className="card__image">
            <img v-if="hasPoster" :src="posterURL" :alt="title" />
            <img v-else :src="require('@/assets/img/no_poster.jpg')" :alt="title" />
        </div>
        <p className="card__title">{{ `${title} (${releaseDate})` }}</p>
        <p className="card__genres">{{ movieGenres }}</p>
        <span v-if="rating" class="card__rating">{{ rating }}</span>
    </div>
    <card-loader v-else></card-loader>
</template>
<script>
import CardLoader from '@/components/CardLoader.vue';
import { POSTER_URL_MD } from '@/constants';
import { getReleaseDate, getMovieGenres } from '@/utils';

export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
        },
        release: {
            type: String,
        },
        genres: {
            type: Array,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    components: {
        CardLoader,
    },
    created() {
        if (this.poster) {
            const img = new Image();
            img.src = POSTER_URL_MD + this.poster;
            img.onload = () => {
                this.setIsLoaded(true);
            };
        } else {
            this.setIsLoaded(true);
        }
    },
    data() {
        return {
            isLoaded: false,
        };
    },
    methods: {
        setIsLoaded(isLoaded) {
            this.isLoaded = isLoaded;
        },
    },
    computed: {
        hasPoster() {
            return !!this.poster;
        },
        posterURL() {
            return POSTER_URL_MD + this.poster;
        },
        releaseDate() {
            return getReleaseDate(this.release);
        },
        movieGenres() {
            return getMovieGenres(this.genres);
        },
    },
};
</script>
<style lang="scss">
.card {
    max-width: 350px;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;

    @media screen and (max-width: 576px) {
        margin-bottom: 1rem;
    }

    &__image {
        position: relative;
        margin-bottom: 0.5rem;
        overflow: hidden;
        padding-bottom: 150%;
        img {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        margin-bottom: 0.5rem;
    }

    &__genres {
        font-size: 0.75rem;
        color: $blue;
        min-height: 1.5rem;
        margin-top: auto;

        @media screen and (max-width: 576px) {
            font-size: 1.2em;
        }
    }

    &__rating {
        color: $white;
        background: $green;
        padding: 5px;
        position: absolute;
        top: 10px;
        left: 25px;
        // right: calc(80% + 5px);
        min-width: 32px;
        text-align: center;

        @media screen and (max-width: 576px) {
            // left: 40px;
        }
    }
}
@include media-breakpoint-up(sm) {
    .card {
        @include make-col(6);
    }
}
@include media-breakpoint-up(md) {
    .card {
        @include make-col(4);
    }
}
@include media-breakpoint-up(lg) {
    .card {
        @include make-col(3);
    }
}
</style>
