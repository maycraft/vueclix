<template>
    <transition name="scroll">
        <button class="scroll-top" @click="$emit('scroll')" v-if="show">
            <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="25px"
                height="25px"
                viewBox="0 0 330 330"
                style="enable-background: new 0 0 330 330"
                xml:space="preserve"
            >
                <path
                    id="XMLID_29_"
                    d="M100.606,100.606L150,51.212V315c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15V51.212l49.394,49.394
	C232.322,103.535,236.161,105,240,105c3.839,0,7.678-1.465,10.606-4.394c5.858-5.857,5.858-15.355,0-21.213l-75-75
	c-5.857-5.858-15.355-5.858-21.213,0l-75,75c-5.858,5.857-5.858,15.355,0,21.213C85.251,106.463,94.749,106.463,100.606,100.606z"
                    fill="#fff"
                />
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
    right: 10vw;
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
