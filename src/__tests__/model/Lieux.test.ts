import { LieuxUtils } from "@utilMetier/LieuxUtils";

test("Lieux model", () => {
  expect(LieuxUtils.estPaysFrance("france")).toBe(true);
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
    "Lyon 3ème arrondissement (Rhône)"
  );

  expect(LieuxUtils.getLieu("paris", "napparaitpas", "France", "18")).toBe(
    "Paris 18ème arrondissement"
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
