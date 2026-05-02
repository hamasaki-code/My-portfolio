export const SITE_URL = "https://taishi-hamasaki-portfolio.vercel.app";

export const toSiteUrl = (path = "") => {
  if (!path || path === "/") {
    return SITE_URL;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
