import appRoute, { router } from "@app/routes";
import { NotFound } from "@app/view/pages/404";
import { customElement } from "@core/decorator";
import { FallBack } from "../fallback";
import './index.scss'
@customElement("app-outlet")
export class AppOutlet extends HTMLElement {
  constructor() {
    super();
  }
  private _componentMap = new Map();
  private _oldPath = '';
  private _fallBack = new FallBack();
  private _notfound = new NotFound();
  connected() {
    document.addEventListener("DOMContentLoaded", () => {
      router.navigateTo(window.location.pathname);
    });
    appRoute.forEach((item) => {
      router.add(item.path, (params) => {

        if (this._oldPath == item.path) {
          return;
        }
        if (item.component) {
          const _compoent = this._componentMap.get(item.path) 
          if(_compoent) {
            this.replaceChildren(_compoent);
          } else {
            this.replaceChildren(this._fallBack);
            item.component().then((e) => {
              const Component = Object.values(e)[0];
              const com = new Component()
              com.params = params
              this.replaceChildren(com);
              this._componentMap.set(item.path, com)
            }).catch(()=>{
              this.replaceChildren(this._notfound)
            })
          }
          this._oldPath = item.path;
        }
        if (item.redirectTo) {
          router.navigateTo(item.redirectTo);
        }
      });
    });
  }
}
