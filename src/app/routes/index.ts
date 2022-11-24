import { NotFound } from "@app/view/pages/404";
import { Router, VRoute } from "@core/router";

const appRoute: VRoute[] = [
  {
    path: "/",
    redirectTo: "/home",
  },
  {
    name: "Trang chủ",
    path: "/home",
    component: () => import("@app/view/pages/home"),
  },
  {
    name: "Phim hàn",
    path: "/k-drama",
    component: () => import("@app/view/pages/movie"),
  },
  {
    name: "Phim lẻ",
    path: "/movie",
    component: () => import("@app/view/pages/movie"),
  },
  {
    path: "/movie/(:any)",
    component: () => import("@app/view/pages/movie"),
  },
  {
    name: "Anime",
    path: "/anime",
    component: () => import("@app/view/pages/movie"),
  },
  {
    path: "/search",
    component: () => import("@app/view/pages/search"),
  },
];

export const router = new Router({
  mode: "history",
  root: "/",
  notFound: function (_path) {
    document.querySelector("my-app")!.replaceWith(new NotFound());
  },
});
export default appRoute;
