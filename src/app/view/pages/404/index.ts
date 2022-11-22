import { customElement } from "@core/decorator";
import { h } from "@core/index";
import "./notfound.css";

@customElement('not-found')
export class NotFound extends HTMLElement {
  constructor() {
    super();
  }

  connected() {
    // document.body.style = 'background: #fff'
  }

  view() {
    return h("div", { class: "page_404" }, [
      h("div", { class: "container" }, [
        h("div", { class: "row" }, [
          h("div", { class: "col-sm-12" }, [
            h("div", { class: "col-sm-offset-1 text-center" }, [
              h("div", { class: "four_zero_four_bg" }, [
                h("h1", { class: "text-center" }, ["404"]),
              ]),
              h("div", { class: "contant_box_404" }, [
                h("h3", { class: "h2" }, ["Look like you're lost"]),
                h("p", null, ["the page you are looking for not avaible!"]),
                h("a", { class: "link_404", href: "/" }, ["Go to Home"]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]);
  }
}
