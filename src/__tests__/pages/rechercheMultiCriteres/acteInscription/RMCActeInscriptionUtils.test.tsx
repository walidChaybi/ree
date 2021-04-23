import { goToLinkRMC } from "../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";

test("RMC Utils goToLinkRMC", () => {
  const result = goToLinkRMC(
    "http://localhost:8089/rece-etatcivil-api/v1/repertoirecivil/rmc?range=1-10"
  );
  expect(result).toBe("1-10");
});
