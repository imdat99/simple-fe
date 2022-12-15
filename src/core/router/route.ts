import { VRouteHandle } from "./type";

const createRule = (path: string) => {
  const rule = path
    .replace(/([\\\/\-\_\.])/g, "\\$1")
    .replace(/\{[a-zA-Z]+\}/g, "(:any)")
    .replace(/\:any/g, "[\\w\\-\\_\\.]+")
    .replace(/\:word/g, "[a-zA-Z]+")
    .replace(/\:num/g, "\\d+");
  return new RegExp("^" + rule + "$", "i");
};

export class VRoute {
  constructor(name: string, path: string, handler: VRouteHandle) {
    this.name = name;
    this.path = path;
    this.rule = createRule(path);
    this.handler = handler;
  }

  name: string;
  path: string;
  rule: RegExp;
  handler: VRouteHandle;
}
