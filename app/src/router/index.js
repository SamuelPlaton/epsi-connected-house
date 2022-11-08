import Vue from "vue";
import VueRouter from "vue-router";
import { Home, House, Detectors, DetectorDetails, CreateDetector } from "../views";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/house/:idHouse",
    name: "House",
    props: true,
    component: House,
  },
  {
    path: "/detectors/:idRoom",
    name: "Detectors",
    props: true,
    component: Detectors,
  },
  {
    path: "/detector/:idDetector/:type",
    name: "DetectorDetails",
    props: true,
    component: DetectorDetails,
  },
  {
    path: "/detectors/:idRoom/create",
    name: "CreateDetector",
    props: true,
    component: CreateDetector,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
