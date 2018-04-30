<template>
    <div class="results">
        <div class="result sunrise">
            <div class="result-inner">
                <div class="result-title">
                    <div class="result-title-inner">
                        Sunrise
                    </div>
                </div>

                <div class="result-time">
                    {{ data.sunrise }}
                </div>
            </div>
        </div>

        <div class="result sunset">
            <div class="result-inner">
                <div class="result-title">
                    <div class="result-title-inner">
                        Sunset
                    </div>
                </div>

                <div class="result-time">
                    {{ data.sunset }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Results',

    props: {
        data: {
            required: true,
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~styles/includes/includes';

.results {
    font-size: 2rem;
    letter-spacing: kerning(200);
    margin-bottom: 3rem;
    max-width: 900px;

    @media (min-width: 768px) {
        display: flex;
        width: 75%;
    }

    .result {
        padding: 4rem;

        @media (min-width: 768px) {
            width: 50%;
        }

        &:first-child {
            border-bottom: 2px solid;

            @media (min-width: 768px) {
                border-bottom: 0;
                border-right: 2px solid;
            }
        }

        &:last-child .result-inner {
            transition-delay: 2s;
        }

        .result-inner {
            opacity: 0;
            transition: opacity 0.3s 1.5s $cubic-bezier;
        }
    }

    &.is-visible {
        .result * {
            opacity: 1;
        }
    }
}

.result-title {
    overflow: hidden;
    position: relative;
}

.result-title-inner {
    opacity: 0;
    transition: transform 1s ease-out, opacity 0.75s ease-out;

    .is-visible & {
        opacity: 1;
    }
}

.sunset .result-title-inner {
    transform: translateY(0);
    transition-delay: 3s;

    .is-visible & {
        transform: translateY(15px);
    }
}

.sunrise .result-title-inner {
    transform: translateY(50px);
    transition-delay: 2s;

    .is-visible & {
        transform: translateY(10px);
    }
}
</style>
