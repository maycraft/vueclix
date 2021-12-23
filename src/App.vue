<template>
    <div className="container">
        <app-header />
        <router-view></router-view>
    </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';

export default {
    components: {
        AppHeader,
    },
};
</script>
<style lang="scss">
html,
body {
    font-size: 16px;
    position: relative;
    font-family: 'Helvetica Neue Cyr', sans-serif;
}

body {
    background: url('./assets/img/background.png') top center no-repeat;
    background-size: cover;
    background-attachment: fixed;
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
}

.error {
    text-align: center;
    &__image {
        width: 10rem;
        height: 10rem;
    }

    &__text {
        margin: 0 auto;
        max-width: 450px;
        font-weight: 300;
        line-height: 2;
    }

    &__site {
        color: #fff59d;
    }

    &__message {
        color: #cddc39;
    }
}
</style>
