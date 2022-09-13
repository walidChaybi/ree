import { Crypto } from "@util/crypto/Crypto";

test("Encrypte et décrypte", () => {
  const pass = "RECE";
  expect(Crypto.encrypte("Benoit", pass)).toBeDefined();
  expect(Crypto.decrypte("Benoit", pass)).toBeDefined();
  expect(Crypto.decrypte(Crypto.encrypte("Benoit", pass), pass)).toStrictEqual(
    "Benoit"
  );
});
