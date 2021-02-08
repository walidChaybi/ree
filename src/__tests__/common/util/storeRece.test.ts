import { storeRece } from "../../../views/common/util/storeRece";
import officier from "../../../mock/data/connectedUser.json";

test("store rece works ", async () => {
  expect(storeRece.utilisateurCourant).toBeUndefined();

  storeRece.utilisateurCourant = { ...officier, idSSO: "idSSo" };
  expect(storeRece.utilisateurCourant).toBeDefined();
});

test("store rece code pin ", async () => {
  expect(storeRece.codePin).toBeUndefined();

  storeRece.codePin = "1234";
  expect(storeRece.codePin).toBeDefined();
});
