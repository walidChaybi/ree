import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { ICorpsTexte } from "@model/etatcivil/acte/ICorpsTexte";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IDecretNaturalisation } from "@model/etatcivil/acte/IDecretNaturalisation";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IRegistreDto, Registre } from "@model/etatcivil/acte/Registre";
import { IMentionDto, Mention } from "@model/etatcivil/acte/mention/Mention";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IFiliationProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { IAutresNoms } from "@model/etatcivil/commun/AutresNoms";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { ILieuEvenement } from "@model/etatcivil/commun/ILieuEvenement";
import { IPersonne } from "@model/etatcivil/commun/Personne";
import { AutresNoms } from "@model/etatcivil/enum/ETypeAutreNom";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IDateCompose } from "@util/DateUtils";
import { getValeurOuUndefined } from "@util/Utils";

export const mappingProjetActe = (data: any): IProjetActe => {
  return {
    id: data.id,
    titulaires: mapTitulairesProjetActe(data.titulaires),
    evenement: mapEvenement(data.evenement),
    nature: NatureActe.getEnumFor(getValeurOuUndefined(data.nature)).libelle,
    numero: getValeurOuUndefined(data.numero),
    numeroBisTer: getValeurOuUndefined(data.numeroBisTer),
    personnes: mapPersonnes(data.personnes),
    estReecrit: getValeurOuUndefined(data.estReecrit),
    registre: Registre.depuisDto(data.registre as IRegistreDto),
    dateDerniereMaj: getValeurOuUndefined(data.dateDerniereMaj),
    dateDerniereDelivrance: getValeurOuUndefined(data.dateDerniereDelivrance),
    dateCreation: getValeurOuUndefined(data.dateCreation),
    visibiliteArchiviste: getValeurOuUndefined(data.visibiliteArchiviste),
    analyseMarginales: mapAnalyseMarginales(data.analyseMarginales),
    corpsTexte: mapCorpsTexte(data.corpsTexte),
    type: getValeurOuUndefined(data.type),
    mentions: (data.mentions as IMentionDto[]).map(Mention.depuisDto).filter((mention): mention is Mention => mention !== null),
    declarant: mapDeclarant(data.declarant),
    numeroDossierNational: getValeurOuUndefined(data.numeroDossierNational),
    statut: getValeurOuUndefined(data.statut),
    dateStatut: getValeurOuUndefined(data.dateStatut),
    dateInitialisation: getValeurOuUndefined(data.dateInitialisation),
    modeCreation: getValeurOuUndefined(data.modeCreation)
  };
};

const mapTitulairesProjetActe = (titulaires: any[]): ITitulaireProjetActe[] => {
  return titulaires.map(titulaire => ({
    nom: getValeurOuUndefined(titulaire.nom),
    prenoms: getValeurOuUndefined(titulaire.prenoms),
    ordre: getValeurOuUndefined(titulaire.ordre),
    sexe: getValeurOuUndefined(titulaire.sexe),
    naissance: mapEvenement(getValeurOuUndefined(titulaire.naissance)),
    age: getValeurOuUndefined(titulaire.age),
    profession: getValeurOuUndefined(titulaire.profession),
    domicile: mapDomicile(titulaire.domicile),
    filiations: mapFiliations(getValeurOuUndefined(titulaire.filiations)),
    nomPartie1: getValeurOuUndefined(titulaire.nomPartie1),
    nomPartie2: getValeurOuUndefined(titulaire.nomPartie2),
    nomAvantMariage: getValeurOuUndefined(titulaire.nomAvantMariage),
    nomApresMariage: getValeurOuUndefined(titulaire.nomApresMariage),
    nomDernierConjoint: getValeurOuUndefined(titulaire.nomDernierConjoint),
    prenomsDernierConjoint: getValeurOuUndefined(titulaire.prenomsDernierConjoint),
    typeDeclarationConjointe: titulaire.typeDeclarationConjointe,
    dateDeclarationConjointe: getValeurOuUndefined(titulaire.dateDeclarationConjointe),
    identiteAvantDecret: getValeurOuUndefined(titulaire.identiteAvantDecret),
    decretNaturalisation: mapDecretNaturalisation(getValeurOuUndefined(titulaire.decretNaturalisation)),
    pasDePrenom: getValeurOuUndefined(titulaire.pasDePrenom),
    reconnuPar: titulaire.reconnuPar
  }));
};

const mapEvenement = (naissance?: any): IEvenement => {
  return {
    id: getValeurOuUndefined(naissance?.id),
    heure: getValeurOuUndefined(naissance?.heure),
    minute: getValeurOuUndefined(naissance?.minute),
    jour: getValeurOuUndefined(naissance?.jour),
    mois: getValeurOuUndefined(naissance?.mois),
    annee: getValeurOuUndefined(naissance?.annee),
    voie: getValeurOuUndefined(naissance?.voie),
    ville: getValeurOuUndefined(naissance?.ville),
    arrondissement: getValeurOuUndefined(naissance?.arrondissement),
    region: getValeurOuUndefined(naissance?.region),
    pays: naissance?.pays,
    lieuReprise: getValeurOuUndefined(naissance?.lieuReprise),
    lieuFormate: getValeurOuUndefined(naissance?.lieuFormate),
    neDansLeMariage: getValeurOuUndefined(naissance?.neDansLeMariage)
  };
};

const mapDomicile = (domicile?: any): IAdresse => {
  return {
    voie: getValeurOuUndefined(domicile?.voie),
    ville: getValeurOuUndefined(domicile?.ville),
    arrondissement: getValeurOuUndefined(domicile?.arrondissement),
    region: getValeurOuUndefined(domicile?.region) ?? null,
    pays: getValeurOuUndefined(domicile?.pays)
  };
};

const mapFiliations = (filiations: any[]): IFiliationProjetActeTranscrit[] => {
  return filiations.map(filiation => ({
    lienParente: getValeurOuUndefined(filiation.lienParente),
    ordre: getValeurOuUndefined(filiation.ordre),
    nom: getValeurOuUndefined(filiation.nom),
    sexe: getValeurOuUndefined(filiation.sexe),
    naissance: mapEvenement(filiation.naissance),
    age: getValeurOuUndefined(filiation.age),
    profession: getValeurOuUndefined(filiation.profession),
    domicile: mapDomicile(filiation?.domicile),
    prenoms: getValeurOuUndefined(filiation.prenoms)
  }));
};

const mapDecretNaturalisation = (decretNaturalisation: any): IDecretNaturalisation | null => {
  return decretNaturalisation
    ? {
        numeroDecret: getValeurOuUndefined(decretNaturalisation?.numeroDecret),
        dateSignature: decretNaturalisation?.dateSignature ? new Date(decretNaturalisation?.dateSignature) : undefined,
        natureDecret: getValeurOuUndefined(decretNaturalisation?.natureDecret)
      }
    : null;
};

const mapPersonnes = (personnes?: any[]): IPersonne[] => {
  return (
    personnes?.map(personne => ({
      id: getValeurOuUndefined(personne.id),
      nom: getValeurOuUndefined(personne.nom),
      autresNoms: mapAutresNoms(personne.autresNoms),
      prenoms: getValeurOuUndefined(personne.prenoms),
      autresPrenoms: getValeurOuUndefined(personne.autresPrenoms),
      lieuNaissance: mapLieuEvenement(personne.naissance),
      dateNaissance: mapDateEvenement(personne.naissance),
      nationalite: Nationalite.getEnumFor(personne.nationalite),
      dateDeces: mapDateEvenement(personne.dateDeces),
      lieuDeces: mapLieuEvenement(personne.lieuDeces),
      sexe: getValeurOuUndefined(personne.sexe),
      pacss: mapFicheLien(personne.pacss),
      rcs: mapFicheLien(personne.rcs),
      rcas: mapFicheLien(personne.rcas)
    })) || []
  );
};

const mapAutresNoms = (autresNoms: any[]): IAutresNoms[] => {
  return autresNoms.map(autreNom => ({
    nom: getValeurOuUndefined(autreNom.nom),
    type: AutresNoms.getEnumFor(getValeurOuUndefined(autreNom.type))
  }));
};

const mapLieuEvenement = (evenement: any): ILieuEvenement => {
  return {
    pays: getValeurOuUndefined(evenement.pays),
    ville: getValeurOuUndefined(evenement.ville),
    region: getValeurOuUndefined(evenement.region),
    arrondissement: getValeurOuUndefined(evenement.arrondissement)
  };
};

const mapDateEvenement = (evenement: any): IDateCompose => {
  return {
    jour: getValeurOuUndefined(evenement.jour),
    mois: getValeurOuUndefined(evenement.mois),
    annee: evenement.annee
  };
};

const mapFicheLien = (ficheLiens: any[]): IFicheLien[] => {
  return ficheLiens.map(ficheLien => ({
    numero: getValeurOuUndefined(ficheLien.numero),
    id: getValeurOuUndefined(ficheLien.id),
    statut: getValeurOuUndefined(ficheLien.statut),
    referenceComplete: getValeurOuUndefined(ficheLien.referenceComplete)
  }));
};

const mapAnalyseMarginales = (projetsAnalyseMarginale: any[]): IProjetAnalyseMarginale[] => {
  return projetsAnalyseMarginale;
};

const mapCorpsTexte = (corpsTexte: any): ICorpsTexte => {
  return corpsTexte;
};

const mapDeclarant = (declarant: any): IDeclarant => {
  return declarant;
};
