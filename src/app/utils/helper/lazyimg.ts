import { CHECK_BROWSER } from "../constant";

export function loadImg(img: HTMLElement) {
  const url = img.getAttribute("lazy-src");
  if (url) {
    img.setAttribute("src", url);
    img.removeAttribute("lazy-src");
  }
}

export function observerImg() {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImg(entry.target as HTMLElement);
      }
    });
  });
}

export function getLazyImg(this: any) {
  const lazyImg = this.$rootEl.querySelectorAll(
    "[lazy-src]"
  ) as NodeListOf<HTMLElement>;
  lazyImg.forEach((img) => {
    if (CHECK_BROWSER) {
      this.observer.observe(img);
    } else {
      loadImg(img as HTMLElement);
    }
  });
}
