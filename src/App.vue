<template>
    <h1>Test</h1>
</template>

<style lang="scss">
.header {
    @extend .row;
    --bs-gutter-y: 0.75rem;
    padding: 40px 0;

    &__logo {
        font-family: 'Anton';
        color: $white;
        font-size: 2.6rem;
        line-height: 75%;
        text-transform: uppercase;

        span {
            color: $white;
        }

        img {
            margin-right: 10px;
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
