const JUMP_REGEXP = /\/detail(.*)/;
export const jumpLink = (item?: any) => {
  const patern = ["?id=%s", "type=%s"];
  const {
    jumpAddress,
    contentId,
    domainType,
    starId,
    id,
    category,
    title,
    name,
    localName,
  } = item;

  const createSlug = () => {
    return (
      title ||
      name ||
      localName ||
      (Math.random() + 1).toString(36).substring(7)
    )
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };
  const createId = () => {
    if (JUMP_REGEXP.test(jumpAddress)) {
      return JUMP_REGEXP.exec(jumpAddress)![1];
    }
    if (contentId || id) {
      return [
        patern[0].replace(/%s/g, contentId || id),
        domainType || category
          ? patern[1].replace(/%s/g, domainType || category)
          : "",
      ].join("&");
    }
    if (starId) {
      return patern[0].replace(/%s/g, starId);
    }
    return "";
  };
  return createSlug() + createId();
};
