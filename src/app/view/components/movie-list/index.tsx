import { h, memo } from "@core/index";
import "./style.scss";
const ListMovie = memo(({ props }: { props: any }) => {
  return (
    <div class="movie-list">
      <div class="row">
        {props?.map((item: any) => {
          return (
            <div class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl.20">
              <app-link
                to={`/movie/${item.id || item.contentId}c${
                  item.category || ""
                }`}
              >
                <div class="poster-container">
                  <div class="poster-img">
                    <img
                      src="/110.png"
                      alt=""
                      class="rounded"
                      lazy-src={encodeURI(
                        item.cover ||
                          item.imageUrl ||
                          item?.coverHorizontalUrl ||
                          item?.image ||
                          "/110.png"
                      )}
                      loading="lazy"
                    />
                  </div>
                  <span class="poster-name">
                    {item.title || item?.name || "unknown"}
                  </span>
                </div>
              </app-link>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ListMovie;
