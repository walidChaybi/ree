import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import {
  requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut,
  requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus,
  requeteCreationAvecMessagesRetourSDANFAvecMessages,
  requeteCreationAvecMessagesRetourSDANFSansLesDroits,
  requeteCreationEtablissement
} from "@mock/data/requeteCreation";
import { OngletsApercuCreationEtablissementPriseEnCharge } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/contenu/OngletsApercuCreationEtablissementPriseEnCharge";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("L'encart retour SDANF est present dans la page", async () => {
  act(() => {
    const history = createMemoryHistory();

    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(requeteCreationEtablissement)}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  await waitFor(() => {
    expect(screen.getByText("Retour SDANF")).toBeDefined();
  });
});

test("Doit afficher le message avec le bon format titre - message - prenomNom", async () => {
  act(() => {
    const history = createMemoryHistory();

    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-429f-b8fe-531dd103c68s"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecMessages
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

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
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFSansLesDroits
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

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
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed97a35-c9b0-4ae4-b2dc-75eb84e4085c"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecMauvaisStatus
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const button = screen.getByText("Acte irrecevable").closest("button");
  await waitFor(() => {
    expect(button).toBeDisabled();
  });
});

test("Doit desactiver les boutons quand l'idRequeteCorbeilleAgent de la requete n'est pas la meme que l'agent", async () => {
  act(() => {
    const history = createMemoryHistory();

    storeRece.utilisateurCourant = userDroitnonCOMEDEC;

    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c68f"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecMauvaisIdCorbeilleMaisBonStatut
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const button = screen.getByText("Acte irrecevable").closest("button");
  await waitFor(() => {
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
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      "3ed9aa4e-921b-429f-b8fe-531dd103c68f"
    )
  );
  act(() => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

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
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-429f-b8fe-531dd103c68f"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const boutonActeIrrecevable = screen
    .getByText("Acte irrecevable")
    .closest("button");
  const boutonElementManquant = screen
    .getByText("Acte irrecevable")
    .closest("button");
  const boutonSuspicionFraudeNouvelElement = screen
    .getByText("Acte irrecevable")
    .closest("button");

  await waitFor(() => {
    expect(boutonActeIrrecevable).toBeDefined();
    expect(boutonElementManquant).toBeDefined();
    expect(boutonSuspicionFraudeNouvelElement).toBeDefined();
  });
});

test("Doit ouvrir la popin au click sur une action", async () => {
  const history = createMemoryHistory();

  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  storeRece.utilisateurCourant.idUtilisateur =
    "90c6aee1-21be-4ba6-9e55-fc8831252646";

  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      "3ed9aa4e-921b-429f-b8fe-531dd103c68f"
    )
  );

  render(
    <>
      <Router history={history}>
        <Route
          exact={true}
          path={
            URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
          }
        >
          <OngletsApercuCreationEtablissementPriseEnCharge
            requete={mappingRequeteCreation(
              requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut
            )}
            onRenommePieceJustificative={(
              idPieceJustificative: string,
              nouveauLibelle: string,
              idDocumentPJ?: string | undefined
            ) => {}}
            resultatRMCPersonne={[]}
            tableauRMCPersonneEnChargement={false}
            setDataActesInscriptionsSelectionnes={() => {}}
            setRmcAutoPersonneParams={() => {}}
          />
        </Route>
      </Router>
    </>
  );

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const bouton = screen
    .getByText("Acte irrecevable")
    .closest("button") as HTMLElement;
  await waitFor(() => {
    expect(bouton).toBeDefined();
  });

  fireEvent.click(bouton);
  await waitFor(() => {
    expect(bouton.getAttribute("disabled")).toBe(null);
  });
});

test("Doit afficher un message d'erreur quand la taille maximale est dépassée", async () => {
  const history = createMemoryHistory();

  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  storeRece.utilisateurCourant.idUtilisateur =
    "90c6aee1-21be-4ba6-9e55-fc8831252646";

  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
      "3ed9aa4e-921b-429f-b8fe-531dd103c68f"
    )
  );

  act(() => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <OngletsApercuCreationEtablissementPriseEnCharge
              requete={mappingRequeteCreation(
                requeteCreationAvecMessagesRetourSDANFAvecBonIdCorbeilleEtBonStatut
              )}
              onRenommePieceJustificative={(
                idPieceJustificative: string,
                nouveauLibelle: string,
                idDocumentPJ?: string | undefined
              ) => {}}
              resultatRMCPersonne={[]}
              tableauRMCPersonneEnChargement={false}
              setDataActesInscriptionsSelectionnes={() => {}}
              setRmcAutoPersonneParams={() => {}}
            />
          </Route>
        </Router>
      </>
    );
  });

  const boutonVoletSuiviDossier = screen.getByText("Suivi dossier");
  await waitFor(() => {
    expect(boutonVoletSuiviDossier).toBeDefined();
  });
  fireEvent.click(boutonVoletSuiviDossier);

  const boutonActeIrrecevable = screen
    .getByText("Acte irrecevable")
    .closest("button") as HTMLElement;
  await waitFor(() => {
    expect(boutonActeIrrecevable).toBeDefined();
  });
  fireEvent.click(boutonActeIrrecevable);

  const popin = screen.queryByTestId("popinConfirmationEtMessage");
  await waitFor(() => {
    expect(popin).toBeDefined();
  });

  const message =
    "Lorem Ipsum is simply dummy text of the pridddddnting and typesddetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was populardddd";

  const textArea = screen.getByPlaceholderText("Saisir un message");
  fireEvent.change(textArea, {
    target: { value: message }
  });

  const messageAvertissement = screen.queryByText("500 caractères maximum");
  await waitFor(() => {
    expect(messageAvertissement).toBeInTheDocument();
  });

  fireEvent.change(textArea, {
    target: { value: "ddd" }
  });
  await waitFor(() => {
    expect(messageAvertissement).not.toBeInTheDocument();
  });
});
