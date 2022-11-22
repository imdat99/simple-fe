import { NotFound } from "@app/view/pages/404";
import Router from "vanilla-router";

const appRoute = [
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
    name: "Phim Hot",
    path: "/movie",
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
  page404: function (_path) {
    document.querySelector("my-app")!.replaceWith(new NotFound());
  },
});
router.addUriListener();
export default appRoute;
