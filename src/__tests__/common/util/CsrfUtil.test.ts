import { getCsrfCookieValueFromCookies } from "../../../views/common/util/CsrfUtil";

test("Attendu: getCsrfCookieValue fonctionne correctement", () => {
  let cookies =
    "ppkcookie1=testcookie; expires=Sun, 28 Feb 2010 00:00:00 UTC; path=/; csrf_token=aze";
  expect(getCsrfCookieValueFromCookies(cookies)).toBe("aze");

  cookies = "csrf_token=aze";
  expect(getCsrfCookieValueFromCookies(cookies)).toBe("aze");

  cookies = "csrf_token=aze; test=test";
  expect(getCsrfCookieValueFromCookies(cookies)).toBe("aze");

  cookies = "csrf_token=aze;test=test";
  expect(getCsrfCookieValueFromCookies(cookies)).toBe("aze");

  cookies = undefined!;
  expect(getCsrfCookieValueFromCookies(cookies)).toBe("");
});
