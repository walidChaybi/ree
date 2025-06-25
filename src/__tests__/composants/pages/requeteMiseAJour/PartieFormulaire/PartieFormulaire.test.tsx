import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { ficheActe2 } from "@mock/data/ficheActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { act, render } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import PartieFormulaire from "../../../../../composants/pages/requetesMiseAJour/PartieFormulaire";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext,
  IEditionMiseAJourContext
} from "../../../../../contexts/EditionMiseAJourContextProvider";

describe("Tests PartieFormulaire", () => {
  const ID_ACTE = "1010";
  const ONGLETS_ACTIFS_MENTION = {
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: ECleOngletsMiseAJour.MENTIONS
  };

  const ONGLETS_ACTIFS_ANALYSE_MARGINALE = {
    actes: ECleOngletsMiseAJour.ACTE,
    formulaires: ECleOngletsMiseAJour.ANALYSE_MARGINALE
  };

  const ONGLETS_ACTIFS_MENTION_AVEC_ACT_MISE_A_JOUR = {
    actes: ECleOngletsMiseAJour.ACTE_MIS_A_JOUR,
    formulaires: ECleOngletsMiseAJour.MENTIONS
  };

  const renderSnapshot = async (ONGLETS_ACTIFS: {
    actes: ECleOngletsMiseAJour;
    formulaires: ECleOngletsMiseAJour;
  }): Promise<ChildNode | null> => {
    const router = createMemoryRouter(
      [
        {
          path: "/test",
          element: (
            <EditionMiseAJourContext.Valeurs.Provider
              value={
                {
                  idActe: ID_ACTE,
                  miseAJourEffectuee: true,
                  estMiseAJourAvecMentions: false,
                  ongletsActifs: ONGLETS_ACTIFS
                } as IEditionMiseAJourContext
              }
            >
              <PartieFormulaire />
            </EditionMiseAJourContext.Valeurs.Provider>
          )
        }
      ],
      { initialEntries: ["/test"] }
    );

    const { container } = await act(async () => render(<RouterProvider router={router} />));

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

  test("Doit correspondre au snapshot onglet mention", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION);
    expect(snapshot).toMatchSnapshot();
  });

  test("Doit correspondre au snapshot onglet Analyse marginale", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_ANALYSE_MARGINALE);
    expect(snapshot).toMatchSnapshot();
  });

  test("Doit correspondre au snapshot onglet Analyse marginale et act mise à jour", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION_AVEC_ACT_MISE_A_JOUR);
    expect(snapshot).toMatchSnapshot();
  });
});
