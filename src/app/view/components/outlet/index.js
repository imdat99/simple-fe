import appRoute, { router } from "@app/routes";
import { FallBack } from "../fallback";
export class AppOutlet extends HTMLElement {
  constructor() {
    super();
  }
  _oldPath = "";
  connectedCallback() {
    document.addEventListener("DOMContentLoaded", () => {
      router.navigateTo(window.location.pathname);
    });
    appRoute.forEach((item) => {
      router.add(item.path, (params) => {
        // console.log("params", params);

        if (this._oldPath == item.path) {
          return;
        }
        if (item.component) {
          this.replaceChildren(new FallBack());
          setTimeout(() => {
            item.component().then((e) => {
              const Component = Object.values(e)[0];
              this.replaceChildren(new Component());
            });
          }, 3000);
          this._oldPath = item.path;
        }
        if (item.redirectTo) {
          router.navigateTo(item.redirectTo);
        }
      });
    });
  }
}
customElements.define("app-outlet", AppOutlet);
