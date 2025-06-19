import {
  ADRESSE,
  ANNEE,
  COMPLEMENT_MOTIF,
  DATE_EVENEMENT,
  DOCUMENT_DEMANDE,
  EVENEMENT,
  JOUR,
  LIEN,
  LIEN_TITULAIRE,
  MANDANT,
  MOIS,
  MOTIF,
  NATURE_ACTE,
  NATURE_LIEN,
  NB_EXEMPLAIRE,
  NOM,
  PAYS_EVENEMENT,
  PIECES_JOINTES,
  PRENOM,
  RAISON_SOCIALE,
  REQUERANT,
  REQUETE,
  TITULAIRE1,
  TITULAIRE2,
  TYPE_MANDANT,
  VILLE_EVENEMENT
} from "@composant/formulaire/ConstantesNomsForm";
import { Evenement, LienTitulaire, Mandant, Requete } from "@model/form/delivrance/ISaisirRequetePageForm";
import { IEvenementRequete } from "@model/requete/IEvenementRequete";
import { IMandant } from "@model/requete/IMandant";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ITitulaireRequete, TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import { DEUX, UN } from "@util/Utils";
import { SaisieRequeteRDC } from "../../../../../model/form/delivrance/ISaisirRDCPageForm";
import { IdentiteFormDefaultValues } from "../sousFormulaires/identite/IdentiteForm";
import { saisieAdresse, saisiePJ, saisieRequerant, saisieTitulaire } from "./mappingCommun";

export function mappingRequeteDelivranceVersFormulaireRDC(requete: IRequeteDelivrance): SaisieRequeteRDC {
  const { titulaires, piecesJustificatives } = requete;

  const saisie = {
    [REQUETE]: saisieRequete(requete),
    [EVENEMENT]: saisieEvenement(requete.evenement),
    [TITULAIRE1]: saisieTitulaireRDC(TitulaireRequete.getTitulaireParPosition(titulaires || [], UN)),
    [TITULAIRE2]: saisieTitulaireRDC(TitulaireRequete.getTitulaireParPosition(titulaires || [], DEUX)),
    [REQUERANT]: saisieRequerant(requete),
    [MANDANT]: saisieMandant(requete.mandant),
    [LIEN_TITULAIRE]: saisieLienTitulaire(requete.requerant, requete.mandant),
    [ADRESSE]: saisieAdresse(requete)
  } as any as SaisieRequeteRDC;
  // TODO Erreur AUTRE_PROFESSIONNEL sans le any

  if (piecesJustificatives.length !== 0) {
    saisie[PIECES_JOINTES] = saisiePJ(requete);
  }

  return saisie;
}

const saisieTitulaireRDC = (titulaire?: ITitulaireRequete) => {
  const titulaireForm = saisieTitulaire(titulaire);
  return titulaireForm || IdentiteFormDefaultValues;
};

const saisieRequete = (requete?: IRequeteDelivrance): Requete => {
  return {
    [NATURE_ACTE]: NatureActeRequete.getKey(requete?.evenement?.natureActe),
    [DOCUMENT_DEMANDE]: requete?.documentDemande?.id ?? "",
    [NB_EXEMPLAIRE]: requete?.nbExemplaireImpression ?? 0,
    [MOTIF]: MotifDelivrance.getKey(requete?.motif),
    [COMPLEMENT_MOTIF]: requete?.complementMotif ?? ""
  };
};

const saisieEvenement = (evenement?: IEvenementRequete): Evenement => {
  return {
    [DATE_EVENEMENT]: {
      [JOUR]: evenement?.jour?.toString() ?? "",
      [MOIS]: evenement?.mois?.toString() ?? "",
      [ANNEE]: evenement?.annee?.toString() ?? ""
    },
    [VILLE_EVENEMENT]: evenement?.ville ?? "",
    [PAYS_EVENEMENT]: evenement?.pays ?? ""
  };
};

const saisieMandant = (mandant?: IMandant): Mandant => {
  return {
    [TYPE_MANDANT]: TypeMandant.getKey(mandant?.type) ?? "",
    [NOM]: mandant?.nom ?? "",
    [PRENOM]: mandant?.prenom ?? "",
    [RAISON_SOCIALE]: mandant?.raisonSociale ?? ""
  };
};

const saisieLienTitulaire = (requerant: IRequerant, mandant?: IMandant): LienTitulaire => {
  switch (requerant.qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      return {
        [LIEN]: TypeLienMandant.getKey(mandant?.typeLien) ?? "",
        [NATURE_LIEN]: mandant?.natureLien ?? ""
      };
    case Qualite.INSTITUTIONNEL:
    case Qualite.AUTRE_PROFESSIONNEL:
    case Qualite.PARTICULIER:
    default:
      return {
        [LIEN]: TypeLienRequerant.getKey(requerant.lienRequerant?.lien) ?? "",
        [NATURE_LIEN]: requerant.lienRequerant?.natureLien ?? ""
      };
  }
};
