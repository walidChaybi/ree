import { CONFIG_GET_PROJET_ACTE } from "@api/configurations/etatCivil/acte/GetProjetActeConfigApi";
import { CONFIG_GET_MODELE_TEXTE } from "@api/configurations/etatCivil/acte/transcription/GetModeleTexteConfigApi";
import { CONFIG_GET_LIBELLE_DECRET } from "@api/configurations/etatCivil/typesRegistres/GetLibelleDecretConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { projetActeNaissanceDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import PageRequeteTranscriptionSaisieProjet from "../../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

vi.mock("../../../../composants/pages/rmc/TableauRMCRequetesAssociees", () => {
  return {
    default: () => <div data-testid="rmc-mock">Requetes associees</div>
  };
});

describe("PageRequeteTranscriptionSaisieProjet - affichage des parties", () => {
  test("affiche PartieGauche et PartieDroite après récupération de la requête", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteTranscriptionSaisieProjet /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" }, query: { isConsultationHistoriqueAction: true } },
      {
        data: { ...requeteCreationTranscription }
      }
    )
      .deployer(CONFIG_GET_PROJET_ACTE, { path: { idActe: "3ed99ec3-a80f-480d-b91f-b4068f0b3bfj" } }, { data: projetActeNaissanceDto })
      .deployer(CONFIG_GET_LIBELLE_DECRET, {
        path: { idTypeRegistre: "7a091a3b-6835-4824-94fb-527d62926d45" }
      })
      .deployer(CONFIG_GET_MODELE_TEXTE);

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
      expect(mockApi.history.get.length).toBe(4);
    });

    await waitFor(() => {
      const texteRequete = screen.getByText(/Description de la requête/i);
      expect(texteRequete).toBeDefined();

      const rmcMock = screen.getByTestId("rmc-mock");
      expect(rmcMock).toBeDefined();
    });

    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });
});
