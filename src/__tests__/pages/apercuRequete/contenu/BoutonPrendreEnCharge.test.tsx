import { act, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  userDroitCOMEDEC,
  userDroitnonCOMEDEC
} from "../../../../mock/data/connectedUserAvecDroit";
import { idRequete1 } from "../../../../mock/data/RequeteV2";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IStatutCourant } from "../../../../model/requete/v2/IStatutCourant";
import { storeRece } from "../../../../views/common/util/storeRece";
import { BoutonPrendreEnCharge } from "../../../../views/pages/apercuRequete/contenu/BoutonPrendreEnCharge";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configMultiAPi);

const statutCourantRequete = {
  statut: StatutRequete.A_TRAITER,
  dateEffet: 1577923200000
} as IStatutCourant;

const requeteTest = {
  id: idRequete1,
  idEntite: "11",
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_TRAITER,
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

let bouttonPrendreEnCharge: HTMLElement;

test("est à A_TRAITER ou TRANSFEREE et provient de COURRIER", async () => {
  requeteTest.provenanceRequete.provenance = Provenance.COURRIER;

  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory(URL_MES_REQUETES_APERCU_REQUETE);

  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnCharge requete={requeteTest}></BoutonPrendreEnCharge>
    </Router>
  );

  bouttonPrendreEnCharge = getByText(/Prendre en charge/i);

  expect(bouttonPrendreEnCharge).not.toHaveAttribute("disabled");

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });
});

test("est à A_TRAITER ou TRANSFEREE et provient de COMEDEC", async () => {
  requeteTest.provenanceRequete.provenance = Provenance.COMEDEC;

  storeRece.utilisateurCourant = userDroitCOMEDEC;
  const history = createMemoryHistory(URL_MES_REQUETES_APERCU_REQUETE);
  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnCharge requete={requeteTest}></BoutonPrendreEnCharge>
    </Router>
  );

  bouttonPrendreEnCharge = getByText(/Prendre en charge/i);
  expect(bouttonPrendreEnCharge).not.toHaveAttribute("disabled");

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });
});

afterAll(() => {
  superagentMock.unset();
});
