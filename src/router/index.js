import Vue from "vue";
import Router from "vue-router";
import EBL from "@/components/EBL";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/",
		name: "EBL",
		component: EBL
	}]
});