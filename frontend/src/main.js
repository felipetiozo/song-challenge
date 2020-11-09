import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import vant from "@/plugins/vant";
import vuetify from "@/plugins/vuetify";
import store from "@/store";

import General from "@/styles/General.css";
import Colors from "@/styles/Colors.css";
import Typography from "@/styles/Typography.css";
import Transitions from "@/styles/Transitions.css";

Vue.config.productionTip = false;

new Vue({
  General,
  Colors,
  Typography,
  Transitions,
  router,
  vant,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
