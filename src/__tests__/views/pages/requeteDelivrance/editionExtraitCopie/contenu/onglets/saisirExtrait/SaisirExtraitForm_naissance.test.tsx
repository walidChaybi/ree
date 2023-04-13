import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import {
  requeteAvecDocs,
  requeteAvecDocsPlurilingue
} from "@mock/data/DetailRequeteDelivrance";
import {
  ficheActe1,
  ficheActe1_avecTitulaireAyantDeuxParents,
  ficheActe1_avecTitulaireAyantDeuxParentsDeMemeSexe
} from "@mock/data/ficheActe";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IFiliation } from "@model/etatcivil/acte/IFiliation";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { EtrangerFrance } from "@model/etatcivil/enum/EtrangerFrance";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import {
  ISaisieExtraitForm,
  ITitulaireEvtForm,
  saisieParentPaysInconnu,
  saisiePaysInconnuTitulaire
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/mapping/mappingActeVerFormulaireSaisirExtrait";
import { mapTitulaireNaissanceEtParents } from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/saisirExtrait/mapping/mappingFormulaireSaisirExtraitVersExtraitAEnvoyer";
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
} from "../../../../../../../__tests__utils__/expectUtils";

const acte = mapActe(ficheActe1.data);
const requete = {
  statutCourant: { statut: StatutRequete.A_SIGNER }
} as IRequeteDelivrance;

beforeAll(async () => {
  storeRece.utilisateurCourant = userDroitnonCOMEDEC; // Droit DELIVRER
});

test("Attendu: le formulaire SaisirExtraitForm pour un acte de naissance s'affiche correctement", async () => {
  render(<SaisirExtraitForm acte={acte} requete={requete} />);

  await waitFor(() => {
    expect(screen.getByTitle("Cliquer pour déverrouiller")).toBeInTheDocument();
  });

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
    const widget = screen.getByTestId(
      "titulaireEvt1.declarationConjointe.type"
    ) as HTMLSelectElement;
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

test("Doit enregistrer INCONNU sur le parent 2 en base quand le pays est vide et au moins ville/région saisie et le mode de saisie est Etranger", async () => {
  const sasieEtrangerPaysVideEtVilleRenseigne = {
    titulaireEvt1: {
      nomNaissance: "Barros",
      nomSecable: {
        secable: [],
        nomPartie1: "",
        nomPartie2: ""
      },
      declarationConjointe: {
        type: "ABSENCE_DECLARATION",
        date: {
          jour: "",
          mois: "",
          annee: ""
        }
      },
      prenoms: {
        prenom1: "Renan1",
        prenom2: "Araujo",
        prenom3: "Goncalves"
      },
      sexe: "FEMININ",
      evenement: {
        dateEvenement: {
          jour: "07",
          mois: "12",
          annee: "2000",
          nbHeure: "",
          nbMinute: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "07",
            mois: "12",
            annee: "2000"
          }
        },
        lieuEvenement: {
          lieuComplet: "Tijuana, Basse-Californie (Mexique)",
          ville: "Tijuana",
          arrondissement: "",
          regionDepartement: "Basse-Californie",
          pays: "Mexique",
          EtrangerFrance: "ETRANGER",
          villeEstAffichee: true
        }
      },
      adoptePar: [],
      parentNaiss1: {
        nomNaissance: "De La Vega",
        prenoms: {
          prenom1: "Madeleine",
          prenom2: "",
          prenom3: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "",
            mois: "",
            annee: ""
          }
        },
        sexe: "FEMININ",
        lieuNaissance: {
          lieuComplet: "bord du Titanic",
          ville: "Bord du Titanic",
          arrondissement: "",
          regionDepartement: "",
          pays: "",
          EtrangerFrance: "FRANCE",
          villeEstAffichee: false
        }
      },
      parentNaiss2: {
        nomNaissance: "De La Vega",
        prenoms: {
          prenom1: "Diego",
          prenom2: "",
          prenom3: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "",
            mois: "",
            annee: ""
          }
        },
        sexe: "MASCULIN",
        lieuNaissance: {
          lieuComplet: "bord du Titanic",
          ville: "bord du Titanic",
          arrondissement: "",
          regionDepartement: "",
          pays: "",
          EtrangerFrance: "ETRANGER",
          villeEstAffichee: true
        }
      },
      parentAdoptantNaiss1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parentAdoptantNaiss2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    evenement: {
      dateEvenement: {
        jour: "07",
        mois: "12",
        annee: "2000"
      },
      lieuEvenement: {
        lieuComplet: "Tijuana, Basse-Californie (Mexique)",
        ville: "Tijuana",
        arrondissement: "",
        regionDepartement: "Basse-Californie",
        pays: "Mexique",
        EtrangerFrance: "ETRANGER",
        villeEstAffichee: false
      },
      contratMariage: {
        existence: "",
        texte: undefined
      }
    },
    dernierConjoint: {
      nomNaissance: "",
      prenoms: ""
    },
    donneesComplementairesPlurilingues: {
      nomApresMariageEpoux: "",
      nomApresMariageEpouse: ""
    }
  } as any as ISaisieExtraitForm;

  const acteNaissance = {
    id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
    dateInitialisation: null,
    dateCreation: 1304330400000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1380362400000,
    nature: NatureActe.getEnumFor("NAISSANCE"),
    numero: "100",
    numeroBisTer: "552",
    nomOec: "MENARD",
    prenomOec: "MARC",
    dateDerniereDelivrance: {},
    dateDerniereMaj: {},
    visibiliteArchiviste: {
      _libelle: "MEAE"
    },
    evenement: {
      minute: null,
      heure: null,
      jour: 7,
      mois: 12,
      annee: 2000,
      voie: null,
      ville: "Tijuana",
      arrondissement: null,
      region: "Basse-Californie",
      pays: "Mexique",
      lieuReprise: null
    },
    mentions: [
      {
        id: "1a0aa3be-8311-465d-b750-d4c19834430d",
        numeroOrdre: 1,
        numeroOrdreExtrait: 1,
        villeApposition: "Tananarive",
        regionApposition: "region apposition",
        dateApposition: {},
        dateCreation: {},
        statut: undefined,
        dateStatut: {},
        titulaires: [
          {
            ordre: undefined,
            nom: undefined,
            sexe: "MASCULIN",
            nationalite: "FRANCAISE"
          }
        ],
        typeMention: {
          codeType: "3",
          libelleType: undefined,
          codeSousType: "3-1",
          libelleSousType: "Enregistrement du PACS",
          estActif: true,
          modeInformatisation: "OUI",
          nature: {
            _libelle: "PACS",
            _code: "2",
            _categorie: "",
            _estActif: true,
            _opposableAuTiers: true
          },
          sousTypeParDefaut: undefined,
          natureActe: {
            _libelle: "Naissance"
          }
        },
        autoriteEtatCivil: {
          libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
          nomOEC: "nom OEC",
          prenomOEC: "prenom OEC"
        },
        evenement: {
          minute: null,
          heure: null,
          jour: 15,
          mois: 6,
          annee: 2021,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "FRANCE",
          lieuReprise: null
        },
        textes: {
          texteMention:
            "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA.",
          texteApposition: "Nantes, le 25 juin 2012",
          texteOEC: "L'officier de l'état civil, Zahabia ANTOY MOHAMED",
          texteMentionDelivrance: null,
          texteMentionPlurilingue: null
        }
      },
      {
        id: "1a0aa3be-8311-465d-b750-d4c19834430e",
        numeroOrdre: 1,
        numeroOrdreExtrait: 1,
        villeApposition: "Tananarive",
        regionApposition: "region apposition",
        dateApposition: {},
        dateCreation: {},
        statut: undefined,
        dateStatut: {},
        titulaires: [
          {
            ordre: undefined,
            nom: undefined,
            sexe: "MASCULIN",
            nationalite: "FRANCAISE"
          }
        ],
        typeMention: {
          codeType: "2",
          libelleType: undefined,
          codeSousType: "2-1-a",
          libelleSousType: "Divorce en France",
          estActif: true,
          modeInformatisation: "OUI",
          nature: {
            _libelle: "Divorce",
            _code: "5",
            _categorie: "",
            _estActif: true,
            _opposableAuTiers: true
          },
          sousTypeParDefaut: undefined,
          natureActe: {
            _libelle: "Naissance"
          }
        },
        autoriteEtatCivil: {
          libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
          nomOEC: "nom OEC",
          prenomOEC: "prenom OEC"
        },
        evenement: {
          minute: null,
          heure: null,
          jour: 15,
          mois: 6,
          annee: 2021,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "FRANCE",
          lieuReprise: null
        },
        textes: {
          texteMention:
            "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008.",
          texteApposition: null,
          texteOEC: null,
          texteMentionDelivrance: null,
          texteMentionPlurilingue: null
        }
      }
    ],
    titulaires: [
      {
        nom: "PAPADOPOULOS",
        prenoms: ["Ronna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 796,
        sexe: {
          _libelle: "Féminin"
        },
        naissance: {
          minute: null,
          heure: null,
          jour: 10,
          mois: 7,
          annee: 1965,
          voie: null,
          ville: "Skopje",
          arrondissement: null,
          region: "Skopje",
          pays: "République de Macédoine",
          lieuReprise: null
        },
        profession: "VENDEUR",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "De La Vega",
            sexe: {
              _libelle: "Féminin"
            },
            naissance: null,
            profession: "CHIMISTE",
            age: null,
            domicile: {
              voie: "50 route d'amboli",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Madeleine"]
          },
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "De La Vega",
            sexe: {
              _libelle: "Masculin"
            },
            naissance: null,
            profession: "Scrum Master",
            age: null,
            domicile: {
              voie: "La belle Hacienda",
              ville: "Mexico",
              arrondissement: null,
              region: null,
              pays: "Mexique"
            },
            prenoms: ["Diego"]
          }
        ],
        typeDeclarationConjointe: {
          _libelle: "aucune"
        },
        dateDeclarationConjointe: undefined,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      }
    ],
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c51-d00d-48ad-bbee-af2b01e2da74",
        nom: "DUPOIRE",
        sexe: {
          _libelle: "Masculin"
        },
        nationalite: {
          _libelle: "Française",
          _nom: "FRANCAISE",
          _libelleCourt: undefined
        },
        naissance: {
          minute: null,
          heure: null,
          jour: 13,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Calais",
          arrondissement: null,
          region: "Pas-de-Calais",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [
          {
            nom: "Duris",
            type: {
              _libelle: "Ancien nom"
            }
          }
        ],
        prenoms: ["Michel-Paul"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a0-9e8d-478c-b04c-c4c2ac17134f",
            numero: "413",
            statut: null,
            nature: {
              _libelle: "Naissance"
            }
          }
        ],
        lieuNaissance: {
          arrondissement: null,
          pays: "France",
          region: "Pas-de-Calais",
          ville: "Calais"
        },
        dateNaissance: {
          jour: 13,
          mois: 8,
          annee: 1975
        },
        lieuDeces: undefined,
        dateDeces: undefined
      }
    ],
    estReecrit: null,
    detailMariage: undefined,
    registre: {
      id: "7a777e9b-ecc3-4c62-b80d-a017bfa335b5",
      famille: "PAC",
      pocopa: "ORAN",
      annee: 2010,
      support1: "support 1",
      support2: "support 2",
      numeroDernierActe: "4564",
      pvOuverture: "pv_ouverture",
      dateOuverture: [1950, 11, 21],
      pvFermeture: "pv_fermeture",
      dateFermeture: [1981, 9, 21],
      decret2017: false,
      type: {
        id: "658d9694-1e12-486c-a36d-da1aeb2a29b3",
        famille: "MAR",
        pocopa: "pocopa",
        paysPocopa: "ARGENTINE",
        dateRattachement: [1999, 9, 23],
        dateTransfertScec: [1974, 2, 14],
        gereScec: false,
        estOuvert: false,
        description: ""
      }
    },
    motifAnnulation: "",
    dateInitialisationprojet: null,
    numeroProjet: "c3",
    corpsExtraitRectifications: [],
    corpsImage: null,
    corpsTexte: null,
    analyseMarginales: [
      {
        id: "2b14f039-6272-4e54-857a-7e7281d2c72e",
        dateDebut: {},
        dateFin: {},
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Barros",
            prenoms: ["Renan1", "Araujo", "Goncalves"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "Schlosser",
            prenoms: ["Cassandra2", "Clara", "Angela"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "Sousa",
            prenoms: ["Rodrigo3", "Melo"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 3,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          }
        ]
      },
      {
        id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
        dateDebut: {},
        dateFin: {},
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Javel",
            prenoms: ["Aude", "Adèle"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          }
        ]
      }
    ],
    type: {
      _libelle: "TEXTE"
    }
  };

  const response = mapTitulaireNaissanceEtParents(
    acteNaissance as any as IFicheActe,
    sasieEtrangerPaysVideEtVilleRenseigne.titulaireEvt1 as any as ITitulaireEvtForm
  );

  expect(response?.filiations?.[1].naissance.pays).toEqual(
    EtrangerFrance.getKey(EtrangerFrance.INCONNU)
  );

  expect(response?.filiations?.[0].naissance.pays).toEqual(
    EtrangerFrance.getKey(EtrangerFrance.FRANCE)
  );
});

test("Doit enregistrer Algérie sur le parent 1 en base quand le pays est Algérie et au moins ville/région saisie et le mode de saisie est Etranger", async () => {
  const sasieEtrangerPaysVideEtVilleRenseigne = {
    titulaireEvt1: {
      nomNaissance: "Barros",
      nomSecable: {
        secable: [],
        nomPartie1: "",
        nomPartie2: ""
      },
      declarationConjointe: {
        type: "ABSENCE_DECLARATION",
        date: {
          jour: "",
          mois: "",
          annee: ""
        }
      },
      prenoms: {
        prenom1: "Renan1",
        prenom2: "Araujo",
        prenom3: "Goncalves"
      },
      sexe: "FEMININ",
      evenement: {
        dateEvenement: {
          jour: "07",
          mois: "12",
          annee: "2000",
          nbHeure: "",
          nbMinute: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "07",
            mois: "12",
            annee: "2000"
          }
        },
        lieuEvenement: {
          lieuComplet: "Tijuana, Basse-Californie (Mexique)",
          ville: "Tijuana",
          arrondissement: "",
          regionDepartement: "Basse-Californie",
          pays: "Mexique",
          EtrangerFrance: "ETRANGER",
          villeEstAffichee: true
        }
      },
      adoptePar: [],
      parentNaiss1: {
        nomNaissance: "De La Vega",
        prenoms: {
          prenom1: "Madeleine",
          prenom2: "",
          prenom3: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "",
            mois: "",
            annee: ""
          }
        },
        sexe: "FEMININ",
        lieuNaissance: {
          lieuComplet: "Alger (Algérie)",
          ville: "",
          arrondissement: "",
          regionDepartement: "Alger",
          pays: "Algérie",
          EtrangerFrance: "ETRANGER",
          villeEstAffichee: false
        }
      },
      parentNaiss2: {
        nomNaissance: "De La Vega",
        prenoms: {
          prenom1: "Diego",
          prenom2: "",
          prenom3: ""
        },
        dateNaissanceOuAgeDe: {
          age: "",
          date: {
            jour: "",
            mois: "",
            annee: ""
          }
        },
        sexe: "MASCULIN",
        lieuNaissance: {
          lieuComplet: "Paris (France)",
          ville: "Paris",
          arrondissement: "",
          regionDepartement: "",
          pays: "",
          EtrangerFrance: "FRANCE",
          villeEstAffichee: true
        }
      },
      parentAdoptantNaiss1: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      },
      parentAdoptantNaiss2: {
        nomNaissance: "",
        prenoms: {
          prenom1: "",
          prenom2: "",
          prenom3: ""
        }
      }
    },
    evenement: {
      dateEvenement: {
        jour: "07",
        mois: "12",
        annee: "2000"
      },
      lieuEvenement: {
        lieuComplet: "Tijuana, Basse-Californie (Mexique)",
        ville: "Tijuana",
        arrondissement: "",
        regionDepartement: "Basse-Californie",
        pays: "Mexique",
        EtrangerFrance: "ETRANGER",
        villeEstAffichee: false
      },
      contratMariage: {
        existence: "",
        texte: undefined
      }
    },
    dernierConjoint: {
      nomNaissance: "",
      prenoms: ""
    },
    donneesComplementairesPlurilingues: {
      nomApresMariageEpoux: "",
      nomApresMariageEpouse: ""
    }
  } as any as ISaisieExtraitForm;

  const acteNaissance = {
    id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
    dateInitialisation: null,
    dateCreation: 1304330400000,
    modeCreation: "DRESSE",
    statut: "VALIDE",
    dateStatut: 1380362400000,
    nature: NatureActe.getEnumFor("NAISSANCE"),
    numero: "100",
    numeroBisTer: "552",
    nomOec: "MENARD",
    prenomOec: "MARC",
    dateDerniereDelivrance: {},
    dateDerniereMaj: {},
    visibiliteArchiviste: {
      _libelle: "MEAE"
    },
    evenement: {
      minute: null,
      heure: null,
      jour: 7,
      mois: 12,
      annee: 2000,
      voie: null,
      ville: "Tijuana",
      arrondissement: null,
      region: "Basse-Californie",
      pays: "Mexique",
      lieuReprise: null
    },
    mentions: [
      {
        id: "1a0aa3be-8311-465d-b750-d4c19834430d",
        numeroOrdre: 1,
        numeroOrdreExtrait: 1,
        villeApposition: "Tananarive",
        regionApposition: "region apposition",
        dateApposition: {},
        dateCreation: {},
        statut: undefined,
        dateStatut: {},
        titulaires: [
          {
            ordre: undefined,
            nom: undefined,
            sexe: "MASCULIN",
            nationalite: "FRANCAISE"
          }
        ],
        typeMention: {
          codeType: "3",
          libelleType: undefined,
          codeSousType: "3-1",
          libelleSousType: "Enregistrement du PACS",
          estActif: true,
          modeInformatisation: "OUI",
          nature: {
            _libelle: "PACS",
            _code: "2",
            _categorie: "",
            _estActif: true,
            _opposableAuTiers: true
          },
          sousTypeParDefaut: undefined,
          natureActe: {
            _libelle: "Naissance"
          }
        },
        autoriteEtatCivil: {
          libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
          nomOEC: "nom OEC",
          prenomOEC: "prenom OEC"
        },
        evenement: {
          minute: null,
          heure: null,
          jour: 15,
          mois: 6,
          annee: 2021,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "FRANCE",
          lieuReprise: null
        },
        textes: {
          texteMention:
            "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008. Nantes, le 13 juillet 2010. L'officier de l'état civil, Mkoufoundi AMINA MOHAMED Mariée à Mamoudzou (Mayotte) le 19 mai 2012 avec Ouri ATTUA BOINA.",
          texteApposition: "Nantes, le 25 juin 2012",
          texteOEC: "L'officier de l'état civil, Zahabia ANTOY MOHAMED",
          texteMentionDelivrance: null,
          texteMentionPlurilingue: null
        }
      },
      {
        id: "1a0aa3be-8311-465d-b750-d4c19834430e",
        numeroOrdre: 1,
        numeroOrdreExtrait: 1,
        villeApposition: "Tananarive",
        regionApposition: "region apposition",
        dateApposition: {},
        dateCreation: {},
        statut: undefined,
        dateStatut: {},
        titulaires: [
          {
            ordre: undefined,
            nom: undefined,
            sexe: "MASCULIN",
            nationalite: "FRANCAISE"
          }
        ],
        typeMention: {
          codeType: "2",
          libelleType: undefined,
          codeSousType: "2-1-a",
          libelleSousType: "Divorce en France",
          estActif: true,
          modeInformatisation: "OUI",
          nature: {
            _libelle: "Divorce",
            _code: "5",
            _categorie: "",
            _estActif: true,
            _opposableAuTiers: true
          },
          sousTypeParDefaut: undefined,
          natureActe: {
            _libelle: "Naissance"
          }
        },
        autoriteEtatCivil: {
          libelleTypeAutoriteEtatCivil: "libelle autorite etat civil",
          nomOEC: "nom OEC",
          prenomOEC: "prenom OEC"
        },
        evenement: {
          minute: null,
          heure: null,
          jour: 15,
          mois: 6,
          annee: 2021,
          voie: null,
          ville: "nantes",
          arrondissement: null,
          region: "Pays de Loire",
          pays: "FRANCE",
          lieuReprise: null
        },
        textes: {
          texteMention:
            "Mariée MENTION UNE à Tananarive 1er arr. (Madagascar) le 27 septembre 2001 avec AMINA HAMADI MRIKAOU. Acte transcrit au Consulat Général de France à Tananarive sous le n° 2001/1546. Nantes, le 7 décembre 2001. L'officier de l'état civil, Hanima KAMARIA ABDALLAH#Divorcée de AMINA HAMADI MRIKAOU par arrêt du Tribunal Supérieur d'Appel de Mamoudzou (Mayotte) rendu le 4 novembre 2008.",
          texteApposition: null,
          texteOEC: null,
          texteMentionDelivrance: null,
          texteMentionPlurilingue: null
        }
      }
    ],
    titulaires: [
      {
        nom: "PAPADOPOULOS",
        prenoms: ["Ronna"],
        autresNoms: null,
        autresPrenoms: null,
        ordre: 796,
        sexe: {
          _libelle: "Féminin"
        },
        naissance: {
          minute: null,
          heure: null,
          jour: 10,
          mois: 7,
          annee: 1965,
          voie: null,
          ville: "Skopje",
          arrondissement: null,
          region: "Skopje",
          pays: "République de Macédoine",
          lieuReprise: null
        },
        profession: "VENDEUR",
        age: null,
        domicile: {
          voie: "7 Rue du Noyer",
          ville: "Bruxelles",
          arrondissement: null,
          region: "Flandre",
          pays: "BELGIQUE"
        },
        filiations: [
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "De La Vega",
            sexe: {
              _libelle: "Féminin"
            },
            naissance: null,
            profession: "CHIMISTE",
            age: null,
            domicile: {
              voie: "50 route d'amboli",
              ville: "Djibouti",
              arrondissement: null,
              region: null,
              pays: "DJIBOUTI"
            },
            prenoms: ["Madeleine"]
          },
          {
            lienParente: "PARENT",
            ordre: 752,
            nom: "De La Vega",
            sexe: {
              _libelle: "Masculin"
            },
            naissance: null,
            profession: "Scrum Master",
            age: null,
            domicile: {
              voie: "La belle Hacienda",
              ville: "Mexico",
              arrondissement: null,
              region: null,
              pays: "Mexique"
            },
            prenoms: ["Diego"]
          }
        ],
        typeDeclarationConjointe: {
          _libelle: "aucune"
        },
        dateDeclarationConjointe: undefined,
        nomPartie1: null,
        nomPartie2: null,
        nomAvantMariage: null,
        nomApresMariage: null,
        nomDernierConjoint: null,
        prenomsDernierConjoint: null
      }
    ],
    piecesAnnexes: [],
    alerteActes: [],
    personnes: [
      {
        id: "e7114c51-d00d-48ad-bbee-af2b01e2da74",
        nom: "DUPOIRE",
        sexe: {
          _libelle: "Masculin"
        },
        nationalite: {
          _libelle: "Française",
          _nom: "FRANCAISE",
          _libelleCourt: undefined
        },
        naissance: {
          minute: null,
          heure: null,
          jour: 13,
          mois: 8,
          annee: 1975,
          voie: null,
          ville: "Calais",
          arrondissement: null,
          region: "Pas-de-Calais",
          pays: "France",
          lieuReprise: null
        },
        autresNoms: [
          {
            nom: "Duris",
            type: {
              _libelle: "Ancien nom"
            }
          }
        ],
        prenoms: ["Michel-Paul"],
        autresPrenoms: [],
        parents: [],
        enfants: [],
        rcs: [],
        rcas: [],
        pacss: [],
        actes: [
          {
            id: "b41079a0-9e8d-478c-b04c-c4c2ac17134f",
            numero: "413",
            statut: null,
            nature: {
              _libelle: "Naissance"
            }
          }
        ],
        lieuNaissance: {
          arrondissement: null,
          pays: "France",
          region: "Pas-de-Calais",
          ville: "Calais"
        },
        dateNaissance: {
          jour: 13,
          mois: 8,
          annee: 1975
        },
        lieuDeces: undefined,
        dateDeces: undefined
      }
    ],
    estReecrit: null,
    detailMariage: undefined,
    registre: {
      id: "7a777e9b-ecc3-4c62-b80d-a017bfa335b5",
      famille: "PAC",
      pocopa: "ORAN",
      annee: 2010,
      support1: "support 1",
      support2: "support 2",
      numeroDernierActe: "4564",
      pvOuverture: "pv_ouverture",
      dateOuverture: [1950, 11, 21],
      pvFermeture: "pv_fermeture",
      dateFermeture: [1981, 9, 21],
      decret2017: false,
      type: {
        id: "658d9694-1e12-486c-a36d-da1aeb2a29b3",
        famille: "MAR",
        pocopa: "pocopa",
        paysPocopa: "ARGENTINE",
        dateRattachement: [1999, 9, 23],
        dateTransfertScec: [1974, 2, 14],
        gereScec: false,
        estOuvert: false,
        description: ""
      }
    },
    motifAnnulation: "",
    dateInitialisationprojet: null,
    numeroProjet: "c3",
    corpsExtraitRectifications: [],
    corpsImage: null,
    corpsTexte: null,
    analyseMarginales: [
      {
        id: "2b14f039-6272-4e54-857a-7e7281d2c72e",
        dateDebut: {},
        dateFin: {},
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Barros",
            prenoms: ["Renan1", "Araujo", "Goncalves"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "Schlosser",
            prenoms: ["Cassandra2", "Clara", "Angela"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 2,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          },
          {
            nom: "Sousa",
            prenoms: ["Rodrigo3", "Melo"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 3,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          }
        ]
      },
      {
        id: "6e89c1c1-16c4-4e40-9b72-7b567270b26f",
        dateDebut: {},
        dateFin: {},
        nomOec: "Lens",
        prenomOec: "Alexis",
        motifModification: "CHANGEMENT_PRENOM",
        titulaires: [
          {
            nom: "Javel",
            prenoms: ["Aude", "Adèle"],
            autresNoms: null,
            autresPrenoms: null,
            ordre: 1,
            sexe: {
              _libelle: "Non renseigné"
            },
            naissance: null,
            profession: null,
            age: null,
            domicile: null,
            filiations: [],
            typeDeclarationConjointe: {
              _libelle: "aucune"
            },
            dateDeclarationConjointe: undefined,
            nomPartie1: null,
            nomPartie2: null,
            nomAvantMariage: null,
            nomApresMariage: null,
            nomDernierConjoint: null,
            prenomsDernierConjoint: null
          }
        ]
      }
    ],
    type: {
      _libelle: "TEXTE"
    }
  };

  const response = mapTitulaireNaissanceEtParents(
    acteNaissance as any as IFicheActe,
    sasieEtrangerPaysVideEtVilleRenseigne.titulaireEvt1 as any as ITitulaireEvtForm
  );

  expect(response?.filiations?.[0].naissance.pays).toEqual("Algérie");
  expect(response?.filiations?.[1].naissance.pays).toEqual(
    EtrangerFrance.getKey(EtrangerFrance.FRANCE)
  );
});

test("Attendu: saisiePaysInconnuTitulaire fonctionne correctement", () => {
  const natureActe = NatureActe.getEnumFor("MARIAGE");
  const natureActe2 = NatureActe.getEnumFor("NAISSANCE");
  const natureActe3 = NatureActe.getEnumFor("DECES");
  const titulaire = {
    nom: "Michel de lavandière du grand-large",
    prenoms: ["lolita"],
    autresNoms: null,
    autresPrenoms: null,
    ordre: 2,
    sexe: "FEMININ",
    naissance: {
      minute: null,
      heure: null,
      jour: 17,
      mois: 4,
      annee: 1970,
      voie: null,
      ville: "Sitka",
      arrondissement: null,
      region: "Alaska",
      pays: "Inconnu",
      lieuReprise: null
    },
    profession: "DEVELOPPEUR",
    age: null,
    domicile: {
      voie: "Ilot du Héron",
      ville: "Djibouti",
      arrondissement: null,
      region: null,
      pays: "DJIBOUTI"
    },
    filiations: [
      {
        lienParente: "PARENT",
        ordre: 752,
        nom: "Rodriguez",
        sexe: "FEMININ",
        naissance: null,
        profession: "Technicien",
        age: null,
        domicile: {
          voie: "40 place de la République",
          ville: "Nantes",
          arrondissement: null,
          region: null,
          pays: "France"
        },
        prenoms: ["Constance"]
      }
    ]
  } as any as ITitulaireActe;

  const titulaire2 = {
    nom: "Michel de lavandière du grand-large",
    prenoms: ["lolita"],
    autresNoms: null,
    autresPrenoms: null,
    ordre: 2,
    sexe: "FEMININ",
    naissance: {
      minute: null,
      heure: null,
      jour: 17,
      mois: 4,
      annee: 1970,
      voie: null,
      ville: "Sitka",
      arrondissement: null,
      region: "Alaska",
      pays: "Algérie",
      lieuReprise: null
    },
    profession: "DEVELOPPEUR",
    age: null,
    domicile: {
      voie: "Ilot du Héron",
      ville: "Djibouti",
      arrondissement: null,
      region: null,
      pays: "DJIBOUTI"
    },
    filiations: [
      {
        lienParente: "PARENT",
        ordre: 752,
        nom: "Rodriguez",
        sexe: "FEMININ",
        naissance: null,
        profession: "Technicien",
        age: null,
        domicile: {
          voie: "40 place de la République",
          ville: "Nantes",
          arrondissement: null,
          region: null,
          pays: "France"
        },
        prenoms: ["Constance"]
      }
    ]
  } as any as ITitulaireActe;

  expect(
    saisiePaysInconnuTitulaire(natureActe as any as NatureActe, titulaire)
  ).toBe(true);

  expect(
    saisiePaysInconnuTitulaire(natureActe2 as any as NatureActe, titulaire)
  ).toBe(false);

  expect(
    saisiePaysInconnuTitulaire(natureActe3 as any as NatureActe, titulaire2)
  ).toBe(false);

  expect(
    saisiePaysInconnuTitulaire(natureActe3 as any as NatureActe, titulaire)
  ).toBe(true);
});

test("Attendu: saisieParentPaysInconnu fonctionne correctement", () => {
  const natureActeMariage = NatureActe.getEnumFor("MARIAGE");
  const natureActeNaissance = NatureActe.getEnumFor("NAISSANCE");
  const parent = {
    lienParente: "PARENT",
    ordre: 752,
    nom: "Rodriguez",
    sexe: "FEMININ",
    naissance: null,
    profession: "Technicien",
    age: null,
    domicile: {
      voie: "40 place de la République",
      ville: "Nantes",
      arrondissement: null,
      region: null,
      pays: "France"
    },
    prenoms: ["Constance"]
  } as any as IFiliation;

  const parent2 = {
    lienParente: "PARENT",
    ordre: 752,
    nom: "Rodriguez",
    sexe: "FEMININ",
    naissance: {
      pays: "Inconnu"
    },
    profession: "Technicien",
    age: null,
    domicile: {
      voie: "40 place de la République",
      ville: "Nantes",
      arrondissement: null,
      region: null,
      pays: "Inconnu"
    },
    prenoms: ["Constance"]
  } as any as IFiliation;
  expect(
    saisieParentPaysInconnu(natureActeMariage as any as NatureActe, parent)
  ).toBe(false);

  expect(
    saisieParentPaysInconnu(natureActeNaissance as any as NatureActe, parent)
  ).toBe(false);

  expect(
    saisieParentPaysInconnu(natureActeNaissance as any as NatureActe, parent2)
  ).toBe(true);
});
