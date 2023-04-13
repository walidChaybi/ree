import { mappingInscriptionsRC } from "@hook/acte/InscriptionsRcHook";
import { inscriptionsRc } from "@mock/data/ficheRC";
import {
  getInscriptionsDeTypeModificationEtRadiation,
  getInscriptionsRCDeTypeModification,
  getInscriptionsRCDeTypeRadiation,
  triTableauRCRadiationParDate
} from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuUtilsCS";

describe("Test des fonctions MenuUtilsCS", () => {
  test("Doit retourner les inscriptions de type Radiation", () => {
    const inscriptionsRcRadiations = getInscriptionsRCDeTypeRadiation(
      mappingInscriptionsRC(inscriptionsRc)
    );

    expect(inscriptionsRcRadiations).toHaveLength(2);
  });

  test("Doit retourner les inscriptions de type Modification", () => {
    const inscriptionsRcModification = getInscriptionsRCDeTypeModification(
      mappingInscriptionsRC(inscriptionsRc)
    );

    expect(inscriptionsRcModification).toHaveLength(2);
  });

  test("Doit retourner les inscriptions de type Modification && Radiation", () => {
    const { inscrptionsRCModification, inscriptionsRCRadiation } =
      getInscriptionsDeTypeModificationEtRadiation(
        mappingInscriptionsRC(inscriptionsRc)
      );

    expect(inscrptionsRCModification[0].idInscription).toBe(
      "747c0b00-03f3-4c6e-9db3-ec73cbdc0747"
    );

    expect(inscriptionsRCRadiation[0].idInscription).toBe(
      "85df1d10-71b7-4336-9463-bb1c5760d1a0"
    );
  });

  test("Doit retourner les inscriptions triée par date", () => {
    const tableauInscriptionRcTriee = triTableauRCRadiationParDate(
      mappingInscriptionsRC(inscriptionsRc)
    );

    expect(tableauInscriptionRcTriee[0].idInscription).toBe(
      "747cd416-fcf5-4490-b540-59a89b7f5123"
    );
    expect(tableauInscriptionRcTriee[3].idInscription).toBe(
      "85df1d10-71b7-4336-9463-bb1c5760d1a0"
    );
  });
});
