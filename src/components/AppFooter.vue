<template>
    <div class="footer">
        maycraft &copy;
        <span class="date"> {{ new Date().getFullYear() }}</span>
    </div>
</template>
<script>
export default {
    name: 'AppFooter',
};
</script>
<style lang="scss">
.footer {
    padding: 20px 0;
    color: $white;
    text-align: center;

    .date {
        color: $white;
    }
}
</style>
