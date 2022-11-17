import "./style.css";

import { jsx } from "snabbdom";
import { patch, view } from "./core";
import { onCreated } from "./core/hooks";
import { reactive, ref } from "./reactive";

const root = document.querySelector<HTMLDivElement>("#app")!;

const Test = () => {
  const count = reactive({value: 0});
  return view(()=>(
    <p on={{click: () => {
      count.value ++
    }}}>ahihi {count.value}</p>
  ))
}

const app = () => {
  const count = ref(0);

  onCreated(() => {
    console.log("mounted")
  })

  return  view(() => (
    <div
      props={{
        id: "app",
      }}>
      <div>
        <a
          props={{
            href: "https://vitejs.dev",
            target: "_blank",
          }}>
          <img
            class={{ ["logo"]: true }}
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
          }}>
          <img
            class={{ ["logo"]: true }}
            props={{
              src: "/vite.svg",
              alt: "Vite logo",
            }}
          />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class={{ ["card"]: true }}>
          <button
            props={{
              id: "counter",
              type: "button",
            }}
            on={{
              click: () => {
                count.value++;
              },
            }}>
            {count.value}
          </button>
        </div>
        <p class={{ ["read-the-docs"]: true }}>
          Click on the Vite and TypeScript logos to learn more
        </p>
        <Test />
      </div>
    </div>
  ))
};

patch(root, app());
