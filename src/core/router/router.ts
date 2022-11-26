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
    this.addUriListener.call(this);
  }
  mode;
  routes: VRoute[];
  root;
  private currentRoute = "";
  notFound;

  add(newRoute: Omit<VRoute, "rule">) {
    this.routes.push(
      new VRoute(newRoute.name, newRoute.path, newRoute.handler)
    );
    return this;
  }

  navigateTo(route: string) {
    if (route !== this.currentRoute) {
      route = route ? route : "";
      const found = this._findRoute.call(this, route);
      if (found.success && found.matchRoute) {
        found.matchRoute.handler(found.params);
        this.location(route);
      } else {
        this.notFound([route]);
      }
    }
  }

  private _trimSlashes(path: string) {
    if (typeof path !== "string") {
      return "";
    }
    return path.toString().replace(/\/$/, "").replace(/^\//, "");
  }

  private _findRoute(route: string) {
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
      // this.currentRoute = route;
      // matchRoute.handler(params);
      // this.location(route);
      return {
        success: true,
        matchRoute,
        params,
      };
    } else {
      return {
        success: false,
        matchRoute: undefined,
        params,
      };
      // this.notFound([route]);
    }
  }

  private _processUri() {
    const fragment = "/" + this._getFragment();
    this.currentRoute = fragment;
    const found = this._findRoute.call(this, fragment);
    if (found.success && found.matchRoute) {
      found.matchRoute.handler(found.params);
    } else {
      this.notFound([fragment]);
    }
  }

  private _getFragment() {
    var fragment = decodeURI(window.location.pathname);
    if (this.root !== "/") {
      fragment = fragment.replace(this.root, "");
    }
    return this._trimSlashes(fragment);
  }

  private addUriListener() {
    window.onpopstate = this._processUri.bind(this);
    document.addEventListener("DOMContentLoaded", () => {
      this.navigateTo(window.location.pathname);
    });
    return this;
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
