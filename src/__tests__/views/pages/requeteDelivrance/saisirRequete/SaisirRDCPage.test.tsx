import { mappingOfficier } from "@model/agent/IOfficier";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { ApercuRequetePriseEnChargePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import {
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getLastPathElem, getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { DOCUMENT_DELIVRANCE } from "../../../../mock/data/NomenclatureDocumentDelivrance";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitnonCOMEDEC
} from "../../../../mock/data/mockConnectedUserAvecDroit";
import { idRequeteRDCPourModification, idRequeteRDCPourModificationMaCorbeille } from "../../../../mock/data/requeteDelivrance";

describe("Test de la page EditionExtraitCopie", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

  const utilisateurConnecteSaisie = userDroitnonCOMEDEC; // Droit DELIVRER

  const utilisateurConnecteModification = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );

  const getInput = (label: string): HTMLInputElement => screen.getByLabelText(label);

  const changeInput = (value: string, element: Document | Node | Element | Window) =>
    fireEvent.change(element, {
      target: {
        value
      }
    });

  test("renders formulaire de saisie d'une Requête de Délivrance Extrait Copie", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteSaisie));

    const titre = SousTypeDelivrance.getEnumFor("RDC").libelle;

    await waitFor(() => {
      expect(document.title).toBe(titre);
      expect(screen.getByText(titre)).toBeDefined();
    });
  });

  test("renders formulaire de modification d'une Requête de Délivrance Extrait Copie", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
          element: <SaisirRDCPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID, idRequeteRDCPourModification)]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteModification));
    const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
    const inputPrenomNaissance = getInput("titulaire1.prenoms.prenom1");

    await waitFor(() => {
      expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
      expect(inputPrenomNaissance.value).toEqual("PrenomRDCModifiée");
    });
  });

  test(`test du bouton "mettre en majuscule" pour le nom d'une Requête de Délivrance Extrait Copie`, async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
          element: <SaisirRDCPage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID, idRequeteRDCPourModification)]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteModification));
    const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
    const buttonChampEnMajuscule = screen.getAllByTestId("BoutonChampEnMajuscule")[0] as HTMLButtonElement;

    await waitFor(() => {
      expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
    });

    fireEvent.click(buttonChampEnMajuscule);

    await waitFor(() => {
      expect(inputNomNaissance.value).toEqual("NOMRDCMODIFIÉE");
    });
  });

  test("Validation d'une modification de Requête de Délivrance Extrait Copie", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,

          element: <SaisirRDCPage />
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDCPourModificationMaCorbeille),
          element: <ApercuRequetePriseEnChargePage />
        }
      ],
      [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID, idRequeteRDCPourModificationMaCorbeille)]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteModification));
    const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
    const buttonValider: HTMLButtonElement = screen.getByText(/Valider/i);

    await waitFor(() => {
      expect(buttonValider.disabled).toBeTruthy();
    });

    changeInput("DUPONT", inputNomNaissance);

    await waitFor(() => {
      expect(inputNomNaissance.value).toBe("DUPONT");
      expect(buttonValider.disabled).toBeFalsy();
    });

    fireEvent.click(buttonValider);

    await waitFor(() => {
      expect(getLastPathElem(router.state.location.pathname)).toEqual(idRequeteRDCPourModificationMaCorbeille);
    });
  });

  test("test onChangeNature", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteSaisie));
    const inputNatureActe: HTMLSelectElement = screen.getByTestId("requete.natureActe");

    await waitFor(() => {
      expect(inputNatureActe).toBeDefined();
    });

    changeInput("NAISSANCE", inputNatureActe);

    await waitFor(() => {
      expect(inputNatureActe.value).toBe("NAISSANCE");
    });

    changeInput("MARIAGE", inputNatureActe);

    await waitFor(() => {
      expect(inputNatureActe.value).toBe("MARIAGE");
    });
  });

  test("test onChangeRequerant", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteSaisie));
    // Mandataire
    const inputMandataire = getInput("requerant.typerequerant.mandataire");

    fireEvent.click(inputMandataire);

    await waitFor(() => {
      const inputRaisonSociale = getInput("requerant.mandataire.raisonSociale");
      expect(inputRaisonSociale).toBeDefined();
    });

    // Institutionnel
    const inputInstitutionnel = getInput("requerant.typerequerant.institutionnel");

    fireEvent.click(inputInstitutionnel);

    await waitFor(() => {
      expect(screen.getByLabelText("requerant.institutionnel.nomInstitution")).toBeDefined();
    });

    // Particulier
    const inputParticulier = getInput("requerant.typerequerant.particulier");

    fireEvent.click(inputParticulier);

    await waitFor(() => {
      expect(screen.getByLabelText("requerant.particulier.nomNaissance")).toBeDefined();
    });

    // Autre Professionnel
    const inputAutreProfessionnel = getInput("requerant.typerequerant.autre_professionnel");

    fireEvent.click(inputAutreProfessionnel);

    await waitFor(() => {
      expect(screen.getByLabelText("requerant.autreProfessionnel.raisonSociale")).toBeDefined();
    });
  });

  test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie DECES", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "1072bc37-f889-4365-8f75-912166b767dd"),
          element: <ApercuRequetePriseEnChargePage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteSaisie));
    // Champs Requete
    const inputNatureActe: HTMLSelectElement = screen.getByTestId("requete.natureActe");
    const inputDocumentDemande: HTMLSelectElement = screen.getByTestId("requete.documentDemande");
    const inputNbExemplaire = getInput("requete.nbExemplaire");
    const inputMotif: HTMLSelectElement = screen.getByTestId("requete.motif");

    changeInput("DECES", inputNatureActe);

    await waitFor(() => {
      expect(inputNatureActe.value).toEqual("DECES");
    });

    // Champs Evenement
    const inputAnneeEvenement = getInput("evenement.dateEvenement.annee");

    changeInput("mockPaysEvenement", getInput("evenement.paysEvenement"));
    changeInput("mockVilleEvenement", getInput("evenement.villeEvenement"));
    changeInput("1990", getInput("evenement.dateEvenement.annee"));

    await waitFor(() => {
      expect(inputAnneeEvenement.value).toEqual("1990");
    });

    const ajouterFiliation = screen.getByText(/Ajouter une filiation/i);

    fireEvent.click(ajouterFiliation);

    await waitFor(() => {
      expect(screen.getByText(/Supprimer une filiation/i)).toBeDefined();
    });

    // Champs Filiation
    const inputNomParent1 = getInput("titulaire1.parent1.nomNaissance");
    const inputNomParent2 = getInput("titulaire1.parent2.nomNaissance");
    const submit = screen.getByText(/Prendre en charge/i);

    changeInput("mockNom1", inputNomParent1);
    changeInput("mockNom2", inputNomParent2);

    changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);

    await waitFor(() => {
      expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
    });

    changeInput("1", inputNbExemplaire);

    await waitFor(() => {
      expect(inputNbExemplaire.value).toEqual("1");
    });

    changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);

    await waitFor(() => {
      expect(inputDocumentDemande.value).toEqual("0e1e909f-f74c-4b16-9c03-b3733354c6ce");
    });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(getLastPathElem(router.state.location.pathname)).toEqual("1072bc37-f889-4365-8f75-912166b767dd");
    });
  });

  test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie NAISSANCE", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        },
        {
          path: getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, "1072bc37-f889-4365-8f75-912166b767dd"),
          element: <ApercuRequetePriseEnChargePage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, utilisateurConnecteSaisie));
    const submit = screen.getByText(/Prendre en charge/i);

    // Champs Requete
    const inputNatureActe: HTMLSelectElement = screen.getByTestId("requete.natureActe");
    const inputDocumentDemande: HTMLSelectElement = screen.getByTestId("requete.documentDemande");
    const inputNbExemplaire = getInput("requete.nbExemplaire");
    const inputMotif: HTMLSelectElement = screen.getByTestId("requete.motif");

    changeInput("NAISSANCE", inputNatureActe);

    await waitFor(() => {
      expect(inputNatureActe.value).toEqual("NAISSANCE");
    });

    // Champs Evenement
    const inputPaysEvenement = getInput("titulaire1.naissance.paysEvenement");
    const inputVilleEvenement = getInput("titulaire1.naissance.villeEvenement");
    const inputAnneeEvenement = getInput("titulaire1.naissance.dateEvenement.annee");

    changeInput("mockPaysEvenement", inputPaysEvenement);
    changeInput("mockVilleEvenement", inputVilleEvenement);
    changeInput("1990", inputAnneeEvenement);

    await waitFor(() => {
      expect(inputAnneeEvenement.value).toEqual("1990");
    });

    changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);

    await waitFor(() => {
      expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
    });

    changeInput("1", inputNbExemplaire);

    await waitFor(() => {
      expect(inputNbExemplaire.value).toEqual("1");
    });

    changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);

    await waitFor(() => {
      expect(inputDocumentDemande.value).toEqual("0e1e909f-f74c-4b16-9c03-b3733354c6ce");
    });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(getLastPathElem(router.state.location.pathname)).toEqual("1072bc37-f889-4365-8f75-912166b767dd");
    });
  });
});
