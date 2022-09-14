import { VoletPieceJustificativesEtActions } from "@pages/requeteCreation/EspaceCreation/apercuReqCreation/components/VoletPieceJusticativesEtActions";
import { mappingRequeteCreation } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/routeUtil";
import { storeRece } from "@util/storeRece";
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
  requeteCreationAvecMessagesRetourSDANFAvecMessages,
  requeteCreationAvecMessagesRetourSDANFSansLesDroits
} from "../../../../mock/data/requeteCreation";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("L'encart retour SDANF est present dans la page", async () => {
  act(() => {
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
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    expect(screen.getByText("Retour SDANF")).toBeDefined();
  });
});

test("Doit afficher le message avec le bon format titre - message - prenomNom", async () => {
  act(() => {
    const history = createMemoryHistory();

    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
        "3ed9aa4e-921b-429f-b8fe-531dd103c68s"
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
                requeteCreationAvecMessagesRetourSDANFAvecMessages
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "Acte irrecevable - Bonjour je ne peux recevoir votre demande - Johann Le Biannic"
      )
    ).toBeDefined();
  });
});

test("Doit afficher la liste des messages avec le bon nombre de messages", async () => {
  act(() => {
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
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
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
  act(() => {
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
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    const button = screen.getByText("Acte irrecevable").closest("button");
    expect(button).toBeDisabled();
  });
});

test("Doit desactiver les boutons quand l'idRequeteCorbeilleAgent de la requete n'est pas la meme que l'agent", async () => {
  act(() => {
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
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    const button = screen.getByText("Acte irrecevable").closest("button");
    expect(button).toBeDisabled();
  });
});

test("Doit pas desactiver les boutons quand l'idRequeteCorbeilleAgent de la requete et status est bon", async () => {
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
  act(() => {
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

  await waitFor(() => {
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  const button = screen.getByText("Acte irrecevable").closest("button");

  await waitFor(() => {
    expect(button?.getAttribute("disabled")).toBe(null);
  });
});

test("Doit ouvrir et changer le titre de la popin au click sur une action", async () => {
  act(() => {
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

  const setState = jest.fn();
  const useStateSpy: any = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init: string) => [init, setState]);

  await waitFor(() => {
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    const boutonAction = screen
      .getByText("Acte irrecevable")
      .closest("button") as HTMLElement;
    fireEvent.click(boutonAction);
  });

  await waitFor(() => {
    expect(setState).toHaveBeenCalledWith("Acte irrecevable");
  });

  await waitFor(() => {
    const boutonAction = screen
      .getByText("Élément manquant")
      .closest("button") as HTMLElement;
    fireEvent.click(boutonAction);
  });

  await waitFor(() => {
    expect(setState).toHaveBeenCalledWith("Élément manquant");
  });

  await waitFor(() => {
    const boutonAction = screen
      .getByText("Suspicion de fraude / nouvel élément")
      .closest("button") as HTMLElement;
    fireEvent.click(boutonAction);
  });

  await waitFor(() => {
    expect(setState).toHaveBeenCalledWith(
      "Suspicion de fraude / nouvel élément"
    );
  });

  useStateSpy.mockRestore();
});

test("Doit ouvrir la popin au click sur une action", async () => {
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

  act(() => {
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

  const setState = jest.fn();
  const useStateSpy: any = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init: string) => [init, setState]);

  await waitFor(() => {
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    const bouton = screen
      .getByText("Acte irrecevable")
      .closest("button") as HTMLElement;
    fireEvent.click(bouton);
    expect(bouton?.getAttribute("disabled")).toBe(null);
  });

  await waitFor(() => {
    expect(setState).toHaveBeenCalledWith(true);
  });

  useStateSpy.mockRestore();
});

test("Doit afficher un message d'erreur quand la taille maximale est dépassée", async () => {
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

  act(() => {
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

  await waitFor(() => {
    const boutonVoletAction = screen.getByText("Actions");
    fireEvent.click(boutonVoletAction);
  });

  await waitFor(() => {
    const boutonAction = screen
      .getByText("Acte irrecevable")
      .closest("button") as HTMLElement;
    fireEvent.click(boutonAction);
  });

  await waitFor(() => {
    const popin = screen.queryByTestId("popinConfirmationEtMessage");
    expect(popin).toBeDefined();
  });

  const message =
    "Lorem Ipsum is simply dummy text of the pridddddnting and typesddetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was populardddd";

  await waitFor(() => {
    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: message }
    });
  });

  await waitFor(() => {
    expect("500 caractères maximum").toBeDefined();
  });

  await waitFor(() => {
    const textArea = screen.getByPlaceholderText("Saisir un message");
    fireEvent.change(textArea, {
      target: { value: "ddd" }
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
