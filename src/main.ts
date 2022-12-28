import "@app/view/components/appLink";
import { define } from "@core/decorator";
import { AppNav } from "@app/view/components/navbar";
import { AppOutlet } from "@app/view/components/outlet";
import "@app/assets/style/main.scss";
import { AppFooter } from "@app/view/components/footer";

@define("my-app")
export class MyApp extends HTMLElement {
  constructor() {
    super();
  }
  connected() {
    const appNav = new AppNav();
    this.appendChild(appNav);
    this.appendChild(new AppOutlet());
    this.appendChild(new AppFooter());
    const cssRule =
      "color: rgb(255, 128, 128);" +
      "font-size: 30px;" +
      "font-weight: bold;" +
      "text-shadow: 1px 1px 5px rgb(249, 162, 34);" +
      "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
    setTimeout(console.log.bind(console, "%cDAT09.FUN 🎬", cssRule), 0);
  }
}
