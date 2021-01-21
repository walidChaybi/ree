import {
  TypeAutoriteUtil,
  TypeAutorite
} from "../../../model/etatcivil/TypeAutorite";

test("TypeAutorite model", () => {
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.NOTAIRE)).toBe(false);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_JUDICIAIRE)).toBe(
    true
  );
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_INSTANCE)).toBe(
    true
  );
  expect(
    TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_GRANDE_INSTANCE)
  ).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_PROXIMITE)).toBe(
    true
  );
  expect(
    TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_JUDICIAIRE_REFERENCE)
  ).toBe(true);
  expect(
    TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_PREMIERE_INSTANCE)
  ).toBe(true);
  expect(
    TypeAutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_SUPERIEUR_APPEL)
  ).toBe(true);
  expect(TypeAutoriteUtil.isJuridiction(TypeAutorite.COUR_APPEL)).toBe(true);
  expect(
    TypeAutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION_ETRANGERE)
  ).toBe(true);

  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.NOTAIRE)).toBe(true);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_JUDICIAIRE)).toBe(
    false
  );
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_INSTANCE)).toBe(
    false
  );
  expect(
    TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_GRANDE_INSTANCE)
  ).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_PROXIMITE)).toBe(
    false
  );
  expect(
    TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_JUDICIAIRE_REFERENCE)
  ).toBe(false);
  expect(
    TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_PREMIERE_INSTANCE)
  ).toBe(false);
  expect(
    TypeAutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_SUPERIEUR_APPEL)
  ).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.COUR_APPEL)).toBe(false);
  expect(TypeAutoriteUtil.isNotaire(TypeAutorite.JURIDICTION_ETRANGERE)).toBe(
    false
  );

  expect(TypeAutoriteUtil.getLibelle(TypeAutorite.JURIDICTION_ETRANGERE)).toBe(
    "Juridiction étrangère"
  );

  expect(TypeAutoriteUtil.getLibelle()).toBe("");

  expect(TypeAutoriteUtil.isOnac("ONAC")).toBe(true);

  expect(TypeAutoriteUtil.isOnac("NOTAIRE")).toBe(false);
});
