import {
  EOptionMiseAJourActe,
  OptionMiseAJourActe
} from "@model/etatcivil/enum/OptionMiseAJourActe";
import { SousTypeMiseAJour } from "@model/requete/enum/SousTypeMiseAJour";
import { Option } from "@util/Type";
import { describe, expect, test } from "vitest";

describe("Test de l'enum Option de mise à jour d'un acte", () => {
  test("Doit retourner un tableau de toutes les options possibles", () => {
    const attendu: Option[] = [
      {
        cle: EOptionMiseAJourActe.MENTION_SUITE_AVIS,
        libelle: EOptionMiseAJourActe.MENTION_SUITE_AVIS
      },
      {
        cle: EOptionMiseAJourActe.MENTION_AUTRE,
        libelle: EOptionMiseAJourActe.MENTION_AUTRE
      },
      {
        cle: EOptionMiseAJourActe.ANALYSE_MARGINALE,
        libelle: EOptionMiseAJourActe.ANALYSE_MARGINALE
      }
    ];

    expect(
      OptionMiseAJourActe.commeOptions({
        mentions: true,
        analyseMarginale: true
      })
    ).toStrictEqual(attendu);
  });

  test("Doit retourner un tableau avec les options mentions uniquement", () => {
    const attendu: Option[] = [
      {
        cle: EOptionMiseAJourActe.MENTION_SUITE_AVIS,
        libelle: EOptionMiseAJourActe.MENTION_SUITE_AVIS
      },
      {
        cle: EOptionMiseAJourActe.MENTION_AUTRE,
        libelle: EOptionMiseAJourActe.MENTION_AUTRE
      }
    ];

    expect(
      OptionMiseAJourActe.commeOptions({
        mentions: true,
        analyseMarginale: false
      })
    ).toStrictEqual(attendu);
  });

  test("Doit retourner un tableau avec l'option analyse marginale uniqement", () => {
    const attendu: Option[] = [
      {
        cle: EOptionMiseAJourActe.ANALYSE_MARGINALE,
        libelle: EOptionMiseAJourActe.ANALYSE_MARGINALE
      }
    ];

    expect(
      OptionMiseAJourActe.commeOptions({
        mentions: false,
        analyseMarginale: true
      })
    ).toStrictEqual(attendu);
  });

  test("Doit retourner le bon sous-type d'une requête de mise à jour selon l'option choisi", () => {
    expect(
      OptionMiseAJourActe.getSousType(EOptionMiseAJourActe.MENTION_SUITE_AVIS)
    ).toBe(SousTypeMiseAJour.RMAC);

    expect(
      OptionMiseAJourActe.getSousType(EOptionMiseAJourActe.MENTION_AUTRE)
    ).toBe(SousTypeMiseAJour.RMAR);

    expect(
      OptionMiseAJourActe.getSousType(EOptionMiseAJourActe.ANALYSE_MARGINALE)
    ).toBe(SousTypeMiseAJour.RMAR);
  });
});
