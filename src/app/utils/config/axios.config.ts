import axios from "axios";
import { BASE_URL } from "../constant";

const headers = {
  crossDomain: true,
  Accept: "application/json; charset=utf-8",
  contentType: "application/json",
};

const Client = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
  headers,
});

export default Client;
