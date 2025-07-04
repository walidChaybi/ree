import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { ficheActe2 } from "@mock/data/ficheActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
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

  const activerOngletActeMisAJour = vi.fn();
  const changerOnglet = vi.fn();
  const desactiverBlocker = vi.fn();
  const setComposerActeMisAJour = vi.fn();
  const setEstActeSigne = vi.fn();

  const MENTION_TEXT_TEST_1 = "text mention test 1.";
  const MENTION_TEXT_TEST_2 = "mention 2 test";

  const renderSnapshot = async (
    ONGLETS_ACTIFS: {
      actes: ECleOngletsMiseAJour;
      formulaires: ECleOngletsMiseAJour;
    },
    estMiseAJourAvecMentions: boolean
  ): Promise<ChildNode | null> => {
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
                  estMiseAJourAvecMentions: estMiseAJourAvecMentions,
                  ongletsActifs: ONGLETS_ACTIFS
                } as IEditionMiseAJourContext
              }
            >
              <EditionMiseAJourContext.Actions.Provider
                value={{
                  activerOngletActeMisAJour: activerOngletActeMisAJour,
                  changerOnglet: changerOnglet,
                  desactiverBlocker: desactiverBlocker,
                  setComposerActeMisAJour: setComposerActeMisAJour,
                  setEstActeSigne: setEstActeSigne
                }}
              >
                <PartieFormulaire />
              </EditionMiseAJourContext.Actions.Provider>
            </EditionMiseAJourContext.Valeurs.Provider>
          )
        }
      ],
      { initialEntries: ["/test"] }
    );

    const { container } = await act(async () => render(<RouterProvider router={router} />));

    return container.firstChild;
  };

  beforeAll(() => {
    TypeMention.init(TYPE_MENTION);
  });

  beforeEach(() => {
    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: ficheActe2.data as unknown as IFicheActe
      }
    );

    MockApi.deployer(
      CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS,
      {},
      {
        data: {
          reference_acte: "RECE.2022.000001",
          nature_acte: "ACTE DE NAISSANCE",
          titulaires: "de Cassandra, Clara, Angela Schlosser",
          texte_corps_acte: "texte corps acte",
          mentions: MENTION_TEXT_TEST_1
        }
      }
    );

    MockApi.deployer(
      CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE,
      { path: { idActe: ID_ACTE } },
      {
        data: null
      }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
    vi.clearAllMocks();
  });

  const ajoutMention = async (option: string, textMention: string) => {
    await userEvent.click(await screen.findByPlaceholderText("Recherche..."));
    fireEvent.click(await screen.findByRole("option", { name: option }));

    const textarea = await screen.findByRole("textbox", { name: /texteMention/i });
    expect(textarea).toBeDefined();

    await userEvent.type(textarea, textMention);

    const ajouterMentionBtn = await screen.findByRole("button", { name: "Ajouter mention" });
    await userEvent.click(ajouterMentionBtn);

    const mention = await screen.findByText(new RegExp(textMention, "i"));
    expect(mention).toBeDefined();
  };

  const modiferMotifAnalyseMarginale = async (motif: string) => {
    const motifInput = await screen.findByRole("textbox", { name: /motif/i });
    expect(motifInput).toBeDefined();

    await userEvent.type(motifInput, motif);

    const modifierAnalyseMarginaleBtn = await screen.findByRole("button", { name: "Modifier l'analyse marginale" });
    await userEvent.click(modifierAnalyseMarginaleBtn);
  };

  test("Mettre à jour le formulaire d'analyse marginale et s'assurer que l'appel API est correct", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, false);
    expect(snapshot).toMatchSnapshot();

    const mock = MockApi.getMock();

    await modiferMotifAnalyseMarginale("Mon nouveau motif modifié");

    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toContain("/analyse-marginale/acte/1010");
  });

  test("Ajouter une mention simple, ajouter une mention liée à l'analyse marginale, modifier le formulaire et vérifier l'appel API", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true);
    expect(snapshot).toMatchSnapshot();

    const mock = MockApi.getMock();

    await ajoutMention("Autres", MENTION_TEXT_TEST_1);

    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toContain("/acte/mentions-et-analyse-marginale");

    await ajoutMention("18-3 Changement de sexe", MENTION_TEXT_TEST_2);

    expect(mock.history.put.length).toBe(2);
    expect(mock.history.put[1].url).toContain("/acte/mentions-et-analyse-marginale");

    await modiferMotifAnalyseMarginale("Mon nouveau motif modifié");

    expect(mock.history.put.length).toBe(3);
    expect(mock.history.put[2].url).toContain("/acte/mentions-et-analyse-marginale");
  });
});
