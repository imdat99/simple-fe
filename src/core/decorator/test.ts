// import { CustomElement } from "@core/type";

export function Watch(...args: string[]) {
  // console.log(args);
  return function (
    target: any,
    propertyKey: string,
    descriptior: PropertyDescriptor
  ) {
    // const value = descriptior.value;
    args.forEach((item) => {
      console.log(target._changePropCallbacks, item);
    });
    console.log("target", target);
    console.log("descriptior", descriptior);
    console.log("propertyKey", propertyKey);
  };
}
