export default class GeoLocation {
    constructor() {
        this.browserSupported = this.checkBrowserSupport();
    }

    checkBrowserSupport() {
        return navigator.geolocation;
    }

    getLocation() {
        if (!this.browserSupported) {
            throw new Error('GeoLocation not supoprted in current browser');
        }

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    resolve(position);
                },
                function error(err) {
                    reject(err);
                }
            );
        });
    }
}