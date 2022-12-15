import { toast } from "@app/view/components/toast";
import { BASE_URL, LINK_REGEX } from "../constant";
import { IQuery } from "../types";

const myHeaders = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json; charset=utf-8",
});
class Client {
  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }
  private baseUrl: string;
  private _worker(
    method: string,
    url: string,
    params?: Record<string, any>,
    data?: Record<string, any>
  ) {
    const isPath = !new RegExp(LINK_REGEX).test(url);
    const reqUrl = new URL(isPath ? this.baseUrl + url : url);
    Object.entries(params || {}).forEach(([k, v]) => {
      reqUrl.searchParams.append(k, String(v));
    });
    return new Request(reqUrl, {
      method,
      headers: myHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify(data),
    });
  }

  public async get<R = any>(
    url: string,
    params?: Record<string, any>
  ): Promise<R> {
    return (await fetch(this._worker("GET", url, params))
      .then((response) => response.json())
      .catch((e) => {
        toast({ title: "lỗi", content: e.message, type: "danger" });
      })) as R;
  }

  public async post<T extends Record<string, any> = any, R = any>(
    url: string,
    data: T
  ): Promise<R> {
    return (await fetch(this._worker("POST", url, undefined, data))
      .then((response) => response.json())
      .catch((e) => {
        toast({ title: "lỗi", content: e.message, type: "danger" });
      })) as R;
  }
}

const client = new Client({
  baseUrl: BASE_URL,
});
const appClient = {
  get: client.get.bind(client),
  post: client.post.bind(client),
};

export function appQuery(this: any, { url, params }: IQuery) {
  this.data.loading = true;
  client
    .get(url, params)
    .then((res) => {
      this.data.resData = res.data.list;
    })
    .finally(() => {
      this.data.loading = false;
    });
}

export default appClient;
