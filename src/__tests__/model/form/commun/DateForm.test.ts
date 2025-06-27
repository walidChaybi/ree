import { DateHeureFormUtils, IDateHeureForm } from "@model/form/commun/DateForm";
import { describe, expect, test } from "vitest";

describe("Test de valeursDefauts - DateForm", () => {
  test("DOIT renvoyer un objet date par défaut", () => {
    const date: IDateHeureForm = {
      jour: "",
      mois: "",
      annee: ""
    };

    const resultat = DateHeureFormUtils.valeursDefauts(date);

    expect(resultat).toEqual({
      jour: "",
      mois: "",
      annee: ""
    });
  });

  test("DOIT garder les valeurs déjà formatées", () => {
    const date: IDateHeureForm = {
      jour: "15",
      mois: "12",
      annee: "2023"
    };

    const resultat = DateHeureFormUtils.valeursDefauts(date);

    expect(resultat).toEqual({
      jour: "15",
      mois: "12",
      annee: "2023"
    });
  });

  test("DOIT inclure heure et minute QUAND demandé", () => {
    const resultat = DateHeureFormUtils.valeursDefauts(null, true);

    expect(resultat).toEqual({
      jour: "",
      mois: "",
      annee: "",
      heure: "",
      minute: ""
    });
  });

  test("DOIT formater correctement toutes les valeurs avec padding", () => {
    const date: IDateHeureForm = {
      jour: "5",
      mois: "3",
      annee: "2023",
      heure: "9",
      minute: "7"
    };

    const resultat = DateHeureFormUtils.valeursDefauts(date, true);

    expect(resultat).toEqual({
      jour: "05",
      mois: "03",
      annee: "2023",
      heure: "09",
      minute: "07"
    });
  });

  test("DOIT gérer les valeurs partielles", () => {
    const date: IDateHeureForm = {
      jour: "5",
      heure: "9"
    };

    const resultat = DateHeureFormUtils.valeursDefauts(date, true);

    expect(resultat).toEqual({
      jour: "05",
      mois: "",
      annee: "",
      heure: "09",
      minute: ""
    });
  });
});
