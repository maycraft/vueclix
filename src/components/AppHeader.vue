<template>
    <header className="header">
        <div className="header__logo">
            <router-link to="/" custom v-slot="{ href, navigate }">
                <a :href="href" @click="navigate">
                    <img src="@/assets/img/logo.png" alt="VueClix" />
                    <span>ue<i>Clix</i></span>
                </a>
            </router-link>
        </div>
        <!-- <nav className="header__menu">
                <ul className="menu">
                    <li className="menu__item">
                        <NavLink
                            to="/newest?page=1"
                            className="menu__link"
                            activeClassName="active">
                            Новинки
                        </NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink
                            to="/upcoming?page=1"
                            className="menu__link"
                            activeClassName="active">
                            Ожидаемые
                        </NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink
                            to="/popular?page=1"
                            className="menu__link"
                            activeClassName="active">
                            Популярные
                        </NavLink>
                    </li>
                </ul>
                <div className="search">
                    <input
                        type="text"
                        className={`search__line ${showInput ? ' show-up' : ''}`}
                        placeholder="Поиск фильма..."
                        value={searchQuery}
                        onChange={setValue}
                    />
                    <button
                        className="btn__search"
                        onClick={() => {
                            setShowInput(!showInput);
                        }}>
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 512.005 400.005">
                            <g>
                                <g>
                                    <path
                                        d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                                            S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                                            c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                                            M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"
                                        fill="#84878d"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </nav> -->
    </header>
</template>
<script>
export default {
    name: 'AppHeader',
};
</script>
<style lang="scss">
@import '../assets/scss/fonts';
.header {
    @extend .row;
    --bs-gutter-y: 0.75rem;
    padding: 40px 0;

    &__logo {
        // font-family: 'Anton';
        font-family: 'Limelight', cursive;
        color: $white;
        font-size: 2.5rem;
        line-height: 75%;
        // text-transform: uppercase;

        span {
            // font-family: 'Galada', cursive;
            color: #f1ff09;
            // background: linear-gradient(180deg, #f1ff09 30%, #287f28);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;

            i {
                color: #f1ff09;
                // background: linear-gradient(180deg, #f1ff09 30%, #287f28);
                // -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;
            }
        }

        img {
            max-width: 2rem;
            // margin-right: 10px;
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
                padding: 10px;
                position: relative;

                .active::after {
                    transform: scale(1);
                }
            }

            &__link {
                color: $grey;
                cursor: pointer;

                &::after {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: 3.5px;
                    bottom: -5px;
                    background-color: #ffa726;
                    display: block;
                    margin: 0 auto;
                    transform: scale(0);
                    transition: all 0.3s;
                }
            }
        }
        .search {
            &__line {
                font-family: $font-stack;
                font-size: 1rem;
                background-color: #ffc93c;
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
                padding: 10px;
                cursor: pointer;
                background-color: #eaeaea;

                svg {
                    width: 15px;
                    height: 15px;
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
            @include make-col(4);
        }
        &__menu {
            @include make-col(8);
        }
    }
}
</style>
