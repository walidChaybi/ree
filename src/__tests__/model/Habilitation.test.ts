import React from "react";

import { estOfficierHabiliterPourTousLesDroits } from "../../model/Habilitation";
import { storeRece } from "../../views/common/util/storeRece";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";
import { Droit } from "../../model/Droit";

test("renders Page requete with all elements", () => {
  const u: any = mockConnectedUser;
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
