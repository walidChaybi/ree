import { OfficierContext } from "@core/contexts/OfficierContext";
import officier from "@mock/data/connectedUser.json";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders delivrancePage", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: (
            <OfficierContext.Provider
              value={{
                officierDataState: { idSSO: officier.id_sso, ...officier }
              }}
            >
              <EspaceDelivrancePage selectedTab={0} />
            </OfficierContext.Provider>
          )
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(<RouterProvider router={router} />);
  });

  const title = "Délivrance";
  const mesRequetes = screen.getByText(/Mes requêtes de délivrance/i);
  const compteur = screen.getByText(/Total de requêtes à signer/i);
  const requetesService = screen.getByText(
    /Les requêtes de délivrance de mon service/i
  );

  await waitFor(() => {
    expect(document.title).toBe(title);
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(compteur).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  setTimeout(() => {
    act(() => {
      const attribueA = screen.getByText(/Attribuée à/i);

      waitFor(() => {
        expect(document.title).toBe(title);
        expect(mesRequetes).toBeDefined();
        expect(requetesService).toBeDefined();
        expect(attribueA).toBeDefined();
      });
    });
  }, 0);
});
