import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { IPrenomOrdonnes } from "../../../../../model/requete/v2/IPrenomOrdonnes";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import {
  IDocumentReponseTableau,
  IRequeteTableauDelivrance
} from "../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { ITitulaireRequete } from "../../../../../model/requete/v2/ITitulaireRequete";
import { ITitulaireRequeteTableau } from "../../../../../model/requete/v2/ITitulaireRequeteTableau";
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
    documentsReponses: getDocumentsReponses(requete.documentsReponses)
  };
}

const getDocumentsReponses = (
  documentsReponses?: IDocumentReponse[]
): IDocumentReponseTableau[] | undefined => {
  return documentsReponses?.map(doc => ({
    id: doc.id,
    nom: doc.nom,
    typeDocument: doc.typeDocument, // UUID nomenclature
    taille: doc.taille,
    avecCtv: doc.avecCtv || false,
    conteneurSwift: doc.conteneurSwift,
    mimeType: doc.mimeType
  }));
};

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
