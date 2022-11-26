import { BASE_URL, LINK_REGEX } from "../constant";
import { IQuery } from "../types";

const myHeaders = new Headers({
  'Content-Type': 'application/json',
  'Accept': "application/json; charset=utf-8",
});
class Client {
  constructor({baseUrl}: {baseUrl: string}) {
    this.baseUrl = baseUrl;
  }
  private baseUrl: string
  private _worker (method: string, url: string, data?: Record<string, any>) {
    const isPath =  !new RegExp(LINK_REGEX).test(url)
    url =  isPath ?  this.baseUrl + url : url;
    console.log("fetchurl", url)
    return new Request(url, {
      method,
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(data)
    });
  }

  public async get<R = any>(url: string): Promise<R> {
      return await fetch(this._worker('GET', url)).then(response => response.json()) as R
  }

  public async post<T extends Record<string, any> = any, R = any>(url: string, data: T): Promise<R> {
    return await fetch(this._worker('POST', url, data)).then(response => response.json()) as R
  }
}

const client = new Client({
  baseUrl: BASE_URL
})
const appClient = {
  get: client.get.bind(client),
  post: client.post.bind(client),
}

export function appQuery(
  this: any,
  { url, params, data }: IQuery
) {
  this.data.loading = true;
  client.get(url)
    .then((res) => {
      console.log(res)
    })
    // .catch((e) => {
    //   console.log(e);
    // })
    .finally(() => {
      this.data.loading = false;
    });
}

export default appClient