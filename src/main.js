import Vue from "vue";
import App from "./App";
import CONFIG from "./CONFIG.json";
import router from "./router";
import moment from 'moment';
import underscore from "vue-underscore";
import vueHeadful from 'vue-headful';
import vueTopprogress from 'vue-top-progress'

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

const TURFLENGTH = require('@turf/length').default
const TURFMETA = require('@turf/meta')
const TURFCOMBINE = require('@turf/combine').default

const TURFH = require('@turf/helpers')

Vue.component('vue-headful', vueHeadful)
Vue.use(underscore);
Vue.use(vueTopprogress, {
	color: "rgba(236, 88, 0, 1)"
})
Vue.config.productionTip = false;

Object.defineProperty(Vue.prototype, 'CONFIG', {
	value: CONFIG
})


/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: {
		App
	}
});