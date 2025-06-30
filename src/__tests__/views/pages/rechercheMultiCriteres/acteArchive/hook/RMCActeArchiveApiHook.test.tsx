import {
  ICriteresRechercheActeArchive,
  useRMCActeArchiveApiHook
} from "@pages/rechercheMultiCriteres/acteArchive/hook/RMCActeArchiveApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_ACTE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import { expect, test } from "vitest";

const criteres: ICriteresRechercheActeArchive = {
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
  const resultatRMCActe = useRMCActeArchiveApiHook(criteres);
  return (
    <>
      {resultatRMCActe?.dataRMCActe && resultatRMCActe.dataRMCActe.length > 0 && (
        <div data-testid="test-rmc-acte-hook">{resultatRMCActe.dataRMCActe[0].id}</div>
      )}
    </>
  );
};

test("l'appel au WS fonctionne correctement pour la Recherche Multi Critères Acte", () => {
  render(<HookConsummerRMCActe />);

  waitFor(() => {
    expect(screen.getByTestId("test-rmc-acte-hook").textContent).toEqual("d8708d77-a359-4553-be72-1eb5f246d4da");
  });
});
