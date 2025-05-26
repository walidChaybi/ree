import {
  criteresAvecDonneesTitulaireSuffisantes,
  determinerCriteresRMCAutoRequete,
  useRMCAutoRequeteApiHook
} from "@pages/rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import { SNP } from "@util/Utils";
import React from "react";
import { describe, expect, test } from "vitest";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";

describe("Test RMCAutoRequeteApiHook", () => {
  test("useRMCAutoRequeteApiHook DOIT récupèrer des requêtes liées QUAND une requête est fournie", async () => {
    const params = {
      requete: requeteDelivrance,
      range: "0-105"
    };

    const HookConsummerRequete: React.FC = () => {
      const { dataRMCAutoRequete } = useRMCAutoRequeteApiHook(params?.requete, params?.range);
      return <div data-testid="idRequete">{dataRMCAutoRequete?.[0]?.idRequete}</div>;
    };

    render(<HookConsummerRequete />);
    await waitFor(() => expect(screen.getByTestId("idRequete").textContent).toBe("54ddf213-d9b7-4747-8e92-68c220f66de3"));
  });

  test("determinerCriteresRMCAuto DOIT extraire les critères de RMC auto requête QUAND une requête est fournie", () => {
    const res = determinerCriteresRMCAutoRequete(requeteDelivrance);

    expect(res).toStrictEqual({
      criteres: [
        {
          nomTitulaire: "Prodesk",
          prenomTitulaire: "Elodie",
          jourNaissance: "25",
          moisNaissance: "6",
          anneeNaissance: "1990"
        },
        {
          nomTitulaire: "Daniel",
          prenomTitulaire: "Jack",
          jourNaissance: "25",
          moisNaissance: "6",
          anneeNaissance: "1990"
        }
      ]
    });
  });

  test("criteresAvecDonneesTitulaireSuffisantes DOIT renvoyer false QUAND les critères de recherche portent sur un titulaire sans nom patronymique, sans date de naissance et sans prénom", () => {
    expect(
      criteresAvecDonneesTitulaireSuffisantes([
        {
          nomTitulaire: SNP,
          prenomTitulaire: undefined,
          jourNaissance: undefined,
          moisNaissance: undefined,
          anneeNaissance: undefined
        }
      ])
    ).toBeFalsy();
  });

  test("criteresAvecDonneesTitulaireSuffisantes DOIT renvoyer true QUAND les critères de recherche portent sur un titulaire sans nom patronymique, avec date de naissance et avec prénom", () => {
    expect(
      criteresAvecDonneesTitulaireSuffisantes([
        {
          nomTitulaire: SNP,
          prenomTitulaire: "prenom",
          jourNaissance: "12",
          moisNaissance: "12",
          anneeNaissance: "2012"
        }
      ])
    ).toBeTruthy();
  });
});
