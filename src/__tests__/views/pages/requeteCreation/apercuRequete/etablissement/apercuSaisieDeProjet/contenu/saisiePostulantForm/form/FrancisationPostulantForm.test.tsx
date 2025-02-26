import { FRANCISATION_POSTULANT } from "@composant/formulaire/ConstantesNomsForm";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import FrancisationPostulantForm from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/form/FrancisationPostulantForm";
import { mappingTitulairesVersFormulairePostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { getPostulantValidationSchema } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/validation/PostulantValidationSchema";
import { render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";
import { describe, expect, test } from "vitest";
import { requeteCreationEtablissementSaisieProjet } from "../../../../../../../../../mock/data/requeteCreationEtablissement";

const TITULAIRE: ITitulaireRequeteCreation = {
  id: "04bee8c3-ba96-454e-b78a-4e46219d948f",
  position: 1,
  nomNaissance: "nomNaissance",
  sexe: "MASCULIN",
  nationalite: Nationalite.ETRANGERE
};

const parentsPourMapping = mappingRequeteCreation(requeteCreationEtablissementSaisieProjet).titulaires;

function afficheComposantFrancisationPostulant(retenueSdanf: IRetenueSdanf): void {
  const titulaire: ITitulaireRequeteCreation = {
    ...TITULAIRE,
    retenueSdanf
  };

  render(
    <Formulaire
      formDefaultValues={mappingTitulairesVersFormulairePostulant(titulaire, parentsPourMapping![1], parentsPourMapping![2])}
      formValidationSchema={getPostulantValidationSchema}
      onSubmit={() => {}}
      className="FormulairePostulant"
    >
      <FrancisationPostulantForm
        nom={FRANCISATION_POSTULANT}
        retenueSdanf={titulaire.retenueSdanf}
      />
    </Formulaire>
  );
}

describe("Test le rendu du composant et des champs en fonction des informations du postulant", () => {
  test("DOIT afficher le composant et tous ses champs QUAND le nom et les prénoms francisés sont disponibles.", async () => {
    const retenueSdanf: IRetenueSdanf = {
      nomDemandeFrancisation: "nomDemandeFrancisation",
      prenomsRetenu: [
        { prenom: "Juan", numeroOrdre: 1, estPrenomFrRetenuSdanf: false },
        { prenom: "Jean", numeroOrdre: 1, estPrenomFrRetenuSdanf: true }
      ]
    };

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Francisation postulant")).toBeDefined();
      expect(screen.queryByText("Nom francisé")).toBeDefined();
      expect(screen.queryByText("Prénoms francisés")).toBeDefined();
      expect(screen.queryByDisplayValue("nomDemandeFrancisation")).toBeDefined();
      expect(screen.queryByDisplayValue("Jean")).toBeDefined();
    });
  });

  test("NE DOIT PAS afficher le composant QUAND aucun nom et prénoms francisés ne sont disponibles.", async () => {
    const retenueSdanf: IRetenueSdanf = {};

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Francisation postulant")).toBeNull();
      expect(screen.queryByText("Nom francisé")).toBeNull();
      expect(screen.queryByText("Prénoms francisés")).toBeNull();
    });
  });

  test("NE DOIT PAS afficher le champ 'Nom francisé' QUAND le nom francisés n'est pas disponible.", async () => {
    const retenueSdanf: IRetenueSdanf = {
      prenomsRetenu: [
        { prenom: "Juan", numeroOrdre: 1, estPrenomFrRetenuSdanf: false },
        { prenom: "Jean", numeroOrdre: 1, estPrenomFrRetenuSdanf: true }
      ]
    };

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Nom francisé")).toBeNull();
      expect(screen.queryByText("Prénoms francisés")).toBeDefined();
      expect(screen.queryByDisplayValue("nomDemandeFrancisation")).toBeNull();
      expect(screen.queryByDisplayValue("Jean")).toBeDefined();
    });
  });

  test("NE DOIT PAS afficher le champ 'Prénoms francisés' QUAND les prénoms francisés ne sont pas disponibles.", async () => {
    const retenueSdanf: IRetenueSdanf = {
      nomDemandeFrancisation: "nomDemandeFrancisation",
      prenomsRetenu: [{ prenom: "Juan", numeroOrdre: 1, estPrenomFrRetenuSdanf: false }]
    };

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Nom francisé")).toBeDefined();
      expect(screen.queryByText("Prénoms francisés")).toBeNull();
      expect(screen.queryByDisplayValue("nomDemandeFrancisation")).toBeDefined();
      expect(screen.queryByDisplayValue("Jean")).toBeNull();
    });
  });

  test("DOIT afficher dans l'ordre de la liste le prénom francisé QUAND il existe sinon le prénom non francisé.", async () => {
    const retenueSdanf: IRetenueSdanf = {
      prenomsRetenu: [
        { prenom: "Carlos", numeroOrdre: 2, estPrenomFrRetenuSdanf: false },
        { prenom: "Charles", numeroOrdre: 2, estPrenomFrRetenuSdanf: true },
        { prenom: "Juan", numeroOrdre: 1, estPrenomFrRetenuSdanf: false }
      ]
    };

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Prénoms francisés")).toBeDefined();
      expect(screen.queryByDisplayValue("Charles, Juan")).toBeDefined();
    });
  });
});
