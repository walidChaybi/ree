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
import { URL_MES_REQUETES_INFORMATION_APERCU_ID } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesInformation
);
//global.URL.createObjectURL = jest.fn();
const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_INFORMATION_APERCU_ID,
    "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
  )
);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("renders ApercuReqInfoPage", async () => {
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
  const boutonRepondre = screen.getByText(/Répondre/i);
  const boutonSaisieLibre = screen.getByText(/Saisie libre/i);

  const formReponse = screen.getByText(/Votre réponse/i);
  const libelleReponse = screen.getByText(/Libellé de la réponse/i);
  const mailReponse = screen.getByText(/Mail de la réponse/i);

  const boutonAnnuler = screen.getByText(/Annuler/i);
  const boutonEnvoyer = screen.getByText(/Envoyer la réponse/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(resume).toBeDefined();
    expect(choixReponse).toBeDefined();
    expect(boutonRepondre).toBeDefined();
    expect(boutonSaisieLibre).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(formReponse).toBeDefined();
    expect(libelleReponse).toBeDefined();
    expect(mailReponse).toBeDefined();
    expect(boutonAnnuler).toBeDefined();
    expect(boutonEnvoyer).toBeDefined();
  });

  // Alimentation Résumé de la requête d'information
  const sousType = screen.getByText(/Sous-type/i);
  const valeurSousType = screen.getByText("Information");
  const objet = screen.getByText("Objet");
  const valeurObjet = screen.getByText(/Divorce et\/ou séparation de corps/i);
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
    expect(valeurObjet).toBeDefined();
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

  const boutonReponse = screen.getByText(/Répondre/i);

  await waitFor(() => {
    expect(boutonReponse).toBeDefined();
  });

  act(() => {
    fireEvent.click(boutonReponse);
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
});

afterAll(() => {
  superagentMock.unset();
});
