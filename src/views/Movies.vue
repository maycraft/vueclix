<template>
    <v-loader v-if="loading"></v-loader>
    <app-error v-if="error" :errMsg="error"></app-error>
    <not-found v-if="wrongPage"></not-found>
    <div class="movies" v-if="movies?.length">
        <div class="cards">
            <movie-card
                v-for="movie in movies"
                :key="movie.filmId"
                :id="movie.filmId"
                :poster="movie.posterUrl"
                :title="movie.nameRu"
                :genres="movie.genres"
                :rating="movie.rating"
                @click="$router.push(`/movie/${movie.filmId}`)"
            ></movie-card>
        </div>
        <app-pagination
            v-if="category !== 'search'"
            :current="currentPage"
            :total="totalPages"
            :pageCount="3"
            @change-page="changePage"
        ></app-pagination>
    </div>
    <scroll-top @scroll="scrollUp" />
    <not-found v-if="emptySearch" errMsg="По запросу ничего не найдено!"></not-found>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import AppPagination from '@/components/AppPagination';
import NotFound from '@/components/NotFound.vue';
import AppError from '@/components/AppError.vue';
import VLoader from '@/components/VLoader.vue';
import ScrollTop from '@/components/ScrollTop';

import { isNumeric } from '@/utils';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Movies',
    components: {
        MovieCard,
        AppPagination,
        NotFound,
        AppError,
        VLoader,
        ScrollTop,
    },
    created() {
        if (this.page && isNumeric(this.page)) {
            this.getMovies({ category: this.category, page: isNumeric(this.page) });
        } else {
            this.setSearchQuery(this.$route.query.q);
            this.getMovies({ category: this.category, query: this.$route.query.q });
        }
    },
    methods: {
        ...mapActions(['getMovies', 'changeMoviesPage', 'setSearchQuery']),
        changePage(page) {
            this.changeMoviesPage({ category: this.category, page });
        },
        scrollUp() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
    },
    computed: {
        ...mapGetters(['movies', 'currentPage', 'totalPages', 'error', 'loading']),
        wrongPage() {
            if (this.category !== 'search') {
                return !(isNumeric(this.page) && this.currentPage <= this.totalPages);
            } else {
                return false;
            }
        },
        emptySearch() {
            return this.category === 'search' && this.movies ? !this.movies?.length : false;
        },
        page() {
            return this.$route.query.page;
        },
        category() {
            return this.$route.params.category;
        },
    },
    watch: {
        $route(to) {
            if (isNumeric(to.query.page)) {
                this.getMovies({ category: to.params.category, page: isNumeric(to.query.page) });
                this.changeMoviesPage({
                    category: to.params.category,
                    page: isNumeric(to.query.page),
                });
            }
        },
    },
};
</script>
<style lang="scss">
.movies {
    background-color: $white;
    margin-left: auto;
    margin-right: auto;
    padding-top: calc($gutter / 2);
    padding-bottom: calc($gutter / 2);

    @include media-breakpoint-up(sm) {
        margin-left: calc($gutter / -2);
        margin-right: calc($gutter / -2);
    }
    @include media-breakpoint-up(md) {
        border-radius: 5px;
    }
}
.cards {
    @extend %row;
    justify-content: center;
    position: relative;
    margin: 0;

    @include media-breakpoint-up(sm) {
        justify-content: flex-start;
    }
}
.ellipsis {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
