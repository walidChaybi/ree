import { CONFIG_POST_MAJ_STATUT_ET_ACTION } from "@api/configurations/requete/actions/PostMajStatutEtActionConfigApi";
import { CONFIG_POST_PRENDRE_EN_CHARGE } from "@api/configurations/requete/creation/PostPrendreEnChargeRequeteTranscriptionConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TRequete } from "@model/requete/IRequete";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import PageRequeteCreationTranscriptionPriseEnCharge from "../../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge";
import { createTestingRouter } from "../../__tests__utils__/testsUtil";

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
  vi.mock("../../../composants/pages/rmc/TableauRMCRequetesAssociees", () => {
    return {
      default: () => <div data-testid="rmc-mock">Requetes associees</div>
    };
  });

  test("affiche PartieGauche et PartieDroite après récupération de la requête", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" }, query: { isConsultationHistoriqueAction: true } },
      {
        data: { ...requeteCreationTranscription }
      }
    );

    const { container } = render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({ id: "test-utilisateur-id" })
          .avecDroit(Droit.CONSULTER)
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
    });

    await waitFor(() => {
      const descriptionText = screen.getByText(/Description de la requête/i);
      expect(descriptionText).toBeDefined();

      const rmcMock = screen.getByTestId("rmc-mock");
      expect(rmcMock).toBeDefined();
    });

    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });

  test("DOIT passer le statut de la requête à 'PRISE_EN_CHARGE' QUAND l'utilisateur clique sur le bouton 'PRENDRE EN CHARGE'", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" }, query: { isConsultationHistoriqueAction: true } },
      {
        data: {
          ...requeteCreationTranscription,
          statut: {
            statutRequete: "A_TRAITER",
            dateEffet: 1656404736683
          },
          typeRegistre: { ...requeteCreationTranscription.typeRegistre, poste: "CASABLANCA" }
        } as TRequete
      }
    );

    MockApi.deployer(CONFIG_POST_PRENDRE_EN_CHARGE, { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" } });

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({ id: "test-utilisateur-id", idService: "6737566d-0f25-45dc-8443-97b444e6753a" })
          .avecDroits([Droit.TRANSCRIPTION_CREER_PROJET_ACTE], { surIdsTypeRegistre: ["7a091a3b-6835-4824-94fb-527d62926d45"] })
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => expect(mockApi.history.get.length).toBe(1));

    const boutonPrendreEnCharge = await screen.findByText("Prendre en charge");
    await userEvent.click(boutonPrendreEnCharge);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
      expect(mockApi.history.post[0].url).toContain("3ed9aa4e-921b-489f-b8fe-531dd703c60c/transcription/prendre-en-charge");
    });

    MockApi.stopMock();
  });

  test("DOIT passer le statut de la requête à 'PRISE_EN_CHARGE' QUAND l'utilisateur clique sur le bouton 'PRENDRE EN CHARGE' sur périmetre 'TOUS_REGISTRE'", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" }, query: { isConsultationHistoriqueAction: true } },
      {
        data: {
          ...requeteCreationTranscription,
          statut: {
            statutRequete: "A_TRAITER",
            dateEffet: 1656404736683
          },
          typeRegistre: { ...requeteCreationTranscription.typeRegistre, poste: "CASABLANCA" }
        } as TRequete
      }
    );

    MockApi.deployer(CONFIG_POST_PRENDRE_EN_CHARGE, { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" } });

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({ id: "test-utilisateur-id", idService: "6737566d-0f25-45dc-8443-97b444e6753a" })
          .avecDroits([Droit.TRANSCRIPTION_CREER_PROJET_ACTE], { perimetres: ["TOUS_REGISTRES"] })
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => expect(mockApi.history.get.length).toBe(1));

    const boutonPrendreEnCharge = await screen.findByText("Prendre en charge");
    await userEvent.click(boutonPrendreEnCharge);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
      expect(mockApi.history.post[0].url).toContain("3ed9aa4e-921b-489f-b8fe-531dd703c60c/transcription/prendre-en-charge");
    });

    MockApi.stopMock();
  });

  test("DOIT passer le statut de la requête à 'EN_TRAITEMENT' QUAND l'utilisateur clique sur le bouton 'Créer le projet d’acte'", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      {
        path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" },
        query: { isConsultationHistoriqueAction: true }
      },
      {
        data: {
          ...requeteCreationTranscription,
          statutCourant: {
            statut: StatutRequete.PRISE_EN_CHARGE,
            dateEffet: 1577923200000
          },
          typeRegistre: { ...requeteCreationTranscription.typeRegistre, poste: "CASABLANCA" }
        } as TRequete
      }
    );

    MockApi.deployer(CONFIG_POST_MAJ_STATUT_ET_ACTION, {
      query: {
        idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c",
        libelleAction: "Saisie du projet",
        statutRequete: StatutRequete.getKey(StatutRequete.EN_TRAITEMENT)
      }
    });

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({
            id: "test-utilisateur-id",
            idService: "6737566d-0f25-45dc-8443-97b444e6753a"
          })
          .avecDroits([Droit.TRANSCRIPTION_CREER_PROJET_ACTE], { surIdsTypeRegistre: ["7a091a3b-6835-4824-94fb-527d62926d45"] })
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => expect(mockApi.history.get.length).toBe(1));

    const boutonCreerProjetActe = screen.getByText("Créer le projet d'acte");

    await userEvent.click(boutonCreerProjetActe);

    MockApi.stopMock();
  });

  test("DOIT passer le statut de la requête à 'EN_TRAITEMENT' QUAND l'utilisateur clique sur le bouton 'Créer le projet d’acte' sur périmètre 'TOUS_REGISTRES'", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteCreationTranscriptionPriseEnCharge /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      {
        path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" },
        query: { isConsultationHistoriqueAction: true }
      },
      {
        data: {
          ...requeteCreationTranscription,
          statutCourant: {
            statut: StatutRequete.PRISE_EN_CHARGE,
            dateEffet: 1577923200000
          },
          typeRegistre: { ...requeteCreationTranscription.typeRegistre, poste: "CASABLANCA" }
        } as TRequete
      }
    );

    MockApi.deployer(CONFIG_POST_MAJ_STATUT_ET_ACTION, {
      query: {
        idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c",
        libelleAction: "Saisie du projet",
        statutRequete: StatutRequete.getKey(StatutRequete.EN_TRAITEMENT)
      }
    });

    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
          .avecAttributs({
            id: "test-utilisateur-id",
            idService: "6737566d-0f25-45dc-8443-97b444e6753a"
          })
          .avecDroits([Droit.TRANSCRIPTION_CREER_PROJET_ACTE], { perimetres: ["TOUS_REGISTRES"] })
          .generer()}
      >
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    await waitFor(() => expect(mockApi.history.get.length).toBe(1));

    const boutonCreerProjetActe = screen.getByText("Créer le projet d'acte");

    await userEvent.click(boutonCreerProjetActe);

    MockApi.stopMock();
  });
});
