import { useEffect, useState } from "react";
import { getDetailRequete } from "../../../../api/appels/requeteApi";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { ChoixDelivrance } from "../../../../model/requete/v2/enum/ChoixDelivrance";
import { ComplementObjetRequete } from "../../../../model/requete/v2/enum/ComplementObjetRequete";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../../../model/requete/v2/enum/MotifDelivrance";
import { ObjetRequete } from "../../../../model/requete/v2/enum/ObjetRequete";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { SousTypeInformation } from "../../../../model/requete/v2/enum/SousTypeInformation";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TypeLienMandant } from "../../../../model/requete/v2/enum/TypeLienMandant";
import { TypeMandant } from "../../../../model/requete/v2/enum/TypeMandant";
import { TypeNatureActe } from "../../../../model/requete/v2/enum/TypeNatureActe";
import { TypePieceJustificative } from "../../../../model/requete/v2/enum/TypePieceJustificative";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IAction } from "../../../../model/requete/v2/IActions";
import { IEvenementReqDelivrance } from "../../../../model/requete/v2/IEvenementReqDelivrance";
import { IMandant } from "../../../../model/requete/v2/IMandant";
import { IObservation } from "../../../../model/requete/v2/IObservation";
import { IPieceJustificativeV2 } from "../../../../model/requete/v2/IPieceJustificativeV2";
import { IProvenanceRequete } from "../../../../model/requete/v2/IProvenanceRequete";
import { Requerant } from "../../../../model/requete/v2/IRequerant";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteInformation } from "../../../../model/requete/v2/IRequeteInformation";
import { IStatutCourant } from "../../../../model/requete/v2/IStatutCourant";
import { ITitulaireRequete } from "../../../../model/requete/v2/ITitulaireRequete";
import { logError } from "../../../common/util/LogManager";
import { storeRece } from "../../../common/util/storeRece";

export function useDetailRequeteApiHook(idRequete: string) {
  const [detailRequeteState, setDetailRequeteState] = useState<
    TRequete | undefined
  >();

  useEffect(() => {
    async function fetchDetailRequete() {
      try {
        if (idRequete != null) {
          const result = await getDetailRequete(idRequete);
          const typeRequete = TypeRequete.getEnumFor(result?.body?.data?.type);
          if (typeRequete === TypeRequete.DELIVRANCE) {
            const detailRequete = mappingRequeteDelivrance(result?.body?.data);
            setDetailRequeteState(detailRequete);
          } else if (typeRequete === TypeRequete.INFORMATION) {
            const detailRequete = mappingRequeteInformation(result?.body?.data);
            setDetailRequeteState(detailRequete);
          }
        }
      } catch (error) {
        logError({
          messageUtilisateur: "Impossible de récupérer le détail de la requête",
          error
        });
      }
    }
    fetchDetailRequete();
  }, [idRequete]);

  return {
    detailRequeteState
  };
}

export function mappingRequeteDelivrance(data: any): IRequeteDelivrance {
  return {
    // Partie Requête
    id: data.id,
    numero: data.numeroFonctionnel,
    idSagaDila: data.idSagaDila,
    dateCreation: data.dateCreation,
    canal: TypeCanal.getEnumFor(data.canal),
    type: TypeRequete.getEnumFor(data.type),
    statutCourant: getStatutCourant(data.statut),
    titulaires: getTitulaires(data.titulaires),
    requerant: Requerant.mappingRequerant(data.requerant),
    mandant: data.mandant ? getMandant(data.mandant) : undefined,
    idUtilisateur: data.corbeilleAgent?.idUtilisateur,
    idEntite: data?.corbeilleService?.idEntiteRattachement,
    actions: getActions(data?.actions),
    observations: data.observations
      ? getObservations(data.observations)
      : undefined,
    piecesJustificatives: mapPiecesJustificatives(data.piecesJustificatives),

    //Partie Requête Delivrance
    sousType: SousTypeDelivrance.getEnumFor(data?.sousType),
    documentDemande: DocumentDelivrance.getEnumFor(data?.documentDemande),
    nbExemplaireImpression: data?.nombreExemplairesDemandes,
    provenanceRequete: getProvenance(data),
    evenement: data?.evenement ? getEvenement(data.evenement) : undefined,
    motif: MotifDelivrance.getEnumFor(data?.motif),
    complementMotif: data?.complementMotif,
    choixDelivrance: ChoixDelivrance.getEnumFor(data?.choixDelivrance),

    // Documents réponse avec contenu vide
    documentsReponses: data?.documentsReponses
  };
}

function mapPiecesJustificatives(pieces?: any): IPieceJustificativeV2[] {
  const piecesJustificatives: IPieceJustificativeV2[] = [];
  pieces?.forEach((pj: any) => {
    const piece = pj as IPieceJustificativeV2;
    piece.typePieceJustificative = TypePieceJustificative?.getEnumFor(
      pj.typePieceJustificative
    ); // pj.typePieceJustificative est un UUID car il vient du back
    piecesJustificatives.push(piece);
  });

  return piecesJustificatives;
}

function getActions(actions: any): IAction[] {
  const actionsRequete: IAction[] = [];
  actions.forEach((a: any) => {
    const action = a as IAction;
    const trigramme = storeRece.getTrigrammeFromID(action.idUtilisateur);
    action.trigramme = trigramme ? trigramme : "";
    actionsRequete.push(action);
  });
  return actionsRequete;
}

function getObservations(observations: any): IObservation[] {
  const observationsRequete: IObservation[] = [];
  observations.forEach((a: any) => {
    const observation = a as IObservation;
    const trigramme = storeRece.getTrigrammeFromID(observation.idUtilisateur);
    observation.trigramme = trigramme ? trigramme : "RECE";
    observationsRequete.push(observation);
  });
  return observationsRequete;
}

function getTitulaires(titulaires: any): ITitulaireRequete[] {
  const titulairesRequetes: ITitulaireRequete[] = [];
  titulaires.forEach((t: any) => {
    const titulaire = t as ITitulaireRequete;
    titulaire.nationalite = Nationalite.getEnumFor(t.nationalite);
    titulairesRequetes.push(titulaire);
  });
  return titulairesRequetes;
}

function getStatutCourant(statut: any): IStatutCourant {
  return {
    statut: StatutRequete.getEnumFor(statut.statutRequete),
    dateEffet: statut.dateEffet,
    raisonStatut: statut.raisonStatut
  };
}

function getMandant(mandant: any): IMandant {
  return {
    id: mandant.id,
    type: TypeMandant.getEnumFor(mandant.typeMandant),
    nom: mandant.nom,
    prenom: mandant.prenom,
    raisonSociale: mandant.raisonSociale,
    typeLien: TypeLienMandant.getEnumFor(mandant.lienMandant),
    natureLien: mandant.natureLien
  };
}

function getProvenance(data: any): IProvenanceRequete {
  return {
    provenance: Provenance.getEnumFor(data.provenance),
    provenancePlanete: data.provenancePlanete,
    provenanceRece: data.provenanceRece,
    provenanceServicePublic: data.provenanceServicePublic
  };
}

function getEvenement(evenement: any): IEvenementReqDelivrance {
  return {
    id: evenement.id,
    natureActe: TypeNatureActe.getEnumFor(evenement.natureActe),
    jour: evenement.jour,
    mois: evenement.mois,
    annee: evenement.annee,
    ville: evenement.ville,
    pays: evenement.pays
  };
}

export function mappingRequeteInformation(data: any): IRequeteInformation {
  return {
    // Partie Requête
    id: data.id,
    numero: data.numeroFonctionnel,
    dateCreation: data.dateCreation,
    type: TypeRequete.getEnumFor(data.type),
    statutCourant: getStatutCourant(data.statut),
    titulaires: getTitulaires(data.titulaires),
    requerant: Requerant.mappingRequerant(data.requerant),
    idUtilisateur: data.corbeilleAgent?.idUtilisateur,
    idEntite: data?.corbeilleService?.idEntiteRattachement,
    observations: data.observations
      ? getObservations(data.observations)
      : undefined,
    canal: TypeCanal.getEnumFor(data.canal),

    //Partie Requête Delivrance
    sousType: SousTypeInformation.getEnumFor(data.sousType),
    objet: ObjetRequete.getEnumFor(data.objet),
    complementObjet: ComplementObjetRequete.getEnumFor(data.complementObjet),
    commentaire: data.commentaire,
    reponse: data.reponse,
    provenanceRequete: Provenance.getEnumFor(data.provenance),
    numeroRequeteLiee: data.numeroRequeteLiee,
    idRequeteLiee: data.idRequeteLiee,
    piecesComplementInformation: data.piecesComplementInformation,
    besoinUsager: data.besoinUsager
  };
}
