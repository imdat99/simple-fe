import $render, { h, mount } from "@core/index";
import "./notfound.css";
export class NotFound extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mount();
  }
  count = 0;

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
    // <section class="page_404">
    //   <div class="container">
    //     <div class="row">
    //       <div class="col-sm-12 ">
    //         <div class="col-sm-10 col-sm-offset-1  text-center">
    //           <div class="four_zero_four_bg">
    //             <h1 class="text-center ">404</h1>
    //           </div>

    //           <div class="contant_box_404">
    //             <h3 class="h2">Look like you're lost</h3>

    //             <p>the page you are looking for not avaible!</p>

    //             <a href="" class="link_404">
    //               Go to Home
    //             </a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>;
  }

  render() {
    const newView = this.view();
    this.$rootEl = diff(this.$oldView, newView)(this.$rootEl);
    this.$oldView = newView;
  }

  mount() {
    this.replaceChildren(
      (this.$rootEl = mount(
        $render((this.$oldView = this.view())),
        (this.$rootEl = document.createElement("div"))
      ))
    );
  }
}

customElements.define("not-found", NotFound);
