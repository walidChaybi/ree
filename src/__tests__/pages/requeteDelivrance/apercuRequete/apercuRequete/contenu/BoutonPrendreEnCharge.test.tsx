import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  userDroitCOMEDEC,
  userDroitnonCOMEDEC
} from "../../../../../../mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "../../../../../../mock/data/RequeteV2";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configParamsBaseRequete } from "../../../../../../mock/superagent-config/superagent-mock-params";
import { configRequetesV2 } from "../../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { Nationalite } from "../../../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { Provenance } from "../../../../../../model/requete/v2/enum/Provenance";
import { SousTypeDelivrance } from "../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import { BoutonPrendreEnCharge } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequete/contenu/BoutonPrendreEnCharge";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
  configEtatcivil[0],
  configParamsBaseRequete[0]
]);

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idEntite: "11",
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
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

test("est à A_TRAITER ou TRANSFEREE et provient de COURRIER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_APERCU_REQUETE);

  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnCharge
        requete={requeteTestCOURRIER}
      ></BoutonPrendreEnCharge>
    </Router>
  );

  const bouttonPrendreEnCharge = getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });
});

const requeteTestCOMEDEC = {
  id: idRequeteRDCSC,
  idEntite: "11",
  dateCreation: 1577836800000,
  type: TypeRequete.DELIVRANCE,
  sousType: SousTypeDelivrance.RDC,
  statutCourant: {
    statut: StatutRequete.A_TRAITER,
    dateEffet: 1577923200000
  },
  idUtilisateur: "idUtilisateurConnectedUser",
  provenanceRequete: { provenance: Provenance.COMEDEC },
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

test("est à A_TRAITER ou TRANSFEREE et provient de COMEDEC", async () => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_APERCU_REQUETE);

  const { getByText } = render(
    <Router history={history}>
      <BoutonPrendreEnCharge
        requete={requeteTestCOMEDEC}
      ></BoutonPrendreEnCharge>
    </Router>
  );

  const bouttonPrendreEnCharge = getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });
});

afterAll(() => {
  superagentMock.unset();
});
