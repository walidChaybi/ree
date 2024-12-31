import { acteDeces } from "@mock/data/ficheEtBandeau/ficheActe";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDocumentReponse } from "@model/requete/IDocumentReponse";
import {
  genererListeAjoutComplementaire,
  getTypeDocument,
  ItemListe
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/OngletsDocumentsEditesUtils";
import { PATH_EDITION, URL_MES_REQUETES_DELIVRANCE, URL_MES_REQUETES_DELIVRANCE_EDITION_ID } from "@router/ReceUrls";
import { render, waitFor } from "@testing-library/react";
import { RouterProvider } from "react-router-dom";
import { beforeAll, describe, expect, test } from "vitest";
import PageEditionRequeteDelivrance from "../../../../../../pages/requetesDelivrance/PageEditionRequeteDelivrance";
import { createTestingRouter, mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

const documentResponse = [
  {
    id: "f03efb62-6637-4a71-85bc-78ff7909b647",
    nom: "Délivrance d'acte (116)",
    typeDocument: "cb1f3518-9457-471d-a31c-10bc8d34c9a2",
    mimeType: "application/pdf",
    taille: 51636,
    nbPages: 1,
    orientation: "Portrait",
    referenceSwift: "f03d40e8-b079-4246-84c0-64553087de2d_f03e1eaf-a950-435f-bf2f-8ea5f14e1217.pdf",
    conteneurSwift: "documents-delivres-2022-9",
    optionsCourrier: [],
    mentionsRetirees: [],
    ordre: 0,
    contenu: "contenu",
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
    validation: "O"
  },
  {
    id: "f03ebcee-b39c-44d4-bdd8-7156c2736698",
    nom: "Extrait plurilingue",
    typeDocument: "ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6",
    mimeType: "application/pdf",
    taille: 80976,
    contenu: "contenu",
    nbPages: 2,
    orientation: "Portrait",
    referenceSwift: "f03d40e8-b079-4246-84c0-64553087de2d_f03e9b2f-fb3f-45f0-a6df-d86747226836.pdf",
    conteneurSwift: "documents-delivres-2022-9",
    validation: "O",
    idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134a",
    optionsCourrier: [],
    mentionsRetirees: [],
    ordre: 1
  }
] as IDocumentReponse[];

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

describe("Test onglets documents édites", () => {
  test("Doit retourner le bon type de document", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(getTypeDocument(0)).toBe("ff7fe1fa-a2d6-4bc5-8681-deba65d9e2c6");
      expect(getTypeDocument(1)).toBe("318a2726-0d04-4558-8b36-8fe48780def5");
      expect(getTypeDocument(2)).toBe("28580709-06dd-4df2-bf6e-70a9482940a1");
      expect(getTypeDocument(3)).toBe("0e1e909f-f74c-4b16-9c03-b3733354c6ce");
      expect(getTypeDocument(4)).toBe("");
    });
  });

  test("Doit générer la bonne liste complémentaire", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_EDITION_ID,
          element: <PageEditionRequeteDelivrance />
        }
      ],
      [`${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/9bfa282d-1e66-4538-b242-b9de4f683f77/19c0d767-64e5-4376-aa1f-6d781a2a235a`]
    );

    render(<RouterProvider router={router} />);

    let listePlus: ItemListe[];
    const listePlusAttendu: ItemListe[] = [{ label: "Copie intégrale", value: 3 }];

    await waitFor(() => {
      listePlus = genererListeAjoutComplementaire(documentResponse, acteDeces as any as IFicheActe);
    });

    await waitFor(() => {
      expect(listePlus).toStrictEqual(listePlusAttendu);
    });
  });
});
