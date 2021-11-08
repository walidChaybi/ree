import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { NOMENCLATURE_REPONSE } from "../../../../mock/data/NomenclatureReponse";
import { configRequetesInformation } from "../../../../mock/superagent-config/superagent-mock-requetes-information";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { ApercuReqInfoPage } from "../../../../views/pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import {
  URL_MES_REQUETES_INFORMATION,
  URL_MES_REQUETES_INFORMATION_APERCU_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesInformation
);

let history: any;

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

beforeEach(async () => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_INFORMATION);
});

test("renders ApercuReqInfoPage", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_INFORMATION_APERCU_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu requête d'information/i);
  const bandeau = screen.getByText(
    /Requête à valider, attribuée à Benoît TANGUY - Le : 20\/10\/2021/i
  );

  const resume = screen.getByText(/Résumé de la requête d'information/i);
  const choixReponse = screen.getByText(/Choix de la réponse/i);
  const formReponse = screen.getByText(/Votre réponse/i);
  const libelleReponse = screen.getByText(/Libellé de la réponse/i);
  const mailReponse = screen.getByText(/Mail de la réponse/i);

  const boutonRetour = screen.getByText(/Retour espace information/i);
  const boutonEnvoyer = screen.getByText(/Envoyer la réponse/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(resume).toBeDefined();
    expect(choixReponse).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(libelleReponse).toBeDefined();
    expect(mailReponse).toBeDefined();
    expect(boutonRetour).toBeDefined();
    expect(boutonEnvoyer).toBeDefined();
  });

  // Alimentation Résumé de la requête d'information
  const sousType = screen.getByText(/Sous-type/i);
  const valeurSousType = screen.getByText("Information");
  const objet = screen.getByText("Objet");
  const valeurObjet = screen.getAllByText(
    /Divorce et\/ou séparation de corps/i
  );
  const complementObjet = screen.getByText(/Complément d'objet/i);
  const valeurComplementObjet = screen.getByText(
    /Je souhaite mettre à jour mes actes de l'état civil/i
  );
  const dateCreation = screen.getByText(/Date de création/i);
  const valeurDateCreation = screen.getByText("20/10/2021");
  const numeroReq = screen.getByText(/N° de la requête liée/i);
  const valeurNumeroReq = screen.getByText(/9TY6ML/i);
  const typeRequerant = screen.getByText(/Type requérant/i);
  const valeurTypeRequerant = screen.getByText(/Mandataire habilité/i);
  const identiteRequerant = screen.getByText(/Identité du requérant/i);
  const valeurIdentiteRequerant = screen.getByText(/TINE Clément/i);
  const titulaire = screen.getByText(/Identité du titulaire/i);
  const valeurTitulaire = screen.getByText(/BLANCHARD Mehdi/i);
  const dateNaissance = screen.getByText(/Date de naissance du titulaire/i);
  const valeurDateNaissance = screen.getByText(/11\/03\/2000/i);
  const lieuNaissance = screen.getByText(/Lieu de naissance du titulaire/i);
  const valeurLieuNaissance = screen.getByText(/Londres/i);
  const commentaire = screen.getByText(/Commentaire libre de l'usager/i);
  const valeurCommentaire = screen.getByText(
    "Je pense avoir oublier de mettre mon pays de naissance qui est l'espagne. Est-ce trop tard ? Monsieur XXX"
  );

  await waitFor(() => {
    expect(sousType).toBeDefined();
    expect(valeurSousType).toBeDefined();
    expect(objet).toBeDefined();
    expect(valeurObjet.length).toEqual(2);
    expect(complementObjet).toBeDefined();
    expect(valeurComplementObjet).toBeDefined();
    expect(dateCreation).toBeDefined();
    expect(valeurDateCreation).toBeDefined();
    expect(numeroReq).toBeDefined();
    expect(valeurNumeroReq).toBeDefined();
    expect(typeRequerant).toBeDefined();
    expect(valeurTypeRequerant).toBeDefined();
    expect(identiteRequerant).toBeDefined();
    expect(valeurIdentiteRequerant).toBeDefined();
    expect(titulaire).toBeDefined();
    expect(valeurTitulaire).toBeDefined();
    expect(dateNaissance).toBeDefined();
    expect(valeurDateNaissance).toBeDefined();
    expect(lieuNaissance).toBeDefined();
    expect(valeurLieuNaissance).toBeDefined();
    expect(commentaire).toBeDefined();
    expect(valeurCommentaire).toBeDefined();
  });

  const boutonReponsesFiltrees = screen.getByText(/Réponses proposées/i);

  await waitFor(() => {
    expect(boutonReponsesFiltrees).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponsesFiltrees);
  });

  const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[0].libelle);
  const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[1].libelle);

  await waitFor(() => {
    expect(boutonReponse1).toBeDefined();
    expect(boutonReponse2).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponse1);
  });

  const libelleReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[0].libelle
  );
  const mailReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[0].corpsMail
  );

  await waitFor(() => {
    expect(libelleReponseChoisie).toBeDefined();
    expect(mailReponseChoisie).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonEnvoyer);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});

test("bouton annuler", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_INFORMATION_APERCU_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const boutonAnnuler = screen.getByText(/Retour espace information/i);

  await waitFor(() => {
    expect(boutonAnnuler).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(URL_MES_REQUETES_INFORMATION);
  });
});

test("bouton saisie libre", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_INFORMATION_APERCU_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  act(() => {
    fireEvent.change(screen.getByPlaceholderText("Mail de la réponse"), {
      target: { text: "Salut les amies" }
    });
  });

  const boutonSaisieLibre = screen.getByText(/Réponse libre/i);

  await waitFor(() => {
    expect(boutonSaisieLibre).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonSaisieLibre);
  });

  await waitFor(() => {
    expect(screen.getByPlaceholderText("Mail de la réponse").textContent).toBe(
      ""
    );
  });
});

test("complétion en cours", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10555"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_INFORMATION_APERCU_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByDisplayValue("Saisie libre agent")).toBeDefined();
  });
});

test("renders ApercuReqInfoPage Double Menu", async () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_INFORMATION_APERCU_ID,
      "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
    )
  );

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_INFORMATION_APERCU_ID}>
            <ApercuReqInfoPage />
          </Route>
        </Router>
      </>
    );
  });

  const boutonReponses = screen.getByText(/Toutes les réponses disponibles/i);

  await waitFor(() => {
    expect(boutonReponses).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponses);
  });

  const boutonSousMenu = screen.getByText(/Problème technique/i);

  await waitFor(() => {
    expect(boutonSousMenu).toBeDefined();
  });

  act(() => {
    fireEvent.mouseOver(boutonSousMenu);
  });

  const boutonReponse1 = screen.getByText(NOMENCLATURE_REPONSE[2].libelle);
  const boutonReponse2 = screen.getByText(NOMENCLATURE_REPONSE[3].libelle);

  await waitFor(() => {
    expect(boutonReponse1).toBeDefined();
    expect(boutonReponse2).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponse1);
  });

  const libelleReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[2].libelle
  );
  const mailReponseChoisie = screen.getByText(
    NOMENCLATURE_REPONSE[2].corpsMail
  );

  await waitFor(() => {
    expect(libelleReponseChoisie).toBeDefined();
    expect(mailReponseChoisie).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
