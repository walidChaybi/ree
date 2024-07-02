import { mappingOfficier } from "@core/login/LoginHook";
import mockConnectedUser from "@mock/data/connectedUser.json";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitConsulterArchive,
  userDroitConsulterConsulterArchive,
  userDroitConsulterPerimetreTousRegistres,
  userDroitConsulterPerimetreTUNIS,
  userDroitnonCOMEDEC
} from "@mock/data/connectedUserAvecDroit";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import {
  appartientAMonServiceOuServicesParentsOuServicesFils,
  contientServiceParent,
  estOfficierHabiliterPourTousLesDroits,
  estOfficierHabiliterPourUnDesDroits,
  IOfficier,
  officierALeDroitSurLePerimetre,
  officierALeDroitSurUnDesPerimetres,
  officierDroitConsulterSurLeTypeRegistre,
  officierHabiliterUniquementPourLeDroit
} from "@model/agent/IOfficier";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { storeRece } from "@util/storeRece";

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
    officierDroitConsulterSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(true);

  storeRece.utilisateurCourant = userDroitConsulterPerimetreTousRegistres;
  autoriserAConsulterActe =
    officierDroitConsulterSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(false);
});

test("La requete appartient au service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "1";
  expect(
    appartientAMonServiceOuServicesParentsOuServicesFils(idService)
  ).toBeTruthy();
});

test("La requete appartient à un service parent du service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "11";
  expect(
    appartientAMonServiceOuServicesParentsOuServicesFils(idService)
  ).toBeTruthy();
});

test("La requete appartient à un service fils du service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "111";
  expect(
    appartientAMonServiceOuServicesParentsOuServicesFils(idService)
  ).toBeTruthy();
});

test("La requete n'appartient ni à un service fils, ni un service parent, ni au service de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "999";
  expect(
    appartientAMonServiceOuServicesParentsOuServicesFils(idService)
  ).toBeFalsy();
});

test("Le service rattaché à la requete est un service parent de celui de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "11";
  expect(contientServiceParent(idService)).toBeTruthy();
});

test("Le service rattaché à la requete n'est pas un service parent de celui de l'utilisateur", () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const idService = "9999";
  expect(contientServiceParent(idService)).toBeFalsy();
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
      Perimetre.TOUS_REGISTRES
    ])
  ).toBeTruthy();

  expect(
    officierALeDroitSurLePerimetre(Droit.CREER_ACTE_ETABLI, Perimetre.ETAX)
  ).toBeFalsy();

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [
      Perimetre.TOUS_REGISTRES,
      Perimetre.ETAX
    ])
  ).toBeTruthy();

  expect(
    officierALeDroitSurUnDesPerimetres(Droit.CREER_ACTE_ETABLI, [])
  ).toBeTruthy();
});
