import { Method } from "axios";

export interface IQuery {
  method?: Method;
  url: string;
  params?: Record<string, any>;
  data?: Record<string, unknown>;
}
