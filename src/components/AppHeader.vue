<template>
    <header class="header">
        <div class="header__logo">
            <router-link :to="{ name: 'home' }" custom v-slot="{ href, navigate }">
                <a :href="href" @click="navigate">
                    <img src="@/assets/img/new-logo.png" alt="VueClix" />
                </a>
            </router-link>
        </div>
        <nav class="header__menu">
            <ul class="menu">
                <li class="menu__item">
                    <router-link
                        :to="{ name: 'now-playing', query: { page: 1 } }"
                        class="menu__link"
                        active-class="active"
                    >
                        Новинки
                    </router-link>
                </li>
                <!-- <li class="menu__item">
                    <router-link to="/upcoming" class="menu__link" active-class="active">
                        Ожидаемые
                    </router-link>
                </li> -->
                <li class="menu__item">
                    <router-link to="/popular" class="menu__link" active-class="active">
                        Популярные
                    </router-link>
                </li>
            </ul>
            <div class="search">
                <input
                    type="text"
                    class="search__line"
                    :class="{ 'show-up': showSearch }"
                    placeholder="Поиск фильма..."
                    :value="searchQuery"
                    @input="onInput"
                />
                <button class="btn__search" @click="toggleShow">
                    <transition name="rotate" mode="out-in">
                        <svg
                            fill="#000000"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            width="50px"
                            height="50px"
                            v-if="showSearch"
                        >
                            <path
                                fill="currentColor"
                                d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                            />
                        </svg>
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512.005 400.005"
                            v-else
                        >
                            <g>
                                <g>
                                    <path
                                        d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                                            S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                                            c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                                            M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                                        fill="currentColor"
                                    />
                                </g>
                            </g>
                        </svg>
                    </transition>
                </button>
            </div>
        </nav>
    </header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
    name: 'AppHeader',
    data() {
        return {
            showSearch: false,
        };
    },
    methods: {
        ...mapActions(['getQueryMovies', 'setSearchQuery']),
        toggleShow() {
            if (this.showSearch) {
                this.setSearchQuery('');
            }
            this.showSearch = !this.showSearch;
        },
        onInput: _.debounce(function (event) {
            const value = event.target.value;
            this.setSearchQuery(value);
            if (value) {
                this.$router.push(`/search?q=${value}`);
                this.getQueryMovies(value);
            }
        }, 1000),
    },
    computed: {
        ...mapGetters(['searchQuery']),
    },
    watch: {
        $route(to, from) {
            if (from.name === 'search' && to.name !== 'search') {
                this.showSearch = false;
                this.setSearchQuery('');
            }
        },
    },
};
</script>
<style lang="scss">
.header {
    @extend .row;
    --bs-gutter-y: 0.75rem;
    padding: 20px 0;

    &__logo {
        font-family: 'Limelight', cursive;
        color: $white;
        font-size: 2.5rem;
        line-height: 75%;

        span {
            color: #f1ff09;
        }

        img {
            max-width: 140px;
        }
    }

    &__menu {
        display: flex;
        justify-content: flex-end;
        position: relative;
        border-radius: 10px;

        .menu {
            background: $white;
            border-radius: 5px 0 0 5px;

            &__item {
                display: inline-block;
                position: relative;

                .active::after {
                    transform: scale(1);
                }
            }

            &__link {
                color: $grey;
                cursor: pointer;
                display: block;
                padding: 10px;

                &::after {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: 3.5px;
                    bottom: -5px;
                    background-color: #e0ce28;
                    display: block;
                    margin: 0 auto;
                    transform: scale(0);
                    transition: all 0.3s;
                }
            }
        }
        .search {
            display: flex;
            &__line {
                font-family: $font-stack;
                font-size: 1rem;
                background-color: #ffec3c;
                color: #212121;
                height: 100%;
                width: 0;
                border: none;
                border-left: 1px dashed #e1e1e1;
                padding: 0;
                transition: padding, width 0.5s linear;

                &::placeholder {
                    color: #424242;
                }

                &.show-up {
                    width: 220px;
                    padding: 0 10px;
                }
            }

            .btn__search {
                border: none;
                border-radius: 0 5px 5px 0;
                padding: 11px;
                cursor: pointer;
                color: #212121;
                background-color: #eaeaea;

                svg {
                    width: 15px;
                    height: 15px;
                    transition: all 0.5s;
                }
            }
        }
    }

    @include media-breakpoint-up(sm) {
        & {
            --bs-gutter-y: 0;
        }
        &__logo {
            @include make-col(5);
        }
        &__menu {
            @include make-col(6);
        }
    }
    @include media-breakpoint-up(md) {
        &__logo {
            @include make-col(2);
        }
        &__menu {
            @include make-col(10);
        }
    }
}
.rotation-enter-active,
.rotation-leave-active {
    transition: transform 0.5s ease;
}
.rotate-enter-from,
.rotate-leave-to {
    transform: rotate(180deg);
}
</style>
