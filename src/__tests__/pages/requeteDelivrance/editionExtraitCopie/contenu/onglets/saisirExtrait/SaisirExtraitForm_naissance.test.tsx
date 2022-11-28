import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { mappingRequeteDelivrance } from "@pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { SaisirExtraitForm } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/SaisirExtraitForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
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
import { configComposition } from "../../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "../../../../../../../mock/superagent-config/superagent-mock-televerification";
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

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configComposition[0],
  configTeleverification[0]
]);

const acte = mapActe(ficheActe1.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER }
} as IRequeteDelivrance;
const handleDocumentEnregistre = jest.fn();

beforeAll(async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
  await DocumentDelivrance.init();
});

afterAll(() => {
  superagentMock.unset();
});

test("Attendu: le formulaire SaisirExtraitForm pour un acte de naissance s'affiche correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

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
      "titulaireevt1.nomsecable.secable.true"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.checked).toBeFalsy();
  });

  fireEvent.click(
    screen.getByLabelText("titulaireevt1.nomsecable.secable.true")
  );

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.nomSecable.nomPartie1"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("Patamod");
  });
  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.nomSecable.nomPartie2"
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
      "titulaireEvt1.evenement.dateEvenement.jour",
      "10"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.mois",
      "10"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.annee",
      "1901"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.nbHeure",
      "13"
    );
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.evenement.dateEvenement.nbMinute",
      "15"
    );
  });

  await waitFor(() => {
    const widget = screen.getByLabelText(
      "titulaireEvt1.evenement.lieuEvenement.lieuComplet"
    ) as HTMLInputElement;
    expect(widget).toBeInTheDocument();
    expect(widget.value).toBe("paris île de france");
    expect(widget.disabled).toBeFalsy();
  });

  await waitFor(() => {
    expectEstAbsent("titulaireEvt1.evenement.lieuEvenement.ville");
    expectSelectEstAbsent(
      "titulaireEvt1.evenement.lieuEvenement.arrondissement"
    );
    expectEstAbsent("titulaireEvt1.evenement.lieuEvenement.regionDepartement");
  });
});

test("Attendu: la saisie des heures et minutes est possible lorsque les valeurs initiale sont non définies ", async () => {
  const acteAvecEvenementSansHeureNiMinute: IFicheActe = {
    ...acte,
    evenement: {
      ...(acte.evenement as IEvenement),
      heure: undefined,
      minute: undefined
    }
  };

  render(
    <SaisirExtraitForm
      acte={acteAvecEvenementSansHeureNiMinute}
      requete={requete}
    />
  );

  await waitFor(() => {
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.evenement.dateEvenement.nbHeure"
    );
    expectEstPresentAvecValeurVide(
      "titulaireEvt1.evenement.dateEvenement.nbMinute"
    );
  });

  changeInput("titulaireEvt1.evenement.dateEvenement.nbHeure", "10");
  changeInput("titulaireEvt1.evenement.dateEvenement.nbMinute", "15");

  await waitFor(() => {
    expectEstPresentAvecValeur(
      "titulaireEvt1.evenement.dateEvenement.nbHeure",
      "10"
    );
    expectEstPresentAvecValeur(
      "titulaireEvt1.evenement.dateEvenement.nbMinute",
      "15"
    );
  });
});

test("Attendu: le sous formulaire DateNaissanceOuAgeDeForm se comporte correctement ", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);
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
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

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
      "titulaireEvt1.evenement.lieuEvenement.arrondissement",
      "16"
    );
  });

  fireEvent.change(widgetArrondissmeent!, {
    target: { value: "1" }
  });

  await waitFor(() => {
    widgetArrondissmeent = expectEstSelectPresentAvecValeur(
      "titulaireEvt1.evenement.lieuEvenement.arrondissement",
      "1"
    );

    widgetLieu = expectEstPresentAvecValeur(
      "titulaireEvt1.evenement.lieuEvenement.lieuComplet",
      "Paris 1er arrondissement"
    );
  });

  await waitFor(() => {
    expect(widgetDecomposer.disabled).toBeTruthy();

    widgetVille = expectEstPresentAvecValeur(
      "titulaireEvt1.evenement.lieuEvenement.ville",
      "Paris"
    );

    widgetDepartement = expectEstPresentAvecValeur(
      "titulaireEvt1.evenement.lieuEvenement.regionDepartement",
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
    expectSelectEstAbsent(
      "titulaireEvt1.evenement.lieuEvenement.arrondissement"
    );
  });
});

test("Attendu: l'alimentation du lieu complet à l'étranger s'effectue correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

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
      "Brasilia (Région chaude)"
    );
  });
});

test("Attendu: l'alimentation du lieu complet en mode 'inconnu' s'effectue correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

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

  const widgetInconnu = screen.getByLabelText(
    "titulaireevt1.parentnaiss1.lieunaissance.etrangerfrance.inconnu"
  ) as HTMLInputElement;
  fireEvent.click(widgetInconnu);

  await waitFor(() => {
    expectEstPresentAvecValeurEtDisabled(
      "titulaireEvt1.parentNaiss1.lieuNaissance.lieuComplet",
      ""
    );
  });
});

test("Attendu: la case à cocher 'nom sécable' se comporte correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

  const caseACocherNomSecable = expectEstPresentEtNonChecked(
    "titulaireevt1.nomsecable.secable.true"
  );

  await waitFor(() => {
    expectEstAbsent("titulaireEvt1.nomSecable.nomPartie1");
    expectEstAbsent("titulaireEvt1.nomSecable.nomPartie2");
  });

  fireEvent.click(caseACocherNomSecable!);

  await waitFor(() => {
    expectEstPresentAvecValeur(
      "titulaireEvt1.nomSecable.nomPartie1",
      "Patamod"
    );
    expectEstPresentAvecValeur("titulaireEvt1.nomSecable.nomPartie2", "eler");
  });
});

test("Attendu: le changement de type de déclaration conjointe s'effectue correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

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

  changeInput("titulaireEvt1.declarationConjointe.date.annee", "2000");

  fireEvent.change(typeDeclConjointe!, {
    target: { value: "ABSENCE_DECLARATION" }
  });

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
  render(<SaisirExtraitForm acte={acte} requete={requete} />);
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

test("Attendu: la validation du formulaire naissance fonctionne correctement", async () => {
  render(
    <SaisirExtraitForm
      acte={mapActe(ficheActe1_avecTitulaireAyantDeuxParents.data)}
      requete={mappingRequeteDelivrance(requeteAvecDocs)}
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
