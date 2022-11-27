export const APP_NAME = "Vanilla movie";
export const LINK_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/gi;
export const CHECK_BROWSER = "IntersectionObserver" in window;
export const ID_REGEX = /id=([^&]*)/;
export const QUALITY_TYPE = {
  GROOT_HD: "1080P",
  GROOT_SD: "720P",
  GROOT_LD: "540P",
  GROOT_FD: "360P",
};
