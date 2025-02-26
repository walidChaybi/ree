import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import {
  IMentionAffichage,
  mappingVersMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectue
} from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  aucuneMentionsAffichageNationalite,
  handleCheckBox,
  handleReorga,
  miseAjourEnFonctionNature,
  texteEnFonctionOpposableAuTiers,
  texteNonModifieNatureChangePasDeTexteDelivrance,
  validerMentions
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { describe, expect, test, vi } from "vitest";
import { documentReponseCopieIntegrale, documentReponseExtraitAvecFiliation } from "../../../../../../../mock/data/DocumentReponse";
import { DOCUMENT_DELIVRANCE } from "../../../../../../../mock/data/NomenclatureDocumentDelivrance";
import { NATURE_MENTION } from "../../../../../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../../../../../mock/data/NomenclatureTypeMention";
import { ficheActe2, ficheActeMariage } from "../../../../../../../mock/data/ficheActe";
import { acte } from "../../../../../../../mock/data/ficheEtBandeau/ficheActe";
import { mentionsAffichage, mentionsApi } from "../../../../../../../mock/data/mentions";

describe("Test GestionMentionUtil", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  const mentionApi = {
    textes: {
      texteMention: "texte mention",
      texteApposition: "texte apposition"
    },
    typeMention: {
      natureMention: { opposableAuTiers: false } as INatureMention
    },
    numeroOrdreExtrait: 1,
    id: "1"
  } as IMention;

  const mentionOpposable: IMentionAffichage = {
    texte: "texte mention",
    estPresent: true,
    nature: { opposableAuTiers: true } as INatureMention,
    id: "1",
    numeroOrdre: 0,
    estSupprimable: true,
    estModifiable: false
  };
  const mentionNonOpposable: IMentionAffichage = {
    texte: "texte mention",
    estPresent: true,
    nature: { opposableAuTiers: false } as INatureMention,
    id: "1",
    numeroOrdre: 0,
    estSupprimable: true,
    estModifiable: false
  };

  test("texteEnFonctionOpposableAuTiers", () => {
    expect(texteEnFonctionOpposableAuTiers(mentionOpposable, mentionNonOpposable, mentionApi)).toBe("texte mention");
    expect(texteEnFonctionOpposableAuTiers(mentionNonOpposable, mentionOpposable, mentionApi)).toBe("texte mention texte apposition");
  });

  test("texteNonModifieNatureChangePasDeTexteDelivrance", () => {
    expect(texteNonModifieNatureChangePasDeTexteDelivrance(mentionNonOpposable, mentionOpposable, mentionApi)).toBeTruthy();
  });

  test("modificationEffectue", () => {
    expect(modificationEffectue([mentionNonOpposable], [mentionApi], documentReponseExtraitAvecFiliation)).toBeTruthy();
  });

  test("miseAjourEnFonctionNature", () => {
    let mentionsTest: IMentionAffichage[];
    function setMentions(arg: IMentionAffichage[]) {
      mentionsTest = arg;
    }
    let mentionSelectTest: IMentionAffichage;
    function setMentionSelect(arg: IMentionAffichage) {
      mentionSelectTest = arg;
    }

    miseAjourEnFonctionNature([mentionNonOpposable], 0, mentionOpposable, [mentionApi], 0, setMentionSelect, setMentions);

    expect(mentionSelectTest!).toStrictEqual({
      estSupprimable: true,
      estModifiable: false,
      texte: "texte mention texte apposition",
      estPresent: true,
      nature: { opposableAuTiers: true },
      id: "1",
      numeroOrdre: 0
    });

    expect(mentionsTest!).toStrictEqual([
      {
        estSupprimable: true,
        estModifiable: false,
        texte: "texte mention texte apposition",
        estPresent: true,
        nature: { opposableAuTiers: false },
        id: "1",
        numeroOrdre: 0
      }
    ]);
  });

  test("handleCheckBox", () => {
    let mentionsTest: IMentionAffichage[];
    function setMentions(arg: IMentionAffichage[]) {
      mentionsTest = arg;
    }

    handleCheckBox([mentionNonOpposable], setMentions, 0);

    expect(mentionsTest!).toStrictEqual([
      {
        estSupprimable: true,
        estModifiable: false,
        texte: "texte mention texte apposition",
        estPresent: false,
        nature: { opposableAuTiers: false },
        id: "1",
        numeroOrdre: 0
      }
    ]);
  });

  test("handleReorga", () => {
    let mentionsTest: IMentionAffichage[];
    function setMentions(arg: IMentionAffichage[]) {
      mentionsTest = arg;
    }

    handleReorga([mentionNonOpposable, mentionOpposable], setMentions, 0, 1);

    expect(mentionsTest!).toStrictEqual([mentionOpposable, mentionNonOpposable]);
  });

  test("mappingVersMentionAffichage", () => {
    expect(mappingVersMentionAffichage([mentionApi], documentReponseExtraitAvecFiliation)).toStrictEqual([
      {
        nature: { opposableAuTiers: false },
        texte: "texte mention",
        estPresent: true,
        id: "1",
        numeroOrdre: 1,
        estSupprimable: false,
        estModifiable: false
      }
    ]);
  });

  test("mappingVersMentionApi", () => {
    expect(mappingVersMentionsApi([mentionApi], [mentionOpposable], "28580709-06dd-4df2-bf6e-70a9482940a1")).toStrictEqual({
      mentionsAEnvoyer: [
        {
          id: "1",
          textes: {
            texteMentionDelivrance: "texte mention",
            texteMentionPlurilingue: undefined
          },
          typeMention: {
            idNatureMention: "",
            idTypeMention: "126ad458-fd77-4c8c-bd88-db0b818f7d91"
          },
          numeroOrdreExtrait: 1
        }
      ],
      mentionsRetirees: []
    });
  });

  test("aucuneMentionsNationalite", () => {
    expect(aucuneMentionsAffichageNationalite([mentionOpposable])).toBeTruthy();
  });

  test("Attendu: validerMentions fonctionne correctement", () => {
    const sauvegardeFonctionConfirm = window.confirm;
    window.confirm = () => true;
    const sauvegarderMentions = vi.fn();

    const mentionsAffichageAvecUnElementdeMoins = mentionsAffichage.slice(1);
    const mentionsApi1 = mentionsApi as any as IMention[];

    // Copie intégrale et une modification des mentions a été effectuée
    ////////////////////////////////////////////////////////////////////
    validerMentions(mentionsAffichageAvecUnElementdeMoins, sauvegarderMentions, mentionsApi1, acte, documentReponseCopieIntegrale);
    expect(sauvegarderMentions).toBeCalledTimes(1);

    window.confirm = () => false;
    sauvegarderMentions.mockClear();

    validerMentions(mentionsAffichageAvecUnElementdeMoins, sauvegarderMentions, mentionsApi1, acte, documentReponseCopieIntegrale);

    expect(sauvegarderMentions).toBeCalledTimes(0);

    // Ré-initialisation
    ////////////////////////////////////////////////////////////////////
    window.confirm = () => true;
    sauvegarderMentions.mockClear();

    // Acte Naissance de type ACQ et aucune mention de nationalité
    ////////////////////////////////////////////////////////////////////
    validerMentions(mentionsAffichage, sauvegarderMentions, mentionsApi1, mapActe(ficheActe2.data), documentReponseExtraitAvecFiliation);

    expect(sauvegarderMentions).toBeCalledTimes(1);

    window.confirm = () => false;
    sauvegarderMentions.mockClear();

    validerMentions(mentionsAffichage, sauvegarderMentions, mentionsApi1, mapActe(ficheActe2.data), documentReponseExtraitAvecFiliation);

    expect(sauvegarderMentions).toBeCalledTimes(0);

    // Ré-initialisation
    ////////////////////////////////////////////////////////////////////
    window.confirm = () => true;
    sauvegarderMentions.mockClear();

    // Il y a une mention interdite pour l'acte de mariage
    ////////////////////////////////////////////////////////////////////
    validerMentions(
      mentionsAffichage,
      sauvegarderMentions,
      mentionsApi1,
      mapActe(ficheActeMariage.data),
      documentReponseExtraitAvecFiliation
    );

    window.confirm = () => false;
    sauvegarderMentions.mockClear();

    validerMentions(
      mentionsAffichage,
      sauvegarderMentions,
      mentionsApi1,
      mapActe(ficheActeMariage.data),
      documentReponseExtraitAvecFiliation
    );

    expect(sauvegarderMentions).toBeCalledTimes(0);

    // Restauration du confirm
    window.confirm = sauvegardeFonctionConfirm;
  });
});
