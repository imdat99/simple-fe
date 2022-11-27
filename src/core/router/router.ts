import { zip } from "@core/helper";
import { buildQueryString, parseParams } from "./helper";
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
    const searchParam = route.split("?");
    route = searchParam[0];
    if (route !== this.currentRoute) {
      route = route ? route : "";
      const found = this._findRoute.call(this, route);
      if (found.success && found.matchRoute) {
        this.location(searchParam.join("?"));
        found.matchRoute.handler(found.params);
      } else {
        this.notFound(searchParam);
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
      for (const [param, paramKey] of zip(
        route.split("/"),
        matchRoute.path.split("/")
      )) {
        if (param !== paramKey) {
          params.push(param);
        }
      }
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
      const { pathname, search } = window.location;
      this.navigateTo(pathname + search);
    });
    return this;
  }

  params(): [
    (fn: (o: Record<string, any>) => void) => void,
    (o: Record<string, any>) => void
  ] {
    const searchObj = parseParams(window.location.search);
    return [
      (fn: (o: Record<string, any>) => void) => {
        fn(searchObj);
      },
      (params: Record<string, any>) => {
        const newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          buildQueryString(params);

        window.history.pushState({ path: newurl }, "", newurl);
      },
    ];
  }
  location(route: string) {
    console.log("route", route);
    if (this.mode === "history") {
      history.pushState(null, "", this.root + this._trimSlashes(route));
    } else {
      route = route.replace(/^\//, "").replace(/\/$/, "");
      window.location.href =
        window.location.href.replace(/#(.*)$/, "") + "#" + route;
    }
  }
}
