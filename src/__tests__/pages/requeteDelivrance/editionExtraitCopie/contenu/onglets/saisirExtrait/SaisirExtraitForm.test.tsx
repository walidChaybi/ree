import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../../../../mock/data/connectedUserAvecDroit";
import {
  requeteAvecDocs,
  requeteAvecDocsPlurilingue
} from "../../../../../../../mock/data/DetailRequeteDelivrance";
import {
  ficheActe1,
  ficheActe1_avecTitulaireAyantDeuxParents,
  ficheActe1_avecTitulaireAyantDeuxParentsDeMemeSexe
} from "../../../../../../../mock/data/ficheActe";
import { configEtatcivil } from "../../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import { IRequeteDelivrance } from "../../../../../../../model/requete/IRequeteDelivrance";
import { mapActe } from "../../../../../../../views/common/hook/repertoires/MappingRepertoires";
import { storeRece } from "../../../../../../../views/common/util/storeRece";
import { mappingRequeteDelivrance } from "../../../../../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { SaisirExtraitForm } from "../../../../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import {
  changeInput,
  expectEstAbsent,
  expectEstBoutonDisabled,
  expectEstPresentAvecValeur,
  expectEstPresentAvecValeurEtDisabled,
  expectEstPresentAvecValeurVide,
  expectEstPresentEtNonChecked,
  expectEstSelectPresentAvecValeur,
  expectSelectEstAbsent
} from "../../../../../../__tests__utils__/expectUtils";
import { configComposition } from "./../../../../../../../mock/superagent-config/superagent-mock-composition";
import { DocumentDelivrance } from "./../../../../../../../model/requete/enum/DocumentDelivrance";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configComposition[0]
]);

const acte = mapActe(ficheActe1.data);
const requete = {} as IRequeteDelivrance;
const handleDocumentEnregistre = jest.fn();

beforeAll(async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
  await DocumentDelivrance.init();
});

afterAll(() => {
  superagentMock.unset();
});

test("Attendu: le formulaire SaisirExtraitForm s'affiche correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.nomNaissance"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("Patamod eler");
    expect(widget.disabled).toBeTruthy();
  });

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireevt1.nomsequable.secable.true"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.checked).toBeFalsy();
  });

  fireEvent.click(
    screen.getByLabelText("titulaireevt1.nomsequable.secable.true")
  );

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.nomSequable.nomPartie1"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("Patamod");
  });
  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.nomSequable.nomPartie2"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("eler");
  });

  await waitFor(() => {
    const widget = screen.getByTestId("titulaireEvt1.declarationConjointe.type")
      .childNodes[0] as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("ABSENCE_DECLARATION");
  });

  await waitFor(() => {
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.prenoms.prenom1",
      "Alphonse"
    );
  });

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireevt1.sexe.feminin"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.disabled).toBeTruthy();
    expect(widget.checked).toBeTruthy();
  });

  await waitFor(() => {
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.dateEvenement.jour",
      "10"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.dateEvenement.mois",
      "10"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.dateEvenement.annee",
      "1901"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.dateEvenement.nbHeure",
      "13"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.dateEvenement.nbMinute",
      "15"
    );
  });

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.lieuEvenement.lieuComplet"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("paris île de france");
    expect(widget.disabled).toBeFalsy();
  });

  await waitFor(() => {
    expectEstAbsent("titulaireEvt1.lieuEvenement.ville");
    expectSelectEstAbsent("titulaireEvt1.lieuEvenement.arrondissement");
    expectEstAbsent("titulaireEvt1.lieuEvenement.regionDepartement");
  });
});

test("Attendu: le sous formulaire DateNaissanceOuAgeDeForm se comporte correctement ", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );
  const widgetAnnee = expectEstPresentAvecValeur(
    "titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.date.annee",
    ""
  );
  const widgetAge = expectEstPresentAvecValeur(
    "titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.age",
    ""
  );

  fireEvent.input(widgetAnnee, {
    target: {
      value: "2000"
    }
  });

  await waitFor(() => {
    expect(widgetAge.disabled).toBeTruthy();
  });

  fireEvent.input(widgetAnnee, {
    target: {
      value: ""
    }
  });

  await waitFor(() => {
    expect(widgetAge.disabled).toBeFalsy();
  });

  fireEvent.input(widgetAge, {
    target: {
      value: "30"
    }
  });

  await waitFor(() => {
    expect(widgetAnnee.value).toBe("");
    expect(widgetAnnee.disabled).toBeTruthy();
  });
});

test("Attendu: l'alimentation du lieu complet en France s'effectue correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  const widgetDecomposer = screen.getByLabelText(
    "décomposer le lieu"
  ) as HTMLInputElement;

  fireEvent.click(widgetDecomposer);

  let widgetVille: HTMLInputElement;
  let widgetDepartement: HTMLInputElement;
  let widgetArrondissmeent: HTMLSelectElement;
  let widgetLieu: HTMLInputElement;

  await waitFor(() => {
    widgetArrondissmeent = expectEstSelectPresentAvecValeur(
      "titulaireEvt1.lieuEvenement.arrondissement",
      "16"
    );
  });

  fireEvent.change(widgetArrondissmeent!, {
    target: { value: "1" }
  });

  await waitFor(() => {
    widgetArrondissmeent = expectEstSelectPresentAvecValeur(
      "titulaireEvt1.lieuEvenement.arrondissement",
      "1"
    );

    widgetLieu = expectEstPresentAvecValeur(
      "titulaireEvt1.lieuEvenement.lieuComplet",
      "Paris 1er arrondissement (Ile de France)"
    );
  });

  await waitFor(() => {
    expect(widgetDecomposer.disabled).toBeTruthy();

    widgetVille = expectEstPresentAvecValeur(
      "titulaireEvt1.lieuEvenement.ville",
      "Paris"
    );

    widgetDepartement = expectEstPresentAvecValeur(
      "titulaireEvt1.lieuEvenement.regionDepartement",
      "Ile de France"
    );

    expect(widgetLieu.disabled).toBeTruthy();
  });

  fireEvent.input(widgetVille!, {
    target: {
      value: "Nantes"
    }
  });

  fireEvent.input(widgetDepartement!, {
    target: {
      value: "Loire Atlantique"
    }
  });

  await waitFor(() => {
    expect(widgetLieu.value).toBe("Nantes (Loire Atlantique)");
    expectSelectEstAbsent("titulaireEvt1.lieuEvenement.arrondissement");
  });
});

test("Attendu: l'alimentation du lieu complet à l'étranger s'effectue correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  const widgetEtranger = screen.getByLabelText(
    "titulaireevt1.parentnaiss1.lieunaissance.etrangerfrance.etranger"
  ) as HTMLInputElement;
  fireEvent.click(widgetEtranger);

  const widgetVille = expectEstPresentAvecValeur(
    "titulaireEvt1.parentNaiss1.lieuNaissance.ville",
    ""
  );
  const widgetRegionDepartement = expectEstPresentAvecValeur(
    "titulaireEvt1.parentNaiss1.lieuNaissance.regionDepartement",
    ""
  );
  const widgetPays = expectEstPresentAvecValeur(
    "titulaireEvt1.parentNaiss1.lieuNaissance.pays",
    ""
  );

  fireEvent.input(widgetVille, {
    target: {
      value: "Brasilia"
    }
  });

  fireEvent.input(widgetRegionDepartement, {
    target: {
      value: "Région chaude"
    }
  });

  fireEvent.input(widgetPays, {
    target: {
      value: "Brésil"
    }
  });
  await waitFor(() => {
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.parentNaiss1.lieuNaissance.lieuComplet",
      "Brasilia, Région chaude (Brésil)"
    );
  });

  const widgetFrance = screen.getByLabelText(
    "titulaireevt1.parentnaiss1.lieunaissance.etrangerfrance.france"
  ) as HTMLInputElement;
  fireEvent.click(widgetFrance);

  await waitFor(() => {
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.parentNaiss1.lieuNaissance.lieuComplet",
      ""
    );
  });
});

test("Attendu: la case à cocher 'nom sécable' se comporte correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  const caseACocherNomSecable = expectEstPresentEtNonChecked(
    "titulaireevt1.nomsequable.secable.true"
  );

  await waitFor(() => {
    expectEstAbsent("titulaireEvt1.nomSequable.nomPartie1");
    expectEstAbsent("titulaireEvt1.nomSequable.nomPartie2");
  });

  fireEvent.click(caseACocherNomSecable!);

  await waitFor(() => {
    expectEstPresentAvecValeur(
      "titulaireEvt1.nomSequable.nomPartie1",
      "Patamod"
    );
    expectEstPresentAvecValeur("titulaireEvt1.nomSequable.nomPartie2", "eler");
  });
});

test("Attendu: le changement de type de déclaration conjointe s'effectue correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  const typeDeclConjointe = expectEstSelectPresentAvecValeur(
    "titulaireEvt1.declarationConjointe.type",
    "ABSENCE_DECLARATION"
  );

  expectEstAbsent("titulaireEvt1.declarationConjointe.date.annee");

  fireEvent.change(typeDeclConjointe!, {
    target: { value: "CHANGEMENT_NOM" }
  });

  await waitFor(() => {
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.declarationConjointe.date.annee"
    );
  });
});

test("Attendu: la réinitialisation du formulaire fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={acte}
      requete={requete}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );
  const boutonReinitialiser = expectEstBoutonDisabled("Réinitialiser");

  // On effectue un changement dans le formulaire
  const widgetAnnee = changeInput(
    "titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.date.annee",
    "2000"
  );

  expect(widgetAnnee.value).toBe("2000");

  expect(boutonReinitialiser.disabled).toBeFalsy();

  fireEvent.click(boutonReinitialiser);

  await waitFor(() => {
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.parentNaiss1.dateNaissanceOuAgeDe.date.annee"
    );
  });
});

test("Attendu: la validation du formulaire fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={mapActe(ficheActe1_avecTitulaireAyantDeuxParents.data)}
      requete={mappingRequeteDelivrance(requeteAvecDocs)}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );

  await act(async () => {
    fireEvent.click(screen.getByLabelText("Valider"));
  });
  await waitFor(() => {
    expect(screen.getByLabelText("Valider")).toBeInTheDocument();
  });
});

test("Attendu: controle sexe titulaire et parent de même sexe dans le cas plurilingue fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={mapActe(ficheActe1_avecTitulaireAyantDeuxParentsDeMemeSexe.data)}
      requete={mappingRequeteDelivrance(requeteAvecDocsPlurilingue)}
      handleDocumentEnregistre={handleDocumentEnregistre}
    />
  );
  await act(async () => {
    fireEvent.click(screen.getByLabelText("Valider"));
  });

  await waitFor(() => {
    expect(
      screen.getByText(
        "Si vous continuez, l'extrait plurilingue généré sera en erreur."
      )
    ).toBeInTheDocument();
  });

  const boutonNon = screen.getByLabelText("confirmation Non");

  await act(async () => {
    fireEvent.click(boutonNon);
  });

  await waitFor(() => {
    expect(
      screen.queryByText(
        "Si vous continuez, l'extrait plurilingue généré sera en erreur."
      )
    ).not.toBeInTheDocument();
  });
});
