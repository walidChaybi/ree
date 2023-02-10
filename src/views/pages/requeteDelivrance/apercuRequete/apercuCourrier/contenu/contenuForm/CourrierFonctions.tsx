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
  NUMERO_TELEPHONE,
  OPTION,
  PAYS,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE,
  VOIE
} from "@composant/formulaire/ConstantesNomsForm";
import { SaisieCourrier } from "@model/form/delivrance/ISaisieCourrierForm";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  ACTE_NAISSANCE_NON_TROUVE_MARIAGE,
  ACTE_NON_TROUVE,
  ACTE_NON_TROUVE_ALGERIE,
  ATTESTATION_PENSION,
  DELIVRANCE_ACTE,
  DELIVRANCE_ACTE_INCOMPLET,
  DELIVRANCE_ACTE_NON_ANTHENTIQUE,
  DIVERS,
  INFORMATION_DIVERSES_MANQUANTE,
  JUSTIFICATIF_REPRESENTANT_MANQUANT,
  MANDAT_GENEALOGIQUE,
  PROPOSITION_TRANSCRIPTION,
  REFUS_DELIVRANCE_MARIAGE
} from "@model/requete/enum/DocumentDelivranceConstante";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import { OptionsCourrier } from "@model/requete/IOptionCourrier";
import { Requerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { Options } from "@util/Type";
import { getValeurOuVide } from "@util/Utils";
import { OptionCourrierFormDefaultValues } from "./sousFormulaires/OptionsCourrierForm";

const LIMIT_ORDRE_EDITION_STANTARD = 900;

function getTypesCourrierRequeteIncomplete(sousType: SousTypeDelivrance) {
  let typesCourrier;
  typesCourrier = [
    DocumentDelivrance.getOptionFromCode(INFORMATION_DIVERSES_MANQUANTE) // Courrier 117
  ];

  if (!SousTypeDelivrance.estRDDP(sousType)) {
    typesCourrier = [
      ...typesCourrier,
      DocumentDelivrance.getOptionFromCode(MANDAT_GENEALOGIQUE), // Courrier 18
      DocumentDelivrance.getOptionFromCode(JUSTIFICATIF_REPRESENTANT_MANQUANT) // Courrier 19]
    ];
  }

  return typesCourrier;
}

function getTypesCourrierActeNonDetenuAuScec(sousType: SousTypeDelivrance) {
  let typesCourrier;
  typesCourrier = [
    DocumentDelivrance.getOptionFromCode(ACTE_NON_TROUVE), // Courrier 115
    DocumentDelivrance.getOptionFromCode(ACTE_NON_TROUVE_ALGERIE), // Courrier 64
    DocumentDelivrance.getOptionFromCode(ACTE_NAISSANCE_NON_TROUVE_MARIAGE) // Courrier 24
  ];

  if (!SousTypeDelivrance.estRDDP(sousType)) {
    typesCourrier = [
      ...typesCourrier,
      DocumentDelivrance.getOptionFromCode(ATTESTATION_PENSION), // Courrier ??
      DocumentDelivrance.getOptionFromCode(PROPOSITION_TRANSCRIPTION) // Courrier ??
    ];
  }

  return typesCourrier;
}

export const getTypesCourrier = (
  requete: IRequeteDelivrance,
  acteSelected?: IResultatRMCActe[]
): Options => {
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
        DocumentDelivrance.getOptionFromCode(DIVERS) // Courrier 17
      ];
      majOptionsPourActeNaissaneOuDecesDemande(
        typesCourrier,
        requete.evenement?.natureActe
      );
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_ARCHIVE:
      typesCourrier = [
        DocumentDelivrance.getOptionFromCode(DELIVRANCE_ACTE_NON_ANTHENTIQUE) // Courrier ???
      ];
      break;
    case ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION:
    case ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE:
      typesCourrier = [
        DocumentDelivrance.getOptionFromCode(DELIVRANCE_ACTE), // Courrier 116
        DocumentDelivrance.getOptionFromCode(DELIVRANCE_ACTE_INCOMPLET) // Courrier 50
      ];
      break;
    default:
      break;
  }
  return typesCourrier;
};

export const getDefaultValuesCourrier = (
  requete: IRequeteDelivrance
): SaisieCourrier => {
  const documentReponse = getDocumentReponseAModifier(requete);
  const identiteRequerant = Requerant.organiserIdentite(requete.requerant);

  return {
    [CHOIX_COURRIER]: {
      [DELIVRANCE]: getValeurOuVide(requete.choixDelivrance?.libelle),
      [COURRIER]: documentReponse?.typeDocument
        ? documentReponse?.typeDocument
        : getTypesCourrier(requete)[0].value
    },
    [REQUERANT]: {
      [REQUERANT_LIGNE_1]: identiteRequerant.premiereLigne,
      [REQUERANT_LIGNE_2]: identiteRequerant.deuxiemeLigne
    },
    [OPTION]: OptionCourrierFormDefaultValues,
    [TEXTE_LIBRE]: {
      [TEXTE]: documentReponse?.texteLibreCourrier?.texte
        ? documentReponse?.texteLibreCourrier?.texte
        : ""
    },
    [ADRESSE]: {
      [VOIE]: getValeurOuVide(requete.requerant.adresse?.ligne4),
      [LIEU_DIT]: getValeurOuVide(requete.requerant.adresse?.ligne5),
      [COMPLEMENT_DESTINATAIRE]: getValeurOuVide(
        requete.requerant.adresse?.ligne2
      ),
      [COMPLEMENT_POINT_GEO]: getValeurOuVide(
        requete.requerant.adresse?.ligne3
      ),
      [CODE_POSTAL]: getValeurOuVide(requete.requerant.adresse?.codePostal),
      [COMMUNE]: getValeurOuVide(requete.requerant.adresse?.ville),
      [PAYS]: getValeurOuVide(requete.requerant.adresse?.pays),
      [ADRESSE_COURRIEL]: "",
      [NUMERO_TELEPHONE]: ""
    },
    [REQUETE]: {
      [MOTIF]: requete.motif ? MotifDelivrance.getKey(requete.motif) : "",
      [COMPLEMENT_MOTIF]: getValeurOuVide(requete.complementMotif),
      [NB_EXEMPLAIRE]: getValeurOuVide(requete.nbExemplaireImpression),
      [NATURE_ACTE]: "",
      [DOCUMENT_DEMANDE]: ""
    }
  };
};

export function courrierExiste(requete: IRequeteDelivrance): boolean {
  return requete.documentsReponses.some(element => {
    return DocumentDelivrance.estCourrierDelivranceEC(element.typeDocument);
  });
}

export function getDocumentReponseAModifier(
  requete: IRequeteDelivrance
): IDocumentReponse | undefined {
  let doc: IDocumentReponse | undefined = undefined;
  requete.documentsReponses.forEach(element => {
    if (DocumentDelivrance.estCourrierDelivranceEC(element.typeDocument)) {
      doc = element;
    }
  });
  return doc;
}

function majOptionsPourActeNaissaneOuDecesDemande(
  typesCourrier: Options,
  natureActeRequete?: NatureActeRequete
) {
  if (
    natureActeRequete &&
    natureActeRequete !== NatureActeRequete.NAISSANCE &&
    natureActeRequete !== NatureActeRequete.DECES
  ) {
    typesCourrier.push(
      DocumentDelivrance.getOptionFromCode(REFUS_DELIVRANCE_MARIAGE) // ???
    );
  }
}

export function controleFormulaire(
  saisieCourrier: SaisieCourrier | undefined,
  optionsChoisies: OptionsCourrier,
  setMessagesBloquant: (message: string) => void
) {
  switch (saisieCourrier?.[CHOIX_COURRIER][COURRIER]) {
    case DocumentDelivrance.getKeyForCode(DELIVRANCE_ACTE_INCOMPLET):
    case DocumentDelivrance.getKeyForCode(INFORMATION_DIVERSES_MANQUANTE):
    case DocumentDelivrance.getKeyForCode(ACTE_NON_TROUVE_ALGERIE):
    case DocumentDelivrance.getKeyForCode(PROPOSITION_TRANSCRIPTION):
    case DocumentDelivrance.getKeyForCode(REFUS_DELIVRANCE_MARIAGE):
    case DocumentDelivrance.getKeyForCode(ATTESTATION_PENSION):
    case DocumentDelivrance.getKeyForCode(ACTE_NON_TROUVE):
      return controleActeNonTrouve(
        saisieCourrier,
        optionsChoisies,
        setMessagesBloquant
      );
    case DocumentDelivrance.getKeyForCode(DIVERS):
      return controleDivers(
        saisieCourrier,
        optionsChoisies,
        setMessagesBloquant
      );
    default:
      return true;
  }
}

function controleActeNonTrouve(
  saisieCourrier: SaisieCourrier,
  optionsChoisies: OptionsCourrier,
  setMessagesBloquant: (message: string) => void
) {
  if (
    optionsChoisies.filter(option => {
      return option.ordreEdition < LIMIT_ORDRE_EDITION_STANTARD;
    }).length === 0
  ) {
    setMessagesBloquant(
      "Le choix d'une option standard est obligatoire pour ce courrier"
    );
    return false;
  }
  return true;
}

function controleDivers(
  saisieCourrier: SaisieCourrier,
  optionsChoisies: OptionsCourrier,
  setMessagesBloquant: (message: string) => void
) {
  if (
    optionsChoisies.filter(option => {
      return option.ordreEdition < LIMIT_ORDRE_EDITION_STANTARD;
    }).length === 0 &&
    saisieCourrier[TEXTE_LIBRE][TEXTE].length === 0
  ) {
    setMessagesBloquant(
      "Le choix d'une option standard ou la saisie d'un texte libre est obligatoire pour ce courrier"
    );
    return false;
  }
  return true;
}

