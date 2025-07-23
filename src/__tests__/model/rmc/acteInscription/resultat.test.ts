import {
  MOCK_RESULTAT_RMC_INSCRIPTION_PACS,
  MOCK_RESULTAT_RMC_INSCRIPTION_RC,
  MOCK_RESULTAT_RMC_INSCRIPTION_RCA
} from "@mock/data/RMCInscription";
import { ETypeInscriptionRca } from "@model/etatcivil/enum/ETypeInscriptionRca";
import { ETypePacsRcRca } from "@model/etatcivil/enum/ETypePacsRcRca";
import PersonneRMCInscription, { IPersonneRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/PersonneRMCInscription";
import ResultatRMCInscription, { IResultatRMCInscriptionDto } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { describe, expect, test } from "vitest";

describe("Test ResultatRMCInscription", () => {
  test("ResultatRMCInscription depuis IResultatRMCInscriptionDto<'RC'>", () => {
    const rc = ResultatRMCInscription.depuisDto(MOCK_RESULTAT_RMC_INSCRIPTION_RC);

    expect(rc).not.toBeNull();
    expect(rc?.numero).toStrictEqual("RC - 2009 - 1004");
    expect(rc?.categorie).toStrictEqual("RC" as keyof typeof ETypePacsRcRca);
  });

  test("ResultatRMCInscription depuis IResultatRMCInscriptionDto<'RCA'>", () => {
    const rca = ResultatRMCInscription.depuisDto(MOCK_RESULTAT_RMC_INSCRIPTION_RCA);

    expect(rca).not.toBeNull();
    expect(rca?.numero).toStrictEqual("RCA - 2007 - 1005");
    expect(rca?.categorie).toStrictEqual("RCA" as keyof typeof ETypePacsRcRca);
  });

  test("ResultatRMCInscription depuis IResultatRMCInscriptionDto<'PACS'>", () => {
    const pacs = ResultatRMCInscription.depuisDto(MOCK_RESULTAT_RMC_INSCRIPTION_PACS);

    expect(pacs).not.toBeNull();
    expect(pacs?.numero).toStrictEqual("PACS - 2013 - 1234508");
    expect(pacs?.categorie).toStrictEqual("PACS" as keyof typeof ETypePacsRcRca);
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const pacs = ResultatRMCInscription.depuisDto({} as IResultatRMCInscriptionDto<"PACS">);

    expect(pacs).toBeNull();
  });

  test("DOIT retourner null QUAND le type de l'inscription est invalide", () => {
    const rca = ResultatRMCInscription.depuisDto({
      ...MOCK_RESULTAT_RMC_INSCRIPTION_RCA,
      type: "FIN_MESURE" as keyof typeof ETypeInscriptionRca
    } as IResultatRMCInscriptionDto<"RCA">);

    expect(rca).toBeNull();
  });

  test("DOIT retourner null QUAND un PACS contient un idNature", () => {
    const pacs = ResultatRMCInscription.depuisDto({
      ...MOCK_RESULTAT_RMC_INSCRIPTION_PACS,
      idNature: "idNature" as unknown as undefined
    } as IResultatRMCInscriptionDto<"PACS">);

    expect(pacs).toBeNull();
  });
});

describe("Test PersonneRMCInscription", () => {
  test("PersonneRMCInscription depuisDto valide", () => {
    const personneDto: IPersonneRMCInscriptionDto = {
      id: "",
      nom: "NomTitulaire",
      autresNoms: [],
      prenoms: [
        { prenom: "prenom1", numeroOrdre: 1 },
        { prenom: "prenom2", numeroOrdre: 2 }
      ],
      paysNaissance: "France",
      dateNaissance: {
        jour: 5,
        mois: 5,
        annee: 2020
      }
    };
    const personne = PersonneRMCInscription.depuisDto(personneDto);

    expect(personne).not.toBeNull();
  });

  test("DOIT retourner null QUAND un champ obligatoire manque", () => {
    const personne = PersonneRMCInscription.depuisDto({} as IPersonneRMCInscriptionDto);

    expect(personne).toBeNull();
  });
});
