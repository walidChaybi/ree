import {
  REQUETE_CREATION_RMC_AUTO_DTO,
  REQUETE_DELIVRANCE_RMC_AUTO_DTO,
  REQUETE_INFORMATION_RMC_AUTO_DTO,
  REQUETE_MAJ_RMC_AUTO_DTO
} from "@mock/data/rmc/requete/RequetesRMCAuto";
import { ESousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import RequeteRMCAuto, { IRequeteRMCAutoDto } from "@model/rmc/requete/RequeteRMCAuto";
import { ITitulaireRmcAutoRequeteDto, TitulaireRmcAutoRequete } from "@model/rmc/requete/TitulaireRmcAutoRequete";
import { describe, expect, test } from "vitest";

describe("Test RequeteRMCAuto", () => {
  test("RequeteRMCAuto depuis IRequeteRMCAutoDto<'CREATION'>", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto(REQUETE_CREATION_RMC_AUTO_DTO);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteCreation?.type).toStrictEqual("CREATION" as keyof typeof ETypeRequete);
  });

  test("RequeteRMCAuto depuis IRequeteRMCAutoDto<'DELIVRANCE'>", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto(REQUETE_DELIVRANCE_RMC_AUTO_DTO);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteCreation?.type).toStrictEqual("DELIVRANCE" as keyof typeof ETypeRequete);
  });

  test("RequeteRMCAuto depuis IRequeteRMCAutoDto<'MISE_A_JOUR'>", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto(REQUETE_MAJ_RMC_AUTO_DTO);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteCreation?.type).toStrictEqual("MISE_A_JOUR" as keyof typeof ETypeRequete);
  });

  test("RequeteRMCAuto depuis IRequeteRMCAutoDto<'INFORMATION'>", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto(REQUETE_INFORMATION_RMC_AUTO_DTO);

    expect(requeteCreation).not.toBeNull();
    expect(requeteCreation?.dateCreation).toStrictEqual("05/06/2025");
    expect(requeteCreation?.type).toStrictEqual("INFORMATION" as keyof typeof ETypeRequete);
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto({} as IRequeteRMCAutoDto<"DELIVRANCE">);

    expect(requeteCreation).toBeNull();
  });

  test("DOIT retourner null QUAND le type de la requête est invalide", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto({
      ...REQUETE_CREATION_RMC_AUTO_DTO,
      type: "NULL" as keyof typeof ETypeRequete
    } as IRequeteRMCAutoDto<"CREATION">);

    expect(requeteCreation).toBeNull();
  });

  test("DOIT retourner null QUAND le sous type de la requête ne correspond pas au type", () => {
    const requeteCreation = RequeteRMCAuto.depuisDto({
      ...REQUETE_CREATION_RMC_AUTO_DTO,
      sousType: "RDC" as ESousTypeCreation
    } as IRequeteRMCAutoDto<"CREATION">);

    expect(requeteCreation).toBeNull();
  });
});

describe("Test TitulaireRmcAutoRequete", () => {
  test("TitulaireRmcAutoRequete depuisDto valide", () => {
    const titulaireDto: ITitulaireRmcAutoRequeteDto = {
      nom: "NomTitulaire",
      prenoms: [
        { prenom: "prenom1", numeroOrdre: 1 },
        { prenom: "prenom2", numeroOrdre: 2 }
      ]
    };
    const titulaire = TitulaireRmcAutoRequete.depuisDto(titulaireDto);

    expect(titulaire).not.toBeNull();
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const titulaire = TitulaireRmcAutoRequete.depuisDto({} as ITitulaireRmcAutoRequeteDto);

    expect(titulaire).toBeNull();
  });
});
