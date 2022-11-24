import { deepCompare } from "./compareattr";
import { render } from "./render";
import { AdditionalPatch, Attrs, ChildPatch, VChild, VNode } from "./type";

const zip = (
  xs: any[] | NodeListOf<ChildNode>,
  ys: any[] | NodeListOf<ChildNode>
) => {
  const zipped = [];
  for (let i = 0; i < Math.max(xs?.length, ys?.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};
const diffAttrs = (oldAttrs: Attrs, newAttrs: Attrs) => {
  const patches: AdditionalPatch[] = [];
  const isCompare = deepCompare(oldAttrs, newAttrs);

  if (!isCompare) {
    // set new attributes
    for (const [k, v] of Object.entries(newAttrs)) {
      patches.push(($node: HTMLElement) => {
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
  return ($node: HTMLElement) => {
    for (const patch of patches) {
      patch($node);
    }
  };
};

const diffChildren = (oldVChildren: VChild[], newVChildren: VChild[]) => {
  // console.log("oldVChildren", oldVChildren)
  const childPatches: ChildPatch[] = [];
  oldVChildren?.forEach((oldVChild, i) => {
    childPatches.push(
      diff(oldVChild as VNode, newVChildren[i] as VNode) as ChildPatch
    );
  });

  const additionalPatches: AdditionalPatch[] = [];
  if(newVChildren) {
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
      additionalPatches.push(($node: HTMLElement) => {
        $node.appendChild(render(additionalVChild as VNode));
        return $node;
      });
    }
  }
  return ($parent: HTMLElement) => {
    for (const [patch, child] of zip(childPatches, $parent?.childNodes)) {
      try {
        patch(child);
      } catch {
        console.log(zip(childPatches, $parent?.childNodes))
      }
    }

    for (const patch of additionalPatches) {
      patch($parent);
    }

    return $parent;
  };
};

export const diff = (vOldNode: VNode, vNewNode: VNode) => {
  if (vNewNode === undefined) {
    return ($node: HTMLElement) => {
      $node.remove();
      return $node;
    };
  }

  if (typeof vOldNode === "string" || typeof vNewNode === "string") {
    if (vOldNode !== vNewNode) {
      return ($node: HTMLElement) => {
        const $newNode = render(vNewNode);
          $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return () => undefined;
    }
  }

  if (vOldNode?.tagName !== vNewNode?.tagName) {
    return ($node: HTMLElement) => {
      const $newNode = render(vNewNode);
      $node?.replaceWith($newNode);
      return $newNode;
    };
  }

  const patchAttrs = diffAttrs(vOldNode?.attrs, vNewNode?.attrs);
  const patchChildren = diffChildren(vOldNode?.children, vNewNode?.children);

  return ($node: HTMLElement) => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};
