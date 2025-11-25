import { requetesInformationTableauDto } from "@mock/data/requete/information/RequeteInformationTableau";
import { RequeteInformationTableau } from "@model/requete/IRequeteTableauInformation";
import { describe, expect } from "vitest";

describe("Test RequeteInformationTableau", () => {
  test("RequeteTableauInformation depuis IRequeteInformationTableauDto", () => {
    const requete = RequeteInformationTableau.depuisDto(requetesInformationTableauDto[0]);

    expect(requete).not.toBeNull();
  });

  test("test versLigneTableauMesRequetes", () => {
    let ligneTableau = RequeteInformationTableau.depuisDto({
      ...requetesInformationTableauDto[0],
      typeMandataire: "GENEALOGISTE"
    })?.versLigneTableauMesRequetes();

    expect(ligneTableau?.dateCreation).toStrictEqual("02/10/2025");
    expect(ligneTableau?.typeRequerant).toStrictEqual("Généalogiste");

    // le type requérant DOIT être le type mandataire s'il est défini, sinon la qualité requérant
    ligneTableau = RequeteInformationTableau.depuisDto({
      ...requetesInformationTableauDto[0],
      typeMandataire: undefined,
      qualiteRequerant: "INSTITUTIONNEL"
    })?.versLigneTableauMesRequetes();

    expect(ligneTableau?.typeRequerant).toStrictEqual("Institutionnel");
  });
});
