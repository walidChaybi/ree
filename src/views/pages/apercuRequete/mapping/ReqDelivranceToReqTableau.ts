import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { IPrenomOrdonnes } from "../../../../model/requete/v2/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../model/requete/v2/IRequeteTableau";
import { ITitulaireRequete } from "../../../../model/requete/v2/ITitulaireRequete";

export function mappingRequeteDelivranceToRequeteTableau(
  requete: IRequeteDelivrance
): IRequeteTableau {
  return {
    idRequete: requete.id,
    numero: requete.numero,
    titulaires: requete.titulaires ? getTitulaires(requete.titulaires) : [],
    requerant: requete.requerant,
    idUtilisateur: requete.idUtilisateur,
    type: requete.type?.libelle,
    statut: requete.statutCourant.statut.libelle,
    document: DocumentDelivrance.getKeyForNom(requete.documentDemande?.nom) // getKey ?
  };
}

const getTitulaires = (
  titulaires: ITitulaireRequete[]
): ITitulaireRequeteTableau[] => {
  return titulaires.map((t: ITitulaireRequete) => {
    const titulaire = {} as ITitulaireRequeteTableau;
    titulaire.nom = t.nomNaissance;
    if (t.jourNaissance) {
      titulaire.jourNaissance = t.jourNaissance;
    }
    if (t.moisNaissance) {
      titulaire.moisNaissance = t.moisNaissance;
    }
    if (t.anneeNaissance) {
      titulaire.anneeNaissance = t.anneeNaissance;
    }
    titulaire.paysNaissance = t.paysNaissance;
    titulaire.villeNaissance = t.villeNaissance;
    titulaire.sexe = Sexe.getEnumFor(t.sexe);
    titulaire.prenoms = t.prenoms ? getPrenoms(t.prenoms) : [];
    return titulaire;
  });
};

const getPrenoms = (prenoms: IPrenomOrdonnes[]): string[] => {
  return prenoms
    .sort((a, b) => (a.numeroOrdre > b.numeroOrdre ? 1 : -1))
    .map((p: IPrenomOrdonnes) => {
      return p.prenom;
    });
};
