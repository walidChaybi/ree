import { mapTitulairesCreation } from "@hook/requete/DetailRequeteHook";
import { ITitulaireRequeteCreation } from "@model/requete/ITitulaireRequeteCreation";
import {
  AccordionTranscriptionTitulaire,
  formatNomsEtNomSouhaite
} from "@pages/requeteCreation/apercuRequete/transcription/composants/resumesRequete/AccordionTranscriptionTitulaire";
import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const titulaires = [
  {
    nomNaissance: "Michel",
    nomSouhaite: "nomSouhaite",
    prenoms: [
      {
        numeroOrdre: 1,
        prenom: "Tyler"
      },
      {
        numeroOrdre: 2,
        prenom: "Jacques"
      }
    ],
    evenementUnions: [
      {
        type: "RECONNAISSANCE",
        dateFormatee: "01/01/02",
        lieuFormate: "Nantes (Gorges)"
      }
    ],
    sexe: "MASCULIN",
    dateNaissanceFormatee: "12/12/2022",
    lieuNaissanceFormate: "Lucerne (Suisse) Lucerne (Suisse) (Suisse) (Suisse)"
  },
  {
    nomNaissance: "Mangin",
    nomSouhaite: null,
    prenoms: ["SPC"],
    sexe: "FEMININ",
    dateLieuNaissance: "12/12/2022, Lucerne (Suisse)"
  }
];

describe.skip("Test du composant accordion titulaires correctement", () => {
  test("DOIT afficher l'accordion parent expanded à l'arrivée sur la page", async () => {
    await act(async () => {
      render(<AccordionTranscriptionTitulaire titulaires={[]} />);
    });

    const accordionParent = screen.getByRole("button");
    // TO FIX
    // expect(accordionParent).toHaveAttribute("aria-expanded", "true");
  });

  test("DOIT afficher Titulaire au singulier dans le titre QUAND un seul titulaire est présent", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionTitulaire
          titulaires={mapTitulairesCreation([titulaires[0]])}
        />
      );
    });

    const titreAccordion = screen.getByText("Titulaire");

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
    });
  });

  test("DOIT afficher Titulaire au pluriel dans le titre QUAND deux titulaires sont présent", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionTitulaire
          titulaires={mapTitulairesCreation(titulaires)}
        />
      );
    });

    const titreAccordion = screen.getByText("Titulaires");

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
    });
  });

  test("DOIT afficher les données des titulaires correctement dans l'accordion", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionTitulaire
          titulaires={mapTitulairesCreation([titulaires[0]])}
        />
      );
    });

    const titreAccordion = screen.getByText("Titulaire");
    const nomNaissanceEtSouhaite = screen.getByLabelText(
      "Nom naissance et nom souhaité"
    );
    const prenoms = screen.getByLabelText("Prénoms");
    const sexe = screen.getByLabelText("Sexe");
    const dateNaissance = screen.getByLabelText("Date de naissance");
    const lieuNaissance = screen.getByLabelText("Lieu de naissance");
    const dateLieuReconnaissance = screen.getByLabelText("Reconnaissance");

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
      // TO FIX
      // expect(nomNaissanceEtSouhaite).toHaveAttribute(
      //   "title",
      //   "Michel (souhaité : nomSouhaite)"
      // );
      // expect(prenoms).toHaveAttribute("title", "Tyler, Jacques");
      // expect(sexe).toHaveAttribute("title", "Masculin");
      // expect(dateNaissance).toHaveAttribute("title", "12/12/2022");

      // expect(lieuNaissance).toHaveAttribute(
      //   "title",
      //   "Lucerne (Suisse) Lucerne (Suisse) (Suisse) (Suisse)"
      // );
      // expect(dateLieuReconnaissance).toHaveAttribute(
      //   "title",
      //   "01/01/02, Nantes (Gorges)"
      // );
    });
  });

  test("DOIT formater correctement les noms et nom souhaité", async () => {
    const titulaire = {
      nomNaissance: "Rachid",
      nomSouhaite: "Rachida"
    } as any as ITitulaireRequeteCreation;
    await act(async () => {
      const nomsEtNomSouhaite = formatNomsEtNomSouhaite(titulaire);

      await waitFor(() => {
        expect(nomsEtNomSouhaite).toBe("Rachid (souhaité : Rachida)");
      });
    });
  });
});
