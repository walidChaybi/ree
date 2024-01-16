import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

const ID_REQUETE = "b63ebccd-ba5e-443a-8837-c5e1e111e846";
const history = createMemoryHistory();

beforeEach(() => {
  history.push(URL_MES_REQUETES_CREATION);
});

describe("Doit rediriger sur le bon aperçu de requête de transcription en fonction du statut et du sousType", () => {
  test("Doit rediriger sur l'aperçu de requête création transcription simple quand le sousType est RCTC et que le statut est A_TRAITER", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTC,
      statut: StatutRequete.A_TRAITER
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetetranscriptionenpriseencharge")
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTC et que le statut est A_TRAITER", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTC,
      statut: StatutRequete.A_TRAITER
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetetranscriptionenpriseencharge")
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription prise en charge quand le sousType est RCTD et que le statut est PRISE_EN_CHARGE", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTD,
      statut: StatutRequete.PRISE_EN_CHARGE
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetetranscriptionenpriseencharge")
    );
  });

  test("Doit rediriger sur l'aperçu de requête création transcription en traitement quand le sousType est RCTD et que le statut est EN_TRAITEMENT", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCTD,
      statut: StatutRequete.EN_TRAITEMENT
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetetranscriptionensaisieprojet")
    );
  });
});

describe("Doit rediriger sur le bon aperçu de requête d'établissement en fonction du statut et du sousType", () => {
  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut À traiter", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.A_TRAITER
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier")
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création suivi dossier QUAND le sousType est RCEXR et au statut Prise en charge", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.PRISE_EN_CHARGE
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsuividossier")
    );
  });

  test("Doit rediriger sur l'aperçu de requête de création simple QUAND le sousType est RCEXR et au statut Traité", async () => {
    const paramsCreation: NavigationApercuReqCreationParams = {
      idRequete: ID_REQUETE,
      sousType: SousTypeCreation.RCEXR,
      statut: StatutRequete.TRAITE
    };
    naviguerApercuRequete(paramsCreation);

    expect(history.location.pathname).toBe(
      apercuRequeteURL("apercurequetecreationetablissementsimple")
    );
  });
});

function naviguerApercuRequete(
  paramsCreation: NavigationApercuReqCreationParams
) {
  const HookConsumer: React.FC = () => {
    useNavigationApercuCreation(paramsCreation);
    return <></>;
  };
  render(
    <Router history={history}>
      <HookConsumer />
    </Router>
  );
}

function apercuRequeteURL(apercuRequete: string) {
  return `${URL_MES_REQUETES_CREATION}/${apercuRequete}/${ID_REQUETE}`;
}