import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { configComposition } from "../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/enum/SousTypeDelivrance";
import { getLastPathElem } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { SaisirRDCSCPage } from "../../../../views/pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configComposition[0],
  configRequetes[0]
]);

let history: any;

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
});

beforeEach(async () => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC);
  await DocumentDelivrance.init();
});

test("renders formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const titre = SousTypeDelivrance.getEnumFor("RDCSC").libelle;
  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande = screen.getByTestId("document")
    .childNodes[0] as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  act(() => {
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
  });
  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
    fireEvent.blur(inputVilleNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in OUI", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );
  const inputDocumentDemande = screen.getByTestId("document")
    .childNodes[0] as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysNaissance, {
      target: {
        value: "mockPaysNaissance"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  const btnOui = screen.getByRole("button", { name: /Oui/i });

  await act(async () => {
    fireEvent.click(btnOui);
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in NON", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande = screen.getByTestId("document")
    .childNodes[0] as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysNaissance, {
      target: {
        value: "mockPaysNaissance"
      }
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  const btnNon = screen.getByRole("button", { name: /Non/i });

  await act(async () => {
    fireEvent.click(btnNon);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
  });
});

test("test du Sauvegarder du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );
  const inputDocumentDemande = screen.getByTestId("document")
    .childNodes[0] as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  act(() => {
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
  });

  await waitFor(() => {
    expect(screen.getByText("Certificat de situation au PACS"));
  });

  const submit = screen.getByText("Sauvegarder");

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "34da88e2-c5c7-4324-ac8e-b35193352e64"
      }
    });
    fireEvent.blur(inputPaysNaissance);
    fireEvent.blur(inputVilleNaissance);
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "saisircertificatsituation"
    );
  });
});

test("Remplissage du formulaire avec requete", () => {
  render(
    <Router history={history}>
      <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC}>
        <SaisirRDCSCPage />
      </Route>
    </Router>
  );

  const inputDocumentDemande = screen.getByTestId("document")
    .childNodes[0] as HTMLSelectElement;
  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  const inputPaysNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(inputPaysNaissance.value).toEqual("Samoa");
  });

  const inputVilleNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(inputVilleNaissance.value).toEqual("Guangzhou");
  });

  const inputAnneeNaissance = screen.getByLabelText(
    "titulaires.titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(inputAnneeNaissance.value).toEqual("1963");
  });

  const adresseVoie = screen.getByLabelText("adresse.voie") as HTMLInputElement;
  waitFor(() => {
    expect(adresseVoie.value).toEqual("5 place de l'Eglise");
  });

  const adresseCodePostal = screen.getByLabelText(
    "adresse.codePostal"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(adresseCodePostal.value).toEqual("44000");
  });

  const requerantParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;
  waitFor(() => {
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
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  ).childNodes[0];
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );

  expect(boutonAjoutTitulaire).not.toBeInTheDocument();
  expect(boutonSupprimerTitulaire).not.toBeInTheDocument();

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: Labels.idAttestationPACS
      }
    });
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeInTheDocument();
    expect(boutonSupprimerTitulaire).not.toBeInTheDocument();
  });
});

test(`Document demandé != "Attestation PACS" => bouton "ajouter un titulaire" & "supprimer titulaire" non visibles"`, async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  ).childNodes[0];
  let boutonAjoutTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.ajout
  );
  let boutonSupprimerTitulaire: HTMLElement | null = screen.queryByLabelText(
    Labels.titulaire.suppr
  );

  expect(boutonAjoutTitulaire).not.toBeInTheDocument();
  expect(boutonSupprimerTitulaire).not.toBeInTheDocument();

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: Labels.idAttestationPACS
      }
    });
  });

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: ""
      }
    });
  });

  await waitFor(() => {
    expect(boutonAjoutTitulaire).not.toBeInTheDocument();
    expect(boutonSupprimerTitulaire).not.toBeInTheDocument();
  });
});

test(`Clic sur "ajouter un titulaire" => bloc titulaire2 & bouton "supprimer un titulaire" & requérant titulaire2 visibles"`, async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  ).childNodes[0];
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

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: Labels.idAttestationPACS
      }
    });
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeInTheDocument();
  });

  await act(async () => {
    if (boutonAjoutTitulaire) fireEvent.click(boutonAjoutTitulaire);
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.queryByLabelText(Labels.titulaire.ajout);
    boutonSupprimerTitulaire = screen.getByLabelText(Labels.titulaire.suppr);
    nomNaissanceTitulaire2 = screen.getByLabelText(Labels.titulaire2.nom);
    requerantTitulaire2 = screen.getByLabelText(Labels.requerant.titulaire2);

    expect(boutonAjoutTitulaire).not.toBeInTheDocument();
    expect(nomNaissanceTitulaire2).toBeInTheDocument();
    expect(boutonSupprimerTitulaire).toBeInTheDocument();
    expect(requerantTitulaire2).toBeInTheDocument();
  });
});

test(`Clic sur "supprimer un titulaire" => bloc titulaire2 & bouton "supprimer un titulaire" & requérant titulaire2 non visibles & requerant === titulaire2 ? -> requerant = titulaire1"`, async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );

  const inputDocumentDemande: ChildNode = screen.getByTestId(
    Labels.documentDemande
  ).childNodes[0];
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

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: Labels.idAttestationPACS
      }
    });
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    expect(boutonAjoutTitulaire).toBeInTheDocument();
  });

  await act(async () => {
    if (boutonAjoutTitulaire) fireEvent.click(boutonAjoutTitulaire);
  });

  await waitFor(() => {
    boutonSupprimerTitulaire = screen.getByLabelText(Labels.titulaire.suppr);
    expect(boutonSupprimerTitulaire).toBeInTheDocument();
  });

  await act(async () => {
    if (boutonSupprimerTitulaire) fireEvent.click(boutonSupprimerTitulaire);
  });

  await waitFor(() => {
    boutonAjoutTitulaire = screen.getByLabelText(Labels.titulaire.ajout);
    boutonSupprimerTitulaire = screen.queryByLabelText(Labels.titulaire.suppr);
    nomNaissanceTitulaire2 = screen.queryByLabelText(Labels.titulaire2.nom);
    requerantTitulaire2 = screen.queryByLabelText(Labels.requerant.titulaire2);

    expect(boutonAjoutTitulaire).toBeInTheDocument();
    expect(nomNaissanceTitulaire2).not.toBeInTheDocument();
    expect(boutonSupprimerTitulaire).not.toBeInTheDocument();
    expect(requerantTitulaire2).not.toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
