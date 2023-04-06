import { GestionnaireCacheApi } from "@api/appels/cache/GestionnaireCacheApi";
import { storeRece } from "@util/storeRece";
import { decrets } from "../../mock/data/NomenclatureEtatCivilDecrets";



test("set entites cache", async () => {
  await GestionnaireCacheApi.chargerToutesLesEntites();
  expect(storeRece.listeEntite.length).toBeGreaterThan(0);
});

test("set utilisateur cache", async () => {
  await GestionnaireCacheApi.chargerTousLesUtilisateurs();
  expect(storeRece.listeUtilisateurs.length).toBeGreaterThan(0);
});

test("Attendu: Le chargement des décrets en cache fonctionne correctement", async () => {
  await GestionnaireCacheApi.chargerTousLesDecrets();
  expect(storeRece.decrets).toEqual(decrets);
});


