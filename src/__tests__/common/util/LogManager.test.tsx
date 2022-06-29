import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import { FeatureFlag } from "../../../views/common/util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { logError } from "../../../views/common/util/LogManager";
import { storeRece } from "../../../views/common/util/storeRece";

beforeEach(() => {
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.LOG_SERVEUR)
  ).toBeTruthy();
});

test("renders error msg", async () => {
  // Désactivation de la log car l'erreur loguée est normale
  storeRece.logErrorOff = true;
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
    error: "testeerror (console.error LogManager)",
    errorInfo: "testerrorInfo (console.error LogManager)"
  });
  await waitFor(() => {
    expect(screen.getByText(/testmessageUtilisateur/)).toBeDefined();
  });
  storeRece.logErrorOff = false;
});
