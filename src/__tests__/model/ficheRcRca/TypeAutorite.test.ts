import {
  AutoriteUtil,
  TypeAutorite
} from "../../../model/ficheRcRca/TypeAutorite";

test("TypeAutorite model", () => {
  expect(AutoriteUtil.isJuridiction(TypeAutorite.NOTAIRE)).toBe(false);
  expect(AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_JUDICIAIRE)).toBe(
    true
  );
  expect(AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_INSTANCE)).toBe(true);
  expect(
    AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_DE_GRANDE_INSTANCE)
  ).toBe(true);
  expect(AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_DE_PROXIMITE)).toBe(
    true
  );
  expect(
    AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_JUDICIAIRE_DE_REFERENCE)
  ).toBe(true);
  expect(
    AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_DE_PREMIERE_INSTANCE)
  ).toBe(true);
  expect(
    AutoriteUtil.isJuridiction(TypeAutorite.TRIBUNAL_SUPERIEUR_D_APPEL)
  ).toBe(true);
  expect(AutoriteUtil.isJuridiction(TypeAutorite.COUR_D_APPEL)).toBe(true);
  expect(AutoriteUtil.isJuridiction(TypeAutorite.JURIDICTION_ETRANGERE)).toBe(
    true
  );

  expect(AutoriteUtil.isNotaire(TypeAutorite.NOTAIRE)).toBe(true);
  expect(AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_JUDICIAIRE)).toBe(false);
  expect(AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_INSTANCE)).toBe(false);
  expect(AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_DE_GRANDE_INSTANCE)).toBe(
    false
  );
  expect(AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_DE_PROXIMITE)).toBe(
    false
  );
  expect(
    AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_JUDICIAIRE_DE_REFERENCE)
  ).toBe(false);
  expect(
    AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_DE_PREMIERE_INSTANCE)
  ).toBe(false);
  expect(AutoriteUtil.isNotaire(TypeAutorite.TRIBUNAL_SUPERIEUR_D_APPEL)).toBe(
    false
  );
  expect(AutoriteUtil.isNotaire(TypeAutorite.COUR_D_APPEL)).toBe(false);
  expect(AutoriteUtil.isNotaire(TypeAutorite.JURIDICTION_ETRANGERE)).toBe(
    false
  );

  expect(AutoriteUtil.getLibelle(TypeAutorite.JURIDICTION_ETRANGERE)).toBe(
    "Juridiction étrangère"
  );

  expect(AutoriteUtil.getLibelle()).toBe("");
});
