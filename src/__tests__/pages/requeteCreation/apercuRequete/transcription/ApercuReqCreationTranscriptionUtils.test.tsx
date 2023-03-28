import { formatPrenoms } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionUtils";
import { SANS_PRENOM_CONNU } from "@util/Utils";
test("DOIT retourner 'Sans prénom connu' QUAND 'SPC' est présent dans les prénoms", async () => {
  const prenoms = ["SPC"];

  const prenomsFormates = formatPrenoms(prenoms);
  expect(prenomsFormates).toBe(SANS_PRENOM_CONNU);
});
