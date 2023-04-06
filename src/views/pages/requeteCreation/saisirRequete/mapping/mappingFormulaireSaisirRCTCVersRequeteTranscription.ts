import { INCONNUE } from "@composant/formulaire/ConstantesNomsForm";
import { ISaisieRequeteRCTCAEnvoyer } from "@hook/requete/CreationRequeteCreationApiHook";
import {
  IAdresseForm,
  INationalitesForm,
  IRequerantForm,
  ISaisieRequeteRCTC
} from "@model/form/creation/transcription/ISaisirRequeteRCTCPageForm";
import { IPrenomsForm } from "@model/form/delivrance/ISaisieExtraitForm";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { QualiteFamille } from "@model/requete/enum/QualiteFamille";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import {
  auMoinsUneProprieteEstRenseigne,
  DEUX,
  getTableauAPartirElementsNonVides,
  getValeurOuUndefined,
  mapPrenomsVersPrenomsOrdonnes,
  SPC,
  UN
} from "@util/Utils";
import {
  PAS_DE_NOM_ACTE_ETRANGER,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU
} from "../../../../common/composant/formulaire/ConstantesNomsForm";
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

export function mappingSaisieRequeteRCTCVersRequetesAEnvoyer(
  saisie: ISaisieRequeteRCTC
): ISaisieRequeteRCTCAEnvoyer {
  return {
    villeRegistre: saisie.requete.registre, 
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
    mapTitulaireActeTranscritDresse(
      saisieTitulaire,
      saisieEvenementReconnaissance
    ),
    mapParent(saisieParent1, UN, saisieEvenementMariage)
  ];
  if (auMoinsUneProprieteEstRenseigne(saisieParent2)) {
    titulaires.push(mapParent(saisieParent2, DEUX, saisieEvenementMariage));
  }
  return titulaires;
}

function mapRequerantRCTC(saisieRequerant: IRequerantForm): any {
  return {
    nomFamille: getValeurOuUndefined(saisieRequerant.nom),
    nomUsage: getValeurOuUndefined(saisieRequerant.nomUsage),
    prenom: getValeurOuUndefined(saisieRequerant.prenom),
    adresse: mapAdresseRequerant(saisieRequerant.adresse),
    qualite: Qualite.PARTICULIER.nom,
    courriel: getValeurOuUndefined(saisieRequerant.adresse.adresseCourriel),
    telephone: getValeurOuUndefined(saisieRequerant.adresse.numeroTelephone),
    courrielAutreContact: getValeurOuUndefined(
      saisieRequerant.autreAdresseCourriel
    ),
    telephoneAutreContact: getValeurOuUndefined(
      saisieRequerant.autreNumeroTelephone
    )
  };
}

function mapTitulaire(
  saisieTitulaire: IIdentiteTitulaireForm | IParentForm
): any {
  return {
    prenoms: mapPrenoms(
      saisieTitulaire.prenoms,
      saisieTitulaire.pasDePrenomConnu.includes(PAS_DE_PRENOM_CONNU)
    ),
    sexe: getValeurOuUndefined(saisieTitulaire.sexe),
    jourNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.jour),
    moisNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.mois),
    anneeNaissance: getValeurOuUndefined(saisieTitulaire.dateNaissance.annee),
    villeNaissance: getValeurOuUndefined(
      saisieTitulaire.naissance.villeNaissance
    ),
    regionNaissance: getValeurOuUndefined(
      saisieTitulaire.naissance.regionNaissance
    ),
    nationalite: INCONNUE
  };
}

function mapTitulaireActeTranscritDresse(
  saisieTitulaireActeTranscritDresse: IIdentiteTitulaireForm,
  saisieEvenementReconnaissance: IEvenementReconnaissanceTitulaireForm
): any {
  const nomNaissance =
    saisieTitulaireActeTranscritDresse.noms.pasDeNomActeEtranger.includes(
      PAS_DE_NOM_ACTE_ETRANGER
    )
      ? SNP
      : getValeurOuUndefined(
          saisieTitulaireActeTranscritDresse.noms.nomActeEtranger
        );

  return {
    ...mapTitulaire(saisieTitulaireActeTranscritDresse),
    typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE,
    position: UN,
    nomNaissance,
    nomSouhaite: getValeurOuUndefined(
      saisieTitulaireActeTranscritDresse.noms.nomSouhaiteActeFR
    ),
    paysNaissance: getValeurOuUndefined(
      saisieTitulaireActeTranscritDresse.naissance.paysNaissance
    ),
    evenementUnions: mapReconnaissanceTitulaireActe(
      saisieEvenementReconnaissance
    )
  };
}

function mapParent(
  saisieParent: IParentForm,
  position: number,
  saisieEvenementMariage: IEvenementMariageParentsForm
): any {
  return {
    ...mapTitulaire(saisieParent),
    nomNaissance: saisieParent.pasDeNomConnu.includes(PAS_DE_NOM_CONNU)
      ? SNP
      : getValeurOuUndefined(saisieParent.nom),
    typeObjetTitulaire: TypeObjetTitulaire.FAMILLE,
    qualite: QualiteFamille.getKey(QualiteFamille.PARENT),
    position,
    nationalites: mapNationalites(saisieParent.nationalites),
    evenementUnions: mapMariageParents(saisieEvenementMariage),
    paysNaissance: getPaysEvenement(
      getValeurOuUndefined(saisieParent.naissance.lieuNaissance),
      getValeurOuUndefined(saisieParent.naissance.paysNaissance)
    ),
    paysStatutRefugie: saisieParent.paysStatutRefugie,
    paysOrigine: saisieParent.paysOrigine
  };
}

function mapPrenoms(
  saisiePrenoms: IPrenomsForm,
  pasDePrenomConnu: boolean
): any[] {
  return pasDePrenomConnu
    ? [
        {
          prenom: SPC,
          numeroOrdre: UN
        }
      ]
    : mapPrenomsVersPrenomsOrdonnes(
        getTableauAPartirElementsNonVides(
          saisiePrenoms.prenom1,
          saisiePrenoms.prenom2,
          saisiePrenoms.prenom3
        )
      );
}

function mapNationalites(saisieNationalites: INationalitesForm): any[] {
  return getTableauAPartirElementsNonVides(
    saisieNationalites.nationalite1,
    saisieNationalites.nationalite2,
    saisieNationalites.nationalite3
  ).map(saisieNationalite => ({ nationalite: saisieNationalite }));
}

function mapMariageParents(
  saisieEvenementMariage: IEvenementMariageParentsForm
): any[] {
  return saisieEvenementMariage.parentMarie === "NON"
    ? []
    : [
        {
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

function mapReconnaissanceTitulaireActe(
  saisieEvenementReconnaissance: IEvenementReconnaissanceTitulaireForm
): any[] {
  return saisieEvenementReconnaissance.titulaireReconnu === "NON"
    ? []
    : [
        {
          type: NatureActe.getKey(NatureActe.RECONNAISSANCE),
          jour: getValeurOuUndefined(
            saisieEvenementReconnaissance.dateReconnaissance.jour
          ),
          mois: getValeurOuUndefined(
            saisieEvenementReconnaissance.dateReconnaissance.mois
          ),
          annee: getValeurOuUndefined(
            saisieEvenementReconnaissance.dateReconnaissance.annee
          ),
          ville: getValeurOuUndefined(
            saisieEvenementReconnaissance.villeReconnaissance
          ),
          region: getValeurOuUndefined(
            saisieEvenementReconnaissance.regionEtatReconnaissance
          ),
          pays: getPaysEvenement(
            getValeurOuUndefined(
              saisieEvenementReconnaissance.lieuActeReconnaissance
            ),
            getValeurOuUndefined(
              saisieEvenementReconnaissance.paysReconnaissance
            )
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

function getPaysEvenement(
  lieuEvenement: string,
  paysEvenement: string
): string {
  return lieuEvenement === "FRANCE" ? "FRANCE" : paysEvenement;
}
