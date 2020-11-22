import Vue from "vue";
import Router from "vue-router";
import EBL from "@/components/EBL";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/:ridekey?/:query?/:basemap?/:bbox?",
		name: "EBL",
		component: EBL
	}]
});