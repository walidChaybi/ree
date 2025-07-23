import { EStatutRcRcaPacs } from "@model/etatcivil/enum/EStatutRcRcaPacs";
import { StatutFiche } from "@model/etatcivil/fiche/StatutFiche";
import { TableauStatut } from "@pages/fiche/hook/constructionComposants/statut/TableauStatut";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

const statuts = [
  {
    statut: "ACTIF" as keyof typeof EStatutRcRcaPacs,
    dateStatut: 1612166196,
    motif: "motif du statut",
    complementMotif: "complément du motif",
    statutFicheEvenement: {
      id: "id",
      date: {
        jour: "01",
        mois: "02",
        annee: "2021"
      },
      ville: "Nantes",
      region: "Pays de la Loire",
      pays: "France"
    }
  },
  {
    statut: "INACTIF" as keyof typeof EStatutRcRcaPacs,
    dateStatut: 1617263796,
    motif: "motif du statut",
    complementMotif: "complément du motif",
    statutFicheEvenement: {
      id: "id",
      ville: "Nantes",
      region: "Pays de la Loire",
      pays: "France"
    }
  },
  {
    statut: "ACTIF" as keyof typeof EStatutRcRcaPacs,
    dateStatut: 1615166196,
    motif: "motif du statut",
    complementMotif: "complément du motif"
  }
]
  .map(StatutFiche.depuisDto)
  .filter((statutFiche): statutFiche is StatutFiche => statutFiche != null);

test("L'historique des statuts d'une inscription RC est affiché", () => {
  render(<TableauStatut statutsFiche={statuts} />);

  const colonneStatut = screen.getByText("Statut");
  expect(colonneStatut).toBeDefined();

  const colonneDateStatut = screen.getByText("Date statut");
  expect(colonneDateStatut).toBeDefined();

  const colonneDateEvenement = screen.getByText("Date événement");
  expect(colonneDateEvenement).toBeDefined();

  const colonneMotif = screen.getByText("Motif");
  expect(colonneMotif).toBeDefined();

  const colonneLieu = screen.getByText("Lieu");
  expect(colonneLieu).toBeDefined();

  const colonneComplementMotif = screen.getByText("Complément motif");
  expect(colonneComplementMotif).toBeDefined();

  const statut1 = screen.getAllByText("Actif");
  expect(statut1).toHaveLength(2);

  const statut2 = screen.getByText("Inactif");
  expect(statut2).toBeDefined();

  const tds = screen.getAllByRole("cell", { name: "" });
  expect(tds).toHaveLength(3);
});
