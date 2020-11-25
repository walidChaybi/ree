import request from "superagent";
import config from "../../mock/superagent-config/superagent-mock-fake-url";
import { ApiManager, HttpMethod } from "../../api/ApiManager";
import { isNullOrUndefined } from "util";
const superagentMock = require("superagent-mock")(request, config);

test("instanciation d'une api définie dans le fichier api.json", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v1");

  expect(api).not.toBe(isNullOrUndefined);
  expect(api.url).toBe("http://localhost");

  expect(api.ports).toBe(80);
  expect(api.domain).toBe("rece");
  expect(api.name).toBe("rece-requete-api");
  expect("v1").toBe(api.version);
  expect(api.getUri()).toBe("http://localhost:80/rece/rece-requete-api/v1");
});

test("fetch d'une requête http GET", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v1");
  const parametre1 = "titi";
  const parametre2 = 3;
  const parametre3 = "tutu";
  return api
    .fetch({
      method: HttpMethod.GET,
      uri: "/requetes",
      parameters: {
        parametre1,
        parametre2,
        parametre3
      },
      headers: [{ header: "custom-header", value: "custom-header-value" }]
    })
    .then(result => {
      expect(result).toBeTruthy();
    })
    .catch(error => {
      expect(error).toBe("ERRRRRRRRROR");
    });
});

// test("fetch d'une requête http POST avec passage de data on récupère un 201", () => {
//   const api = ApiManager.getInstance("rece-requete-api", "v1");

//   return api
//     .fetch({
//       method: HttpMethod.POST,
//       uri: "/requetes",
//       data: {
//         data1: "toto",
//         data2: "tutu"
//       }
//     })
//     .then((result: IHttpResponse) => {
//       expect(result.status).toBe(201);
//     })
//     .catch(error => {
//       expect(error).toBe("ERRRRRRRRROR");
//     });
// });

afterAll(() => {
  superagentMock.unset();
});
