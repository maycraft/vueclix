<template>
    <div class="error">
        <div class="error__wrapper">
            <svg
                version="1.1"
                class="error__image"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
            >
                <g>
                    <g>
                        <g>
                            <path
                                d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480
                                    C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"
                                fill="#9ca9d8"
                            />
                            <circle cx="176" cy="176" r="32" fill="#9ca9d8" />
                            <circle cx="336" cy="176" r="32" fill="#9ca9d8" />
                            <path
                                d="M256,240c-79.529,0-144,64.471-144,144h32c0-61.856,50.144-112,112-112s112,50.144,112,112h32
                                    C400,304.471,335.529,240,256,240z"
                                fill="#9ca9d8"
                            />
                        </g>
                    </g>
                </g>
            </svg>
            <h1>Возникла ошибка</h1>
            <!-- <p class="error__text">{props.errorMessage}</p>
                <p class="error__text">Веб страница по адресу "<span class="error__site">{props.url}</span>" не доступна</p> -->
            <p class="error__text error__message">{{ errMsg }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppError',
    props: {
        errMsg: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss">
.error {
    display: flex;
    justify-content: center;
    text-align: center;
    &__wrapper {
        max-width: 400px;
        background-color: rgba(0, 0, 0, 0.4);
    }
    h1 {
        color: #5364a0;
    }
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
        color: #dc3545;
    }
}
</style>
