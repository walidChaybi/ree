import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import AnalyseMarginaleFormulaire from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AnalyseMarginaleFormulaire/AnalyseMarginaleFormulaire";

const setDonneesAnalyseMarginale = vi.fn();

const renderSnapshot = async (valeursInitiales: any): Promise<ChildNode | null> => {
  const { container } = await act(async () =>
    render(
      <div>
        <AnalyseMarginaleFormulaire
          setDonneesAnalyseMarginale={setDonneesAnalyseMarginale}
          motif="motif de test"
          valeursInitiales={valeursInitiales}
        />
      </div>
    )
  );

  return container.firstChild;
};

describe("Tests du formulaire AnalyseMarginaleFormulaire", () => {
  const VALEURS_INITALES = {
    titulaires: [
      {
        nom: "GREENWALD",
        nomSecable: false,
        nomPartie1: "false",
        nomPartie2: "",
        prenoms: PrenomsForm.valeursInitiales([
          { prenom: "marie-paulita", numeroOrdre: 1 },
          { prenom: "zaria", numeroOrdre: 2 },
          { prenom: "léna", numeroOrdre: 3 }
        ])
      }
    ],
    motif: "motif de test"
  };

  test("Doit afficher le formulaire avec les valeurs par défaut et correspondre au snapshot", async () => {
    const snapshot = await renderSnapshot(VALEURS_INITALES);
    expect(snapshot).toMatchSnapshot();
  });

  test("Doit appeler les fonctions de mise à jour avec les bonnes données à la soumission", async () => {
    await renderSnapshot(VALEURS_INITALES);

    const champNom = screen.getByRole("textbox", { name: "Nom *" });
    await userEvent.clear(champNom);
    await userEvent.type(champNom, "NOM_TEST modifié");

    const champMotif = screen.getByRole("textbox", { name: "Motif *" });
    await userEvent.clear(champMotif);
    await userEvent.type(champMotif, "MOTIF_TEST modifié");

    const boutonModifier = screen.getByText<HTMLButtonElement>("Modifier l'analyse marginale");
    await userEvent.click(boutonModifier);

    expect(setDonneesAnalyseMarginale).toHaveBeenCalled();

    const valeursEnvoyee = setDonneesAnalyseMarginale.mock.calls[0][0];

    expect(valeursEnvoyee).toMatchObject({
      titulaires: [
        {
          nom: "NOM_TEST modifié",
          nomSecable: false,
          prenoms: {
            nombrePrenomsAffiches: 3,
            prenom1: "marie-paulita",
            prenom2: "zaria",
            prenom3: "léna"
          }
        }
      ],
      motif: "MOTIF_TEST modifié"
    });
  });
});

describe("Tests du formulaire AnalyseMarginaleFormulaire dans le cas de plusueirs Titulaires", () => {
  const VALEURS_INITALES = {
    titulaires: [
      {
        nom: "GREENWALD",
        nomSecable: false,
        nomPartie1: "false",
        nomPartie2: "",
        prenoms: PrenomsForm.valeursInitiales([
          { prenom: "marie-paulita", numeroOrdre: 1 },
          { prenom: "zaria", numeroOrdre: 2 },
          { prenom: "léna", numeroOrdre: 3 }
        ])
      },
      {
        nom: "BIGOU",
        nomSecable: false,
        nomPartie1: "false",
        nomPartie2: "",
        prenoms: PrenomsForm.valeursInitiales([
          { prenom: "marie-paulita", numeroOrdre: 1 },
          { prenom: "zaria", numeroOrdre: 2 },
          { prenom: "léna", numeroOrdre: 3 }
        ])
      }
    ],
    motif: "motif de test"
  };

  test("Doit afficher le formulaire avec deux titulaires", async () => {
    const snapshot = await renderSnapshot(VALEURS_INITALES);
    expect(snapshot).toMatchSnapshot();
  });
});
