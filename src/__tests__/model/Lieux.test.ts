import { LieuxUtils } from "@utilMetier/LieuxUtils";

test("Lieux model", () => {
  expect(LieuxUtils.isPaysFrance("france")).toBe(true);
  expect(LieuxUtils.isVilleParis("paris")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("paris")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("lyon")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("nantes")).toBe(false);
  expect(LieuxUtils.isVilleAvecArrondissement("Marseille")).toBe(true);
});

test("Attendu: isVilleAvecArrondissement fonctionne correctement", () => {
  expect(LieuxUtils.isVilleAvecArrondissement()).toBe(false);
  expect(LieuxUtils.isVilleAvecArrondissement("Marseille")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("paris")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("LYON")).toBe(true);
  expect(LieuxUtils.isVilleAvecArrondissement("Nantes")).toBe(false);
});

test("Attendu: isVilleMarseilleLyonParis fonctionne correctement", () => {
  expect(LieuxUtils.isVilleMarseilleLyonParis()).toBe(false);
  expect(LieuxUtils.isVilleMarseilleLyonParis("Marseille")).toBe(true);
  expect(LieuxUtils.isVilleMarseilleLyonParis("paris")).toBe(true);
  expect(LieuxUtils.isVilleMarseilleLyonParis("LYON")).toBe(true);
  expect(LieuxUtils.isVilleMarseilleLyonParis("Nantes")).toBe(false);
});

test("Attendu: getDepartement fonctionne correctement", () => {
  expect(LieuxUtils.getDepartement()).toBe("");
  expect(LieuxUtils.getDepartement("paris", "paris")).toBe("");
  expect(LieuxUtils.getDepartement("nantes", "Loire atlantique")).toBe(
    "Loire Atlantique"
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
      "Loire atlantique",
      "44",
      "pays de la loire"
    )
  ).toBe("Loire atlantique (44)");
  expect(LieuxUtils.getRegionDepartement("paris", "paris", "18", "")).toBe("");
  expect(LieuxUtils.getRegionDepartement("", "", "", "Dakar")).toBe("Dakar");
});

test("Attendu: getLieu fonctionne correctement", () => {
  expect(LieuxUtils.getLieu()).toBe("");
  expect(
    LieuxUtils.getLieu("nantes", "pays de la loire", "France", "naparaitpas")
  ).toBe("Nantes (Pays de la Loire)");

  expect(LieuxUtils.getLieu("Lyon", "rhône", "France", "3")).toBe(
    "Lyon arr.3 (Rhône)"
  );

  expect(LieuxUtils.getLieu("paris", "napparaitpas", "France", "18")).toBe(
    "Paris arr.18"
  );

  expect(
    LieuxUtils.getLieu("casablanca", "sahara", "Maroc", "naparaitpas")
  ).toBe("Casablanca, Sahara (Maroc)");

  expect(LieuxUtils.getLieu("casablanca")).toBe("Casablanca");
});

test("Attendu: getLieu fonctionne correctement", () => {
  expect(
    LieuxUtils.getLieuExtraitCopie("nantes", "pays de la loire", "france")
  ).toBe("Nantes, Pays de la Loire (France)");

  expect(LieuxUtils.getLieuExtraitCopie("Lyon", "rhône", "france", "3")).toBe(
    "Lyon 3, Rhône (France)"
  );

  expect(LieuxUtils.getLieuExtraitCopie("paris", undefined, "france")).toBe(
    "Paris (France)"
  );

  expect(LieuxUtils.getLieuExtraitCopie(undefined, undefined, "france")).toBe(
    "-- (France)"
  );

  expect(
    LieuxUtils.getLieuExtraitCopie("paris", undefined, "france", "18")
  ).toBe("Paris 18 (France)");

  expect(LieuxUtils.getLieuExtraitCopie()).toBe("");
});
