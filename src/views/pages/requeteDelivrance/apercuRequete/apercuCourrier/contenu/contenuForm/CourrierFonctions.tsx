import {
  ADRESSE,
  ADRESSE_COURRIEL,
  CHOIX_COURRIER,
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_MOTIF,
  COMPLEMENT_POINT_GEO,
  COURRIER,
  DELIVRANCE,
  DOCUMENT_DEMANDE,
  LIEU_DIT,
  MOTIF,
  NATURE_ACTE,
  NB_EXEMPLAIRE,
  NOM,
  NUMERO_TELEPHONE,
  OPTION,
  PAYS,
  PRENOM,
  RAISON_SOCIALE,
  REQUERANT,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";

import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { Options } from "@util/Type";
import { OptionCourrierFormDefaultValues } from "./sousFormulaires/OptionsCourrierForm";

const LIMIT_ORDRE_EDITION_STANTARD = 900;

function getTypesCourrierRequeteIncomplete(sousType: SousTypeDelivrance) {
  let typesCourrier;
  typesCourrier = [
    DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.INFORMATION_DIVERSES_MANQUANTE) // Courrier 117
  ];

  if (!SousTypeDelivrance.estRDDP(sousType)) {
    typesCourrier = [
      ...typesCourrier,
      DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.MANDAT_GENEALOGIQUE), // Courrier 18
      DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.JUSTIFICATIF_REPRESENTANT_MANQUANT) // Courrier 19]
    ];
  }

  return typesCourrier;
}

function getTypesCourrierActeNonDetenuAuScec(sousType: SousTypeDelivrance) {
  let typesCourrier;
  typesCourrier = [
    DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.ACTE_NON_TROUVE), // Courrier 115
    DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.ACTE_NON_TROUVE_ALGERIE), // Courrier 64
    DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.ACTE_NAISSANCE_NON_TROUVE_MARIAGE) // Courrier 24
  ];

  if (!SousTypeDelivrance.estRDDP(sousType)) {
    typesCourrier = [
      ...typesCourrier,
      DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.ATTESTATION_PENSION), // Courrier ??
      DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.PROPOSITION_TRANSCRIPTION) // Courrier ??
    ];
  }

  return typesCourrier;
}

export const getTypesCourrier = (requete: IRequeteDelivrance): Options => {
  let typesCourrier: Options = [];
  switch (requete.choixDelivrance) {
    case ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE:
      typesCourrier = getTypesCourrierRequeteIncomplete(requete.sousType);
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC:
      typesCourrier = getTypesCourrierActeNonDetenuAuScec(requete.sousType);
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_DIVERS:
      typesCourrier = [
        DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.DIVERS) // Courrier 17
      ];
      majOptionsPourActeNaissaneOuDecesDemande(typesCourrier, requete.evenement?.natureActe);
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      typesCourrier = [
        DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE_NON_ANTHENTIQUE) // Courrier ???
      ];
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      typesCourrier = [
        DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE), // Courrier 116
        DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE_INCOMPLET) // Courrier 50
      ];
      break;
    default:
      break;
  }
  return typesCourrier;
};

export const getDefaultValuesCourrier = (requete: IRequeteDelivrance): SaisieCourrier => {
  const documentReponse = getDocumentReponseAModifier(requete);

  return {
    [CHOIX_COURRIER]: {
      [DELIVRANCE]: requete.choixDelivrance?.libelle ?? "",
      [COURRIER]: documentReponse?.typeDocument ? documentReponse?.typeDocument : getTypesCourrier(requete)[0].cle
    },
    [REQUERANT]: {
      [RAISON_SOCIALE]: Requerant.getRaisonSociale(requete.requerant) ?? "",
      [NOM]: Requerant.getNomUsageOuNomFamille(requete.requerant) ?? "",
      [PRENOM]: Requerant.getPrenom(requete.requerant)
    },
    [OPTION]: OptionCourrierFormDefaultValues,
    [TEXTE_LIBRE]: {
      [TEXTE]: documentReponse?.texteLibreCourrier?.texte ? documentReponse?.texteLibreCourrier?.texte : ""
    },
    [ADRESSE]: {
      [VOIE]: requete.requerant.adresse?.ligne4 ?? "",
      [LIEU_DIT]: requete.requerant.adresse?.ligne5 ?? "",
      [COMPLEMENT_DESTINATAIRE]: requete.requerant.adresse?.ligne2 ?? "",
      [COMPLEMENT_POINT_GEO]: requete.requerant.adresse?.ligne3 ?? "",
      [CODE_POSTAL]: requete.requerant.adresse?.codePostal ?? "",
      [COMMUNE]: requete.requerant.adresse?.ville ?? "",
      [PAYS]: requete.requerant.adresse?.pays ?? "",
      [ADRESSE_COURRIEL]: "",
      [NUMERO_TELEPHONE]: ""
    },
    [REQUETE]: {
      [MOTIF]: requete.motif ? MotifDelivrance.getKey(requete.motif) : "",
      [COMPLEMENT_MOTIF]: requete.complementMotif ?? "",
      [NB_EXEMPLAIRE]: requete.nbExemplaireImpression ?? 0,
      [NATURE_ACTE]: "",
      [DOCUMENT_DEMANDE]: DocumentDelivrance.getCopieIntegraleUUID()
    }
  };
};

export function courrierExiste(requete: IRequeteDelivrance): boolean {
  return requete.documentsReponses.some(element => {
    return DocumentDelivrance.estCourrierDelivranceEC(element.typeDocument);
  });
}

export function getDocumentReponseAModifier(requete: IRequeteDelivrance): IDocumentReponse | undefined {
  let doc: IDocumentReponse | undefined = undefined;
  requete.documentsReponses.forEach(element => {
    if (DocumentDelivrance.estCourrierDelivranceEC(element.typeDocument)) {
      doc = element;
    }
  });
  return doc;
}

function majOptionsPourActeNaissaneOuDecesDemande(typesCourrier: Options, natureActeRequete?: NatureActeRequete) {
  if (natureActeRequete && natureActeRequete !== NatureActeRequete.NAISSANCE && natureActeRequete !== NatureActeRequete.DECES) {
    typesCourrier.push(
      DocumentDelivrance.versOptionDepuisCode(ECodeDocumentDelivrance.REFUS_DELIVRANCE_MARIAGE) // ???
    );
  }
}

export function controleFormulaire(
  saisieCourrier: SaisieCourrier | undefined,
  optionsChoisies: OptionsCourrier,
  setMessageBloquant: (message: string) => void
) {
  switch (saisieCourrier?.[CHOIX_COURRIER]?.[COURRIER]) {
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.DELIVRANCE_ACTE_INCOMPLET):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.INFORMATION_DIVERSES_MANQUANTE):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.ACTE_NON_TROUVE_ALGERIE):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.PROPOSITION_TRANSCRIPTION):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.REFUS_DELIVRANCE_MARIAGE):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.ATTESTATION_PENSION):
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.ACTE_NON_TROUVE):
      return controleActeNonTrouve(saisieCourrier, optionsChoisies, setMessageBloquant);
    case DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.DIVERS):
      return controleDivers(saisieCourrier, optionsChoisies, setMessageBloquant);
    default:
      return true;
  }
}

function controleActeNonTrouve(
  saisieCourrier: SaisieCourrier,
  optionsChoisies: OptionsCourrier,
  setMessageBloquant: (message: string) => void
) {
  if (
    optionsChoisies.filter(option => {
      return option.ordreEdition < LIMIT_ORDRE_EDITION_STANTARD;
    }).length === 0
  ) {
    setMessageBloquant("Le choix d'une option standard est obligatoire pour ce courrier");
    return false;
  }
  return true;
}

function controleDivers(saisieCourrier: SaisieCourrier, optionsChoisies: OptionsCourrier, setMessageBloquant: (message: string) => void) {
  if (
    optionsChoisies.filter(option => {
      return option.ordreEdition < LIMIT_ORDRE_EDITION_STANTARD;
    }).length === 0 &&
    saisieCourrier[TEXTE_LIBRE]?.[TEXTE]?.length === 0
  ) {
    setMessageBloquant("Le choix d'une option standard ou la saisie d'un texte libre est obligatoire pour ce courrier");
    return false;
  }
  return true;
}
