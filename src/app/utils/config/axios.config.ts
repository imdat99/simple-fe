import axios from "axios";
import { BASE_URL } from "../constant";
import { IQuery } from "../types";

const headers = {
  crossDomain: true,
  Accept: "application/json; charset=utf-8",
  contentType: "application/json",
};

export const Client = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
  headers,
});

export default function appQuery(
  this: any,
  { method, url, params, data }: IQuery
) {
  this.data.loading = true;
  Client({ method, url, params, data })
    .then((res) => {
      this.data.resData = res.data;
    })
    // .catch((e) => {
    //   console.log(e);
    // })
    .finally(() => {
      this.data.loading = false;
    });
}

// export default Client;
