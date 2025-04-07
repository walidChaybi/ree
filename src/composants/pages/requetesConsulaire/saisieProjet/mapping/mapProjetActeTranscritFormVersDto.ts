import { IActeEtrangerDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IActeEtrangerDto";
import { IAdresseCompleteDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IAdresseDto";
import { IDeclarantDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IDeclarantDto";
import { IEvenementCompletDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IEvenementDto";
import { IFiliationDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IFiliationDto";
import { IFormuleFinaleDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IFormuleFinaleDto";
import { IProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritDto";
import { ITitulaireDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/ITitulaireDto";
import { CadreNaissance } from "@model/etatcivil/enum/CadreNaissance";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { TypeRedactionActe } from "@model/etatcivil/enum/TypeRedactionActe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IProjetActeTranscritForm, ITitulaireTranscription } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { ILocalisation } from "@model/requete/IParents";
import { IParentTranscription } from "@model/requete/IParentsRequeteTranscription";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export const mapProjetActeTranscritFormVersDto = (ProjetActeTranscriptionForm: IProjetActeTranscritForm): IProjetActeTranscritDto => {
  const projetActeAEnvoyer: IProjetActeTranscritDto = {} as IProjetActeTranscritDto;
  projetActeAEnvoyer.modeCreation = TypeRedactionActe.TRANSCRIT;

  const naissanceTitulaireEvenement: IEvenementCompletDto = {
    annee: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.annee),
    mois: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.mois) || null,
    jour: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.jour) || null,
    heure: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.heure) || null,
    minute: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.minute) || null,
    pays: ProjetActeTranscriptionForm.titulaire.paysNaissance || null,
    ville: ProjetActeTranscriptionForm.titulaire.villeNaissance || null,
    region: ProjetActeTranscriptionForm.titulaire.regionNaissance || null,
    voie: ProjetActeTranscriptionForm.titulaire.adresseNaissance || null,
    neDansLeMariage: true,
    arrondissement: null,
    departement: null
  };

  projetActeAEnvoyer.evenement = {
    ...naissanceTitulaireEvenement
  };

  projetActeAEnvoyer.titulaires = [
    {
      ...mapTitulaire(ProjetActeTranscriptionForm, naissanceTitulaireEvenement)
    }
  ];
  projetActeAEnvoyer.acteEtranger = {
    ...mapActeEtranger(ProjetActeTranscriptionForm)
  };
  projetActeAEnvoyer.formuleFinale = {
    ...mapFormuleFinale(ProjetActeTranscriptionForm)
  };
  projetActeAEnvoyer.analyseMarginales = null;
  projetActeAEnvoyer.nature = NatureActe.NAISSANCE.libelle.toUpperCase();
  projetActeAEnvoyer.visibiliteArchiviste = TypeVisibiliteArchiviste.getKey(TypeVisibiliteArchiviste.NON);
  projetActeAEnvoyer.declarant = {
    ...mapDeclarantProjectActe(ProjetActeTranscriptionForm)
  };
  projetActeAEnvoyer.mentions = null;
  return projetActeAEnvoyer;
};

const mapDeclarantProjectActe = (projetActeTranscription: IProjetActeTranscritForm): IDeclarantDto => {
  const estDeclarantTiers = projetActeTranscription.declarant.identite === "TIERS";
  const typeLieuDomicile = projetActeTranscription.declarant.domicile?.typeLieu ?? "Inconnu";

  return {
    identiteDeclarant: projetActeTranscription.declarant.identite || null,
    complementDeclarant: (estDeclarantTiers && projetActeTranscription.declarant.complement) || null,
    nom: (estDeclarantTiers && projetActeTranscription.declarant.nom) || null,
    prenoms: (estDeclarantTiers && PrenomsForm.versPrenomsOrdonnesDto(projetActeTranscription.declarant.prenomsChemin)) || null,
    sexe: (estDeclarantTiers && projetActeTranscription.declarant.sexe) || null,
    age: (estDeclarantTiers && projetActeTranscription.declarant.age) || null,
    qualite: (estDeclarantTiers && projetActeTranscription.declarant?.qualite) || null,
    profession: (estDeclarantTiers && projetActeTranscription.declarant?.profession) || null,
    sansProfession: (estDeclarantTiers && projetActeTranscription.declarant.sansProfession) || null,
    adresseDomicile: {
      ville: (estDeclarantTiers && typeLieuDomicile !== "Inconnu" && projetActeTranscription.declarant.domicile?.ville) || null,
      arrondissement:
        (estDeclarantTiers && typeLieuDomicile === "France" && projetActeTranscription.declarant.domicile?.arrondissement) || null,
      voie: (estDeclarantTiers && typeLieuDomicile !== "Inconnu" && projetActeTranscription.declarant.domicile?.adresse) || null,
      region:
        (estDeclarantTiers && typeLieuDomicile === "Étranger" && getRegionDomicile(projetActeTranscription.declarant.domicile)) || null,
      pays: (estDeclarantTiers && typeLieuDomicile === "Étranger" && projetActeTranscription.declarant.domicile?.pays) || null
    }
  };
};
const mapTitulaire = (projetActe: IProjetActeTranscritForm, naissanceTitulaireEvenement: IEvenementCompletDto): ITitulaireDto => {
  const Titulaire: ITitulaireTranscription = projetActe.titulaire;
  const prenoms: string[] = PrenomsForm.versPrenomsStringDto(projetActe.titulaire.prenomsChemin);
  const lieuDeNaissanceConnu = !LieuxUtils.estPaysInconnu(Titulaire.paysNaissance ?? "Inconnu");
  return {
    nomActeEtranger: Titulaire.nomActeEtranger || null,
    nom: Titulaire.nomRetenuOEC.trim(),
    nomPartie1: Titulaire.nomSecable.nomPartie1 || null,
    nomPartie2: Titulaire.nomSecable.nomPartie2 || null,
    prenoms,
    sexe: Titulaire.sexe,
    ordre: 1,
    naissance: { ...naissanceTitulaireEvenement },
    pasDePrenom: !Boolean(prenoms.length),
    domicile: lieuDeNaissanceConnu
      ? {
          ville: Titulaire.villeNaissance || null,
          region: Titulaire.regionNaissance || null,
          pays: Titulaire.paysNaissance || null,
          voie: Titulaire.adresseNaissance || null,
          arrondissement: null
        }
      : null,
    filiations: mapFiliations(projetActe),
    reconnuPar: null
  };
};

const mapFiliationParParent = (parentForm: IParentTranscription, ordre: number, domicileCommun: boolean = false): IFiliationDto => {
  return {
    nom: parentForm.nom?.trim() || null,
    prenoms: PrenomsForm.versPrenomsStringDto(parentForm.prenomsChemin) || null,
    sexe: parentForm.sexe || null,
    naissance: mapFiliationNaissance(parentForm),
    lienParente: LienParente.PARENT,
    ordre,
    age: Number(parentForm.age) || null,
    sansProfession: parentForm.sansProfession ?? null,
    profession: parentForm.profession || null,
    domicile: ((ordre === 1 || !domicileCommun) && mapFiliationDomicile(parentForm)) || null,
    domicileCommun: (ordre === 2 && domicileCommun) || null
  };
};

const mapFiliationDomicile = (parentForm: IParentTranscription): IAdresseCompleteDto => {
  const lieuDomicileConnu = !LieuxUtils.estPaysInconnu(parentForm.domicile?.typeLieu);
  const lieuDomicileEstFrance = LieuxUtils.estPaysFrance(parentForm.domicile?.typeLieu);

  return {
    pays: (lieuDomicileConnu && (lieuDomicileEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.domicile?.pays)) || null,
    ville: (lieuDomicileConnu && parentForm.domicile?.ville) || null,
    region: getRegionDomicile(parentForm.domicile),
    arrondissement:
      (lieuDomicileEstFrance && LieuxUtils.estVilleMarseilleLyonParis(parentForm.domicile?.ville) && parentForm.domicile?.arrondissement) ||
      null,
    voie: parentForm.domicile?.adresse ?? null
  };
};
const getRegionDomicile = (domicile?: ILocalisation): string | null => {
  if (!domicile) return null;
  const lieuDomicileEstEtranger = LieuxUtils.estPaysEtranger(domicile?.typeLieu);
  const lieuDomicileEstFrance = LieuxUtils.estPaysFrance(domicile?.typeLieu);
  switch (true) {
    case lieuDomicileEstEtranger:
      return domicile?.etatProvince || null;
    case lieuDomicileEstFrance:
      return (!LieuxUtils.estVilleParis(domicile?.ville) && domicile?.departement) || null;
    default:
      return null;
  }
};

const mapFiliationNaissance = (parentForm: IParentTranscription): IEvenementCompletDto => {
  const lieuNaissanceConnu = !LieuxUtils.estPaysInconnu(parentForm.lieuNaissance?.typeLieu);
  const lieuNaissanceEstFrance = LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu);

  return {
    annee: Number(parentForm.dateNaissance?.annee) || null,
    mois: Number(parentForm.dateNaissance?.mois) || null,
    jour: Number(parentForm.dateNaissance?.jour) || null,
    heure: Number(parentForm.dateNaissance?.heure) || null,
    minute: Number(parentForm.dateNaissance?.minute) || null,
    neDansLeMariage: null,
    ville: (lieuNaissanceConnu && parentForm.lieuNaissance?.ville) || null,
    arrondissement:
      (lieuNaissanceEstFrance &&
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.lieuNaissance?.ville) &&
        parentForm.lieuNaissance?.arrondissement) ||
      null,
    region: getRegionNaissanceFiliation(parentForm),
    pays: (lieuNaissanceConnu && (lieuNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.lieuNaissance?.pays)) || null,
    voie: parentForm.lieuNaissance?.adresse || null,
    departement: (lieuNaissanceEstFrance && parentForm.lieuNaissance?.departement) || null
  };
};

const getRegionNaissanceFiliation = (parentForm: IParentTranscription): string | null => {
  switch (true) {
    case LieuxUtils.estPaysEtranger(parentForm.lieuNaissance?.typeLieu):
      return parentForm.lieuNaissance?.etatProvince || null;
    case LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu):
      return (!LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville) && parentForm.lieuNaissance?.departement) || null;
    default:
      return null;
  }
};

const mapFiliations = (projetActe: IProjetActeTranscritForm): IFiliationDto[] => {
  let filiation: IFiliationDto[] = [];
  const listeParents = [];
  projetActe.parents.parent1 && estParentRenseigne(projetActe.parents.parent1) && listeParents.push(projetActe.parents.parent1);
  projetActe.parents.parent2 && estParentRenseigne(projetActe.parents.parent2) && listeParents.push(projetActe.parents.parent2);
  listeParents.forEach((parent, index) => {
    const ordreDuParent = index + 1;
    filiation = [...filiation, mapFiliationParParent(parent, ordreDuParent, projetActe.parents?.domicileCommun)];
  });
  return filiation;
};

const estParentRenseigne = (parent: IParentTranscription): boolean => {
  return Boolean(parent.nom) || Boolean(parent.prenomsChemin?.prenom1);
};

const mapFormuleFinale = (projetActe: IProjetActeTranscritForm): IFormuleFinaleDto => {
  const estTransmetteurIdentiqueDemandeur = projetActe.formuleFinale.identiteTransmetteur === "Identique au demandeur";

  return {
    identiteDemandeur: projetActe.formuleFinale.identiteDemandeur || null,
    nomDemandeur: projetActe.formuleFinale?.nom || null,
    prenomDemandeur: PrenomsForm.versPrenomsStringDto(projetActe.formuleFinale?.prenomsChemin).toString() || null,
    qualiteDemandeur: projetActe.formuleFinale?.qualite || null,
    piecesProduites: projetActe.formuleFinale.piecesProduites || null,
    legalisation: projetActe.formuleFinale.legalisationApostille || null,
    autresPieces: projetActe.formuleFinale?.autresPieces || null,
    modeDepot: projetActe.formuleFinale.modeDepot || null,
    identiteTransmetteur: projetActe.formuleFinale.identiteDemandeur || null,
    nomTransmetteur: (estTransmetteurIdentiqueDemandeur && projetActe.formuleFinale.nom) || null
  };
};

const mapActeEtranger = (projetActe: IProjetActeTranscritForm): IActeEtrangerDto => {
  return {
    texteEnonciations: projetActe.autresEnonciations?.enonciations || null,
    typeActeEtranger: projetActe.acteEtranger?.typeActe || null,
    typeActe: projetActe.acteEtranger?.typeActeAutre || null,
    cadreNaissance: CadreNaissance.NE_DANS_LE_MARIAGE,
    jourEnregistrement: projetActe.acteEtranger.dateEnregistrement?.jour || null,
    moisEnregistrement: projetActe.acteEtranger.dateEnregistrement?.mois || null,
    anneeEnregistrement: projetActe.acteEtranger.dateEnregistrement?.annee || null,
    adresseEnregistrement: {
      ville: projetActe.acteEtranger.lieuEnregistrement?.ville || null,
      region: projetActe.acteEtranger.lieuEnregistrement?.etatProvince || null,
      pays: projetActe.acteEtranger.lieuEnregistrement?.pays || null,
      arrondissement: null,
      voie: null
    },
    redacteur: projetActe.acteEtranger?.redacteur || null,
    //TODO: Le formulaire de transcription contient un seul champ pour les deux, mais il est scindé en base, il faut séparer les champs dans le formulaire (STRECE-*)
    reference: projetActe.acteEtranger?.referenceComplement || null,
    complement: projetActe.acteEtranger?.referenceComplement || null,
    mentions: projetActe.mentions.mentions || null
  };
};
/* v8 ignore end */
