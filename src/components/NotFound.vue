<template>
    <div className="not-found">
        <p className="not-found__title">404</p>
        <p className="not-found__info">Страница не найдена</p>
        <p className="not-found__descr">{{ errMsg }}</p>
    </div>
</template>
<script>
export default {
    props: {
        errMsg: {
            type: String,
            default: 'Запрашиваемый ресурс не найден',
        },
    },
};
</script>
<style lang="scss">
.not-found {
    margin: 5rem 0;
    text-align: center;
    color: #fbff00;
    & * {
        color: $white;
        text-shadow: 0 0 1px $white;
    }
    &__title {
        font-family: 'Secular One', sans-serif;
        font-size: 10rem;
        font-weight: bold;
        line-height: 1;
        color: #fff;
    }
    &__info {
        font-size: 1.75rem;
        color: inherit;
    }
    &__descr {
        font-family: 'Oswald', sans-serif;
        font-size: 1.35rem;
        color: #fc7a7a;
    }
}
</style>
