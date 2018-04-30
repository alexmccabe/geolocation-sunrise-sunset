<template>
    <div id="app">

        <div class="sunrise-bg"/>
        <div class="sunset-bg"/>

        <div class="page">
            <transition name="fade-out">
                <am-get-geolocation
                    v-show="!loadingLocation"
                    @location-requested="handleLocationRequested"
                    @location-update="handleLocationUpdate"
                />
            </transition>

            <div
                v-for="(item, index) in loadingText"
                :key="index"
                :class="{visible: index === currentLoadingTextIndex}"
                class="loading-text"
            >
                {{ item }}
            </div>
        </div>

        <div
            ref="results"
            class="page"
        >
            <am-results
                :class="{'is-visible': showResult}"
                :data="results"
            />

            <button
                class="reset"
                @click.prevent="reset">Restart</button>
        </div>


    </div>
</template>

<script>
import HTTP from '@/http';
import { animatedScroll } from '@/utilities';

import AmGetGeolocation from '@/components/Geolocation';
import AmResults from '@/components/Results';

export default {
    name: 'App',
    components: { AmGetGeolocation, AmResults },

    data() {
        return {
            currentLoadingTextIndex: -1,
            loadingLocation: false,
            loadingInterval: null,
            results: {},
            showResult: false,
            loadingText: [
                'Finding your location',
                'Calculating the position of the Sun',
                'Finding sunrise position',
                'Finding sunset position'
            ]
        };
    },

    methods: {
        handleLocationRequested() {
            this.loadingLocation = true;

            this.currentLoadingTextIndex = 0;

            this.loadingInterval = setInterval(() => {
                this.currentLoadingTextIndex += 1;

                if (
                    this.currentLoadingTextIndex ===
                    this.loadingText.length - 1
                ) {
                    this.currentLoadingTextIndex = 0;
                }
            }, 2000);
        },

        handleLocationUpdate(location) {
            const { latitude: lat, longitude: long } = location.coords;

            HTTP.get(`json?lat=${lat}&lng=${long}&date=today`).then(
                ({ data }) => {
                    clearInterval(this.loadingInterval);

                    this.results = data.results;

                    setTimeout(() => {
                        this.currentLoadingTextIndex = -1;
                        this.showResults();
                    }, 250);
                }
            );
        },

        showResults() {
            this.showResult = true;
            animatedScroll(this.$refs.results, 1000, 'easeInOutQuad');
        },

        reset() {
            this.loadingLocation = false;

            animatedScroll(0, 1000, 'easeInOutQuad', () => {
                this.results = {};
                this.showResult = false;
            });
        }
    }
};
</script>

<style lang="scss">
@import '~styles/main';

$background-transition-time: 120s;

#app {
    height: 100%;
    position: relative;
}

.page {
    align-items: center;
    color: $white;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    letter-spacing: kerning(100);
    padding: 2rem;
    text-align: center;
    text-transform: uppercase;
}

.sunrise-bg,
.sunset-bg {
    height: 100vh;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;
}

.sunset-bg {
    animation: sunset $background-transition-time ease infinite;
    background: radial-gradient(
        ellipse at 50% 150%,
        rgba(203, 112, 77, 1) 0%,
        rgba(18, 34, 78, 1) 100%
    );
}

.sunrise-bg {
    animation: sunrise $background-transition-time ease infinite;
    background: radial-gradient(
        ellipse at 50% 150%,
        rgba(187, 106, 59, 1) 0%,
        rgba(74, 105, 160, 1) 100%
    );
    opacity: 1;
}

.loading-text {
    opacity: 0;
    position: absolute;
    transition: opacity 0.33s $cubic-bezier;
    visibility: hidden;

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.reset {
    background-color: rgba($white, 0.7);
    border: 0;
    border-radius: 4px;
    box-shadow: 0 5px 10px 1px rgba($black, 0.3);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0.25rem 0.5rem;

    transition: transform 0.2s $cubic-bezier, box-shadow 0.2s $cubic-bezier;

    &:hover {
        box-shadow: 0 10px 10px 1px rgba($black, 0.4);
        transform: translateY(-2px);
    }

    &:active {
        box-shadow: 0 2px 10px 1px rgba($black, 0.2);
        transform: translateY(2px);
    }
}

.fade-in-enter-active,
.fade-in-leave-active,
.fade-out-enter-active,
.fade-out-leave-active {
    transition: opacity 0.5s $cubic-bezier;
}

.fade-in-enter,
.fade-in-leave-to,
.fade-out-enter-active,
.fade-out-leave-active {
    opacity: 0;
}

.fade-in-enter,
.fade-in-leave-to {
    opacity: 1;
}

@keyframes sunrise {
    from,
    to {
        opacity: 1;
    }

    33.333%,
    66.666% {
        opacity: 0;
    }
}

@keyframes sunset {
    from,
    to {
        opacity: 0;
    }

    33.333%,
    66.666% {
        opacity: 1;
    }
}
</style>
