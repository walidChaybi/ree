import { IRequeteRMCAutoDto } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import {
  MOCK_REQUETE_TABLEAU_RMC_CREATION,
  MOCK_REQUETE_TABLEAU_RMC_DELIVRANCE,
  MOCK_REQUETE_TABLEAU_RMC_INFORMATION,
  MOCK_REQUETE_TABLEAU_RMC_MISE_A_JOUR
} from "@mock/data/RMCRequete";
import {
  REQUETE_CREATION_RMC_AUTO_DTO,
  REQUETE_DELIVRANCE_RMC_AUTO_DTO,
  REQUETE_INFORMATION_RMC_AUTO_DTO,
  REQUETE_MAJ_RMC_AUTO_DTO
} from "@mock/data/rmc/requete/RequetesRMCAuto";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import RequeteAssociee from "@model/rmc/requete/RequeteAssociee";
import { IRequeteTableauRMCDto, RequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { ITitulaireRequeteAssocieeDto, TitulaireRequeteAssociee } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { describe, expect, test } from "vitest";

describe("Test RequeteAssociee", () => {
  test("RequeteAssociee depuis IRequeteRMCAutoDto<'CREATION'>", () => {
    const requeteCreation = RequeteAssociee.depuisDto(REQUETE_CREATION_RMC_AUTO_DTO);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteCreation?.type).toStrictEqual("CREATION" as keyof typeof ETypeRequete);
  });

  test("RequeteAssociee depuis IRequeteRMCAutoDto<'DELIVRANCE'>", () => {
    const requeteDelivrance = RequeteAssociee.depuisDto(REQUETE_DELIVRANCE_RMC_AUTO_DTO);

    expect(requeteDelivrance).not.toBeNull();
    expect(requeteDelivrance?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteDelivrance?.type).toStrictEqual("DELIVRANCE" as keyof typeof ETypeRequete);
  });

  test("RequeteAssociee depuis IRequeteRMCAutoDto<'MISE_A_JOUR'>", () => {
    const requeteMiseAJour = RequeteAssociee.depuisDto(REQUETE_MAJ_RMC_AUTO_DTO);

    expect(requeteMiseAJour).not.toBeNull();
    expect(requeteMiseAJour?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteMiseAJour?.type).toStrictEqual("MISE_A_JOUR" as keyof typeof ETypeRequete);
  });

  test("RequeteAssociee depuis IRequeteRMCAutoDto<'INFORMATION'>", () => {
    const requeteInformation = RequeteAssociee.depuisDto(REQUETE_INFORMATION_RMC_AUTO_DTO);

    expect(requeteInformation).not.toBeNull();
    expect(requeteInformation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteInformation?.type).toStrictEqual("INFORMATION" as keyof typeof ETypeRequete);
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const requete = RequeteAssociee.depuisDto({} as IRequeteRMCAutoDto<"DELIVRANCE">);

    expect(requete).toBeNull();
  });

  test("DOIT retourner null QUAND le type de la requête est invalide", () => {
    const requete = RequeteAssociee.depuisDto({
      ...REQUETE_CREATION_RMC_AUTO_DTO,
      type: "NULL" as keyof typeof ETypeRequete
    } as IRequeteRMCAutoDto<"CREATION">);

    expect(requete).toBeNull();
  });

  test("DOIT retourner null QUAND le sous type de la requête ne correspond pas au type", () => {
    const requeteCreation = RequeteAssociee.depuisDto({
      ...REQUETE_CREATION_RMC_AUTO_DTO,
      sousType: "RDC" as ESousTypeCreation
    } as IRequeteRMCAutoDto<"CREATION">);

    expect(requeteCreation).toBeNull();
  });
});

describe("Test RequeteTableauRMC", () => {
  test("RequeteTableauRMC depuis IRequeteRMCAutoDto<'CREATION'>", () => {
    const requeteCreation = RequeteTableauRMC.depuisDto(MOCK_REQUETE_TABLEAU_RMC_CREATION, [], []);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("14/06/1927");
    expect(requeteCreation?.type).toStrictEqual("CREATION" as keyof typeof ETypeRequete);
  });

  test("RequeteTableauRMC depuis IRequeteRMCAutoDto<'DELIVRANCE'>", () => {
    const requeteDelivrance = RequeteTableauRMC.depuisDto(MOCK_REQUETE_TABLEAU_RMC_DELIVRANCE, [], []);

    expect(requeteDelivrance).not.toBeNull();
    expect(requeteDelivrance?.dateCreation).toStrictEqual("14/06/1928");
    expect(requeteDelivrance?.type).toStrictEqual("DELIVRANCE" as keyof typeof ETypeRequete);
  });

  test("RequeteTableauRMC depuis IRequeteRMCAutoDto<'MISE_A_JOUR'>", () => {
    const requeteMiseAJour = RequeteTableauRMC.depuisDto(MOCK_REQUETE_TABLEAU_RMC_MISE_A_JOUR, [], []);

    expect(requeteMiseAJour).not.toBeNull();
    expect(requeteMiseAJour?.dateCreation).toStrictEqual("13/06/1915");
    expect(requeteMiseAJour?.type).toStrictEqual("MISE_A_JOUR" as keyof typeof ETypeRequete);
  });

  test("RequeteTableauRMC depuis IRequeteRMCAutoDto<'INFORMATION'>", () => {
    const requeteInformation = RequeteTableauRMC.depuisDto(MOCK_REQUETE_TABLEAU_RMC_INFORMATION, [], []);

    expect(requeteInformation).not.toBeNull();
    expect(requeteInformation?.dateCreation).toStrictEqual("12/06/1929");
    expect(requeteInformation?.type).toStrictEqual("INFORMATION" as keyof typeof ETypeRequete);
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const requeteCreation = RequeteTableauRMC.depuisDto({} as IRequeteTableauRMCDto<"DELIVRANCE">, [], []);

    expect(requeteCreation).toBeNull();
  });

  test("DOIT retourner null QUAND le type de la requête est invalide", () => {
    const requeteCreation = RequeteTableauRMC.depuisDto(
      {
        ...MOCK_REQUETE_TABLEAU_RMC_CREATION,
        type: "NULL" as keyof typeof ETypeRequete
      } as IRequeteTableauRMCDto<"CREATION">,
      [],
      []
    );

    expect(requeteCreation).toBeNull();
  });

  test("DOIT retourner null QUAND le sous type de la requête ne correspond pas au type", () => {
    const requeteCreation = RequeteTableauRMC.depuisDto(
      {
        ...MOCK_REQUETE_TABLEAU_RMC_CREATION,
        sousType: "RDC" as ESousTypeCreation
      } as IRequeteTableauRMCDto<"CREATION">,
      [],
      []
    );

    expect(requeteCreation).toBeNull();
  });
});

describe("Test TitulaireRequeteAssociee", () => {
  test("TitulaireRequeteAssociee depuisDto valide", () => {
    const titulaireDto: ITitulaireRequeteAssocieeDto = {
      nom: "NomTitulaire",
      prenom: "prenom1"
    };
    const titulaire = TitulaireRequeteAssociee.depuisDto(titulaireDto);

    expect(titulaire).not.toBeNull();
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const titulaire = TitulaireRequeteAssociee.depuisDto({} as ITitulaireRequeteAssocieeDto);

    expect(titulaire).toBeNull();
  });
});
