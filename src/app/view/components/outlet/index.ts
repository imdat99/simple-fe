import appRoute, { router } from "@app/routes";
import { NotFound } from "@app/view/pages/404";
import { define } from "@core/decorator";
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
  private _fallBack = new FallBack();
  private _notfound = new NotFound();
  connected() {
    appRoute.forEach((item) => {
      router.add({
        name: item.name || "",
        path: item.path,
        handler: (params = []) => {
          if (this._oldPath == item.path) {
            return;
          }
          if (item.component) {
            const _compoent = this._componentMap.get(item.path);
            if (_compoent && !params.length) {
              this.replaceChildren(_compoent);
            } else {
              this.replaceChildren(this._fallBack);
              (item.component() as Promise<any>)
                .then((e) => {
                  const Component = Object.values(e)[0] as ElementContructor;
                  const com = new Component();
                  com.params = params;
                  this.replaceChildren(com);
                  this._componentMap.set(item.path, com);
                })
                .catch(() => {
                  this.replaceChildren(this._notfound);
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
