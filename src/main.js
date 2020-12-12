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


/*import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'*/

// If you want to use ECharts extensions, just import the extension package, and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
// import 'echarts-gl'
// register component to use
// Vue.component('v-chart', ECharts)

import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

const FLEXPOLY = require('@mapbox/polyline');
const PENC = require('polyline-encoded')
const HEREFLEX = require('./assets/here-flexpolyline.js')

const TURFSIMPLE = require('@turf/simplify').default
const TURFCLEAN = require('@turf/clean-coords').default
const TURFLENGTH = require('@turf/length').default
const TURFMETA = require('@turf/meta')
const TURFBUFFER = require('@turf/buffer').default
const TURFPTGRID = require('@turf/point-grid').default
const TURFCOMBINE = require('@turf/combine').default
const TURFDISTANCE = require('@turf/distance').default
const TURFNEARESTPOINT = require('@turf/combine').default
const TURFDIFF = require('@turf/difference').default
const TURFINTERSECT = require('@turf/intersect').default
const TURFENVELOPE = require('@turf/envelope').default
	// const TURFSHORTESTPATH = require('@turf/shortest-path').default
const TURFEXPLODE = require('@turf/explode').default
const TURFSAMPLE = require('@turf/sample').default
const TURFBOOLEANPOINTINPOLYGON = require('@turf/boolean-point-in-polygon').default
const TURFBOOLEANWITHIN = require('@turf/boolean-within').default
const TURFUNION = require('@turf/union').default
const TURFFLIP = require('@turf/union').default
const TURFBBOX = require('@turf/bbox').default
const TURFCENTER = require('@turf/center').default
const TURFCENTROID = require('@turf/centroid').default
const TURFLINEINTERSECT = require('@turf/line-intersect').default
	// const TURFLINEOVERLAP = require('@turf/line-overlap').default
const TURFBBOXCLIP = require('@turf/bbox-clip').default
const TURFLINESPLIT = require('@turf/line-split').default
const TURFPOLYGONTOLINE = require('@turf/polygon-to-line').default
const TURFNEARESTPOINTONLINE = require('@turf/nearest-point-on-line').default
const TURFPOINTTOLINEDISTANCE = require('@turf/point-to-line-distance').default



// const TURFPOLYGONIZE = require('@turf/polygonize').default
const TURFH = require('@turf/helpers')
const TURFM = require('@turf/meta')
	// const TURFP2L = require('@turf/polygon-to-line')
const TOGEOJSON = require('@tmcw/togeojson')
	// const GDAL = require('gdal')
	// const GPXP = require('gpxparser')
	// const GPXP = require('gpx-parse')

// import '@/assets/fontello/css/fontello.css'


Vue.component('vue-headful', vueHeadful)
Vue.use(underscore);
Vue.use(vueTopprogress, {
	color: "rgba(236, 88, 0, 1)"
})
Vue.config.productionTip = false;



Object.defineProperty(Vue.prototype, '$PENC', {
	value: PENC
})

Object.defineProperty(Vue.prototype, '$MBFLEXPOLY', {
	value: FLEXPOLY
})

Object.defineProperty(Vue.prototype, '$HEREFLEX', {
	value: HEREFLEX
})

Object.defineProperty(Vue.prototype, '$MOMENT', {
	value: moment
})

Object.defineProperty(Vue.prototype, '$TURF_flip', {
	value: TURFFLIP
})

Object.defineProperty(Vue.prototype, '$TURF_centroid', {
	value: TURFCENTROID
})

Object.defineProperty(Vue.prototype, '$TURF_center', {
	value: TURFCENTER
})

Object.defineProperty(Vue.prototype, '$TURF_pointtolinedistance', {
		value: TURFPOINTTOLINEDISTANCE
	})
	// Object.defineProperty(Vue.prototype, '$TURF_shortestpath', {
	// 	value: TURFSHORTESTPATH
	// })
Object.defineProperty(Vue.prototype, '$TURF_nearestpoint', {
	value: TURFNEARESTPOINT
})
Object.defineProperty(Vue.prototype, '$TURF_lineintersect', {
		value: TURFLINEINTERSECT
	})
	// Object.defineProperty(Vue.prototype, '$TURF_lineoverlap', {
	// 	value: TURFLINEOVERLAP
	// })
Object.defineProperty(Vue.prototype, '$TURF_linesplit', {
	value: TURFLINESPLIT
})
Object.defineProperty(Vue.prototype, '$TURF_distance', {
	value: TURFDISTANCE
})

Object.defineProperty(Vue.prototype, '$TURF_nearestpointonline', {
	value: TURFNEARESTPOINTONLINE
})
Object.defineProperty(Vue.prototype, '$TURF_booleanwithin', {
	value: TURFBOOLEANWITHIN
})
Object.defineProperty(Vue.prototype, '$TURF_booleanpointinpolygon', {
	value: TURFBOOLEANPOINTINPOLYGON
})

Object.defineProperty(Vue.prototype, '$TURF_bbox', {
	value: TURFBBOX
})
Object.defineProperty(Vue.prototype, '$TURF_bboxclip', {
	value: TURFBBOXCLIP
})
Object.defineProperty(Vue.prototype, '$TURFSIMPLE', {
	value: TURFSIMPLE
})
Object.defineProperty(Vue.prototype, '$TURFEXPLODE', {
	value: TURFEXPLODE
})
Object.defineProperty(Vue.prototype, '$TURF_polygontoline', {
	value: TURFPOLYGONTOLINE
})
Object.defineProperty(Vue.prototype, '$TURFCOMBINE', {
	value: TURFCOMBINE
})
Object.defineProperty(Vue.prototype, '$TURFCLEAN', {
	value: TURFCLEAN
})
Object.defineProperty(Vue.prototype, '$TURFUNION', {
	value: TURFUNION
})

Object.defineProperty(Vue.prototype, '$TURFLENGTH', {
	value: TURFLENGTH
})
Object.defineProperty(Vue.prototype, '$TURFMETA', {
	value: TURFMETA
})
Object.defineProperty(Vue.prototype, '$TURFINTERSECT', {
	value: TURFINTERSECT
})
Object.defineProperty(Vue.prototype, '$TURFBUFFER', {
	value: TURFBUFFER
})
Object.defineProperty(Vue.prototype, '$TURFH', {
	value: TURFH
})
Object.defineProperty(Vue.prototype, '$TURFM', {
	value: TURFM
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