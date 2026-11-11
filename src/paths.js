const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}` || "/";
}

export function withoutBase(pathname = "/") {
  if (base && pathname.startsWith(`${base}/`)) {
    return pathname.slice(base.length) || "/";
  }
  if (base && pathname === base) return "/";
  return pathname || "/";
}
