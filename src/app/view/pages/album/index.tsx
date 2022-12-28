import { router } from "@app/routes";
import appClient from "@app/utils/client";
import { getLazyImg } from "@app/utils/helper/lazyimg";
import { LoadingScren } from "@app/view/components/fallback";
import ListMovie from "@app/view/components/movie-list";
import { AppElement, define, h } from "@core/index";

@define("album-page")
export class AlbumPage extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.listenScroll();
    router.params()[0]((params) => {
      this.data.params.id = params.id;
    });
    this.getData();
  }

  stateData() {
    return {
      loading: false,
      show: false,
      isEnd: false,
      resData: undefined,
      content: [],
      params: {
        page: 0,
        size: 12,
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
    if (property === "content.length") {
      getLazyImg.call(this);
    }
    if (property === "params.page" && !this.data.isEnd) {
      this.getData();
    }
  }

  getData() {
    this.data.loading = true;
    appClient
      .get("/album/detail", this.data.params)
      .then((res) => {
        if (res?.data.content.length) {
          this.data.content.push(...res?.data.content);
          this.data.resData = res?.data;
        } else {
          this.data.isEnd = true;
        }
      })
      .finally(() => {
        this.data.loading = false;
      });
  }

  view() {
    const content = [...this.data.content];
    return (
      <div>
        <div
          class="hero-header"
          style={`
        background: linear-gradient(var(--overlay-color),var(--background-color)),url("${encodeURI(
          this.data.resData?.shareImg || this.data.resData?.headImg
        )}");
        background-size: cover;
        `}
        ></div>
        <div class="container my-5">
          {this.data.show && <LoadingScren />}
          <div class="home-content">
            <div class="my-5">
              <strong class="d-block h5 my-2 pb-2 border-bottom">
                {this.data.resData?.name}
              </strong>
              <ListMovie props={content} />
            </div>
            {this.data.loading && <div class="spinner"></div>}
            {this.data.isEnd && <span>không còn dữ liệu</span>}
          </div>
        </div>
      </div>
    );
  }
}
