import CONFIG_GET_MES_REQUETES_INFORMATION from "@api/configurations/requete/information/GetMesRequetesInformationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { requetesInformationTableauDto } from "@mock/data/requete/information/RequeteInformationTableau";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import { TableauMesRequetesInformation } from "../../../../../composants/pages/requetesInformation/mesRequetes/TableauMesRequetesInformation";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Test TableauMesRequetesInformation", () => {
  test("Doit récupérer les lignes du tableau et les afficher", async () => {
    MockApi.deployer(CONFIG_GET_MES_REQUETES_INFORMATION, { regexp: true }, { data: requetesInformationTableauDto });

    const routeur = createTestingRouter(
      [
        {
          path: "/",
          element: <TableauMesRequetesInformation />
        }
      ],
      ["/"]
    );

    const { container } = render(
      <MockRECEContextProvider>
        <RouterProvider router={routeur} />
      </MockRECEContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Cena")).toBeDefined();
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
