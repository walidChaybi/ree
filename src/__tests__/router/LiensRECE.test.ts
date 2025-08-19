import { describe, expect, test } from "vitest";
import LiensRECE from "../../router/LiensRECE";
import { FIN_URL_CONSULTATION, URL_ACCUEIL } from "../../router/infoPages/InfoPagesBase";
import {
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION,
  INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE
} from "../../router/infoPages/InfoPagesEspaceDelivrance";

describe("Test du helper LiensRECE", () => {
  test("generation de liens", () => {
    expect(LiensRECE.genererLien("")).toBe(`${URL_ACCUEIL}`);
    expect(LiensRECE.genererLien("test")).toBe(`${URL_ACCUEIL}test`);
    expect(LiensRECE.genererLien("/test")).toBe(`${URL_ACCUEIL}test`);
    expect(LiensRECE.genererLien(`${URL_ACCUEIL}test`)).toBe(`${URL_ACCUEIL}test`);
    expect(LiensRECE.genererLien("/:testParam", { testParam: "test" })).toBe(`${URL_ACCUEIL}test`);
    expect(LiensRECE.genererLien("/:testParam", { testParam: "" })).toBe(`${URL_ACCUEIL}`);
  });

  test("Retour arrière", () => {
    const base = window.history;
    const changerHistory = (idx: number | null) =>
      Object.defineProperty(window, "history", {
        writable: true,
        value: {
          state: { idx }
        }
      });

    changerHistory(null);
    expect(LiensRECE.retourArriere()).toBe(URL_ACCUEIL);

    changerHistory(0);
    expect(LiensRECE.retourArriere()).toBe(URL_ACCUEIL);

    changerHistory(1);
    expect(LiensRECE.retourArriere()).toBe(-1);

    window.history = base;
  });

  test("vérification page consultation", () => {
    const changerPathname = (pathname: string) =>
      Object.defineProperty(window, "location", {
        writable: true,
        value: {
          pathname
        }
      });

    changerPathname("/test");
    expect(LiensRECE.estPageConsultation()).toBeFalsy();

    changerPathname(`/test/${FIN_URL_CONSULTATION}`);
    expect(LiensRECE.estPageConsultation()).toBeTruthy();
  });

  test("Comparaison des URL", () => {
    expect(
      LiensRECE.sontUrlDeLaMemePage(
        INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE,
        "/espace-delivrance/requete/79618e9e-0650-4e76-b326-bb4425c9d6cc/prise-en-charge"
      )
    ).toBeTruthy();

    expect(
      LiensRECE.sontUrlDeLaMemePage(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE, "/espace-delivrance/requete//prise-en-charge")
    ).toBeTruthy();

    expect(
      LiensRECE.sontUrlDeLaMemePage(
        INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE,
        "/espace-delivrance/requete/79618e9e-0650-4e76-b326-bb4425c9d6cc/consultation"
      )
    ).toBeFalsy();

    expect(
      LiensRECE.sontUrlDeLaMemePage(
        INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION,
        "/espace-delivrance/requete/79618e9e-0650-4e76-b326-bb4425c9d6cc/edition/79618e9e-0650-4e76-b326-bb4425c9d6cc"
      )
    ).toBeTruthy();
  });
});
