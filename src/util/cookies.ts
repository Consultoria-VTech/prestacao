import Cookie, { CookieAttributes } from 'js-cookie'

const configCookie: CookieAttributes = {
  // domain: process.env.COOKIE_DOMAIN,
  // path: '/vtech',
}

export const set = (
  key: string,
  value: string | object,
  options = configCookie
): string | undefined => {
  return Cookie.set(key, value, options)
}

export const get = (key: string): string | undefined => {
  return Cookie.get(key)
}

export const remove = (key: string, options = configCookie): void => {
  Cookie.remove(key, options)
}

export const AppCookies = {
  set,
  get,
  remove,
}
