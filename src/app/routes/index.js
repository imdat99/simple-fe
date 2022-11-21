import { NotFound } from "@app/view/pages/404";
import Router from "vanilla-router";
// import { HomePage } from "@app/view/pages/home";
// import { AppMovie } from "@app/view/pages/movie";

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
];

export const router = new Router({
  mode: "history",
  page404: function (path) {
    // console.log('"/' + path + '" Page not found');
    document.querySelector("my-app").replaceWith(new NotFound());
  },
});
router.addUriListener();
export default appRoute;
