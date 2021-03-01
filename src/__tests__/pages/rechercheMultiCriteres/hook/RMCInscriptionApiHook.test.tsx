import React from "react";
import { render, waitFor, act, screen } from "@testing-library/react";
import request from "superagent";
import {
  ICriteresRecherche,
  useRMCInscriptionApiHook
} from "../../../../views/pages/rechercheMultiCriteres/hook/RMCInscriptionApiHook";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { NB_LIGNES_PAR_APPEL } from "../../../../views/common/widget/tableau/TableauRece";
import { NatureRca } from "../../../../model/etatcivil/enum/NatureRca";

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
    },
    registreRepertoire: {
      repertoire: {
        typeRepertoire: "RCA",
        natureInscription: NatureRca.CHANGEMENT_SEXE
      }
    }
  },
  range: `0-${NB_LIGNES_PAR_APPEL}`
};

const HookConsummerRMCInscription: React.FC = () => {
  const { dataRMCInscription } = useRMCInscriptionApiHook(criteres);

  return (
    <>
      {dataRMCInscription && dataRMCInscription.length > 0 && (
        <div data-testid="test-rmc-inscription-hook">
          {dataRMCInscription[0].idInscription}
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Inscription", async () => {
  await act(async () => {
    render(<HookConsummerRMCInscription />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-inscription-hook").textContent).toEqual(
      "85160d6e-893b-47c2-a9a8-b25573189f0c"
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
      registre: {
        natureActe: "Naissance"
      }
    }
  },
  range: `0-${NB_LIGNES_PAR_APPEL}`
};

const HookConsummerRMCInscriptionRechecheNonAutorise: React.FC = () => {
  const { dataRMCInscription } = useRMCInscriptionApiHook(
    criteresRechecheNonAutorise
  );

  return (
    <>
      {dataRMCInscription && dataRMCInscription.length === 0 && (
        <div data-testid="test-rmc-inscription-hook">
          Recherche non autorisée
        </div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
  await act(async () => {
    render(<HookConsummerRMCInscriptionRechecheNonAutorise />);
  });
  await waitFor(() => {
    expect(screen.getByTestId("test-rmc-inscription-hook").textContent).toEqual(
      "Recherche non autorisée"
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
