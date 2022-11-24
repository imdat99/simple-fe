import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/index";

@define("app-search")
export class AppSearch extends AppElement {
  constructor() {
    super();
  }

  connected() {}

  view() {
    return (
      <div class="container">
        <div class="my-5">
          <div class="input-group mb-3 input-group-lg">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
              aria-label="Tìm kiếm..."
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div class="result-list">
          ahihi
        </div>
      </div>
    );
  }
}
