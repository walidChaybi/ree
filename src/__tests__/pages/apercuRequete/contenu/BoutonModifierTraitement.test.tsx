import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { idRequeteRDCSC } from "../../../../mock/data/RequeteV2";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configParamsBaseRequete } from "../../../../mock/superagent-config/superagent-mock-params";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { Nationalite } from "../../../../model/etatcivil/enum/Nationalite";
import { Sexe } from "../../../../model/etatcivil/enum/Sexe";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { storeRece } from "../../../../views/common/util/storeRece";
import { BoutonModifierTraitement } from "../../../../views/pages/apercuRequete/contenu/BoutonModifierTraitement";
import { URL_MES_REQUETES_APERCU_REQUETE } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetesV2[0],
  configEtatcivil[0],
  configParamsBaseRequete[0]
]);

const requeteTestCOURRIER = {
  id: idRequeteRDCSC,
  idEntite: "11",
  type: TypeRequete.DELIVRANCE,
  dateCreation: 1577836800000,
  statutCourant: {
    statut: StatutRequete.A_SIGNER,
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

test("est à A_SIGNER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_APERCU_REQUETE);

  const { getByText } = render(
    <Router history={history}>
      <BoutonModifierTraitement
        requete={requeteTestCOURRIER}
        dataHistory={history}
      ></BoutonModifierTraitement>
    </Router>
  );

  const bouttonModifierTraitement = getByText(
    /Modifier le traitement/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonModifierTraitement.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonModifierTraitement);
  });
});

test("est à A_VALIDER", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_APERCU_REQUETE);

  requeteTestCOURRIER.statutCourant.statut = StatutRequete.A_VALIDER;

  const { getByText } = render(
    <Router history={history}>
      <BoutonModifierTraitement
        requete={requeteTestCOURRIER}
        dataHistory={history}
      ></BoutonModifierTraitement>
    </Router>
  );

  const bouttonModifierTraitement = getByText(
    /Modifier le traitement/i
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonModifierTraitement.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonModifierTraitement);
  });
});

afterAll(() => {
  superagentMock.unset();
});
