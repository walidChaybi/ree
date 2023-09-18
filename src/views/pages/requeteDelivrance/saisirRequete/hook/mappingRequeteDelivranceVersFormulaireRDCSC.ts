import {
  ADRESSE,
  DOCUMENT,
  PIECES_JOINTES,
  REQUERANT,
  TITULAIRES
} from "@composant/formulaire/ConstantesNomsForm";
import { SaisieRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ITitulaireRequete,
  TitulaireRequete
} from "@model/requete/ITitulaireRequete";
import { DEUX, UN } from "@util/Utils";
import { IdentiteFormDefaultValuesRDCSC } from "../sousFormulaires/identite/IdentiteForm";
import {
  saisieAdresse,
  saisiePJ,
  saisieRequerant,
  saisieTitulaire
} from "./mappingCommun";

export function mappingRequeteDelivranceVersFormulaireRDCSC(
  requete: IRequeteDelivrance
): SaisieRequeteRDCSC {
  const { titulaires, documentDemande, piecesJustificatives } = requete;

  const saisie = {
    [DOCUMENT]: DocumentDelivrance.getUuidFromDocument(documentDemande),
    [TITULAIRES]: {
      titulaire1: saisieTitulaireRDCSC(
        TitulaireRequete.getTitulaireParPosition(titulaires || [], UN)
      ),
      titulaire2: saisieTitulaireRDCSC(
        TitulaireRequete.getTitulaireParPosition(titulaires || [], DEUX)
      )
    },
    [REQUERANT]: saisieRequerant(requete),
    [ADRESSE]: saisieAdresse(requete)
  } as any as SaisieRequeteRDCSC;
  // TODO Erreur AUTRE_PROFESSIONNEL sans le any

  if (piecesJustificatives.length !== 0) {
    saisie[PIECES_JOINTES] = saisiePJ(requete);
  }

  return saisie;
}

export const saisieTitulaireRDCSC = (titulaire?: ITitulaireRequete) => {
  const titulaireForm = saisieTitulaire(titulaire);
  return titulaireForm || IdentiteFormDefaultValuesRDCSC;
};


