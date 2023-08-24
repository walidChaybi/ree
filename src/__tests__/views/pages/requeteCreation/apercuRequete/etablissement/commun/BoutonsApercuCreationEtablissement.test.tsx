import { requeteCreationEtablissement } from "@mock/data/requeteCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { BoutonsApercuCreationEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/commun/BoutonsApercuRequeteCreationEtablissement";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_RECHERCHE_REQUETE,
  URL_REQUETES_CREATION_SERVICE
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

test("DOIT rediriger vers Mes requêtes de création QUAND le bouton affiche Retour mes requêtes", async () => {
  const history = afficherEtCliquerSurBoutonRetour(
    URL_MES_REQUETES_CREATION,
    "Retour mes requêtes"
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_CREATION);
  });
});

test("DOIT rediriger vers Requêtes de création de mon service QUAND le bouton affiche Retour requêtes de service", async () => {
  const history = afficherEtCliquerSurBoutonRetour(
    URL_REQUETES_CREATION_SERVICE,
    "Retour requêtes de service"
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_REQUETES_CREATION_SERVICE);
  });
});

test("DOIT rediriger vers Rechercher une requête QUAND le bouton affiche Retour recherche requêtes", async () => {
  const history = afficherEtCliquerSurBoutonRetour(
    URL_RECHERCHE_REQUETE,
    "Retour recherche requêtes"
  );
  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_RECHERCHE_REQUETE);
  });
});

function afficherEtCliquerSurBoutonRetour(
  racineUrl: string,
  libelleBouton: string
) {
  const history = createMemoryHistory();
  history.push(`${racineUrl}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`);

  const requete = {
    ...requeteCreationEtablissement,
    statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
  };
  render(
    <Router history={history}>
      <BoutonsApercuCreationEtablissement requete={requete} />
    </Router>
  );

  const boutonRetour = screen.getByText(libelleBouton) as HTMLButtonElement;
  fireEvent.click(boutonRetour);

  return history;
}
