import { mappingRequeteDelivranceToRMC } from "@hook/rmcActeInscription/mapping/RMCMappingUtil";
import requeteDelivrance from "@mock/data/requeteDelivrance";

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
