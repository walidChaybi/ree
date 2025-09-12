import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { FicheActe, IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { describe } from "node:test";
import { expect, test } from "vitest";

describe("test FicheActe", () => {
  test("test getMentionNationalite", () => {
    TypeMention.init(TYPE_MENTION);
    expect(
      FicheActe.getMentionNationalite(
        {
          nature: NatureActe.NAISSANCE,
          registre: {
            famille: "ACQ"
          },
          type: "TEXTE",
          mentions: [],
          corpsTexte: { texte: "Française par : décret de naturalisation du 23 septembre 3515" }
        } as unknown as IFicheActe,
        ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
      )
    ).toStrictEqual([
      {
        numeroOrdreExtrait: 1,
        textes: {
          texteMentionDelivrance: "Française par décret de naturalisation du 23 septembre 3515 "
        },
        typeMention: {
          idNatureMention: undefined,
          idTypeMention: "b04835d7-880e-45f2-9947-da18dd3237de"
        }
      }
    ]);
  });
});
