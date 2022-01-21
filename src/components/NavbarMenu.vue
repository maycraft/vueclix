<template>
    <div class="navbar">
        <transition name="fade" mode="out-in" @click="showMenu = !showMenu">
            <svg
                v-if="showMenu"
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="40px"
                height="40px"
                class="burger"
            >
                <path
                    d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                />
            </svg>
            <svg
                v-else
                fill="#ffffff"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="40px"
                height="40px"
                class="burger"
            >
                <path
                    d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"
                />
            </svg>
        </transition>
        <transition name="menu">
            <div class="menu" v-if="showMenu">
                <router-link
                    v-for="item in items"
                    :key="item.title"
                    :to="item.link"
                    class="menu__item"
                    active-class="menu__item-active"
                >
                    {{ item.title }}
                </router-link>
                <div class="search">
                    <input
                        type="text"
                        class="search__line"
                        :class="{ 'show-up': showSearch }"
                        placeholder="Поиск фильма..."
                        :value="query"
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
            </div>
        </transition>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'navbar-menu',
    props: {
        items: {
            type: Array,
            default: () => [],
            required: true,
        },
        queryString: {
            type: String,
            default: '',
        },
    },
    created() {
        window.addEventListener('resize', this.checkSize);
        this.checkSize();
    },
    unmounted() {
        window.removeEventListener('resize', this.checkSize);
    },
    data() {
        return {
            showSearch: false,
            showMenu: false,
        };
    },
    methods: {
        checkSize() {
            this.showMenu = window.innerWidth >= 768;
        },
        toggleShow() {
            this.showSearch = !this.showSearch;
        },
        onInput: _.debounce(function (event) {
            this.$emit('onQuery', event.target.value);
        }, 1000),
    },
    computed: {
        query() {
            return this.queryString;
        },
    },
    watch: {
        $route(to, from) {
            if (from.params.category === 'search' && to.params.category !== 'search') {
                this.showSearch = false;
            }
        },
    },
};
</script>

<style lang="scss">
.navbar {
    display: flex;
    justify-content: flex-end;
    border-radius: 10px;

    .burger {
        display: none;
        cursor: pointer;

        @media screen and (max-width: 768px) {
            display: inline-block;
        }
    }

    .burger:focus {
        outline: none;
    }

    .menu {
        background: $white;
        border-radius: 5px;
        display: flex;
        height: auto;
        justify-content: space-between;
        transition: height 0.5s ease-in-out;

        @media screen and (max-width: 768px) {
            flex-direction: column;
            border-radius: 0;
            position: absolute;
            left: 10px;
            top: 100%;
            z-index: 10;
            width: calc(100% - 20px);
            border: 5px solid white;
        }

        &__item {
            color: $grey;
            cursor: pointer;
            display: block;
            padding: 10px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                width: 80%;
                height: 3.5px;
                bottom: -3px;
                background-color: #e0ce28;
                display: block;
                margin: 0 auto;
                transform: scale(0);
                transition: all 0.3s;

                @media screen and (max-width: 768px) {
                    display: none;
                }
            }

            &-active {
                @media screen and (max-width: 768px) {
                    color: $white;
                    background: $blue;
                }

                &::after {
                    transform: scale(1);
                }
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
            @media screen and (max-width: 768px) {
                width: 100%;
                padding: 10px;
            }

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

            @media screen and (max-width: 768px) {
                display: none;
            }

            svg {
                width: 15px;
                height: 15px;
                transition: all 0.5s;
            }
        }
    }
    .menu-enter-active,
    .menu-leave-active {
        transition: all 0.5s ease;
    }

    .menu-enter-from,
    .menu-leave-to {
        transform: translateY(-100px);
        opacity: 0;
    }
}

.rotate-enter-active,
.rotate-leave-active {
    transition: transform 0.5s ease;
}
.rotate-enter-from,
.rotate-leave-to {
    transform: rotate(180deg);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    transform: rotateY(90deg);
}
</style>
