import { Qualite } from "@model/requete/enum/Qualite";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import { IRequerant } from "@model/requete/IRequerant";
import { AccordionTranscriptionRequerant } from "@pages/requeteCreation/apercuRequete/transcription/composants/resumesRequete/AccordionTranscriptionRequerant";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";

const requerant = {
  lienRequerant: {
    id: "f5ae56a0-4701-430f-a366-388e7dcc977d",
    lien: TypeLienRequerant.getEnumFor("PERE_MERE")
  },
  nomFamille: "nomRequerant",
  prenom: "prenomRequerant2",
  adresse: {
    ligne2: "ligne2",
    ligne3: "ligne3",
    ligne4: "ligne4",
    ligne5: "ligne5",
    codePostal: "44000",
    ville: "Alger",
    pays: "Maroc"
  },
  courriel: "adresseCourriel",
  telephone: "numeroTelephone",
  courrielAutreContact: "adresseCourielAutreContact",
  telephoneAutreContact: "numeroTelephoneAutreContact",
  qualiteRequerant: {
    qualite: Qualite.getEnumFor("PARTICULIER")
  },
  dateCreation: new Date(),
  id: "f5aebc33-921f-4241-8071-d2610ec32927"
} as IRequerant;

describe("Test du composant accordion requerant", () => {
  test("DOIT afficher l'accordion requerant non expanded à l'arrivée sur la page", async () => {
    await act(async () => {
      render(<AccordionTranscriptionRequerant requerant={{} as IRequerant} />);
    });

    const accordionRequerant = screen.getByRole("button");
    expect(accordionRequerant).toHaveAttribute("aria-expanded", "false");
  });

  test("DOIT afficher les données du requerant correctement dans l'accordion", async () => {
    await act(async () => {
      render(
        <AccordionTranscriptionRequerant
          requerant={{
            ...requerant
          }}
        />
      );
    });

    const titreAccordion = screen.getAllByText("Requérant")[0];
    const requerantLabel: HTMLElement =
      screen.getAllByLabelText("Requérant")[0];
    const coordonnees = screen.getByLabelText("Coordonnées");
    const adresseCourriel = screen.getByLabelText("Adresse courriel");
    const tel = screen.getByLabelText("Tél");
    const autreCourriel = screen.getByLabelText("Autre courriel");
    const autreTel = screen.getByLabelText("Autre tél");

    const coordonneesFormate = `nomRequerant prenomRequerant2
ligne2 
ligne3 
ligne4 
ligne5 
44000 Alger 
Maroc`;

    await waitFor(() => {
      expect(titreAccordion).toBeDefined();
      expect(requerantLabel).toHaveAttribute("title", "Père/mère");
      expect(coordonnees).toHaveAttribute("title", coordonneesFormate);
      expect(adresseCourriel).toHaveAttribute("title", "adresseCourriel");
      expect(tel).toHaveAttribute("title", "numeroTelephone");
      expect(autreCourriel).toHaveAttribute(
        "title",
        "adresseCourielAutreContact"
      );
      expect(autreTel).toHaveAttribute("title", "numeroTelephoneAutreContact");
    });
  });
});
