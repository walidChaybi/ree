import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import { IDeclarant } from "@model/etatcivil/acte/IDeclarant";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IProjetAnalyseMarginale } from "@model/etatcivil/acte/projetActe/IAnalyseMarginaleProjetActe";
import { IFiliationProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/IFiliationProjetActe";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ITitulaireProjetActe } from "@model/etatcivil/acte/projetActe/ITitulaireProjetActe";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import {
  ISaisieParentSousForm,
  ISaisiePostulantSousForm,
  ISaisieProjetPostulantForm
} from "@model/form/creation/etablissement/ISaisiePostulantForm";
import { TypeDeclarant } from "@model/requete/enum/TypeDeclarant";
import { getPrenomsTableauStringVersPrenomsOrdonnes } from "@pages/requeteDelivrance/saisirRequete/hook/mappingCommun";
import { SPC, UN, ZERO, getNombreOuNull } from "@util/Utils";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export function mappingSaisieProjetPostulantFormVersProjetActe(
  saisieProjetPostulant: ISaisieProjetPostulantForm,
  numeroDossierNational?: string,
  projetActeExistant?: IProjetActe
): IProjetActe {
  const projetActeAEnvoyer = projetActeExistant ? { ...projetActeExistant, corpsTexte: undefined } : ({} as IProjetActe);
  projetActeAEnvoyer.modeCreation = ETypeRedactionActe.ETABLI;

  const naissancePostulantEvenement = {
    annee: +saisieProjetPostulant.titulaire.dateNaissance.annee,
    mois: +saisieProjetPostulant.titulaire.dateNaissance.mois || null,
    jour: +saisieProjetPostulant.titulaire.dateNaissance.jour || null,
    pays: saisieProjetPostulant.titulaire.lieuNaissance.paysNaissance,
    ville: saisieProjetPostulant.titulaire.lieuNaissance.villeNaissance,
    region: saisieProjetPostulant.titulaire.lieuNaissance.regionNaissance,
    neDansLeMariage: saisieProjetPostulant.titulaire.lieuNaissance.neDansMariage === "OUI"
  } as IEvenement;

  const mappingAnalyseMarginale = () => {
    const prenoms = getPrenomsTableauStringVersPrenomsOrdonnes(saisieProjetPostulant.titulaire.analyseMarginale.prenoms).map(p => p.prenom);
    return [
      {
        id: projetActeAEnvoyer?.analyseMarginales?.[ZERO].id,
        titulaires: projetActeAEnvoyer.titulaires.map(titulaire => ({
          ...titulaire,
          nom: saisieProjetPostulant.titulaire.analyseMarginale.nom.trim(),
          prenoms: prenoms.map(prenom => prenom.trim())
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
      ...mapPostulantVersTitulaireProjetActe(saisieProjetPostulant, naissancePostulantEvenement)
    } as ITitulaireProjetActe
  ];
  projetActeAEnvoyer.analyseMarginales = mappingAnalyseMarginale() as IProjetAnalyseMarginale[];
  projetActeAEnvoyer.nature =
    NatureActe.getKey(NatureActe.getEnumFromLibelle(saisieProjetPostulant.projet.natureActe)) || saisieProjetPostulant.projet.natureActe;
  projetActeAEnvoyer.numeroDossierNational = numeroDossierNational;
  projetActeAEnvoyer.visibiliteArchiviste = TypeVisibiliteArchiviste.getKey(TypeVisibiliteArchiviste.NON);
  projetActeAEnvoyer.declarant = saisieProjetPostulant.autres.declarant
    ? ({
        ...projetActeAEnvoyer.declarant,
        identiteDeclarant: saisieProjetPostulant.autres.declarant || null,
        complementDeclarant:
          TypeDeclarant.getEnumFor(saisieProjetPostulant.autres.declarant) === TypeDeclarant.AUTRE
            ? saisieProjetPostulant.autres.autreDeclarant
            : null
      } as IDeclarant)
    : null;
  return projetActeAEnvoyer;
}

export function mapPostulantVersTitulaireProjetActe(
  acte: ISaisieProjetPostulantForm,
  naissancePostulantEvenement: IEvenement
): ITitulaireProjetActe {
  const postulant: ISaisiePostulantSousForm = acte.titulaire;
  const prenoms: string[] = getPrenomsTitulaire(postulant);
  const adresse = acte.autres.adresse;
  const lieuDeNaissanceExiste = !LieuxUtils.estPaysInconnu(adresse);
  const lieuDeNaissanceEstFrance = LieuxUtils.estPaysFrance(adresse);
  return {
    nom: postulant.nom.trim(),
    ordre: UN,
    prenoms,
    sexe: postulant.sexe,
    age: null,
    naissance: naissancePostulantEvenement,
    domicile: lieuDeNaissanceExiste
      ? ({
          ville: acte.autres.ville || null,
          region: lieuDeNaissanceEstFrance && !LieuxUtils.estVilleParis(acte.autres.ville) ? acte.autres.departement || null : null,
          pays: lieuDeNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : acte.autres.pays || null,
          arrondissement:
            lieuDeNaissanceEstFrance && LieuxUtils.estVilleMarseilleLyonParis(acte.autres.ville) ? acte.autres.arrondissement || null : null
        } as IAdresse)
      : null,
    filiations: getFiliation(acte),
    nomPartie1: postulant.nomSecable.nomPartie1 || null,
    nomPartie2: postulant.nomSecable.nomPartie2 || null,
    identiteAvantDecret: postulant.identite || null,
    pasDePrenom: prenoms.length === ZERO,
    decretNaturalisation:
      acte.acquisition.nature !== ""
        ? {
            dateSignature:
              acte.acquisition.date.annee &&
              new Date(Date.UTC(+acte.acquisition.date.annee, +acte.acquisition.date.mois - UN, +acte.acquisition.date.jour)),
            natureDecret: acte.acquisition.nature
          }
        : null,
    reconnuPar: acte.autres.reconnaissance || null
  } as ITitulaireProjetActe;
}

export function getFiliationParParent(parentForm: ISaisieParentSousForm, ordre: number): IFiliationProjetActeTranscrit {
  const prenoms = getPrenomsTableauStringVersPrenomsOrdonnes(parentForm.prenom.prenoms).map(p => p.prenom);
  return {
    lienParente: LienParente.PARENT,
    ordre,
    nom: parentForm.nom.trim() || null,
    sexe: parentForm.sexe,
    naissance: getFiliationNaissance(parentForm) as IEvenement,
    age: parseInt(parentForm.dateNaissance.age) || null,
    prenoms: prenoms.length ? prenoms.map(prenom => prenom.trim()) : null
  } as IFiliationProjetActeTranscrit;
}

export function getFiliationNaissance(parentForm: ISaisieParentSousForm) {
  const lieuNaissanceExiste = !LieuxUtils.estPaysInconnu(parentForm.lieuNaissance.lieuNaissance);
  const lieuNaissanceEstFrance = LieuxUtils.estPaysFrance(parentForm.lieuNaissance.lieuNaissance);

  return {
    pays: lieuNaissanceExiste ? (lieuNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.lieuNaissance.paysNaissance) : null,
    ville: lieuNaissanceExiste ? parentForm.lieuNaissance.villeNaissance : null,
    region: getRegionNaissanceFiliation(parentForm),
    arrondissement:
      lieuNaissanceEstFrance && LieuxUtils.estVilleMarseilleLyonParis(parentForm.lieuNaissance.villeNaissance)
        ? parentForm.lieuNaissance.arrondissementNaissance
        : null,
    annee: getNombreOuNull(parentForm.dateNaissance.date?.annee),
    mois: getNombreOuNull(parentForm.dateNaissance.date?.mois),
    jour: getNombreOuNull(parentForm.dateNaissance.date?.jour)
  };
}
function getRegionNaissanceFiliation(parentForm: ISaisieParentSousForm) {
  const lieuNaissanceEstEtranger = LieuxUtils.estPaysEtranger(parentForm.lieuNaissance.lieuNaissance);
  const lieuNaissanceEstFrance = LieuxUtils.estPaysFrance(parentForm.lieuNaissance.lieuNaissance);
  if (lieuNaissanceEstEtranger) {
    return parentForm.lieuNaissance.regionNaissance;
  } else if (lieuNaissanceEstFrance) {
    return !LieuxUtils.estVilleParis(parentForm.lieuNaissance.villeNaissance) ? parentForm.lieuNaissance.departementNaissance : null;
  } else {
    return null;
  }
}

export function getFiliation(acte: ISaisieProjetPostulantForm): IFiliationProjetActeTranscrit[] {
  let filiation: IFiliationProjetActeTranscrit[] = [];
  const listeParents: ISaisieParentSousForm[] = [];
  acte.parents.parent1 && estParentRenseigne(acte.parents.parent1) && listeParents.push(acte.parents.parent1);
  acte.parents.parent2 && estParentRenseigne(acte.parents.parent2) && listeParents.push(acte.parents.parent2);
  listeParents.forEach((parent, index) => {
    const ordreDuParent = index + UN;
    filiation = [...filiation, getFiliationParParent(parent, ordreDuParent)];
  });
  return filiation;
}

function getPrenomsTitulaire(postulant: ISaisiePostulantSousForm): string[] {
  const listePrenoms: string[] = getPrenomsTableauStringVersPrenomsOrdonnes(postulant.prenoms.prenoms).map(p => p.prenom.trim());
  return listePrenoms.length ? listePrenoms : [SPC];
}

function estParentRenseigne(parent: ISaisieParentSousForm): boolean {
  return Boolean(parent.nom) || getPrenomsTableauStringVersPrenomsOrdonnes(parent.prenom?.prenoms)?.length > ZERO;
}
