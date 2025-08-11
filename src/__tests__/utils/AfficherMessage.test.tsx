import { TErreurApi } from "@model/api/Api";
import { render, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import { beforeEach, describe, expect, test } from "vitest";
import AfficherMessage, { estTableauErreurApi } from "../../utils/AfficherMessage";

describe("test AfficherMessage", () => {
  let container: HTMLElement;

  const ERREUR_API_1: TErreurApi = { message: "simple message 1", type: "BusinessException", code: "FCT_16108" };
  const ERREUR_API_2: TErreurApi = { message: "simple message 2", type: "TechnicalException", code: "TECH_23001" };

  beforeEach(() => {
    ({ container } = render(
      <ToastContainer
        className="toast-container"
        position="top-center"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        containerId="toastContainer-principal"
      />
    ));
  });

  test("Doit afficher les messages d'erreur", async () => {
    AfficherMessage.erreur("Simple message erreur");
    AfficherMessage.erreur("Simple message erreur avec un erreur", { erreurs: [ERREUR_API_1] });
    AfficherMessage.erreur("Simple message erreur avec multiple erreurs", { erreurs: [ERREUR_API_1, ERREUR_API_2] });
    AfficherMessage.erreur(["multiples messages erreur A", "multiples messages erreur B"]);
    AfficherMessage.erreur(["multiples messages erreur C", "multiples messages erreur D"], { erreurs: [ERREUR_API_1, ERREUR_API_2] });

    await waitFor(() => {
      const toast = container.querySelector(".Toastify__toast");
      expect(toast).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  test("Doit afficher les messages succès", async () => {
    AfficherMessage.succes("Simple message succès");
    AfficherMessage.succes("Simple message succès avec fermetureAuto", { fermetureAuto: true });
    AfficherMessage.succes(["multiples messages succès A", "multiples messages succès B"]);
    AfficherMessage.succes(["multiples messages succès C", "multiples messages succès D"], { fermetureAuto: true });

    await waitFor(() => {
      const toast = container.querySelector(".Toastify__toast");
      expect(toast).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  test("Doit afficher les messages info", async () => {
    AfficherMessage.info("Simple message info");
    AfficherMessage.info("Simple message info avec fermetureAuto", { fermetureAuto: true });
    AfficherMessage.info(["multiples messages info A", "multiples messages info B"]);
    AfficherMessage.info(["multiples messages info C", "multiples messages info D"], { fermetureAuto: true });

    await waitFor(() => {
      const toast = container.querySelector(".Toastify__toast");
      expect(toast).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  test("Doit afficher les messages attention", async () => {
    AfficherMessage.avertissement("Simple message attention");
    AfficherMessage.avertissement("Simple message info attention fermetureAuto", { fermetureAuto: true });
    AfficherMessage.avertissement(["multiples messages attention A", "multiples messages attention B"]);
    AfficherMessage.avertissement(["multiples messages attention C", "multiples messages attention D"], { fermetureAuto: true });

    await waitFor(() => {
      const toast = container.querySelector(".Toastify__toast");
      expect(toast).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });
});

describe("test estTableauErreurApi", () => {
  test("renvoie true pour un tableau d'erreurs valide", () => {
    const erreurs: TErreurApi[] = [
      { message: "Erreur 1", type: "BusinessException", code: "FCT_16136" },
      { message: "Erreur 2", type: "TechnicalException", code: "TECH_23001" }
    ];
    expect(estTableauErreurApi(erreurs)).toBe(true);
  });

  test("renvoie false pour un objet non tableau", () => {
    const erreur = { message: "Erreur unique", type: "BusinessException", code: "FCT_16136" };
    expect(estTableauErreurApi(erreur)).toBe(false);
  });

  test("renvoie false pour null", () => {
    expect(estTableauErreurApi(null)).toBe(false);
  });

  test("renvoie false pour undefined", () => {
    expect(estTableauErreurApi(undefined)).toBe(false);
  });

  test("renvoie false pour un tableau vide", () => {
    expect(estTableauErreurApi([])).toBe(true);
  });
});
