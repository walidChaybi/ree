import {
  URL_MES_REQUETES_ID,
  URL_MES_REQUETES
} from "../../../../views/router/ReceUrls";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";

test("Attendu: getUrlWithParam fonctionne correctement", () => {
  expect(getUrlWithParam(URL_MES_REQUETES_ID, String(123456))).toBe(
    `${URL_MES_REQUETES}/apercurequete/123456`
  );
  expect(getUrlWithParam(URL_MES_REQUETES, String(123456))).toBe(
    `${URL_MES_REQUETES}`
  );
});
