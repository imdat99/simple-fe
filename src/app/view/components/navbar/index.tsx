import appRoute, { router } from "@app/routes";
import { customElement } from "@core/decorator";
import { h } from "@core/render";
import "./style.scss";
@customElement("app-nav")
export class AppNav extends HTMLElement {
  constructor() {
    super();
  }
  connected() {
    this.data.dark = localStorage.getItem("dark") === "true";
  }

  data = {
    toggle: false,
    dark: false,
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
                  <li class="nav-item">
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
                      checked={this.data.dark}
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
