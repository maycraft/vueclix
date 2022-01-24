<template>
    <transition name="scroll">
        <button class="scroll-top" @click="$emit('scroll')" v-if="show">
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 50.000000 50.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                    fill="#ffffff"
                    stroke="none"
                >
                    <path
                        d="M185 360 c-32 -33 -56 -63 -52 -67 4 -4 30 15 57 42 l50 49 0 -152
        c0 -95 4 -152 10 -152 6 0 10 57 10 152 l0 152 50 -49 c27 -27 53 -46 57 -42
        6 7 -104 127 -117 127 -3 0 -32 -27 -65 -60z"
                    />
                </g>
            </svg>
        </button>
    </transition>
</template>

<script>
export default {
    name: 'ScrollTop',
    mounted() {
        this.checkScroll();
        document.addEventListener('scroll', this.checkScroll);
    },
    unmounted() {
        document.removeEventListener('scroll', this.checkScroll);
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        checkScroll() {
            this.show = window.scrollY > 100;
        },
    },
};
</script>

<style lang="scss" scoped>
.scroll-top {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: fixed;
    right: 8%;
    bottom: 15%;
    padding: 0;
    background: $blue;
}

.scroll-enter-active,
.scroll-leave-active {
    transition: opacity 0.5s;
}

.scroll-enter-from,
.scroll-leave-to {
    opacity: 0;
}
</style>
