<template>
    <div className="container">
        <app-header />
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    created() {
        this.$store.dispatch('getGenres');
    },
};
</script>
<style lang="scss">
html,
body {
    font-size: 16px;
    position: relative;
    font-family: 'Helvetica Neue Cyr', sans-serif;

    @media screen and (max-width: 576px) {
        font-size: 14px;
    }
}

body {
    background: url('./assets/img/background.jpg') top center no-repeat;
    background-size: cover;
    background-attachment: fixed;
}

p,
span {
    @media screen and (max-width: 576px) {
        font-size: 1.1em;
    }
}

#root {
    width: 100%;
    position: relative;
}

.bold {
    font-weight: bold;
}

.gy-3 {
    margin: 1rem 0;
}

.container {
    @include make-container();
    @include make-max-width-container();

    @media screen and (max-width: 576px) {
        padding-right: var(--bs-gutter-x, 1.5rem);
        padding-left: var(--bs-gutter-x, 1.5rem);
    }
}
</style>
