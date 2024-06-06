import { GestionnaireCacheApi } from "@api/appels/cache/GestionnaireCacheApi";
import { decrets } from "@mock/data/NomenclatureEtatCivilDecrets";
import { storeRece } from "@util/storeRece";

test("set services cache", async () => {
  await GestionnaireCacheApi.chargerTousLesServices();
  expect(storeRece.listeServices.length).toBeGreaterThan(0);
});

test("set utilisateur cache", async () => {
  await GestionnaireCacheApi.chargerTousLesUtilisateurs();
  expect(storeRece.listeUtilisateurs.length).toBeGreaterThan(0);
});

test("Attendu: Le chargement des décrets en cache fonctionne correctement", async () => {
  await GestionnaireCacheApi.chargerTousLesDecrets();
  expect(storeRece.decrets).toEqual(decrets);
});
