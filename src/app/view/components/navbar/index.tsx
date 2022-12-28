import appRoute, { router } from "@app/routes";
import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/render";
import "./style.scss";
@define("app-nav")
export class AppNav extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.data.dark = localStorage.getItem("dark") === "true";
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
    let oldPath = this.data.activeRoute;
    const activeRoute = () =>
      (this.data.activeRoute = window.location.pathname);
    window.onload = function () {
      const bodyList = document.querySelector("body");

      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
          if (oldPath != document.location.href) {
            oldPath = document.location.href;
            activeRoute();
          }
        });
      });

      const config = {
        childList: true,
        subtree: true,
      };

      observer.observe(bodyList!, config);
    };
  }

  disconnected() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  handleClickOutside(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.data.toggle = false;
    }
  }

  data = {
    toggle: false,
    dark: false,
    activeRoute: window.location.pathname,
  };

  setThem() {
    if (this.data.dark) {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  }
  watch(property: string) {
    if (property === "dark") {
      this.setThem();
      localStorage.setItem(property, String(this.data[property]));
    }
  }

  view() {
    return (
      <nav class="navbar navbar-expand-md" aria-label="Fourth navbar example">
        <div class="container-fluid">
          <app-link class="navbar-brand" to="/">
            <img src="/logo.png" alt="" class="logo-img" />
          </app-link>
          <button
            class="navbar-toggler collapsed"
            on={{
              click: () => {
                this.data.toggle = !this.data.toggle;
              },
            }}
            type="button"
          >
            <i class="fa-solid fa-bars menu-toggle"></i>
          </button>
          <div
            class={`navbar-collapse collapse ${this.data.toggle ? "show" : ""}`}
          >
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              {appRoute
                .filter((item) => item.name)
                .map((item) => (
                  <li
                    class={`nav-item ${
                      item.path === this.data.activeRoute ? "active" : ""
                    }`}
                  >
                    <app-link to={item.path} class="nav-link">
                      {item.name}
                    </app-link>
                  </li>
                ))}
            </ul>
            <div class="right-container d-flex">
              <div class="theme-toggle my-auto">
                <div class="toggle-icon">
                  <div
                    class="dark-mode-switch form-check form-switch"
                    on={{
                      click: () => {
                        this.data.dark = !this.data.dark;
                      },
                    }}
                  >
                    <input
                      class="form-check-input btn-toggle position-relative cursor-pointer"
                      type="checkbox"
                      checked={String(this.data.dark)}
                    />
                  </div>
                </div>
              </div>
              <span
                class="btn-search"
                on={{
                  click: () => {
                    router.navigateTo("/search");
                  },
                }}
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
