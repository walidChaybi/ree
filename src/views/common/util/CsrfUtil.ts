import { HttpRequestHeader } from "@api/ApiManager";
const CSRF_COOKIE_NAME = "csrf_token";
export const CSRF_HEADER_NAME = "X-Csrf-Token";

export const getCsrfCookieValue = () => {
  return getCsrfCookieValueFromCookies(document.cookie);
};

const getCsrfCookieValueFromCookies = (cookies: string) => {
  let value = "";
  if (cookies) {
    const csrfCookie = cookies.split(";").find(row => row.trim().startsWith(CSRF_COOKIE_NAME));
    if (csrfCookie) {
      const parts = csrfCookie.split("=");
      if (parts.length > 1) {
        value = parts[1];
      }
    }
  }
  return value;
};

export const getCsrfHeader = (): HttpRequestHeader => {
  return {
    header: CSRF_HEADER_NAME,
    value: getCsrfCookieValue()
  };
};
