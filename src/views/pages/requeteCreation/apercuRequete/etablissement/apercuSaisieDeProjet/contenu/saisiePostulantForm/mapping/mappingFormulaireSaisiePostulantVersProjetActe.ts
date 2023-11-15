import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IProjetFiliation } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import {
  ISaisieParentSousForm,
  ISaisiePostulantSousForm,
  ISaisieProjetPostulantForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { getPrenomsTableauStringVersPrenomsOrdonnes } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { getNombreOuNull, getValeurOuNull, SPC, UN } from "@util/Utils";

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
    mois: getValeurOuNull(+saisieProjetPostulant.titulaire.dateNaissance.mois),
    jour: getValeurOuNull(+saisieProjetPostulant.titulaire.dateNaissance.jour),
    pays: saisieProjetPostulant.titulaire.lieuNaissance.paysNaissance,
    ville: saisieProjetPostulant.titulaire.lieuNaissance.villeNaissance,
    region: saisieProjetPostulant.titulaire.lieuNaissance.etatCantonProvince,
    neDansLeMariage:
      saisieProjetPostulant.titulaire.lieuNaissance.neDansMariage === "OUI"
  } as IEvenement;

  const mappingAnalyseMarginale = () => {
    const prenoms = getPrenomsTableauStringVersPrenomsOrdonnes(
      saisieProjetPostulant.titulaire.analyseMarginale.prenoms
    ).map(p => p.prenom);
    return [
      {
        id: projetActeAEnvoyer?.analyseMarginales?.[0].id,
        titulaires: projetActeAEnvoyer.titulaires.map(titulaire => ({
          ...titulaire,
          nom: saisieProjetPostulant.titulaire.analyseMarginale.nom,
          prenoms
        }))
      }
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
  projetActeAEnvoyer.analyseMarginales =
    mappingAnalyseMarginale() as IProjetAnalyseMarginale[];
  projetActeAEnvoyer.nature =
    NatureActe.getKey(
      NatureActe.getEnumFromLibelle(saisieProjetPostulant.projet.natureActe)
    ) || saisieProjetPostulant.projet.natureActe;
  projetActeAEnvoyer.numeroDossierNational = numeroDossierNational;
  projetActeAEnvoyer.visibiliteArchiviste = TypeVisibiliteArchiviste.getKey(
    TypeVisibiliteArchiviste.NON
  );
  projetActeAEnvoyer.declarant = saisieProjetPostulant.autres.declarant
    ? ({
        ...projetActeAEnvoyer.declarant,
        identiteDeclarant: getValeurOuNull(
          saisieProjetPostulant.autres.declarant
        ),
        complementDeclarant: getValeurOuNull(
          saisieProjetPostulant.autres.autreDeclarant
        )
      } as IDeclarant)
    : null;
  return projetActeAEnvoyer;
}

function getFiliationParParent(
  parentForm: ISaisieParentSousForm,
  ordre: number
): IProjetFiliation {
  const lieuNaissanceExiste =
    parentForm.lieuNaissance.lieuNaissance !== "INCONNU";
  const lieuNaissanceEstFrance =
    parentForm.lieuNaissance.lieuNaissance === "FRANCE";
  const prenoms = getPrenomsTableauStringVersPrenomsOrdonnes(
    parentForm.prenom.prenoms
  ).map(p => p.prenom);
  return {
    lienParente: LienParente.PARENT,
    ordre,
    nom: getValeurOuNull(parentForm.nom),
    sexe: parentForm.sexe,
    naissance: {
      pays: lieuNaissanceExiste
        ? lieuNaissanceEstFrance
          ? EtrangerFrance.FRANCE.libelle
          : parentForm.lieuNaissance.paysNaissance
        : null,
      ville:
        lieuNaissanceExiste &&
        getValeurOuNull(parentForm.lieuNaissance.villeNaissance),
      region: lieuNaissanceExiste
        ? lieuNaissanceEstFrance
          ? parentForm.lieuNaissance.departementNaissance
          : parentForm.lieuNaissance.regionNaissance
        : null,
      arrondissement:
        lieuNaissanceEstFrance &&
        getValeurOuNull(parentForm.lieuNaissance.arrondissementNaissance),
      annee: getNombreOuNull(parentForm.dateNaissance.date?.annee),
      mois: getNombreOuNull(parentForm.dateNaissance.date?.mois),
      jour: getNombreOuNull(parentForm.dateNaissance.date?.jour)
    } as IEvenement,
    age: getValeurOuNull(parseInt(parentForm.dateNaissance.age)),
    prenoms: prenoms.length && getValeurOuNull(prenoms)
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
  const adresse = acte.autres.adresse;
  const lieuDeNaissanceExiste = adresse !== "INCONNU";
  const lieuDeNaissanceEstFrance = adresse === "FRANCE";
  return {
    nom: postulant.nom,
    ordre: UN,
    prenoms,
    sexe: postulant.sexe,
    age: null,
    naissance: naissancePostulantEvenement,
    domicile: lieuDeNaissanceExiste
      ? ({
          ville: getValeurOuNull(acte.autres.ville),
          region:
            adresse === "FRANCE" && getValeurOuNull(acte.autres.departement),
          pays: getValeurOuNull(
            lieuDeNaissanceEstFrance
              ? EtrangerFrance.FRANCE.libelle
              : acte.autres.pays
          ),
          arrondissement:
            adresse === "FRANCE" &&
            acte.autres.ville === "Paris" &&
            getValeurOuNull(acte.autres.arrondissement)
        } as IAdresse)
      : null,
    filiations: getFiliation(acte),
    nomPartie1: getValeurOuNull(postulant.nomSecable.nomPartie1),
    nomPartie2: getValeurOuNull(postulant.nomSecable.nomPartie2),
    identiteAvantDecret: getValeurOuNull(postulant.identite),
    pasDePrenom: prenoms.length === 0,
    decretNaturalisation:
      acte.acquisition.nature !== ""
        ? {
            dateSignature:
              acte.acquisition.date.annee &&
              new Date(
                +acte.acquisition.date.annee,
                +acte.acquisition.date.mois - UN,
                +acte.acquisition.date.jour + UN
              ),
            natureDecret: acte.acquisition.nature
          }
        : null,
    reconnuPar: getValeurOuNull(acte.autres.reconnaissance)
  } as ITitulaireProjetActe;
}
