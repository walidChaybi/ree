import mockConnectedUser from "../../mock/data/connectedUser.json";
import {
  userDroitConsulterArchive,
  userDroitConsulterConsulterArchive,
  userDroitConsulterPerimetreMEAE,
  userDroitConsulterPerimetreTUNIS
} from "../../mock/data/connectedUserAvecDroit";
import {
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
  let autoriserAConsulterActe =
    officierAutoriserSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(true);

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;
  autoriserAConsulterActe = officierAutoriserSurLeTypeRegistre(idTypeRegistre);
  expect(autoriserAConsulterActe).toBe(false);
});
