import appClient from "@app/utils/client";
import { getLazyImg } from "@app/utils/helper/lazyimg";
import Banner from "@app/view/components/banner";
import { LoadingScren } from "@app/view/components/fallback";
import ListMovie from "@app/view/components/movie-list";
import MovieStar from "@app/view/components/star";
import { AppElement, define, h } from "@core/index";

const memoStar = new Map();
@define("home-page")
export class HomePage extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.getData();
    this.listenScroll();
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

  listenScroll() {
    window.onscroll = () => {
      const { scrollHeight, clientHeight, scrollTop } =
        document.documentElement;
      if (scrollTop + clientHeight > scrollHeight - 250 && !this.data.isEnd) {
        this.data.params.page++;
      }
    };
  }

  watch(property: string) {
    if (property === "resData.length") {
      getLazyImg.call(this);
    }
    if (property === "params.page" && !this.data.isEnd) {
      this.getData();
    }
  }

  getData() {
    this.data.loading = true;
    appClient
      .get("/homePage/getHome", this.data.params)
      .then((res) => {
        if (res?.data.recommendItems.length) {
          this.data.resData.push(...res?.data.recommendItems);
        } else {
          this.data.isEnd = true;
        }
      })
      .finally(() => {
        this.data.loading = false;
      });
  }

  view() {
    return (
      <div class="container my-5">
        {this.data.show && <LoadingScren />}
        <div class="home-content">
          {this.data.resData.map((item: any) => {
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
                <ListMovie props={item?.recommendContentVOList} />
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
