import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { NB_LIGNES_PAR_APPEL } from "../../../../../views/common/widget/tableau/v1/TableauRece";
import { useRMCActeApiHook } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/hook/RMCActeApiHook";
import { ICriteresRecherche } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const criteres: ICriteresRecherche = {
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
  range: `0-${NB_LIGNES_PAR_APPEL}`
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

const criteresRechecheNonAutorise: ICriteresRecherche = {
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
  range: `0-${NB_LIGNES_PAR_APPEL}`
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
