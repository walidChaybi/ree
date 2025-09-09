import { CONFIG_PUT_ANALYSE_MARGINALE_ET_MENTIONS } from "@api/configurations/etatCivil/PutAnalyseMarginaleEtMentionsConfigApi";
import { CONFIG_PUT_MISE_A_JOUR_ANALYSE_MARGINALE } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import CONFIG_GET_TYPES_MENTION_INTEGRATION_RECE from "@api/configurations/etatCivil/nomenclature/GetTypesMentionIntegrationRECEApi";
import { CONFIG_GET_METAMODELE_TYPE_MENTION } from "@api/configurations/requete/miseAJour/GetMetamodeleTypeMentionConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { ficheActe3, ficheActeMentionIntegrationRECE, ficheActeMentionIntegrationRECENonEligible } from "@mock/data/ficheActe";
import { MetaModeleAideSaisieMariageEnFrance } from "@mock/data/mentions";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  const ID_TYPE_MENTION = "b03c0e14-bad0-40a7-a895-8169e2b7f38e";

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
    estMiseAJourAvecMentions: boolean,
    droits: Droit[]
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

    const { container } = await act(async () =>
      render(
        <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroits(droits).generer()}>
          <RouterProvider router={router} />
        </MockRECEContextProvider>
      )
    );

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
        data: ficheActe3
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

    MockApi.deployer(
      CONFIG_GET_METAMODELE_TYPE_MENTION,
      { path: { idTypeMention: ID_TYPE_MENTION } },
      {
        data: MetaModeleAideSaisieMariageEnFrance
      }
    );

    MockApi.deployer(
      CONFIG_GET_TYPES_MENTION_INTEGRATION_RECE,
      {},
      {
        data: {
          idTypeMention: "0123456789",
          affecteAnalyseMarginale: false,
          texteMention: "Acte intégré au registre électronique sous la référence"
        }
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
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, false, []);
    expect(snapshot).toMatchSnapshot();

    const mock = MockApi.getMock();

    await modiferMotifAnalyseMarginale("Mon nouveau motif modifié");

    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].url).toContain("/analyse-marginale/acte/1010");
  });

  test("Ajouter une mention simple, ajouter une mention liée à l'analyse marginale, modifier le formulaire et vérifier l'appel API", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true, []);
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

  test("Ajouter une mention 'Mariage - en France(marie)' + validation et envoi formulaire", async () => {
    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true, []);
    expect(snapshot).toMatchSnapshot();

    await userEvent.click(await screen.findByPlaceholderText("Recherche..."));
    fireEvent.click(await screen.findByRole("option", { name: "1 Mariage" }));

    await waitFor(() => expect(screen.getByRole("option", { name: "1-1 en France (mairie)" })).toBeDefined());

    fireEvent.click(screen.getByRole("option", { name: "1-1 en France (mairie)" }));

    //await waitFor(() => screen.debug);
    await waitFor(() => expect(screen.getByText("LIEU <ÉVÉNEMENT>")).toBeDefined());

    // On vérifie le remplissage de l'aide à la saisie
    const inputVille = screen.getByRole("textbox", { name: /evenementFrance.ville/i });
    const inputDepartement = screen.getByRole("textbox", { name: /evenementFrance.departement/i });
    const inputNom = screen.getByRole("textbox", { name: /conjoint.nom/i });
    const inputJourEvenement = screen.getByPlaceholderText("JJ");
    const inputMoisEvenement = screen.getByPlaceholderText("MM");
    const inputAnneeEvenement = screen.getByPlaceholderText("AAAA");
    const boutonValidation = screen.getByRole("button", { name: "Ajouter mention" });

    await waitFor(() => {
      expect(inputVille).toBeDefined();
      expect(inputDepartement).toBeDefined();
      expect(inputNom).toBeDefined();
      expect(inputJourEvenement).toBeDefined();
      expect(inputMoisEvenement).toBeDefined();
      expect(inputAnneeEvenement).toBeDefined();
      expect(boutonValidation).toBeDefined();
    });

    // Les champs se mettent correctement en erreur
    fireEvent.click(boutonValidation);

    await waitFor(() => expect(screen.getAllByText(/⚠ La saisie du champ est obligatoire/i)).toBeDefined());

    // Le remplissage du texte d'aide à la saisie fonctionne
    await userEvent.type(inputVille, "superVille");
    await userEvent.type(inputDepartement, "superDepartement");
    await userEvent.type(inputJourEvenement, "12");
    await userEvent.type(inputMoisEvenement, "09");
    await userEvent.type(inputAnneeEvenement, "2000");
    await userEvent.type(inputNom, "superNom");

    await waitFor(() => {
      expect(screen.getByText("superVille (superDepartement)")).toBeDefined();
      expect(screen.getByText("le 12 septembre 2000")).toBeDefined();
    });

    // La soumission de la mention fonctionne
    fireEvent.click(boutonValidation);

    await waitFor(() => {
      expect(screen.getByText("Marié à")).toBeDefined();
      expect(screen.getByText("superVille (superDepartement)")).toBeDefined();
      expect(screen.getByText("le 12 septembre 2000")).toBeDefined();
      expect(screen.getByText("avec")).toBeDefined();
      expect(screen.getByText("superNom")).toBeDefined();
    });
  });

  test("S'assurer que l'appel API de recuperation d'acte est correct avec data titulaires vide ", async () => {
    let actAvecTitulaireVide = ficheActe3;
    actAvecTitulaireVide.titulaires = [];

    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: actAvecTitulaireVide as IFicheActe
      }
    );

    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, false, []);
    expect(snapshot).toMatchSnapshot();

    const mock = MockApi.getMock();

    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toContain("/acte/1010/resume");
  });

  test("Afficher le bloc 'Mention intégration RECE'", async () => {
    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: ficheActeMentionIntegrationRECE
      }
    );

    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true, [Droit.METTRE_A_JOUR_ACTE, Droit.SIGNER_MENTION_INTEGRATION]);
    expect(snapshot).toMatchSnapshot();
  });

  test("N'affiche pas le bloc 'Mention intégration RECE' quand l'utilisateur ne possède pas le droit SIGNER_MENTION_INTEGRATION", async () => {
    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: ficheActeMentionIntegrationRECE
      }
    );

    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true, [Droit.METTRE_A_JOUR_ACTE]);
    expect(snapshot).toMatchSnapshot();
  });

  test("N'affiche pas le bloc 'Mention intégration RECE' si l'acte n'est pas éligible integration mentions", async () => {
    MockApi.deployer(
      CONFIG_GET_RESUME_ACTE,
      { path: { idActe: ID_ACTE }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
      {
        data: ficheActeMentionIntegrationRECENonEligible
      }
    );

    const snapshot = await renderSnapshot(ONGLETS_ACTIFS_MENTION, true, [Droit.METTRE_A_JOUR_ACTE, Droit.SIGNER_MENTION_INTEGRATION]);
    expect(snapshot).toMatchSnapshot();
  });
});
