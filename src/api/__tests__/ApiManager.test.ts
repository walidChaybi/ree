import request from "superagent";
import config from "./superagent-mock-config";
import { ApiManager, HttpMethod, IHttpResponse } from "../ApiManager";
import { isNullOrUndefined } from "util";
const superagentMock = require("superagent-mock")(request, config);

test("instanciation d'une api définie dans le fichier api.json", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v1");

  expect(api).not.toBe(isNullOrUndefined);
  if (process.env.NODE_ENV !== "production") {
    expect(api.url).toBe("http://localhost");
  } else {
    expect(api.url).toBe("http://localhost");
  }

  expect(api.ports).toBe(3000);
  expect(api.name).toBe("rece-requete-api");
  expect("v1").toBe(api.version);
  if (process.env.NODE_ENV !== "production") {
    expect(api.getUri()).toBe("http://localhost:3000/rece-requete-api/v1");
  } else {
    expect(api.getUri()).toBe("http://localhost:80/rece-requete-api/v1");
  }
});

test("instanciation d'une api définie dans le fichier api.json avec une mauvaise version", () => {
  expect(() => ApiManager.getInstance("rece-requete-api", "v3")).toThrow(Error);
});

test("instanciation d'une api non définie dans le fichier api.json", () => {
  expect(() =>
    ApiManager.getInstance("rece-televerification-api", "v3")
  ).toThrow(Error);
});

// TODO revoir le fonctionnement du mock de test - Ne fonctionne plus depuis la mise en place
// du mock applicatif
// test("fetch d'une requête http GET", () => {
//   const api = ApiManager.getInstance("rece-requete-api", "v1");

//   const parametre1 = "titi";
//   const parametre2 = 3;
//   const parametre3 = "tutu";

//   return api
//     .fetch({
//       method: HttpMethod.GET,
//       uri: "/requetes",
//       parameters: {
//         parametre1,
//         parametre2,
//         parametre3
//       },
//       headers: [{ header: "custom-header", value: "custom-header-value" }]
//     })
//     .then(result => {
//       expect(result).toBeTruthy();
//     })
//     .catch(error => {
//       expect(error).toBe("ERRRRRRRRROR");
//     });
// });

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
