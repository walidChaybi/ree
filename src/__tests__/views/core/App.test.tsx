import { GestionnaireCacheApi } from "@api/appels/cache/GestionnaireCacheApi";
import { decrets } from "@mock/data/NomenclatureEtatCivilDecrets";
import { waitFor } from "@testing-library/dom";
import { storeRece } from "@util/storeRece";
import { expect, test } from "vitest";

test("set services cache", () => {
  GestionnaireCacheApi.chargerTousLesServices();

  waitFor(() => {
    expect(storeRece.listeServices.length).toBeGreaterThan(0);
  });
});

test("set utilisateur cache", () => {
  GestionnaireCacheApi.chargerTousLesUtilisateurs();
  waitFor(() => {
    expect(storeRece.listeUtilisateurs.length).toBeGreaterThan(0);
  });
});

test("Attendu: Le chargement des décrets en cache fonctionne correctement", () => {
  GestionnaireCacheApi.chargerTousLesDecrets();
  waitFor(() => {
    expect(storeRece.decrets).toEqual(decrets);
  });
});
