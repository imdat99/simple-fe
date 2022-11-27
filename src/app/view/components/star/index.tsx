import { jumpLink } from "@app/utils/helper";
import { AppElement, define, h } from "@core/index";
import "./style.scss";

@define("movie-star")
class MovieStar extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.appCarousel();
  }

  appCarousel() {
    let span = this.querySelectorAll(
      '[type="button"]'
    ) as NodeListOf<HTMLElement>;
    let product = this.querySelectorAll(
      `[data="${this.$id}"]`
    ) as NodeListOf<HTMLElement>;
    let product_page = Math.ceil(product.length / 4);
    let l = 0;
    let movePer = 25;
    let maxMove = product.length * 12;
    // mobile_view
    let mob_view = window.matchMedia("(max-width: 768px)");
    if (mob_view.matches) {
      movePer = 50.36;
      maxMove = 504;
    }

    let right_mover = () => {
      l = l + movePer;
      if (product.length == 1) {
        l = 0;
      }
      for (const i of product as any) {
        if (l > maxMove) {
          l = l - movePer;
        }
        (i as any).style.left = "-" + l + "%";
      }
    };
    let left_mover = () => {
      l = l - movePer;
      if (l <= 0) {
        l = 0;
      }
      for (const i of product as any) {
        if (product_page > 1) {
          (i as any).style.left = "-" + l + "%";
        }
      }
    };
    span[1].onclick = () => {
      right_mover();
    };
    span[0].onclick = () => {
      left_mover();
    };
  }
  view() {
    return (
      <div>
        <div class="d-flex h5 my-2 pb-2 border-bottom justify-content-between">
          <strong>{this.props.title}</strong>
          <div class="btn-control">
            <button type="button">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button type="button">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div class="star-list">
          <div class="star-container">
            {this.props.list?.map((item: any) => {
              return (
                <div data={this.$id}>
                  <app-link to={`/album/${jumpLink(item)}`}>
                    <div class="star-inner">
                      <div class="star-img">
                        <img
                          src="/110.png"
                          alt=""
                          class="rounded-circle"
                          lazy-src={encodeURI(
                            item.cover ||
                              item.imageUrl ||
                              item.image ||
                              "/110.png"
                          )}
                          loading="lazy"
                        />
                      </div>
                      <span class="star-name">
                        {item.title || item.localName || ""}
                      </span>
                    </div>
                  </app-link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieStar;
