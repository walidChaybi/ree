import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { logError } from "../../../views/common/util/LogManager";
import { ToastContainer } from "react-toastify";
import { FeatureFlag } from "../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../views/common/util/featureFlag/gestionnaireFeatureFlag";

beforeAll(() => {
  const localStorageMock = (function () {
    let store: any = { featureFlag: "LOG_SERVEUR" };
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
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)
  ).toBeTruthy();
});

test("renders error msg", async () => {
  render(
    <div>
      <ToastContainer
        className={"toast-container"}
        position="top-center"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
      />
    </div>
  );
  logError({
    messageUtilisateur: "testmessageUtilisateur",
    error: "testeerror",
    errorInfo: "testerrorInfo"
  });
  await waitFor(() => {
    expect(screen.getByText(/testmessageUtilisateur/)).toBeDefined();
  });
});
