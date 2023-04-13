import {
  getMessageSiVerificationEnErreur,
  IVerificationErreur
} from "@pages/rechercheMultiCriteres/common/validation/VerificationRestrictionProcesseur";

test("Attendu: getMessageSiVerificationRestrictionRmcActeInscriptionCriteresEnErreur fonctionne correctement", () => {
  const verifications1: IVerificationErreur[] = [
    { test: () => false, messageErreur: "test1" },
    { test: () => false, messageErreur: "test2" },
    { test: () => true, messageErreur: "test3" },
    { test: () => false, messageErreur: "test4" }
  ];

  const verifications2: IVerificationErreur[] = [
    { test: () => false, messageErreur: "test1" },
    { test: () => false, messageErreur: "test2" },
    { test: () => false, messageErreur: "test3" },
    { test: () => false, messageErreur: "test4" }
  ];

  expect(getMessageSiVerificationEnErreur({}, verifications1)).toBe("test3");

  expect(getMessageSiVerificationEnErreur({}, verifications2)).toBeUndefined();

  expect(getMessageSiVerificationEnErreur({}, [])).toBeUndefined();
});
