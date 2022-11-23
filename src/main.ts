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
    console.log("app bootstrap");
    const appNav = new AppNav();
    appNav.props = { ahiihi: 123 };
    this.appendChild(appNav);
    this.appendChild(new AppOutlet());
    this.appendChild(new AppFooter());
  }

  // view() {
  //   return
  // }
}
