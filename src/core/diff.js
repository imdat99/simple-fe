import render from ".";
import { deepCompare } from "./compareattr";

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.max(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};
const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];
  const isCompare = deepCompare(oldAttrs, newAttrs);

  // for (const [evnetNew, eventOld] of zip(
  //   Object.entries(newAttrs?.on || {}).map(([k, v]) => ({ [k]: v })),
  //   Object.entries(oldAttrs?.on || {}).map(([k, v]) => ({ [k]: v }))
  // )) {
  //   const [kNew, vNew] = evnetNew ? Object.entries(evnetNew)[0] : [];
  //   const [kOld, vOld] = eventOld ? Object.entries(eventOld)[0] : [];
  //   if (
  //     (typeof vNew !== "function" || typeof vOld !== "function") &&
  //     kNew === kOld
  //     ) {

  //     if (typeof vNew !== "function" && typeof vOld !== "function") {
  //       patches.push(($node) => {
  //         $node.removeEventListener(kNew, oldFn, false);
  //         return $node;
  //       });
  //     } else {
  //       oldFn = vNew
  //       patches.push(($node) => {
  //         $node.addEventListener(kNew, oldFn, false);
  //         return $node;
  //       });
  //     }
  //   }
  // }
  // }

  // event
  if (!isCompare) {
    // set new attributes
    for (const [k, v] of Object.entries(newAttrs)) {
      patches.push(($node) => {
        if (k === "on") {
        } else {
          $node.setAttribute(k, v);
        }
        return $node;
      });
    }

    // remove old attributes
    for (const k in oldAttrs) {
      if (!(k in newAttrs)) {
        patches.push(($node) => {
          $node.removeAttribute(k);
          return $node;
        });
      }
    }
  }
  return ($node) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

const diffChildren = (oldVChildren, newVChildren) => {
  // console.log("oldVChildren", oldVChildren)
  const childPatches = [];
  oldVChildren.forEach((oldVChild, i) => {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  });

  const additionalPatches = [];
  for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
    additionalPatches.push(($node) => {
      $node.appendChild(render(additionalVChild));
      return $node;
    });
  }
  return ($parent) => {
    for (const [patch, child] of zip(childPatches, $parent.childNodes)) {
      patch(child);
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

export const diff = (vOldNode, vNewNode) => {
  if (vNewNode === undefined) {
    return ($node) => {
      $node.remove();
      return undefined;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node) => {
        const $newNode = render(vNewNode);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return () => undefined;
    }
  }

  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node) => {
      const $newNode = render(vNewNode);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};
