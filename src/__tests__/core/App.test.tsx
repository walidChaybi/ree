import request from "superagent";
import { GestionnaireCacheApi } from "../../api/appels/cache/GestionnaireCacheApi";
import { configAgent } from "../../mock/superagent-config/superagent-mock-agent";
import { storeRece } from "../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, configAgent);

test("set entites cache", () => {
  GestionnaireCacheApi.chargerToutesLesEntites();
  setTimeout(() => {
    expect(storeRece.listeEntite.length).toBeGreaterThan(0);
  }, 1);
});

test("set utilisateur cache", () => {
  GestionnaireCacheApi.chargerTousLesUtilisateurs();
  setTimeout(() => {
    expect(storeRece.listeUtilisateurs.length).toBeGreaterThan(0);
  }, 1);
});

afterAll(() => {
  superagentMock.unset();
});
