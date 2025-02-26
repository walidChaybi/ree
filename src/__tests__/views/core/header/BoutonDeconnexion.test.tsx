import { IRECEContext, RECEContextData } from "@core/contexts/RECEContext";
import { BoutonDeconnexion } from "@core/header/BoutonDeconnexion";
import { IHabilitation } from "@model/agent/Habilitation";
import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { URL_DECONNEXION, URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../__tests__utils__/testsUtil";
import officier from "../../../mock/data/connectedUser.json";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";

let handleClickButton = vi.fn();
let boutonElement: HTMLElement;

// beforeEach(async () => {
//   handleClickButton = vi.fn();
// });

test.skip("renders click BoutonDeconnexion (nbRequetes = 0)", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(
      elementAvecContexte(<RouterProvider router={router} />, {
        idSSO: officier.id_sso,
        ...officier,
        modeAuthentification: "AROBAS_MDP",
        habilitations: officier.habilitations as unknown as IHabilitation[],
        service: officier.service as unknown as IService
      })
    );

    boutonElement = screen.getByText(/prenomConnectedUser nomConnectedUser/i);
    await waitFor(() => {
      expect(boutonElement).toBeDefined();
    });

    configRequetes[0].nbRequetes = 0;
    fireEvent.click(boutonElement);
    await waitFor(() => {
      expect(handleClickButton).toHaveBeenCalledTimes(1);
    });
    const linkElement = screen.getByText(/Déconnexion/i);
    await act(async () => {
      fireEvent.click(linkElement);
    });

    await waitFor(() => {
      expect(linkElement).toBeDefined();
      expect(router.state.location.pathname).toBe(URL_DECONNEXION);
    });
  });
});

test.skip("renders click BoutonDeconnexion (nbRequetes = 1) produit une popin de confirmation et lorsque 'Oui' est cliqué la déconnexion est effective", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(
      elementAvecContexte(<RouterProvider router={router} />, {
        idSSO: officier.id_sso,
        ...officier
      } as unknown as IOfficier)
    );
    boutonElement = screen.getByText(/prenomConnectedUser nomConnectedUser/i);
    await waitFor(() => {
      expect(boutonElement).toBeDefined();
    });

    configRequetes[0].nbRequetes = 1;
    fireEvent.click(boutonElement);

    await waitFor(() => {
      expect(handleClickButton).toHaveBeenCalledTimes(1);
    });

    const linkElement = screen.getByText(/Déconnexion/i);
    await act(async () => {
      fireEvent.click(linkElement);
    });
    await waitFor(() => {
      expect(linkElement).toBeDefined();
    });
    const okElement = screen.getByText(/Oui/);
    await waitFor(() => {
      expect(okElement).toBeDefined();
    });
    await act(async () => {
      fireEvent.click(okElement);
    });
    await waitFor(() => {
      expect(okElement).not.toBeDefined();
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toBe(URL_DECONNEXION);
    });
  });
});

test.skip("renders click BoutonDeconnexion (nbRequetes = 1) produit une popin de confirmation et lorsque 'Non' est cliqué la déconnexion n'est pas faite", async () => {
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: "/rece/Shibboleth.sso/Logout",
          element: <></>
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: (
            <RECEContextData.Provider
              value={
                {
                  officierDataState: { idSSO: officier.id_sso, ...officier }
                } as unknown as IRECEContext
              }
            >
              <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
            </RECEContextData.Provider>
          )
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(<RouterProvider router={router} />);

    setTimeout(() => {
      act(() => {
        configRequetes[0].nbRequetes = 1;
        boutonElement = screen.getByText(/prenomConnectedUser nomConnectedUser/i);
        waitFor(() => {
          expect(boutonElement).toBeDefined();
        });

        fireEvent.click(boutonElement);
        waitFor(() => {
          expect(handleClickButton).toHaveBeenCalledTimes(1);
        });
        const linkElement = screen.getByText(/Déconnexion/i);
        fireEvent.click(linkElement);
        waitFor(() => {
          expect(linkElement).toBeDefined();
        });
        const cancelElement = screen.getByDisplayValue(/Non/);
        waitFor(() => {
          expect(cancelElement).toBeDefined();
        });
        fireEvent.click(cancelElement);
        waitFor(() => {
          expect(cancelElement).not.toBeDefined();
        });
        waitFor(() => {
          expect(router.state.location.pathname).toBe(URL_MES_REQUETES_DELIVRANCE);
        });
      });
    }, 1000);
  });
});
