import { render, screen } from "@testing-library/react";
import React from "react";
import { TableauStatut } from "../../../../../views/pages/fiche/hook/constructionComposants/statut/TableauStatut";

const statuts = [
  {
    statut: "ACTIF",
    dateStatut: 1612166196,
    motif: "motif du statut",
    complementMotif: "complément du motif",
    statutFicheEvenement: {
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
    statut: "INACTIF",
    dateStatut: 1617263796,
    motif: "motif du statut",
    complementMotif: "complément du motif",
    statutFicheEvenement: {
      ville: "Nantes",
      region: "Pays de la Loire",
      pays: "France"
    }
  },
  {
    statut: "ACTIF",
    dateStatut: 1615166196,
    motif: "motif du statut",
    complementMotif: "complément du motif"
  }
];

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

  const statut1 = screen.getAllByText("ACTIF");
  expect(statut1).toHaveLength(2);

  const statut2 = screen.getByText("INACTIF");
  expect(statut2).toBeDefined();

  const tds = screen.getAllByRole("cell", { name: "" });
  expect(tds).toHaveLength(3);
});
