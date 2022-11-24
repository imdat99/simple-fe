export function lazyImage() {
  const images = document.querySelector("[lzsrc]");
  if ("IntersectionObserver" in window) {
    console.log(images);
    // window.IntersectionObserver
  } else {
  }
}
