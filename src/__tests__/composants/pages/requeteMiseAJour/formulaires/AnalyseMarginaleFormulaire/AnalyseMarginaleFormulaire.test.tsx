import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import AnalyseMarginaleFormulaire from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AnalyseMarginaleFormulaire/AnalyseMarginaleFormulaire";

describe("Tests du formulaire AnalyseMarginaleFormulaire", () => {
  const setDonneesAnalyseMarginale = vi.fn();
  const setAnalyseMarginaleModifiee = vi.fn();
  const VALEURS_INITALES = {
    nom: "GREENWALD",
    nomSecable: false,
    nomPartie1: "false",
    nomPartie2: "",
    prenoms: {
      nombrePrenomsAffiches: 3,
      prenom1: "marie-paulita",
      prenom2: "zaria",
      prenom3: "léna",
      prenom4: "",
      prenom5: "",
      prenom6: "",
      prenom7: "",
      prenom8: "",
      prenom9: "",
      prenom10: "",
      prenom11: "",
      prenom12: "",
      prenom13: "",
      prenom14: "",
      prenom15: ""
    },
    motif: "motif de test"
  };

  const renderSnapshot = async (): Promise<ChildNode | null> => {
    const { container } = await act(async () =>
      render(
        <div>
          <AnalyseMarginaleFormulaire
            setDonneesAnalyseMarginale={setDonneesAnalyseMarginale}
            setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
            motif="motif de test"
            valeursInitiales={VALEURS_INITALES}
          />
        </div>
      )
    );

    return container.firstChild;
  };

  test("Doit afficher le formulaire avec les valeurs par défaut et correspondre au snapshot", async () => {
    const snapshot = await renderSnapshot();
    expect(snapshot).toMatchSnapshot();
  });

  test("Doit appeler les fonctions de mise à jour avec les bonnes données à la soumission", async () => {
    await renderSnapshot();

    const champNom = document.querySelector('input[name="nom"]')!;
    await userEvent.clear(champNom);
    await userEvent.type(champNom, "NOM_TEST modifié");

    const champMotif = document.querySelector('input[name="motif"]')!;
    await userEvent.clear(champMotif);
    await userEvent.type(champMotif, "MOTIF_TEST modifié");

    const boutonModifier = screen.getByText<HTMLButtonElement>("Modifier l'analyse marginale");
    await userEvent.click(boutonModifier);

    expect(setDonneesAnalyseMarginale).toHaveBeenCalled();
    expect(setAnalyseMarginaleModifiee).toHaveBeenCalled();

    const valeursEnvoyee = setDonneesAnalyseMarginale.mock.calls[0][0];

    expect(valeursEnvoyee).toMatchObject({
      nom: "NOM_TEST modifié",
      nomSecable: false,
      prenoms: {
        nombrePrenomsAffiches: 3,
        prenom1: "marie-paulita",
        prenom2: "zaria",
        prenom3: "léna"
      },
      motif: "MOTIF_TEST modifié"
    });
  });
});
