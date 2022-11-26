import appQuery from "@app/utils/config/axios.config";
import ListMovie from "@app/view/components/movie-list";
import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/index";

@define("app-search")
export class AppSearch extends AppElement {
  constructor() {
    super();
  }

  stateData() {
    return {
      loading: false,
      resData: undefined,
    };
  }
  getDefaultData() {
    appQuery.call(this, {
      method: "GET",
      url: "/search/v1/searchLeaderboard",
    });
  }
  watch() {
    // console.log(this.data.resData);
  }
  connected() {
    this.getDefaultData();
  }

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
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div class="result-list">
          {ListMovie(this.data.resData?.data?.list)}
        </div>
        {this.data.loading && <div class="spinner"></div>}
      </div>
    );
  }
}
