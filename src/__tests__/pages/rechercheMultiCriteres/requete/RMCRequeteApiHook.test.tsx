import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import request from "superagent";
import { useRMCRequeteApiHook } from "../../../../views/pages/rechercheMultiCriteres/requete/hook/RMCRequeteApiHook";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { NB_LIGNES_PAR_APPEL } from "../../../../views/common/widget/tableau/TableauRece";
import { ICriteresRMCRequete } from "../../../../model/rmc/requete/ICriteresRMCRequete";

const superagentMock = require("superagent-mock")(request, configRequetes);

const criteres: ICriteresRMCRequete = {
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

const HookConsummerRMCRequete: React.FC = () => {
  const { dataRMCRequete } = useRMCRequeteApiHook(criteres);
  return (
    <>
      {dataRMCRequete && dataRMCRequete.length > 0 && (
        <div data-testid="test-rmc-requete-hook">
          {dataRMCRequete[0].idRequete}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Requete", async () => {
  await act(async () => {
    render(<HookConsummerRMCRequete />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-requete-hook").textContent).toEqual(
      "d8708d77-a359-4553-be72-1eb5f246d4da"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
