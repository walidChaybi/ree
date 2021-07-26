import { useEffect, useState } from "react";
import { getDetailRequete } from "../../../../api/appels/requeteApi";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { MotifDelivrance } from "../../../../model/requete/v2/enum/MotifDelivrance";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { Qualite } from "../../../../model/requete/v2/enum/Qualite";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeCanal } from "../../../../model/requete/v2/enum/TypeCanal";
import { TypeInstitutionnel } from "../../../../model/requete/v2/enum/TypeInstitutionnel";
import { TypeLienMandant } from "../../../../model/requete/v2/enum/TypeLienMandant";
import { TypeLienRequerant } from "../../../../model/requete/v2/enum/TypeLienRequerant";
import { TypeMandant } from "../../../../model/requete/v2/enum/TypeMandant";
import { TypeMandataireReq } from "../../../../model/requete/v2/enum/TypeMandataireReq";
import { TypeNatureActe } from "../../../../model/requete/v2/enum/TypeNatureActe";
import { TypePieceJustificative } from "../../../../model/requete/v2/enum/TypePieceJustificative";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IAction } from "../../../../model/requete/v2/IActions";
import { IAdresseRequerant } from "../../../../model/requete/v2/IAdresseRequerant";
import { IAutreProfessionnel } from "../../../../model/requete/v2/IAutreProfessionnel";
import { IEvenementReqDelivrance } from "../../../../model/requete/v2/IEvenementReqDelivrance";
import { IInstitutionnel } from "../../../../model/requete/v2/IInstitutionnel";
import { ILienRequerant } from "../../../../model/requete/v2/ILienRequerant";
import { IMandant } from "../../../../model/requete/v2/IMandant";
import { IMandataireHabilite } from "../../../../model/requete/v2/IMandataireHabilite";
import { IObservation } from "../../../../model/requete/v2/IObservation";
import { IParticulier } from "../../../../model/requete/v2/IParticulier";
import { IPieceJustificativeV2 } from "../../../../model/requete/v2/IPieceJustificativeV2";
import { IProvenanceRequete } from "../../../../model/requete/v2/IProvenanceRequete";
import { IQualiteRequerant } from "../../../../model/requete/v2/IQualiteRequerant";
import { IRequerant } from "../../../../model/requete/v2/IRequerant";
import { TRequete } from "../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IStatutCourant } from "../../../../model/requete/v2/IStatutCourant";
import { ITitulaireRequete } from "../../../../model/requete/v2/ITitulaireRequete";
import { IUtilisateurRece } from "../../../../model/requete/v2/IUtilisateurRece";
import { logError } from "../../../common/util/LogManager";
import { storeRece } from "../../../common/util/storeRece";

export function useDetailRequeteApiHook(idRequete: string) {
  const [detailRequeteState, setDetailRequeteState] =
    useState<TRequete | undefined>();

  useEffect(() => {
    async function fetchDetailRequete() {
      try {
        if (idRequete != null) {
          const result = await getDetailRequete(idRequete);
          const typeRequete = TypeRequete.getEnumFor(result?.body?.data?.type);
          if (typeRequete === TypeRequete.DELIVRANCE) {
            const detailRequete = mappingRequeteDelivrance(result?.body?.data);
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
    numero: data.numeroRequete,
    idSagaDila: data.idSagaDila,
    dateCreation: data.dateCreation,
    canal: TypeCanal.getEnumFor(data.canal),
    type: TypeRequete.getEnumFor(data.type),
    statutCourant: getStatutCourant(data.statut),
    titulaires: getTitulaires(data.titulaires),
    requerant: getRequerant(data.requerant),
    mandant: data.mandant ? getMandant(data.mandant) : undefined,
    idUtilisateur: data.corbeilleAgent?.idUtilisateur,
    idEntite: data?.corbeilleService?.idEntiteRattachement,
    actions: getActions(data?.actions),
    observations: getObservations(data.observations),
    piecesJustificatives: mapPiecesJustificatives(data.piecesJustificatives),

    //Partie Requête Delivrance
    sousType: SousTypeDelivrance.getEnumFor(data?.sousType),
    documentDemande: DocumentDelivrance.getEnumFor(data?.documentDemande),
    nbExemplaireImpression: data?.nombreExemplairesDemandes,
    provenanceRequete: getProvenance(data),
    evenement: data?.evenement ? getEvenement(data.evenement) : undefined,
    motif: MotifDelivrance.getEnumFor(data?.motif),
    complementMotif: data?.complementMotif,

    // Documents réponse avec contenu vide
    documentsReponses: data?.documentsReponses
  };
}

function mapPiecesJustificatives(data: any): IPieceJustificativeV2[] {
  const piecesJustificatives: IPieceJustificativeV2[] = data;
  piecesJustificatives.forEach((pj: any) => {
    pj.typePieceJustificative = TypePieceJustificative?.getEnumFor(
      pj.typePieceJustificative
    ); // pj.typePieceJustificative est un UUID car il vient du back
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

function getRequerant(requerant: any): IRequerant {
  return {
    id: requerant.id,
    dateCreation: requerant.dateCreation,
    nomFamille: requerant.nomFamille,
    prenom: requerant.prenom,
    courriel: requerant.courriel,
    telephone: requerant.telephone,
    adresse: requerant.adresse as IAdresseRequerant,
    lienRequerant: requerant.lienRequerant
      ? getLienRequerant(requerant.lienRequerant)
      : undefined,
    qualiteRequerant: getQualiteRequerant(requerant)
  };
}

function getLienRequerant(lienRequerant: any): ILienRequerant {
  return {
    id: lienRequerant.id,
    lien: TypeLienRequerant.getEnumFor(lienRequerant.typeLienRequerant),
    natureLien: lienRequerant.nature
  };
}

function getQualiteRequerant(requerant: any): IQualiteRequerant {
  return {
    qualite: Qualite.getEnumFor(requerant.qualite),
    utilisateurRece: requerant.detailQualiteRece as IUtilisateurRece,
    particulier: requerant.detailQualiteParticulier as IParticulier,
    mandataireHabilite: getMandataireHabilite(
      requerant.detailQualiteMandataireHabilite
    ),
    autreProfessionnel:
      requerant.detailQualiteAutreProfessionnel as IAutreProfessionnel,
    institutionnel: getInstitutionnel(requerant.detailQualiteInstitutionnel)
  };
}

function getMandataireHabilite(mandataire: any): IMandataireHabilite {
  if (mandataire) {
    return {
      type: TypeMandataireReq.getEnumFor(mandataire.type),
      raisonSociale: mandataire.raisonSociale,
      nature: mandataire.nature,
      crpcen: mandataire.crpcen
    };
  }
  return {} as IMandataireHabilite;
}

function getInstitutionnel(institutionnel: any): IInstitutionnel {
  if (institutionnel) {
    return {
      type: TypeInstitutionnel.getEnumFor(institutionnel.type),
      nomInstitution: institutionnel.nomInstitution,
      nature: institutionnel.nature
    };
  }
  return {} as IInstitutionnel;
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
