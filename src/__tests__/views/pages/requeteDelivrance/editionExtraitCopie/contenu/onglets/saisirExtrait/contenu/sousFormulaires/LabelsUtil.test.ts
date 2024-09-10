import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { getLabels } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/contenu/sousFormulaires/LabelsUtil";
import { expect, test } from "vitest";

test("Attendu: getLabels fonctionne correctement", () => {
  expect(getLabels(NatureActe.NAISSANCE)).toEqual({
    dateEvenement: "Date de naissance",
    lieuEvenement: "Lieu de naissance",
    evenement: "Evénement naissance",
    titulaireEtOuEvenenement: "Titulaire / Evénement"
  });

  expect(getLabels(NatureActe.MARIAGE)).toEqual({
    dateEvenement: "Date de mariage",
    lieuEvenement: "Lieu de mariage",
    evenement: "Evénement mariage",
    titulaireEtOuEvenenement: "Titulaire"
  });

  expect(getLabels(NatureActe.DECES)).toEqual({
    dateEvenement: "Date de décès",
    lieuEvenement: "Lieu de décès",
    evenement: "Evénement décès",
    titulaireEtOuEvenenement: "Titulaire"
  });
});
