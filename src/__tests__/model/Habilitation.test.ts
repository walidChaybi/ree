import {
  estOfficierHabiliterPourTousLesDroits,
  officierHabiliterUniquementPourLeDroit
} from "../../model/Habilitation";
import { storeRece } from "../../views/common/util/storeRece";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";
import { Droit } from "../../model/Droit";
import {
  userDroitConsulterArchive,
  userDroitConsulterConsulterArchive
} from "../../mock/data/connectedUserAvecDroit";

const u: any = mockConnectedUser;

test("Habilitation model", () => {
  storeRece.utilisateurCourant = u as IOfficierSSOApi;
  let estAutorise = estOfficierHabiliterPourTousLesDroits(
    storeRece.utilisateurCourant,
    [Droit.ATTRIBUER]
  );
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits(
    storeRece.utilisateurCourant,
    []
  );
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourTousLesDroits(
    storeRece.utilisateurCourant,
    // @ts-ignore
    ["AUTRE"]
  );
  expect(estAutorise).toBe(false);
});

test("Attendu: officierHabiliterUniquementPourLeDroit fonctionne correctement", () => {
  storeRece.utilisateurCourant = userDroitConsulterArchive;
  let uniquementLeDroit = officierHabiliterUniquementPourLeDroit(
    storeRece.utilisateurCourant,
    Droit.CONSULTER_ARCHIVES
  );
  expect(uniquementLeDroit).toBe(true);

  storeRece.utilisateurCourant = userDroitConsulterConsulterArchive;
  uniquementLeDroit = officierHabiliterUniquementPourLeDroit(
    storeRece.utilisateurCourant,
    Droit.CONSULTER_ARCHIVES
  );
  expect(uniquementLeDroit).toBe(false);
});
