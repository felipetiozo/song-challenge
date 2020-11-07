import Vue from "vue";
import VueRouter from "vue-router";
import SongOverview from "@/views/SongOverview";

Vue.use(VueRouter);

const routes = [
  {
    path: "/song/:songId",
    name: "song-overview",
    component: SongOverview,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
