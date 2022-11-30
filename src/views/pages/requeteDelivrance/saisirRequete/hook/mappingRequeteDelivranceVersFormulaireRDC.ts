import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { Qualite } from "@model/requete/enum/Qualite";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import { IEvenementReqDelivrance } from "@model/requete/IEvenementReqDelivrance";
import { IMandant } from "@model/requete/IMandant";
import { IRequerant } from "@model/requete/IRequerant";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { TitulaireRequete } from "@model/requete/ITitulaireRequete";
import { getValeurOuVide } from "@util/Utils";
import {
  ADRESSE,
  EVENEMENT,
  LIEN_TITULAIRE,
  MANDANT,
  REQUERANT,
  REQUETE,
  SaisieRequeteRDC,
  TITULAIRE1,
  TITULAIRE2
} from "../modelForm/ISaisirRDCPageModel";
import {
  ANNEE,
  COMPLEMENT_MOTIF,
  DATE_EVENEMENT,
  DOCUMENT_DEMANDE,
  Evenement,
  JOUR,
  LIEN,
  LienTitulaire,
  Mandant,
  MOIS,
  MOTIF,
  NATURE_ACTE,
  NATURE_LIEN,
  NB_EXEMPLAIRE,
  NOM,
  PAYS_EVENEMENT,
  PRENOM,
  RAISON_SOCIALE,
  Requete,
  TYPE_MANDANT,
  VILLE_EVENEMENT
} from "../modelForm/ISaisirRequetePageModel";
import {
  saisieAdresse,
  saisieRequerant,
  saisieTitulaire
} from "./mappingRequeteDelivranceVersFormulaireRDCSC";

export function mappingRequeteDelivranceVersFormulaireRDC(
  requete: IRequeteDelivrance
): SaisieRequeteRDC {
  const { titulaires } = requete;

  return {
    [REQUETE]: saisieRequete(requete),
    [EVENEMENT]: saisieEvenement(requete.evenement),
    [TITULAIRE1]: saisieTitulaire(
      TitulaireRequete.getTitulaireByPosition({ titulaires, position: 1 })
    ),
    [TITULAIRE2]: saisieTitulaire(
      TitulaireRequete.getTitulaireByPosition({ titulaires, position: 2 })
    ),
    [REQUERANT]: saisieRequerant(requete),
    [MANDANT]: saisieMandant(requete.mandant),
    [LIEN_TITULAIRE]: saisieLienTitulaire(requete.requerant, requete.mandant),
    [ADRESSE]: saisieAdresse(requete)
  } as SaisieRequeteRDC;
}

const saisieRequete = (requete?: IRequeteDelivrance): Requete => {
  return {
    [NATURE_ACTE]: getValeurOuVide(
      NatureActeRequete.getKey(requete?.evenement?.natureActe)
    ),
    [DOCUMENT_DEMANDE]: getValeurOuVide(
      DocumentDelivrance.getKey(requete?.documentDemande)
    ),
    [NB_EXEMPLAIRE]: getValeurOuVide(requete?.nbExemplaireImpression),
    [MOTIF]: getValeurOuVide(MotifDelivrance.getKey(requete?.motif)),
    [COMPLEMENT_MOTIF]: getValeurOuVide(requete?.complementMotif)
  };
};

const saisieEvenement = (evenement?: IEvenementReqDelivrance): Evenement => {
  return {
    [DATE_EVENEMENT]: {
      [JOUR]: getValeurOuVide(evenement?.jour),
      [MOIS]: getValeurOuVide(evenement?.mois),
      [ANNEE]: getValeurOuVide(evenement?.annee)
    },
    [VILLE_EVENEMENT]: getValeurOuVide(evenement?.ville),
    [PAYS_EVENEMENT]: getValeurOuVide(evenement?.pays)
  };
};

const saisieMandant = (mandant?: IMandant): Mandant => {
  return {
    [TYPE_MANDANT]: getValeurOuVide(TypeMandant.getKey(mandant?.type)),
    [NOM]: getValeurOuVide(mandant?.nom),
    [PRENOM]: getValeurOuVide(mandant?.prenom),
    [RAISON_SOCIALE]: getValeurOuVide(mandant?.raisonSociale)
  };
};

const saisieLienTitulaire = (
  requerant: IRequerant,
  mandant?: IMandant
): LienTitulaire => {
  switch (requerant.qualiteRequerant.qualite) {
    case Qualite.MANDATAIRE_HABILITE:
      return {
        [LIEN]: getValeurOuVide(TypeLienMandant.getKey(mandant?.typeLien)),
        [NATURE_LIEN]: getValeurOuVide(mandant?.natureLien)
      };
    case Qualite.INSTITUTIONNEL:
    case Qualite.AUTRE_PROFESSIONNEL:
      return {
        [LIEN]: getValeurOuVide(
          TypeLienRequerant.getKey(requerant.lienRequerant?.lien)
        ),
        [NATURE_LIEN]: getValeurOuVide(requerant.lienRequerant?.natureLien)
      };
    default:
      return {
        [LIEN]: "",
        [NATURE_LIEN]: ""
      };
  }
};
