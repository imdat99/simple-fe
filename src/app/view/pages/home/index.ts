import Client from "@app/utils/config/axios.config";
import { customElement, AppElement, h } from "@core/index";

@customElement("home-page")
export class HomePage extends AppElement {
  constructor() {
    super();
  }

  connected() {}

  data = {
    count: 0,
    list: [],
  };

  getData() {
    Client.get("/homePage/getHome?page=1").then((res) => {
      console.log(res.data);
    });
  }

  view() {
    return h("div", {}, [
      h(
        "a",
        {
          href: "https://vitejs.dev",
          target: "_blank",
        }
        // [
        //   h("img", {
        //     src: "/vite.svg",
        //     class: "logo",
        //     alt: "vite logo",
        //   }),
        // ]
      ),
      h(
        "a",
        {
          href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
          target: "_blank",
        }
        // [
        //   h("img", {
        //     src: javascriptLogo,
        //     class: "logo",
        //     alt: "vite logo",
        //   }),
        // ]
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
        h("p", null, ["count is ", String(this.data.count)]),
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
        this.data.list.map((e: any) => h("li", null, [String(e.title)]))
      ),
    ]);
  }
}
