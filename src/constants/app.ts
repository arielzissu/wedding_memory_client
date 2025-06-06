export const isIOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);

export const TAB_TO_PATH = {
  my_photo: "/my-photo",
  gallery: "/gallery",
  people: "/people",
  admin: "/admin",
};

export const PATH_TO_TAB = {
  [TAB_TO_PATH.my_photo]: "my_photo",
  [TAB_TO_PATH.gallery]: "gallery",
  [TAB_TO_PATH.people]: "people",
  [TAB_TO_PATH.admin]: "admin",
};
