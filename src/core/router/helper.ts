export function buildQueryString(object: Record<string, any>) {
  if (typeof object !== "object") return "";
  const args: any[] = [];
  for (const key in object) {
    destructure(key, object[key]);
  }
  return "?" + args.join("&");

  function destructure(key: string, value: any) {
    if (key && (value || value === false || value === 0)) {
      if (typeof value === "object" && value !== null) {
        for (const i in value) {
          destructure(key + "[" + i + "]", value[i]);
        }
      } else {
        if (Array.isArray(value)) {
          if (value.length) {
            args.push(
              encodeURIComponent(key) +
                (value != null && value !== undefined
                  ? "=" + value.toString()
                  : "")
            );
          }
        } else {
          args.push(
            encodeURIComponent(key) +
              (value != null && value !== "" && value !== undefined
                ? "=" + encodeURIComponent(value)
                : "")
          );
        }
      }
    }
  }
}

export const parseParams = (querystring: string) => {
  const params = new URLSearchParams(querystring);
  const obj: Record<string, any> = {};
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      if (params.get(key) !== "undefined") {
        obj[key] = params.getAll(key);
      }
    } else {
      if (params.get(key) !== "undefined") {
        obj[key] = params.get(key);
      }
      if (typeof params.get(key) === "boolean") {
        obj[key] = params.get(key);
      }
      if (params.get(key) === "false" || params.get(key) === "true") {
        obj[key] = JSON.parse(params.get(key) as any);
      }
    }
  }
  return obj;
};
