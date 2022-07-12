import mockConnectedUser from "../../mock/data/connectedUser.json";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitConsulterArchive,
  userDroitConsulterConsulterArchive,
  userDroitConsulterPerimetreMEAE,
  userDroitConsulterPerimetreTUNIS,
  userDroitnonCOMEDEC
} from "../../mock/data/connectedUserAvecDroit";
import { Droit } from "../../model/agent/enum/Droit";
import { Perimetre } from "../../model/agent/enum/Perimetre";
import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  contientEntiteMere,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  IOfficier,
  officierALeDroitSurLePerimetre,
  officierALeDroitSurUnDesPerimetres,
  officierAutoriserSurLeTypeRegistre,
  officierHabiliterUniquementPourLeDroit
} from "../../model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "../../model/agent/IUtilisateur";
import { storeRece } from "../../views/common/util/storeRece";
import { mappingOfficier } from "../../views/core/login/LoginHook";

const u: any = mockConnectedUser;

test("Habilitation model", () => {
  storeRece.utilisateurCourant = u as IOfficier;
  let estAutorise = estOfficierHabiliterPourTousLesDroits([Droit.ATTRIBUER]);
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits([]);
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits(
    // @ts-ignore
    ["AUTRE"]
  );
  expect(estAutorise).toBe(false);
});

test("Attendu: officierHabiliterUniquementPourLeDroit fonctionne correctement", () => {
  storeRece.utilisateurCourant = userDroitConsulterArchive;
  let uniquementLeDroit = officierHabiliterUniquementPourLeDroit(
    Droit.CONSULTER_ARCHIVES
  );
  expect(uniquementLeDroit).toBe(true);

  storeRece.utilisateurCourant = userDroitConsulterConsulterArchive;
  uniquementLeDroit = officierHabiliterUniquementPourLeDroit(
    Droit.CONSULTER_ARCHIVES
  );
  expect(uniquementLeDroit).toBe(false);
});

test("Utilisateur autoriser à consulter l'acte dont l'idTypeRegistre est passé", () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTUNIS;
  const idTypeRegistre = "b66a9304-48b4-4aa3-920d-6cb27dd76c83";
  let autoriserAConsulterActe =
    officierAutoriserSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(true);

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;
  autoriserAConsulterActe = officierAutoriserSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(false);
});

test("La requete appartient au service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "1";
  expect(
    appartientAMonServiceOuServicesMeresOuServicesFilles(idEntiteRequete)
  ).toBeTruthy();
});

test("La requete appartient à une entité mère du service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "11";
  expect(
    appartientAMonServiceOuServicesMeresOuServicesFilles(idEntiteRequete)
  ).toBeTruthy();
});

test("La requete appartient à une entité fille du service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "111";
  expect(
    appartientAMonServiceOuServicesMeresOuServicesFilles(idEntiteRequete)
  ).toBeTruthy();
});

test("La requete n'appartient ni à  une entité fille, ni une entité mère, ni au service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "999";
  expect(
    appartientAMonServiceOuServicesMeresOuServicesFilles(idEntiteRequete)
  ).toBeFalsy();
});

test("L'entité rattachée à la requete est une entité mère de celle de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "11";
  expect(contientEntiteMere(idEntiteRequete)).toBeTruthy();
});

test("L'entité rattachée à la requete n'est pas une entité mère de celle de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idEntiteRequete = "9999";
  expect(contientEntiteMere(idEntiteRequete)).toBeFalsy();
});

test("Attendu: estOfficierHabiliterPourUnDesDroits fonctionne correctement", () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLaurenceBourdeau.data.habilitations
  );

  expect(estOfficierHabiliterPourUnDesDroits([])).toBeTruthy();

  expect(estOfficierHabiliterPourUnDesDroits(undefined!)).toBeTruthy();

  expect(
    estOfficierHabiliterPourUnDesDroits([Droit.CREER_ACTE_ETABLI])
  ).toBeTruthy();

  expect(
    estOfficierHabiliterPourUnDesDroits([
      Droit.ATTRIBUER,
      Droit.CREER_ACTE_ETABLI
    ])
  ).toBeTruthy();

  expect(
    estOfficierHabiliterPourUnDesDroits([Droit.METTRE_A_JOUR_ACTE])
  ).toBeFalsy();
});

test("Attendu: officierALeDroitSurUnDesPerimetres/officierALeDroitSurLePerimetre fonctionnent correctement", () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLaurenceBourdeau.data.habilitations
  );

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [
      Perimetre.MEAE
    ])
  ).toBeTruthy();

  expect(
    officierALeDroitSurLePerimetre(Droit.CREER_ACTE_ETABLI, Perimetre.ETAX)
  ).toBeFalsy();

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [
      Perimetre.MEAE,
      Perimetre.ETAX
    ])
  ).toBeTruthy();

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [])
  ).toBeTruthy();
});
