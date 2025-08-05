import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRegistre } from "@model/etatcivil/acte/IRegistre";
import { ITypeRegistre } from "@model/etatcivil/acte/TypeRegistre";
import { TypeVisibiliteArchiviste } from "@model/etatcivil/enum/TypeVisibiliteArchiviste";
import { IParamsAffichage, getPanelsActe, getParamsAffichageFicheActe } from "@pages/fiche/hook/constructionComposants/acte/FicheActeUtils";
import { expect, test } from "vitest";
import { acte } from "../../../../../../mock/data/ficheEtBandeau/ficheActe";

const resumeActeLibelle = "Résumé de l'acte";
test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre TOUS_REGISTRES", () => {
  const panels = getPanelsActe(acte, MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER).generer());
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[1].panelAreas).toHaveLength(2);
  expect(panels.panels[1].title).toBe(resumeActeLibelle);
});

test("ficheUtils acte avec utilisateur qui a uniquement le droit CONSULTER_ARCHIVES", () => {
  const panels = getPanelsActe(acte, MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER_ARCHIVES).generer());
  expect(panels.panels).toHaveLength(2);
  expect(panels.panels[1].panelAreas).toHaveLength(2);
  expect(panels.panels[1].title).toBe(resumeActeLibelle);
});

test("ficheUtils acte avec utilisateur qui a le droit CONSULTER sur le périmètre TUNIS et un Type Registre", () => {
  const panels = getPanelsActe(
    acte,
    MockUtilisateurBuilder.utilisateurConnecte()
      .avecDroit(Droit.CONSULTER, { perimetres: ["TUNIS"] })
      .generer()
  );
  expect(panels.panels).toHaveLength(3);
  expect(panels.panels[1].panelAreas).toHaveLength(2);
  expect(panels.panels[1].title).toBe(resumeActeLibelle);
});

// TESTS getParamsAffichageFicheActe
//////////////////////////////////////////
/**
 * Pour rappel (cf. FicheActeUtils.ts)
 * visuBoutonAlertes: boolean;
 * visuActe: "classique" | "filigrane" | "disabled";
 * personnes: "visible" | "disabled" | "none";
 *
 * Le car "!" signifie que le front ne doit jamais entrer dans ce cas normalemnt (le back rendra 403 forbidden)
 *
 *  Cas possible pour le rendu d'un acte:
 *
 * Type d'actes possibles \             | Acte            | Acte            | Acte Archive    | Acte Archive    |
 * Type de droits possibles             | Périmètre TUNIS | Périmètre SEOUL | Périmètre TUNIS | Périmètre SEOUL |
 * ==============================================================================================================
 * CONS + Périmètre TOUS_REGISTRES      | bouton:    TRUE | bouton:     TRUE| bouton:    FALSE| bouton:    FALSE|
 *                                      | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                                      | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS + Périmètre TUNIS               | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 *                                      | visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS| visuActe:  DISAB|
 *                                      | personnes: VISIB| personnes: DISAB| personnes: VISIB| personnes: DISAB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS + Périmètre SEOUL               | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 *                                      | visuActe:  DISAB| visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS|
 *                                      | personnes: DISAB| personnes: VISIB| personnes: DISAB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS + Périmè TUNIS+SEOUL            | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 *                                      | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                                      | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè TOUS_REGISTRES)  | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 *                                      | visuActe!: DISAB| visuActe!: DISAB| visuActe:  FILIG| visuActe:  FILIG|
 *                                      | personnes!:DISAB| personnes!:DISAB| personnes: NONE | personnes: NONE |
 * --------------------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè TOUS_REGISTRES)  | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 * CONS + Périmètre TUNIS               | visuActe:  CLASS| visuActe:  DISAB| visuActe:  CLASS| visuActe:  FILIG|
 *                                      | personnes: VISIB| personnes: DISAB| personnes: VISIB| personnes: NONE |
 * --------------------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè TOUS_REGISTRES)  | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 * CONS + Périmètre SEOUL               | visuActe:  DISAB| visuActe:  CLASS| visuActe:  FILIG| visuActe:  CLASS|
 *                                      | personnes: DISAB| personnes: VISIB| personnes: NONE | personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè TOUS_REGISTRES)  | bouton:    FALSE| bouton:    FALSE| bouton:    FALSE| bouton:    FALSE|
 * CONS + Périmè TUNIS+SEOUL            | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                                      | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------
 * CONS ARCH (+ Périmè TOUS_REGISTRES)  | bouton:    TRUE | bouton:    TRUE | bouton:    FALSE| bouton:    FALSE|
 * CONS + Périmètre TOUS_REGISTRES      | visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS| visuActe:  CLASS|
 *                                      | personnes: VISIB| personnes: VISIB| personnes: VISIB| personnes: VISIB|
 * --------------------------------------------------------------------------------------------------------------*/

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
  visuBoutonAlertes: true
} as IParamsAffichage;

const pasLeBonPerimetre = {
  visuActe: "disabled",
  personnes: "disabled",
  visuBoutonAlertes: false
} as IParamsAffichage;

const restraintArchive = {
  visuActe: "filigrane",
  personnes: "none",
  visuBoutonAlertes: false
} as IParamsAffichage;

// UTILS
////////////////////////////////////
function getComportement(ficheActe: IFicheActe, utilisateurConnecte: UtilisateurConnecte) {
  return getParamsAffichageFicheActe(ficheActe.registre.type?.id, ficheActe.visibiliteArchiviste, utilisateurConnecte);
}

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER).generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["TUNIS"] })
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["SEOUL"] })
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS_SEOUL", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["TUNIS", "SEOUL"] })
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_ARCHIVE_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CONSULTER_ARCHIVES).generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(pasLeBonPerimetre); // cas qui ne devrait pas arriver car seuls les actes archives sont remontés dans le cas d'un archiviste
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(pasLeBonPerimetre); // cas qui ne devrait pas arriver car seuls les actes archives sont remontés dans le cas d'un archiviste
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(restraintArchive);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(restraintArchive);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["TUNIS"] })
    .avecDroit(Droit.CONSULTER_ARCHIVES)
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(restraintArchive);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_SEOUL, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["SEOUL"] })
    .avecDroit(Droit.CONSULTER_ARCHIVES)
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(pasLeBonPerimetre);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(restraintArchive);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_TUNIS, habilitationCONSULTER_SEOUL, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER, { perimetres: ["TUNIS", "SEOUL"] })
    .avecDroit(Droit.CONSULTER_ARCHIVES)
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});

test("Attendu: getParamsAffichageFicheActe fonctionne correctement pour habilitationCONSULTER_MEAE, habilitationCONSULTER_ARCHIVE_MEAE", () => {
  const utilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
    .avecDroit(Droit.CONSULTER)
    .avecDroit(Droit.CONSULTER_ARCHIVES)
    .generer();

  expect(getComportement(ActeTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveTUNIS, utilisateurConnecte)).toEqual(tousLesAcces);
  expect(getComportement(ActeArchiveSEOUL, utilisateurConnecte)).toEqual(tousLesAcces);
});
