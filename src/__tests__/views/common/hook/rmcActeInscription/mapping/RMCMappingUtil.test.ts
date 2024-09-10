import {
  mappingActes,
  mappingRequeteDelivranceToRMC
} from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import { ReponseAppelRMCActe } from "@mock/data/RMCActe";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";
import { expect, test } from "vitest";

test("mappingIRMCActeArchive", () => {
  expect(mappingRequeteDelivranceToRMC(requeteDelivrance)).toStrictEqual({
    titulaire: {
      nom: "Prodesk",
      prenom: "Elodie",
      dateNaissance: { annee: "1990", mois: "6", jour: "25" },
      paysNaissance: "Espagne"
    },
    evenement: {
      dateEvenement: { annee: "", mois: "", jour: "" },
      paysEvenement: undefined
    }
  });
});

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
