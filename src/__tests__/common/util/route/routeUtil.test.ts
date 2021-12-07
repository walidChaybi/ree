import {
  cleanUrl,
  getLastPathElem,
  getUrlWithoutIdParam,
  getUrlWithParam,
  isLastPathElemIsId,
  isPathElemId
} from "../../../../views/common/util/route/routeUtil";
import {
  URL_MES_REQUETES,
  URL_MES_REQUETES_APERCU_REQUETE_ID
} from "../../../../views/router/ReceUrls";

test("Attendu: getUrlWithParam fonctionne correctement", () => {
  expect(
    getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE_ID, String(123456))
  ).toBe(`${URL_MES_REQUETES}/apercurequete/123456`);
  expect(getUrlWithParam(URL_MES_REQUETES, String(123456))).toBe(
    `${URL_MES_REQUETES}`
  );
});

const urlWitIdOk =
  "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623";

test("Attendu: getUrlWithoutParam fonctionne correctement", () => {
  expect(getUrlWithoutIdParam(urlWitIdOk)).toBe(
    "/rece/rece-ui/mesrequetes/apercurequete"
  );

  expect(
    getUrlWithoutIdParam(
      "/rece/rece-ui/mesrequetes/apercurequete//a8c57b94-b623-4e79-b3a4-08cdf0447623"
    )
  ).toBe("/rece/rece-ui/mesrequetes/apercurequete");

  expect(
    getUrlWithoutIdParam(
      "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBe("/rece/rece-ui/mesrequetes/apercurequete");
});

test("Attendu: getLastPathElem fonctionne correctement", () => {
  expect(getLastPathElem("/rece/rece-ui/mesrequetes/apercurequete")).toBe(
    "apercurequete"
  );
  expect(getLastPathElem("/rece/rece-ui/mesrequetes/apercurequete/")).toBe(
    "apercurequete"
  );
});

test("Attendu: cleanUrl fonctionne correctement", () => {
  expect(cleanUrl(urlWitIdOk)).toBe(urlWitIdOk);

  expect(
    cleanUrl(
      "/rece/rece-ui/mesrequetes/apercurequete//a8c57b94-b623-4e79-b3a4-08cdf0447623"
    )
  ).toBe(urlWitIdOk);

  expect(
    cleanUrl(
      "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBe(urlWitIdOk);
});

test("Attendu: isLastPathElemIsId fonctionne correctement", () => {
  expect(
    isLastPathElemIsId(
      "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623/"
    )
  ).toBeTruthy();

  expect(isLastPathElemIsId("/rece/rece-ui/mesrequetes")).toBeFalsy();
});

test("Attendu: isPathElemId fonctionne correctement", () => {
  expect(isPathElemId("123")).toBeTruthy();
  expect(isPathElemId("a8c57b94-b623-4e79-b3a4-08cdf0447623")).toBeTruthy();
  expect(isPathElemId("mesrequetes")).toBeFalsy();
});
