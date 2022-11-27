import { router } from "@app/routes";
import appClient, { appQuery } from "@app/utils/client";
import { getLazyImg } from "@app/utils/helper/lazyimg";
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
      isEnd: false,
      resData: undefined,
      search: {
        searchKeyWord: "",
        size: 50,
        sort: "",
        searchType: "",
      },
    };
  }
  getDefaultData() {
    appQuery.call(this, {
      url: "/search/v1/searchLeaderboard",
    });
  }
  watch(property: string) {
    if (property === "loading") {
      getLazyImg.call(this);
    }
    if (property.includes("search.")) {
      // location.search = "?keyword=";
      router.params()[1](this.data.search);
    }
  }
  connected() {
    router.params()[0]((initSearch) => {
      this.data.search = {
        ...this.data.search,
        ...initSearch,
      };
    });
    if (this.data.search.searchKeyWord) {
      this.handleSearch();
    } else {
      this.getDefaultData();
    }
  }
  handleSearch() {
    this.data.resData = undefined;
    this.data.loading = true;
    this.data.isEnd = false;
    appClient
      .post("/search/v1/searchWithKeyWord", this.data.search)
      .then((res) => {
        this.data.resData = res.data.searchResults;
        if (!res.data.searchResults.length) {
          this.data.isEnd = true;
        }
      })
      .finally(() => {
        this.data.loading = false;
      });
  }
  view() {
    return (
      <div class="container">
        <div class="my-5">
          <div class="input-group position-relative mb-3 input-group-lg">
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm..."
              aria-label="Tìm kiếm..."
              value={this.data.search.searchKeyWord}
              on={{
                keyup: (e: KeyboardEvent) => {
                  if (e.key === "Enter") {
                    this.handleSearch();
                  }
                  this.data.search.searchKeyWord = (
                    e.target as HTMLInputElement
                  ).value;
                },
              }}
            />
            <i
              on={{
                click: () => {
                  this.data.search.searchKeyWord = "";
                  this.getDefaultData();
                },
              }}
              class="fa-solid fa-circle-xmark position-absolute clear-input"
            ></i>
            <button
              class="btn btn-outline-secondary"
              type="button"
              on={{
                click: () => {
                  if (this.data.search.searchKeyWord) {
                    this.handleSearch();
                  } else {
                    this.getDefaultData();
                  }
                },
              }}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <div class="result-list">
          <ListMovie props={this.data.resData} />
        </div>
        {this.data.loading && <div class="spinner"></div>}
        {this.data.isEnd && <span>không còn dữ liệu</span>}
      </div>
    );
  }
}
