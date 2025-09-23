import { nettoyerAttributsDto } from "@model/commun/dtoUtils";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { Filiation } from "@model/etatcivil/acte/Filiation";
import { IEvenementDto } from "@model/etatcivil/acte/IEvenement";
import { TitulaireActe } from "@model/etatcivil/acte/TitulaireActe";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { mapPrenomsVersPrenomsOrdonnes } from "@util/Utils";

export const mappingActeVersRequeteDelivrance = (acte: FicheActe, numeroFonctionnel?: string): IRequeteDelivrance => {
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
    evenement: acte.evenement ? getEvenement(acte.nature, acte.evenement) : undefined,
    titulaires: getTitulaires(acte.titulaires),
    requerant: null,
    lienRequerant: {
      typeLienRequerant: "AUTRE",
      natureLien: null
    }
  } as any as IRequeteDelivrance;

  return nettoyerAttributsDto(requete);
};

const getEvenement = (natureActe: keyof typeof ENatureActe, evenement: IEvenementDto) => ({
  natureActe: natureActe,
  jour: evenement.jour,
  mois: evenement.mois,
  annee: evenement.annee,
  ville: evenement.ville,
  pays: evenement.pays
});

const getTitulaires = (titulaires: TitulaireActe[]) => titulaires.map((titulaire, index) => getTitulaire(titulaire, index + 1));

const getTitulaire = (titulaire: TitulaireActe, position: number) => {
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
    sexe: sexe ?? Sexe.getKey(Sexe.INCONNU),
    nationalite: Nationalite.getKey(Nationalite.ETRANGERE),
    parentsTitulaire: getParents(titulaire.filiations.filter(filiation => filiation.lienParente === "PARENT"))
  };
};

const getParents = (filiations: Filiation[]) => filiations.map((filiation, index) => getParent(filiation, index + 1));

const getParent = (filiation: Filiation, position: number) => {
  const { nom: nomNaissance, prenoms } = filiation;
  return {
    position,
    nomNaissance,
    prenoms: mapPrenomsVersPrenomsOrdonnes(prenoms)
  };
};
