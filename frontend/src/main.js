import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vant from "@/plugins/vant";
import vuetify from "@/plugins/vuetify";
import store from "@/store";

import Colors from "@/styles/Colors.css";
import Typography from "@/styles/Typography.css";

Vue.config.productionTip = false;

new Vue({
  Colors,
  Typography,
  router,
  vant,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
