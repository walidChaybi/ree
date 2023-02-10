import { useRMCActeApiHook } from "@hook/rmcActeInscription/RMCActeApiHook";
import { ICriteresRechercheActeInscription } from "@pages/rechercheMultiCriteres/acteInscription/hook/RMCActeInscriptionUtils";
import { act, render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const criteres: ICriteresRechercheActeInscription = {
  valeurs: {
    titulaire: {
      nom: "Nom",
      prenom: "Prénom",
      paysNaissance: "France",
      dateNaissance: { jour: "10", mois: "01", annee: "2020" }
    },
    datesDebutFinAnnee: {
      dateDebut: { jour: "", mois: "", annee: "" },
      dateFin: { jour: "", mois: "", annee: "" },
      annee: ""
    }
  },
  range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
};

const HookConsummerRMCActe: React.FC = () => {
  const { dataRMCActe } = useRMCActeApiHook(criteres);
  return (
    <>
      {dataRMCActe && dataRMCActe.length > 0 && (
        <div data-testid="test-rmc-acte-hook">{dataRMCActe[0].idActe}</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
  await act(async () => {
    render(<HookConsummerRMCActe />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual(
      "d8708d77-a359-4553-be72-1eb5f246d4da"
    );
  });
});

const criteresRechecheNonAutorise: ICriteresRechercheActeInscription = {
  valeurs: {
    titulaire: {
      nom: "Nom",
      prenom: "Prénom",
      paysNaissance: "France",
      dateNaissance: { jour: "10", mois: "01", annee: "2020" }
    },
    datesDebutFinAnnee: {
      dateDebut: { jour: "", mois: "", annee: "" },
      dateFin: { jour: "", mois: "", annee: "" },
      annee: ""
    },
    registreRepertoire: {
      repertoire: {
        typeRepertoire: "RC"
      }
    }
  },
  range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
};

const HookConsummerRMCActeRechecheNonAutorise: React.FC = () => {
  const { dataRMCActe } = useRMCActeApiHook(criteresRechecheNonAutorise);

  return (
    <>
      {dataRMCActe && dataRMCActe.length === 0 && (
        <div data-testid="test-rmc-acte-hook">Recherche non autorisée</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
  await act(async () => {
    render(<HookConsummerRMCActeRechecheNonAutorise />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual(
      "Recherche non autorisée"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
