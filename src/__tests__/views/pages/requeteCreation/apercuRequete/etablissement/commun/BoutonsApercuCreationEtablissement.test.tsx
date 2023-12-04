import { requeteCreationEtablissement } from "@mock/data/requeteCreation";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { BoutonsApercuCreationEtablissement } from "@pages/requeteCreation/apercuRequete/etablissement/commun/BoutonsApercuRequeteCreationEtablissement";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
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

test("DOIT afficher le bouton SIGNER QUAND le projet est a signer", async () => {
  afficherBoutonSigner(
    AvancementProjetActe.A_SIGNER,
    true,
    false,
    URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
  );
  await waitFor(() => {
    expect(screen.queryByTitle("SIGNER")).toBeInTheDocument();
  });
});

test("NE DOIT PAS afficher le bouton SIGNER QUAND le projet n'est pas a signer", async () => {
  afficherBoutonSigner(
    AvancementProjetActe.EN_COURS,
    true,
    false,
    URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
  );
  await waitFor(() => {
    expect(screen.queryByTitle("SIGNER")).not.toBeInTheDocument();
  });
});

test("DOIT avoir le bouton SIGNER clickable QUAND le registre est ouvert et que le document n'est pas modifie", async () => {
  afficherBoutonSigner(
    AvancementProjetActe.A_SIGNER,
    true,
    false,
    URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
  );
  await waitFor(() => {
    expect(screen.queryByTitle("SIGNER")).not.toBeDisabled();
  });
});

test("NE DOIT PAS avoir le bouton SIGNER cliquable QUAND le registre n'est pas ouvert", async () => {
  afficherBoutonSigner(
    AvancementProjetActe.A_SIGNER,
    false,
    false,
    URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
  );
  await waitFor(() => {
    expect(screen.queryByTitle("SIGNER")).toBeDisabled();
    expect(
      screen.queryByText(
        "Le registre n'est pas ouvert. Vous ne pouvez pas signer l'acte."
      )
    ).toBeInTheDocument();
  });
});

test("NE DOIT PAS avoir le bouton SIGNER cliquable QUAND le formulaire est modifié", async () => {
  afficherBoutonSigner(
    AvancementProjetActe.A_SIGNER,
    true,
    true,
    URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID
  );
  await waitFor(() => {
    expect(screen.queryByTitle("SIGNER")).toBeDisabled();
    expect(
      screen.queryByText(
        'Des données ont été modifiées. Veuillez cliquer sur le bouton "Actualiser et Visualiser".'
      )
    ).toBeInTheDocument();
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

function afficherBoutonSigner(
  avancement: AvancementProjetActe,
  estRegistreOuvert: boolean,
  estFormulaireModifie: boolean,
  racineUrl: string
) {
  const history = createMemoryHistory();
  history.push(`${racineUrl}/${PATH_APERCU_REQ_ETABLISSEMENT_SIMPLE}`);

  const mockRequete = {
    ...requeteCreationEtablissement,
    statutCourant: { statut: StatutRequete.A_TRAITER, dateEffet: 0 }
  };

  render(
    <Router history={history}>
      <BoutonsApercuCreationEtablissement
        requete={mockRequete}
        conditionAffichageBoutonsApercuActe={true}
        avancement={avancement}
        estRegistreOuvert={estRegistreOuvert}
        estFormulaireModifie={estFormulaireModifie}
      />
    </Router>
  );
}
