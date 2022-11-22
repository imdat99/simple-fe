import "@app/view/components/appLink";
import { customElement } from "@core/decorator";
import { AppNav } from "@app/view/components/navbar";
import { AppOutlet } from "@app/view/components/outlet";
import "@app/assets/style/main.scss";
import { AppFooter } from "@app/view/components/footer";

@customElement('my-app')
export class MyApp extends HTMLElement {
  constructor() {
    super();
  }
  connected(){
    this.appendChild(new AppNav());
    this.appendChild(new AppOutlet());
    this.appendChild(new AppFooter());
  }
}
