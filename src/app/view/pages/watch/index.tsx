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
    this.hlsScript.src = "https://cdn.jsdelivr.net/npm/hls.js@1";
    this.hlsScript.async = true;

    this.artScript = document.createElement("script");
    this.artScript.src =
      "https://cdn.jsdelivr.net/npm/artplayer/dist/artplayer.js";
    this.artScript.async = true;

    document.head.appendChild(this.hlsScript);
    document.head.appendChild(this.artScript);
  }

  hlsScript: HTMLScriptElement;
  artScript: HTMLScriptElement;
  artPlayer: any;
  connected() {
    router.params()[0]((params) => {
      this.data.params.id = params.id;
      this.data.params.category = params.type || 0;
      this.data.ep = params.ep - 1 || 0;
    });
    // this.getMovieDetail();
  }

  disconnected() {
    this.artPlayer?.destroy(false);
    this.artScript.remove();
    this.hlsScript.remove();
  }

  stateData() {
    return {
      loading: false,
      isEnd: false,
      resData: {},
      ep: 0,
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
      this.player();
    }
    if (property === "ep") {
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
    return (
      <section class="section-watch">
        <div class="video">
          {this.data.loading ? (
            <LoadingScren />
          ) : (
            <div class="player-container" style="height: 560px"></div>
          )}
        </div>
        <div class="text-center">
          Phim load chậm? <span>Xem hướng dẫn</span>
        </div>
        <p class="text-center">
          Phim không có tiếng / mất tiếng nhân vật / âm thanh bị rè?{" "}
          <span>Xem hướng dẫn</span>
        </p>
        <div class="section">
          <div class="container">
            <div class="columns watch-top">
              <div class="column name">
                <h1>{name}</h1>
                <h2> {aliasName}</h2>
                <div class="intro my-3">
                  {introduction || "Đang cập nhật..."}
                </div>
                <div>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php}`}
                    class="fb-share-button"
                    target="_blank"
                  >
                    <i class="fa-brands fa-square-facebook"></i>
                    Chia sẻ
                  </a>
                </div>
              </div>
              <div class="column feature">
                {episodeVo?.length > 1 && (
                  <div>
                    <span>Tập phim</span>
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
                            class="btn btn-danger me-1 disable"
                          >
                            {item.seriesNo}
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-ep={item.seriesNo}
                            class="btn btn-danger me-1 disable"
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
                    <span>Trở về trang giới thiệu phim</span>
                  </div>
                </app-link>
              </div>
            </div>
            <div class="comments-section">
              <h2 class="comments-title">
                <i class="fa-regular fa-comments"></i>
                Bình luận phim
              </h2>
              <form action="comment">
                <textarea
                  class="textarea"
                  rows="2"
                  placeholder="Nhập bình luận..."
                ></textarea>
                <button type="button" class="btn btn-outline-secondary">
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
