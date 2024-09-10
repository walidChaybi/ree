import { render, screen, waitFor } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { ToastContainer } from "react-toastify";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_LOG_SERVEUR)
  ).toBeTruthy();
});

test("renders error msg", () => {
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
  waitFor(() => {
    expect(screen.getByText(/testmessageUtilisateur/)).toBeDefined();
  });

  logError({
    messageUtilisateur: "Message à l'utilisateur",
    error: {
      message:
        '{"errors": [{"type": "BusinessException","code": "FCT_16031","message": "Message du serveur"}]}'
    },
    errorInfo: "testerrorInfo (console.error LogManager)"
  });
  waitFor(() => {
    expect(screen.getByText(/Message à l'utilisateur/)).toBeDefined();
    expect(screen.getByText(/Message du serveur/)).toBeDefined();
  });

  storeRece.logErrorOff = false;
});
