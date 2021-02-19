import {
  estDateVide,
  getDateFromDateCompose,
  getDateString,
  getDateFromTimestamp,
  estDateValide,
  IDateCompose,
  estDateReceValide,
  compareNumber,
  compareDatesCompose,
  getIsoStringFromDateCompose,
  getDateComposeFromDate,
  getDernierJourDuMois,
  getDateDebutFromDateCompose,
  getDateFinFromDateCompose
} from "../../../views/common/util/DateUtils";

test("getDateFromDateCompose", () => {
  const dateCompose = {
    jour: "01",
    mois: "02",
    annee: "2020"
  };
  const date = getDateFromDateCompose(dateCompose);
  if (date) {
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(1);
    expect(date.getFullYear()).toBe(2020);
  }
});
const strDate = "01/01/2020";
test("getDateString", () => {
  const date1 = new Date(strDate);

  const dateString = getDateString(date1);
  expect(dateString).toBe(strDate);
});

test("getDateFromTimestamp", () => {
  const date2 = new Date(strDate);

  const dateString = getDateString(date2);
  expect(dateString).toBe(strDate);
});

test("getDateFromTimestamp", () => {
  const date3 = getDateFromTimestamp(1577836800000);
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
  expect(estDateValide(undefined!)).toBe(false);
  expect(estDateValide(dateValide)).toBeTruthy();
  expect(estDateValide(dateMoisInvalide)).toBeFalsy();
  expect(estDateValide(dateJourInvalide)).toBeFalsy();
  expect(estDateValide(dateInvalide)).toBeFalsy();
  expect(estDateValide(dateJourIncomplet)).toBeFalsy();
  expect(estDateValide(dateMoisIncomplet)).toBeFalsy();
  expect(estDateValide(dateAnneeIncomplete)).toBeFalsy();
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

  expect(estDateReceValide(undefined!)).toBe(false);
  expect(estDateReceValide(dateValide)).toBeTruthy();
  expect(estDateReceValide(dateMoisInvalide)).toBeFalsy();
  expect(estDateReceValide(dateJourInvalide)).toBeFalsy();
  expect(estDateReceValide(dateInvalide)).toBeFalsy();
  expect(estDateReceValide(dateJourIncomplet)).toBeTruthy();
  expect(estDateReceValide(dateMoisIncomplet)).toBeFalsy();
  expect(estDateReceValide(dateAnneeIncomplete)).toBeFalsy();

  expect(estDateReceValide(dateMoisAnnee)).toBeTruthy();
  expect(estDateReceValide(dateAnnee)).toBeTruthy();
  expect(estDateReceValide(dateMoisInvalideAnnee)).toBeFalsy();
});

/////////////////////////////////////////////////////////////
test("compareNumber", () => {
  expect(compareNumber(undefined!, undefined!)).toBe(0);
  expect(compareNumber(1, 1)).toBe(0);
  expect(compareNumber(2, 1)).toBe(1);
  expect(compareNumber(1, 2)).toBe(-1);
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
  expect(compareDatesCompose(d2, d1)).toBe(1);
  expect(compareDatesCompose(d1, d2)).toBe(-1);
  expect(compareDatesCompose(d3, d2)).toBe(1);
  expect(compareDatesCompose(d2, d3)).toBe(-1);
  expect(compareDatesCompose(d3, d3)).toBe(0);
  expect(compareDatesCompose(d5, d4)).toBe(1);
  expect(compareDatesCompose(d4, d5)).toBe(-1);
  expect(compareDatesCompose(d7, d6)).toBe(1);
  expect(compareDatesCompose(d6, d7)).toBe(-1);
});

test("getIsoStringFromDateCompose", () => {
  const d1 = {
    jour: "01",
    mois: "02",
    annee: "2021"
  };
  expect(getIsoStringFromDateCompose(d1)).toBe("2021-02-01");
});

test("estDateVide", () => {
  expect(estDateVide(undefined)).toBeTruthy();
  const d1 = {
    jour: "01",
    mois: "",
    annee: ""
  };
  expect(estDateVide(d1)).toBeFalsy();
  const dateVide = {
    jour: undefined,
    mois: "",
    annee: ""
  };
  expect(estDateVide(dateVide)).toBeTruthy();
});

test("getDateComposeFromDate", () => {
  expect(getDateComposeFromDate(new Date(1990, 2, 1))).toEqual({
    jour: "01",
    mois: "03",
    annee: "1990"
  });
});

test("getDernierJourDuMois", () => {
  expect(getDernierJourDuMois(2, 1800)).toBe(28);
  expect(getDernierJourDuMois(2, 1990)).toBe(28);
  expect(getDernierJourDuMois(2, 2000)).toBe(29);
  expect(getDernierJourDuMois(2, 2010)).toBe(28);
  expect(getDernierJourDuMois(2, 2020)).toBe(29);
  expect(getDernierJourDuMois(1, 2020)).toBe(31);
  expect(getDernierJourDuMois(4, 2020)).toBe(30);
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
  return (
    d1?.getFullYear() === d2?.getFullYear() &&
    d1?.getMonth() === d2?.getMonth() &&
    d1?.getDate() === d2?.getDate()
  );
}

test("getDateDebutFromDateCompose", () => {
  expect(getDateDebutFromDateCompose()).toBe(undefined);
  expect(getDateDebutFromDateCompose({ jour: "", mois: "", annee: "" })).toBe(
    undefined
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "", annee: "1990" }),
    new Date(1990, 1, 1)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "10", annee: "1990" }),
    new Date(1990, 10, 1)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "05", mois: "10", annee: "1990" }),
    new Date(1990, 10, 5)
  );
});

test("getDateFinFromDateCompose", () => {
  expect(getDateFinFromDateCompose()).toBe(undefined);
  expect(getDateFinFromDateCompose({ jour: "", mois: "", annee: "" })).toBe(
    undefined
  );
  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "", annee: "1990" }),
    new Date(1990, 12, 31)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "02", annee: "1990" }),
    new Date(1990, 2, 28)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "02", annee: "2000" }),
    new Date(1990, 2, 29)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "", mois: "04", annee: "2021" }),
    new Date(1990, 4, 30)
  );

  expectDatesEquals(
    getDateDebutFromDateCompose({ jour: "10", mois: "02", annee: "1990" }),
    new Date(1990, 2, 10)
  );
});
