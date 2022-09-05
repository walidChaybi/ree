import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../../../../mock/data/connectedUserAvecDroit";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import { TypeMention } from "../../../../../../model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "../../../../../../model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "../../../../../../model/requete/enum/DocumentDelivrance";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import { EditionExtraitCopiePage } from "../../../../../../views/pages/requeteDelivrance/editionExtraitCopie/EditionExtraitCopiePage";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
} from "../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configComposition[0],
]);

let history: MemoryHistory;
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

beforeEach(async () => {
  DocumentDelivrance.init();
  NatureMention.init();
  TypeMention.init();
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
});

test("Doit rendre le bouton + pour ajouter un document complémentaire quand un seul documentResponse est présent dans la requête", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("+")).toBeDefined();
  });
});

test("Doit rendre le bouton x pour retirer un document complémentaire quand plusieurs documentResponse sont présent dans la requête", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f0f`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("x")).toBeDefined();
  });
});

test("Ne doit pas permettre l'ajout d'un même document complémentaire dans une requête", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("+")).toBeDefined();
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Extrait plurilingue"));
    expect(screen.getByText("Extrait copie avec filiation"));
    expect(screen.getByText("Extrait copie sans filiation"));
  });
});

test("Doit ajouter le document selectionné au click sur le menu", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b272-b9de4g683aaf/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    let boutonAjouterDocument: HTMLElement;
    expect(screen.getByText("+")).toBeDefined();
    fireEvent.click(screen.getByText("+"));
    boutonAjouterDocument = screen.getByText("Extrait copie avec filiation");
    expect(boutonAjouterDocument).toBeDefined();
    fireEvent.click(boutonAjouterDocument);
  });

  await waitFor(() => {
    expect(screen.getByText("Extrait avec filiation")).toBeDefined();
  });
});

test("Doit afficher un message d'erreur quand le nombre de titulaire est > 1 dans un acte de naissance/décès pour une demande plurilingue", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b271-b9de48283a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    let boutonAjouterDocument: HTMLElement;
    expect(screen.getByText("+")).toBeDefined();
    fireEvent.click(screen.getByText("+"));
    boutonAjouterDocument = screen.getByText("Extrait plurilingue");
    expect(boutonAjouterDocument).toBeDefined();
    fireEvent.click(boutonAjouterDocument);
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples."
      )
    ).toBeDefined();
  });
});

test("Doit afficher une erreur si le titulaire est de genre indetermine quand le choix est extrait pluri", async () => {
  history.push(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b272-b9de48683a8f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
  );

  await act(async () => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
          <EditionExtraitCopiePage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    let boutonAjouterDocument: HTMLElement;
    expect(screen.getByText("+")).toBeDefined();
    fireEvent.click(screen.getByText("+"));
    boutonAjouterDocument = screen.getByText("Extrait plurilingue");
    expect(boutonAjouterDocument).toBeDefined();
    fireEvent.click(boutonAjouterDocument);
  });

  await waitFor(() => {
    // expect(screen.getByText("Extrait avec filiation")).not.toBeDefined();
    expect(
      screen.getByText(
        "Pas de délivrance d'extrait plurilingue de naissance avec une personne de genre indéterminé ou des parents de même sexe."
      )
    ).toBeDefined();
  });
});

// test("Doit afficher un message d'erreur quand le nombre de titulaire est > 2 dans un acte de mariage plurilinque/EC avec ou sans filiation", async () => {
//   history.push(
//     `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4038-b271-b9de48283a1f/19c0d767-64e5-4376-aa1f-6d781a2a235a`
//   );

//   await act(async () => {
//     render(
//       <Router history={history}>
//         <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_EDITION_ID}>
//           <EditionExtraitCopiePage />
//         </Route>
//       </Router>
//     );
//   });

//   await waitFor(() => {
//     let boutonAjouterDocument: HTMLElement;
//     expect(screen.getByText("+")).toBeDefined();
//     fireEvent.click(screen.getByText("+"));
//     boutonAjouterDocument = screen.getByText("Extrait plurilingue");
//     expect(boutonAjouterDocument).toBeDefined();
//     fireEvent.click(boutonAjouterDocument);
//   });

//   await waitFor(() => {
//     expect(
//       screen.getByText(
//         "Pas de délivrance d'extrait sur la base d'un acte à titulaires multiples."
//       )
//     ).toBeDefined();
//   });
// });
