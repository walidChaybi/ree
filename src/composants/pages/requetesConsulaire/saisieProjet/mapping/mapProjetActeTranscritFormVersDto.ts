import { IAdresse } from "@model/etatcivil/acte/IAdresse";
import {
  IDeclarantProjetActeTranscritDto,
  declarantTranscritDtoVide
} from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/DeclarantProjetActeTranscrit";
import { IEvenementProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/EvenementProjetActeTranscrit";
import { IFiliationTitulaireProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FiliationTitulaireProjetActeTranscrit";
import { IFormuleFinaleDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/FormuleFinale";
import { IActeEtrangerDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IActeEtrangerDto";
import { IProjetActeTranscritFormDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/IProjetActeTranscritFormDto";
import { ITitulaireProjetActeTranscritDto } from "@model/etatcivil/acte/projetActe/ProjetActeTranscritDto/TitulaireProjetActeTranscrit";
import { CadreNaissance } from "@model/etatcivil/enum/CadreNaissance";
import { ELegalisationApostille } from "@model/etatcivil/enum/ELegalisationApostille";
import { EModeDepot } from "@model/etatcivil/enum/EModeDepot";
import { EPieceProduite } from "@model/etatcivil/enum/EPieceProduite";
import { ETypeRedactionActe } from "@model/etatcivil/enum/ETypeRedactionActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { EIdentite } from "@model/etatcivil/enum/Identite";
import { LienParente } from "@model/etatcivil/enum/LienParente";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IProjetActeTranscritForm, ITitulaireTranscription } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { ILocalisation } from "@model/requete/IParents";
import { IParentTranscription } from "@model/requete/IParentsRequeteTranscription";
import { LieuxUtils } from "@utilMetier/LieuxUtils";

export const mapProjetActeTranscritFormVersDto = (ProjetActeTranscriptionForm: IProjetActeTranscritForm): IProjetActeTranscritFormDto => {
  const projetActeAEnvoyer: IProjetActeTranscritFormDto = {} as IProjetActeTranscritFormDto;
  projetActeAEnvoyer.modeCreation = ETypeRedactionActe.TRANSCRIT;

  const naissanceTitulaireEvenement: IEvenementProjetActeTranscritDto = {
    annee: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.annee) || null,
    mois: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.mois) || null,
    jour: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.jour) || null,
    heure: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.heure) || null,
    minute: Number(ProjetActeTranscriptionForm.titulaire?.dateNaissance?.minute) || null,
    pays: ProjetActeTranscriptionForm.titulaire.paysNaissance,
    ville: ProjetActeTranscriptionForm.titulaire.villeNaissance,
    region: ProjetActeTranscriptionForm.titulaire.regionNaissance,
    voie: ProjetActeTranscriptionForm.titulaire.adresseNaissance,
    neDansLeMariage: true,
    arrondissement: null,
    departement: null
  };

  projetActeAEnvoyer.evenement = naissanceTitulaireEvenement;

  projetActeAEnvoyer.titulaires = [mapTitulaire(ProjetActeTranscriptionForm, naissanceTitulaireEvenement)];
  projetActeAEnvoyer.acteEtranger = mapActeEtranger(ProjetActeTranscriptionForm);
  projetActeAEnvoyer.formuleFinale = mapFormuleFinale(ProjetActeTranscriptionForm);
  projetActeAEnvoyer.analyseMarginales = [];
  projetActeAEnvoyer.nature = "NAISSANCE";
  projetActeAEnvoyer.visibiliteArchiviste = TypeVisibiliteArchiviste.getKey(TypeVisibiliteArchiviste.NON);
  projetActeAEnvoyer.declarant = mapDeclarantProjectActe(ProjetActeTranscriptionForm);
  projetActeAEnvoyer.mentions = [];
  return projetActeAEnvoyer;
};

const mapDeclarantProjectActe = (projetActeTranscription: IProjetActeTranscritForm): IDeclarantProjetActeTranscritDto => {
  const estDeclarantTiers = projetActeTranscription.declarant.identite === ("TIERS" as keyof typeof EIdentite);

  return {
    ...(estDeclarantTiers
      ? {
          complementDeclarant: projetActeTranscription.declarant.complement ?? null,
          nom: projetActeTranscription.declarant.nom ?? null,
          prenoms: PrenomsForm.versPrenomsOrdonnesDto(projetActeTranscription.declarant.prenomsChemin) ?? null,
          sexe: projetActeTranscription.declarant.sexe ?? "INCONNU",
          age: projetActeTranscription.declarant.age ?? null,
          qualite: projetActeTranscription.declarant?.qualite ?? null,
          sansProfession: projetActeTranscription.declarant.sansProfession || null,
          profession: projetActeTranscription.declarant?.profession ?? null,
          adresseDomicile: localisationVersAdresse(projetActeTranscription.declarant.domicile) ?? null
        }
      : declarantTranscritDtoVide),
    identiteDeclarant: projetActeTranscription.declarant.identite
  };
};

const localisationVersAdresse = (domicile: ILocalisation | undefined): IAdresse | null => {
  if (LieuxUtils.estPaysInconnu(domicile?.typeLieu)) return null;

  return {
    ville: domicile?.ville ?? "",
    arrondissement: (LieuxUtils.estPaysFrance(domicile?.typeLieu) && domicile?.arrondissement) || "",
    voie: domicile?.adresse ?? "",
    region: getRegionDomicile(domicile) ?? "",
    pays: (LieuxUtils.estPaysFrance(domicile?.typeLieu) ? "France" : domicile?.pays) ?? ""
  };
};

const mapTitulaire = (
  projetActe: IProjetActeTranscritForm,
  naissanceTitulaireEvenement: IEvenementProjetActeTranscritDto
): ITitulaireProjetActeTranscritDto => {
  const Titulaire: ITitulaireTranscription = projetActe.titulaire;
  const prenoms: string[] = PrenomsForm.versPrenomsStringDto(projetActe.titulaire.prenomsChemin);
  const lieuDeNaissanceConnu = !LieuxUtils.estPaysInconnu(Titulaire.paysNaissance?.trim() ?? "Inconnu");
  return {
    nomActeEtranger: Titulaire.nomActeEtranger,
    nom: Titulaire.nomRetenuOEC.trim(),
    nomPartie1: Titulaire.nomSecable.nomPartie1 || null,
    nomPartie2: Titulaire.nomSecable.nomPartie2 || null,
    prenoms,
    sexe: Titulaire.sexe,
    ordre: 1,
    naissance: { ...naissanceTitulaireEvenement },
    pasDePrenom: !prenoms.length,
    domicile: lieuDeNaissanceConnu
      ? {
          ville: Titulaire.villeNaissance ?? "",
          region: Titulaire.regionNaissance ?? "",
          pays: Titulaire.paysNaissance ?? "",
          voie: Titulaire.adresseNaissance ?? ""
        }
      : null,
    filiations: mapFiliations(projetActe)
  };
};

const mapFiliationParParent = (
  parentForm: IParentTranscription,
  ordre: number,
  domicileCommun: boolean = false
): IFiliationTitulaireProjetActeTranscritDto => {
  return {
    nom: parentForm.nom?.trim() ?? "", // Nom est toujours défini, la condition est vérifiée avant l'appel de la fonction
    prenoms: PrenomsForm.versPrenomsStringDto(parentForm.prenomsChemin),
    sexe: (parentForm.sexe as keyof typeof ESexe) ?? null,
    naissance: mapFiliationNaissance(parentForm),
    lienParente: LienParente.PARENT,
    ordre,
    age: Number(parentForm.age) || null,
    sansProfession: parentForm.sansProfession ?? null,
    profession: parentForm.profession ?? null,
    domicile: ((ordre === 1 || !domicileCommun) && mapFiliationDomicile(parentForm)) || null,
    domicileCommun: (ordre === 2 && domicileCommun) || null
  };
};

const mapFiliationDomicile = (parentForm: IParentTranscription): IAdresse => {
  const lieuDomicileConnu = !LieuxUtils.estPaysInconnu(parentForm.domicile?.typeLieu);
  const lieuDomicileEstFrance = LieuxUtils.estPaysFrance(parentForm.domicile?.typeLieu);

  return {
    pays: (lieuDomicileConnu && (lieuDomicileEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.domicile?.pays)) || "",
    ville: (lieuDomicileConnu && parentForm.domicile?.ville) || "",
    region: getRegionDomicile(parentForm.domicile),
    arrondissement:
      (lieuDomicileEstFrance &&
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.domicile?.ville?.trim()) &&
        parentForm.domicile?.arrondissement) ||
      undefined,
    voie: (lieuDomicileConnu && parentForm.domicile?.adresse) || undefined
  };
};

const getRegionDomicile = (domicile?: ILocalisation): string => {
  if (!domicile) return "";

  switch (true) {
    case LieuxUtils.estPaysEtranger(domicile?.typeLieu):
      return domicile?.etatProvince ?? "";
    case LieuxUtils.estPaysFrance(domicile?.typeLieu):
      return (!LieuxUtils.estVilleParis(domicile?.ville?.trim()) && domicile?.departement) || "";
    default:
      return "";
  }
};

const mapFiliationNaissance = (parentForm: IParentTranscription): IEvenementProjetActeTranscritDto => {
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
        LieuxUtils.estVilleMarseilleLyonParis(parentForm.lieuNaissance?.ville?.trim()) &&
        parentForm.lieuNaissance?.arrondissement) ||
      null,
    region: getRegionNaissanceFiliation(parentForm),
    pays: (lieuNaissanceConnu && (lieuNaissanceEstFrance ? EtrangerFrance.FRANCE.libelle : parentForm.lieuNaissance?.pays)) || null,
    voie: (lieuNaissanceConnu && parentForm.lieuNaissance?.adresse) || null,
    departement:
      (lieuNaissanceEstFrance &&
        !LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville?.trim()) &&
        parentForm.lieuNaissance?.departement) ||
      null
  };
};

const getRegionNaissanceFiliation = (parentForm: IParentTranscription): string | null => {
  switch (true) {
    case LieuxUtils.estPaysEtranger(parentForm.lieuNaissance?.typeLieu):
      return parentForm.lieuNaissance?.etatProvince ?? null;
    case LieuxUtils.estPaysFrance(parentForm.lieuNaissance?.typeLieu):
      return (!LieuxUtils.estVilleParis(parentForm.lieuNaissance?.ville?.trim()) && parentForm.lieuNaissance?.departement) || null;
    default:
      return null;
  }
};

const mapFiliations = (projetActe: IProjetActeTranscritForm): IFiliationTitulaireProjetActeTranscritDto[] => {
  let filiation: IFiliationTitulaireProjetActeTranscritDto[] = [];
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
    identiteDemandeur: (projetActe.formuleFinale.identiteDemandeur as keyof typeof EIdentite) || null,
    nomDemandeur: projetActe.formuleFinale?.nom ?? null,
    prenomDemandeur: PrenomsForm.versPrenomsStringDto(projetActe.formuleFinale?.prenomsChemin).toString() || null,
    qualiteDemandeur: projetActe.formuleFinale?.qualite ?? null,
    pieceProduite: (projetActe.formuleFinale.pieceProduite as keyof typeof EPieceProduite) || null,
    legalisation: (projetActe.formuleFinale.legalisationApostille as keyof typeof ELegalisationApostille) || null,
    autresPieces: projetActe.formuleFinale?.autresPieces ?? null,
    modeDepot: (projetActe.formuleFinale.modeDepot as keyof typeof EModeDepot) || null,
    identiteTransmetteur: (projetActe.formuleFinale.identiteDemandeur as keyof typeof EIdentite) || null,
    nomTransmetteur: (estTransmetteurIdentiqueDemandeur && projetActe.formuleFinale.nom) || null
  };
};

const mapActeEtranger = (projetActe: IProjetActeTranscritForm): IActeEtrangerDto => {
  return {
    texteEnonciations: projetActe.autresEnonciations?.enonciations ?? null,
    typeActeEtranger: projetActe.acteEtranger?.typeActe ?? null,
    infoTypeActe: projetActe.acteEtranger?.infoTypeActe ?? null,
    cadreNaissance: CadreNaissance.NE_DANS_LE_MARIAGE,
    jourEnregistrement: projetActe.acteEtranger.dateEnregistrement?.jour ?? null,
    moisEnregistrement: projetActe.acteEtranger.dateEnregistrement?.mois ?? null,
    anneeEnregistrement: projetActe.acteEtranger.dateEnregistrement?.annee ?? null,
    adresseEnregistrement: {
      ville: projetActe.acteEtranger.lieuEnregistrement?.ville ?? "",
      region: projetActe.acteEtranger.lieuEnregistrement?.etatProvince ?? "",
      pays: projetActe.acteEtranger.lieuEnregistrement?.pays ?? ""
    },
    redacteur: projetActe.acteEtranger?.redacteur ?? null,
    reference: projetActe.acteEtranger?.referenceComplement || null,
    complement: projetActe.acteEtranger?.referenceComplement || null,
    mentions: projetActe.mentions.mentions ?? null
  };
};
/* v8 ignore stop */
