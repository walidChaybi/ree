import request from "superagent";
import { configAgent } from "../../mock/superagent-config/superagent-mock-agent";
import { storeRece } from "../../views/common/util/storeRece";
import { cacheEntites, cacheUtilisateurs } from "../../views/core/App";

const superagentMock = require("superagent-mock")(request, configAgent);

test("set entites cache", () => {
  // TODO Benoit doit apprendre à utiliser les mocks
  cacheEntites(0);
  setTimeout(() => {
    expect(storeRece.listeEntite.length).toBeGreaterThan(0);
  }, 1);
});

test("set utilisateur cache", () => {
  // TODO Benoit doit apprendre à utiliser les mocks
  cacheUtilisateurs(0);
  setTimeout(() => {
    expect(storeRece.listeUtilisateurs.length).toBeGreaterThan(0);
  }, 1);
});

afterAll(() => {
  superagentMock.unset();
});
