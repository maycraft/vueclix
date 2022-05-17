<template>
    <div className="card" @click="handleClick" v-if="isLoaded">
        <div className="card__image">
            <img v-if="hasPoster" :src="poster" :alt="title" />
            <img v-else :src="require('@/assets/img/no_poster.jpg')" :alt="title" />
        </div>
            <h5 :title="`${title} ${year !== 'null' ? `(${year})` : ''}`" className="card__title ellipsis">{{ title }}<span v-if="year !== 'null'">{{ ` (${year})` }}</span></h5>
        <p :title="movieGenres" className="card__genres ellipsis">{{ movieGenres }}</p>
        <span v-if="floatRating" class="card__rating">{{ floatRating }}</span>
    </div>
    <card-loader v-else></card-loader>
</template>
<script>
import CardLoader from '@/components/CardLoader.vue';
import { getMovieGenres } from '@/utils';

export default ({
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
        genres: {
            type: Array,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            require: true,
        }
    },
    components: {
        CardLoader,
    },
    created() {
        if (this.poster) {
            const img = new Image();
            img.src = this.poster;
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
        floatRating() {
            return this.rating <= 10 ? this.rating : '';
        },
        movieGenres() {
            return getMovieGenres(this.genres);
        },
    },
});
</script>
<style lang="scss">
.card {
    max-width: 400px;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    background-color: $white;
    transition: transform 0.35s ease;
    @include make-col(12);

    // @media screen and (max-width: 576px) {
    //     margin-bottom: 1rem;
    // }

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

    &__genres {
        font-size: 13px;
        color: $blue;
        min-height: 1.5rem;
        margin-top: auto;

        // @media screen and (max-width: 576px) {
        //     font-size: 1.2em;
        // }
    }

    &__rating {
        color: $white;
        background: $green;
        padding: 5px;
        position: absolute;
        top: 10px;
        left: 25px;
        min-width: 32px;
        text-align: center;

        @media screen and (max-width: 576px) {
            // left: 40px;
        }
    }
    &:hover {
        @extend %scale-card;
    }

    &:hover &__rating {
        top: 25px;
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

@include media-breakpoint-up(xxl) {
    .card {
        width: 20%;
    }
}
</style>
