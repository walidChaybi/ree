import * as EtatCivilApi from "@api/appels/etatcivilApi";
import * as RequeteApi from "@api/appels/requeteApi";
import mockConnectedUser from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import {
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS,
  URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID
} from "@router/ReceUrls";
import {
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("render PopinSignatureMiseAJourMentions QUAND on ouvre la popin", () => {
  const message =
    "En cliquant sur VALIDER, vous acceptez de signer électroniquement la ou les mentions apposée(s) qui comporteront les données suivantes insérées automatiquement : lieu et date d’apposition, qualité du signataire, prénom et nom usuels dans le dispositif de création de signature qualifiée.";
  waitFor(() => {
    expect(screen.queryByText("Signature des mentions")).toBeNull();
    expect(screen.queryByText(message)).toBeNull();
  });

  render(
    <MemoryRouter>
      <PopinSignatureMiseAJourMentions
        estOuvert={true}
        setEstOuvert={() => {}}
        actionApresSignatureReussie={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </MemoryRouter>
  );
  waitFor(() => {
    expect(screen.queryByText("Signature des mentions")).toBeDefined();
    expect(screen.getByText(message)).toBeDefined();
  });
});

describe("Doit signer le document QUAND on valide le code pin.", () => {
  test("DOIT composer le document contenant les mentions ultérieures, puis enregistrer le document signé, et modifier le statut de la requête", () => {
    storeRece.utilisateurCourant = mockConnectedUser as any as IOfficier;
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(
      EtatCivilApi,
      "composerDocumentMentionsUlterieures"
    );
    const integrerDocumentMentionsUlterieuresSpy = vi.spyOn(
      EtatCivilApi,
      "integrerDocumentMentionSigne"
    );
    const modifierStatutRequeteMiseAJourSpy = vi.spyOn(
      RequeteApi,
      "modifierStatutRequeteMiseAJour"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
          element: (
            <PopinSignatureMiseAJourMentions
              estOuvert={true}
              setEstOuvert={() => {}}
              actionApresSignatureReussie={() => {}}
            />
          )
        }
      ],
      [
        `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    render(<RouterProvider router={router} />);

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "documentFictif",
            erreur: null,
            infosSignature: {
              issuerCertificat: "issuerCertificat",
              entiteCertificat: "entiteCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    // Test la composition du document final
    waitFor(() => {
      expect(composerDocumentMentionsUlterieuresSpy).toHaveBeenCalledWith(
        "a5187320-d722-4673-abd7-a73ed41ad8c1",
        "issuerCertificat",
        "entiteCertificat"
      );
    });

    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "documentFinalCompose",
            erreur: null,
            infosSignature: {
              issuerCertificat: "issuerCertificat",
              entiteCertificat: "entiteCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    waitFor(() => {
      expect(integrerDocumentMentionsUlterieuresSpy).toHaveBeenCalledTimes(1);
      expect(modifierStatutRequeteMiseAJourSpy).toHaveBeenCalledWith(
        "e5fdfe01-655b-44b9-a1fd-86c1169bb2ee",
        StatutRequete.TRAITEE_MIS_A_JOUR
      );
    });

    integrerDocumentMentionsUlterieuresSpy.mockClear();
    composerDocumentMentionsUlterieuresSpy.mockClear();
    modifierStatutRequeteMiseAJourSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'entiteCertificat' de la carte est manquant", () => {
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(
      EtatCivilApi,
      "composerDocumentMentionsUlterieures"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
          element: (
            <PopinSignatureMiseAJourMentions
              estOuvert={true}
              setEstOuvert={() => {}}
              actionApresSignatureReussie={() => {}}
            />
          )
        }
      ],
      [
        `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    render(<RouterProvider router={router} />);

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "",
            erreur: null,
            infosSignature: {
              issuerCertificat: "issuerCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    waitFor(() => {
      expect(composerDocumentMentionsUlterieuresSpy).not.toHaveBeenCalled();
    });
    composerDocumentMentionsUlterieuresSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'issuerCertificat' de la carte est manquant", () => {
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(
      EtatCivilApi,
      "composerDocumentMentionsUlterieures"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID,
          element: (
            <PopinSignatureMiseAJourMentions
              estOuvert={true}
              setEstOuvert={() => {}}
              actionApresSignatureReussie={() => {}}
            />
          )
        }
      ],
      [
        `${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    render(<RouterProvider router={router} />);

    // Simulation d'une signature réussie.
    fireEvent(
      window,
      // @ts-ignore
      createEvent(
        "signWebextResponse",
        window,
        {
          detail: {
            direction: "to-call-app",
            document: "",
            erreur: null,
            infosSignature: {
              entiteCertificat: "entiteCertificat",
              autresInformation: "autresInformation"
            }
          }
        },
        { EventType: "CustomEvent" }
      )
    );

    waitFor(() => {
      expect(composerDocumentMentionsUlterieuresSpy).not.toHaveBeenCalled();
    });
    composerDocumentMentionsUlterieuresSpy.mockClear();
  });
});
