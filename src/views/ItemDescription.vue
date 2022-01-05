<template>
    <loading
        v-if="loading"
        :active="loading"
        color="#0277bd"
        loader="dots"
        background-color="#000"
        :width="100"
    ></loading>
    <not-found v-else-if="error" :errMsg="error"></not-found>
    <main class="movie" v-else>
        <h1 class="movie__title">{{ `${item.title} (${releaseYear})` }}</h1>
        <h3 class="movie__original-title">{{ item.original_title }}</h3>
        <h5 class="movie__tagline">{{ item.tagline }}</h5>
        <div class="movie__poster">
            <img :src="imageURL" :alt="item.title" />
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
                    <div class="relation video">
                        <div class="relation__ratio">
                            <iframe
                                class="relation__content"
                                :src="'https://www.youtube.com/embed/' + video.key"
                                title="YouTube video player"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
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
                    v-for="actor in item.cast"
                ></actor-card>
            </div>
        </div>
    </main>
</template>
<script>
import ActorCard from '@/components/ActorCard.vue';
import NotFound from '@/components/NotFound.vue';
import { mapGetters, mapActions } from 'vuex';
import { POSTER_URL_SM } from '@/constants';
import { mapCrewItem } from '@/utils';
import { isNumeric } from '@/utils';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    created() {
        this.fetchMovieByID(isNumeric(this.id));
    },
    components: {
        ActorCard,
        Loading,
        NotFound,
    },
    name: 'ItemDescription',
    data() {
        return {
            id: this.$route.params.id,
        };
    },
    computed: {
        ...mapGetters({ item: 'movie', loading: 'loading', error: 'error' }),
        imageURL() {
            return POSTER_URL_SM + this.item.poster_path;
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
    },
};
</script>
<style lang="scss">
.movie {
    @extend .row;
    background: $white;
    border-radius: 4px;
    padding: 2rem;
    // background-image: url(https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg);
    // background-size: cover;
    // background-repeat: no-repeat;
    // background: url() top left contain no-repeat;

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
        & img {
            max-width: 100%;
        }
    }

    &__info {
        p {
            margin-bottom: 1rem;
            // color: #ffeb3b;
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
        padding-bottom: 1rem;
    }
}

.actor {
    margin-bottom: 0.7rem;
    text-align: center;

    &__avatar {
        &_slug {
            padding-top: 48%;
            background: lightgray;
            max-width: 300px;
            margin: 0 auto;
        }

        img {
            max-width: 100%;
        }
    }

    &__name {
        color: #424242;
    }

    &__character {
        font-size: 0.75rem;
        color: #9e9e9e;
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
.relation {
    margin: 0 auto;
    position: relative;
}

.relation__ratio {
    padding-top: 56.25%;
    height: 0;
}

.relation__content {
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.video {
    max-width: 700px;
    margin-bottom: 1rem;
}
</style>
