import { CONFIG_POST_RMC_ACTE } from "@api/configurations/etatCivil/acte/PostRMCActeConfigApi";
import { ICriteresRechercheActeInscription } from "@hook/rmcActeInscription/RMCActeInscriptionUtils";
import { MockApi } from "@mock/appelsApi/MockApi";
import { ReponseAppelRMCActe } from "@mock/data/RMCActe";
import { render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { describe, expect, test } from "vitest";
import { useRMCActeApiHook } from "../../hooks/rmc/RMCActeApiHook";

describe("Test RMCAutoApiHook", () => {
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
        dateFin: { jour: "", mois: "", annee: "" }
      }
    },
    range: `0-${NB_LIGNES_PAR_APPEL_ACTE}`
  };

  const HookConsummerRMCActe: React.FC = () => {
    const resultatRMCActe = useRMCActeApiHook(criteres);
    return (
      <>
        {resultatRMCActe.resultat?.dataRMCActe && resultatRMCActe.resultat.dataRMCActe.length > 0 && (
          <div data-testid="test-rmc-acte-hook">{resultatRMCActe.resultat.dataRMCActe[0].id}</div>
        )}
      </>
    );
  };

  test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
    MockApi.deployer(CONFIG_POST_RMC_ACTE, { query: { range: "0-100" } }, { data: ReponseAppelRMCActe.data });
    render(<HookConsummerRMCActe />);

    await waitFor(() => {
      expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual("d8708d77-a359-4553-be72-1eb5f246d4da");
    });

    MockApi.stopMock();
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
        dateFin: { jour: "", mois: "", annee: "" }
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
    const resultatRMCActe = useRMCActeApiHook(criteresRechecheNonAutorise);

    return (
      <>
        {resultatRMCActe.resultat?.dataRMCActe && resultatRMCActe.resultat.dataRMCActe.length === 0 && (
          <div data-testid="test-rmc-acte-hook">Recherche non autorisée</div>
        )}
      </>
    );
  };

  test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", async () => {
    render(<HookConsummerRMCActeRechecheNonAutorise />);

    await waitFor(() => {
      expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual("Recherche non autorisée");
    });
  });
});
