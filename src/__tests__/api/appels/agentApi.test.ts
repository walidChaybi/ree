import request from "superagent";
import { configAgent } from "../../../mock/superagent-config/superagent-mock-agent";
import { getLogin, getUtilisateurs } from "../../../api/appels/agentApi";

const superagentMock = require("superagent-mock")(request, configAgent);

test("getLogin utilisateur", () => {
  getLogin().then((result: any) => {
    expect(result).toBeDefined();
    expect(result.body.headers.id_sso).toBe("idSSOConnectedUser");
  });
});

test("getUtilisateur", () => {
  getUtilisateurs("5ef4b1da1e3ee4adf9615ec7").then((result: any) => {
    expect(result).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
