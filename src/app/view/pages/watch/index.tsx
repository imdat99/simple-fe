import { router } from "@app/routes";
import appClient from "@app/utils/client";
import { QUALITY_TYPE } from "@app/utils/constant";
import { LoadingScren } from "@app/view/components/fallback";
import { AppElement, define, h } from "@core/index";
import player from "./player";
import "./style.scss";

@define("app-player")
export class WatchMovie extends AppElement {
  constructor() {
    super();

    this.hlsScript = document.createElement("script");
    this.hlsScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.5.14/hls.min.js";
    this.hlsScript.async = false;

    this.artScript = document.createElement("script");
    this.artScript.src =
      "https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js";
    this.artScript.async = false;

    document.head.appendChild(this.hlsScript);
    document.head.appendChild(this.artScript);
  }

  confirmLoaded() {
    this.data.playerLoaded += 1;
  }

  hlsScript: HTMLScriptElement;
  artScript: HTMLScriptElement;
  artPlayer: any;
  connected() {
    this.artScript.addEventListener("load", this.confirmLoaded.bind(this));
    this.hlsScript.addEventListener("load", this.confirmLoaded.bind(this));
    router.params()[0]((params) => {
      this.data.params.id = params.id;
      this.data.params.category = params.type || 0;
      this.data.ep = params.ep - 1 || 0;
    });
    // this.getMovieDetail();
  }

  disconnected() {
    this.artPlayer?.destroy(false);
    this.artScript.removeEventListener("load", this.confirmLoaded.bind(this));
    this.hlsScript.removeEventListener("load", this.confirmLoaded.bind(this));
    this.artScript.remove();
    this.hlsScript.remove();
  }

  stateData() {
    return {
      loading: false,
      isEnd: false,
      resData: {},
      ep: 0,
      playerLoaded: 0,
      params: {
        id: "",
        category: 0,
      },
      content: [],
    };
  }
  player() {
    this.artPlayer = player({
      url: this.data.content[0].url,
      poster: encodeURI(this.data.resData?.coverHorizontalUrl),
      subtitle: this.data.resData?.episodeVo[this.data.ep].subtitlingList,
      quality: this.data.content,
    });
    this.artPlayer.on("ready", () => {
      this.artPlayer.autoHeight = true;
    });
  }

  watch(property: string) {
    if (property === "content") {
      this.confirmLoaded();
    }
    if (property === "playerLoaded" && this.data.playerLoaded > 2) {
      this.player();
    }
    if (property === "ep") {
      window.scrollTo(0, 0);
      this.artPlayer?.destroy(false);
      this.getMovieDetail();
    }
  }

  getMovieDetail() {
    this.data.loading = true;
    appClient
      .get("/movieDrama/get", this.data.params)
      .then((res) => {
        if (!res.data) {
          this.data.isEnd = true;
        } else {
          this.data.resData = res.data;
          const episodeVoData = res.data.episodeVo[this.data.ep];
          Promise.all(
            episodeVoData.definitionList.map((item: any) =>
              appClient.get("/media/previewInfo", {
                category: res.data.category,
                contentId: res.data.id,
                episodeId: episodeVoData.id,
                definition: item.code,
              })
            )
          ).then((data) => {
            this.data.content = data.map(({ data }, index) => ({
              default: !index,
              html: (QUALITY_TYPE as any)[data?.currentDefinition],
              url: data?.mediaUrl,
            }));
          });
        }
      })
      .finally(() => {
        this.data.loading = false;
      });
  }

  view() {
    const { pathname, search } = window.location;
    const { episodeVo, aliasName, name, introduction } =
      this.data.resData || {};
    return this.data.loading ? (
      <div class="spinner"></div>
    ) : (
      <section class="section-watch">
        <div class="video">
          <div class="player-container" style="height: 560px" />
        </div>
        <div class="text-center">
          Phim load ch???m?{" "}
          <span
            on={{
              click: () => {
                window.open(
                  `https://www.google.com/search?q=${encodeURI(
                    "Phim load ch???m"
                  )}`
                );
              },
            }}
          >
            Xem h?????ng d???n
          </span>
        </div>
        <div class="text-center">
          <span
            class="text-danger"
            on={{
              click: () => {
                window.open(
                  "https://devratroom.blogspot.com/p/cross-domain-cors-extension.html"
                );
              },
            }}
          >
            Phim kh??ng load ???????c? h??y th??? c??i Extention Cors
          </span>
        </div>
        <p class="text-center">
          Phim kh??ng c?? ti???ng / m???t ti???ng nh??n v???t / ??m thanh b??? r???
          <span
            on={{
              click: () => {
                window.open(
                  `https://www.google.com/search?q=${encodeURI(
                    "Phim kh??ng c?? ti???ng / m???t ti???ng nh??n v???t / ??m thanh b??? r???"
                  )}`
                );
              },
            }}
          >
            Xem h?????ng d???n
          </span>
        </p>
        <div class="section">
          <div class="container">
            <div class="columns watch-top">
              <div class="column name">
                <h1>
                  {name}
                  {episodeVo?.length > 1 ? ` - Ep.${this.data.ep + 1}` : ""}
                </h1>
                <h2> {aliasName}</h2>
                <div class="intro my-3">
                  {introduction || "??ang c???p nh???t..."}
                </div>
                <div>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                    class="fb-share-button"
                    target="_blank"
                  >
                    <i class="fa-brands fa-square-facebook"></i>
                    Chia s???
                  </a>
                </div>
              </div>
              <div class="column feature">
                {episodeVo?.length > 1 && (
                  <div>
                    <span>T???p phim</span>
                    <div
                      class="dual-sub-toggle"
                      on={{
                        click: (e: MouseEvent) => {
                          const target = e.target as HTMLElement;
                          if (target.tagName === "BUTTON") {
                            router.params()[1](target.dataset);
                            this.data.ep = (target.dataset.ep as any) - 1;
                          }
                        },
                      }}
                    >
                      {episodeVo?.map((item: any) =>
                        item.seriesNo === this.data.ep + 1 ? (
                          <button
                            type="button"
                            data-ep={item.seriesNo}
                            disabled=""
                            class="btn btn-success m-1 disable"
                          >
                            {item.seriesNo}
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-ep={item.seriesNo}
                            class="btn btn-danger m-1 disable"
                          >
                            {item.seriesNo}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
                <app-link
                  to={(pathname + search + "&ep=1").replace(
                    "/watch/",
                    "/movie/"
                  )}
                  class="watch-btn"
                >
                  <div class="back">
                    <i class="fa-solid fa-backward"></i>
                    <span>Tr??? v??? trang gi???i thi???u phim</span>
                  </div>
                </app-link>
              </div>
            </div>
            <div class="comments-section">
              <h2 class="comments-title">
                <i class="fa-regular fa-comments"></i>
                B??nh lu???n phim
              </h2>
              <form action="comment">
                <textarea
                  class="textarea"
                  rows="2"
                  placeholder="Nh???p b??nh lu???n... (Ph???n n??y kh??ng ch???y, ????? cho ?????p :v)"
                ></textarea>
                <button type="button" class="btn btn-outline-secondary">
                  G???i
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
