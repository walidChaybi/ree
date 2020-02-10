import { ApiManager } from "../ApiManager";
import { isNullOrUndefined } from "util";

test("instanciation d'une api définie dans le fichier api.json", () => {
  const api = new ApiManager("rece-verificationctv-api", "v1");

  expect(api).not.toBe(isNullOrUndefined);
  expect(api.url).toBe("http://10.110.204.59");
  expect(api.ports).toBe(8082);
  expect(api.name).toBe("rece-verificationctv-api");
  expect("v1").toBe(api.version);
  expect(api.getUri()).toBe(
    "http://10.110.204.59:8082/rece-verificationctv-api/v1"
  );
});

test("instanciation d'une api définie dans le fichier api.json avec une mauvaise version", () => {
  expect(() => new ApiManager("rece-verificationctv-api", "v3")).toThrow(Error);
});

test("instanciation d'une api non définie dans le fichier api.json", () => {
  expect(() => new ApiManager("rece-default-api", "v3")).toThrow(Error);
});
