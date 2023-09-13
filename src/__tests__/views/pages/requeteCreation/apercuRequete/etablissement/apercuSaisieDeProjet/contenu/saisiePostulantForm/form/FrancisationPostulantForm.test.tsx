import { FRANCISATION_POSTULANT } from "@composant/formulaire/ConstantesNomsForm";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { requeteCreationEtablissementSaisieProjet } from "@mock/data/requeteCreationEtablissement";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { IRetenueSdanf } from "@model/requete/IRetenueSdanf";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import FrancisationPostulantForm from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/form/FrancisationPostulantForm";
import { mappingTitulairesVersSaisieProjetPostulant } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/mapping/mappingTitulaireVersFormulairePostulant";
import { PostulantValidationSchema } from "@pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/contenu/saisiePostulantForm/validation/PostulantValidationSchema";
import { render, screen, waitFor } from "@testing-library/react";
import { Formulaire } from "@widget/formulaire/Formulaire";

const TITULAIRE: ITitulaireRequeteCreation = {
  id: "04bee8c3-ba96-454e-b78a-4e46219d948f",
  position: 1,
  nomNaissance: "nomNaissance",
  sexe: "MASCULIN",
  nationalite: Nationalite.ETRANGERE
};

const parentsPourMapping = mappingRequeteCreation(
  requeteCreationEtablissementSaisieProjet
).titulaires;

function afficheComposantFrancisationPostulant(
  retenueSdanf: IRetenueSdanf
): void {
  const titulaire: ITitulaireRequeteCreation = {
    ...TITULAIRE,
    retenueSdanf
  };

  render(
    <Formulaire
      formDefaultValues={mappingTitulairesVersSaisieProjetPostulant(titulaire, [
        parentsPourMapping![1],
        parentsPourMapping![2]
      ])}
      formValidationSchema={PostulantValidationSchema}
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
      expect(screen.queryByText("Francisation postulant")).toBeInTheDocument();
      expect(screen.queryByText("Nom francisé")).toBeInTheDocument();
      expect(screen.queryByText("Prénoms francisés")).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue("nomDemandeFrancisation")
      ).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Jean")).toBeInTheDocument();
    });
  });

  test("NE DOIT PAS afficher le composant QUAND aucun nom et prénoms francisés ne sont disponibles.", async () => {
    const retenueSdanf: IRetenueSdanf = {};

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(
        screen.queryByText("Francisation postulant")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Nom francisé")).not.toBeInTheDocument();
      expect(screen.queryByText("Prénoms francisés")).not.toBeInTheDocument();
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
      expect(screen.queryByText("Nom francisé")).not.toBeInTheDocument();
      expect(screen.queryByText("Prénoms francisés")).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue("nomDemandeFrancisation")
      ).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue("Jean")).toBeInTheDocument();
    });
  });

  test("NE DOIT PAS afficher le champ 'Prénoms francisés' QUAND les prénoms francisés ne sont pas disponibles.", async () => {
    const retenueSdanf: IRetenueSdanf = {
      nomDemandeFrancisation: "nomDemandeFrancisation",
      prenomsRetenu: [
        { prenom: "Juan", numeroOrdre: 1, estPrenomFrRetenuSdanf: false }
      ]
    };

    afficheComposantFrancisationPostulant(retenueSdanf);

    await waitFor(() => {
      expect(screen.queryByText("Nom francisé")).toBeInTheDocument();
      expect(screen.queryByText("Prénoms francisés")).not.toBeInTheDocument();
      expect(
        screen.queryByDisplayValue("nomDemandeFrancisation")
      ).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Jean")).not.toBeInTheDocument();
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
      expect(screen.queryByText("Prénoms francisés")).toBeInTheDocument();
      expect(screen.queryByDisplayValue("Charles, Juan")).toBeInTheDocument();
    });
  });
});
