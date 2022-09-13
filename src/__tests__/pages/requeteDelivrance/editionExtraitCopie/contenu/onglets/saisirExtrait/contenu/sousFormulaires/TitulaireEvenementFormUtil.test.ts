import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { getLabels } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/contenu/sousFormulaires/TitulaireEvenementFormUtil";

test("Attendu: getLabels fonctionne correctement", () => {
  expect(getLabels(NatureActe.NAISSANCE)).toEqual({
    dateEvenement: "Date de naissance",
    lieuEvenement: "Lieu de naissance"
  });

  expect(getLabels(NatureActe.MARIAGE)).toEqual({
    dateEvenement: "Date de mariage",
    lieuEvenement: "Lieu de mariage"
  });

  expect(getLabels(NatureActe.DECES)).toEqual({
    dateEvenement: "Date de déces",
    lieuEvenement: "Lieu de déces"
  });
});
