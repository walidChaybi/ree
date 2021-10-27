import mockConnectedUser from "../../mock/data/connectedUser.json";
import {
  userDroitConsulterArchive,
  userDroitConsulterConsulterArchive,
  userDroitConsulterPerimetreMEAE,
  userDroitConsulterPerimetreTUNIS,
  userDroitnonCOMEDEC
} from "../../mock/data/connectedUserAvecDroit";
import {
  appartientAMonServiceOuServicesMeresOuServicesFilles,
  contientEntiteMere,
  estOfficierHabiliterPourTousLesDroits,
  IOfficier,
  officierAutoriserSurLeTypeRegistre,
  officierHabiliterUniquementPourLeDroit
} from "../../model/agent/IOfficier";
import { Droit } from "../../model/Droit";
import { storeRece } from "../../views/common/util/storeRece";

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
  let autoriserAConsulterActe = officierAutoriserSurLeTypeRegistre(
    idTypeRegistre
  );
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
