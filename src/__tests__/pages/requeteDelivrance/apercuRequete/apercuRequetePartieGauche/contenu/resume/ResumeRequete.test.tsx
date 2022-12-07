import { mappingOfficier } from "@core/login/LoginHook";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { ResumeRequete } from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequete";
import { mappingRequeteDelivrance } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getLastPathElem, getUrlWithParam } from "@util/route/routeUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau
} from "../../../../../../../mock/data/connectedUserAvecDroit";
import { ReponseAppelDetailRequeteCreation } from "../../../../../../../mock/data/DetailRequeteCreation";
import {
  ReponseAppelDetailRequeteDelivrance,
  ReponseAppelDetailRequeteDelivranceRDC,
  ReponseAppelDetailRequeteDelivranceSansTitulairesAvecPJ,
  ReponseAppelDetailRequeteDelivranceUnTitulaire
} from "../../../../../../../mock/data/DetailRequeteDelivrance";
import { idRequeteRDCPourModification } from "../../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();

beforeAll(() => {
  TypePieceJustificative.init();
});

test("renders Page requete with all elements", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteDelivrance.data
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Délivrance Extrait/Copie dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Campball")).toBeDefined();
    expect(screen.getByText("Ambrosia Antoinette, Zoé, Thérèse")).toBeDefined();
    expect(screen.getByText("Acte")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Tunis (Tunisie)")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete with 1 titulaire", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteDelivranceUnTitulaire.data
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Délivrance Extrait/Copie dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Campball Gilles, Marc")).toBeDefined();
    expect(screen.getByText("Acte")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Tunis")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Cabinet WandC")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete with 2 titutaires", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteDelivrance.data
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Délivrance Extrait/Copie dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Campball")).toBeDefined();
    expect(screen.getByText("Ambrosia Antoinette, Zoé, Thérèse")).toBeDefined();
    expect(screen.getByText("Acte")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Tunis (Tunisie)")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("CHOULARD Thierry")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
  });
});

test("renders Page requete without titulaire", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteDelivranceSansTitulairesAvecPJ.data
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Délivrance Extrait/Copie dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Il n'y a pas de titulaire")).toBeDefined();
    expect(screen.getByText("Acte")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Tunisie")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Titulaire")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete type creation", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                ReponseAppelDetailRequeteCreation.data
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete with mandataire habilité without raison sociale", async () => {
  const reponseAppelDetailRequeteDelivranceUnTitulaireRequerantMandataireHabiliteSansRaisonSociale =
    ReponseAppelDetailRequeteDelivranceUnTitulaire.data;

  reponseAppelDetailRequeteDelivranceUnTitulaireRequerantMandataireHabiliteSansRaisonSociale.requerant.detailQualiteMandataireHabilite =
    {
      id: "94cb55b0-7cb1-4d65-9aae-e6c972e29ed9",
      type: "AVOCAT",
      nature: "",
      crpcen: ""
    } as any;

  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
          >
            <ResumeRequete
              requete={await mappingRequeteDelivrance(
                reponseAppelDetailRequeteDelivranceUnTitulaireRequerantMandataireHabiliteSansRaisonSociale
              )}
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Description requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Délivrance Extrait/Copie dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Campball Gilles, Marc")).toBeDefined();
    expect(screen.getByText("Acte")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Tunis")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("JACQUES Charles")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete avec droit de modification de la requête", async () => {
  const dataRDC = ReponseAppelDetailRequeteDelivranceRDC.data;
  const dataLaurence = resultatRequeteUtilistateurLaurenceBourdeau.data;
  const reponseAppelDetailRequeteDelivranceAvecDroitModification = {
    ...dataRDC,
    id: idRequeteRDCPourModification,
    idUtilisateur: dataLaurence.idUtilisateur,
    corbeilleAgent: {
      ...dataRDC.corbeilleAgent,
      idUtilisateur: dataLaurence.idUtilisateur
    }
  };

  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
      idRequeteRDCPourModification
    )
  );
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    dataLaurence
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID}
        >
          <ResumeRequete
            requete={mappingRequeteDelivrance(
              reponseAppelDetailRequeteDelivranceAvecDroitModification
            )}
          />
        </Route>
      </Router>
    );
  });

  const buttonModifierRequete = screen.getByText(
    /Modifier la requête/i
  ) as HTMLButtonElement;

  act(() => {
    fireEvent.click(buttonModifierRequete);
  });
  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      idRequeteRDCPourModification
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
