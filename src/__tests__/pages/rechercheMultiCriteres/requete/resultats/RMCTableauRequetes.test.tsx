import { act, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { userDroitConsulterPerimetreMEAE } from "../../../../../mock/data/connectedUserAvecDroit";
import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "../../../../../mock/data/RMCRequete";
import { storeRece } from "../../../../../views/common/util/storeRece";
import { RMCTableauRequetes } from "../../../../../views/pages/rechercheMultiCriteres/requete/resultats/RMCTableauRequetes";
import { URL_RECHERCHE_REQUETE } from "../../../../../views/router/ReceUrls";

const history = createMemoryHistory();
history.push(URL_RECHERCHE_REQUETE);
test("renders Resultat Requetes Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const numero1 = getAllByText("1234");
  expect(numero1).toHaveLength(1);
  const numero2 = getAllByText("2090860");
  expect(numero2).toHaveLength(1);
  const numero3 = getAllByText("9876");
  expect(numero3).toHaveLength(1);
  const numero4 = getAllByText("9012");
  expect(numero4).toHaveLength(1);
});

test("Clic sur une Requête du tableau avec un idUtilisateur", async () => {
  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d0");

  act(() => {
    fireEvent.click(ligne);
  });
});

test("Clic sur une Requête du tableau sans un idUtilisateur", async () => {
  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf8");

  act(() => {
    fireEvent.click(ligne);
  });
});

test("renders Resultat Requetes Recherche Multi Critères => Sans résultat", () => {
  const { getByText } = render(
    <Router history={history}>
      <RMCTableauRequetes dataRMCRequete={[]} dataTableauRMCRequete={{}} />
    </Router>
  );

  expect(getByText(/Aucune requête n'a été trouvée/i)).toBeDefined();
});

test("Clic sur une Requête Délivrance au statut 'Prise en charge'", async () => {
  userDroitConsulterPerimetreMEAE.idUtilisateur =
    "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d1");

  act(() => {
    fireEvent.click(ligne);
  });
});

test("Clic sur une Requête avec des titulaire", async () => {
  userDroitConsulterPerimetreMEAE.idUtilisateur =
    "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf9");

  act(() => {
    fireEvent.click(ligne);
  });
});
