import { jumpLink } from "@app/utils/helper";
import { AppElement, define, h, memo } from "@core/index";
import "./style.scss";

@define("app-banner")
class AppBanner extends AppElement {
  constructor() {
    super();
  }

  connected() {
    this.appCarousel("init");
  }

  disconnected() {
    this.appCarousel("");
  }
  appCarousel(type: string) {
    const carousel = this.querySelector(".carousel-inner");
    let lastActive = 0;
    const activeItem = (index: number) => {
      (carousel?.childNodes[lastActive] as HTMLElement).classList.remove(
        "active"
      );
      (carousel?.childNodes[index] as HTMLElement).classList.add("active");
      lastActive = index;
    };
    activeItem(0);
    const activeNext = () => {
      if (lastActive == carousel?.childNodes.length! - 1) {
        activeItem(0);
      } else {
        activeItem(lastActive + 1);
      }
    };
    this.querySelector(".carousel-control-prev")!.addEventListener(
      "click",
      () => {
        if (lastActive === 0) {
          activeItem(carousel?.childNodes.length! - 1);
        } else {
          activeItem(lastActive - 1);
        }
      }
    );
    this.querySelector(".carousel-control-next")!.addEventListener(
      "click",
      activeNext
    );
    const autoSlide = setInterval(() => {
      activeNext();
    }, 10000);
    if (type !== "init") {
      clearInterval(autoSlide);
    }
  }
  view() {
    return (
      <div class="carousel-content">
        <div class="carousel slide">
          <div class="carousel-inner">
            {this.props.map((item: any) => (
              <div class="carousel-item fade-in">
                <app-link to={`/movie/${jumpLink(item)}`}>
                  <p>
                    <div class="banner-img position-relative">
                      <img
                        src={item?.imageUrl || ""}
                        class="position-absolute"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-caption d-none d-md-block ">
                      <h5 class="h4">{item?.title}</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </p>
                </app-link>
              </div>
            ))}
          </div>
          <button class="carousel-control-prev" type="button">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
}

const Banner = memo((props: any) => {
  const comp = new AppBanner();
  comp.props = props;
  return comp;
});

export default Banner;
