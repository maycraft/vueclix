<template>
    <header class="header">
        <div class="header__logo">
            <router-link :to="{ name: 'home' }" class="header__brand">
                <img src="@/assets/img/brand.png" alt="VueClix" />
            </router-link>
        </div>
        <nav class="header__menu">
            <navbar-menu :items="menuItems" v-model.trim="query"></navbar-menu>
        </nav>
    </header>
</template>
<script>
import NavbarMenu from '@/components/NavbarMenu.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'AppHeader',
    components: {
        NavbarMenu,
    },
    data() {
        return {
            menuItems: [
                {
                    title: 'Ожидаемые',
                    link: '/movies/await?page=1',
                },
                {
                    title: 'Топ 100',
                    link: '/movies/top100?page=1',
                },
            ],
            query: this.searchQuery,
        };
    },
    methods: {
        ...mapActions(['setSearchQuery']),
    },
    computed: {
        ...mapGetters(['searchQuery']),
    },
    watch: {
        $route(to, from) {
            if (from.params.category === 'search' && to.params.category !== 'search') {
                this.setSearchQuery('');
            }
        },
    },
};
</script>
<style lang="scss">
.header {
    @extend %row;
    padding: 1.25rem 0;
    position: relative;
    align-items: center;

    &__logo {
        font-family: 'Limelight', cursive;
        color: $white;
        line-height: 75%;
        min-width: 160px;
        @include make-col(9);

        @include media-breakpoint-up(md) {
            @include make-col(3);
        }
    }
    &__brand {
        display: inline-block;
        img {
            max-height: 2.2rem;
        }
    }

    &__menu {
        @include make-col(3);

        @include media-breakpoint-up(md) {
            @include make-col(9);
        }
    }
}
</style>
