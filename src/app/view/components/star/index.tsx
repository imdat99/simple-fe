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
    let isInView = false;
    const isInViewport = () => {
      const rect = product[product.length - 1].getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || this.clientHeight) &&
        rect.right <= (window.innerWidth || this.clientWidth)
      );
    };

    const right_mover = () => {
      if (!isInView) {
        l = l + movePer;
        if (product.length == 1) {
          l = 0;
        }
        for (const i of product as any) {
          (i as any).style.left = "-" + l + "%";
        }
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
      isInView = isInViewport();
      right_mover();
    };
    span[0].onclick = () => {
      left_mover();
      isInView = isInViewport();
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
