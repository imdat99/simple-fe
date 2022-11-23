import { Method } from "axios";

export interface IQuery {
  method: Method;
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
}
