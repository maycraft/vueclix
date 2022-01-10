<template>
    <div className="pagination">
        <ul>
            <li
                class="pagination__btn"
                :class="{ 'pagination__btn-disabled': current == 1 }"
                @click="onPrevPage"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 20"
                    role="img"
                    aria-hidden="true"
                    class="pagination__icon"
                >
                    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                </svg>
            </li>
            <template v-if="current > pageCount">
                <li class="pagination__item" @click="setPage(1)">1</li>
                <li class="pagination__item">...</li>
            </template>
            <li
                :key="page"
                class="pagination__item"
                @click="setPage(page)"
                :class="{ 'pagination__item-active': page == current }"
                v-for="page in showPages"
            >
                {{ page }}
            </li>
            <template v-if="current <= lastIndent">
                <li class="pagination__item">...</li>
                <li class="pagination__item" @click="setPage(total)">{{ total }}</li>
            </template>
            <li
                class="pagination__btn"
                :class="{ 'pagination__btn-disabled': current == total }"
                @click="onNextPage"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 20"
                    role="img"
                    aria-hidden="true"
                    class="pagination__icon"
                >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AppPagination',
    props: {
        current: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            required: true,
        },
        pageCount: {
            type: Number,
            default: 5,
        },
    },
    methods: {
        setPage(page) {
            this.$router.push({ path: this.$route.path, query: { page } });
            this.$emit('changePage', page);
        },
        onPrevPage() {
            if (this.current > 1) {
                this.$router.push({ path: this.$route.path, query: { page: this.current - 1 } });
                this.$emit('changePage', this.current - 1);
            }
        },
        onNextPage() {
            if (this.current < this.total) {
                this.$router.push({ path: this.$route.path, query: { page: this.current + 1 } });
                this.$emit('changePage', this.current + 1);
            }
        },
    },
    computed: {
        pageNumber() {
            return Math.ceil(this.current / this.pageCount);
        },
        endPosition() {
            return this.pageNumber * this.pageCount;
        },
        startPosition() {
            return this.endPosition - this.pageCount;
        },
        allPages() {
            return Array.from({ length: this.total }, (v, k) => k + 1);
        },
        showPages() {
            return this.allPages.filter(p => p > this.startPosition && p <= this.endPosition);
        },
        lastIndent() {
            return (this.total % this.pageCount && this.total - this.pageCount) + 1;
        },
    },
};
</script>
<style lang="scss">
.pagination {
    text-align: center;

    &__item {
        margin: 0 10px 5px 0;
        padding: 8px 10px;
        height: 34px;
        min-width: 34px;
        border-radius: 50%;
        color: #84878d;
        cursor: pointer;
        box-shadow: 0px 3px 5px rgb(0 0 0 / 30%);
        transition: all 0.3s ease;

        &-active {
            background: $blue;
            color: $white;
            cursor: default;
        }
    }

    &__icon {
        fill: currentColor;
        width: 100%;
        height: 100%;
    }

    ul {
        display: inline-flex;
    }
    .pagination__btn {
        margin: 0 10px 5px 0;
        padding: 7px 0px;
        height: 34px;
        width: 34px;
        border-radius: 50%;
        color: #84878d;
        cursor: pointer;
        box-shadow: 0px 3px 5px rgb(0 0 0 / 30%);
        transition: all 0.3s ease;

        &-disabled {
            cursor: default;
            opacity: 0.5;
        }
    }
}
</style>
