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
};
</script>
<style lang="scss">
#app {
    position: relative;
    width: 100%;
}
.backward {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    color: $blue;
}
</style>
