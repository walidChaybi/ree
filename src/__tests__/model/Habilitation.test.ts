import React from "react";

import { estOfficierHabiliterPourLesDroits } from "../../model/Habilitation";
import { storeRece } from "../../views/common/util/storeRece";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";
import { Droit } from "../../model/Droit";

test("renders Page requete with all elements", () => {
  const u: any = mockConnectedUser;
  storeRece.utilisateurCourant = u as IOfficierSSOApi;

  let estAutorise = estOfficierHabiliterPourLesDroits(
    storeRece.utilisateurCourant,
    [Droit.Attribuer]
  );
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourLesDroits(
    storeRece.utilisateurCourant,
    []
  );
  expect(estAutorise).toBe(true);

  estAutorise = estOfficierHabiliterPourLesDroits(
    storeRece.utilisateurCourant,
    // @ts-ignore
    ["AUTRE"]
  );
  expect(estAutorise).toBe(false);
});
