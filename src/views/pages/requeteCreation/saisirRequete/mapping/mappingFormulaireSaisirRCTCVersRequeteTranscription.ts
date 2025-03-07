import { DEPARTEMENT_NAISSANCE, INCONNUE } from "@composant/formulaire/ConstantesNomsForm";
import { ISaisieRequeteRCTCAEnvoyer } from "@hook/requete/CreationRequeteCreationApiHook";
import {
  IAdresseForm,
  INationalitesForm,
  IPrenomsForm,
  IRequerantForm,
  ISaisieRequeteRCTC
} from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { Prenoms } from "@model/form/delivrance/ISaisirRequetePageForm";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import {
  DEUX,
  SPC,
  UN,
  auMoinsUneProprieteEstRenseigne,
  getTableauAPartirElementsNonVides,
  getValeurOuUndefined,
  mapPrenomsVersPrenomsOrdonnes
} from "@util/Utils";
import { NatureActe } from "./../../../../../model/etatcivil/enum/NatureActe";
import {
  IEvenementMariageParentsForm,
  IEvenementReconnaissanceTitulaireForm,
  IIdentiteTitulaireForm,
  IParentForm
} from "./../../../../../model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { SousTypeCreation } from "./../../../../../model/requete/enum/SousTypeCreation";
import { TypeCanal } from "./../../../../../model/requete/enum/TypeCanal";
import { TypeRequete } from "./../../../../../model/requete/enum/TypeRequete";
import { SNP } from "./../../../../common/util/Utils";

export function mappingSaisieRequeteRCTCVersRequetesAEnvoyer(saisie: ISaisieRequeteRCTC): ISaisieRequeteRCTCAEnvoyer {
  return {
    villeRegistre: saisie.requete.registre.cle,
    canal: TypeCanal.COURRIER.nom,
    type: TypeRequete.CREATION.nom,
    sousType: SousTypeCreation.RCTC.nom,
    provenance: Provenance.COURRIER.nom,
    natureActeTranscrit: getValeurOuUndefined(saisie.requete.natureActe),
    lienRequerant: mapLienRequerant(saisie.requete.lienRequerant),
    titulaires: mapTitulairesRCTC(
      saisie.titulaire,
      saisie.parents.parent1,
      saisie.parents.parent2,
      saisie.parents.mariage,
      saisie.parents.reconnaissance
    ),
    requerant: mapRequerantRCTC(saisie.requerant)
  };
}

function mapTitulairesRCTC(
  saisieTitulaire: IIdentiteTitulaireForm,
  saisieParent1: IParentForm,
  saisieParent2: IParentForm,
  saisieEvenementMariage: IEvenementMariageParentsForm,
  saisieEvenementReconnaissance: IEvenementReconnaissanceTitulaireForm
): any[] {
  const titulaires = [
    mapTitulaireActeTranscritDresse(saisieTitulaire, saisieEvenementReconnaissance),
    mapParent(saisieParent1, UN, saisieEvenementMariage)
  ];
  if (saisieParent2 && auMoinsUneProprieteEstRenseigne(saisieParent2)) {
    titulaires.push(mapParent(saisieParent2, DEUX, saisieEvenementMariage));
  }
  return titulaires;
}

function mapRequerantRCTC(saisieRequerant: IRequerantForm): any {
  return {
    nomFamille: getValeurOuUndefined(saisieRequerant.nom),
    detailQualiteParticulier: {
      nomUsage: getValeurOuUndefined(saisieRequerant.nomUsage)
    },
    prenom: getValeurOuUndefined(saisieRequerant.prenom),
    adresse: mapAdresseRequerant(saisieRequerant.adresse),
    qualite: Qualite.PARTICULIER.nom,
    courriel: getValeurOuUndefined(saisieRequerant.adresse.adresseCourriel),
    telephone: getValeurOuUndefined(saisieRequerant.adresse.numeroTelephone),
    courrielAutreContact: getValeurOuUndefined(saisieRequerant.autreAdresseCourriel),
    telephoneAutreContact: getValeurOuUndefined(saisieRequerant.autreNumeroTelephone)
  };
}

function mapTitulaire(saisieTitulaire: IIdentiteTitulaireForm | IParentForm): any {
  return {
    id: saisieTitulaire.identifiant,
    prenoms: mapPrenoms(saisieTitulaire.prenoms, false),
    sexe: getValeurOuUndefined(saisieTitulaire.sexe),
    jourNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.jour),
    moisNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.mois),
    anneeNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.annee),
    villeNaissance: getValeurOuUndefined(saisieTitulaire.naissance.ville),
    paysNaissance: saisieTitulaire.naissance.typeLieu === "France" ? "France" : saisieTitulaire.naissance.pays,
    arrondissementNaissance: saisieTitulaire.naissance.arrondissement,
    departementNaissance: saisieTitulaire.naissance.departement,
    lieuNaissance: saisieTitulaire.naissance.typeLieu,
    regionNaissance: getValeurOuUndefined(
      saisieTitulaire.naissance.etatProvince ||
        (DEPARTEMENT_NAISSANCE in saisieTitulaire.naissance ? saisieTitulaire.naissance.departement : undefined)
    ),
    nationalite: INCONNUE,
    adresseNaissance: ""
  };
}

function mapTitulaireActeTranscritDresse(
  saisieTitulaireActeTranscritDresse: IIdentiteTitulaireForm,
  saisieEvenementReconnaissance: IEvenementReconnaissanceTitulaireForm
): any {
  const nomNaissance = saisieTitulaireActeTranscritDresse.nomActeEtranger
    ? getValeurOuUndefined(saisieTitulaireActeTranscritDresse.nomActeEtranger)
    : SNP;

  return {
    ...mapTitulaire(saisieTitulaireActeTranscritDresse),
    typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
    position: UN,
    nomNaissance,
    nomSouhaite: getValeurOuUndefined(saisieTitulaireActeTranscritDresse.nomSouhaiteActeFR),
    evenementUnions: mapReconnaissanceTitulaireActe(saisieEvenementReconnaissance)
  };
}

function mapParent(saisieParent: IParentForm, position: number, saisieEvenementMariage: IEvenementMariageParentsForm): any {
  return {
    ...mapTitulaire(saisieParent),
    nomNaissance: getValeurOuUndefined(saisieParent.nom),
    typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
    qualite: QualiteFamille.getKey(QualiteFamille.PARENT),
    position,
    nationalites: mapNationalites(saisieParent.nationalites),
    evenementUnions: mapMariageParents(saisieEvenementMariage)
  };
}

function mapPrenoms(saisiePrenoms: IPrenomsForm, pasDePrenomConnu: boolean): any[] {
  return pasDePrenomConnu
    ? [
        {
          prenom: SPC,
          numeroOrdre: UN
        }
      ]
    : mapPrenomsVersPrenomsOrdonnes(retirePrenomVide(saisiePrenoms));
}

export function retirePrenomVide(prenomsSaisie?: Prenoms) {
  const prenoms = [];
  for (const prenom in prenomsSaisie) {
    if (prenomsSaisie[prenom] !== "") {
      prenoms.push(prenomsSaisie[prenom]);
    }
  }

  return prenoms;
}

function mapNationalites(saisieNationalites: INationalitesForm): any[] {
  return getTableauAPartirElementsNonVides(
    saisieNationalites.nationalite1,
    saisieNationalites.nationalite2,
    saisieNationalites.nationalite3
  ).map(saisieNationalite => ({ nationalite: saisieNationalite }));
}

function mapMariageParents(saisieEvenementMariage: IEvenementMariageParentsForm): any[] {
  return saisieEvenementMariage.parentMarie === "NON"
    ? []
    : [
        {
          id: getValeurOuUndefined(saisieEvenementMariage.identifiant),
          type: NatureActe.getKey(NatureActe.MARIAGE),
          jour: getValeurOuUndefined(saisieEvenementMariage.dateMariage.jour),
          mois: getValeurOuUndefined(saisieEvenementMariage.dateMariage.mois),
          annee: getValeurOuUndefined(saisieEvenementMariage.dateMariage.annee),
          ville: getValeurOuUndefined(saisieEvenementMariage.villeDeMariage),
          pays: getPaysEvenement(
            getValeurOuUndefined(saisieEvenementMariage.lieuDuMariage),
            getValeurOuUndefined(saisieEvenementMariage.paysDuMariage)
          )
        }
      ];
}

function mapReconnaissanceTitulaireActe(saisieEvenementReconnaissance: IEvenementReconnaissanceTitulaireForm): any[] {
  return saisieEvenementReconnaissance.titulaireReconnu === "NON"
    ? []
    : [
        {
          id: getValeurOuUndefined(saisieEvenementReconnaissance.identifiant),
          type: NatureActe.getKey(NatureActe.RECONNAISSANCE),
          jour: getValeurOuUndefined(saisieEvenementReconnaissance.dateReconnaissance.jour),
          mois: getValeurOuUndefined(saisieEvenementReconnaissance.dateReconnaissance.mois),
          annee: getValeurOuUndefined(saisieEvenementReconnaissance.dateReconnaissance.annee),
          ville: getValeurOuUndefined(saisieEvenementReconnaissance.villeReconnaissance),
          region: getValeurOuUndefined(
            saisieEvenementReconnaissance.regionEtatReconnaissance || saisieEvenementReconnaissance.departementReconnaissance
          ),
          pays: getPaysEvenement(
            getValeurOuUndefined(saisieEvenementReconnaissance.lieuActeReconnaissance),
            getValeurOuUndefined(saisieEvenementReconnaissance.paysReconnaissance)
          )
        }
      ];
}

function mapLienRequerant(saisieLienRequerant: string): any {
  return {
    typeLienRequerant: getValeurOuUndefined(saisieLienRequerant)
  };
}

function mapAdresseRequerant(saisieAdresseRequerant: IAdresseForm): any {
  return {
    ligne2: getValeurOuUndefined(saisieAdresseRequerant.complementDestinataire),
    ligne3: getValeurOuUndefined(saisieAdresseRequerant.complementPointGeo),
    ligne4: getValeurOuUndefined(saisieAdresseRequerant.voie),
    ligne5: getValeurOuUndefined(saisieAdresseRequerant.lieuDit),
    codePostal: getValeurOuUndefined(saisieAdresseRequerant.codePostal),
    ville: getValeurOuUndefined(saisieAdresseRequerant.commune),
    pays: getValeurOuUndefined(saisieAdresseRequerant.pays)
  };
}

function getPaysEvenement(lieuEvenement: string, paysEvenement: string): string {
  return lieuEvenement === "FRANCE" ? "FRANCE" : paysEvenement;
}
