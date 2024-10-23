import DateUtils, { IDateCompose } from "@util/DateUtils";
import { expect, test } from "vitest";

test("getDateFromDateCompose", () => {
  const dateCompose = {
    jour: "01",
    mois: "02",
    annee: "2020"
  };
  const date = DateUtils.getDateFromDateCompose(dateCompose);
  if (date) {
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(1);
    expect(date.getFullYear()).toBe(2020);
  }
});
const strDate = "01/01/2020";
test("getDateString", () => {
  const date1 = new Date(strDate);

  const dateString = DateUtils.getDateString(date1);
  expect(dateString).toBe(strDate);
});

test("converti les dates ISO8601", () => {
  const date = "1986-08-23";

  const result = DateUtils.formatDateStringIso(date);
  expect(result).toBe("23/08/1986");
});

test("getDateFromTimestamp", () => {
  const date2 = new Date(strDate);

  const dateString = DateUtils.getDateString(date2);
  expect(dateString).toBe(strDate);
});

test("getDateFromTimestamp", () => {
  const date3 = DateUtils.getDateFromTimestamp(1577836800000);
  expect(date3.getDate()).toBe(1);
  expect(date3.getMonth()).toBe(0);
  expect(date3.getFullYear()).toBe(2020);
});

////////////////////////////////////////
// Tests de validité de date ///////////
////////////////////////////////////////
const dateValide: IDateCompose = {
  jour: "03",
  mois: "04",
  annee: "2021"
};
const dateMoisInvalide: IDateCompose = {
  jour: "03",
  mois: "13",
  annee: "2021"
};
const dateJourInvalide: IDateCompose = {
  jour: "33",
  mois: "11",
  annee: "2021"
};
const dateInvalide: IDateCompose = {
  jour: "31",
  mois: "11",
  annee: "2021"
};
const dateJourIncomplet: IDateCompose = {
  jour: undefined,
  mois: "11",
  annee: "2021"
};
const dateMoisIncomplet: IDateCompose = {
  jour: "01",
  mois: "",
  annee: "2021"
};

const dateAnneeIncomplete: IDateCompose = {
  jour: "1",
  mois: "11",
  annee: undefined!
};
test("estDateValide", () => {
  expect(DateUtils.estDateValide(undefined!)).toBe(false);
  expect(DateUtils.estDateValide(dateValide)).toBeTruthy();
  expect(DateUtils.estDateValide(dateMoisInvalide)).toBeFalsy();
  expect(DateUtils.estDateValide(dateJourInvalide)).toBeFalsy();
  expect(DateUtils.estDateValide(dateInvalide)).toBeFalsy();
  expect(DateUtils.estDateValide(dateJourIncomplet)).toBeFalsy();
  expect(DateUtils.estDateValide(dateMoisIncomplet)).toBeFalsy();
  expect(DateUtils.estDateValide(dateAnneeIncomplete)).toBeFalsy();
});

test("estDateReceValide", () => {
  const dateMoisAnnee: IDateCompose = {
    jour: "",
    mois: "01",
    annee: "2021"
  };

  const dateMoisInvalideAnnee: IDateCompose = {
    jour: "",
    mois: "14",
    annee: "2021"
  };

  const dateAnnee: IDateCompose = {
    jour: "",
    mois: "",
    annee: "2020"
  };

  expect(DateUtils.estDateReceValide(undefined!)).toBe(false);
  expect(DateUtils.estDateReceValide(dateValide)).toBeTruthy();
  expect(DateUtils.estDateReceValide(dateMoisInvalide)).toBeFalsy();
  expect(DateUtils.estDateReceValide(dateJourInvalide)).toBeFalsy();
  expect(DateUtils.estDateReceValide(dateInvalide)).toBeFalsy();
  expect(DateUtils.estDateReceValide(dateJourIncomplet)).toBeTruthy();
  expect(DateUtils.estDateReceValide(dateMoisIncomplet)).toBeFalsy();
  expect(DateUtils.estDateReceValide(dateAnneeIncomplete)).toBeFalsy();

  expect(DateUtils.estDateReceValide(dateMoisAnnee)).toBeTruthy();
  expect(DateUtils.estDateReceValide(dateAnnee)).toBeTruthy();
  expect(DateUtils.estDateReceValide(dateMoisInvalideAnnee)).toBeFalsy();
});

/////////////////////////////////////////////////////////////
test("compareNumber", () => {
  expect(DateUtils.compareNumber(undefined!, undefined!)).toBe(0);
  expect(DateUtils.compareNumber(1, 1)).toBe(0);
  expect(DateUtils.compareNumber(2, 1)).toBe(1);
  expect(DateUtils.compareNumber(1, 2)).toBe(-1);
});

test("compareDatesCompose", () => {
  const d1 = {
    jour: "01",
    mois: "01",
    annee: "2021"
  };
  const d2 = {
    jour: "01",
    mois: "02",
    annee: "2021"
  };
  const d3 = {
    jour: "02",
    mois: "02",
    annee: "2021"
  };
  const d4 = {
    jour: "",
    mois: "02",
    annee: "2021"
  };
  const d5 = {
    jour: "",
    mois: "03",
    annee: "2021"
  };
  const d6 = {
    jour: "",
    mois: "",
    annee: "2021"
  };
  const d7 = {
    jour: "",
    mois: "",
    annee: "2022"
  };
  expect(DateUtils.compareDatesCompose(d2, d1)).toBe(1);
  expect(DateUtils.compareDatesCompose(d1, d2)).toBe(-1);
  expect(DateUtils.compareDatesCompose(d3, d2)).toBe(1);
  expect(DateUtils.compareDatesCompose(d2, d3)).toBe(-1);
  expect(DateUtils.compareDatesCompose(d3, d3)).toBe(0);
  expect(DateUtils.compareDatesCompose(d5, d4)).toBe(1);
  expect(DateUtils.compareDatesCompose(d4, d5)).toBe(-1);
  expect(DateUtils.compareDatesCompose(d7, d6)).toBe(1);
  expect(DateUtils.compareDatesCompose(d6, d7)).toBe(-1);
});

test("getIsoStringFromDateCompose", () => {
  const d1 = {
    jour: "01",
    mois: "02",
    annee: "2021"
  };
  expect(DateUtils.getIsoStringFromDateCompose(d1)).toBe("2021-02-01");
});

test("estDateVide", () => {
  expect(DateUtils.estDateVide(undefined)).toBeTruthy();
  const d1 = {
    jour: "01",
    mois: "",
    annee: ""
  };
  expect(DateUtils.estDateVide(d1)).toBeFalsy();
  const dateVide = {
    jour: undefined,
    mois: "",
    annee: ""
  };
  expect(DateUtils.estDateVide(dateVide)).toBeTruthy();
});

test("getDateComposeFromDate", () => {
  expect(DateUtils.getDateComposeFromDate(new Date(1990, 2, 1))).toEqual({
    jour: "01",
    mois: "03",
    annee: "1990"
  });
});

test("getDernierJourDuMois", () => {
  expect(DateUtils.getDernierJourDuMois(2, 1800)).toBe(28);
  expect(DateUtils.getDernierJourDuMois(2, 1990)).toBe(28);
  expect(DateUtils.getDernierJourDuMois(2, 2000)).toBe(29);
  expect(DateUtils.getDernierJourDuMois(2, 2010)).toBe(28);
  expect(DateUtils.getDernierJourDuMois(2, 2020)).toBe(29);
  expect(DateUtils.getDernierJourDuMois(1, 2020)).toBe(31);
  expect(DateUtils.getDernierJourDuMois(4, 2020)).toBe(30);
});

function expectDatesEquals(d1?: Date, d2?: Date) {
  if (d1 === d2) {
    return true;
  }
  if (d1 && !d2) {
    return false;
  }
  if (!d1 && d2) {
    return false;
  }
  return d1?.getFullYear() === d2?.getFullYear() && d1?.getMonth() === d2?.getMonth() && d1?.getDate() === d2?.getDate();
}

test("getDateDebutFromDateCompose", () => {
  expect(DateUtils.getDateDebutFromDateCompose()).toBe(undefined);
  expect(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "", annee: "" })).toBe(undefined);

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "", annee: "1990" }), new Date(1990, 1, 1));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "10", annee: "1990" }), new Date(1990, 10, 1));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "05", mois: "10", annee: "1990" }), new Date(1990, 10, 5));
});

test("getDateFinFromDateCompose", () => {
  expect(DateUtils.getDateFinFromDateCompose()).toBe(undefined);
  expect(DateUtils.getDateFinFromDateCompose({ jour: "", mois: "", annee: "" })).toBe(undefined);
  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "", annee: "1990" }), new Date(1990, 12, 31));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "02", annee: "1990" }), new Date(1990, 2, 28));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "02", annee: "2000" }), new Date(1990, 2, 29));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "", mois: "04", annee: "2021" }), new Date(1990, 4, 30));

  expectDatesEquals(DateUtils.getDateDebutFromDateCompose({ jour: "10", mois: "02", annee: "1990" }), new Date(1990, 2, 10));
});

test("getDateStringFromDateCompose", () => {
  expect(DateUtils.getDateStringFromDateCompose(undefined!)).toBe("");
  expect(
    DateUtils.getDateStringFromDateCompose({
      jour: undefined,
      mois: undefined,
      annee: undefined!
    })
  ).toBe("");
  expect(
    DateUtils.getDateStringFromDateCompose({
      jour: undefined,
      mois: undefined,
      annee: "2021"
    })
  ).toBe("2021");
  expect(DateUtils.getDateStringFromDateCompose({ jour: "1", mois: "1", annee: "2021" })).toBe("01/01/2021");
  expect(DateUtils.getDateStringFromDateCompose({ jour: undefined, mois: "1", annee: "2021" })).toBe("01/2021");
  expect(DateUtils.getDateStringFromDateCompose({ jour: "", mois: "1", annee: "2021" })).toBe("01/2021");
});

test("getMoisNaissanceEnLettre", () => {
  expect(DateUtils.getMoisEnLettre(undefined)).toBeUndefined();
  expect(DateUtils.getMoisEnLettre(13)).toBeUndefined();
  expect(DateUtils.getMoisEnLettre(3)).toBe("mars");
});

test("getJourSuffixeAvec1erSiBesoin", () => {
  expect(DateUtils.getJourOu1er(undefined)).toBe("");
  expect(DateUtils.getJourOu1er(1)).toBe("1er");
  expect(DateUtils.getJourOu1er(2)).toBe("2");
});

test("formatJour", () => {
  expect(DateUtils.formatJour(undefined)).toBe("");
  expect(DateUtils.formatMois("")).toBe("");
  expect(DateUtils.formatJour("1")).toBe("1er");
  expect(DateUtils.formatJour("02")).toBe("2");
  expect(DateUtils.formatJour("AAA")).toBe("");
  expect(DateUtils.formatJour("12")).toBe("12");
  expect(DateUtils.formatJour("10")).toBe("10");
  expect(DateUtils.formatJour("20")).toBe("20");
  expect(DateUtils.formatJour("30")).toBe("30");
});

test("formatMois", () => {
  expect(DateUtils.formatMois(undefined)).toBe("");
  expect(DateUtils.formatMois("")).toBe("");
  expect(DateUtils.formatMois("1")).toBe("janvier");
  expect(DateUtils.formatMois("01")).toBe("janvier");
  expect(DateUtils.formatMois("02")).toBe("février");
  expect(DateUtils.formatMois("AAA")).toBe("");
  expect(DateUtils.formatMois("12")).toBe("décembre");
  expect(DateUtils.formatMois("10")).toBe("octobre");
  expect(DateUtils.formatMois("010")).toBe("octobre");
});

test("dateCourdateCourrierrier()", () => {
  const today = DateUtils.dateCourrier();
  expect(today).not.toBeNull();
});

test("estDateAtteinte()", () => {
  const d1 = new Date(2020, 0, 1);
  expect(DateUtils.estDateAtteinte(d1)).toBeTruthy();
  const today = new Date();
  const d2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  expect(DateUtils.estDateAtteinte(d2)).toBeFalsy();
});

test("formatAHeureExtrait()", () => {
  expect(DateUtils.formatAHeureExtrait(12, 20)).toEqual("à 12 heures 20 minutes");
  expect(DateUtils.formatAHeureExtrait(0, 20)).toEqual("à zéro heure 20 minutes");
  expect(DateUtils.formatAHeureExtrait(12, 0)).toEqual("à 12 heures");
  expect(DateUtils.formatAHeureExtrait(2, 3)).toEqual("à 2 heures 3 minutes");
  expect(DateUtils.formatAHeureExtrait(1, 1)).toEqual("à 1 heure 1 minute");
});

test("formatAHeure()", () => {
  expect(DateUtils.formatAHeure(12, 20)).toEqual("à 12h20");
  expect(DateUtils.formatAHeure(0, 20)).toEqual("à zéro heure 20");
  expect(DateUtils.formatAHeure(12, 0)).toEqual("à 12h");
  expect(DateUtils.formatAHeure(2, 3)).toEqual("à 2h3");
  expect(DateUtils.formatAHeure(1, 1)).toEqual("à 1h1");
});
