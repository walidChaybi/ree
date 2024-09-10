import { GestionnaireCache } from "@util/GestionnaireCache";
import { expect, test } from "vitest";

test("Attendu: Le gestionnaire de cache SANS délais d'expiration fonctionne correctement", () => {
  const cache = GestionnaireCache.addCache("cache1");
  const key = "key1";
  const value = "test cache1";
  const obj = { test: value };

  // Cache 1 sans délais d'expiration
  cache.set(key, obj);
  expect(cache.get(key)).toEqual({ test: value });
  cache.supprimeObjetsAvecDatesExpirationDepassees();
  // Pas de délais spécifié donc la clé doit toujours êre présente
  expect(cache.get(key)).toEqual({ test: value });
});

test("Attendu: Le gestionnaire de cache AVEC délais d'expiration détruit les clés dont le délais est dépassé à chaque accès", async () => {
  const cache = GestionnaireCache.addCache("cache2", 0.2);
  const key = "key2";
  const value = "test cache2";
  const obj = { test: value };

  // Cache 2 avec délais d'expiration
  cache.set(key, obj);
  expect(cache.get(key)).toEqual({ test: value });
  await sleep(300);
  // Délais expiré donc donc la clé ne doit plus êre présente
  expect(cache.get(key)).toBeUndefined();
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
