<template>
    <div class="actor" :key="id">
        <figure class="actor__avatar">
            <img :src="imageURL" :alt="name" v-if="imagePath" />
            <div class="actor__avatar_slug" v-else>
                <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 513.323 513.323"
                >
                    <g>
                        <g>
                            <path
                                d="M256.661,257.323c-135.275,0-245.333,110.059-245.333,245.333c0,5.888,4.779,10.667,10.667,10.667h469.333
                                        c5.888,0,10.667-4.779,10.667-10.667C501.995,367.381,391.936,257.323,256.661,257.323z"
                                fill="#ffffff"
                            />
                        </g>
                    </g>
                    <g>
                        <g>
                            <circle cx="256.661" cy="130.333" r="117.333" fill="#ffffff" />
                        </g>
                    </g>
                </svg>
            </div>
        </figure>
        <p class="actor__name">{{ name }}</p>
        <p class="actor__character">{{ character }}</p>
    </div>
</template>
<script>
import { POSTER_URL_SM } from '@/constants';
export default {
    name: 'ActorCard',
    props: {
        id: {
            type: Number,
            required: true,
        },
        imagePath: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        character: {
            type: String,
            required: true,
        },
    },
    computed: {
        imageURL() {
            return POSTER_URL_SM + this.imagePath;
        },
    },
};
</script>
<style lang="scss">
.actor {
    margin-bottom: 0.7rem;
    text-align: center;

    &__avatar {
        &_slug {
            padding-top: 48%;
            background: lightgray;
            max-width: 300px;
            margin: 0 auto;
        }

        img {
            max-width: 100%;
        }
    }

    &__name {
        color: #424242;
    }

    &__character {
        font-size: 0.75rem;
        color: #9e9e9e;
    }
}

@include media-breakpoint-up(sm) {
    .actor {
        @include make-col(6);
    }
}
@include media-breakpoint-up(md) {
    .actor {
        @include make-col(3);
    }
}

@include media-breakpoint-up(lg) {
    .actor {
        @include make-col(2);
    }
}
</style>
