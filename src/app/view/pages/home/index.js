import $render, { diff, h, mount } from "../../../../core";
import javascriptLogo from "../../../../javascript.svg";
export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.mount();
  }
  count = 0;
  list = [];

  getData() {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10&_page="+String(Math.floor(Math.random() * 10)), {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        this.list = res;
        this.render();
      });
  }

  view() {
    return h("div", {}, [
      h(
        "a",
        {
          href: "https://vitejs.dev",
          target: "_blank",
        },
        [
          h("img", {
            src: "/vite.svg",
            class: "logo",
            alt: "vite logo",
          }),
        ]
      ),
      h(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          target: "_blank",
        },
        [
          h("img", {
            src: javascriptLogo,
            class: "logo",
            alt: "vite logo",
          }),
        ]
      ),
      h("h1", {}, ["Hello Vite!"]),
      h(
        "button",
        {
          type: "button",
          on: {
            click: this.getData.bind(this),
          },
        },
        ["Bấm"]
      ),
      h("div", { class: "card" }, [
        h("p", null, ["count is ", String(this.count)]),
      ]),
      h(
        "p",
        {
          class: "read-the-docs",
        },
        ["Click on the Vite logo to learn more"]
      ),
      h(
        "ol",
        {},
        this.list.map((e) => h("li", null, [String(e.title)]))
      ),
    ]);
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

customElements.define("home-page", HomePage);
