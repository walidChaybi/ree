import request from "superagent";
import { GestionnaireCacheApi } from "../../api/appels/cache/GestionnaireCacheApi";
import { decrets } from "../../mock/data/NomenclatureEtatCivilDecrets";
import { configAgent } from "../../mock/superagent-config/superagent-mock-agent";
import { configEtatcivil } from "../../mock/superagent-config/superagent-mock-etatcivil";
import { storeRece } from "../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, [
  configAgent[0],
  configEtatcivil[0]
]);

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

afterAll(() => {
  superagentMock.unset();
});
