import { mappingActes } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { expect, test } from "vitest";
import { ReponseAppelRMCActe } from "../../../../../mock/data/RMCActe";

test("mappingIRMCActe", () => {
  expect(mappingActes(ReponseAppelRMCActe.data.registres)).toStrictEqual([
    {
      autresNoms: "DUPE",
      dateEvenement: "",
      dateNaissance: "08/06/1960",
      familleRegistre: TypeFamille.ACQ,
      idActe: "d8708d77-a359-4553-be72-1eb5f246d4da",
      nature: "Reconnaissance",
      nom: "ROSE",
      paysNaissance: "Tunisie",
      prenoms: "Jean-Pierre, Michel",
      referenceRece: "RECE.999",
      referenceRegistre: "4568",
      type: undefined
    }
  ]);
});
