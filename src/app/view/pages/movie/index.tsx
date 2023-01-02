import { router } from "@app/routes";
import appClient from "@app/utils/client";
import { getLazyImg } from "@app/utils/helper/lazyimg";
import ListMovie from "@app/view/components/movie-list";
import MovieStar from "@app/view/components/star";
import { define } from "@core/decorator";
import { AppElement, h } from "@core/index";
import "./style.scss";

const memoStar = new Map();
@define("movie-detail")
export class AppMovie extends AppElement {
  constructor() {
    super();
  }

  stateData() {
    return {
      loading: false,
      isEnd: false,
      resData: {},
      params: {
        id: "",
        category: 0,
      },
    };
  }

  watchRender() {
    getLazyImg.call(this);
  }
  connected() {
    router.params()[0]((params) => {
      this.data.params.id = params.id;
      this.data.params.category = params.type || 0;
    });
    this.getMovieDetail();
  }

  getMovieDetail() {
    this.data.loading = true;
    appClient
      .get("/movieDrama/get", this.data.params)
      .then((res) => {
        if (!res.data) {
          this.data.isEnd = true;
        }
        this.data.resData = res.data;
      })
      .finally(() => {
        this.data.loading = false;
      });
  }

  view() {
    const {
      year,
      coverHorizontalUrl,
      coverVerticalUrl,
      name,
      score,
      aliasName,
      tagNameList,
      areaNameList,
      introduction,
      starList,
      likeList = [],
    } = this.data.resData || {};
    const { pathname, search } = window.location;
    return this.data.isEnd ? (
      <span>không còn dữ liệu</span>
    ) : this.data.loading ? (
      <div class="spinner"></div>
    ) : (
      <div class="detail-page">
        <div
          class="backdrop"
          style={`background-image: url(${encodeURI(coverHorizontalUrl)})`}
        ></div>
        <section class="section position-relative">
          <div class="container shiftup">
            <div class="tt-detail">
              <div class="poster-column">
                <img src={coverVerticalUrl} alt="" />
                <app-link
                  to={(pathname + search + "&ep=1").replace(
                    "/movie/",
                    "/watch/"
                  )}
                  class="watch-btn"
                >
                  <span>
                    <i class="fa-solid fa-play"></i> XEM PHIM
                  </span>
                </app-link>
              </div>
              <div class="main-column">
                <h1 class="maintitle">{name}</h1>
                <h2 class="subtitle">
                  {aliasName}({year})
                </h2>
                <div class="meta">
                  <span
                    class="runtime"
                    style={
                      "tv" === "tv"
                        ? "display: none"
                        : 'display: "inline-block"'
                    }
                  >
                    {/* {Math.floor(movieDetail.runtime / 60)} giờ{" "}
                  {movieDetail.runtime % 60} phút */}
                  </span>
                  <span class="content-rating">PG-13</span>
                </div>
                <div class="meta">
                  <span class="imb-icon">
                    <img src="/imdb.svg" alt="imdb" />
                  </span>
                  <span class="imb-rating">{score}</span>
                </div>
                <div class="level genres">
                  <div class="level-left">
                    <div class="level-item">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                      >
                        <i class="fa-brands fa-square-facebook"></i>
                        Chia sẻ
                      </a>
                    </div>
                    <div class="level-item">
                      <span class={`colection add`}>
                        <i class="fa-solid fa-bug-slash"></i>
                      </span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item buttons">
                      {tagNameList?.map((item: string) => (
                        <button
                          type="button"
                          class="btn btn-outline-light btn-sm rounded"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div class="horizontal">
                  <div class="hoz-content">
                    <p>Đạo diễn</p>
                    <span>Jaume Collet-Serra</span>
                  </div>
                  <div class="hoz-content">
                    <p>Quốc gia</p>
                    <span>{areaNameList?.join(", ")}</span>
                  </div>
                  <div class="hoz-content">
                    <p>Khởi chiếu</p>
                    <span>{year}</span>
                  </div>
                </div>
                <div class="intro">{introduction || "Đang cập nhật..."}</div>
                {starList?.length &&
                  (() => {
                    const oldComp = memoStar.get(this.$id);
                    if (oldComp) {
                      return <div class="cast mt-5" html={oldComp} />;
                    } else {
                      const comp = new MovieStar();
                      comp.props = {
                        list: starList,
                        title: "Diễn viên",
                      };
                      memoStar.set(this.$id, comp);
                      return <div class="cast mt-5" html={comp} />;
                    }
                  })()}
                <div class="trailer">
                  <strong class="d-block h5 my-2 pb-2 border-bottom">
                    Cùng thể loại
                  </strong>
                  <ListMovie props={likeList} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
