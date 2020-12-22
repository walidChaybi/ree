import React from "react";
import { render, screen } from "@testing-library/react";
import { BoutonSignature } from "../../../../views/common/widget/signature/BoutonSignature";
import { fireEvent } from "@testing-library/react";
import { StatutRequete } from "../../../../model/requete/StatutRequete";

test("renders titre bouton signature", () => {
  render(
    <BoutonSignature
      libelle={"pages.delivrance.action.signature"}
      requetes={[
        {
          idRequete: "104b8563-c7f8-4748-9daa-f26558985894",
          statut: StatutRequete.ASigner,
          reponse: {
            idReponse: "d2ec498c-5d2b-11ea-bc55-0242ac130003",
            dateTraitementDemat: 1581721200.0,
            dateDelivrance: 1581721200.0,
            natureActe: "NAISSANCE",
            jourEvenement: 1,
            moisEvenement: 1,
            anneeEvenement: 1983,
            villeEvenement: "fez",
            paysEvenement: "maroc",
            nomOec: "Garisson",
            prenomOec: "Juliette",
            documentsDelivres: [
              {
                idDocumentDelivre: "g9279c00-5d2b-11ea-bc55-0242ac130003",
                nom: "Naissance mock copie plurilingue",
                conteneurSwift: "",
                contenu: "",
                typeDocument: "EXTRAIT_PLURILINGUE",
                mimeType: "application/pdf",
                taille: 12,
                identifiantSwift: "b9bc2637eb612d9e0cd5d7bfb1a94207",
                reponse: null,
                avecCtv: true
              }
            ]
          }
        }
      ]}
      reloadData={() => {
        return null;
      }}
    />
  );
  const linkElement = screen.getByText(/Signer le lot/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  expect(screen.getByText(/Signature des documents/i)).toBeDefined();
});
