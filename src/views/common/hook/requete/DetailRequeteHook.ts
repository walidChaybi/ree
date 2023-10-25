import { getDetailRequete } from "@api/appels/requeteApi";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { CategorieDocument } from "@model/requete/CategorieDocument";
import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
import { ObjetRequete } from "@model/requete/enum/ObjetRequete";
import { Provenance } from "@model/requete/enum/Provenance";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SousTypeInformation } from "@model/requete/enum/SousTypeInformation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TagPriorisation } from "@model/requete/enum/TagPriorisation";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeLienMandant } from "@model/requete/enum/TypeLienMandant";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IAction } from "@model/requete/IActions";
import { DocumentPJ, IDocumentPJ } from "@model/requete/IDocumentPj";
import { IEchange } from "@model/requete/IEchange";
import { IEvenementRequete } from "@model/requete/IEvenementRequete";
import { IMandant } from "@model/requete/IMandant";
import { IObservation } from "@model/requete/IObservation";
import { IPersonneSauvegardee } from "@model/requete/IPersonneSauvegardee";
import { IProvenanceRequete } from "@model/requete/IProvenanceRequete";
import { Requerant } from "@model/requete/IRequerant";
import { TRequete } from "@model/requete/IRequete";
import { IRequeteCreation } from "@model/requete/IRequeteCreation";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IRequeteInformation } from "@model/requete/IRequeteInformation";
import { IStatutCourant } from "@model/requete/IStatutCourant";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { NatureActeTranscription } from "@model/requete/NatureActeTranscription";
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import {
  IPieceJustificativeCreation,
  PieceJustificativeCreation
} from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import {
  getDateComposeFromTimestamp,
  getFormatDateFromTimestamp
} from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { storeRece } from "@util/storeRece";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";
import { RolePersonneSauvegardee } from "./../../../../model/requete/enum/RolePersonneSauvegardee";

export interface IDetailRequeteParams {
  idRequete?: string;
  estConsultation?: boolean;
}

export function useDetailRequeteApiHook(
  params: IDetailRequeteParams = {
    idRequete: undefined,
    estConsultation: false
  }
) {
  const [detailRequeteState, setDetailRequeteState] = useState<
    TRequete | undefined
  >();

  useEffect(() => {
    if (params.idRequete) {
      fetchDetailRequete(
        setDetailRequeteState,
        params.idRequete,
        params.estConsultation
      );
    }
  }, [params]);

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
            result?.body?.data
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
    evenement: data?.evenement ? getEvenement(data.evenement) : undefined,
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
    motif: MotifDelivrance.getEnumFor(data?.motif),
    complementMotif: data?.complementMotif,
    choixDelivrance: ChoixDelivrance.getEnumFor(data?.choixDelivrance),

    // Documents réponse avec contenu vide
    documentsReponses: data?.documentsReponses
  };
}

function mapUnePieceJustificative(piece?: any): IPieceJustificative {
  return {
    id: getValeurOuUndefined(piece.id),
    nom: getValeurOuUndefined(piece.nom),
    mimeType: getValeurOuUndefined(piece.mimeType),
    extension: getValeurOuUndefined(piece.extension),
    taille: getValeurOuUndefined(piece.taille),
    referenceSwift: getValeurOuUndefined(piece.referenceSwift),
    conteneurSwift: getValeurOuUndefined(piece.conteneurSwift),
    contenu: getValeurOuUndefined(piece.contenu),
    typePieceJustificative: TypePieceJustificative?.getEnumFor(
      piece.typePieceJustificative
    ) // pj.typePieceJustificative est un UUID car il vient du back,
  };
}

function mapPiecesJustificatives(pieces?: any): IPieceJustificative[] {
  return pieces?.map((pj: any) => mapUnePieceJustificative(pj));
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

function getEvenement(evenement: any): IEvenementRequete {
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

function mapUnePieceJustificativeCreation(
  piece?: any
): IPieceJustificativeCreation {
  return {
    ...mapUnePieceJustificative(piece),
    idFichierNatali: getValeurOuUndefined(piece.idFichierNatali),
    ordreNatali: getValeurOuUndefined(piece.ordreNatali),
    libelle: getValeurOuUndefined(piece.libelle),
    estPieceAnnexe: getValeurOuUndefined(piece.estPieceAnnexe),
    idRc: getValeurOuUndefined(piece.idRC),
    idRca: getValeurOuUndefined(piece.idRCA),
    idPacs: getValeurOuUndefined(piece.idPACS),
    idActe: getValeurOuUndefined(piece.idActe),
    idPersonne: getValeurOuUndefined(piece.idPersonne),
    documentPj: mapUnDocumentPJ(getValeurOuUndefined(piece.documentPj)),
    nouveauLibelleFichierPJ: getValeurOuUndefined(piece.nouveauLibelleFichierPJ)
  };
}

function mapPiecesJustificativesCreation(
  pieces?: any
): IPieceJustificativeCreation[] {
  const piecesJustificatives: IPieceJustificativeCreation[] = pieces
    ? pieces?.map((pj: any) => mapUnePieceJustificativeCreation(pj))
    : [];

  PieceJustificativeCreation.setOrdre(piecesJustificatives);

  return PieceJustificativeCreation.tri(piecesJustificatives);
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

  return {
    date: getFormatDateFromTimestamp(dateMessage),
    ...reste
  };
}

function mapUnDocumentPJ(document?: any): IDocumentPJ | undefined {
  return document
    ? {
        ...document,
        categorie: CategorieDocument.creationCategorieDocument(
          document.categorie,
          document.libelle
        )
      }
    : undefined;
}

function mapDocumentPJ(documents?: any): IDocumentPJ[] {
  return DocumentPJ.trie(
    documents?.map(
      (document: any): IDocumentPJ => mapUnDocumentPJ(document) as IDocumentPJ
    )
  );
}

export function mappingRequeteCreation(data: any): IRequeteCreation {
  const requete = mappingRequete(data);
  const natureActeTranscrit = NatureActeTranscription.getEnumFor(
    data.natureActeTranscrit
  );

  return {
    ...data,
    ...requete,

    // Partie requête création
    sousType: SousTypeCreation.getEnumFor(data.sousType),
    numeroDossierMetier: data.numeroDossierMetier,
    numeroAncien: data.numeroAncienSI,
    piecesJustificatives: mapPiecesJustificativesCreation(
      data.piecesJustificatives
    ),
    mandant: data.mandant ? getMandant(data.mandant) : undefined,
    provenanceNatali: {
      ...data.provenanceNatali,
      tagPriorisation: TagPriorisation.getEnumFor(
        data.provenanceNatali?.tagPriorisation
      ),
      echanges: mapEchangesRetourSDANF(data.provenanceNatali?.echanges)
    },
    provenanceServicePublic: data.provenanceServicePublic,
    documentsPj: mapDocumentPJ(getValeurOuUndefined(data.documentsPj)),
    provenance: Provenance.getEnumFor(data.provenance),
    titulaires: mapTitulairesCreation(
      requete.titulaires,
      data.provenanceNatali?.numeroDossierNational
    ),
    natureActeTranscrit,
    personnesSauvegardees: mapPersonnesSauvegardees(
      getValeurOuUndefined(data.personnesSauvegardees),
      NatureActeTranscription.estMariage(natureActeTranscrit)
    )
  };
}

export function mapTitulairesCreation(
  titulaires: any[],
  numeroDossierNational?: string
): ITitulaireRequeteCreation[] {
  return titulaires.map(titulaire => ({
    ...titulaire,
    numeroDossierNational,
    qualite: QualiteFamille.getEnumFor(titulaire.qualite),
    decret: titulaire.decret && {
      numeroDecret: titulaire.decret.numeroDecret,
      dateSignature: getDateComposeFromTimestamp(
        titulaire.decret.dateSignature
      ),
      datePublication: getDateComposeFromTimestamp(
        titulaire.decret.datePublication
      )
    }
  }));
}

function mapPersonnesSauvegardees(
  data?: any[],
  estRequeteMariage = false
): IPersonneSauvegardee[] {
  const personnesSauvegardees: IPersonneSauvegardee[] = [];
  data?.forEach(dataCourant =>{
    const role =  RolePersonneSauvegardee.getEnumForEnFonctionNatureActeRequete(
      dataCourant.role,
      estRequeteMariage
    );
    if (role) {
      personnesSauvegardees.push({
        idPersonne: dataCourant.idPersonne,
        role
      })
    }
  });
  return personnesSauvegardees;
}
