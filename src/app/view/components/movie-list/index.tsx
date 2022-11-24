import { h, memo } from "@core/index";
import "./style.scss";
const ListMovie = memo((props: any) => {
  console.log(props);
  return (
    <div class="title-list">
      <div class="row">
        {props?.map((item: any) => {
          return (
            <div class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl.20">
              <div class="poster-container">
                <div class="poster-img">
                  <img src={item.cover || "/110.png"} alt="" class="rounded" />
                </div>
                <span class="poster-name">{item.title || "unknown"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ListMovie;
