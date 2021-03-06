<template>
    <v-loader v-if="loading"></v-loader>
    <app-error v-if="error" :errMsg="error.text" :errStatus="error.status"></app-error>
    <div v-if="hasBackground" :style="backgroundImage" class="movie__background"></div>
    <main class="movie" v-if="item">
        <h1 class="movie__title">
            {{ item.title || item.originalTitle }}<span v-if="item.year"> ({{ item.year }})</span>
        </h1>
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
                <div class="movie__rating rating" v-if="item.rating">
                    <div class="rating__common">
                        <p>
                            Рейтинг
                            <a class="rating__link" href="https://www.kinopoisk.ru/">KinoPoisk</a>:
                        </p>
                        <span class="rating__current">{{ item.rating }}/10</span>
                    </div>
                </div>
            </div>
            <div class="movie__info">
                <p v-if="item.original_title">
                    <b>Оригинальное название: </b>
                    {{ item.original_title }}
                </p>
                <p v-if="item.slogan">
                    <b>Слоган: </b>
                    {{ item.slogan }}
                </p>
                <p v-if="genres">
                    <b>Жанр: </b>
                    {{ genres }}
                </p>
                <p v-if="countries">
                    <b>Страна: </b>
                    {{ countries }}
                </p>

                <p v-if="hasCrew('DIRECTOR')" class="ellipsis">
                    <b>Режессёр: </b>
                    {{ mapCrewItem(item.crew, 'DIRECTOR') }}
                </p>
                <p v-if="hasCrew('PRODUCER')" class="ellipsis">
                    <b>Продюсер: </b>
                    {{ mapCrewItem(item.crew, 'PRODUCER') }}
                </p>
                <p v-if="hasCrew('WRITER')" class="ellipsis">
                    <b>Сценарий: </b>
                    {{ mapCrewItem(item.crew, 'WRITER') }}
                </p>
                <p v-if="hasCrew('OPERATOR')" class="ellipsis">
                    <b>Оператор: </b>
                    {{ mapCrewItem(item.crew, 'OPERATOR') }}
                </p>
                <p v-if="hasCrew('COMPOSER')" class="ellipsis">
                    <b>Композитор: </b>
                    {{ mapCrewItem(item.crew, 'COMPOSER') }}
                </p>
                <p v-if="hasCrew('DESIGN')" class="ellipsis">
                    <b>Художник: </b>
                    {{ mapCrewItem(item.crew, 'DESIGN') }}
                </p>
                <p v-if="hasCrew('EDITOR')" class="ellipsis">
                    <b>Монтаж: </b>
                    {{ mapCrewItem(item.crew, 'EDITOR') }}
                </p>
            </div>
        </div>

        <div v-if="item.description" class="movie__overview">
            <h3><b>Описание:</b></h3>
            <p>{{ item.description }}</p>
        </div>
        <div class="movie__trailer trailer">
            <h3><b>Трейлер:</b></h3>
            <template v-if="hasVideos">
                <div class="trailer__item" :key="video.videoId" v-for="video in item.videos">
                    <h4 class="trailer__title">{{ video.title }}</h4>
                    <v-youtube :videoKey="video.videoId"></v-youtube>
                </div>
            </template>
            <p class="t-center" v-else>Трейлер отсутствует</p>
        </div>
        <div v-if="hasImages" class="movie__still">
            <h3><b>Кадры из фильма:</b></h3>
            <v-slider :items="item.images" />
        </div>
        <div class="movie__actors actors">
            <h3 class="actors__title"><b>В главных ролях:</b></h3>
            <div v-if="hasActors">
                <div class="actors__cast">
                    <actor-card
                        :key="actor.staffId"
                        :id="actor.staffId"
                        :image-path="actor.posterUrl"
                        :name="actor.nameRu"
                        :character="actor.description"
                        :gender="1"
                        v-for="actor in item.actors"
                        @detail="$router.push({ name: 'actor', params: { id: actor.staffId } })"
                    ></actor-card>
                </div>
            </div>
            <p v-else class="t-center">Состав актёров не известен!</p>
        </div>
        <!-- </div> -->
        <button class="backward" @click="$router.go(-1)">Назад</button>
    </main>
</template>
<script>
import ActorCard from '@/components/ActorCard.vue';
import VLoader from '@/components/VLoader.vue';
import VYoutube from '@/components/VYoutube.vue';
import AppError from '@/components/AppError.vue';
import VSlider from '@/components/VSlider.vue';

import { mapGetters, mapActions, mapMutations } from 'vuex';
import { isNumeric, getMovieGenres, getMovieCountries, mapCrewItem } from '@/utils';

export default {
    created() {
        const id = isNumeric(this.id);
        if (!(this.item && this.item.id === id)) {
            this.fetchMovieByID(id);
        }
    },

    components: {
        ActorCard,
        VLoader,
        AppError,
        VYoutube,
        VSlider,
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
            return this.item.posterUrl ? this.item.posterUrl : null;
        },
        genres() {
            return getMovieGenres(this.item.genres);
        },
        countries() {
            return getMovieCountries(this.item.countries);
        },
        companies() {
            return this.item.production_companies.map(item => item.name).join(', ');
        },
        hasVideos() {
            return this.item.videos.length > 0;
        },
        hasImages() {
            return this.item.images.length > 0;
        },
        hasActors() {
            return this.item.actors.length > 0;
        },
        hasBackground() {
            return this.item?.images.length > 0;
        },
        backgroundImage() {
            this.setBgImg(this.item.images[0]);
            return `background-image: url(${this.item.images[0]})`;
        },
    },
    methods: {
        ...mapActions(['fetchMovieByID']),
        ...mapMutations(['setBgImg']),
        mapCrewItem,
        loadImg() {
            this.showImage = true;
        },
        hasCrew(cast) {
            return this.item.crew.some(person => person.professionKey === cast);
        },
        setThumbsSwiper(swiper) {
            this.thumbsSwiper.value = swiper;
        },
    },
};
</script>
<style lang="scss">
.movie {
    background: rgba(255, 255, 255, 0.8);
    padding: 2.5rem 1rem 1rem;
    margin: 0 -1rem;
    position: relative;
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

        @include media-breakpoint-up(xxl) {
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
            margin-bottom: 0.8rem;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__link:hover {
        color: #2196f3;
    }

    &__trailer {
        padding: 1rem 0;
    }

    &__actors {
        background-color: $white;
    }

    &__background {
        position: fixed;
        top: -20px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-size: cover;
        background-repeat: no-repeat;
    }

    &__still {
        padding: 1rem 0;
    }
}

.actors {
    &__title {
        margin-left: -0.935rem;
        margin-right: -0.935rem;
        padding-left: 0.935rem;
        padding-right: 0.935rem;
        background-color: $white;
    }
    &__cast {
        @extend %row;
    }
}

.trailer {
    &__title {
        text-align: center;
        padding: 0.5rem 0;
    }
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
</style>
