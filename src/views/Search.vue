<template>
    <v-loader v-if="loading"></v-loader>
    <app-error v-if="error" :errMsg="error"></app-error>
    <not-found v-if="notFound" errMsg="По запросу ничего не найдено!"></not-found>
    <div v-if="movies?.length" class="cards">
        <movie-card
            v-for="movie in movies"
            :key="movie.id"
            :id="movie.id"
            :poster="movie.poster_path"
            :title="movie.title"
            :release="movie.release_date"
            :genres="movie.genre_ids"
            @click="this.$router.push(`/movie/${movie.id}`)"
        ></movie-card>
    </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import AppError from '@/components/AppError.vue';
import NotFound from '@/components/NotFound.vue';
import VLoader from '@/components/V-Loader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Movies',
    components: {
        MovieCard,
        NotFound,
        AppError,
        VLoader,
    },
    created() {
        const query = this.$route.query.q;
        this.getQueryMovies(query);
    },
    updated() {
        this.$nextTick(function () {
            window.scrollTo(0, 0);
        });
    },
    methods: {
        ...mapActions(['getQueryMovies']),
    },
    computed: {
        ...mapGetters(['movies', 'loading', 'error']),
        notFound() {
            return this.movies?.length === 0;
        },
    },
};
</script>
<style lang="scss">
.cards {
    @extend .row;
    --bs-gutter-x: 30px;
    border-radius: 5px;
    background-color: $white;
    padding-top: calc(var(--bs-gutter-x) / 2);
    padding-bottom: calc(var(--bs-gutter-x) / 2);
    justify-content: flex-start;
}
.card {
    max-width: 350px;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;

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
        color: #0277bd;
        min-height: 1.5rem;
        margin-top: auto;
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
