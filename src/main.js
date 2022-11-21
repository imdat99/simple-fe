import "@app/view/components/appLink";
import { AppNav } from "@app/view/components/navbar";
import { AppOutlet } from "@app/view/components/outlet";
import "./style.css";

export class MyApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(new AppNav());
    this.appendChild(new AppOutlet());
  }
}

customElements.define("my-app", MyApp);
