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
#app {
    position: relative;
    width: 100%;
}

// .bold {
//     font-weight: bold;
// }

// .gy-3 {
//     margin: 1rem 0;
// }
</style>
