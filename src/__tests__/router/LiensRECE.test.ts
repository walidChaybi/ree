import { describe, expect, test } from "vitest";
import LiensRECE from "../../router/LiensRECE";
import { FIN_URL_CONSULTATION, URL_ACCUEIL } from "../../router/infoPages/InfoPagesBase";

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

  test("vérification page consultation", async () => {
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
});
