import Vue from "vue";
import app from "./app";

Vue.config.performance = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "development";

new Vue({
    render: h => h(app)
}).$mount("#app");