import { getDetailRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { IUtilisateur, getNomPrenomUtilisateurAPartirId } from "@model/agent/IUtilisateur";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { CategorieDocument } from "@model/requete/CategorieDocument";
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
import { ISuiviDossier } from "@model/requete/ISuiviDossier";
import { ITitulaireRequete } from "@model/requete/ITitulaireRequete";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { BesoinUsager } from "@model/requete/enum/BesoinUsager";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { ComplementObjetRequete } from "@model/requete/enum/ComplementObjetRequete";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { MotifDelivrance } from "@model/requete/enum/MotifDelivrance";
import { NatureActeRequete } from "@model/requete/enum/NatureActeRequete";
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
import { IPieceJustificative } from "@model/requete/pieceJointe/IPieceJustificative";
import { IPieceJustificativeCreation, PieceJustificativeCreation } from "@model/requete/pieceJointe/IPieceJustificativeCreation";
import DateUtils from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { useContext, useEffect, useState } from "react";
import { AvancementProjetActe } from "./../../../../model/requete/enum/AvancementProjetActe";
import { NatureProjetEtablissement } from "./../../../../model/requete/enum/NatureProjetEtablissement";
import { RolePersonneSauvegardee } from "./../../../../model/requete/enum/RolePersonneSauvegardee";
import { UnionActuelle } from "./../../../../model/requete/enum/UnionActuelle";

export interface IDetailRequeteParams {
  idRequete?: string;
  estConsultation?: boolean;
  estConsultationHistoriqueAction?: boolean;
}

export function useDetailRequeteApiHook(params?: IDetailRequeteParams) {
  const [detailRequeteState, setDetailRequeteState] = useState<TRequete | undefined>();

  const { utilisateurs } = useContext(RECEContextData);

  useEffect(() => {
    if (params?.idRequete) {
      fetchDetailRequete(
        setDetailRequeteState,
        params.estConsultation,
        params.estConsultationHistoriqueAction,
        utilisateurs,
        params.idRequete
      );
    }
  }, [params]);
  return {
    detailRequeteState
  };
}

export function useAvecRejeuDetailRequeteApiHook(params?: IDetailRequeteParams) {
  const [detailRequeteState, setDetailRequeteState] = useState<TRequete | undefined>();

  const { utilisateurs } = useContext(RECEContextData);

  useEffect(() => {
    fetchDetailRequete(setDetailRequeteState, params?.estConsultation, undefined, utilisateurs, params?.idRequete);
  }, [params]);

  return {
    detailRequeteState
  };
}

export async function fetchDetailRequete(
  setDetailRequeteState: any,
  estConsultation = false,
  estConsultationHistoriqueAction = false,
  utilisateurs?: IUtilisateur[],
  idRequete?: string
) {
  try {
    if (idRequete) {
      const result = await getDetailRequete(idRequete, estConsultation, estConsultationHistoriqueAction);
      const typeRequete = TypeRequete.getEnumFor(result?.body?.data?.type);
      switch (typeRequete) {
        case TypeRequete.DELIVRANCE: {
          const detailRequeteDelivrance = mappingRequeteDelivrance(result?.body?.data, utilisateurs);
          setDetailRequeteState(detailRequeteDelivrance);
          break;
        }
        case TypeRequete.INFORMATION: {
          const detailRequeteInformation = mappingRequeteInformation(result?.body?.data, utilisateurs);
          setDetailRequeteState(detailRequeteInformation);
          break;
        }
        case TypeRequete.CREATION: {
          const detailRequeteCreation = mappingRequeteCreation(result?.body?.data, utilisateurs);
          setDetailRequeteState(detailRequeteCreation);
          break;
        }
      }
    }
  } catch (error) {
    logError({
      messageUtilisateur: "Impossible de récupérer le détail de la requête",
      error
    });
  }
}

export function mappingRequeteDelivrance(data: any, utilisateurs?: IUtilisateur[]): IRequeteDelivrance {
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
    idUtilisateur: data.idUtilisateur,
    idService: data.idService,
    actions: getActions(data?.actions, utilisateurs),
    observations: data.observations ? getObservations(data.observations, utilisateurs) : undefined,
    piecesJustificatives: mapPiecesJustificatives(data.piecesJustificatives),
    numeroRequeteOrigine: data.numeroRequeteOrigine,

    //Partie Requête Delivrance
    sousType: SousTypeDelivrance.getEnumFor(data?.sousType),
    documentDemande: DocumentDelivrance.depuisId(data?.documentDemande),
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
    id: piece.id || undefined,
    nom: piece.nom || undefined,
    mimeType: piece.mimeType || undefined,
    extension: piece.extension || undefined,
    taille: piece.taille || undefined,
    referenceSwift: piece.referenceSwift || undefined,
    conteneurSwift: piece.conteneurSwift || undefined,
    contenu: piece.contenu || undefined,
    typePieceJustificative: TypePieceJustificative?.depuisId(piece.typePieceJustificative) // pj.typePieceJustificative est un UUID car il vient du back,
  };
}

function mapPiecesJustificatives(pieces?: any): IPieceJustificative[] {
  return pieces?.map((pj: any) => mapUnePieceJustificative(pj));
}

function getActions(actions: any, utilisateurs?: IUtilisateur[]): IAction[] {
  const actionsRequete: IAction[] = [];
  actions.forEach((a: any) => {
    const action = a as IAction;
    const trigramme = getNomPrenomUtilisateurAPartirId(action.idUtilisateur, utilisateurs ?? []);
    action.trigramme = trigramme ?? "";
    action.nomUtilisateur = a.nomUtilisateur ? a.nomUtilisateur : "";
    action.prenomUtilisateur = a.prenomUtilisateur ? a.prenomUtilisateur : "";
    actionsRequete.push(action);
  });
  return actionsRequete;
}

function getObservations(observations: any, utilisateurs?: IUtilisateur[]): IObservation[] {
  const observationsRequete: IObservation[] = [];
  observations.forEach((a: any) => {
    const observation = a as IObservation;
    const trigramme = getNomPrenomUtilisateurAPartirId(observation.idUtilisateur, utilisateurs ?? []);
    observation.trigramme = trigramme ?? "RECE";
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

function mappingRequete(data: any, utilisateurs?: IUtilisateur[]) {
  return {
    // Partie Requête
    id: data.id,
    numero: data.numeroFonctionnel,
    dateCreation: data.dateCreation,
    type: TypeRequete.getEnumFor(data.type),
    statutCourant: getStatutCourant(data.statut),
    titulaires: getTitulaires(data.titulaires),
    requerant: Requerant.mappingRequerant(data.requerant),
    idUtilisateur: data.idUtilisateur,
    idService: data.idService,
    observations: data.observations ? getObservations(data.observations, utilisateurs) : undefined,
    canal: TypeCanal.getEnumFor(data.canal),
    actions: getActions(data?.actions, utilisateurs),
    numeroRequeteOrigine: data.numeroRequeteOrigine
  };
}

export function mappingRequeteInformation(data: any, utilisateurs?: IUtilisateur[]): IRequeteInformation {
  return {
    ...mappingRequete(data, utilisateurs),
    //Partie Requête Delivrance
    sousType: SousTypeInformation.getEnumFor(data.sousType),
    objet: data.objet,
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

function mapUnePieceJustificativeCreation(piece?: any): IPieceJustificativeCreation {
  return {
    ...mapUnePieceJustificative(piece),
    idFichierNatali: piece.idFichierNatali || undefined,
    ordreNatali: piece.ordreNatali || undefined,
    libelle: piece.libelle || undefined,
    estPieceAnnexe: piece.estPieceAnnexe || undefined,
    idRc: piece.idRC || undefined,
    idRca: piece.idRCA || undefined,
    idPacs: piece.idPACS || undefined,
    idActe: piece.idActe || undefined,
    idPersonne: piece.idPersonne || undefined,
    documentPj: mapUnDocumentPJ(piece.documentPj || undefined),
    nouveauLibelleFichierPJ: piece.nouveauLibelleFichierPJ || undefined
  };
}

function mapPiecesJustificativesCreation(pieces?: any): IPieceJustificativeCreation[] {
  const piecesJustificatives: IPieceJustificativeCreation[] = pieces ? pieces?.map((pj: any) => mapUnePieceJustificativeCreation(pj)) : [];

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
    date: DateUtils.getFormatDateFromTimestamp(dateMessage),
    ...reste
  };
}

function mapUnDocumentPJ(document?: any): IDocumentPJ | undefined {
  return document
    ? {
        ...document,
        categorie: CategorieDocument.creationCategorieDocument(document.categorie, document.libelle)
      }
    : undefined;
}

function mapDocumentPJ(documents?: any): IDocumentPJ[] {
  return DocumentPJ.trie(documents?.map((document: any): IDocumentPJ => mapUnDocumentPJ(document) as IDocumentPJ));
}

export function mappingRequeteCreation(data: any, utilisateurs?: IUtilisateur[]): IRequeteCreation {
  const requete = mappingRequete(data, utilisateurs);

  const natureActeTranscrit = data.natureActeTranscrit;

  const estRequeteMariage =
    natureActeTranscrit === ENatureActeTranscrit.MARIAGE_AVEC_CCAM || natureActeTranscrit === ENatureActeTranscrit.MARIAGE_SANS_CCAM;

  return {
    ...data,
    ...requete,

    // Partie requête création
    sousType: SousTypeCreation.getEnumFor(data.sousType),
    numeroDossierMetier: data.numeroDossierMetier,
    numeroAncien: data.numeroAncienSI,
    piecesJustificatives: mapPiecesJustificativesCreation(data.piecesJustificatives),
    mandant: data.mandant ? getMandant(data.mandant) : undefined,
    provenanceNatali: {
      ...data.provenanceNatali,
      tagPriorisation: TagPriorisation.getEnumFor(data.provenanceNatali?.tagPriorisation),
      echanges: mapEchangesRetourSDANF(data.provenanceNatali?.echanges)
    },
    provenanceServicePublic: data.provenanceServicePublic,
    documentsPj: mapDocumentPJ(data.documentsPj || undefined),
    provenance: Provenance.getEnumFor(data.provenance),
    titulaires: mapTitulairesCreation(requete.titulaires),
    natureActeTranscrit,
    personnesSauvegardees: mapPersonnesSauvegardees(data.personnesSauvegardees || undefined, estRequeteMariage)
  };
}

export function mapTitulairesCreation(titulaires: any[]): ITitulaireRequeteCreation[] {
  return titulaires.map(titulaire => ({
    ...titulaire,
    qualite: QualiteFamille.getEnumFor(titulaire.qualite),
    decret: titulaire.decret && {
      numeroDecret: titulaire.decret.numeroDecret,
      dateSignature: DateUtils.getDateComposeFromTimestamp(titulaire.decret.dateSignature),
      datePublication: DateUtils.getDateComposeFromTimestamp(titulaire.decret.datePublication)
    },
    suiviDossiers: mapSuiviDossiers(titulaire.suiviDossiers || undefined)
  }));
}

function mapPersonnesSauvegardees(data?: any[], estRequeteMariage = false): IPersonneSauvegardee[] {
  const personnesSauvegardees: IPersonneSauvegardee[] = [];
  data?.forEach(dataCourant => {
    const role = RolePersonneSauvegardee.getEnumForEnFonctionNatureActeRequete(dataCourant.role, estRequeteMariage);
    if (role) {
      personnesSauvegardees.push({
        idPersonne: dataCourant.idPersonne,
        role
      });
    }
  });
  return personnesSauvegardees;
}

function mapSuiviDossiers(suiviDossiers?: any[]): ISuiviDossier[] | undefined {
  return suiviDossiers?.map(suiviDossier => ({
    idSuiviDossier: suiviDossier.id,
    idActe: suiviDossier.idActe || undefined,
    dateEtablissement: suiviDossier.dateEtablissement || undefined,
    jourEvenement: suiviDossier.jourEvenement || undefined,
    moisEvenement: suiviDossier.moisEvenement || undefined,
    anneeEvenement: suiviDossier.anneeEvenement || undefined,
    natureProjet: NatureProjetEtablissement.getEnumFor(suiviDossier.natureProjet || undefined),
    referenceActe: suiviDossier.referenceActe || undefined,
    avancement: AvancementProjetActe.getEnumFor(suiviDossier.avancement || undefined),
    unionActuelle: UnionActuelle.getEnumFor(suiviDossier.unionActuelle || undefined)
  }));
}
