import { IEvenement } from "../../../../model/etatcivil/acte/IEvenement";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { getDateFormatJasperFromCompose } from "../../../../views/common/util/DateUtils";
import { EtatCivilUtil } from "../../../../views/common/utilMetier/EtatCivilUtil";
test("Attendu: formatLeOuEn fonctionne correctement", () => {
  expect(`${EtatCivilUtil.formatLeOuEn()} décembre 2021`).toBe(
    "En décembre 2021"
  );
  const jour = "17";
  expect(`${EtatCivilUtil.formatLeOuEn(jour)} ${jour} décembre 2021`).toBe(
    "Le 17 décembre 2021"
  );
});

test("Attendu: formatLeOuEnAPartirDate fonctionne correctement", () => {
  expect(`${EtatCivilUtil.formatLeOuEnAPartirDate()} décembre 2021`).toBe(
    "En décembre 2021"
  );
  let date: any = { mois: "12", annee: "2021" };
  expect(
    `${EtatCivilUtil.formatLeOuEnAPartirDate(
      date
    )} ${getDateFormatJasperFromCompose(date)}`
  ).toBe("En décembre 2021");

  date = { jour: "1", mois: "12", annee: "2021" };
  expect(
    `${EtatCivilUtil.formatLeOuEnAPartirDate(
      date
    )} ${getDateFormatJasperFromCompose(date)}`
  ).toBe("Le 1er décembre 2021");
});

test("Attendu: formatNeOuNee fonctionne correctement", () => {
  expect(EtatCivilUtil.formatNeOuNee()).toBe("né");
  expect(EtatCivilUtil.formatNeOuNee(Sexe.getEnumFromLibelle("Masculin"))).toBe(
    "né"
  );
  expect(EtatCivilUtil.formatNeOuNee(Sexe.getEnumFromLibelle("Féminin"))).toBe(
    "née"
  );
  expect(EtatCivilUtil.formatNeOuNee(Sexe.MASCULIN)).toBe("né");
  expect(EtatCivilUtil.formatNeOuNee(Sexe.FEMININ)).toBe("née");
});

test("Attendu: formatAgeOuAgee fonctionne correctement", () => {
  expect(EtatCivilUtil.formatAgeOuAgee()).toBe("agé");
  expect(
    EtatCivilUtil.formatAgeOuAgee(Sexe.getEnumFromLibelle("Masculin"))
  ).toBe("agé");
  expect(
    EtatCivilUtil.formatAgeOuAgee(Sexe.getEnumFromLibelle("Féminin"))
  ).toBe("agée");
  expect(EtatCivilUtil.formatAgeOuAgee(Sexe.MASCULIN)).toBe("agé");
  expect(EtatCivilUtil.formatAgeOuAgee(Sexe.FEMININ)).toBe("agée");
});

test("Attendu: formatDateEvenement fonctionne correctement", () => {
  expect(EtatCivilUtil.formatDateEvenement()).toBe("");

  const date = { jour: 1, mois: 12, annee: 2021 };
  const evenement: IEvenement = { ...date, pays: "France" };
  expect(EtatCivilUtil.formatDateEvenement(evenement)).toBe(
    "1er décembre 2021"
  );
});

test("Attendu: getPrenomsOuVide fonctionne correctement", () => {
  expect(EtatCivilUtil.getPrenomsOuVide()).toBe("");
  expect(EtatCivilUtil.getPrenomsOuVide(["SPC"])).toBe("");
  expect(EtatCivilUtil.getPrenomsOuVide(["p1", "p2"])).toBe("p1, p2");
});

test("Attendu: getPrenomsOuVide fonctionne correctement", () => {
  expect(EtatCivilUtil.getNomOuVide()).toBe("");
  expect(EtatCivilUtil.getNomOuVide("SNP")).toBe("");
  expect(EtatCivilUtil.getNomOuVide("nom")).toBe("nom");
});

test("Attendu: formatPartiesNomOuVide fonctionne correctement", () => {
  expect(EtatCivilUtil.formatPartiesNomOuVide()).toBe("");
  expect(EtatCivilUtil.formatPartiesNomOuVide("nom")).toBe("");
  expect(EtatCivilUtil.formatPartiesNomOuVide("nom1", "nom2")).toBe(
    "(1re partie : nom1  2nde partie : nom2)"
  );
});
