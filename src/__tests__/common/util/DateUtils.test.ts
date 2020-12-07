import {
  getDateFromDateCompose,
  getDateString,
  getDateFromTimestamp
} from "../../../views/common/util/DateUtils";

test("getDateFromDateCompose", () => {
  const dateCompose = {
    jour: "01",
    mois: "02",
    annee: "2020"
  };
  const date = getDateFromDateCompose(dateCompose);
  expect(date.getDate()).toBe(1);
  expect(date.getMonth()).toBe(2);
  expect(date.getFullYear()).toBe(2020);
});

test("getDateString", () => {
  const date = new Date("01/01/2020");

  const dateString = getDateString(date);
  expect(dateString).toBe("01/01/2020");
});

test("getDateFromTimestamp", () => {
  const date = new Date("01/01/2020");

  const dateString = getDateString(date);
  expect(dateString).toBe("01/01/2020");
});

test("getDateFromTimestamp", () => {
  const date = getDateFromTimestamp(1577836800000);
  expect(date.getDate()).toBe(1);
  expect(date.getMonth()).toBe(0);
  expect(date.getFullYear()).toBe(2020);
});
