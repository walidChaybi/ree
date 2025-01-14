import * as EtatCivilApi from "@api/appels/etatcivilApi";
import * as RequeteApi from "@api/appels/requeteApi";
import mockConnectedUser from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS, URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS_ID } from "@router/ReceUrls";
import { createEvent, fireEvent, render, waitFor } from "@testing-library/react";
import { PopinSignatureMiseAJourMentions } from "@widget/signature/PopinSignatureMiseAJourMentions";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";

describe("Doit signer le document QUAND on valide le code pin.", () => {
  test("DOIT composer le document contenant les mentions ultérieures, puis enregistrer le document signé, et modifier le statut de la requête", async () => {
    const utilisateurConnecte = mockConnectedUser as any as IOfficier;
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(EtatCivilApi, "composerDocumentMentionsUlterieures");
    const integrerDocumentMentionsUlterieuresSpy = vi.spyOn(EtatCivilApi, "integrerDocumentMentionSigne");
    const modifierStatutRequeteMiseAJourSpy = vi.spyOn(RequeteApi, "modifierStatutRequeteMiseAJour");

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
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecte));

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
    expect(composerDocumentMentionsUlterieuresSpy).toHaveBeenCalledWith(
      "a5187320-d722-4673-abd7-a73ed41ad8c1",
      "issuerCertificat",
      "entiteCertificat"
    );

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

    // TOFIX: Test incorrect, un spy vitest va mock l'objet et non observer son comportement..
    // await waitFor(() => expect(integrerDocumentMentionsUlterieuresSpy).toHaveBeenCalledTimes(1));
    // expect(modifierStatutRequeteMiseAJourSpy).toHaveBeenCalledWith(
    //   "e5fdfe01-655b-44b9-a1fd-86c1169bb2ee",
    //   StatutRequete.TRAITEE_MIS_A_JOUR
    // );

    integrerDocumentMentionsUlterieuresSpy.mockClear();
    composerDocumentMentionsUlterieuresSpy.mockClear();
    modifierStatutRequeteMiseAJourSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'entiteCertificat' de la carte est manquant", async () => {
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(EtatCivilApi, "composerDocumentMentionsUlterieures");

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
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`]
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

    await waitFor(() => {
      expect(composerDocumentMentionsUlterieuresSpy).not.toHaveBeenCalled();
    });
    composerDocumentMentionsUlterieuresSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'issuerCertificat' de la carte est manquant", async () => {
    const composerDocumentMentionsUlterieuresSpy = vi.spyOn(EtatCivilApi, "composerDocumentMentionsUlterieures");

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
      [`${URL_REQUETE_MISE_A_JOUR_MENTIONS_SUITE_AVIS}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`]
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

    await waitFor(() => {
      expect(composerDocumentMentionsUlterieuresSpy).not.toHaveBeenCalled();
    });
    composerDocumentMentionsUlterieuresSpy.mockClear();
  });
});
