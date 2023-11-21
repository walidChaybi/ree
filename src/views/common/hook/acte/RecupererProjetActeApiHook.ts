import { getProjetActe } from "@api/appels/etatcivilApi";
import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { ICorpsExtraitRectification } from "@model/etatcivil/acte/ICorpsExtraitRectification";
import { ICorpsText } from "@model/etatcivil/acte/ICorpsText";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IDecretNaturalisation } from "@model/etatcivil/acte/IDecretNaturalisation";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IProjetFiliation } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { IAutresNoms } from "@model/etatcivil/commun/IAutresNoms";
import { IFamille } from "@model/etatcivil/commun/IFamille";
import { IFicheLien } from "@model/etatcivil/commun/IFicheLien";
import { IFicheLienActes } from "@model/etatcivil/commun/IFicheLienActes";
import { ILieuEvenement } from "@model/etatcivil/commun/ILieuEvenement";
import { IPersonne } from "@model/etatcivil/commun/IPersonne";
import { AutresNoms } from "@model/etatcivil/enum/AutresNoms";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeDeclarationConjointe } from "@model/etatcivil/enum/TypeDeclarationConjointe";
import { IDateCompose } from "@util/DateUtils";
import { logError } from "@util/LogManager";
import { getValeurOuUndefined } from "@util/Utils";
import { useEffect, useState } from "react";

export function useRecupererProjetActeApiHook(
  idActe?: string
): IProjetActe | undefined {
  const [resultat, setResultat] = useState<IProjetActe>();
  useEffect(() => {
    if (idActe) {
      getProjetActe(idActe)
        .then(result => {
          setResultat(mappingProjetActe(result.body.data));
        })
        .catch((error: any) => {
          logError({
            messageUtilisateur: "Impossible de récupérer le projet d'acte",
            error
          });
        });
    }
  }, [idActe]);

  return resultat;
}

function mappingProjetActe(data: any): IProjetActe {
  return {
    id: data.id,
    titulaires: mapTitulairesProjetActe(data.titulaires),
    evenement: mapEvenement(data.evenement),
    nature: NatureActe.getEnumFor(getValeurOuUndefined(data.nature)).libelle,
    numero: getValeurOuUndefined(data.numero),
    numeroBisTer: getValeurOuUndefined(data.numeroBisTer),
    personnes: mapPersonnes(data.personnes),
    estReecrit: getValeurOuUndefined(data.estReecrit),
    registre: mapRegistre(data.registre),
    dateDerniereMaj: getValeurOuUndefined(data.dateDerniereMaj),
    dateDerniereDelivrance: getValeurOuUndefined(data.dateDerniereDelivrance),
    dateCreation: getValeurOuUndefined(data.dateCreation),
    visibiliteArchiviste: getValeurOuUndefined(data.visibiliteArchiviste),
    analyseMarginales: mapAnalyseMarginales(data.analyseMarginales),
    corpsTexte: mapCorpsTexte(data.corpsTexte),
    type: getValeurOuUndefined(data.type),
    corpsExtraitRectifications: mapCorpsExtraitRectification(
      data.corpsExtraitRectifications
    ),
    mentions: mapMentions(data.mentions),
    declarant: mapDeclarant(data.declarant),
    numeroDossierNational: getValeurOuUndefined(data.numeroDossierNational),
    statut: getValeurOuUndefined(data.statut),
    dateStatut: getValeurOuUndefined(data.dateStatut),
    dateInitialisation: getValeurOuUndefined(data.dateInitialisation),
    modeCreation: getValeurOuUndefined(data.modeCreation)
  };
}

function mapTitulairesProjetActe(titulaires: any[]): ITitulaireProjetActe[] {
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
    prenomsDernierConjoint: getValeurOuUndefined(
      titulaire.prenomsDernierConjoint
    ),
    typeDeclarationConjointe: TypeDeclarationConjointe.getEnumFor(
      getValeurOuUndefined(titulaire.typeDeclarationConjointe)
    ),
    dateDeclarationConjointe: getValeurOuUndefined(
      titulaire.dateDeclarationConjointe
    ),
    identiteAvantDecret: getValeurOuUndefined(titulaire.identiteAvantDecret),
    decretNaturalisation: mapDecretNaturalisation(
      getValeurOuUndefined(titulaire.decretNaturalisation)
    ),
    pasDePrenom: getValeurOuUndefined(titulaire.pasDePrenom),
    reconnuPar: titulaire.reconnuPar
  }));
}

function mapEvenement(naissance?: any): IEvenement {
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
}

function mapDomicile(domicile?: any): IAdresse {
  return {
    voie: getValeurOuUndefined(domicile?.voie),
    ville: getValeurOuUndefined(domicile?.ville),
    arrondissement: getValeurOuUndefined(domicile?.arrondissement),
    region: getValeurOuUndefined(domicile?.region) ?? null,
    pays: getValeurOuUndefined(domicile?.pays)
  };
}

function mapFiliations(filiations: any[]): IProjetFiliation[] {
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
}

function mapDecretNaturalisation(
  decretNaturalisation: any
): IDecretNaturalisation {
  return {
    numeroDecret: getValeurOuUndefined(decretNaturalisation?.numeroDecret),
    dateSignature: getValeurOuUndefined(decretNaturalisation?.dateSignature),
    natureDecret: getValeurOuUndefined(decretNaturalisation?.natureDecret)
  };
}

function mapPersonnes(personnes?: any[]): IPersonne[] {
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
      parents: mapFamille(personne.parents),
      enfants: mapFamille(personne.enfants),
      actes: mapFicheLienActes(personne.actes),
      pacss: mapFicheLien(personne.pacss),
      rcs: mapFicheLien(personne.rcs),
      rcas: mapFicheLien(personne.rcas)
    })) || []
  );
}

function mapAutresNoms(autresNoms: any[]): IAutresNoms[] {
  return autresNoms.map(autreNom => ({
    nom: getValeurOuUndefined(autreNom.nom),
    type: AutresNoms.getEnumFor(getValeurOuUndefined(autreNom.type))
  }));
}

function mapLieuEvenement(evenement: any): ILieuEvenement {
  return {
    pays: getValeurOuUndefined(evenement.pays),
    ville: getValeurOuUndefined(evenement.ville),
    region: getValeurOuUndefined(evenement.region),
    arrondissement: getValeurOuUndefined(evenement.arrondissement)
  };
}

function mapDateEvenement(evenement: any): IDateCompose {
  return {
    jour: getValeurOuUndefined(evenement.jour),
    mois: getValeurOuUndefined(evenement.mois),
    annee: evenement.annee
  };
}

function mapFamille(familles: any[]): IFamille[] {
  return familles.map(famille => ({
    nom: getValeurOuUndefined(famille.nom),
    prenoms: getValeurOuUndefined(famille.prenoms)
  }));
}

function mapFicheLienActes(ficheLienActes: any[]): IFicheLienActes[] {
  return ficheLienActes.map(ficheLienActe => ({
    numero: getValeurOuUndefined(ficheLienActe.numero),
    id: getValeurOuUndefined(ficheLienActe.id),
    nature: NatureActe.getEnumFor(getValeurOuUndefined(ficheLienActe.nature)),
    referenceComplete: getValeurOuUndefined(ficheLienActe.referenceComplete)
  }));
}

function mapFicheLien(ficheLiens: any[]): IFicheLien[] {
  return ficheLiens.map(ficheLien => ({
    numero: getValeurOuUndefined(ficheLien.numero),
    id: getValeurOuUndefined(ficheLien.id),
    statut: getValeurOuUndefined(ficheLien.statut),
    referenceComplete: getValeurOuUndefined(ficheLien.referenceComplete)
  }));
}

function mapRegistre(registre: any): IRegistre {
  // TODO: Finir mapping à partir de là !
  return {
    id: getValeurOuUndefined(registre?.id),
    famille: getValeurOuUndefined(registre?.famille),
    pocopa: getValeurOuUndefined(registre?.pocopa),
    type: getValeurOuUndefined(registre?.type),
    annee: getValeurOuUndefined(registre?.annee),
    support1: getValeurOuUndefined(registre?.support1),
    support2: getValeurOuUndefined(registre?.support2),
    numeroDernierActe: getValeurOuUndefined(registre?.numeroDernierActe),
    pvOuverture: getValeurOuUndefined(registre?.pvOuverture),
    dateOuverture: getValeurOuUndefined(registre?.dateOuverture),
    pvFermeture: getValeurOuUndefined(registre?.pvFermeture),
    dateFermeture: getValeurOuUndefined(registre?.dateFermeture),
    decret2017: getValeurOuUndefined(registre?.decret2017)
  };
}

function mapAnalyseMarginales(
  projetsAnalyseMarginale: any[]
): IProjetAnalyseMarginale[] {
  return projetsAnalyseMarginale;
}

function mapCorpsTexte(corpsTexte: any): ICorpsText {
  return corpsTexte;
}

function mapCorpsExtraitRectification(
  corpsExtraitRectification: any[]
): ICorpsExtraitRectification[] {
  return corpsExtraitRectification;
}

function mapMentions(mentions: any[]): IMention[] {
  return mentions;
}

function mapDeclarant(declarant: any): IDeclarant {
  return declarant;
}
