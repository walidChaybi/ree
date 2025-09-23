import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { PARAMETRE_BASE_REQUETE } from "@mock/data/NomenclatureParametresBaseRequete";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { CommunExtraitOuCopieActeTexteComposition } from "@model/composition/extraitCopie/createur/CommunExtraitOuCopieActeTexteComposition";
import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMentionDto, Mention } from "@model/etatcivil/acte/mention/Mention";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { LIBELLE_FONCTION_AGENT_1 } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { describe, expect, test } from "vitest";

describe("Test CommunExtraitOuCopieActeTexteComposition", () => {
  ParametreBaseRequete.init(PARAMETRE_BASE_REQUETE);
  test("Attendu: creerFormuleSignatureDelivrance fonctionne correctement", () => {
    const composition = {} as IExtraitCopieComposition;
    let choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
    let sousType = SousTypeDelivrance.RDD;
    let natureActe: keyof typeof ENatureActe = "ADOPTION";

    CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
    expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[0]);

    sousType = SousTypeDelivrance.RDC;
    CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
    expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[0]);

    choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
    CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
    expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[1]);

    choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
    natureActe = "ADOPTION_SIMPLE";
    CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
    expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[3]);

    sousType = SousTypeDelivrance.RDDP;
    CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
    expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[2]);
  });

  test("Attendu: creerBlocSignature fonctionne correctement", () => {
    const composition = {} as IExtraitCopieComposition;
    let choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
    let sousType = SousTypeDelivrance.RDD;
    let natureActe: keyof typeof ENatureActe = "ADOPTION";
    let validation = EValidation.O;

    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
    expect(composition.pas_de_bloc_signature).toBeFalsy();
    expect(composition.cachet_signature).toBe(ParametreBaseRequete.depuisCle(LIBELLE_FONCTION_AGENT_1)?.libelle);

    validation = EValidation.E;
    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
    expect(composition.pas_de_bloc_signature).toBeTruthy();

    sousType = SousTypeDelivrance.RDDP;
    validation = EValidation.O;
    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
    expect(composition.pas_de_signature).toBeTruthy();
    expect(composition.pas_de_nomPrenomAgent).toBeTruthy();

    sousType = SousTypeDelivrance.RDD;
    choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
    CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
    expect(composition.pas_de_bloc_signature).toBeTruthy();
  });

  test("Atttendu: getTexteMentions fonctionne correctement", () => {
    NatureMention.init(NATURE_MENTION);
    TypeMention.init(TYPE_MENTION);

    const idTypeMentionAvecNatureOpposableAuTiers = "eac6d665-ef10-4ed0-b617-e4b507f947d7";
    const idTypeMentionAvecNatureNonOpposableAuTiers = "b04b3fd5-98fe-4ad4-b32b-951dcccce4c3";

    const mention1: IMentionDto = {
      id: "1",
      numeroOrdre: 1,
      numeroOrdreExtrait: 1,
      typeMention: {
        idTypeMention: idTypeMentionAvecNatureOpposableAuTiers
      },
      textes: {
        texteApposition: "texteApposition",
        texteMentionDelivrance: "texteMention",
        texteMention: "texteMention",
        texteMentionPlurilingue: ""
      }
    };
    const mention2: IMentionDto = {
      ...mention1,
      id: "2",
      numeroOrdre: 2,
      numeroOrdreExtrait: 2,
      typeMention: {
        idTypeMention: idTypeMentionAvecNatureOpposableAuTiers
      },
      textes: {
        texteApposition: "texteApposition2",
        texteMentionDelivrance: "texteMention2",
        texteMention: "texteMention2",
        texteMentionPlurilingue: ""
      }
    };
    const mention3: IMentionDto = {
      ...mention1,
      id: "3",
      numeroOrdre: 3,
      numeroOrdreExtrait: 3,
      typeMention: {
        idTypeMention: idTypeMentionAvecNatureNonOpposableAuTiers
      },
      textes: {
        texteApposition: "texteApposition3",
        texteMentionDelivrance: "texteMention3",
        texteMention: "texteMention3",
        texteMentionPlurilingue: ""
      }
    };
    const mention4: IMentionDto = {
      ...mention1,
      id: "4",
      numeroOrdre: 4,
      numeroOrdreExtrait: 4,
      typeMention: {
        idTypeMention: idTypeMentionAvecNatureOpposableAuTiers
      },
      textes: {
        texteApposition: undefined,
        texteMentionDelivrance: "texteMention4",
        texteMention: "texteMention4",
        texteMentionPlurilingue: ""
      }
    };

    const mentions = [mention3, mention4, mention2, mention1]
      .map(Mention.depuisDto)
      .filter((mention): mention is Mention => mention !== null);
    const texteMentions = CommunExtraitOuCopieActeTexteComposition.getTexteMentions(mentions, false, ["1"]);
    expect(texteMentions).toEqual(["texteMention2", "texteMention3", "texteMention4"]);
  });
});
