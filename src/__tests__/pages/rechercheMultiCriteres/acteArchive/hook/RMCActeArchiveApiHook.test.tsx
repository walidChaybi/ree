import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import request from "superagent";
import { useRMCActeArchiveApiHook } from "../../../../../views/pages/rechercheMultiCriteres/acteArchive/hook/RMCActeArchiveApiHook";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { NB_LIGNES_PAR_APPEL } from "../../../../../views/common/widget/tableau/TableauRece";
import { ICriteresRecherche } from "../../../../../views/pages/rechercheMultiCriteres/acteArchive/hook/RMCActeArchiveApiHook";

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
  const { dataRMCActe } = useRMCActeArchiveApiHook(criteres);
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
    }
  },
  range: `0-${NB_LIGNES_PAR_APPEL}`
};

afterAll(() => {
  superagentMock.unset();
});
