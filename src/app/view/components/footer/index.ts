import { customElement } from "@core/decorator";
import { h } from "@core/render";

@customElement("app-footer")
export class AppFooter extends HTMLElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return h(
      "footer",
      {
        class: "w-100 py-4 flex-shrink-0",
      },
      h(
        "div",
        {
          class: "container py-4",
        },
        h(
          "div",
          {
            class: "row gy-4 gx-2",
          },
          h(
            "div",
            {
              class: "col-lg-8 col-md-6",
            },
            h(
              "h5",
              {
                class: "h3 text-white",
              },
              "DAT09.FUN"
            ),
            h(
              "p",
              {
                class: "small text-muted",
              },
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
            ),
            h(
              "p",
              {
                class: "small text-muted mb-0",
              },
              "\xA9 Copyrights. All rights reserved. ",
              h(
                "a",
                {
                  class: "text-primary",
                  href: "/",
                },
                "dat09.fun"
              )
            )
          ),
          h(
            "div",
            {
              class: "col-lg-4 col-md-6",
            },
            h(
              "h5",
              {
                class: "text-white mb-3",
              },
              "Newsletter"
            ),
            h(
              "p",
              {
                class: "small text-muted",
              },
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
            ),
            h(
              "form",
              {
                action: "#",
              },
              h(
                "div",
                {
                  class: "input-group mb-3",
                },
                h("input", {
                  class: "form-control",
                  type: "text",
                  placeholder: "Recipient's username",
                  "aria-label": "Recipient's username",
                  "aria-describedby": "button-addon2",
                }),
                h(
                  "button",
                  {
                    class: "btn btn-primary",
                    id: "button-addon2",
                    type: "button",
                  },
                  h("i", {
                    class: "fas fa-paper-plane",
                  })
                )
              )
            )
          )
        )
      )
    );
  }
}
