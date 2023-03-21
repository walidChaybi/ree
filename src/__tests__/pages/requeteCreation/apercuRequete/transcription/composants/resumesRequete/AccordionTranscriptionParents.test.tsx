import { mapTitulairesCreation } from "@hook/requete/DetailRequeteHook";
import { AccordionTranscriptionParents } from "@pages/requeteCreation/apercuRequete/transcription/composants/resumesRequete/AccordionTranscriptionParents";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";

const parents = [
  {
    nomNaissance: "nomNaissance",
    prenoms: [
      {
        numeroOrdre: 1,
        prenom: "Tititusse"
      },
      {
        numeroOrdre: 2,
        prenom: "Tititusse2"
      }
    ],
    sexe: "MASCULIN",
    dateNaissanceFormatee: "12/12/2022",
    lieuNaissanceFormate: "Lucerne (Suisse)",
    nationalites: ["nationalite1"],
    paysStatutRefugie: "paysStatutRefugie paysStatutRefugie",
    paysOrigine: "Tunisie",
    evenementUnions: [
      {
        type: "MARIAGE",
        dateFormatee: "01/01/01",
        lieuFormate: "Nantes (Clisson)"
      }
    ]
  },
  {
    nomNaissance: "nomNaissance",
    prenoms: [
      {
        numeroOrdre: 1,
        prenom: "Marie"
      },
      {
        numeroOrdre: 2,
        prenom: "Mario"
      }
    ],
    sexe: "MASCULIN",
    dateNaissanceFormatee: "12/12/2023",
    lieuNaissanceFormate: "Lucerne (Suisse)",
    nationalites: ["nationalite1"],
    paysOrigine: "paysOrigine"
  }
];

describe("Test du composant accordion parents correctement", () => {
  test("DOIT afficher l'accordion parent disabled quand aucun parents n'est présent", async () => {
    await act(async () => {
      render(<AccordionTranscriptionParents parents={[]} />);
    });

    const accordionParent = screen.getByRole("button");
    expect(accordionParent).toHaveAttribute("aria-disabled", "true");
    expect(accordionParent).toHaveAttribute("aria-expanded", "false");
  });

  test("DOIT afficher l'accordion parent non disabled/expanded quand au moins 1 parent est présent", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionParents
          parents={mapTitulairesCreation(parents)}
        />
      );
    });

    const accordionParent = screen.getByRole("button");
    expect(accordionParent).toHaveAttribute("aria-expanded", "true");
  });

  test("DOIT afficher Parent au singulier dans le titre QUAND un seul parent est présent", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionParents
          parents={mapTitulairesCreation([parents[0]])}
        />
      );
    });

    const titreAccordion = screen.getByText("Parent");

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
    });
  });

  test("DOIT afficher les données des parents correctement dans l'accordion", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionParents
          parents={mapTitulairesCreation([parents[0]])}
        />
      );
    });

    const titreAccordion = screen.getByText("Parent");
    const nomNaissance = screen.getAllByLabelText("Nom naissance")[0];
    const prenoms = screen.getByLabelText("Prénoms");
    const sexe = screen.getByLabelText("Sexe");
    const dateLieuNaissance = screen.getByLabelText(
      "Date et lieu de naissance"
    );
    const paysStatutRefugie = screen.getByLabelText("Pays statut réfugié");
    const paysOrigine = screen.getByLabelText("Pays d'origine");
    const dateMariage = screen.getByLabelText("Date de mariage");

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
      expect(nomNaissance).toHaveAttribute("title", "nomNaissance");
      expect(prenoms).toHaveAttribute("title", "Tititusse, Tititusse2");
      expect(sexe).toHaveAttribute("title", "Masculin");
      expect(dateLieuNaissance).toHaveAttribute(
        "title",
        "12/12/2022, Lucerne (Suisse)"
      );
      expect(paysStatutRefugie).toHaveAttribute(
        "title",
        "paysStatutRefugie paysStatutRefugie"
      );
      expect(paysOrigine).toHaveAttribute("title", "Tunisie");
      expect(dateMariage).toHaveAttribute(
        "title",
        "01/01/01, Nantes (Clisson)"
      );
    });
  });
});
