<template>
    <v-loader v-if="loading"></v-loader>
    <div v-if="bgImg" :style="backgroundImage" class="movie__background"></div>
    <div class="actor" v-if="actor">
        <div class="actor__description">
            <div class="actor__poster">
                <img :src="actor.poster" :alt="actor.nameRu" />
            </div>
            <div class="actor__info">
                <h1 class="actor__title">{{ actor.nameRu }}</h1>
                <p class="py-2"><b class="me-1">Дата рождения:</b> {{ actor.birthday }}</p>
                <p v-if="actor.death" class="py-2">
                    <b class="me-1">Дата смерти:</b> {{ actor.death }}
                </p>
                <p class="py-2"><b class="me-1">Место рождения:</b> {{ actor.place }}</p>
                <div class="actor__biography" v-if="actor.facts" ref="biography" @click="onClick">
                    <h3>Биография:</h3>
                    <p v-for="(part, i) in actor.facts" :key="i">
                        {{ part }}
                    </p>
                </div>
            </div>
        </div>
        <div class="actor__movie-list movie-list">
            <h3>Фильмография:</h3>
            <ul class="movie-list__items">
                <li class="movie-list__item" v-for="movie in actor.movies" :key="movie.id">
                    <router-link
                        class="movie-list__title"
                        :to="{ name: 'movie', params: { id: movie.id } }"
                        >{{ movie.title || movie.originalTitle }}</router-link
                    >
                    <span class="movie-list__line"></span><span>{{ movie.role }}</span>
                </li>
            </ul>
        </div>
        <button class="backward" @click="$router.go(-1)">Назад</button>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { isNumeric } from '@/utils';
import VLoader from '@/components/VLoader.vue';

export default {
    components: { VLoader },
    created() {
        const id = isNumeric(this.id);
        if (!(this.actor && this.actor.id === id)) {
            this.fetchActorByID(id);
        }
    },

    data() {
        return {
            id: this.$route.params.id,
        };
    },
    methods: {
        ...mapActions(['fetchActorByID']),
        onClick() {
            this.$refs.biography.style.display = 'inline';
        },
    },
    computed: {
        ...mapGetters(['actor', 'loading', 'error', 'bgImg']),
        backgroundImage() {
            return `background-image: url(${this.bgImg})`;
        },
    },
};
</script>

<style lang="scss">
.actor {
    @extend %row;
    position: relative;
    background: $white;
    margin-left: auto;
    margin-right: auto;
    padding-top: 2.5rem;
    padding-bottom: calc($gutter / 2);
    background: rgba(255, 255, 255, 0.85);

    @include media-breakpoint-up(xl) {
        display: flex;
        justify-content: center;
    }

    &__description {
        @include make-col();
    }

    &__poster {
        width: 100%;

        @include media-breakpoint-up(sm) {
            float: left;
            max-height: 100%;
            width: 40%;
            margin-right: calc($gutter / 2);
            margin-bottom: calc($gutter / 2);
        }
        @include media-breakpoint-up(lg) {
            width: 30%;
        }
        & img {
            border-radius: 5px;
            overflow: hidden;
        }
    }

    &__info {
        @include media-breakpoint-up(sm) {
            display: inline;
            width: 60%;
        }
        @include media-breakpoint-up(lg) {
            width: 70%;
        }
    }

    &__biography {
        width: 100%;
        -webkit-line-clamp: 20;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;

        @include media-breakpoint-up(sm) {
            display: inline;
        }
        p {
            text-indent: 1.2rem;
            line-height: 1.6;

            &:first-of-type {
                text-indent: 0;
            }
        }
    }

    &__movie-list {
        padding-top: 1.5rem;
        @include make-col();

        @include media-breakpoint-up(xl) {
            @include make-col(10);
        }
    }

    &__description {
        @include media-breakpoint-up(xl) {
            @include make-col(10);
        }
    }

    &__title {
        text-align: left;
    }
}
.movie-list {
    &__item {
        display: flex;
        padding: 0.4rem 0;
    }
    &__title {
        width: 80vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @include media-breakpoint-up(sm) {
            width: auto;
        }

        &:hover {
            color: $blue;
        }
    }
    &__line {
        border-bottom: 1px dashed rgba(31, 32, 65, 0.25);
        flex-grow: 1;
    }
}
</style>
