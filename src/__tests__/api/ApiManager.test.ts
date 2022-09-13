import { ApiManager, HttpMethod } from "@api/ApiManager";
import request from "superagent";
import { isNullOrUndefined } from "util";
import { configFakeUrl } from "../../mock/superagent-config/superagent-mock-fake-url";

const superagentMock = require("superagent-mock")(request, configFakeUrl);

test("instanciation d'une api définie dans le fichier api.json", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");

  expect(api).not.toBe(isNullOrUndefined);
  expect(api.url).toBe("http://localhost");
  expect(api.domain).toBe("rece");
  expect(api.name).toBe("rece-requete-api");
  expect("v2").toBe(api.version);
  expect(api.getUri()).toBe("http://localhost/rece/rece-requete-api/v2");
});

test("fetch d'une requête http GET", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");
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

test("fetch d'une requête http DELETE", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");

  return api
    .fetch({
      method: HttpMethod.DELETE,
      uri: "/fakes",
      headers: [{ header: "custom-header", value: "custom-header-value" }]
    })
    .then(result => {
      expect(result).toBeTruthy();
    })
    .catch(error => {
      expect(error).toBe("ERRRRRRRRROR");
    });
});

test("fetch d'une requête http PATCH", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");

  return api
    .fetch({
      method: HttpMethod.PATCH,
      uri: "/fakes",
      headers: [{ header: "custom-header", value: "custom-header-value" }]
    })
    .then(result => {
      expect(result).toBeTruthy();
    })
    .catch(error => {
      expect(error).toBe("ERRRRRRRRROR");
    });
});

test("fetch d'une requête http PUT", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");

  return api
    .fetch({
      method: HttpMethod.PUT,
      uri: "/fakes",
      responseType: "blob",
      headers: [{ header: "custom-header", value: "custom-header-value" }]
    })
    .then(result => {
      expect(result).toBeTruthy();
    })
    .catch(error => {
      expect(error).toBe("ERRRRRRRRROR");
    });
});

test("fetch d'une requête http POST", () => {
  const api = ApiManager.getInstance("rece-requete-api", "v2");

  return api
    .fetch({
      method: HttpMethod.POST,
      uri: "/fakes",
      data: {},
      headers: [{ header: "custom-header", value: "custom-header-value" }]
    })
    .then(result => {
      expect(result).toBeTruthy();
    })
    .catch(error => {
      expect(error).toBe("ERRRRRRRRROR");
    });
});

afterAll(() => {
  superagentMock.unset();
});
