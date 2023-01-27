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
import { ApercuReqCreationEtablissementPage } from "../../../views/pages/requeteCreation/apercuRequete/etablissement/ApercuReqCreationEtablissementPage";
import { URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID } from "../../../views/router/ReceUrls";

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
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID}
        >
          <ApercuReqCreationEtablissementPage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("AN parent 1")[0]).toBeDefined();
    expect(screen.getAllByText("Pièce d'identité postulant")[0]).toBeDefined();
    expect(screen.getAllByText("Divorce union antérieure 1")[0]).toBeDefined();
    expect(screen.getAllByText("fichierPJ")[2]).toBeDefined();

    expect(screen.getAllByText("AN parent 1")).toHaveLength(2);
    expect(screen.getAllByText("Pièce d'identité postulant")).toHaveLength(2);
    expect(screen.getAllByText("Divorce union antérieure 1")).toHaveLength(2);
  });
});

test("Modifier le titre d'un fichier d'une pièce jointe", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID}
        >
          <ApercuReqCreationEtablissementPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[3] as HTMLButtonElement;
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
    expect(screen.getAllByText("nouveauLibelle")[0]).toBeDefined();
  });
});

test("Modifier le titre d'un fichier et revenir en arrière", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID}
        >
          <ApercuReqCreationEtablissementPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[3] as HTMLButtonElement;
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
    expect(screen.getAllByText("test libelle")[0]).toBeDefined();
  });

  act(() => {
    fireEvent.click(
      screen.getAllByTitle("Annuler la modification du libellé")[0]
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText("Titre de séjour postulant")[0]).toBeDefined();
  });
});

test("Modifier le titre puis annuler", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID}
        >
          <ApercuReqCreationEtablissementPage />
        </Route>
      </Router>
    );
  });

  let boutonModifierLibelle: any;

  await waitFor(() => {
    boutonModifierLibelle = screen.getAllByTitle(
      "Modifier le libellé"
    )[3] as HTMLButtonElement;
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
    expect(screen.getAllByText("Titre de séjour postulant")[0]).toBeDefined();
  });
});

test("Ouvrir deux pièces jointes côte à côte.", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID,
      "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
    )
  );
  act(() => {
    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_ID}
        >
          <ApercuReqCreationEtablissementPage />
        </Route>
      </Router>
    );
  });

  let accordionAlpha1: HTMLDivElement;
  let accordionAlpha2: HTMLDivElement;
  let accordionBeta1: HTMLDivElement;
  let accordionBeta2: HTMLDivElement;

  await waitFor(() => {
    const titreAccordions = screen.getAllByRole("button", { expanded: false });

    const accordionsAlpha = titreAccordions.filter(accordion =>
      accordion.textContent?.includes("carteIdentite")
    );
    const accordionsBeta = titreAccordions.filter(accordion =>
      accordion.textContent?.includes("titreSejour")
    );

    expect(accordionsAlpha).toHaveLength(2);
    expect(accordionsBeta).toHaveLength(2);

    accordionAlpha1 = accordionsAlpha[0] as HTMLDivElement;
    accordionAlpha2 = accordionsAlpha[1] as HTMLDivElement;
    accordionBeta1 = accordionsBeta[0] as HTMLDivElement;
    accordionBeta2 = accordionsBeta[1] as HTMLDivElement;

    expect(accordionAlpha1.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionAlpha2.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta1.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta2.classList.contains("Mui-expanded")).toBeFalsy();
  });

  act(() => {
    fireEvent.click(accordionAlpha1);
    fireEvent.click(accordionBeta1);
  });

  await waitFor(() => {
    expect(accordionAlpha1.classList.contains("Mui-expanded")).toBeTruthy();
    expect(accordionAlpha2.classList.contains("Mui-expanded")).toBeFalsy();
    expect(accordionBeta1.classList.contains("Mui-expanded")).toBeTruthy();
    expect(accordionBeta2.classList.contains("Mui-expanded")).toBeFalsy();
  });
});

afterAll(() => {
  superagentMock.unset();
});
