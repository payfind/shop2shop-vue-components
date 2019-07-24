import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import VeeValidate from "vee-validate";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
	vuetify,
	render: h => h(App)
}).$mount("#app");
