import Vue from "vue";
import Router from "vue-router";
import EBL from "@/components/EBL";
import EBLT from "@/components/EBLT";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/trace",
		name: "EBLTracer",
		component: EBLT
	}, {
		path: "/:ridekey?/:rideiso?/:streetiso?/:query?/:basemap?/:splayed?/:bbox?",
		name: "EBL",
		component: EBL
	}]
});