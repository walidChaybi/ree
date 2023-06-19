import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "@mock/data/RMCRequete";
import { userDroitConsulterPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { RMCTableauRequetes } from "@pages/rechercheMultiCriteres/requete/resultats/RMCTableauRequetes";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getLastPathElem } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const history = createMemoryHistory();
history.push(URL_RECHERCHE_REQUETE);
test("renders Resultat Requetes Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
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
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d0");

  act(() => {
    fireEvent.click(ligne);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "8ef11b8b-652c-4c6a-ad27-a544fce635d0"
    );
  });
});

test("Clic sur une Requête du tableau sans un idUtilisateur", async () => {
  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf8");

  act(() => {
    fireEvent.click(ligne);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      "/rece/rece-ui/rechercherequete/apercurequeteinformation/4578e56c-421c-4e6a-b587-a238a665daf8"
    );
  });
});

test("renders Resultat Requetes Recherche Multi Critères => Sans résultat", () => {
  const { getByText } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={[]}
        dataTableauRMCRequete={{}}
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
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
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d1");

  act(() => {
    fireEvent.click(ligne);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      "/rece/rece-ui/rechercherequete/apercurequetepriseencharge/8ef11b8b-652c-4c6a-ad27-a544fce635d1"
    );
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "8ef11b8b-652c-4c6a-ad27-a544fce635d1"
    );
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
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const ligne = getByTestId("4578e56c-421c-4e6a-b587-a238a665daf9");

  act(() => {
    fireEvent.click(ligne);
  });

  await waitFor(() => {
    expect(history.location.pathname).toEqual(
      "/rece/rece-ui/rechercherequete/apercurequetepriseencharge/4578e56c-421c-4e6a-b587-a238a665daf9"
    );
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "4578e56c-421c-4e6a-b587-a238a665daf9"
    );
  });
});

test("Changement de page", async () => {
  userDroitConsulterPerimetreMEAE.idUtilisateur =
    "d49e7b2d-7cec-4f6a-854c-3cbd6148dc7a";

  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;

  const { getByTestId } = render(
    <Router history={history}>
      <RMCTableauRequetes
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const pageSuivante = screen.getByTitle("Page suivante");

  act(() => {
    fireEvent.click(pageSuivante);
  });

  expect(getByTestId("54ddf213-d9b7-4747-8e92-68c220f66de3")).toBeDefined();
});
