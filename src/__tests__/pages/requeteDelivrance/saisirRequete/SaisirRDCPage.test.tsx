import { mappingOfficier } from "@core/login/LoginHook";
import { mapHabilitationsUtilisateur } from "@model/agent/IUtilisateur";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
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
import { getLastPathElem, getUrlWithParam } from "@util/route/routeUtil";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau,
  userDroitnonCOMEDEC
} from "../../../../mock/data/connectedUserAvecDroit";
import { idRequeteRDCPourModification } from "../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

const history = createMemoryHistory();
history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);

beforeAll(() => {
  DocumentDelivrance.init();
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
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

test("renders formulaire de saisie d'une Requête de Délivrance Extrait Copie déjà existante", async () => {
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

test("test onChangeNature", async () => {
  act(() => {
    render(
      <Router history={history}>
        <SaisirRDCPage />
      </Router>
    );
  });

  const inputNatureActe = screen.getByTestId("requete.natureActe")
    .childNodes[0] as HTMLInputElement;

  await waitFor(() => {
    expect(inputNatureActe).toBeDefined();
  });

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "NAISSANCE"
      }
    });
  });

  await waitFor(() => {
    expect(inputNatureActe.value).toBe("NAISSANCE");
  });

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "MARIAGE"
      }
    });
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
  const inputMandataire = screen.getByLabelText(
    "requerant.typerequerant.mandataire"
  ) as HTMLInputElement;
  await act(async () => {
    fireEvent.click(inputMandataire);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.mandataire.raisonSociale")
    ).toBeDefined();
  });
  // Institutionnel
  const inputInstitutionnel = screen.getByLabelText(
    "requerant.typerequerant.institutionnel"
  ) as HTMLInputElement;
  await act(async () => {
    fireEvent.click(inputInstitutionnel);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.institutionnel.nomInstitution")
    ).toBeDefined();
  });
  // Particulier
  const inputParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;
  await act(async () => {
    fireEvent.click(inputParticulier);
  });
  await waitFor(() => {
    expect(
      screen.getByLabelText("requerant.particulier.nomNaissance")
    ).toBeDefined();
  });
  // Autre Professionnel
  const inputAutreProfessionnel = screen.getByLabelText(
    "requerant.typerequerant.autre_professionnel"
  ) as HTMLInputElement;
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
  const inputNatureActe = screen.getByTestId("requete.natureActe")
    .childNodes[0] as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId("requete.documentDemande")
    .childNodes[0] as HTMLSelectElement;
  const inputNbExemplaire = screen.getByLabelText(
    "requete.nbExemplaire"
  ) as HTMLSelectElement;
  const inputMotif = screen.getByTestId("requete.motif")
    .childNodes[0] as HTMLSelectElement;

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "DECES"
      }
    });
  });
  await waitFor(() => {
    expect(inputNatureActe.value).toEqual("DECES");
  });

  // Champs Evenement
  const inputPaysEvenement = screen.getByLabelText(
    "evenement.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleEvenement = screen.getByLabelText(
    "evenement.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeEvenement = screen.getByLabelText(
    "evenement.dateEvenement.annee"
  ) as HTMLInputElement;
  act(() => {
    fireEvent.change(inputPaysEvenement, {
      target: {
        value: "mockPaysEvenement"
      }
    });
    fireEvent.change(inputVilleEvenement, {
      target: {
        value: "mockVilleEvenement"
      }
    });
    fireEvent.change(inputAnneeEvenement, {
      target: {
        value: "1990"
      }
    });
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
  const inputNomParent1 = screen.getByLabelText(
    "titulaire1.parent1.nomNaissance"
  ) as HTMLInputElement;
  const inputNomParent2 = screen.getByLabelText(
    "titulaire1.parent2.nomNaissance"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputNomParent1, {
      target: {
        value: "mockNom1"
      }
    });
    fireEvent.change(inputNomParent2, {
      target: {
        value: "mockNom2"
      }
    });
  });

  await act(async () => {
    fireEvent.change(inputMotif, {
      target: {
        value: "CERTIFICAT_NATIONALITE_FRANCAISE"
      }
    });
  });

  await waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  await act(async () => {
    fireEvent.change(inputNbExemplaire, {
      target: {
        value: "1"
      }
    });
  });

  await waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
      }
    });
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    );
  });

  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
    // Re-init pour les tests suivants
    history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Extrait Copie NAISSANCE", async () => {
  render(
    <Router history={history}>
      <SaisirRDCPage />
    </Router>
  );

  // Champs Requete
  const inputNatureActe = screen.getByTestId("requete.natureActe")
    .childNodes[0] as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId("requete.documentDemande")
    .childNodes[0] as HTMLSelectElement;
  const inputNbExemplaire = screen.getByLabelText(
    "requete.nbExemplaire"
  ) as HTMLSelectElement;
  const inputMotif = screen.getByTestId("requete.motif")
    .childNodes[0] as HTMLSelectElement;

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "NAISSANCE"
      }
    });
  });

  await waitFor(() => {
    expect(inputNatureActe.value).toEqual("NAISSANCE");
  });

  // Champs Evenement
  const inputPaysEvenement = screen.getByLabelText(
    "titulaire1.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleEvenement = screen.getByLabelText(
    "titulaire1.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeEvenement = screen.getByLabelText(
    "titulaire1.naissance.dateEvenement.annee"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPaysEvenement, {
      target: {
        value: "mockPaysEvenement"
      }
    });
    fireEvent.change(inputVilleEvenement, {
      target: {
        value: "mockVilleEvenement"
      }
    });
    fireEvent.change(inputAnneeEvenement, {
      target: {
        value: "1990"
      }
    });
  });

  await waitFor(() => {
    expect(inputAnneeEvenement.value).toEqual("1990");
  });

  await act(async () => {
    fireEvent.change(inputMotif, {
      target: {
        value: "CERTIFICAT_NATIONALITE_FRANCAISE"
      }
    });
  });

  await waitFor(() => {
    expect(inputMotif.value).toEqual("CERTIFICAT_NATIONALITE_FRANCAISE");
  });

  await act(async () => {
    fireEvent.change(inputNbExemplaire, {
      target: {
        value: "1"
      }
    });
  });

  await waitFor(() => {
    expect(inputNbExemplaire.value).toEqual("1");
  });

  await act(async () => {
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
      }
    });
  });

  await waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    );
  });

  const submit = screen.getByText(/Prendre en charge/i);

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(getLastPathElem(history.location.pathname)).toEqual(
      "1072bc37-f889-4365-8f75-912166b767dd"
    );
    // Re-init pour les tests suivants
    history.push(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
  });
});

test("renders formulaire de saisie d'une Requête de Délivrance Extrait Copie déjà existante", async () => {
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
  storeRece.utilisateurCourant.habilitations = mapHabilitationsUtilisateur(
    resultatRequeteUtilistateurLaurenceBourdeau.data.habilitations
  );
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
    const inputNomNaissance = screen.getByLabelText(
      "titulaire1.noms.nomNaissance"
    ) as HTMLInputElement;
    const inputPrenomNaissance = screen.getByLabelText(
      "titulaire1.prenoms.prenom1"
    ) as HTMLInputElement;

    expect(inputNomNaissance.value).toEqual("NOMRDCMODIFIEE");
    expect(inputPrenomNaissance.value).toEqual("Prenomrdcmodifiée");
  });
});

afterAll(() => {
  superagentMock.unset();
});
