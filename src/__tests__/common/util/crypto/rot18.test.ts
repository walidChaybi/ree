import { Rot18 } from "@util/crypto/Rot18";

test("Attendu: Crypte Rot18 fonctionne correctement", () => {
  expect(Rot18.crypte()).toBe(undefined);
  expect(Rot18.crypte(null!)).toBe(null);
  expect(Rot18.crypte("0123456789")).toBe("5678901234");
  expect(Rot18.crypte("3654")).toBe("8109");
  expect(Rot18.crypte("Test de 'cryptage'")).toBe("Grfg qr 'pelcgntr'");
  expect(
    Rot18.crypte(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    )
  ).toBe("NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm5678901234");
});

test("Attendu: Decrypte Rot18 fonctionne correctement", () => {
  expect(Rot18.decrypte()).toBe(undefined);
  expect(Rot18.decrypte(null!)).toBe(null);
  expect(Rot18.decrypte("0123456789")).toBe("5678901234");
  expect(Rot18.crypte("8109")).toBe("3654");
  expect(Rot18.decrypte("Grfg qr 'pelcgntr'")).toBe("Test de 'cryptage'");
  expect(
    Rot18.decrypte(
      "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm5678901234"
    )
  ).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
});
