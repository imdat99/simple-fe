import { router } from "@app/routes";
import { define } from "@core/decorator";

@define("app-link")
export class AppLink extends HTMLElement {
  constructor() {
    super();
  }
  get to() {
    return this.getAttribute("to");
  }
  get target() {
    return this.getAttribute("target");
  }
  get rel() {
    return this.getAttribute("rel");
  }

  static get observedAttributes() {
    return ["to", "target", "rel"];
  }
  connected() {
    const aTag = document.createElement("a");
    this.childNodes.forEach((child) => {
      aTag.appendChild(child);
    });
    if (this.to) {
      aTag.href = this.to;
    }
    if (this.rel) {
      aTag.rel = this.rel;
    }
    if (this.target) {
      aTag.setAttribute("target", this.target);
    }
    if (this.classList.value) {
      (this.classList.value as any).split(" ").forEach((item: string) => {
        aTag.classList.add(item);
      });
    }
    if (this.style.all) {
      aTag.setAttribute("style", this.style.all);
    }
    aTag.addEventListener("click", (e) => {
      if (this.target !== "_blank") {
        router.navigateTo(this.to || "/");
        window.scrollTo(0, 0);
        e.preventDefault();
      }
    });
    this.replaceWith(aTag);
  }
}
