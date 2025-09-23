import { ficheActeTexte } from "@mock/data/ficheActe";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { describe } from "node:test";
import { expect, test } from "vitest";

describe("test FicheActe", () => {
  test("test getMentionNationalite", () => {
    NatureMention.init(NATURE_MENTION);
    TypeMention.init(TYPE_MENTION);

    expect(
      FicheActe.depuisDto({
        ...ficheActeTexte,
        nature: "NAISSANCE",
        registre: { ...ficheActeTexte.registre, famille: "ACQ" },
        corpsTexte: { texte: "Française par : décret de naturalisation du 23 septembre 3515" }
      })?.getMentionNationalite(ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION)
    ).toStrictEqual([
      {
        numeroOrdreExtrait: 1,
        textes: {
          texteMentionDelivrance: "Française par décret de naturalisation du 23 septembre 3515 "
        },
        typeMention: {
          idNatureMention: "b03ca8b9-5365-496f-8542-7ae225dc1e96",
          idTypeMention: "b04bb781-3052-41d4-9b97-9f91fd8345e5"
        }
      }
    ]);
  });
});
