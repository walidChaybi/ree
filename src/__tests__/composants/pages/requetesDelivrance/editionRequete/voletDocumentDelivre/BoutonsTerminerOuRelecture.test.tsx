import { CONFIG_GET_RESUME_ACTE } from "@api/configurations/etatCivil/acte/GetResumeActeConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { ficheActeTexte } from "@mock/data/ficheActe";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import BoutonsTerminerOuRelecture from "../../../../../../composants/pages/requetesDelivrance/editionRequete/boutons/BoutonsTerminerOuRelecture";
import EditionDelivranceContextProvider from "../../../../../../contexts/EditionDelivranceContextProvider";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("BoutonTerminerOuRelecture - ", () => {
  MockApi.deployer(
    CONFIG_GET_RESUME_ACTE,
    { path: { idActe: ficheActeTexte.id }, query: { remplaceIdentiteTitulaireParIdentiteTitulaireAM: true } },
    { data: ficheActeTexte }
  );
  test("Doit afficher les boutons d'action pour traiter la requête", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/test",
          element: (
            <EditionDelivranceContextProvider
              idActeParam={ficheActeTexte.id}
              idRequeteParam={"3f52370d-14ed-4c55-8cf4-afe006d9aa38"}
            >
              <BoutonsTerminerOuRelecture />
            </EditionDelivranceContextProvider>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      ["/test"]
    );

    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Autres actions")).toBeDefined();
    });
  });

  test("Doit afficher les boutons d'action du valideur", async () => {
    const router = createTestingRouter(
      [
        {
          path: "/test",
          element: (
            <EditionDelivranceContextProvider
              idActeParam={ficheActeTexte.id}
              idRequeteParam={"3f52370d-14ed-4c55-8cf4-afe006d9aa39"}
            >
              <BoutonsTerminerOuRelecture />
            </EditionDelivranceContextProvider>
          )
        },
        {
          path: "*",
          element: <></>
        }
      ],
      ["/test"]
    );

    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.DELIVRER).generer()}>
        <RouterProvider router={router} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Reprendre le traitement")).toBeDefined();
      expect(screen.getByText("Relecture")).toBeDefined();
    });
  });
});
