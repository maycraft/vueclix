<template>
    <v-loader v-if="loading"></v-loader>
    <app-error v-if="error" :errMsg="error"></app-error>
    <not-found v-if="wrongPage"></not-found>
    <div v-if="movies?.length" class="cards">
        <movie-card
            v-for="movie in movies"
            :key="movie.id"
            :id="movie.id"
            :poster="movie.poster_path"
            :title="movie.title"
            :release="movie.release_date"
            :genres="movie.genre_ids"
            :rating="movie.vote_average"
            @click="$router.push(`/movie/${movie.id}`)"
        ></movie-card>
        <app-pagination
            v-if="category !== 'search'"
            :current="currentPage"
            :total="totalPages"
            :pageCount="3"
            @change-page="changePage"
        ></app-pagination>
    </div>
    <not-found v-if="emptySearch" errMsg="По запросу ничего не найдено!"></not-found>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';
import AppPagination from '@/components/AppPagination';
import NotFound from '@/components/NotFound.vue';
import AppError from '@/components/AppError.vue';
import VLoader from '@/components/V-Loader';
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
    },
    created() {
        if (this.page && isNumeric(this.page)) {
            this.getMovies({ category: this.category, page: isNumeric(this.page) });
        } else {
            this.setSearchQuery(this.$route.query.q);
            this.getMovies({ category: this.category, query: this.$route.query.q });
        }
    },
    updated() {
        this.$nextTick(function () {
            window.scrollTo(0, 0);
        });
    },
    methods: {
        ...mapActions(['getMovies', 'changeMoviesPage', 'setSearchQuery']),
        changePage(page) {
            this.changeMoviesPage({ category: this.category, page });
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
.cards {
    @extend .row;
    --bs-gutter-x: 30px;
    border-radius: 5px;
    background-color: $white;
    padding-top: calc(var(--bs-gutter-x) / 2);
    padding-bottom: calc(var(--bs-gutter-x) / 2);
    justify-content: flex-start;

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
}
</style>
