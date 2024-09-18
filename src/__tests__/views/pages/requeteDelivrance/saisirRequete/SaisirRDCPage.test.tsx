import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitnonCOMEDEC
} from "@mock/data/mockConnectedUserAvecDroit";
import {
  idRequeteRDCPourModification,
  idRequeteRDCPourModificationMaCorbeille
} from "@mock/data/requeteDelivrance";
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
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const saisieRDC = () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
};

const modificationRDC = () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );
};

const contextes = {
  saisieRDC,
  modificationRDC
};

const getInput = (label: string): HTMLInputElement =>
  screen.getByLabelText(label) as HTMLInputElement;

const changeInput = (
  value: string,
  element: Document | Node | Element | Window
) =>
  fireEvent.change(element, {
    target: {
      value
    }
  });

beforeEach(() => {
  contextes.saisieRDC();
});

test("renders formulaire de saisie d'une Requête de Délivrance Extrait Copie", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
        element: <SaisirRDCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
  );

  render(<RouterProvider router={router} />);

  const titre = SousTypeDelivrance.getEnumFor("RDC").libelle;

  waitFor(() => {
    expect(document.title).toBe(titre);
    expect(screen.getByText(titre)).toBeDefined();
  });
});

test("renders formulaire de modification d'une Requête de Délivrance Extrait Copie", async () => {
  contextes.modificationRDC();

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
        element: <SaisirRDCPage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
        idRequeteRDCPourModification
      )
    ]
  );

  render(<RouterProvider router={router} />);

  const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
  const inputPrenomNaissance = getInput("titulaire1.prenoms.prenom1");

  await waitFor(() => {
    expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
    expect(inputPrenomNaissance.value).toEqual("PrenomRDCModifiée");
  });
});

test(`test du bouton "mettre en majuscule" pour le nom d'une Requête de Délivrance Extrait Copie`, async () => {
  contextes.modificationRDC();

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
        element: <SaisirRDCPage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
        idRequeteRDCPourModification
      )
    ]
  );

  render(<RouterProvider router={router} />);

  const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
  const buttonChampEnMajuscule = screen.getAllByTestId(
    "BoutonChampEnMajuscule"
  )[0] as HTMLButtonElement;

  await waitFor(() => {
    expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
  });

  fireEvent.click(buttonChampEnMajuscule);

  await waitFor(() => {
    expect(inputNomNaissance.value).toEqual("NOMRDCMODIFIÉE");
  });
});

test("Validation d'une modification de Requête de Délivrance Extrait Copie", async () => {
  contextes.modificationRDC();

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,

        element: <SaisirRDCPage />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          idRequeteRDCPourModificationMaCorbeille
        ),
        element: <ApercuRequetePriseEnChargePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
        idRequeteRDCPourModificationMaCorbeille
      )
    ]
  );

  render(<RouterProvider router={router} />);

  const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
  const buttonValider = screen.getByText(/Valider/i) as HTMLButtonElement;

  await waitFor(() => {
    expect(buttonValider.disabled).toBeTruthy();
  });

  changeInput("DUPONT", inputNomNaissance);

  waitFor(() => {
    expect(inputNomNaissance.value).toBe("DUPONT");
    expect(buttonValider.disabled).toBeFalsy();
  });

  fireEvent.click(buttonValider);

  waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      idRequeteRDCPourModificationMaCorbeille
    );
  });
});

test("test onChangeNature", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
        element: <SaisirRDCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
  );

  render(<RouterProvider router={router} />);

  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;

  waitFor(() => {
    expect(inputNatureActe).toBeDefined();
  });

  changeInput("NAISSANCE", inputNatureActe);

  waitFor(() => {
    expect(inputNatureActe.value).toBe("NAISSANCE");
  });

  changeInput("MARIAGE", inputNatureActe);

  waitFor(() => {
    expect(inputNatureActe.value).toBe("MARIAGE");
  });
});

test("test onChangeRequerant", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
        element: <SaisirRDCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
  );

  render(<RouterProvider router={router} />);

  // Mandataire
  const inputMandataire = getInput("requerant.typerequerant.mandataire");

  fireEvent.click(inputMandataire);

  waitFor(() => {
    const inputRaisonSociale = getInput("requerant.mandataire.raisonSociale");
    expect(inputRaisonSociale).toBeDefined();
  });

  // Institutionnel
  const inputInstitutionnel = getInput(
    "requerant.typerequerant.institutionnel"
  );

  fireEvent.click(inputInstitutionnel);

  waitFor(() => {
    expect(
      screen.getByLabelText("requerant.institutionnel.nomInstitution")
    ).toBeDefined();
  });

  // Particulier
  const inputParticulier = getInput("requerant.typerequerant.particulier");

  fireEvent.click(inputParticulier);

  waitFor(() => {
    expect(
      screen.getByLabelText("requerant.particulier.nomNaissance")
    ).toBeDefined();
  });

  // Autre Professionnel
  const inputAutreProfessionnel = getInput(
    "requerant.typerequerant.autre_professionnel"
  );

  fireEvent.click(inputAutreProfessionnel);

  waitFor(() => {
    expect(
      screen.getByLabelText("requerant.autreProfessionnel.raisonSociale")
    ).toBeDefined();
  });
});

test.skip("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie DECES", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
        element: <SaisirRDCPage />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          "1072bc37-f889-4365-8f75-912166b767dd"
        ),
        element: <ApercuRequetePriseEnChargePage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
  );

  render(<RouterProvider router={router} />);

  // Champs Requete
  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId(
    "requete.documentDemande"
  ) as HTMLSelectElement;
  const inputNbExemplaire = getInput("requete.nbExemplaire");
  const inputMotif = screen.getByTestId("requete.motif") as HTMLSelectElement;

  changeInput("DECES", inputNatureActe);

  waitFor(() => {
    expect(inputNatureActe.value).toEqual("DECES");
  });

  // Champs Evenement
  const inputAnneeEvenement = getInput("evenement.dateEvenement.annee");

  changeInput("mockPaysEvenement", getInput("evenement.paysEvenement"));
  changeInput("mockVilleEvenement", getInput("evenement.villeEvenement"));
  changeInput("1990", getInput("evenement.dateEvenement.annee"));

  waitFor(() => {
    expect(inputAnneeEvenement.value).toEqual("1990");
  });

  const ajouterFiliation = screen.getByText(/Ajouter une filiation/i);

  fireEvent.click(ajouterFiliation);

  waitFor(() => {
    expect(screen.getByText(/Supprimer une filiation/i)).toBeDefined();
  });

  // Champs Filiation
  const inputNomParent1 = getInput("titulaire1.parent1.nomNaissance");
  const inputNomParent2 = getInput("titulaire1.parent2.nomNaissance");
  const submit = screen.getByText(/Prendre en charge/i);

  changeInput("mockNom1", inputNomParent1);
  changeInput("mockNom2", inputNomParent2);

  changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);

  waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  changeInput("1", inputNbExemplaire);

  waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    );
  });

  fireEvent.click(submit);

  waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});

test.skip("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie NAISSANCE", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
        element: <SaisirRDCPage />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          "1072bc37-f889-4365-8f75-912166b767dd"
        ),
        element: <ApercuRequetePriseEnChargePage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC]
  );

  render(<RouterProvider router={router} />);

  const submit = screen.getByText(/Prendre en charge/i);

  // Champs Requete
  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId(
    "requete.documentDemande"
  ) as HTMLSelectElement;
  const inputNbExemplaire = getInput("requete.nbExemplaire");
  const inputMotif = screen.getByTestId("requete.motif") as HTMLSelectElement;

  changeInput("NAISSANCE", inputNatureActe);

  waitFor(() => {
    expect(inputNatureActe.value).toEqual("NAISSANCE");
  });

  // Champs Evenement
  const inputPaysEvenement = getInput("titulaire1.naissance.paysEvenement");
  const inputVilleEvenement = getInput("titulaire1.naissance.villeEvenement");
  const inputAnneeEvenement = getInput(
    "titulaire1.naissance.dateEvenement.annee"
  );

  changeInput("mockPaysEvenement", inputPaysEvenement);
  changeInput("mockVilleEvenement", inputVilleEvenement);
  changeInput("1990", inputAnneeEvenement);

  waitFor(() => {
    expect(inputAnneeEvenement.value).toEqual("1990");
  });

  changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);

  waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  changeInput("1", inputNbExemplaire);

  waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    );
  });

  fireEvent.click(submit);

  waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});
