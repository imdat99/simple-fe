import appQuery from "@app/utils/config/axios.config";
import { LoadingScren } from "@app/view/components/fallback";
import { define, AppElement, h } from "@core/index";

@define("home-page")
export class HomePage extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.getData();
  }

  stateData() {
    return {
      loading: false,
      show: false,
      resData: undefined,
      params: {
        page: 0,
      },
    };
  }

  watch(property: string) {
    if (property === "resData") {
      // console.log(this.data.resData);
    }
    if (property === "params.page") {
      this.getData();
    }
    // console.log(property);
  }

  getData() {
    appQuery.call(this, {
      method: "GET",
      url: "/homePage/getHome",
      params: this.data.params,
    });
  }

  view() {
    return (
      <div>
        <h1
          on={{
            click: () => {
              this.data.params.page += 1;
              // console.log("aaa");
            },
          }}>
          ahihi
        </h1>
        <button
          on={{
            click: () => {
              this.data.show = !this.data.show;
            },
          }}>
          Show
        </button>
        <p>{this.data.resData?.data.searchKeyWord}</p>
        {this.data.show && <LoadingScren />}
        {this.data.loading && <div class="spinner"></div>}
      </div>
    );
  }
}
