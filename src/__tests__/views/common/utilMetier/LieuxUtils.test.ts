import { LieuxUtils } from "@utilMetier/LieuxUtils";
import { expect, test } from "vitest";

test("Lieux model", () => {
  expect(LieuxUtils.estPaysFrance("france")).toBe(true);
  expect(LieuxUtils.estPaysInconnu("inconnu")).toBe(true);
  expect(LieuxUtils.estVilleParis("paris")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("paris")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("lyon")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("nantes")).toBe(false);
  expect(LieuxUtils.estVilleAvecArrondissement("Marseille")).toBe(true);
});

test("Attendu: isVilleAvecArrondissement fonctionne correctement", () => {
  expect(LieuxUtils.estVilleAvecArrondissement()).toBe(false);
  expect(LieuxUtils.estVilleAvecArrondissement("Marseille")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("paris")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("LYON")).toBe(true);
  expect(LieuxUtils.estVilleAvecArrondissement("Nantes")).toBe(false);
});

test("Attendu: isVilleMarseilleLyonParis fonctionne correctement", () => {
  expect(LieuxUtils.estVilleMarseilleLyonParis()).toBe(false);
  expect(LieuxUtils.estVilleMarseilleLyonParis("Marseille")).toBe(true);
  expect(LieuxUtils.estVilleMarseilleLyonParis("paris")).toBe(true);
  expect(LieuxUtils.estVilleMarseilleLyonParis("LYON")).toBe(true);
  expect(LieuxUtils.estVilleMarseilleLyonParis("Nantes")).toBe(false);
});

test("Attendu: getDepartement fonctionne correctement", () => {
  expect(LieuxUtils.getDepartement()).toBe("");
  expect(LieuxUtils.getDepartement("paris", "paris")).toBe("");
  expect(LieuxUtils.getDepartement("nantes", "loire atlantique")).toBe(
    "loire atlantique"
  );
});

test("Attendu: getArrondissement fonctionne correctement", () => {
  expect(LieuxUtils.getArrondissement("paris", "18")).toBe("18");
  expect(LieuxUtils.getArrondissement("nantes", "17")).toBe("");
});

test("Attendu: getRegionDepartement fonctionne correctement", () => {
  expect(LieuxUtils.getRegionDepartement()).toBe("");
  expect(
    LieuxUtils.getRegionDepartement(
      "nantes",
      "loire atlantique",
      "44",
      "pays de la loire"
    )
  ).toBe("loire atlantique (44)");
  expect(LieuxUtils.getRegionDepartement("paris", "paris", "18", "")).toBe("");
  expect(LieuxUtils.getRegionDepartement("", "", "", "Dakar")).toBe("Dakar");
});

test("Attendu: getLieu fonctionne correctement", () => {
  expect(
    LieuxUtils.getLieu("nantes", "pays de la loire", "France", "n'apparait pas")
  ).toBe("nantes (pays de la loire)");

  expect(
    LieuxUtils.getLieu(
      undefined,
      "pays de la loire",
      "France",
      "n'apparait pas"
    )
  ).toBe("-- (pays de la loire)");

  expect(LieuxUtils.getLieu("Lyon", "rhône", "France", "3")).toBe(
    "Lyon 3ème arrondissement (rhône)"
  );

  expect(LieuxUtils.getLieu("paris", "n'apparait pas", "France", "18")).toBe(
    "paris 18ème arrondissement"
  );

  expect(
    LieuxUtils.getLieu("casablanca", "sahara", "Maroc", "n'apparait pas")
  ).toBe("casablanca, sahara (Maroc)");

  expect(
    LieuxUtils.getLieu(undefined, undefined, "Maroc", "n'apparait pas")
  ).toBe("-- (Maroc)");

  expect(LieuxUtils.getLieu("casablanca")).toBe("casablanca");

  expect(LieuxUtils.getLieu()).toBe("");
});

test("Attendu: getLieuExtraitCopie fonctionne correctement", () => {
  expect(
    LieuxUtils.getLieuExtraitCopie("nantes", "pays de la loire", "france")
  ).toBe("nantes, pays de la loire (france)");

  expect(LieuxUtils.getLieuExtraitCopie("Lyon", "rhône", "france", "3")).toBe(
    "Lyon 3, rhône (france)"
  );

  expect(LieuxUtils.getLieuExtraitCopie("paris", undefined, "france")).toBe(
    "paris (france)"
  );

  expect(LieuxUtils.getLieuExtraitCopie(undefined, undefined, "france")).toBe(
    "-- (france)"
  );

  expect(
    LieuxUtils.getLieuExtraitCopie("paris", undefined, "france", "18")
  ).toBe("paris 18 (france)");

  expect(LieuxUtils.getLieuExtraitCopie()).toBe("");
});
