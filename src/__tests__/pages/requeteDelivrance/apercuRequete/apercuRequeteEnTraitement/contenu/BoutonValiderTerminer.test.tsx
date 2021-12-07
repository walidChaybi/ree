import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../../../mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import { Nationalite } from "../../../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { Provenance } from "../../../../../../model/requete/enum/Provenance";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import { BoutonValiderTerminer } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/contenu/BoutonValiderTerminer";
import { URL_MES_REQUETES_APERCU_REQUETE_ID } from "../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idEntite: "11",
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.COURRIER },
  titulaires: [
    {
      id: "0",
      position: 0,
      nationalite: Nationalite.FRANCAISE,
      nomNaissance: "Garcia",
      prenoms: [
        {
          prenom: "Hugo",
          numeroOrdre: 1
        }
      ],
      jourNaissance: 31,
      moisNaissance: 12,
      anneeNaissance: 1981,
      sexe: Sexe.MASCULIN.libelle
    }
  ]
} as IRequeteDelivrance;

test("est à A_VALIDER et provient de COURRIER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_APERCU_REQUETE_ID);

  const { getByText } = render(
    <Router history={history}>
      <BoutonValiderTerminer
        requete={requeteTestCOURRIER}
      ></BoutonValiderTerminer>
    </Router>
  );

  const bouttonµSigner = getByText(/Valider et terminer/i) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonµSigner.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonµSigner);
  });
});

afterAll(() => {
  superagentMock.unset();
});
