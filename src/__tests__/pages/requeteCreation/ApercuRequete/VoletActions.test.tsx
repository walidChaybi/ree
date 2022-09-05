import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import {
  requeteCreation,
  requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus,
  requeteCreationAvecMessagesRetourSDANFSansLesDroits
} from "../../../../mock/data/requeteCreation";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { VoletPieceJustificativesEtActions } from "../../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/components/VoletPieceJusticativesEtActions";
import { mappingRequeteCreation } from "../../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "../../../../views/router/ReceUrls";
const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

describe("Volet Actions", () => {
  test("L'encart retour SDANF est present dans la page", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "a4cefb71-8457-4f6b-937e-34b49335d404"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(requeteCreation)}
              />
            </Route>
          </Router>
        </>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Retour SDANF")).toBeDefined();
    });
  });

  test("Doit afficher la liste des messages avec le bon nombre de messages", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "a4cefb71-8457-4f6b-937e-34b49335d404"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFSansLesDroits
                )}
              />
            </Route>
          </Router>
        </>
      );
    });

    await waitFor(() => {
      expect(document.querySelectorAll("li.container").length).toEqual(2);

      expect(
        screen.getByText(
          "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann"
        )
      ).toBeDefined();
    });
  });

  test("Doit desactiver les boutons quand la requete n'est pas en statut PRISE_EN_CHARGE", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "3ed97a35-c9b0-4ae4-b2dc-75eb84e4085c"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus
                )}
              />
            </Route>
          </Router>
        </>
      );
    });

    await waitFor(() => {
      const button = screen.getByText("Acte irrecevable").closest("button");
      expect(button).toBeDisabled();
    });
  });

  test("Doit desactiver les boutons quand l'idRequeteCorbeilleAgent de la requete n'est pas la meme que l'agent", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      storeRece.utilisateurCourant = userDroitnonCOMEDEC;

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "3ed9aa4e-921b-489f-b8fe-531dd703c68f"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut
                )}
              />
            </Route>
          </Router>
        </>
      );
    });

    await waitFor(() => {
      const button = screen.getByText("Acte irrecevable").closest("button");
      expect(button).toBeDisabled();
    });
  });

  test("Doit pas desactiver les boutons quand l'idRequeteCorbeilleAgent de la requete et status est bon", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      storeRece.utilisateurCourant = userDroitnonCOMEDEC;
      storeRece.utilisateurCourant.idUtilisateur =
        "90c6aee1-21be-4ba6-9e55-fc8831252646";

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "3ed9aa4e-921b-429f-b8fe-531dd103c68f"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut
                )}
              />
            </Route>
          </Router>
        </>
      );
    });

    const button = screen.getByText("Acte irrecevable").closest("button");
    expect(button?.getAttribute("disabled")).toBe(null);
  });

  test("Doit ouvrir la popin au click sur une action", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      const setState = jest.fn();
      const useStateSpy: any = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init: boolean) => [init, setState]);

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "3ed9aa4e-921b-489f-b8fe-531dd703c68f"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut
                )}
              />
            </Route>
          </Router>
        </>
      );

      const bouton = screen
        .getByText("Acte irrecevable")
        .closest("button") as HTMLElement;

      fireEvent.click(bouton);

      await waitFor(() => {
        expect(setState).toHaveBeenCalledWith(true);
      });
    });
  });

  test("Doit mettre à jour le titre de la popin au click sur une action", async () => {
    await act(async () => {
      const history = createMemoryHistory();

      const setState = jest.fn();
      const useStateSpy: any = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init: string) => [init, setState]);

      history.push(
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
          "3ed9aa4e-921b-489f-b8fe-531dd703c68f"
        )
      );

      render(
        <>
          <Router history={history}>
            <Route
              exact={true}
              path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}
            >
              <VoletPieceJustificativesEtActions
                requete={mappingRequeteCreation(
                  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut
                )}
              />
            </Route>
          </Router>
        </>
      );

      const boutonElement = screen
        .getByText("Element manquant")
        .closest("button") as HTMLElement;

      fireEvent.click(boutonElement);

      await waitFor(() => {
        expect(setState).toHaveBeenCalledWith("Element manquant");
      });

      const boutonSuspicion = screen
        .getByText("Suspicion de fraude / nouvel élément")
        .closest("button") as HTMLElement;

      fireEvent.click(boutonSuspicion);

      await waitFor(() => {
        expect(setState).toHaveBeenCalledWith(
          "Suspicion de fraude / nouvel élément"
        );
      });
    });
  });

  // test("Doit fermer la popin au click sur Annuler", async () => {
  //   const setState = jest.fn();
  //   const useStateSpy: any = jest.spyOn(React, "useState");
  //   useStateSpy.mockImplementation((init: boolean) => [init, setState]);

  //   const boutonElement = screen
  //     .getByText("Element manquant")
  //     .closest("button") as HTMLElement;

  //   fireEvent.click(boutonElement);

  // });
});

afterAll(() => {
  superagentMock.unset();
});
