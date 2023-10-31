import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IProjetFiliation } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import {
  ISaisieParentSousForm,
  ISaisiePostulantSousForm,
  ISaisieProjetPostulantForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { getPrenomsTableauStringVersPrenomsOrdonnes } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { getValeurOuUndefined, SPC, UN } from "@util/Utils";
import { FRANCE } from "@utilMetier/LieuxUtils";

export function mappingSaisieProjetPostulantFormVersProjetActe(
  saisieProjetPostulant: ISaisieProjetPostulantForm,
  numeroDossierNational?: string,
  projetActeExistant?: IProjetActe
): IProjetActe {
  const projetActeAEnvoyer = projetActeExistant
    ? { ...projetActeExistant, corpsTexte: undefined }
    : ({} as IProjetActe);

  projetActeAEnvoyer.modeCreation = TypeRedactionActe.ETABLI;

  const naissancePostulantEvenement = {
    annee: +saisieProjetPostulant.titulaire.dateNaissance.annee,
    mois: +saisieProjetPostulant.titulaire.dateNaissance.mois,
    jour: +saisieProjetPostulant.titulaire.dateNaissance.jour,
    pays: saisieProjetPostulant.titulaire.lieuNaissance.paysNaissance,
    ville: saisieProjetPostulant.titulaire.lieuNaissance.villeNaissance,
    region: saisieProjetPostulant.titulaire.lieuNaissance.etatCantonProvince,
    neDansLeMariage:
      saisieProjetPostulant.titulaire.lieuNaissance.neDansMariage === "OUI"
  } as IEvenement;
  const mappingAnalyseMarginale = (): IProjetAnalyseMarginale[] => {
    return [
      {
        id: projetActeAEnvoyer?.analyseMarginales?.[0].id,
        titulaires: projetActeAEnvoyer.titulaires
      } as IProjetAnalyseMarginale
    ];
  };

  projetActeAEnvoyer.evenement = {
    ...projetActeAEnvoyer.evenement,
    ...naissancePostulantEvenement
  };
  projetActeAEnvoyer.titulaires = [
    {
      ...mapPostulantVersTitulaireProjetActe(
        saisieProjetPostulant,
        naissancePostulantEvenement
      )
    } as ITitulaireProjetActe
  ];
  projetActeAEnvoyer.analyseMarginales = mappingAnalyseMarginale();
  projetActeAEnvoyer.nature =
    NatureActe.getKey(
      NatureActe.getEnumFromLibelle(saisieProjetPostulant.projet.natureActe)
    ) || saisieProjetPostulant.projet.natureActe;
  projetActeAEnvoyer.numeroDossierNational = numeroDossierNational;
  projetActeAEnvoyer.visibiliteArchiviste = TypeVisibiliteArchiviste.getKey(
    TypeVisibiliteArchiviste.NON
  );
  projetActeAEnvoyer.declarant = {
    ...projetActeAEnvoyer.declarant,
    identiteDeclarant:
      saisieProjetPostulant.autres.declarant ||
      TypeDeclarant.getKey(TypeDeclarant.ABSCENCE_DE_VALEUR),
    complementDeclarant:
      saisieProjetPostulant.autres.autreDeclarant || undefined
  } as IDeclarant;
  projetActeAEnvoyer.reconnuPar =
    saisieProjetPostulant.autres.reconnaissance || undefined;

  return projetActeAEnvoyer;
}

function getFiliationParParent(
  parentForm: ISaisieParentSousForm,
  ordre: number
): IProjetFiliation {
  const neEnFrance = parentForm.lieuNaissance.lieuNaissance === FRANCE;
  return {
    lienParente: LienParente.PARENT,
    ordre,
    nom: parentForm.nom,
    sexe: parentForm.sexe,
    naissance: {
      pays: neEnFrance ? FRANCE : parentForm.lieuNaissance.paysNaissance,
      ville: parentForm.lieuNaissance.villeNaissance,
      region: neEnFrance
        ? parentForm.lieuNaissance.departementNaissance
        : parentForm.lieuNaissance.regionNaissance,
      arrondissement: parentForm.lieuNaissance.arrondissementNaissance,
      annee: getValeurOuUndefined(parentForm.dateNaissance.date.annee),
      mois: getValeurOuUndefined(parentForm.dateNaissance.date.mois),
      jour: getValeurOuUndefined(parentForm.dateNaissance.date.jour)
    } as IEvenement,
    age: +parentForm.dateNaissance.age,
    prenoms: getPrenomsTableauStringVersPrenomsOrdonnes(
      parentForm.prenom.prenoms
    ).map(p => p.prenom)
  } as IProjetFiliation;
}

function getFiliation(acte: ISaisieProjetPostulantForm): IProjetFiliation[] {
  let filiation: IProjetFiliation[] = [];
  const listeParents: ISaisieParentSousForm[] = [];
  acte.parents.parent1 && listeParents.push(acte.parents.parent1);
  acte.parents.parent2 && listeParents.push(acte.parents.parent2);
  listeParents.forEach((parent, index) => {
    const ordreDuParent = index + 1;
    filiation = [...filiation, getFiliationParParent(parent, ordreDuParent)];
  });
  return filiation;
}

function getPrenomsTitulaire(postulant: ISaisiePostulantSousForm): string[] {
  const listePrenoms: string[] = getPrenomsTableauStringVersPrenomsOrdonnes(
    postulant.prenoms.prenoms
  ).map(p => p.prenom);
  return listePrenoms.length ? listePrenoms : [SPC];
}

function mapPostulantVersTitulaireProjetActe(
  acte: ISaisieProjetPostulantForm,
  naissancePostulantEvenement: IEvenement
): ITitulaireProjetActe {
  const postulant: ISaisiePostulantSousForm = acte.titulaire;
  const prenoms: string[] = getPrenomsTitulaire(postulant);
  return {
    nom: postulant.nom,
    ordre: UN,
    prenoms,
    sexe: postulant.sexe,
    naissance: naissancePostulantEvenement,
    age: 0,
    domicile: {
      ville: acte.autres.ville,
      region:
        acte.autres.adresse === FRANCE ? acte.autres.departement : undefined,
      pays: acte.autres.pays
    } as IAdresse,
    filiations: getFiliation(acte),
    nomPartie1: postulant.nomSecable.nomPartie1 || undefined,
    nomPartie2: postulant.nomSecable.nomPartie2 || undefined,
    identiteAvantDecret: postulant.identite,
    decretNaturalisation: {
      dateSignature:
        acte.acquisition.date.annee &&
        new Date(
          +acte.acquisition.date.annee,
          +acte.acquisition.date.mois - UN,
          +acte.acquisition.date.jour + UN
        ),
      natureDecret: acte.acquisition.nature || undefined
    },
    pasDePrenom: prenoms.length === 0
  } as ITitulaireProjetActe;
}
