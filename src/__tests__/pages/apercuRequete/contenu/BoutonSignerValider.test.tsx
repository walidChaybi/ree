import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "../../../../mock/data/RequeteV2";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { storeRece } from "../../../../views/common/util/storeRece";
import { BoutonSignerValider } from "../../../../views/pages/apercuRequete/contenu/BoutonSignerValider";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configMultiAPi);

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
  history.push(URL_MES_REQUETES_APERCU_REQUETE);

  const { getByText } = render(
    <Router history={history}>
      <BoutonSignerValider requete={requeteTestCOURRIER}></BoutonSignerValider>
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

const requeteTestCOMEDEC = {
  id: idRequeteRDCSC,
  idEntite: "11",
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_VALIDER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.INTERNET },
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
