import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitnonCOMEDEC
} from "@mock/data/connectedUserAvecDroit";
import { idRequeteRDCPourModification } from "@mock/data/requeteDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import {
  URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getLastPathElem, getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

const history = createMemoryHistory();

const saisieRDC = () => {
  history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
};

const modificationRDC = () => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID,
      idRequeteRDCPourModification
    )
  );
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

test("renders formulaire de saisie d'une Requête de Délivrance Extrait Copie", async () => {
  act(() => {
    render(
      <Router history={history}>
        <SaisirRDCPage />
      </Router>
    );
  });

  const titre = SousTypeDelivrance.getEnumFor("RDC").libelle;

  await waitFor(() => {
    expect(screen.getAllByText(titre)).toHaveLength(2);
  });
});

test("renders formulaire de modification d'une Requête de Délivrance Extrait Copie", async () => {
  contextes.modificationRDC();
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID}>
          <SaisirRDCPage />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
    const inputPrenomNaissance = getInput("titulaire1.prenoms.prenom1");

    expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
    expect(inputPrenomNaissance.value).toEqual("PrenomRDCModifiée");
  });
});

test(`test du bouton "mettre en majuscule" pour le nom d'une Requête de Délivrance Extrait Copie`, async () => {
  contextes.modificationRDC();
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID}>
          <SaisirRDCPage />
        </Route>
      </Router>
    );
  });

  const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
  const buttonChampEnMajuscule = screen.getByTestId(
    "BoutonChampEnMajuscule"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(inputNomNaissance.value).toEqual("NomRDCModifiée");
  });

  await act(async () => {
    fireEvent.click(buttonChampEnMajuscule);
  });
  await waitFor(() => {
    expect(inputNomNaissance.value).toEqual("NOMRDCMODIFIÉE");
  });
});

test("Validation d'une modification de Requête de Délivrance Extrait Copie", async () => {
  contextes.modificationRDC();
  act(() => {
    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_MODIFIER_RDC_ID}>
          <SaisirRDCPage />
        </Route>
      </Router>
    );
  });

  const inputNomNaissance = getInput("titulaire1.noms.nomNaissance");
  const buttonValider = screen.getByText(/Valider/i) as HTMLButtonElement;

  await waitFor(() => {
    expect(buttonValider.disabled).toBeTruthy();
  });

  await act(async () => {
    changeInput("DUPONT", inputNomNaissance);
  });
  await waitFor(() => {
    expect(inputNomNaissance.value).toBe("DUPONT");
    expect(buttonValider.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(buttonValider);
  });
  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      idRequeteRDCPourModification
    );
  });
});

test("test onChangeNature", async () => {
  act(() => {
    render(
      <Router history={history}>
        <SaisirRDCPage />
      </Router>
    );
  });

  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(inputNatureActe).toBeDefined();
  });

  await act(async () => {
    changeInput("NAISSANCE", inputNatureActe);
  });
  await waitFor(() => {
    expect(inputNatureActe.value).toBe("NAISSANCE");
  });

  await act(async () => {
    changeInput("MARIAGE", inputNatureActe);
  });
  await waitFor(() => {
    expect(inputNatureActe.value).toBe("MARIAGE");
  });
});

test("test onChangeRequerant", async () => {
  act(() => {
    render(
      <Router history={history}>
        <SaisirRDCPage />
      </Router>
    );
  });

  // Mandataire
  const inputMandataire = getInput("requerant.typerequerant.mandataire");

  await act(async () => {
    fireEvent.click(inputMandataire);
  });
  await waitFor(() => {
    const inputRaisonSociale = getInput("requerant.mandataire.raisonSociale");
    expect(inputRaisonSociale).toBeDefined();
  });

  // Institutionnel
  const inputInstitutionnel = getInput(
    "requerant.typerequerant.institutionnel"
  );

  await act(async () => {
    fireEvent.click(inputInstitutionnel);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.institutionnel.nomInstitution")
    ).toBeDefined();
  });

  // Particulier
  const inputParticulier = getInput("requerant.typerequerant.particulier");
  await act(async () => {
    fireEvent.click(inputParticulier);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.particulier.nomNaissance")
    ).toBeDefined();
  });

  // Autre Professionnel
  const inputAutreProfessionnel = getInput(
    "requerant.typerequerant.autre_professionnel"
  );

  await act(async () => {
    fireEvent.click(inputAutreProfessionnel);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.autreProfessionnel.raisonSociale")
    ).toBeDefined();
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie DECES", async () => {
  render(
    <Router history={history}>
      <SaisirRDCPage />
    </Router>
  );

  // Champs Requete
  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId(
    "requete.documentDemande"
  ) as HTMLSelectElement;
  const inputNbExemplaire = getInput("requete.nbExemplaire");
  const inputMotif = screen.getByTestId("requete.motif") as HTMLSelectElement;

  await act(async () => {
    changeInput("DECES", inputNatureActe);
  });
  await waitFor(() => {
    expect(inputNatureActe.value).toEqual("DECES");
  });

  // Champs Evenement
  const inputAnneeEvenement = getInput("evenement.dateEvenement.annee");

  await act(async () => {
    changeInput("mockPaysEvenement", getInput("evenement.paysEvenement"));
    changeInput("mockVilleEvenement", getInput("evenement.villeEvenement"));
    changeInput("1990", getInput("evenement.dateEvenement.annee"));
  });

  await waitFor(() => {
    expect(inputAnneeEvenement.value).toEqual("1990");
  });

  const ajouterFiliation = screen.getByText(/Ajouter une filiation/i);
  await act(async () => {
    fireEvent.click(ajouterFiliation);
  });
  await waitFor(() => {
    expect(screen.getByText(/Supprimer une filiation/i)).toBeDefined();
  });

  // Champs Filiation
  const inputNomParent1 = getInput("titulaire1.parent1.nomNaissance");
  const inputNomParent2 = getInput("titulaire1.parent2.nomNaissance");
  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    changeInput("mockNom1", inputNomParent1);
    changeInput("mockNom2", inputNomParent2);
  });

  await act(async () => {
    changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);
  });
  await waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  await act(async () => {
    changeInput("1", inputNbExemplaire);
  });
  await waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  await act(async () => {
    changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);
  });
  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
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

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie NAISSANCE", async () => {
  render(
    <Router history={history}>
      <SaisirRDCPage />
    </Router>
  );

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

  await act(async () => {
    changeInput("NAISSANCE", inputNatureActe);
  });
  await waitFor(() => {
    expect(inputNatureActe.value).toEqual("NAISSANCE");
  });

  // Champs Evenement
  const inputPaysEvenement = getInput("titulaire1.naissance.paysEvenement");
  const inputVilleEvenement = getInput("titulaire1.naissance.villeEvenement");
  const inputAnneeEvenement = getInput(
    "titulaire1.naissance.dateEvenement.annee"
  );

  act(() => {
    changeInput("mockPaysEvenement", inputPaysEvenement);
    changeInput("mockVilleEvenement", inputVilleEvenement);
    changeInput("1990", inputAnneeEvenement);
  });
  await waitFor(() => {
    expect(inputAnneeEvenement.value).toEqual("1990");
  });

  await act(async () => {
    changeInput("CERTIFICAT_NATIONALITE_FRANCAISE", inputMotif);
  });
  await waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  await act(async () => {
    changeInput("1", inputNbExemplaire);
  });
  await waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  await act(async () => {
    changeInput("0e1e909f-f74c-4b16-9c03-b3733354c6ce", inputDocumentDemande);
  });
  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
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
