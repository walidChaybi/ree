import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { ficheActe2 } from "@mock/data/ficheActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import AnalyseMarginaleFormulaire from "../../../../../../composants/pages/requetesMiseAJour/formulaires/mentions/AnalyseMarginaleFormulaire/AnalyseMarginaleFormulaire";
import { EditionMiseAJourContext, IEditionMiseAJourContext } from "../../../../../../contexts/EditionMiseAJourContextProvider";

describe("Tests du formulaire AnalyseMarginaleFormulaire", () => {
  const ID_ACTE = "1010";
  const setDonneesAnalyseMarginale = vi.fn();
  const setAnalyseMarginaleModifiee = vi.fn();

  const renderSnapshot = async (): Promise<ChildNode | null> => {
    const { container } = await act(async () =>
      render(
        <div>
          <EditionMiseAJourContext.Valeurs.Provider value={{ idActe: ID_ACTE } as IEditionMiseAJourContext}>
            <AnalyseMarginaleFormulaire
              setDonneesAnalyseMarginale={setDonneesAnalyseMarginale}
              setAnalyseMarginaleModifiee={setAnalyseMarginaleModifiee}
              motif="motif de test"
            />
          </EditionMiseAJourContext.Valeurs.Provider>
        </div>
      )
    );

    return container.firstChild;
  };

  beforeEach(() => {
    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: ficheActe2.data as unknown as IFicheActe
      }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
    vi.clearAllMocks();
  });

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
