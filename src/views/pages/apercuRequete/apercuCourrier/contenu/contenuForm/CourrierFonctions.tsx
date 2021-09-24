import { NatureActe } from "../../../../../../model/etatcivil/enum/NatureActe";
import { ChoixDelivrance } from "../../../../../../model/requete/v2/enum/ChoixDelivrance";
import {
  ACTE_NAISSANCE_NON_TROUVE_MARIAGE,
  ACTE_NON_TROUVE,
  ACTE_NON_TROUVE_ALGERIE,
  ATTESTATION_PENSION,
  DELIVRANCE_ACTE,
  DELIVRANCE_ACTE_INCOMPLET,
  DELIVRANCE_ACTE_NON_ANTHENTIQUE,
  DIVERS,
  DocumentDelivrance,
  INFORMATION_DIVERSES_MANQUANTE,
  JUSTIFICATIF_REPRESENTANT_MANQUANT,
  MANDAT_GENEALOGIQUE,
  PROPOSITION_TRANSCRIPTION,
  REFUS_DELIVRANCE_MARIAGE
} from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../../../../../model/requete/v2/enum/MotifDelivrance";
import { IDocumentReponse } from "../../../../../../model/requete/v2/IDocumentReponse";
import { Requerant } from "../../../../../../model/requete/v2/IRequerant";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { Options } from "../../../../../common/util/Type";
import { getValeurOuVide } from "../../../../../common/util/Utils";
import {
  CODE_POSTAL,
  COMMUNE,
  COMPLEMENT_DESTINATAIRE,
  COMPLEMENT_MOTIF,
  COMPLEMENT_POINT_GEO,
  LIEU_DIT,
  MOTIF,
  NB_EXEMPLAIRE,
  PAYS,
  VOIE
} from "../../../../saisirRequete/modelForm/ISaisirRequetePageModel";
import {
  ADRESSE,
  CHOIX_COURRIER,
  COURRIER,
  DELIVRANCE,
  OPTION,
  REQUERANT,
  REQUERANT_LIGNE_1,
  REQUERANT_LIGNE_2,
  REQUETE,
  TEXTE,
  TEXTE_LIBRE
} from "../modelForm/ISaisiePageModel";
import { OptionCourrierFormDefaultValues } from "./sousFormulaires/OptionsCourrierForm";

export const getTypesCourrier = (
  requete: IRequeteDelivrance,
  acteSelected?: IResultatRMCActe[]
): Options => {
  let typesCourrier: Options = [];
  switch (requete.choixDelivrance) {
    case ChoixDelivrance.REP_SANS_DEL_EC_REQUETE_INCOMPLETE:
      typesCourrier = [
        DocumentDelivrance.getOptionFromCode(INFORMATION_DIVERSES_MANQUANTE), // Courrier 117
        DocumentDelivrance.getOptionFromCode(MANDAT_GENEALOGIQUE), // Courrier 18
        DocumentDelivrance.getOptionFromCode(JUSTIFICATIF_REPRESENTANT_MANQUANT) // Courrier 19
      ];
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_ACTE_NON_DETENU_AU_SCEC:
      typesCourrier = [
        DocumentDelivrance.getOptionFromCode(ACTE_NON_TROUVE), // Courrier 115
        DocumentDelivrance.getOptionFromCode(ACTE_NON_TROUVE_ALGERIE), // Courrier 64
        DocumentDelivrance.getOptionFromCode(ACTE_NAISSANCE_NON_TROUVE_MARIAGE), // Courrier 24
        DocumentDelivrance.getOptionFromCode(ATTESTATION_PENSION), // Courrier ??
        DocumentDelivrance.getOptionFromCode(PROPOSITION_TRANSCRIPTION) // Courrier ??
      ];
      break;
    case ChoixDelivrance.REP_SANS_DEL_EC_DIVERS:
      typesCourrier = [
        DocumentDelivrance.getOptionFromCode(DIVERS), // Courrier 17
        DocumentDelivrance.getOptionFromCode(REFUS_DELIVRANCE_MARIAGE) // Courrier ???
      ];
      majOptionsPourActeNaissaneOuDecesSelectionne(typesCourrier, acteSelected);
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

export const getDefaultValuesCourrier = (requete: IRequeteDelivrance) => {
  const documentReponse = getDocumentReponseAModifier(requete);
  const identiteRequerant = Requerant.organiserIdentite(requete.requerant);

  return {
    [CHOIX_COURRIER]: {
      [DELIVRANCE]: requete.choixDelivrance?.libelle,
      [COURRIER]: documentReponse?.typeDocument
        ? documentReponse?.typeDocument
        : ""
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
      [VOIE]: requete.requerant.adresse?.ligne4,
      [LIEU_DIT]: requete.requerant.adresse?.ligne5,
      [COMPLEMENT_DESTINATAIRE]: requete.requerant.adresse?.ligne2,
      [COMPLEMENT_POINT_GEO]: requete.requerant.adresse?.ligne3,
      [CODE_POSTAL]: requete.requerant.adresse?.codePostal,
      [COMMUNE]: requete.requerant.adresse?.ville,
      [PAYS]: requete.requerant.adresse?.pays
    },
    [REQUETE]: {
      [MOTIF]: requete.motif ? MotifDelivrance.getKey(requete.motif) : "",
      [COMPLEMENT_MOTIF]: getValeurOuVide(requete.complementMotif),
      [NB_EXEMPLAIRE]: getValeurOuVide(requete.nbExemplaireImpression)
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

function majOptionsPourActeNaissaneOuDecesSelectionne(
  typesCourrier: Options,
  acteSelected?: IResultatRMCActe[]
) {
  if (
    acteSelected &&
    acteSelected.some(
      element =>
        element.nature === NatureActe.NAISSANCE.libelle ||
        element.nature === NatureActe.DECES.libelle
    )
  ) {
    typesCourrier.push(
      DocumentDelivrance.getOptionFromCode(REFUS_DELIVRANCE_MARIAGE)
    );
  }
}
