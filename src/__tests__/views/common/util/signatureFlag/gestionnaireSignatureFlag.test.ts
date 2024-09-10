import { gestionnaireSignatureFlag } from "@util/signatureFlag/gestionnaireSignatureFlag";
import { expect, test } from "vitest";

test("gestion signature flag works ", async () => {
  const localStorageMock = (function () {
    let store: any = { signatureFlag: "DRY_RUN" };
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
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true
  });
  expect(gestionnaireSignatureFlag.getModeSignature()).toBe("DRY_RUN");
});
