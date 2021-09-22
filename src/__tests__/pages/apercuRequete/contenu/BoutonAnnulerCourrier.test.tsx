import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { idRequete1, requete1 } from "../../../../mock/data/RequeteV2";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import BoutonsCourrierAccompagnement, {
  BoutonsCourrierAccompagnementProps
} from "../../../../views/pages/apercuRequete/apercuCourrierAccompagnement/BoutonsCourrierAccompagnement";
import {
  URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const boutonsProps = {} as BoutonsCourrierAccompagnementProps;

test("render composant bouton annuler avec requete prise en charge", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  const boutonsPropsWithRequete = {
    ...boutonsProps,
    requete: requete1
  } as BoutonsCourrierAccompagnementProps;
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete1
    )
  );
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
      idRequete1
    )
  );
  const { getByText } = render(
    <Router history={history}>
      <Formik initialValues={{}} onSubmit={(values: any) => {}}>
        <BoutonsCourrierAccompagnement {...boutonsPropsWithRequete} />
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
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequete1
      )
    );
  });
});

test("render composant bouton annuler avec requete a valider", async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  const history = createMemoryHistory();
  requete1.statutCourant.statut = StatutRequete.A_VALIDER;
  const boutonsPropsWithRequete = {
    ...boutonsProps,
    requete: requete1
  } as BoutonsCourrierAccompagnementProps;
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete1
    )
  );
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
      idRequete1
    )
  );
  const { getByText } = render(
    <Router history={history}>
      <Formik initialValues={{}} onSubmit={(values: any) => {}}>
        <BoutonsCourrierAccompagnement {...boutonsPropsWithRequete} />
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
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        idRequete1
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
