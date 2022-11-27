export const zip = (
  xs: any[] | NodeListOf<ChildNode>,
  ys: any[] | NodeListOf<ChildNode>
) => {
  const zipped = [];
  for (let i = 0; i < Math.max(xs?.length, ys?.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};

export function deepCompare(..._Args: (Record<string, unknown> | any[])[]) {
  let i: any, l: any, leftChain: any, rightChain: any;

  function compare2Objects(x: any, y: any) {
    let p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      // console.log('a')
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      // console.log('b')
      return false;
    }

    if (x.constructor !== y.constructor) {
      // console.log('c')
      return false;
    }

    if (x.prototype !== y.prototype) {
      // console.log('d')
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      // console.log('e')
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        // console.log('f')
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        // console.log('g')
        // return {key: p, new: y[p], old: x[p]}
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        // console.log('h')
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        // console.log('j')
        return false;
      }

      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            // console.log('k')
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            // console.log('l')
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
}

export function memo(fun: Function) {
  let cache: any;
  let cachefn: any;
  return function (n: any) {
    if (deepCompare(n, cache)) {
      return cachefn;
    } else {
      const result = fun(n);
      cache = n;
      cachefn = result;
      return result;
    }
  };
}
