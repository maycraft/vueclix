<template>
    <header class="header">
        <div class="header__logo">
            <router-link :to="{ name: 'home' }" class="header__brand">
                <img src="@/assets/img/brand.png" alt="VueClix" />
            </router-link>
        </div>
        <nav class="header__menu">
            <navbar-menu
                :items="menuItems"
                :queryString="searchQuery"
                @onQuery="onInput"
            ></navbar-menu>
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
                    title: 'Новинки',
                    link: '/movies/now_playing?page=1',
                },
                {
                    title: 'Ожидаемые',
                    link: '/movies/upcoming?page=1',
                },
            ],
        };
    },
    methods: {
        ...mapActions(['getMovies', 'setSearchQuery']),
        onInput(value) {
            this.setSearchQuery(value);
            if (value) {
                this.$router.push(`/movies/search?q=${value}`);
                this.getMovies({ category: 'search', query: value });
            }
        },
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
    @extend .row;
    --bs-gutter-y: 0.75rem;
    padding: 20px 0;
    position: relative;
    align-items: center;

    &__logo {
        font-family: 'Limelight', cursive;
        color: $white;
        line-height: 75%;

        span {
            color: #f1ff09;
        }
    }
    &__brand {
        display: inline-block;
        img {
            max-height: 2.2rem;
        }
    }

    @include media-breakpoint-up(xs) {
        & {
            --bs-gutter-y: 0;
        }
        &__logo {
            @include make-col(6);
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
