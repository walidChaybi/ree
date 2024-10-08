import {
  userDroitConsulterArchive,
  userDroitnonCOMEDEC
} from "@mock/data/mockConnectedUserAvecDroit";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SaisirRDCSCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import {
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getLastPathElem, getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import {
  createTestingRouter,
  elementAvecContexte
} from "../../../../__tests__utils__/testsUtil";

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );

  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;
  waitFor(() => {
    expect(document.title).toBe(titre);
    expect(screen.getByText(titre)).toBeDefined();
  });
});

test.skip("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          "1072bc37-f889-4365-8f75-912166b767dd"
        ),
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande = screen.getByTestId(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  fireEvent.change(inputPaysNaissance, {
    target: {
      value: "mockPaysNaissance"
    }
  });
  fireEvent.change(inputVilleNaissance, {
    target: {
      value: "mockVilleNaissance"
    }
  });
  fireEvent.change(inputAnneeNaissance, {
    target: {
      value: "1990"
    }
  });

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
    }
  });
  fireEvent.blur(inputPaysNaissance);
  fireEvent.blur(inputVilleNaissance);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  const submit = screen.getByText(/Prendre en charge/i);
  fireEvent.click(submit);

  await waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in OUI.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande = screen.getByTestId(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;

  fireEvent.change(inputPaysNaissance, {
    target: {
      value: "mockPaysNaissance"
    }
  });

  waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText(/Prendre en charge/i);

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
    }
  });
  fireEvent.blur(inputPaysNaissance);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /Oui/i })).toBeDefined();
  });

  fireEvent.click(screen.getByRole("button", { name: /Oui/i }));
});

test.skip("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in NON.", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      },

      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          "1072bc37-f889-4365-8f75-912166b767dd"
        ),
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande = screen.getByTestId(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;

  fireEvent.change(inputPaysNaissance, {
    target: {
      value: "mockPaysNaissance"
    }
  });

  waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText(/Prendre en charge/i);

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
    }
  });
  fireEvent.blur(inputPaysNaissance);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /Non/i })).toBeDefined();
  });

  fireEvent.click(screen.getByRole("button", { name: /Non/i }));

  await waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});

test("test du Sauvegarder du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(
      <RouterProvider router={router} />,
      userDroitConsulterArchive
    )
  );
  const inputDocumentDemande = screen.getByTestId(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  fireEvent.change(inputPaysNaissance, {
    target: {
      value: "mockPaysNaissance"
    }
  });
  fireEvent.change(inputVilleNaissance, {
    target: {
      value: "mockVilleNaissance"
    }
  });
  fireEvent.change(inputAnneeNaissance, {
    target: {
      value: "1990"
    }
  });

  waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText("Sauvegarder");

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
    }
  });
  fireEvent.blur(inputPaysNaissance);
  fireEvent.blur(inputVilleNaissance);

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  fireEvent.click(submit);

  waitFor(() => {
    expect(getLastPathElem(router.state.location.pathname)).toEqual(
      "saisircertificatsituation"
    );
  });
});

test.skip("Remplissage du formulaire avec requete", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );

  const inputDocumentDemande = screen.getByTestId(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;
  const adresseVoie = screen.getByLabelText("adresse.voie") as HTMLInputElement;
  const adresseCodePostal = screen.getByLabelText(
    "adresse.codePostal"
  ) as HTMLInputElement;
  const requerantParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
    expect(inputPaysNaissance.value).toEqual("Samoa");
    expect(inputVilleNaissance.value).toEqual("Guangzhou");
    expect(inputAnneeNaissance.value).toEqual("1963");
    expect(adresseVoie.value).toEqual("5 place de l'Eglise");
    expect(adresseCodePostal.value).toEqual("44000");
    expect(requerantParticulier.value).toBeTruthy();
  });
});

const Labels = {
  documentDemande: "document",
  idAttestationPACS: "d08e2228-1a02-478f-939e-db5dd5ac6999",
  titulaire: {
    ajout: "Ajouter un titulaire",
    suppr: "Supprimer un titulaire"
  },
  titulaire2: {
    nom: "titulaires.titulaire2.noms.nomNaissance"
  },
  requerant: {
    titulaire2: "requerant.typerequerant.titulaire2"
  }
};

test(`Document demandé = "Attestation PACS" => bouton "ajouter un titulaire" visible, bouton "supprimer un titulaire" non visible`, async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  );
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );

  waitFor(() => {
    expect(boutonAjoutTitulaire).toBeNull();
    expect(boutonSupprimerTitulaire).toBeNull();
  });

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: Labels.idAttestationPACS
    }
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeDefined();
    expect(boutonSupprimerTitulaire).toBeNull();
  });
});

test(`Document demandé != "Attestation PACS" => bouton "ajouter un titulaire" & "supprimer titulaire" non visibles"`, () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  );
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );

  waitFor(() => {
    expect(boutonAjoutTitulaire).toBeNull();
    expect(boutonSupprimerTitulaire).toBeNull();
  });

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: Labels.idAttestationPACS
    }
  });

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: ""
    }
  });

  waitFor(() => {
    expect(boutonAjoutTitulaire).toBeNull();
    expect(boutonSupprimerTitulaire).toBeNull();
  });
});

test(`Clic sur "ajouter un titulaire" => bloc titulaire2 & bouton "supprimer un titulaire" & requérant titulaire2 visibles"`, () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  );
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );
  let nomNaissanceTitulaire2: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire2.nom
  );
  let requerantTitulaire2: HTMLElement | null = screen.queryByLabelText(
    Labels.requerant.titulaire2
  );

  fireEvent.change(inputDocumentDemande, {
    target: {
      value: Labels.idAttestationPACS
    }
  });

  waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeDefined();
  });

  act(() => {
    if (boutonAjoutTitulaire) fireEvent.click(boutonAjoutTitulaire);
  });

  waitFor(() => {
    boutonAjoutTitulaire = screen.queryByLabelText(Labels.titulaire.ajout);
    boutonSupprimerTitulaire = screen.getByLabelText(Labels.titulaire.suppr);
    nomNaissanceTitulaire2 = screen.getByLabelText(Labels.titulaire2.nom);
    requerantTitulaire2 = screen.getByLabelText(Labels.requerant.titulaire2);

    expect(boutonAjoutTitulaire).toBeNull();
    expect(nomNaissanceTitulaire2).toBeDefined();
    expect(boutonSupprimerTitulaire).toBeDefined();
    expect(requerantTitulaire2).toBeDefined();
  });
});

test.skip(`Clic sur "supprimer un titulaire" => bloc titulaire2 & bouton "supprimer un titulaire" & requérant titulaire2 non visibles & requerant === titulaire2 ? -> requerant = titulaire1"`, () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
        element: <SaisirRDCSCPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC]
  );

  render(
    elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC)
  );
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );
  let nomNaissanceTitulaire2: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire2.nom
  );
  let requerantTitulaire2: HTMLElement | null = screen.queryByLabelText(
    Labels.requerant.titulaire2
  );

  waitFor(() => {
    expect(screen.getByTestId(Labels.documentDemande)).toBeDefined();
  });

  act(() => {
    fireEvent.change(screen.getByTestId(Labels.documentDemande), {
      target: {
        value: Labels.idAttestationPACS
      }
    });
  });

  waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeDefined();
  });

  if (boutonAjoutTitulaire) fireEvent.click(boutonAjoutTitulaire);

  waitFor(() => {
    boutonSupprimerTitulaire = screen.getByLabelText(Labels.titulaire.suppr);
    expect(boutonSupprimerTitulaire).toBeDefined();
  });

  if (boutonSupprimerTitulaire) fireEvent.click(boutonSupprimerTitulaire);

  waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    boutonSupprimerTitulaire = screen.queryByLabelText(Labels.titulaire.suppr);
    nomNaissanceTitulaire2 = screen.queryByLabelText(Labels.titulaire2.nom);
    requerantTitulaire2 = screen.queryByLabelText(Labels.requerant.titulaire2);

    expect(boutonAjoutTitulaire).toBeDefined();
    expect(nomNaissanceTitulaire2).not.toBeDefined();
    expect(boutonSupprimerTitulaire).not.toBeDefined();
    expect(requerantTitulaire2).not.toBeDefined();
  });
});
