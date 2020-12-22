import { gestionnaireFeatureFlag } from "../../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { FeatureFlag } from "../../../../views/common/util/featureFlag/FeatureFlag";

test("gestion feature flag works ", async () => {
  const localStorageMock = (function () {
    let store: any = { featureFlag: "ETAPE2" };
    return {
      getItem: function (key: string) {
        return store[key];
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key: string) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2)).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif("ETAPE3")).toBeFalsy();
});
