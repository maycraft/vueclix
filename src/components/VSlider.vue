<template>
    <div class="slider">
        <div class="slider__wrapper">
            <div class="slider__content" :style="{ transform: 'translateX(' + shiftValue + ')' }">
                <slider-item :source="imgURL" v-for="imgURL in items" :key="imgURL" />
            </div>
            <button
                @click="prevSlide"
                class="btn btn__prev"
                :class="{ 'btn-disabled': isStartSlider }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z"
                    />
                </svg>
            </button>
            <button
                @click="nextSlide"
                class="btn btn__next"
                :class="{ 'btn-disabled': isEndSlider }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <polygon
                        points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import SliderItem from '@/components/SliderItem.vue';

export default {
    components: { SliderItem },
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    data: function () {
        return {
            currentIndex: 0,
        };
    },
    computed: {
        shiftValue() {
            return `-${this.currentIndex * 100}%`;
        },
        isStartSlider() {
            return this.currentIndex === 0;
        },
        isEndSlider() {
            return this.currentIndex === this.items.length - 1;
        },
    },
    methods: {
        nextSlide() {
            if (this.currentIndex < this.items.length - 1) {
                this.currentIndex++;
                if (this.isStopSlider) {
                    this.isStopSlider = false;
                }
            } else {
                this.isStopSlider = true;
            }
        },
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
        },
    },
};
</script>

<style lang="scss">
.slider {
    text-align: center;
    margin: 0 auto;
    max-width: 700px;
    overflow: hidden;
    position: relative;
    &__wrapper {
        position: relative;
        padding-bottom: 67%;
    }
    &__content {
        display: flex;
        transition: transform 0.5s;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
    }
}
.btn {
    // margin-top: 1rem;
    cursor: pointer;
    border: none;
    background: transparent;
    position: absolute;
    top: 50%;

    svg {
        width: 3rem;
        fill: $white;
    }

    &__prev {
        left: 0;
    }
    &__next {
        right: 0;
    }
    &-disabled {
        opacity: 0.5;
        cursor: default;
    }
}
</style>
