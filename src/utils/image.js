export const imgPath = (path, defaultImg) =>
  path ? /^(https?:\/|data:image)\//ig.test(path) ? path : IMG_PATH_PREFIX + path : defaultImg
