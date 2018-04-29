// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import animateScroll from './utilities/animated-scroll';

Vue.config.productionTip = false;

document.addEventListener('DOMContentLoaded', () => {
    animateScroll(0);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});
