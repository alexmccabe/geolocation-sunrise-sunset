<template>
    <div class="geolocation">
        <button
            v-if="browserSupported"
            class="get-geolocation"
            @click.prevent="getLocation"
        >When's my sunrise and sunset?</button>


    </div>
</template>

<script>
import GeoLocation from '@/helpers/GeoLocation';

export default {
    name: 'Geolocation',

    data() {
        return {
            GeolocationHelper: null,

            browserSupported: false,
            currentLocation: null
        };
    },

    created() {
        this.GeolocationHelper = new GeoLocation();
        this.browserSupported = this.GeolocationHelper.browserSupported;
    },

    methods: {
        getLocation() {
            this.$emit('location-requested');

            this.GeolocationHelper.getLocation()
                .then(result => {
                    this.currentLocation = result;
                    this.$emit('location-update', result);
                })
                .catch(err => {
                    this.$emit('location-error', err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~styles/includes/includes';

.get-geolocation {
    background-color: rgba($white, 0.85);
    border: 0;
    border-radius: 8px;
    box-shadow: 0 10px 20px 3px rgba($black, 0.3);
    cursor: pointer;
    display: block;
    font-size: 1.5rem;
    font-weight: 200;
    letter-spacing: kerning(200);
    padding: 1rem 2rem 1.25rem;
    text-transform: uppercase;
    transition: transform 0.2s $cubic-bezier, box-shadow 0.2s $cubic-bezier;

    &:hover {
        box-shadow: 0 15px 25px 3px rgba($black, 0.4);
        transform: translateY(-5px);
    }

    &:active {
        box-shadow: 0 5px 25px 3px rgba($black, 0.2);
        transform: translateY(5px);
    }

    &:focus {
        outline: 0;
    }
}
</style>
