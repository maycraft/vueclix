<template>
    <div className="card" @click="handleClick" v-if="isLoaded">
        <div className="card__image">
            <img v-if="hasPoster" :src="posterURL" :alt="title" />
            <img v-else :src="require('@/assets/img/no_poster.jpg')" :alt="title" />
        </div>
        <p className="card__title">{{ `${title} (${releaseDate})` }}</p>
        <p className="card__genres">{{ movieGenres }}</p>
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
<style lang="scss"></style>
