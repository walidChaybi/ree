import { getDetailRequete } from "@api/appels/requeteApi";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import { PieceJustificativeCategorie } from "@model/requete/enum/PieceJustificativeCategorie";
import { PieceJustificativeLibelle } from "@model/requete/enum/PieceJustificativeLibelle";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IAction } from "@model/requete/IActions";
import { IDocumentPJ } from "@model/requete/IDocumentPj";
import { IEchange } from "@model/requete/IEchange";
import { IEvenementReqDelivrance } from "@model/requete/IEvenementReqDelivrance";
import { IMandant } from "@model/requete/IMandant";
import { IObservation } from "@model/requete/IObservation";
import { IProvenanceRequete } from "@model/requete/IProvenanceRequete";
import { Requerant } from "@model/requete/IRequerant";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { IPieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import { getFormatDateFromTimestamp } from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { useEffect, useState } from "react";

export interface IDetailRequeteParams {
  idRequete?: string;
  estConsultation?: boolean;
}

export function useDetailRequeteApiHook(
  idRequete: string | undefined,
  estConsultation = false
) {
  const [detailRequeteState, setDetailRequeteState] = useState<
    TRequete | undefined
  >();

  useEffect(() => {
    fetchDetailRequete(setDetailRequeteState, idRequete, estConsultation);
  }, [idRequete, estConsultation]);

  return {
    detailRequeteState
  };
}

export function useAvecRejeuDetailRequeteApiHook(
  params?: IDetailRequeteParams
) {
  const [detailRequeteState, setDetailRequeteState] = useState<
    TRequete | undefined
  >();

  useEffect(() => {
    fetchDetailRequete(
      setDetailRequeteState,
      params?.idRequete,
      params?.estConsultation
    );
  }, [params]);

  return {
    detailRequeteState
  };
}

async function fetchDetailRequete(
  setDetailRequeteState: any,
  idRequete?: string,
  estConsultation = false
) {
  try {
    if (idRequete) {
      const result = await getDetailRequete(idRequete, estConsultation);
      const typeRequete = TypeRequete.getEnumFor(result?.body?.data?.type);
      switch (typeRequete) {
        case TypeRequete.DELIVRANCE:
          const detailRequeteDelivrance = mappingRequeteDelivrance(
            result?.body?.data
          );
          setDetailRequeteState(detailRequeteDelivrance);
          break;
        case TypeRequete.INFORMATION:
          const detailRequeteInformation = mappingRequeteInformation(
            result?.body?.data
          );
          setDetailRequeteState(detailRequeteInformation);
          break;
        case TypeRequete.CREATION:
          const detailRequeteCreation = mappingRequeteCreation(
            result.body.data
          );
          setDetailRequeteState(detailRequeteCreation);
          break;
      }
    }
  } catch (error) {
    logError({
      messageUtilisateur: "Impossible de récupérer le détail de la requête",
      error
    });
  }
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
    numeroRequeteOrigine: data.numeroRequeteOrigine,

    //Partie Requête Delivrance
    sousType: SousTypeDelivrance.getEnumFor(data?.sousType),
    documentDemande: DocumentDelivrance.getEnumForUUID(data?.documentDemande),
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

function mapPiecesJustificatives(pieces?: any): IPieceJustificative[] {
  const piecesJustificatives: IPieceJustificative[] = [];
  pieces?.forEach((pj: any) => {
    const piece = pj as IPieceJustificative;
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
    titulaire.situationFamiliale = t.situationFamilliale;
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
    natureActe: NatureActeRequete.getEnumFor(evenement.natureActe),
    jour: evenement.jour,
    mois: evenement.mois,
    annee: evenement.annee,
    ville: evenement.ville,
    pays: evenement.pays
  };
}

function mappingRequete(data: any) {
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
    actions: getActions(data?.actions),
    numeroRequeteOrigine: data.numeroRequeteOrigine
  };
}

export function mappingRequeteInformation(data: any): IRequeteInformation {
  return {
    ...mappingRequete(data),
    //Partie Requête Delivrance
    sousType: SousTypeInformation.getEnumFor(data.sousType),
    objet: ObjetRequete.getEnumFor(data.objet),
    complementObjet: ComplementObjetRequete.getEnumFor(data.complementObjet),
    commentaire: data.commentaire,
    reponseChoisie: {
      ...data.reponseChoisie,
      corpsMail: data.reponseChoisie?.corpsMailFinal
    }, // Transformation corpsMailFinal en corpsMail
    provenanceRequete: Provenance.getEnumFor(data.provenance),
    numeroRequeteLiee: data.numeroRequeteLiee,
    idRequeteLiee: data.idRequeteLiee,
    typeRequeteLiee: TypeRequete.getEnumFor(data.typeRequeteLiee),
    piecesComplementInformation: data.piecesComplementInformation,
    besoinUsager: BesoinUsager.getEnumFor(data.besoinUsager)
  };
}

function mapPiecesJustificativesCreation(
  pieces?: any
): IPieceJustificativeCreation[] {
  const piecesJustificatives: IPieceJustificativeCreation[] = [];
  pieces?.forEach((pj: any) => {
    const piece = pj as IPieceJustificativeCreation;
    piece.typePieceJustificative = TypePieceJustificative?.getEnumFor(
      pj.typePieceJustificative
    ); // pj.typePieceJustificative est un UUID car il vient du back
    piecesJustificatives.push(piece);
  });

  return piecesJustificatives;
}

export function mapEchangesRetourSDANF(echangesServeur?: any): IEchange[] {
  const echanges: IEchange[] = [];

  echangesServeur?.forEach((echange: any) => {
    echanges.push(mapEchangeRetourSDANF(echange));
  });

  return echanges;
}

export function mapEchangeRetourSDANF(echangeServeur?: any): IEchange {
  const { dateMessage, ...reste } = echangeServeur;

  const echangeMapped: IEchange = {
    date: getFormatDateFromTimestamp(dateMessage),
    ...reste
  };

  return echangeMapped;
}

function mapDocumentPJ(documents?: any): IDocumentPJ[] {
  return documents?.map((document: any) => ({
    ...document,
    categorie: PieceJustificativeCategorie.getEnumFromLibelle(
      document.categorie
    ),
    libelle: document.libelle,
    libelleTraite: PieceJustificativeLibelle.getEnumFromLibelle(
      document.libelle
    )
  }));
}

export function mappingRequeteCreation(data: any): IRequeteCreation {
  return {
    ...data,
    ...mappingRequete(data),

    // Partie requête création
    sousType: SousTypeCreation.getEnumFor(data.sousType),
    numeroAncien: data.numeroAncienSI,
    piecesJustificatives: mapPiecesJustificativesCreation(
      data.piecesJustificatives
    ),
    mandant: data.mandant ? getMandant(data.mandant) : undefined,
    provenanceNatali: {
      ...data.provenanceNatali,
      echanges: mapEchangesRetourSDANF(data.provenanceNatali?.echanges)
    },
    documentsPj: mapDocumentPJ(data.documentsPj)
  };
}
