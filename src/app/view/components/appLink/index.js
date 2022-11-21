import { router } from "@app/routes";

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
  connectedCallback() {
    const aTag = document.createElement("a");
    this.childNodes.forEach((child) => {
      aTag.appendChild(child);
    });
    aTag.href = this.to;
    if (this.rel) {
      aTag.rel = this.rel;
    }
    if (this.classList.value) {
      aTag.classList = this.classList;
    }
    if (this.style.value) {
      aTag.style = this.style;
    }
    aTag.addEventListener("click", (e) => {
      console.log(this.to);
      router.navigateTo(this.to);
      e.preventDefault();
    });
    this.replaceWith(aTag);
  }
}

customElements.define("app-link", AppLink);
