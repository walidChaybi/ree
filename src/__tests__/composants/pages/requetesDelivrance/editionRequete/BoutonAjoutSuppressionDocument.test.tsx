import requeteDelivrance from "@mock/data/requeteDelivrance";
import { Orientation } from "@model/composition/enum/Orientation";
import { IProvenanceRece } from "@model/requete/IProvenanceRece";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import BoutonAjoutSuppressionDocument from "../../../../../composants/pages/requetesDelivrance/editionRequete/BoutonAjoutSuppressionDocument";
import {
  createTestingRouter,
  elementAvecEditionDelivranceContexte,
} from "../../../../__tests__utils__/testsUtil";

const mockDocument = {
  id: "doc",
  mimeType: "mimeType",
  taille: 10,
  contenu: "ContenuTest",
  nbPages: 1,
  orientation: Orientation.PORTRAIT,
  conteneurSwift: "conteneur",
  nom: "Document secondaire",
  typeDocument: "TYPE1",
};

const mockDocumentDelivrance = {
  principal: mockDocument,
  secondaire: { ...mockDocument, id: "doc2" },
};

const mockRequete = {
  ...requeteDelivrance,
  id: "9bfa282d-1e66-4538-b242-b9de4f683f0f",
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE,
  statutCourant: { statut: StatutRequete.A_TRAITER },
  sousType: SousTypeDelivrance.RDC,
  documentsReponses: ["doc1, doc2"],
  provenanceRequete: {
    provenance: Provenance.SERVICE_PUBLIC,
    provenancePlanete: null,
    provenanceRece: {} as IProvenanceRece,
    provenanceServicePublic: {
      referenceDila: "MEL-8701",
    },
  },
} as unknown as IRequeteDelivrance;

test("Affiche le bouton ajouter lorsque le document secondaire n'existe pas", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/test",
        element: elementAvecEditionDelivranceContexte(
          <BoutonAjoutSuppressionDocument
            documentsDelivrance={{
              principal: null,
              secondaire: null,
            }}
            naviguerVersOngletAjoute={() => {}}
          />,
          mockRequete,
        ),
      },
    ],
    ["/test"],
  );

  render(<RouterProvider router={router} />);
  await waitFor(() => {
    expect(screen.queryByText("Ajouter un document")).toBeDefined();
    expect(screen.queryByText("Supprimer Document secondaire")).toBeNull();
  });
});

test("Affiche le bouton suppression lorsque le document secondaire existe", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/test",
        element: elementAvecEditionDelivranceContexte(
          <BoutonAjoutSuppressionDocument
            documentsDelivrance={mockDocumentDelivrance}
            naviguerVersOngletAjoute={() => {}}
          />,
          mockRequete,
        ),
      },
    ],
    ["/test"],
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.queryByText("Supprimer Document secondaire")).toBeDefined();
    expect(screen.queryByText("Ajouter un document")).toBeNull();
  });
});

test("Ajoute un document au clic sur le bouton d'ajout", async () => {
  const mockDocument = {
    id: "doc",
    mimeType: "mimeType",
    taille: 10,
    contenu: "ContenuTest",
    nbPages: 1,
    orientation: Orientation.PORTRAIT,
    conteneurSwift: "conteneur",
    nom: "Document secondaire",
    typeDocument: "TYPE1",
  };

  const mockDocumentDelivrance = {
    principal: mockDocument,
    secondaire: null,
  };
  const naviguerVersOngletAjoute = vi.fn();

  const router = createTestingRouter(
    [
      {
        path: "/test",
        element: elementAvecEditionDelivranceContexte(
          <BoutonAjoutSuppressionDocument
            documentsDelivrance={mockDocumentDelivrance}
            naviguerVersOngletAjoute={naviguerVersOngletAjoute}
          />,
          mockRequete,
        ),
      },
    ],
    ["/test"],
  );

  render(<RouterProvider router={router} />);

  fireEvent.click(screen.getByTestId("AddIcon"));
  await waitFor(() => {
    expect(screen.queryByText("Copie intégrale")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Copie intégrale"));
  await waitFor(() => {
    expect(naviguerVersOngletAjoute).toHaveBeenCalled();
  });
});
