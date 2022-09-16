import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { useRMCRequeteApiHook } from "@pages/rechercheMultiCriteres/requete/hook/RMCRequeteApiHook";
import { act, render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_REQUETE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

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
  range: `0-${NB_LIGNES_PAR_APPEL_REQUETE}`
};

const HookConsummerRMCRequete: React.FC = () => {
  const { dataRMCRequete } = useRMCRequeteApiHook(criteres);
  return (
    <>
      {dataRMCRequete && dataRMCRequete.length > 0 && (
        <>
          <div data-testid="test-rmc-requete-hook">
            {dataRMCRequete[0].idRequete}
          </div>
          <div data-testid="test-rmc-requete-hook1">
            {dataRMCRequete[1].idRequete}
          </div>
          <div data-testid="test-rmc-requete-hook2">
            {dataRMCRequete[2].idRequete}
          </div>
          <div data-testid="test-rmc-requete-hook3">
            {dataRMCRequete[3].idRequete}
          </div>
        </>
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
      "54ddf213-d9b7-4747-8e92-68c220f66de3"
    );
    expect(screen.getByTestId("test-rmc-requete-hook1").textContent).toEqual(
      "8ef11b8b-652c-4c6a-ad27-a544fce635d0"
    );
    expect(screen.getByTestId("test-rmc-requete-hook2").textContent).toEqual(
      "4578e56c-421c-4e6a-b587-a238a665daf8"
    );
    expect(screen.getByTestId("test-rmc-requete-hook3").textContent).toEqual(
      "532a8a9d-91c0-4405-9f5f-503629405422"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
