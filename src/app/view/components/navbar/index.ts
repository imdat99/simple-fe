import appRoute, { router } from "@app/routes";
import { customElement } from "@core/decorator";
import { h } from "@core/render";
import './style.css'
@customElement("app-nav")
export class AppNav extends HTMLElement {
  constructor() {
    super();
  }
  connected() {
   
  }
  data = {
    toggle: false,
  };
  view() {
    return h(
      "nav",
      {
        class: "navbar navbar-expand-md",
        "aria-label": "Fourth navbar example",
      },
      h(
        "div",
        {
          class: "container-fluid",
        },
        h(
          "a",
          {
            class: "navbar-brand",
            href: "#",
          },
          h("img", {
            src: "/logo-full.png",
            alt: "",
            class: "logo-img",
          })
        ),
        h(
          "button",
          {
            class: "navbar-toggler collapsed",
            type: "button",
            "data-bs-toggle": "collapse",
            "data-bs-target": "#navbarsExample04",
            "aria-controls": "navbarsExample04",
            "aria-expanded": "false",
            "aria-label": "Toggle navigation",
            on: {
              click: () => {
                this.data.toggle = !this.data.toggle;
              },
            },
          },
          h("span", {
            class: "navbar-toggler-icon",
          })
        ),
        h(
          "div",
          {
            class: `navbar-collapse collapse ${this.data.toggle ? "show" : ""}`,
            style: "",
          },
          h(
            "ul",
            {
              class: "navbar-nav me-auto mb-2 mb-md-0",
            },
            appRoute
              .filter((item) => item.name)
              .map((item) =>
                h(
                  "li",
                  {
                    class: "nav-item",
                  },
                  [
                    h(
                      "app-link",
                      {
                        to: item.path,
                        target: "_blank",
                        class: "nav-link active",
                      },
                      [item.name || ""]
                    ),
                  ]
                )
              )
          ),
          h('span', {class: "btn-search", on: {click: ()=> {
            router.navigateTo('/search')
          }}}
          ,h('i',{class: "fa-solid fa-magnifying-glass"})
          )
        )
      )
    );
  }
}
