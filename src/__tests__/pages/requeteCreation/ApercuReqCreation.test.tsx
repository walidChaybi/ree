import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLeBiannic,
  resultatRequeteUtilistateurLeBiannic
} from "../../../mock/data/connectedUserAvecDroit";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { mapHabilitationsUtilisateur } from "../../../model/agent/IUtilisateur";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import { mappingOfficier } from "../../../views/core/login/LoginHook";
import ApercuReqCreationPage from "../../../views/pages/requeteCreation/EspaceCreation/apercuReqCreation/ApercuReqCreationPage";
import { URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLeBiannic,
    resultatRequeteUtilistateurLeBiannic.data
  );
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLeBiannic.data.habilitations
  );
});

let history: MemoryHistory;
beforeEach(() => {
  history = createMemoryHistory();
});

test("renders VoletPiecesJustificatives", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}>
          <ApercuReqCreationPage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("AN parent 1")[0]).toBeDefined();
    expect(screen.getAllByText("Pièce d'identité postulant")[0]).toBeDefined();
    expect(screen.getAllByText("Divorce libelle pourri 10")[0]).toBeDefined();
    expect(screen.getAllByText("fichierPJ")[2]).toBeDefined();
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}>
          <ApercuReqCreationPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[1] as HTMLButtonElement;
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "nouveauLibelle"
      }
    });
  });

  act(() => {
    inputModificationLibelle.blur();
  });

  await waitFor(() => {
    expect(screen.getByText("nouveauLibelle")).toBeDefined();
  });
});

test("Modifier le titre d'un fichier et revenir en arrière", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}>
          <ApercuReqCreationPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[1] as HTMLButtonElement;
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-nouveauLibelle"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "test libelle"
      }
    });
    fireEvent.keyDown(inputModificationLibelle, {
      key: "Enter",
      code: "Enter",
      charCode: 13
    });
  });

  await waitFor(() => {
    expect(screen.getByText("test libelle")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getByTitle("Annuler la modification du libellé"));
  });

  await waitFor(() => {
    expect(screen.getByText("Titre de séjour postulant")).toBeDefined();
  });
});

test("Modifier le titre puis annuler", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID}>
          <ApercuReqCreationPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[1] as HTMLButtonElement;
    expect(boutonModifierLibelle).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonModifierLibelle);
  });

  const inputModificationLibelle = screen.getByLabelText(
    "input-creation-fichierPJ"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputModificationLibelle, {
      target: {
        value: "test libelle"
      }
    });
    fireEvent.keyDown(inputModificationLibelle, {
      key: "Escape",
      code: "Escape",
      charCode: 27
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Titre de séjour postulant")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
