import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import {
  cleanUrl,
  getLastPathElem,
  getUrlWithoutIdParam,
  getUrlWithParam,
  isLastPathElemIsId,
  isPathElemId
} from "@util/route/UrlUtil";

test("Attendu: getUrlWithParam fonctionne correctement", () => {
  expect(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
      String(123456)
    )
  ).toBe(`${URL_MES_REQUETES_DELIVRANCE}/apercurequetedelivrance/123456`);
  expect(getUrlWithParam(URL_MES_REQUETES_DELIVRANCE, String(123456))).toBe(
    `${URL_MES_REQUETES_DELIVRANCE}`
  );
});

const urlWitIdOk =
  "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623";

test("Attendu: getUrlWithoutParam fonctionne correctement", () => {
  expect(getUrlWithoutIdParam(urlWitIdOk)).toBe(
    "/rece/rece-ui/mesrequetes/apercurequetedelivrance"
  );

  expect(
    getUrlWithoutIdParam(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance//a8c57b94-b623-4e79-b3a4-08cdf0447623"
    )
  ).toBe("/rece/rece-ui/mesrequetes/apercurequetedelivrance");

  expect(
    getUrlWithoutIdParam(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBe("/rece/rece-ui/mesrequetes/apercurequetedelivrance");
});

test("Attendu: getLastPathElem fonctionne correctement", () => {
  expect(
    getLastPathElem("/rece/rece-ui/mesrequetes/apercurequetedelivrance")
  ).toBe("apercurequetedelivrance");
  expect(
    getLastPathElem("/rece/rece-ui/mesrequetes/apercurequetedelivrance/")
  ).toBe("apercurequetedelivrance");
});

test("Attendu: cleanUrl fonctionne correctement", () => {
  expect(cleanUrl(urlWitIdOk)).toBe(urlWitIdOk);

  expect(
    cleanUrl(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance//a8c57b94-b623-4e79-b3a4-08cdf0447623"
    )
  ).toBe(urlWitIdOk);

  expect(
    cleanUrl(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBe(urlWitIdOk);
});

test("Attendu: isLastPathElemIsId fonctionne correctement", () => {
  expect(
    isLastPathElemIsId(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBeTruthy();

  expect(isLastPathElemIsId("/rece/rece-ui/mesrequetes")).toBeFalsy();
});

test("Attendu: isPathElemId fonctionne correctement", () => {
  expect(isPathElemId("123")).toBeTruthy();
  expect(isPathElemId("a8c57b94-b623-4e79-b3a4-08cdf0447623")).toBeTruthy();
  expect(isPathElemId("mesrequetes")).toBeFalsy();
});
