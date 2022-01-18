import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { URL_MES_REQUETES_DELIVRANCE } from "../../../../../../api/appels/requeteApi";
import { userDroitnonCOMEDEC } from "../../../../../../mock/data/connectedUserAvecDroit";
import {
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import { StatutRequete } from "../../../../../../model/requete/enum/StatutRequete";
import { getUrlWithParam } from "../../../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../../../views/common/util/storeRece";
import BoutonsCourrier, {
  BoutonsCourrierProps
} from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/BoutonsCourrier";
import { URL_MES_REQUETES_DELIVRANCE_COURRIER_ID } from "../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

const boutonsProps = {} as BoutonsCourrierProps;

test("render composant bouton annuler avec requete prise en charge", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  const boutonsPropsWithRequete = {
    ...boutonsProps,
    requete: requeteRDCSC
  } as BoutonsCourrierProps;
  history.push(getUrlWithParam(URL_MES_REQUETES_DELIVRANCE, idRequeteRDCSC));
  history.push(
    getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_COURRIER_ID, idRequeteRDCSC)
  );
  const { getByText } = render(
    <Router history={history}>
      <Formik initialValues={{}} onSubmit={(values: any) => {}}>
        <BoutonsCourrier {...boutonsPropsWithRequete} />
      </Formik>
    </Router>
  );

  const boutonAnnuler = getByText(/Annuler/i) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonAnnuler.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_DELIVRANCE, idRequeteRDCSC)
    );
  });
});

test("render composant bouton annuler avec requete a valider", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  requeteRDCSC.statutCourant.statut = StatutRequete.A_VALIDER;
  const boutonsPropsWithRequete = {
    ...boutonsProps,
    requete: requeteRDCSC
  } as BoutonsCourrierProps;
  history.push(getUrlWithParam(URL_MES_REQUETES_DELIVRANCE, idRequeteRDCSC));
  history.push(
    getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_COURRIER_ID, idRequeteRDCSC)
  );
  const { getByText } = render(
    <Router history={history}>
      <Formik initialValues={{}} onSubmit={(values: any) => {}}>
        <BoutonsCourrier {...boutonsPropsWithRequete} />
      </Formik>
    </Router>
  );

  const boutonAnnuler = getByText(/Annuler/i) as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonAnnuler.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_DELIVRANCE, idRequeteRDCSC)
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
