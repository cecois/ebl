// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import CONFIG from "./CONFIG.json";
import router from "./router";
import moment from 'moment';
import underscore from "vue-underscore";
import vueHeadful from 'vue-headful';
import vueTopprogress from 'vue-top-progress'
// import {
// 	SportsLib
// } from '@sports-alliance/sports-lib';

const TURFSIMPLE = require('@turf/simplify').default
const TURFCLEAN = require('@turf/clean-coords').default
const TURFLENGTH = require('@turf/length').default
const TURFMETA = require('@turf/meta')
const TURFBUFFER = require('@turf/buffer').default
const TURFPTGRID = require('@turf/point-grid').default
const TURFCMBINE = require('@turf/combine').default
const TURFDIFF = require('@turf/difference').default
const TURFENVELOPE = require('@turf/envelope').default
const TURFSAMPLE = require('@turf/sample').default
const TURFH = require('@turf/helpers')
	// const TURFP2L = require('@turf/polygon-to-line')
const TOGEOJSON = require('@tmcw/togeojson')
	// const GDAL = require('gdal')
	// const GPXP = require('gpxparser')
	// const GPXP = require('gpx-parse')

Vue.component('vue-headful', vueHeadful)
Vue.use(underscore);
Vue.use(vueTopprogress, {
	color: "rgb(181, 122, 255)"
})
Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$MOMENT', {
	value: moment
})
Object.defineProperty(Vue.prototype, '$TURFSIMPLE', {
		value: TURFSIMPLE
	})
	// Object.defineProperty(Vue.prototype, '$TURFP2L', {
	// 	value: TURFP2L
	// })
Object.defineProperty(Vue.prototype, '$TURFCMBINE', {
	value: TURFCMBINE
})
Object.defineProperty(Vue.prototype, '$TURFCLEAN', {
	value: TURFCLEAN
})
Object.defineProperty(Vue.prototype, '$TURFLENGTH', {
	value: TURFLENGTH
})
Object.defineProperty(Vue.prototype, '$TURFMETA', {
	value: TURFMETA
})
Object.defineProperty(Vue.prototype, '$TURFBUFFER', {
	value: TURFBUFFER
})
Object.defineProperty(Vue.prototype, '$TURFH', {
	value: TURFH
})
Object.defineProperty(Vue.prototype, '$TURFPTGRID', {
	value: TURFPTGRID
})
Object.defineProperty(Vue.prototype, '$TURFDIFF', {
	value: TURFDIFF
})
Object.defineProperty(Vue.prototype, '$TURFENVELOPE', {
	value: TURFENVELOPE
})
Object.defineProperty(Vue.prototype, '$TURFSAMPLE', {
	value: TURFSAMPLE
})

// Object.defineProperty(Vue.prototype, '$GDAL', {
// 		value: GDAL
// 	})
// Object.defineProperty(Vue.prototype, '$GPXP', {
// 	value: GPXP
// })

Object.defineProperty(Vue.prototype, '$TOGEOJSON', {
	value: TOGEOJSON
})

Object.defineProperty(Vue.prototype, '$CONFIG', {
	value: CONFIG
})

// Object.defineProperty(Vue.prototype, '$SPORTSLIB', {
// 	value: SportsLib
// })

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: {
		App
	}
});