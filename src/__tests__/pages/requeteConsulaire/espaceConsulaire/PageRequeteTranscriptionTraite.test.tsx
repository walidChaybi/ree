import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { CONFIG_GET_DETAIL_REQUETE } from "@api/configurations/requete/GetDetailRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import PageRequeteTranscriptionTraite from "../../../../pages/requetesConsulaire/PageRequeteTranscriptionTraite";
import { createTestingRouter } from "../../../__tests__utils__/testsUtil";

describe("PageRequeteTranscriptionTraite", () => {
  test("DOIT afficher la PartieGauche et PartieDroite après récupération de la requête", async () => {
    const router = createTestingRouter(
      [{ path: "/:idRequeteParam", element: <PageRequeteTranscriptionTraite /> }],
      ["/3ed9aa4e-921b-489f-b8fe-531dd703c60c"]
    );

    MockApi.deployer(
      CONFIG_GET_DETAIL_REQUETE,
      { path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" }, query: { isConsultationHistoriqueAction: true } },
      {
        data: { ...requeteCreationTranscription }
      }
    ).deployer(
      CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR,
      { path: { idActe: "3ed99ec3-a80f-480d-b91f-b4068f0b3bfj" } },
      { data: imagePngVideBase64 }
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
      expect(mockApi.history.get.length).toBe(2);
    });

    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });
});
