import * as EtatCivilApi from "@api/appels/etatcivilApi";
import * as RequeteApi from "@api/appels/requeteApi";
import mockConnectedUser from "@mock/data/connectedUser.json";
import { IOfficier } from "@model/agent/IOfficier";
import { ApercuRequeteEtablissementActeRegistrePage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
  URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID
} from "@router/ReceUrls";
import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { PopinSignatureCreationEtablissement } from "@widget/signature/PopinSignatureCreationEtablissement";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

describe("Doit afficher la popin de signature lors de la création d'un acte", () => {
  test("DOIT afficher la popin de signature basique", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(
        screen.getAllByRole("presentation")[0].getAttribute("class")
      ).toContain("popin-signature");
    });
  });

  test("DOIT afficher le titre de la popin de signature de création", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Signature du document")).toBeInTheDocument();
    });
  });

  test("DOIT afficher le texte indicatif de la popin de signature de création", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "En cliquant sur VALIDER, vous acceptez de signer électroniquement un document qui comportera les données suivantes insérées automatiquement : un numéro d’ordre, constitutif " +
            "de la référence de l’acte dans le RECE, informatiquement attribué selon une numérotation chronologique annuelle ; la formule de désignation de l’officier de l’état civil, " +
            "comprenant ses nom et prénom usuel contenus dans le dispositif de création de signature qualifiée, ses fonctions, et le nom de la ville où il exerce ; la date de signature."
        )
      ).toBeInTheDocument();
    });
  });
});

describe("Doit signer le document QUAND on valide le code pin.", () => {
  test("DOIT composer le document final, puis enregistrer le document final signé, puis modifier le statut de la requete et l'avancement du projet d'acte", async () => {
    storeRece.utilisateurCourant = mockConnectedUser as any as IOfficier;
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );
    const integrerActeSigneSpy = jest.spyOn(EtatCivilApi, "integrerActeSigne");
    const mettreAJourStatutApresSignatureSpy = jest.spyOn(
      RequeteApi,
      "mettreAJourStatutApresSignature"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        },
        {
          path: URL_REQUETES_CREATION_SERVICE_ETABLISSEMENT_APERCU_ACTE_REGISTRE_ID,
          element: <ApercuRequeteEtablissementActeRegistrePage />
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

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
    await waitFor(() => {
      expect(composerDocumentFinalSpy).toHaveBeenCalledWith(
        "d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca",
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

    // Test l'intégration du document final signé
    await waitFor(() => {
      expect(integrerActeSigneSpy).toHaveBeenCalledTimes(1);
    });

    // Test la modification du statut de la requete et de l'avancement du projet d'acte
    await waitFor(() => {
      expect(mettreAJourStatutApresSignatureSpy).toHaveBeenCalledWith(
        "e5fdfe01-655b-44b9-a1fd-86c1169bb2ee",
        "a5187320-d722-4673-abd7-a73ed41ad8c1"
      );
    });

    // Clear mocks
    integrerActeSigneSpy.mockClear();
    mettreAJourStatutApresSignatureSpy.mockClear();
    composerDocumentFinalSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'entiteCertificat' de la carte est manquant", async () => {
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

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
      expect(composerDocumentFinalSpy).not.toHaveBeenCalled();
    });
    composerDocumentFinalSpy.mockClear();
  });

  test("NE DOIT PAS composer le document final si l'information 'issuerCertificat' de la carte est manquant", async () => {
    const composerDocumentFinalSpy = jest.spyOn(
      EtatCivilApi,
      "composerDocumentFinal"
    );

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SAISIE_PROJET_ID,
          element: (
            <PopinSignatureCreationEtablissement
              idActe="d4cb23fa-31e9-4ffc-9fd4-d313ec7dc2ca"
              estOuvert={true}
              setEstOuvert={() => {}}
            />
          )
        }
      ],
      [
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SAISIE_PROJET}/e5fdfe01-655b-44b9-a1fd-86c1169bb2ee/a5187320-d722-4673-abd7-a73ed41ad8c1`
      ]
    );

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

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
      expect(composerDocumentFinalSpy).not.toHaveBeenCalled();
    });
    composerDocumentFinalSpy.mockClear();
  });
});
