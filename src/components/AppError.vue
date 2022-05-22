<template>
    <div class="error">
        <div class="error__wrapper">
            <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                preserveAspectRatio="xMidYMid meet"
            >
                <g
                    transform="translate(0,512) scale(0.100000,-0.100000)"
                    fill="#D03436"
                    stroke="none"
                >
                    <path
                        d="M2433 4641 c-95 -33 -187 -106 -258 -205 -23 -34 -225 -360 -447
-726 -223 -366 -669 -1097 -990 -1626 -322 -528 -599 -987 -616 -1020 -49 -97
-64 -164 -60 -262 2 -65 9 -99 26 -134 50 -100 156 -173 298 -203 103 -22
4234 -22 4337 0 143 30 243 100 294 204 25 50 28 66 28 156 -1 87 -5 110 -31
175 -17 43 -172 308 -359 615 -181 297 -639 1048 -1017 1669 -379 621 -707
1154 -731 1184 -119 156 -317 228 -474 173z m292 -1082 c23 -7 57 -28 81 -53
25 -24 46 -58 53 -81 15 -56 15 -1374 0 -1430 -15 -52 -82 -119 -134 -134 -52
-14 -288 -14 -340 0 -52 15 -119 82 -134 134 -15 55 -15 1374 0 1429 14 50 73
113 124 131 49 17 291 20 350 4z m-61 -2039 c72 -27 139 -88 173 -158 24 -49
28 -69 27 -137 -1 -131 -56 -220 -172 -277 -58 -29 -76 -33 -142 -32 -91 1
-153 27 -218 92 -140 139 -115 367 52 480 27 17 62 36 80 41 55 16 142 12 200
-9z"
                    />
                </g>
            </svg>
            <h1>Возникла ошибка</h1>
            <!-- <p class="error__text">{props.errorMessage}</p>
                <p class="error__text">Веб страница по адресу "<span class="error__site">{props.url}</span>" не доступна</p> -->
            <p class="error__status">{{ errStatus }}</p>
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
        errStatus: {
            type: String,
        }
    },
};
</script>
<style lang="scss">
.error {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 2.5rem 0;
    &__wrapper {
        max-width: 400px;
        background-color: rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #5364a0;
        line-height: 1;
    }
    &__image {
        width: 10rem;
        height: 10rem;
    }

    &__text {
        margin: 0 auto;
        max-width: 450px;
        font-weight: 300;
    }

    &__site {
        color: #fff59d;
    }

    &__message {
        color: #dc3545;
        line-height: 1;
        font-size: 2rem;
    }

    &__status {
        color: gold;
        font-weight: bold;
        font-size: 5rem;
        line-height: 0.8;
    }
}
</style>
