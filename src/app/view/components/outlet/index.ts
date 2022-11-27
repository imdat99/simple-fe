import appRoute, { router } from "@app/routes";
import { NotFound } from "@app/view/pages/404";
import { define } from "@core/decorator";
import { deepCompare } from "@core/helper";
import { ElementContructor } from "@core/type";
import { FallBack } from "../fallback";
import "./index.scss";
@define("app-outlet")
export class AppOutlet extends HTMLElement {
  constructor() {
    super();
  }
  private _componentMap = new Map();
  private _oldPath = "";
  private _oldParams: string[] = [];
  private _fallBack = new FallBack();
  private _notfound = new NotFound();
  connected() {
    appRoute.forEach((item) => {
      router.add({
        name: item.name || "",
        path: item.path,
        handler: (params = []) => {
          const _compoent = this._componentMap.get(item.path);
          if (this._oldPath == item.path) {
            if (!deepCompare(this._oldParams, params)) {
              _compoent.params = params;
              this.replaceChildren(_compoent);
            }
            return;
          }
          if (item.component) {
            this._oldParams = [...params];

            if (_compoent && !params.length) {
              this.replaceChildren(_compoent);
            } else {
              this.replaceChildren(this._fallBack);
              (item.component() as Promise<any>)
                .then((e) => {
                  const Component = Object.values(e)[0] as ElementContructor;
                  const com = new Component();
                  com.params = params;
                  if (item?.navigationId) {
                    com.params.push(item?.navigationId);
                  }
                  this.replaceChildren(com);
                  this._componentMap.set(item.path, com);
                })
                .catch((err) => {
                  this.replaceChildren(this._notfound);
                  throw new Error(err);
                });
            }
            this._oldPath = item.path;
          }
          if (item.redirectTo) {
            router.navigateTo(item.redirectTo);
          }
        },
      });
    });
  }
}
