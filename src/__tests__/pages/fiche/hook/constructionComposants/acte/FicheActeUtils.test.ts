import {
  userDroitConsulterArchive,
  userDroitConsulterPerimetreMEAE,
  userDroitConsulterPerimetreTUNIS
} from "../../../../../../mock/data/connectedUserAvecDroit";
import { Droit } from "../../../../../../model/Droit";
import { IFicheActe } from "../../../../../../model/etatcivil/acte/IFicheActe";
import { IRegistre } from "../../../../../../model/etatcivil/acte/IRegistre";
import { ITypeRegistre } from "../../../../../../model/etatcivil/acte/ITypeRegistre";
import { TypeVisibiliteArchiviste } from "../../../../../../model/etatcivil/enum/TypeVisibiliteArchiviste";
import { IDroit, IProfil } from "../../../../../../model/Habilitation";
import { IOfficierSSOApi } from "../../../../../../model/IOfficierSSOApi";
import { IPerimetre, PERIMETRE_MEAE } from "../../../../../../model/IPerimetre";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import {
  getPanelsActe,
  getParamsAffichageFicheActe,
  IParamsAffichage
} from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/FicheActeUtils";
import { acte } from "../../../data/ficheActe";

const resumeActeLibelle = "Résumé de l'acte";
test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre MEAE", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe(resumeActeLibelle);
});

test("ficheUtils acte avec utilisateur qui a uniquement le droit CONSULTER_ARCHIVES", async () => {
  storeRece.utilisateurCourant = userDroitConsulterArchive;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(2);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe(resumeActeLibelle);
});

test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre TUNIS et un Type Registre", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;
  const panels = getPanelsActe(acte);
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[0].panelAreas).toHaveLength(2);
  expect(panels.panels[0].title).toBe(resumeActeLibelle);
});

// TESTS getParamsAffichageFicheActe
//////////////////////////////////////////
/**
 * Pour rappel (cf. FicheActeUtils.ts)
 * visuAlertes: boolean;
 * visuActe: "classique" | "filigrane" | "disabled";
 * personnes: "visible" | "disabled" | "none";
 *
 * Le car "!" signifie que le front ne doit jamais entrer dans ce cas normalemnt (le back rendra 403 forbidden)
 *
 *  Cas possible pour le rendu d'un acte:
 *
 * Type d'actes possibles \ | Acte            | Acte            | Acte Archive    | Acte Archive    |
 * Type de droits possibles | Périmètre TUNIS | Périmètre SEOUL | Périmètre TUNIS | Périmètre SEOUL |
 * ==================================================================================================
 * CONS + Périmètre MEAE    | alerte:    TRUE | alerte:     TRUE| alerte:    TRUE | alerte:    TRUE |
 *                          | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                          | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------
 * CONS + Périmètre TUNIS   | alerte:    TRUE | alerte:    FALSE| alerte:    TRUE | alerte:    FALSE|
 *                          | visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS| visuActe:  DISAB|
 *                          | personnes: VISIB| personnes: DISAB| personnes: VISIB| personnes: DISAB|
 * --------------------------------------------------------------------------------------------------
 * CONS + Périmètre SEOUL   | alerte:    FALSE| alerte:    TRUE | alerte:    FALSE| alerte:    TRUE |
 *                          | visuActe:  DISAB| visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS|
 *                          | personnes: DISAB| personnes: VISIB| personnes: DISAB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------
 * CONS + Périmè TUNIS+SEOUL| alerte:     TRUE| alerte:    TRUE | alerte:    TRUE | alerte:    TRUE |
 *                          | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                          | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè MEAE)| alerte:    FALSE| alerte:    FALSE| alerte:    FALSE| alerte:    FALSE|
 *                          | visuActe!: DISAB| visuActe!: DISAB| visuActe:  FILIG| visuActe:  FILIG|
 *                          | personnes!:DISAB| personnes!:DISAB| personnes: NONE | personnes: NONE |
 * --------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè MEAE)| alerte:    TRUE | alerte:    FALSE| alerte:    TRUE | alerte:    FALSE|
 * CONS + Périmètre TUNIS   | visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS| visuActe:  FILIG|
 *                          | personnes: VISIB| personnes: DISAB| personnes: VISIB| personnes: NONE |
 * --------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè MEAE)| alerte:    FALSE| alerte:    TRUE | alerte:    FALSE| alerte:    TRUE |
 * CONS + Périmètre SEOUL   | visuActe:  DISAB| visuActe:  CLASS| visuActe:  FILIG| visuActe:  CLASS|
 *                          | personnes: DISAB| personnes: VISIB| personnes: NONE | personnes: VISIB|
 * --------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè MEAE)| alerte:    TRUE | alerte:     TRUE| alerte:    TRUE | alerte:    TRUE |
 * CONS + Périmè TUNIS+SEOUL| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                          | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè MEAE)| alerte:    TRUE | alerte:     TRUE| alerte:    TRUE | alerte:    TRUE |
 * CONS + Périmètre MEAE    | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                          | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------*/

// DROITS POSSIBLES
/////////////////////////////////////
const perimetreTUNIS: IPerimetre = {
  nom: "tunis",
  listeIdTypeRegistre: ["tunis"]
} as IPerimetre;

const perimetreMEAE: IPerimetre = {
  nom: PERIMETRE_MEAE,
  listeIdTypeRegistre: ["meae"]
} as IPerimetre;

const perimetreSEOUL: IPerimetre = {
  nom: "seoul",
  listeIdTypeRegistre: ["seoul"]
} as IPerimetre;

const PERIMETRE_TUNIS_SEOUL: IPerimetre = {
  nom: "seoul",
  listeIdTypeRegistre: ["seoul", "tunis"]
} as IPerimetre;

const profilCONSULTER: IProfil = {
  droits: [{ nom: Droit.CONSULTER } as IDroit]
} as IProfil;

const PROFIL_CONSULTER_ARCHIVE: IProfil = {
  droits: [{ nom: Droit.CONSULTER_ARCHIVES } as IDroit]
} as IProfil;

const HABILITATION_CONSULTER_MEAE = {
  profil: profilCONSULTER,
  perimetre: perimetreMEAE
};

const HABILITATION_CONSULTER_TUNIS = {
  profil: profilCONSULTER,
  perimetre: perimetreTUNIS
};

const HABILITATION_CONSULTER_SEOUL = {
  profil: profilCONSULTER,
  perimetre: perimetreSEOUL
};

const HABILITATION_CONSULTER_TUNIS_SEOUL = {
  profil: profilCONSULTER,
  perimetre: PERIMETRE_TUNIS_SEOUL
};

const HABILITATION_CONSULTER_ARCHIVE_MEAE = {
  profil: PROFIL_CONSULTER_ARCHIVE,
  perimetre: perimetreMEAE
};

// ACTES POSSIBLES
/////////////////////////////////////
const ActeTUNIS: IFicheActe = {
  registre: {
    type: {
      id: "tunis"
    } as ITypeRegistre
  } as IRegistre,
  visibiliteArchiviste: TypeVisibiliteArchiviste.NON
} as IFicheActe;

const ActeSEOUL: IFicheActe = {
  registre: {
    type: {
      id: "seoul"
    } as ITypeRegistre
  } as IRegistre,
  visibiliteArchiviste: TypeVisibiliteArchiviste.NON
} as IFicheActe;

const ActeArchiveTUNIS: IFicheActe = {
  ...ActeTUNIS,
  visibiliteArchiviste: TypeVisibiliteArchiviste.MEAE
};

const ActeArchiveSEOUL: IFicheActe = {
  ...ActeSEOUL,
  visibiliteArchiviste: TypeVisibiliteArchiviste.MEAE
};

// COMPORTEMENTS POSSIBLES
////////////////////////////////////
const tousLesAcces = {
  visuActe: "classique",
  personnes: "visible",
  visuAlertes: true
} as IParamsAffichage;

const pasLeBonPerimetre = {
  visuActe: "disabled",
  personnes: "disabled",
  visuAlertes: false
} as IParamsAffichage;

const restraintArchive = {
  visuActe: "filigrane",
  personnes: "none",
  visuAlertes: false
} as IParamsAffichage;

// UTILS
////////////////////////////////////
function getComportement(ficheActe: IFicheActe) {
  return getParamsAffichageFicheActe(
    ficheActe.registre.type.id,
    ficheActe.visibiliteArchiviste
  );
}

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [HABILITATION_CONSULTER_MEAE]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS", () => {
  storeRece.utilisateurCourant = {
    habilitations: [HABILITATION_CONSULTER_TUNIS]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(pasLeBonPerimetre);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS", () => {
  storeRece.utilisateurCourant = {
    habilitations: [HABILITATION_CONSULTER_SEOUL]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS_SEOUL", () => {
  storeRece.utilisateurCourant = {
    habilitations: [HABILITATION_CONSULTER_TUNIS_SEOUL]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_ARCHIVE_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [HABILITATION_CONSULTER_ARCHIVE_MEAE]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(pasLeBonPerimetre); // cas qui ne devrait pas arriver car seuls les actes archives sont remontés dans le cas d'un archiviste
  expect(getComportement(ActeSEOUL)).toEqual(pasLeBonPerimetre); // cas qui ne devrait pas arriver car seuls les actes archives sont remontés dans le cas d'un archiviste
  expect(getComportement(ActeArchiveTUNIS)).toEqual(restraintArchive);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(restraintArchive);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [
      HABILITATION_CONSULTER_TUNIS,
      HABILITATION_CONSULTER_ARCHIVE_MEAE
    ]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(restraintArchive);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_SEOUL, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [
      HABILITATION_CONSULTER_SEOUL,
      HABILITATION_CONSULTER_ARCHIVE_MEAE
    ]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(restraintArchive);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS, habilitationCONSULTER_SEOUL, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [
      HABILITATION_CONSULTER_TUNIS,
      HABILITATION_CONSULTER_SEOUL,
      HABILITATION_CONSULTER_ARCHIVE_MEAE
    ]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_MEAE, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  storeRece.utilisateurCourant = {
    habilitations: [
      HABILITATION_CONSULTER_MEAE,
      HABILITATION_CONSULTER_ARCHIVE_MEAE
    ]
  } as IOfficierSSOApi;

  expect(getComportement(ActeTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL)).toEqual(tousLesAcces);
});
