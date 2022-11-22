import { AppElement } from "@core/appelement";
import { customElement } from "@core/decorator";
import { h } from "@core/index";

@customElement('movie-page')
export class AppMovie extends AppElement {
  constructor() {
    super();
  }

  connected() {
  }

  view() {
    return h("div", {}, [h("h1", null, ["Phim"])]);
  }
}
