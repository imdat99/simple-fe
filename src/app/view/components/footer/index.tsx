import { customElement } from "@core/decorator";
import { h } from "@core/render";

@customElement("app-footer")
export class AppFooter extends HTMLElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return (
      <footer class="w-100 py-4 flex-shrink-0">
        <div class="container py-4">
          <div class="row gy-4 gx-2">
            <div class="col-lg-8 col-md-6">
              <h5 class="h3 text-white">
                <app-link class="footer-brand" to="/">
                  <img src="/logo.png" alt="" class="logo-img" />
                </app-link>
              </h5>
              <p class="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <p class="small text-muted mb-0">
                © Copyrights. All rights reserved.{" "}
                <a class="text-primary" href="/">
                  dat09.fun
                </a>
              </p>
            </div>
            <div class="col-lg-4 col-md-6">
              <h5 class="text-white mb-3">Newsletter</h5>
              <p class="small text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <form action="#">
                <div class="input-group mb-3">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn btn-primary"
                    id="button-addon2"
                    type="button">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
