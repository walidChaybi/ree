import { FeatureFlag } from "../../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../../views/common/util/featureFlag/gestionnaireFeatureFlag";

export const localStorageFeatureFlagMock = (function () {
  let store: any = { featureFlag: "ETAPE2_BIS" };
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

test("gestion feature flag works ", async () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageFeatureFlagMock
  });
  expect(gestionnaireFeatureFlag.estActif(FeatureFlag.ETAPE2_BIS)).toBeTruthy();
  expect(gestionnaireFeatureFlag.estActif("ETAPE3")).toBeFalsy();
});
