<template>
    <v-loader v-if="loading"></v-loader>
    <not-found v-if="error" :errMsg="error"></not-found>
    <main class="movie" v-if="item">
        <h1 class="movie__title">{{ `${item.title} (${releaseYear})` }}</h1>
        <h3 class="movie__original-title">{{ item.original_title }}</h3>
        <h5 class="movie__tagline">{{ item.tagline }}</h5>
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
        </div>
        <div class="movie__info">
            <p>
                <span class="bold">Жанр: </span>
                {{ genres }}
            </p>
            <p>
                <span class="bold">Продюсер: </span>
                {{ mapCrewItem(item.crew, 'Production') }}
            </p>
            <p>
                <span class="bold">Режиссёр: </span>
                {{ mapCrewItem(item.crew, 'Directing') }}
            </p>
            <p>
                <span class="bold">Сценарий: </span>
                {{ mapCrewItem(item.crew, 'Writing') }}
            </p>
            <p>
                <span class="bold">Оператор: </span>
                {{ mapCrewItem(item.crew, 'Camera') }}
            </p>
            <p>
                <span class="bold">Композитор: </span>
                {{ mapCrewItem(item.crew, 'Sound') }}
            </p>
            <p>
                <span class="bold">Художник: </span>
                {{ mapCrewItem(item.crew, 'Art') }}
            </p>
            <p>
                <span class="bold">Монтаж: </span>
                {{ mapCrewItem(item.crew, 'Editing') }}
            </p>
            <p>
                <span class="bold">Дата выхода: </span>
                {{ item.release_date }}
            </p>
            <p>
                <span class="bold">Сайт: </span>
                <a class="movie__link" :href="item.homepage" target="_blank" rel="noreferrer">
                    {{ item.homepage }}
                </a>
            </p>
            <p>
                <span class="bold">Страна: </span>
                {{ countries }}
            </p>
            <p>
                <span class="bold">Студия: </span>
                {{ companies }}
            </p>
        </div>
        <div class="movie__overview">
            <h2 class="bold gy-3">Описание:</h2>
            <p>{{ item.overview }}</p>
        </div>
        <div>
            <h2 class="bold gy-3">Трейлер:</h2>
            <template v-if="item.videos.length">
                <div class="trailer" :key="video.key" v-for="video in item.videos">
                    <h3 class="trailer__title">{{ video.name }}</h3>
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
            <h2 class="bold gy-3">В главных ролях:</h2>
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
        <button class="backward" @click="$router.go(-1)">
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="32px"
                height="32px"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#1E5894"
                    stroke="none"
                >
                    <path
                        d="M2500 4724 c-30 -21 -600 -423 -1266 -895 -821 -582 -1214 -866
                            -1222 -884 -20 -43 -14 -73 20 -110 43 -44 2500 -1783 2532 -1791 31 -7 89 20
                            105 49 8 16 12 161 14 496 l2 475 60 -3 c290 -11 637 -123 923 -296 415 -251
                            772 -616 1139 -1168 79 -119 153 -222 163 -227 35 -19 78 -11 112 19 l33 29 3
                            124 c7 232 -29 586 -83 825 -180 798 -657 1426 -1445 1903 -217 132 -605 319
                            -830 402 -30 12 -61 25 -67 31 -10 7 -13 120 -13 503 l0 493 -23 26 c-14 17
                            -36 28 -62 32 -35 4 -48 0 -95 -33z"
                    />
                </g>
            </svg>
        </button>
    </main>
</template>
<script>
import ActorCard from '@/components/ActorCard.vue';
import NotFound from '@/components/NotFound.vue';
import VLoader from '@/components/V-Loader.vue';
import VYoutube from '@/components/V-Youtube.vue';
import { mapGetters, mapActions } from 'vuex';
import { POSTER_URL_SM } from '@/constants';
import { mapCrewItem } from '@/utils';
import { isNumeric } from '@/utils';

export default {
    created() {
        this.fetchMovieByID(isNumeric(this.id));
    },
    components: {
        ActorCard,
        VLoader,
        NotFound,
        VYoutube,
    },
    name: 'ItemDescription',
    data() {
        return {
            showImage: false,
            id: this.$route.params.id,
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
    },
    methods: {
        ...mapActions(['fetchMovieByID']),
        mapCrewItem,
        loadImg() {
            this.showImage = true;
        },
    },
};
</script>
<style lang="scss">
.movie {
    @extend .row;
    background: $white;
    border-radius: 4px;
    padding: 2rem;
    position: relative;
    // background-image: url(https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg);
    // background-size: cover;
    // background-repeat: no-repeat;
    // background: url() top left contain no-repeat;
    @media screen and (max-width: 576px) {
        padding: 3rem 1rem 1rem;
    }

    &__title {
        max-width: 70%;
        margin: auto;

        @media screen and (max-width: 576px) {
            max-width: 100%;
        }
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
        & img {
            width: 100%;
        }
    }

    &__info {
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
        @extend .row;
    }

    @include media-breakpoint-up(sm) {
        &__overview {
            @include make-col(12);
        }
    }
    @include media-breakpoint-up(md) {
        &__poster {
            @include make-col(4);
        }
        &__info {
            @include make-col(7);
        }
        &__overview {
            @include make-col(11);
        }
    }
}

.trailer {
    &__title {
        text-align: center;
        padding: 1rem 0;
    }
}

@include media-breakpoint-up(sm) {
    .actor {
        @include make-col(6);
    }
}
@include media-breakpoint-up(md) {
    .actor {
        @include make-col(3);
    }
}

@include media-breakpoint-up(lg) {
    .actor {
        @include make-col(2);
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
    left: 0.75rem;
    top: 0.5rem;

    svg {
        max-width: 100%;
    }
}
</style>
