import Vue from "vue";
import VueRouter from "vue-router";
import SongOverview from "@/views/SongOverview";
import Challenge from "@/views/Challenge";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/challenge/:challengeId",
    name: "challenge",
    component: Challenge,
  },

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
