import "@app/view/components/appLink";
import { AppElement } from "@core/appelement";
import { define } from "@core/decorator";
import { h } from "@core/render";
import { Node } from "@core/type";
import { anchor } from "../anchor";

@define("app-toast")
export class AppToast extends AppElement {
  constructor() {
    super();
  }

  view() {
    const { title, content, type = "primary" } = this.props || {};
    return (
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div
          class="toast fade show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class={`toast-header bg-${type} text-white`}>
            <strong class="me-auto">{title || "Thông báo"}</strong>
            <small class="text-white">Bây giờ</small>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              on={{
                click: () => {
                  this.remove();
                },
              }}
            ></button>
          </div>
          <div class="toast-body text-black">{content || ""}</div>
        </div>
      </div>
    );
  }
}

const appToast = new AppToast();

export const toast = (props: {
  title: Node;
  content: Node;
  type?: "primary" | "success" | "danger";
}) => {
  appToast.props = props;
  anchor.appendChild(appToast);
  setTimeout(() => {
    appToast?.remove();
  }, 3000);
};
