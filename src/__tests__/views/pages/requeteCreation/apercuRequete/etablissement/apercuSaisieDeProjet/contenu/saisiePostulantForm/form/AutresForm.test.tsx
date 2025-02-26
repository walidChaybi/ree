import { AUTRES } from "@composant/formulaire/ConstantesNomsForm";
import AutresForm from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/form/AutresForm";
import { mappingTitulairesVersFormulairePostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { getPostulantValidationSchema } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/validation/PostulantValidationSchema";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { expect, test } from "vitest";
import { requeteCreationEtablissementSaisieProjet } from "../../../../../../../../../mock/data/requeteCreationEtablissement";

function afficheComposantAutresSaisieDeProjet() {
  const titulaires = requeteCreationEtablissementSaisieProjet.titulaires;

  render(
    <Formulaire
      formDefaultValues={mappingTitulairesVersFormulairePostulant(titulaires![0], titulaires![1], titulaires![2])}
      formValidationSchema={getPostulantValidationSchema}
      onSubmit={() => {}}
    >
      <AutresForm nom={AUTRES} />
    </Formulaire>
  );
}

test("DOIT afficher et renseigner les champs du bloc autres QUAND le formulaire est affiché", () => {
  afficheComposantAutresSaisieDeProjet();

  const champAdresse = screen.getByLabelText("Etranger") as HTMLInputElement;
  const champVille = screen.getByLabelText("Ville") as HTMLInputElement;
  const champPays = screen.getByLabelText("Pays") as HTMLInputElement;
  const champReconnaissance = screen.getByLabelText("Reconnaissance") as HTMLInputElement;
  const champDeclarant = screen.getByLabelText("Déclarant(s)") as HTMLInputElement;

  waitFor(() => {
    expect(champAdresse.checked).toBeTruthy();
    expect(champVille.value).toBe("Ville");
    expect(champPays.value).toBe("Pays");
    expect(champReconnaissance.value).toBe("");
    expect(champDeclarant.value).toBe("");
  });
});

test("DOIT afficher le champ département ou arrondissement QUAND le champ France est coché", () => {
  afficheComposantAutresSaisieDeProjet();

  waitFor(() => {
    expect(screen.queryByLabelText("Département")).toBeNull();
    expect(screen.queryByLabelText("Arrondissement")).toBeNull();
  });

  fireEvent.click(screen.getByLabelText("France"));

  const champVille = screen.getByLabelText("Ville") as HTMLInputElement;

  waitFor(() => {
    expect(champVille.value).toBe("Ville");
    expect(screen.getByLabelText("Département")).toBeDefined();
    expect(screen.queryByLabelText("Arrondissement")).toBeNull();
  });

  fireEvent.input(champVille, {
    target: {
      value: "paris"
    }
  });

  waitFor(() => {
    expect(screen.queryByLabelText("Département")).toBeNull();
    expect(screen.getByLabelText("Arrondissement")).toBeDefined();
  });
});

test("DOIT n'afficher aucun champ lié à l'adresse QUAND le champ Inconnu est coché", () => {
  afficheComposantAutresSaisieDeProjet();

  waitFor(() => {
    expect(screen.getByLabelText("Ville")).toBeDefined();
  });

  fireEvent.click(screen.getByLabelText("Inconnu"));

  waitFor(() => {
    expect(screen.queryByLabelText("Ville")).toBeNull();
  });
});

test("DOIT afficher le champ autre déclarant QUAND on selectionne Autre", () => {
  afficheComposantAutresSaisieDeProjet();

  waitFor(() => {
    expect(screen.queryByLabelText("Autre déclarant")).toBeNull();
  });

  fireEvent.change(screen.getByLabelText("Déclarant(s)"), {
    target: { value: "AUTRE" }
  });

  waitFor(() => {
    expect(screen.getByLabelText("Autre déclarant")).toBeDefined();
  });
});
