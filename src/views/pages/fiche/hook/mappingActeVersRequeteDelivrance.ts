import { IEvenement } from "../../../../model/etatcivil/acte/IEvenement";
import {
  FicheActe,
  IFicheActe
} from "../../../../model/etatcivil/acte/IFicheActe";
import { IFiliation } from "../../../../model/etatcivil/acte/IFiliation";
import {
  ITitulaireActe,
  TitulaireActe
} from "../../../../model/etatcivil/acte/ITitulaireActe";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { NatureActe } from "../../../../model/etatcivil/enum/NatureActe";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../../../model/requete/enum/MotifDelivrance";
import { Provenance } from "../../../../model/requete/enum/Provenance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { TypeCanal } from "../../../../model/requete/enum/TypeCanal";
import { TypeLienRequerant } from "../../../../model/requete/enum/TypeLienRequerant";
import { TypeRequete } from "../../../../model/requete/enum/TypeRequete";
import { IRequeteDelivrance } from "../../../../model/requete/IRequeteDelivrance";
import { supprimeProprietesVides } from "../../../common/util/supprimeProprietesVides";
import { mapPrenomsVersPrenomsOrdonnes } from "../../../common/util/Utils";

export const mappingActeVersRequeteDelivrance = (
  acte: IFicheActe,
  numeroFonctionnel?: string
): IRequeteDelivrance => {
  const requete = {
    type: TypeRequete.DELIVRANCE.nom,
    sousType: SousTypeDelivrance.RDD.nom,
    canal: TypeCanal.RECE.nom,
    provenance: Provenance.RECE.nom,
    provenanceRece: {
      numeroFonctionnel
    },
    documentDemande: DocumentDelivrance.getCopieIntegraleUUID(),
    motif: MotifDelivrance.getKey(MotifDelivrance.AUTRE),
    nombreExemplairesDemandes: 1,
    evenement: getEvenement(acte.nature, acte.evenement),
    titulaires: getTitulaires(FicheActe.getTitulairesActeTabDansLOrdre(acte)),
    requerant: null,
    lienRequerant: {
      typeLienRequerant: TypeLienRequerant.getKey(TypeLienRequerant.AUTRE),
      natureLien: null
    }
  };

  return supprimeProprietesVides(requete);
};

const getEvenement = (natureActe: NatureActe, evenement?: IEvenement) => {
  return evenement
    ? {
        natureActe: NatureActe.getKey(natureActe),
        jour: evenement.jour,
        mois: evenement.mois,
        annee: evenement.annee,
        ville: evenement.ville,
        pays: evenement.pays
      }
    : undefined;
};

const getTitulaires = (titulaires: ITitulaireActe[]) =>
  titulaires.map((titulaire, index) => getTitulaire(titulaire, index + 1));

const getTitulaire = (titulaire: ITitulaireActe, position: number) => {
  const { nom: nomNaissance, prenoms, naissance, sexe } = titulaire;

  return {
    position,
    nomNaissance,
    prenoms: mapPrenomsVersPrenomsOrdonnes(prenoms),
    jourNaissance: naissance?.jour,
    moisNaissance: naissance?.mois,
    anneeNaissance: naissance?.annee,
    villeNaissance: naissance?.ville,
    paysNaissance: naissance?.pays,
    sexe: sexe ? Sexe.getKey(sexe) : Sexe.getKey(Sexe.INCONNU),
    nationalite: Nationalite.getKey(Nationalite.ETRANGERE),
    parentsTitulaire: getParents(TitulaireActe.getParentsDirects(titulaire))
  };
};

const getParents = (filiations: IFiliation[]) =>
  filiations.map((filiation, index) => getParent(filiation, index + 1));

const getParent = (filiation: IFiliation, position: number) => {
  const { nom: nomNaissance, prenoms } = filiation;
  return {
    position,
    nomNaissance,
    prenoms: mapPrenomsVersPrenomsOrdonnes(prenoms)
  };
};
