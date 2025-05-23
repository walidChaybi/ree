import { describe, expect, test } from "vitest";
import DateRECE from "../../utils/DateRECE";

describe("test du Helper dateRECEComplete", () => {
  const DATE_COMPLETE = { jour: 1, mois: 1, annee: 2000 };
  const DATE_COMPLETE_HEURE = { jour: 1, mois: 1, annee: 2000, heure: 1, minute: 0 };

  test("Instantiation de dates", () => {
    const dateAttendue = "01/01/2000 à 00h00";

    expect(DateRECE.depuisTimestamp(946681200000).format("JJ/MM/AAAA à HHhmm")).toBe(dateAttendue);
    expect(DateRECE.depuisObjetDate({ jour: 1, mois: 1, annee: 2000, heure: 0, minute: 0 }).format("JJ/MM/AAAA à HHhmm")).toBe(
      dateAttendue
    );
    expect(DateRECE.depuisObjetDate({ jour: "1", mois: "1", annee: "2000", heure: "0", minute: "0" }).format("JJ/MM/AAAA à HHhmm")).toBe(
      dateAttendue
    );
    expect(
      DateRECE.depuisObjetDate({ jour: 0, mois: "", annee: "2000", heure: null as unknown as string, minute: "minute" }).format(
        "JJ/MM/AAAA à HHhmm"
      )
    ).toBe("2000");
  });

  test("validations de date", () => {
    expect(DateRECE.depuisObjetDate({ jour: 1, mois: 1, annee: 2000, heure: 0, minute: 0 }).estDateHeureValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ jour: 1, mois: 1, annee: 2000 }).estDateValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ jour: 0, mois: 1, annee: 2000 }).estDateValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ jour: 0, mois: 0, annee: 2000 }).estDateValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ jour: 1, mois: 0, annee: 2000 }).estDateValide).toBeFalsy();
    expect(DateRECE.depuisObjetDate({ jour: 0, mois: 0, annee: 0 }).estDateValide).toBeFalsy();

    expect(DateRECE.depuisObjetDate({ heure: "", minute: "" }).estHeureValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ heure: 1, minute: "" }).estHeureValide).toBeFalsy();
    expect(DateRECE.depuisObjetDate({ heure: -1, minute: -1 }).estHeureValide).toBeFalsy();
    expect(DateRECE.depuisObjetDate({ heure: 24, minute: 60 }).estHeureValide).toBeFalsy();

    expect(DateRECE.depuisObjetDate({ jour: 29, mois: 2, annee: 2020 }).estDateValide).toBeTruthy();
    expect(DateRECE.depuisObjetDate({ jour: 29, mois: 2, annee: 2021 }).estDateValide).toBeFalsy();

    expect(DateRECE.depuisObjetDate({ jour: 31, mois: 4, annee: 2020 }).estDateValide).toBeFalsy();
    expect(DateRECE.depuisObjetDate({ jour: 30, mois: 4, annee: 2020 }).estDateValide).toBeTruthy();
  });

  test("Formats de dates", () => {
    const dateInvalide = DateRECE.depuisObjetDate({ jour: 31, mois: 2, annee: 2000 });
    expect(dateInvalide.format()).toBe("");

    expect(DateRECE.depuisObjetDate({ annee: 2000 }).format("Erreur" as "JJ/MM/AAAA")).toBe("");

    const dateRECEComplete = DateRECE.depuisObjetDate(DATE_COMPLETE);
    expect([
      dateRECEComplete.format(),
      dateRECEComplete.format("JJ/MM/AAAA"),
      dateRECEComplete.format("JJ/MM/AAAA à HHhmm"),
      dateRECEComplete.format("JJ mois AAAA"),
      dateRECEComplete.format("JJ mois AAAA", "AVEC_PREFIXE"),
      dateRECEComplete.format("JJ mois AAAA à HHhmm"),
      dateRECEComplete.format("JJ mois AAAA à HHhmm", "AVEC_PREFIXE"),
      dateRECEComplete.format("Date Toutes Lettres"),
      dateRECEComplete.format("Date/heure Toutes Lettres")
    ]).toStrictEqual([
      "01/01/2000",
      "01/01/2000",
      "01/01/2000",
      "1er janvier 2000",
      "le 1er janvier 2000",
      "1er janvier 2000",
      "le 1er janvier 2000",
      "premier janvier deux mille",
      "premier janvier deux mille"
    ]);

    const dateRECECompleteHeure = DateRECE.depuisObjetDate(DATE_COMPLETE_HEURE);
    expect([
      dateRECECompleteHeure.format(),
      dateRECECompleteHeure.format("JJ/MM/AAAA"),
      dateRECECompleteHeure.format("JJ/MM/AAAA à HHhmm"),
      dateRECECompleteHeure.format("JJ mois AAAA"),
      dateRECECompleteHeure.format("JJ mois AAAA", "AVEC_PREFIXE"),
      dateRECECompleteHeure.format("JJ mois AAAA à HHhmm"),
      dateRECECompleteHeure.format("JJ mois AAAA à HHhmm", "AVEC_PREFIXE"),
      dateRECECompleteHeure.format("Date Toutes Lettres"),
      dateRECECompleteHeure.format("Date/heure Toutes Lettres")
    ]).toStrictEqual([
      "01/01/2000",
      "01/01/2000",
      "01/01/2000 à 01h00",
      "1er janvier 2000",
      "le 1er janvier 2000",
      "1er janvier 2000 à 01h00",
      "le 1er janvier 2000 à 01h00",
      "premier janvier deux mille",
      "premier janvier deux mille à une heure"
    ]);

    const dateMoisAnnee = DateRECE.depuisObjetDate({ mois: 1, annee: 2000 });
    expect([
      dateMoisAnnee.format("JJ/MM/AAAA"),
      dateMoisAnnee.format("JJ mois AAAA"),
      dateMoisAnnee.format("JJ mois AAAA", "AVEC_PREFIXE"),
      dateMoisAnnee.format("Date Toutes Lettres")
    ]).toStrictEqual(["01/2000", "janvier 2000", "en janvier 2000", "janvier deux mille"]);

    const dateAnnee = DateRECE.depuisObjetDate({ annee: 2000 });
    expect([
      dateAnnee.format("JJ/MM/AAAA"),
      dateAnnee.format("JJ mois AAAA"),
      dateAnnee.format("JJ mois AAAA", "AVEC_PREFIXE"),
      dateAnnee.format("Date Toutes Lettres")
    ]).toStrictEqual(["2000", "2000", "en 2000", "deux mille"]);

    const dateHorsPremier = DateRECE.depuisObjetDate({ jour: 2, mois: 1, annee: 2000 });
    expect([dateHorsPremier.format("JJ mois AAAA"), dateHorsPremier.format("Date Toutes Lettres")]).toStrictEqual([
      "2 janvier 2000",
      "deux janvier deux mille"
    ]);

    expect(DateRECE.depuisObjetDate({ annee: 1971, jour: 15, mois: 1, heure: 0, minute: 30 }).format("Date/heure Toutes Lettres")).toBe(
      "quinze janvier mille neuf cent soixante-et-onze à zéro heure trente minutes"
    );

    expect(DateRECE.depuisObjetDate({ annee: 1121, heure: 2, minute: 1 }).format("Date/heure Toutes Lettres", "SANS_PREFIXE_LE")).toBe(
      "en mille cent vingt-et-un à deux heures une minute"
    );
  });

  test("Formats date avec préfixes", () => {
    const dateAvecJour = DateRECE.depuisObjetDate({ jour: 1, mois: 1, annee: 2000 });
    const dateSansJour = DateRECE.depuisObjetDate({ mois: 1, annee: 2000 });

    expect(dateAvecJour.format("JJ mois AAAA", "SANS_PREFIXE_EN")).toBe("le 1er janvier 2000");
    expect(dateSansJour.format("JJ mois AAAA", "SANS_PREFIXE_EN")).toBe("janvier 2000");

    expect(dateAvecJour.format("JJ mois AAAA", "SANS_PREFIXE_LE")).toBe("1er janvier 2000");
    expect(dateSansJour.format("JJ mois AAAA", "SANS_PREFIXE_LE")).toBe("en janvier 2000");

    expect(dateAvecJour.format("JJ mois AAAA", "SANS_PREFIXE")).toBe("1er janvier 2000");
    expect(dateSansJour.format("JJ mois AAAA", "SANS_PREFIXE")).toBe("janvier 2000");
  });

  test("Tous les mois de l'année", () => {
    const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

    mois.forEach((mois, i) => {
      const date = DateRECE.depuisObjetDate({ jour: 15, mois: i + 1, annee: 2000 });
      expect(date.format("JJ mois AAAA")).toBe(`15 ${mois} 2000`);
    });
  });
});
