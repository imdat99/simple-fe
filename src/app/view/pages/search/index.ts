import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/index";

@define("app-search")
export class AppSearch extends AppElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return h("div", {}, [h("h1", null, ["Tìm kiếm"])]);
  }
}
