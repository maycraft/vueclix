<template>
    <transition name="rating" mode="out-in">
        <p v-if="!selected && hideRate" class="rating__title" @click="hideRate = false">Оценить</p>
        <transition v-else name="rating" mode="out-in">
            <p v-if="selected" mode="out-in" class="rating__your">
                Ваша оценка: <span class="rating__current">{{ selected }}</span>
            </p>
            <p class="rating__error" v-else-if="error">Ошибка! Попробуйте в другой раз</p>
            <div v-else class="rating__area">
                <template v-for="rating in stars" :key="rating">
                    <input
                        type="radio"
                        :id="`star-${rating}`"
                        :checked="selected == rating"
                        @change="$emit('select', $event.target.value)"
                        name="rating"
                        :value="rating"
                    />
                    <label :for="`star-${rating}`" :title="`Оценка «${rating}»`"></label>
                </template>
            </div>
        </transition>
    </transition>
</template>

<script>
export default {
    props: {
        stars: {
            type: Array,
            default: () => [],
        },
        selected: {
            type: String,
            default: '',
        },
        error: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            hideRate: true,
        };
    },
};
</script>

<style lang="scss">
.rating {
    &__area {
        overflow: hidden;
        display: inline-block;

        &:not(:checked) > input {
            display: none;
        }

        &:not(:checked) > label {
            float: right;
            padding-left: 4px;
            cursor: pointer;
            font-size: 1.96rem;
            line-height: 2rem;
            color: lightgrey;

            &:last-child {
                padding-left: 0;
            }
        }

        &:not(:checked) > label:before {
            content: '★';
        }

        & > input:checked ~ label {
            color: gold;
        }

        &:not(:checked) > label:hover,
        &:not(:checked) > label:hover ~ label {
            color: gold;
        }

        & > input:checked + label:hover,
        & > input:checked + label:hover ~ label,
        & > input:checked ~ label:hover,
        & > input:checked ~ label:hover ~ label,
        & > label:hover ~ input:checked ~ label {
            color: gold;
        }

        & > label:active {
            position: relative;
        }
    }
    &__title {
        background: $green;
        color: $white;
        text-align: center;
        padding: 5px;
        cursor: pointer;
        font-size: 1.1rem;

        &:hover {
            background: lighten($green, 10);
        }
    }
    &__your {
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        span {
            margin-bottom: 0;
        }
    }
    &__error {
        font-size: 1.1rem;
        color: #ed2d2d;
    }
}

.rating-enter-active,
.rating-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.rating-enter-from,
.rating-leave-to {
    opacity: 0;
}
</style>
