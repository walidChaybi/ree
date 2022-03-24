import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { IPrenomOrdonnes } from "../../../../../model/requete/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequete } from "../../../../../model/requete/ITitulaireRequete";
import { ITitulaireRequeteTableau } from "../../../../../model/requete/ITitulaireRequeteTableau";
import { getValeurOuVide } from "../../../../common/util/Utils";

export function mappingRequeteDelivranceToRequeteTableau(
  requete: IRequeteDelivrance
): IRequeteTableauDelivrance {
  return {
    idRequete: requete.id,
    numero: requete.numero,
    titulaires: requete.titulaires ? getTitulaires(requete.titulaires) : [],
    canal: requete.canal,
    requerant: requete.requerant,
    idUtilisateur: requete.idUtilisateur,
    type: requete.type?.libelle,
    statut: requete.statutCourant.statut.libelle,
    document: DocumentDelivrance.getKeyForCode(requete.documentDemande?.code), // getKey ?,
    sousType: getValeurOuVide(requete.sousType.libelleCourt),
    documentsReponses: requete.documentsReponses
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
