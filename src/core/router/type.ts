import { AppElement } from "..";

export type VRouteHandle = (p?: string[]) => void;

export interface VRoute {
  name?: string;
  path: string;
  redirectTo?: string;
  component?: () => Promise<any> | AppElement;
}
export interface VRouter {
  mode: "history" | "hash";
  root: string;
  notFound: VRouteHandle;
}
