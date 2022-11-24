import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/index";

@define("movie-page")
export class AppMovie extends AppElement {
  constructor() {
    super();
  }

  connected() {
    console.log(this.params)
  }

  view() {
    return h("div", {}, [h("h1", null, ["Phim"])]);
  }
}
