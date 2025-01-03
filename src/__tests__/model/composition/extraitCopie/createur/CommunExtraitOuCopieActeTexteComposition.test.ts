import { CommunExtraitOuCopieActeTexteComposition } from "@model/composition/extraitCopie/createur/CommunExtraitOuCopieActeTexteComposition";
import { IExtraitCopieComposition } from "@model/composition/extraitCopie/IExtraitCopieComposition";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention } from "@model/etatcivil/enum/NatureMention";
import { LIBELLE_FONCTION_AGENT_1 } from "@model/parametres/clesParametres";
import { ParametreBaseRequete } from "@model/parametres/enum/ParametresBaseRequete";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { expect, test } from "vitest";

test("Attendu: creerFormuleSignatureDelivrance fonctionne correctement", () => {
  const composition = {} as IExtraitCopieComposition;
  let choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE;
  let sousType = SousTypeDelivrance.RDD;
  let natureActe = NatureActe.ADOPTION;

  CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
  expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[0]);

  sousType = SousTypeDelivrance.RDC;
  CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
  expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[0]);

  choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION;
  CommunExtraitOuCopieActeTexteComposition.creerFormuleSignatureDelivrance(composition, choixDelivrance, sousType, natureActe);
  expect(composition.formule_signature_delivrance).toBe(CommunExtraitOuCopieActeTexteComposition.FORMULE_SIGNATURE_DELIVRANCE[1]);

  choixDelivrance = ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION;
  natureActe = NatureActe.ADOPTION_SIMPLE;
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
  let natureActe = NatureActe.ADOPTION;
  let validation = Validation.O;

  CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
  expect(composition.pas_de_bloc_signature).toBeFalsy();
  expect(composition.cachet_signature).toBe(ParametreBaseRequete.getEnumFor(LIBELLE_FONCTION_AGENT_1).libelle);

  validation = Validation.E;
  CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
  expect(composition.pas_de_bloc_signature).toBeTruthy();

  sousType = SousTypeDelivrance.RDDP;
  validation = Validation.O;
  CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
  expect(composition.pas_de_signature).toBeTruthy();
  expect(composition.pas_de_nomPrenomAgent).toBeTruthy();

  sousType = SousTypeDelivrance.RDD;
  choixDelivrance = ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE;
  CommunExtraitOuCopieActeTexteComposition.creerBlocSignature(composition, choixDelivrance, sousType, natureActe, validation);
  expect(composition.pas_de_bloc_signature).toBeTruthy();
});

test("Atttendu: getTexteMentions fonctionne correctement", () => {
  const opposableAuTiers: INatureMention = {
    opposableAuTiers: true
  } as INatureMention;
  const nonOpposableAuTiers: INatureMention = {
    opposableAuTiers: false
  } as INatureMention;
  const mention1 = {
    id: "1",
    numeroOrdre: 1,
    numeroOrdreExtrait: 1,
    typeMention: {
      natureMention: opposableAuTiers
    },
    textes: {
      texteApposition: "texteApposition",
      texteMentionDelivrance: "texteMention",
      texteMention: "texteMention",
      texteMentionPlurilingue: ""
    }
  } as IMention;
  const mention2 = {
    id: "2",
    numeroOrdre: 2,
    numeroOrdreExtrait: 2,
    typeMention: {
      natureMention: opposableAuTiers
    },
    textes: {
      texteApposition: "texteApposition2",
      texteMentionDelivrance: "texteMention2",
      texteMention: "texteMention2",
      texteMentionPlurilingue: ""
    }
  } as IMention;
  const mention3 = {
    id: "3",
    numeroOrdre: 3,
    numeroOrdreExtrait: 3,
    typeMention: {
      natureMention: nonOpposableAuTiers
    },
    textes: {
      texteApposition: "texteApposition3",
      texteMentionDelivrance: "texteMention3",
      texteMention: "texteMention3",
      texteMentionPlurilingue: ""
    }
  } as IMention;
  const mention4 = {
    id: "4",
    numeroOrdre: 4,
    numeroOrdreExtrait: 4,
    typeMention: {
      natureMention: opposableAuTiers
    },
    textes: {
      texteApposition: undefined,
      texteMentionDelivrance: "texteMention4",
      texteMention: "texteMention4",
      texteMentionPlurilingue: ""
    }
  } as IMention;

  const mentions = [mention3, mention4, mention2, mention1];
  const texteMentions = CommunExtraitOuCopieActeTexteComposition.getTexteMentions(mentions, false, ["1"]);
  expect(texteMentions).toEqual(["texteMention2", "texteMention3", "texteMention4"]);
});
