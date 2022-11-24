import { zip } from "@core/helper";
import { VRoute } from "./route";
import { VRouter } from "./type";

function defaultNotFound(p: string[]) {
  throw Error(`the path ${p[0]} was not found`);
}

export class Router {
  constructor({ mode, root, notFound }: Partial<VRouter>) {
    this.mode = !window.history || !window.history.pushState ? "hash" : mode;
    this.routes = [];
    this.root = root === "/" ? "/" : "/" + this._trimSlashes(root!) + "/";
    this.notFound = notFound || defaultNotFound;
  }
  mode;
  routes: VRoute[];
  root;
  notFound;

  add(newRoute: Omit<VRoute, "rule">) {
    this.routes.push(
      new VRoute(newRoute.name, newRoute.path, newRoute.handler)
    );
    return this;
  }

  navigateTo(route: string) {
    route = route ? route : "";
    this.findRoute(route);
  }

  private _trimSlashes(path: string) {
    if (typeof path !== "string") {
      return "";
    }
    return path.toString().replace(/\/$/, "").replace(/^\//, "");
  }

  findRoute(route: string) {
    const params: string[] = [];
    const matchRoute = this.routes.find((item) => route.match(item.rule));
    if (matchRoute) {
      // console.log(route, matchRoute);
      for (const [param, paramKey] of zip(
        route.split("/"),
        matchRoute.path.split("/")
      )) {
        if (param !== paramKey) {
          params.push(param);
        }
      }
      this.location(route);
      matchRoute.handler(params);
    } else {
      this.notFound([route]);
    }
  }
  location(route: string) {
    if (this.mode === "history") {
      history.pushState(null, "", this.root + this._trimSlashes(route));
    } else {
      route = route.replace(/^\//, "").replace(/\/$/, "");
      window.location.href =
        window.location.href.replace(/#(.*)$/, "") + "#" + route;
    }
  }
}
