<template>
    <v-loader v-if="loading"></v-loader>
    <not-found v-if="error" :errMsg="error"></not-found>
    <main class="movie" v-if="item">
        <h1 class="movie__title">{{ `${item.title} (${releaseYear})` }}</h1>
        <div class="movie__wrapper">
            <div class="movie__poster">
                <div v-if="imageURL">
                    <img :src="imageURL" :alt="item.title" v-show="showImage" @load="loadImg" />
                    <v-loader
                        v-if="!showImage"
                        type="spinner"
                        :isFullPage="false"
                        bgColor="#fff"
                    ></v-loader>
                </div>
                <img v-else src="@/assets/img/no_poster.jpg" :alt="item.title" />
                <div class="movie__rating rating">
                    <div class="rating__common">
                        <p>
                            Рейтинг
                            <a class="rating__link" href="https://www.themoviedb.org/">TMDB</a>:
                        </p>
                        <span class="rating__current">{{ item.rating }}/10</span>
                    </div>
                    <v-rating
                        :selected="selected"
                        :stars="stars"
                        :error="ratingError"
                        @select="onSelect"
                    />
                </div>
            </div>
            <div class="movie__info">
                <p v-if="item.original_title">
                    <b>Оригинальное название: </b>
                    {{ item.original_title }}
                </p>
                <p v-if="item.tagline">
                    <b>Слоган: </b>
                    {{ item.tagline }}
                </p>
                <p v-if="genres">
                    <b>Жанр: </b>
                    {{ genres }}
                </p>
                <p v-if="item.crew">
                    <b>Продюсер: </b>
                    {{ mapCrewItem(item.crew, 'Production') }}
                </p>
                <p v-if="item.crew">
                    <b>Режиссёр: </b>
                    {{ mapCrewItem(item.crew, 'Directing') }}
                </p>
                <p v-if="item.crew">
                    <b>Сценарий: </b>
                    {{ mapCrewItem(item.crew, 'Writing') }}
                </p>
                <p v-if="item.crew">
                    <b>Оператор: </b>
                    {{ mapCrewItem(item.crew, 'Camera') }}
                </p>
                <p v-if="item.crew">
                    <b>Композитор: </b>
                    {{ mapCrewItem(item.crew, 'Sound') }}
                </p>
                <p v-if="item.crew">
                    <b>Художник: </b>
                    {{ mapCrewItem(item.crew, 'Art') }}
                </p>
                <p v-if="item.crew">
                    <b>Монтаж: </b>
                    {{ mapCrewItem(item.crew, 'Editing') }}
                </p>
                <p v-if="item.release_date">
                    <b>Дата выхода: </b>
                    {{ item.release_date }}
                </p>
                <p v-if="item.homepage">
                    <b>Сайт: </b>
                    <a class="movie__link" :href="item.homepage" target="_blank" rel="noreferrer">
                        {{ item.homepage }}
                    </a>
                </p>
                <p v-if="countries">
                    <b>Страна: </b>
                    {{ countries }}
                </p>
                <p v-if="companies">
                    <b>Студия: </b>
                    {{ companies }}
                </p>
            </div>
        </div>

        <div class="movie__overview">
            <h3><b>Описание:</b></h3>
            <p>{{ item.overview }}</p>
        </div>
        <div>
            <h3><b> Трейлер:</b></h3>
            <template v-if="item.videos.length">
                <div class="trailer" :key="video.key" v-for="video in item.videos">
                    <h4 class="trailer__title">{{ video.name }}</h4>
                    <v-youtube :videoKey="video.key"></v-youtube>
                </div>
            </template>
            <p
                style="
                    {
                        'text-align': 'center';
                    }
                "
                v-else
            >
                Трейлер отсутствует
            </p>
            <h3><b>В главных ролях:</b></h3>
            <div class="movie__actors">
                <actor-card
                    :key="actor.id"
                    :id="actor.id"
                    :image-path="actor.profile_path"
                    :name="actor.name"
                    :character="actor.character"
                    :gender="actor.gender"
                    v-for="actor in item.cast"
                ></actor-card>
            </div>
        </div>
        <button class="backward" @click="$router.go(-1)">Назад</button>
    </main>
</template>
<script>
import ActorCard from '@/components/ActorCard.vue';
import NotFound from '@/components/NotFound.vue';
import VLoader from '@/components/VLoader.vue';
import VYoutube from '@/components/VYoutube.vue';
import VRating from '@/components/VRating.vue';

import { mapGetters, mapActions } from 'vuex';
import { POSTER_URL_SM } from '@/constants';
import { mapCrewItem } from '@/utils';
import { isNumeric } from '@/utils';
import { postRating, generateSessionID } from '@/api';

export default {
    created() {
        this.fetchMovieByID(isNumeric(this.id));
        if (!sessionStorage.getItem('sessionID')) {
            generateSessionID().then(sessionID => {
                sessionStorage.setItem('sessionID', JSON.stringify(sessionID));
            });
        }
        if (!localStorage.getItem('ratings')) localStorage.setItem('ratings', JSON.stringify([]));
        this.ratings = JSON.parse(localStorage.getItem('ratings'));
        this.findRating();
    },
    components: {
        ActorCard,
        VLoader,
        NotFound,
        VYoutube,
        VRating,
    },
    name: 'ItemDescription',
    data() {
        return {
            showImage: false,
            id: this.$route.params.id,
            selected: '',
            ratings: [],
            ratingError: false,
            stars: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        };
    },
    computed: {
        ...mapGetters({ item: 'movie', loading: 'loading', error: 'error' }),
        imageURL() {
            return this.item.poster_path ? POSTER_URL_SM + this.item.poster_path : null;
        },
        releaseYear() {
            return this.item.release_date.split('-')[0];
        },
        genres() {
            return this.item.genres.map(genre => genre.name).join(', ');
        },
        countries() {
            return this.item.production_countries.map(country => country.name).join(', ');
        },
        companies() {
            return this.item.production_companies.map(item => item.name).join(', ');
        },
        sessionID() {
            return JSON.parse(sessionStorage.getItem('sessionID')) || '';
        },
    },
    methods: {
        ...mapActions(['fetchMovieByID']),
        mapCrewItem,
        loadImg() {
            this.showImage = true;
        },
        findRating() {
            this.selected = this.ratings.find(item => item.id == this.id)?.rating;
        },
        onSelect(rating) {
            postRating(this.id, rating, this.sessionID).then(success => {
                if (success) {
                    this.selected = rating;
                    this.ratings.push({ id: this.id, rating });
                    localStorage.setItem('ratings', JSON.stringify(this.ratings));
                } else {
                    this.ratingError = true;
                }
            });
        },
    },
};
</script>
<style lang="scss">
.movie {
    background: $white;
    padding: 2.5rem 1rem 0;
    position: relative;
    // background-image: url(https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg);
    // background-size: cover;
    // background-repeat: no-repeat;
    // background: url() top left contain no-repeat;
    @include media-breakpoint-up(sm) {
        border-radius: 4px;
    }

    &__wrapper {
        @extend %row;
        padding-top: 0.5rem;
    }

    &__original-title {
        color: #b2b2b2;
        font-weight: 500;
        text-align: center;
    }

    &__tagline {
        text-align: center;
        color: gray;
        font-weight: 300;
        margin-bottom: 1rem;
    }

    &__poster {
        position: relative;
        @include make-col();

        @include media-breakpoint-up(sm) {
            @include make-col(6);
        }

        @include media-breakpoint-up(md) {
            @include make-col(5);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(4);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(3);
        }
    }

    &__rating {
        padding-top: 1rem;
        height: 80px;
    }

    &__info {
        @include make-col();
        display: none;

        @include media-breakpoint-up(sm) {
            display: block;
            @include make-col(6);
        }

        @include media-breakpoint-up(md) {
            @include make-col(7);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(8);
        }

        p {
            margin-bottom: 1rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__link:hover {
        color: #2196f3;
    }

    &__actors {
        @extend %row;
    }
}

.trailer {
    &__title {
        text-align: center;
        padding: 0.5rem 0;
    }
}

.backward {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    color: $blue;
}
.rating {
    &__current {
        display: flex;
        margin-left: 10px;
        margin-bottom: 10px;

        &::before {
            content: '★';
            color: gold;
            font-size: 1.96rem;
            line-height: 1rem;
            margin-right: 5px;
        }
    }

    &__common {
        display: flex;
        font-size: 1.1rem;
        height: 30px;
    }
    &__link {
        color: #2e44e3;
    }
}
</style>
