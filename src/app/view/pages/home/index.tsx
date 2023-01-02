import { store } from "@app/store";
import { addFilm } from "@app/store/filmStore/action";
import appClient from "@app/utils/client";
import { EVENT_TYPE } from "@app/utils/constant";
import { getLazyImg } from "@app/utils/helper/lazyimg";
import Banner from "@app/view/components/banner";
import { LoadingScren } from "@app/view/components/fallback";
import ListMovie from "@app/view/components/movie-list";
import MovieStar from "@app/view/components/star";
import { AppElement, define, h, isInViewport } from "@core/index";

const memoStar = new Map();

interface HomePageState {
  loading: boolean;
  show: boolean;
  isEnd: boolean;
  resData: any[];
  params: {
    page: number;
    size: number;
    navigationId: number;
  };
}
// {!this.data.isEnd && !this.data.loading && <button on={{click: () => {
//   this.data.params.page = this.props.filmData.page + 1;
//             }}}>Xem thêm</button>}
@define("home-page")
export class HomePage extends AppElement<HomePageState> {
  constructor() {
    super();
  }

  connected() {
    if (!this.props.filmData) {
      this.getData();
    }
    this.listenScroll(EVENT_TYPE.INIT);
    console.log("fasdfasfgas", this.props.filmData?.navigationId);
  }

  disconnected() {
    console.log("disss");
    // console.log(this.listenScroll);
    this.listenScroll(EVENT_TYPE.DESTROY);
  }

  connectStore(state: any): void {
    console.log("state", state);
    this.props.filmData = state.filmData[this.params[0]];
  }

  stateData() {
    return {
      loading: false,
      show: false,
      isEnd: false,
      resData: [],
      params: {
        page: 0,
        size: 10,
        navigationId: this.params[0],
      },
    };
  }

  listenScroll(type: EVENT_TYPE) {
    const runner = () => {
      const { scrollHeight, clientHeight, scrollTop } =
        document.documentElement;
      if (
        scrollTop + clientHeight > scrollHeight - 250 &&
        !this.data.isEnd &&
        !this.data.loading
      ) {
        console.log(this.$id + this.props.filmData?.navigationId);
        this.data.params.page = this.props.filmData.page + 1;
      }
    };
    if (type === EVENT_TYPE.INIT) {
      document.addEventListener("scroll", runner, false);
    } else {
      document.removeEventListener("scroll", runner, false);
    }
  }

  watch(property: string) {
    // if (tagname === "home-page") {
    // }
    if (property === "resData.length") {
      getLazyImg.call(this);
    }
    if (property === "params.page" && !this.data?.isEnd) {
      this.getData();
    }
  }

  getData() {
    console.log("gettt", this.props.filmData?.navigationId);
    this.data.loading = true;
    appClient
      .get("/homePage/getHome", this.data.params)
      .then((res) => {
        if (res?.data.recommendItems.length) {
          this.data.resData.push(...res?.data.recommendItems);
          store.dispatch(
            addFilm({
              ...this.data.params,
              filmBlock: res?.data.recommendItems,
            })
          );
        } else {
          this.data.isEnd = true;
        }
      })
      .finally(() => {
        this.data.loading = false;
      });
  }

  view() {
    // console.log(this.props);
    const { filmBlock } = this.props.filmData || {};
    return (
      <div class="container my-5">
        {this.data.show && <LoadingScren />}
        <div class="home-content">
          {filmBlock?.map((item: any) => {
            if (item.homeSectionType === "BANNER") {
              return <div html={Banner(item.recommendContentVOList)} />;
            }
            if (item.homeSectionType === "BLOCK_GROUP") {
              const oldComp = memoStar.get(item?.homeSectionId);
              if (oldComp) {
                return <div class="my-5" html={oldComp} />;
              } else {
                const comp = new MovieStar();
                comp.props = {
                  list: item.recommendContentVOList,
                  title: item?.homeSectionName,
                };
                memoStar.set(item.homeSectionId, comp);
                return <div class="my-5" html={comp} />;
              }
            }
            return (
              <div class="my-5">
                <strong class="d-block h5 my-2 pb-2 border-bottom">
                  {item?.homeSectionName}
                </strong>
                {/* <ListMovie props={item?.recommendContentVOList} /> */}
              </div>
            );
          })}
          {this.data.loading && <div class="spinner"></div>}
          {this.data.isEnd && <span>không còn dữ liệu</span>}
        </div>
      </div>
    );
  }
}
