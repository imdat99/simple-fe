import "@app/view/components/appLink";
import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";

@define("app-anchor")
export class AppAnchor extends AppElement {
  constructor() {
    super();
  }
  connected() {}
  disconnected() {
    // document.removeChild(this);
  }
}

export const anchor = new AppAnchor();

document.body.appendChild(anchor);
