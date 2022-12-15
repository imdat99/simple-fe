import { define } from "@core/decorator";
import { h } from "@core/render";

@define("app-footer")
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
              <app-link to="/">
                <div class="footer-brand mb-2">
                  <img src="/logo.png" alt="" class="logo-img" />
                </div>
              </app-link>
              <p class="small text-muted">
                <strong>Vanilla-movie</strong>, (SPA) ứng dụng web xem phim được
                làm thuần bằng TS, không sử dụng bất kỳ famework nào
                <br />
                Nguồn phim được lấy từ api app
                <a href="https://documenter.getpostman.com/view/18986031/UVXdNeFD">
                  <strong> loklok</strong>
                </a>
              </p>
              <p>
                <strong>contact me:</strong>
                <a href="https://www.facebook.com/lethdat">
                  <i class="fs-4 ms-2 fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/">
                  <i class="fs-4 ms-2 fa-brands fa-instagram"></i>
                </a>
              </p>
              <p class="small text-muted mb-0">
                © Copyrights. All rights reserved.{" "}
                <a class="text-danger" href="/">
                  dat09.fun
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
