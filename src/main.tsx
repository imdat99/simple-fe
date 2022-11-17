import "./style.css";

import { h, jsx } from "snabbdom";
import { appComponent, cx } from "./core";

const root = document.querySelector<HTMLDivElement>("#app")!;

const Test = appComponent<{ count: number }>({
  state: {
    count: 0,
  },
  view() {
    return h(
      "p",
      {
        on: {
          click: () => {
            this.count++;
          },
        },
      },
      ["abc ", this.count]
    );
  },
});

const App = appComponent({
  state: {
    count: 0,
  },
  view() {
    return (
      <div
        props={{
          id: "app",
        }}
      >
        <div>
          <a
            props={{
              href: "https://vitejs.dev",
              target: "_blank",
            }}
          >
            <img
              class={cx("logo")}
              props={{
                src: "/vite.svg",
                alt: "Vite logo",
              }}
            />
          </a>
          <a
            props={{
              href: "https://www.typescriptlang.org/",
              target: "_blank",
            }}
          >
            <img
              class={cx("logo")}
              props={{
                src: "/vite.svg",
                alt: "Vite logo",
              }}
            />
          </a>
          <h1>Vite + TypeScript</h1>
          <div class={cx("card")}>
            <button
              props={{
                id: "counter",
                type: "button",
              }}
              on={{
                click: () => {
                  this.count++;
                },
              }}
            >
              {this.count}
            </button>
          </div>
          <p class={cx("read-the-docs")}>
            Click on the Vite and TypeScript logos to learn more
          </p>
          {Test.$mount()}
        </div>
      </div>
    );
  },
});

App.$mount({ root });
