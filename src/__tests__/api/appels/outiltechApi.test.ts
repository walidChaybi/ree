import request from "superagent";
import { postLog } from "../../../api/appels/outiltechApi";
import { configOutiltech } from "../../../mock/superagent-config/superagent-mock-outiltech";

const superagentMock = require("superagent-mock")(request, configOutiltech);

test("outiltech api postLog", () => {
  postLog([
    {
      date: 1611311452,
      idCorrelation: "7d18eeec-1ad8-4a88-974e-7a4a4bb018d0",
      message:
        "cannot GET http://localhost:80/rece/rece-requete-api/v2/requetes/count?statuts=A_SIGNER (503)"
    }
  ]).then((result: any) => {
    expect(result).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
