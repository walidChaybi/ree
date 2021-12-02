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
import { configComposition } from "../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../model/requete/v2/enum/SousTypeDelivrance";
import {
  getLastPathElem,
  getUrlWithParam
} from "../../../../views/common/util/route/routeUtil";
import { SaisirRDCSCPage } from "../../../../views/pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import { URL_MES_REQUETES_SAISIR_RDCSC } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configComposition[0],
  configRequetesV2[0]
]);

const history = createMemoryHistory();
history.push(URL_MES_REQUETES_SAISIR_RDCSC);

beforeEach(async () => {
  DocumentDelivrance.init();
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

  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "interesse.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "interesse.naissance.dateEvenement.annee"
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
    // Re-init pour les tests suivants
    history.push(URL_MES_REQUETES_SAISIR_RDCSC);
  });
});

test("test du Prendre en charge du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier => sans éléments de naissance & pop-in OUI", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );
  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
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

  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
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
    // Re-init pour les tests suivants
    history.push(URL_MES_REQUETES_SAISIR_RDCSC);
  });
});

test("test du Sauvegarder du formulaire de saisie d'une Requête de Délivrance Certificat de Situation Courrier", async () => {
  render(
    <Router history={history}>
      <SaisirRDCSCPage />
    </Router>
  );
  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;
  const inputVilleNaissance = screen.getByLabelText(
    "interesse.naissance.villeEvenement"
  ) as HTMLInputElement;
  const inputAnneeNaissance = screen.getByLabelText(
    "interesse.naissance.dateEvenement.annee"
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
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_SAISIR_RDCSC,
      "a4cefb71-8457-4f6b-937e-34b49335d405"
    )
  );

  render(
    <Router history={history}>
      <Route exact={true} path={URL_MES_REQUETES_SAISIR_RDCSC}>
        <SaisirRDCSCPage />
      </Route>
    </Router>
  );

  const inputDocumentDemande = screen.getByLabelText(
    "document"
  ) as HTMLSelectElement;
  waitFor(() => {
    expect(inputDocumentDemande.value).toEqual(
      "34da88e2-c5c7-4324-ac8e-b35193352e64"
    );
  });

  const inputPaysNaissance = screen.getByLabelText(
    "interesse.naissance.paysEvenement"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(inputPaysNaissance.value).toEqual("Samoa");
  });

  const inputVilleNaissance = screen.getByLabelText(
    "interesse.naissance.villeEvenement"
  ) as HTMLInputElement;
  waitFor(() => {
    expect(inputVilleNaissance.value).toEqual("Guangzhou");
  });

  const inputAnneeNaissance = screen.getByLabelText(
    "interesse.naissance.dateEvenement.annee"
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

afterAll(() => {
  superagentMock.unset();
});
