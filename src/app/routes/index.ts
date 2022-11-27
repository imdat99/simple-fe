import { NotFound } from "@app/view/pages/404";
import { Router, VRoute } from "@core/router";

const appRoute: (VRoute & { navigationId?: number })[] = [
  {
    path: "/",
    redirectTo: "/home",
  },
  {
    name: "Trang chủ",
    path: "/home",
    navigationId: 287,
    component: () => import("@app/view/pages/home"),
  },
  {
    name: "Phim hàn",
    path: "/k-drama",
    navigationId: 294,
    component: () => import("@app/view/pages/home"),
  },
  {
    name: "Phim chiếu rạp",
    path: "/movie",
    navigationId: 335,
    component: () => import("@app/view/pages/home"),
  },
  {
    path: "/movie/(:any)",
    component: () => import("@app/view/pages/movie"),
  },
  {
    path: "/album/(:any)",
    component: () => import("@app/view/pages/album"),
  },
  {
    path: "/watch/(:any)",
    component: () => import("@app/view/pages/watch"),
  },
  {
    name: "Anime",
    path: "/anime",
    navigationId: 362,
    component: () => import("@app/view/pages/home"),
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
