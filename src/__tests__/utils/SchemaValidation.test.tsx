import { ValeursConditionneesMetaModele } from "@model/etatcivil/typesMention/MetaModeleTypeMention";
import { ConditionChamp, EOperateurCondition, IConditionChampDto } from "@model/form/commun/ConditionChamp";
import { NumeroRcRcaPacsForm } from "@model/form/commun/NumeroRcRcaPacsForm";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import * as Yup from "yup";
import ChampCaseACocher from "../../composants/commun/champs/ChampCaseACocher";
import ChampDate from "../../composants/commun/champs/ChampDate";
import ChampListeDeroulante from "../../composants/commun/champs/ChampListeDeroulante";
import ChampTexte from "../../composants/commun/champs/ChampTexte";
import ChampsAnneeEtNumero from "../../composants/commun/champs/ChampsAnneeEtNumero";
import ChampsNomSecable from "../../composants/commun/champs/ChampsNomSecable";
import ChampsNumerosRcRcaPacs from "../../composants/commun/champs/ChampsNumerosRcRcaPacs";
import ChampsPrenoms from "../../composants/commun/champs/ChampsPrenoms";
import { CaracteresAdresseCourrielAutorises, CaracteresAutorises } from "../../ressources/Regex";
import SchemaValidation, { messagesErreur } from "../../utils/SchemaValidation";

const conditionToujoursObligatoire = (idChampReference: string): ConditionChamp[] | boolean => [
  ConditionChamp.depuisDto({
    operateur: EOperateurCondition.TOUJOURS_VRAI,
    idChampReference: idChampReference,
    valeurs: []
  } as IConditionChampDto)!
];

const MockFormulaire: React.FC<{ valeursInitiales: any; schemaDeValidation: Yup.AnySchema; children: React.ReactNode }> = ({
  valeursInitiales,
  schemaDeValidation,
  children
}) => (
  <Formik
    initialValues={valeursInitiales}
    validationSchema={schemaDeValidation}
    onSubmit={() => {}}
  >
    <Form>
      {children}
      <button type="submit">Valider</button>
    </Form>
  </Formik>
);

describe("Schéma de validation: objet", () => {
  test("Valide un objet avec des champs imbriqués", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ departement: { ville: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          departement: SchemaValidation.objet({
            ville: SchemaValidation.texte({ obligatoire: true })
          })
        })}
      >
        <ChampTexte name="departement.ville" />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeDefined());
  });
});

describe("Schéma de validation: texte", () => {
  test("LORSQUE le formulaire est soumis avec un texte invalide via regex, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ texte: "" }}
        schemaDeValidation={SchemaValidation.objet({
          texte: SchemaValidation.texte({
            listeRegexp: [{ valeur: CaracteresAutorises, message: messagesErreur.CARACTERE_NON_AUTORISE }],
            obligatoire: conditionToujoursObligatoire("texte")
          })
        })}
      >
        <ChampTexte
          name="texte"
          libelle="Texte"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByLabelText("Texte"), "texte)");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CARACTERE_NON_AUTORISE)).toBeDefined());
  });
});

describe("Schéma de validation: entier", () => {
  test("LORSQUE obligatoire et vide, ALORS erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ entier: "" }}
        schemaDeValidation={SchemaValidation.objet({
          entier: SchemaValidation.entier({ obligatoire: true })
        })}
      >
        <ChampTexte name="entier" />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeDefined());
  });

  test("LORSQUE non entier, ALORS erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ entier: "1.5" }}
        schemaDeValidation={SchemaValidation.objet({
          entier: SchemaValidation.entier()
        })}
      >
        <ChampTexte name="entier" />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DOIT_ETRE_ENTIER)).toBeDefined());
  });

  test("LORSQUE hors min/max, ALORS erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ entier: "" }}
        schemaDeValidation={SchemaValidation.objet({
          entier: SchemaValidation.entier({ min: { valeur: 10 }, max: { valeur: 20 } })
        })}
      >
        <ChampTexte
          name="entier"
          libelle="Entier"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("Entier"), { target: { value: "5" } });
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(/⚠ La valeur ne peut pas être inférieure à 10/i)).toBeDefined());

    fireEvent.change(screen.getByLabelText("Entier"), { target: { value: "25" } });
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(/⚠ La valeur ne peut pas être supérieure à 20/i)).toBeDefined());
  });
});

describe("Schéma de validation: booleen", () => {
  test("LORSQUE obligatoire et faux, ALORS pas d’erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ booleen: false }}
        schemaDeValidation={SchemaValidation.objet({
          booleen: SchemaValidation.booleen({ obligatoire: true })
        })}
      >
        <ChampCaseACocher
          name="booleen"
          libelle="case à cocher"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeNull());
  });
});

describe("Schéma de validation: listeDeroulante", () => {
  test("LORSQUE valeur non dans options, ALORS erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ liste: "" }}
        schemaDeValidation={SchemaValidation.objet({
          liste: SchemaValidation.listeDeroulante({ options: ["a", "b"], obligatoire: true })
        })}
      >
        <ChampListeDeroulante
          name="liste"
          libelle="Liste"
          options={[
            { cle: "", libelle: "Choisir..." },
            { cle: "a", libelle: "Option A" },
            { cle: "b", libelle: "Option B" }
          ]}
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: /valider/i }));

    await waitFor(() => {
      expect(screen.getByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeDefined();
    });
  });

  test("Devrait invalider une valeur non autorisée lorsque les valeurs possibles dépendent d’une condition remplie", async () => {
    const valeursPossibles = [
      ValeursConditionneesMetaModele.depuisDto({
        valeurs: ["valeur1"],
        conditions: [
          {
            idChampReference: "autre",
            operateur: EOperateurCondition.EGAL,
            valeurs: ["trigger"]
          }
        ]
      })!
    ];

    render(
      <MockFormulaire
        valeursInitiales={{ liste: "valeur2", autre: "trigger" }}
        schemaDeValidation={SchemaValidation.objet({
          liste: SchemaValidation.listeDeroulante({ valeursPossibles }),
          autre: SchemaValidation.texte()
        })}
      >
        <ChampListeDeroulante
          name="liste"
          libelle="Liste"
          options={[
            { cle: "valeur1", libelle: "Valeur 1" },
            { cle: "valeur2", libelle: "Valeur 2" }
          ]}
        />
        <ChampTexte
          name="autre"
          libelle="Autre"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: /valider/i }));

    await waitFor(() => {
      expect(screen.getByText(messagesErreur.CHAMP_VALEUR_IMPOSEE)).toBeDefined();
    });
  });
});

describe("Schéma de validation: dateComplete", () => {
  test("LORSQUE la date est incomplète, ALORS une erreur indique qu'elle est incomplète", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "", mois: "01", annee: "2023" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_INCOMPLETE)).toBeDefined());
  });

  test("LORSQUE la date est future et que cela est bloqué, ALORS une erreur indique qu'elle dépasse la date du jour", async () => {
    const anneeFuture = dayjs().year() + 2;
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "01", mois: "01", annee: `${anneeFuture}` } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ bloquerDateFuture: true, obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(/⚠ La date ne peut pas être supérieure à la date du jour/i)).toBeDefined());
  });

  test("LORSQUE la date est invalide, ALORS une erreur indique que la date n'est pas valide", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "30", mois: "02", annee: "2023" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_INVALIDE)).toBeDefined());
  });

  test("LORSQUE l'heure est >= 24, ALORS une erreur de date invalide apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "01", mois: "01", annee: "2023", heure: "25", minute: "00" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_INVALIDE)).toBeDefined());
  });

  test("LORSQUE les minutes sont >= 60, ALORS une erreur de date invalide apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "01", mois: "01", annee: "2023", heure: "12", minute: "60" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_INVALIDE)).toBeDefined());
  });

  test("LORSQUE seule l'année est future avec bloquerDateFuture, ALORS erreur", async () => {
    const anneeFuture = dayjs().year() + 1;
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "", mois: "", annee: `${anneeFuture}` } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ bloquerDateFuture: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_FUTURE)).toBeDefined());
  });

  test("LORSQUE année et mois futurs avec bloquerDateFuture, ALORS erreur", async () => {
    const anneeActuelle = dayjs().year();
    const moisFutur = dayjs().month() + 2;
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "", mois: `${moisFutur}`, annee: `${anneeActuelle}` } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateComplete({ bloquerDateFuture: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_FUTURE)).toBeDefined());
  });
});

describe("Schéma de validation: dateIncomplete", () => {
  test("LORSQUE l’année est manquante mais que le jour et le mois sont renseignés, ALORS une erreur indique que la date est incomplète", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "01", mois: "01", annee: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateIncomplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.DATE_INCOMPLETE)).toBeDefined());
  });

  test("LORSQUE seule l’année est renseignée, ALORS la date est considérée valide si le champ est obligatoire", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ date: { jour: "", mois: "", annee: "2023" } }}
        schemaDeValidation={SchemaValidation.objet({
          date: SchemaValidation.dateIncomplete({ obligatoire: true })
        })}
      >
        <ChampDate
          libelle="date"
          name="date"
        />
      </MockFormulaire>
    );

    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });
});

describe("Schéma de validation: annee", () => {
  test("LORSQUE l’année est inférieure à la valeur minimale, ALORS une erreur indique qu’elle est invalide", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ annee: "" }}
        schemaDeValidation={SchemaValidation.objet({
          annee: SchemaValidation.annee({ min: { valeur: 2000 }, obligatoire: true })
        })}
      >
        <ChampTexte
          name="annee"
          libelle="Année"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("Année"), { target: { value: "199" } });
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ L'année doit être sur 4 chiffres")).toBeDefined());
  });

  test("LORSQUE l’année est supérieure à l’année actuelle, ALORS une erreur indique qu’elle ne peut pas être future", async () => {
    const anneeFuture = dayjs().year() + 2;
    render(
      <MockFormulaire
        valeursInitiales={{ annee: "" }}
        schemaDeValidation={SchemaValidation.objet({
          annee: SchemaValidation.annee({ obligatoire: true })
        })}
      >
        <ChampTexte
          name="annee"
          libelle="Année"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("Année"), { target: { value: `${anneeFuture}` } });
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ L'année ne peut pas être supérieure à l'année actuelle")).toBeDefined());
  });
});

describe("Schéma de validation: nomSecable", () => {
  test("LORSQUE le formulaire est soumis et que le champ nom est vide, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ nomSecable: { nom: "", secable: false, nomPartie1: "", nomPartie2: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          nomSecable: SchemaValidation.nomSecable({ obligatoire: conditionToujoursObligatoire("nomSecable.nom") })
        })}
      >
        <ChampsNomSecable
          nom={{ name: "nomSecable.nom", libelle: "Nom" }}
          secable={{ name: "nomSecable.secable", libelle: "Nom sécable" }}
          nomPartie1={{ name: "nomSecable.nomPartie1", libelle: "Nom 1re partie" }}
          nomPartie2={{ name: "nomSecable.nomPartie2", libelle: "Nom 2nde partie" }}
        />
      </MockFormulaire>
    );
    userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeDefined());
  });
});

describe("Schéma de validation: prenoms", () => {
  test("LORSQUE prénom2 est rempli mais prénom1 est vide, ALORS erreur sur prénom1", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{
          prenoms: {
            ...PrenomsForm.valeursInitiales(),
            prenom2: "Jean",
            nombrePrenomsAffiches: 2
          }
        }}
        schemaDeValidation={SchemaValidation.objet({
          prenoms: SchemaValidation.prenoms("prenoms.prenom")
        })}
      >
        <ChampsPrenoms
          cheminPrenoms="prenoms"
          prefixePrenom="prenom"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.PRENOM_OBLIGATOIRE)).toBeDefined());
  });

  test("LORSQUE prénom5 est rempli mais prénom2, 3 et 4 sont vides, ALORS erreurs sur prénom2, 3 et 4", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{
          prenoms: {
            ...PrenomsForm.valeursInitiales(),
            prenom1: "Jean",
            prenom5: "Marie",
            nombrePrenomsAffiches: 5
          }
        }}
        schemaDeValidation={SchemaValidation.objet({
          prenoms: SchemaValidation.prenoms("prenoms.prenom")
        })}
      >
        <ChampsPrenoms
          cheminPrenoms="prenoms"
          prefixePrenom="prenom"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => {
      const erreurs = screen.getAllByText(messagesErreur.PRENOM_OBLIGATOIRE);
      expect(erreurs).toHaveLength(3);
    });
  });
});

describe("Schéma de validation: champsAnneeEtNumero", () => {
  test("LORSQUE le numéro est rempli mais l'année est vide, ALORS une erreur apparait sur l'année", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: { numero: "", annee: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.champsAnneeEtNumero({ obligatoire: false })
        })}
      >
        <ChampsAnneeEtNumero
          name="champ"
          libelle="Numéro"
          tailleMaxNumero={5}
          caractereSeparateur="/"
        />
      </MockFormulaire>
    );

    const champNumero = screen.getByPlaceholderText("XXXXX");
    await userEvent.type(champNumero, "12345");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_INCOMPLET)).toBeDefined());
  });

  test("LORSQUE l'année est remplie mais le numéro est vide, ALORS une erreur apparait sur le numéro", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: { numero: "", annee: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.champsAnneeEtNumero({ obligatoire: false })
        })}
      >
        <ChampsAnneeEtNumero
          name="champ"
          libelle="Numéro"
          tailleMaxNumero={5}
          caractereSeparateur="/"
        />
      </MockFormulaire>
    );

    const champAnnee = screen.getByPlaceholderText("AAAA");
    await userEvent.type(champAnnee, "2023");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_INCOMPLET)).toBeDefined());
  });
});

describe("Schéma de validation: champsNumeroRcRcaPacs", () => {
  test("LORSQUE le formulaire est soumis et que le champ n'est pas valide, ALORS une erreur apparait", async () => {
    const { container } = render(
      <MockFormulaire
        valeursInitiales={{ numero: NumeroRcRcaPacsForm.valeursInitiales() }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosRcRcaPacs({
            prefix: `numero.ligne`,
            tailleMax: 1,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampsNumerosRcRcaPacs
          libelle={"Numéro"}
          cheminNumeroRcRcaPacs={"numero"}
          prefixeNumeroRcRcaPacs={"ligne"}
          tailleMax={1}
        />
      </MockFormulaire>
    );

    const boutonValider = screen.getByRole("button", { name: "Valider" });

    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    const [champAnnee, champNumero] = screen.getAllByRole("textbox");

    await userEvent.type(champAnnee, "123");
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    await userEvent.clear(champAnnee);
    await userEvent.type(champAnnee, `${dayjs().get("year") + 1}`);
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    await userEvent.clear(champAnnee);
    await userEvent.type(champNumero, "4");
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("LORSQUE plusieurs champs sont présents, ALORS les bonnes erreurs apparaissent sur les bons champs", async () => {
    const { container } = render(
      <MockFormulaire
        valeursInitiales={{ numero: { ...NumeroRcRcaPacsForm.valeursInitiales() } }}
        schemaDeValidation={SchemaValidation.objet({
          numero: SchemaValidation.numerosRcRcaPacs({
            prefix: `numero.ligne`,
            tailleMax: 6,
            obligatoire: conditionToujoursObligatoire("numero.ligne1")
          })
        })}
      >
        <ChampsNumerosRcRcaPacs
          libelle={"Numéro"}
          cheminNumeroRcRcaPacs={"numero"}
          prefixeNumeroRcRcaPacs={"ligne"}
          tailleMax={6}
        />
      </MockFormulaire>
    );

    const boutonAjout = screen.getByRole("button", { name: "Ajouter un numéro" });
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);
    await userEvent.click(boutonAjout);

    const boutonValider = screen.getByRole("button", { name: "Valider" });
    await userEvent.click(boutonValider);
    expect(container.firstChild).toMatchSnapshot();

    const champs = screen.getAllByRole("textbox");
    const dernierChampNumero = champs.pop();
    const dernierChampAnnee = champs.pop();
    expect(dernierChampNumero).toBeDefined();
    expect(dernierChampAnnee).toBeDefined();

    if (dernierChampNumero && dernierChampAnnee) {
      await userEvent.type(dernierChampAnnee, "1900");
      await userEvent.type(dernierChampNumero, "11111");
      await userEvent.click(boutonValider);
      expect(container.firstChild).toMatchSnapshot();
    }
  });
});

describe("Schéma de validation: referenceRECE", () => {
  test("LORSQUE l'année est inférieure à 2021, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ reference: { numero: "", annee: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          reference: SchemaValidation.referenceRECE({ obligatoire: false })
        })}
      >
        <ChampsAnneeEtNumero
          name="reference"
          libelle="Référence RECE"
          tailleMaxNumero={5}
          caractereSeparateur="/"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByPlaceholderText("AAAA"), "2020");
    await userEvent.type(screen.getByPlaceholderText("XXXXX"), "12345");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.ANNEE_POST_2020)).toBeDefined());
  });

  test("LORSQUE autoriserAnneeSeulement est true et seulement l'année est remplie, ALORS aucune erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ reference: { numero: "", annee: "" } }}
        schemaDeValidation={SchemaValidation.objet({
          reference: SchemaValidation.referenceRECE({ obligatoire: false, autoriserAnneeSeulement: true })
        })}
      >
        <ChampsAnneeEtNumero
          name="reference"
          libelle="Référence RECE"
          tailleMaxNumero={5}
          caractereSeparateur="/"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByPlaceholderText("AAAA"), "2023");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });
});

describe("Schéma de validation: courriel", () => {
  test("LORSQUE l'courriel est obligatoire et vide, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({ obligatoire: true })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeDefined());
  });

  test("LORSQUE l'courriel est invalide, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({ obligatoire: true })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByLabelText("courriel"), "courriel-invalide");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(messagesErreur.COURRIEL_INVALIDE)).toBeDefined());
  });

  test("LORSQUE l'courriel est valide, ALORS aucune erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({ obligatoire: true })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByLabelText("courriel"), "test@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });

  test("LORSQUE l'courriel dépasse la longueur maximale, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({ obligatoire: true, max: { valeur: 50 } })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("courriel"), { target: { value: "a".repeat(100) + "@example.com" } });
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText(/Le maximum de caractères autorisés est de 50./i)).toBeDefined());
  });

  test("LORSQUE l'courriel n'est pas obligatoire et vide, ALORS aucune erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({ obligatoire: false })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });

  test("LORSQUE l'courriel contient des formats valides variés, ALORS aucune erreur", async () => {
    const courrielsValides = [
      "test@rece.fr",
      "utilisateur@rece.com",
      "utilisateur+1@example.co.uk",
      "utilisateur_skywalker@diplomatie-domaine.fr"
    ];

    for (const courriel of courrielsValides) {
      const { unmount } = render(
        <MockFormulaire
          valeursInitiales={{ courriel: "" }}
          schemaDeValidation={SchemaValidation.objet({
            courriel: SchemaValidation.courriel({ obligatoire: true })
          })}
        >
          <ChampTexte
            name="courriel"
            libelle="courriel"
          />
        </MockFormulaire>
      );

      await userEvent.type(screen.getByLabelText("courriel"), courriel);
      await userEvent.click(screen.getByRole("button", { name: "Valider" }));
      await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());

      unmount();
    }
  });

  test("LORSQUE l'courriel contient des formats invalides, ALORS une erreur apparait", async () => {
    const courrielsInvalides = ["invalide", "@rece.fr", "utlisateur@", "utilisateur skywalker@rece.com", "skywalker@diplomatie"];

    for (const courriel of courrielsInvalides) {
      const { unmount } = render(
        <MockFormulaire
          valeursInitiales={{ courriel: "" }}
          schemaDeValidation={SchemaValidation.objet({
            courriel: SchemaValidation.courriel({ obligatoire: true })
          })}
        >
          <ChampTexte
            name="courriel"
            libelle="courriel"
          />
        </MockFormulaire>
      );

      fireEvent.change(screen.getByLabelText("courriel"), { target: { value: courriel } });
      await userEvent.click(screen.getByRole("button", { name: "Valider" }));
      await waitFor(() => expect(screen.getByText("⚠ L'adresse courriel est invalide")).toBeDefined());

      unmount();
    }
  });

  test("LORSQUE une regex personnalisée est fournie, ALORS elle est appliquée à la validation du courriel", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ courriel: "" }}
        schemaDeValidation={SchemaValidation.objet({
          courriel: SchemaValidation.courriel({
            obligatoire: true,
            listeRegexp: [{ valeur: CaracteresAdresseCourrielAutorises, message: messagesErreur.COURRIEL_INVALIDE }]
          })
        })}
      >
        <ChampTexte
          name="courriel"
          libelle="courriel"
        />
      </MockFormulaire>
    );

    await userEvent.type(screen.getByLabelText("courriel"), "te(st@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Valider" }));

    await waitFor(() => {
      expect(screen.getByText(messagesErreur.COURRIEL_INVALIDE)).toBeDefined();
    });
  });
});

describe("Schéma de validation: inconnu", () => {
  test("LORSQUE le champ inconnu contient n'importe quelle valeur, ALORS aucune erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: "test" }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.inconnu()
        })}
      >
        <ChampTexte
          name="champ"
          libelle="Champ"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });

  test("LORSQUE le champ inconnu est vide, ALORS aucune erreur", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: "" }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.inconnu()
        })}
      >
        <ChampTexte
          name="champ"
          libelle="Champ"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(/⚠/)).toBeNull());
  });
});

describe("Schéma de validation: comparerValeurChamps", () => {
  test("LORSQUE le formulaire est soumis et que deux champs inter-dépendants ne remplissent pas la conditon, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ1: "", champ2: "" }}
        schemaDeValidation={SchemaValidation.objet({
          champ1: SchemaValidation.texte({
            comparaisonValeurAutreChamp: {
              cheminChampCompare: "champ2",
              operateur: EOperateurCondition.EGAL,
              messageErreurSpecifique: "⚠ Incohérence entre les valeurs champ2/champ1"
            }
          }),
          champ2: SchemaValidation.texte({
            comparaisonValeurAutreChamp: {
              cheminChampCompare: "champ1",
              operateur: EOperateurCondition.EGAL,
              messageErreurSpecifique: "⚠ Incohérence entre les valeurs champ1/champ2"
            }
          })
        })}
      >
        <ChampTexte
          name="champ1"
          libelle="champ1"
        />
        <ChampTexte
          name="champ2"
          libelle="champ2"
        />
      </MockFormulaire>
    );

    fireEvent.change(screen.getByLabelText("champ1"), { target: { value: "Bonjour" } });
    fireEvent.change(screen.getByLabelText("champ2"), { target: { value: "Au revoir" } });
    fireEvent.click(screen.getByText("Valider"));

    await waitFor(() => {
      expect(screen.getByText("⚠ Incohérence entre les valeurs champ2/champ1")).toBeDefined();
      expect(screen.getByText("⚠ Incohérence entre les valeurs champ1/champ2")).toBeDefined();
    });
  });
});

describe("Schéma de validation: cas spécifiques ", () => {
  test("LORSQUE la condition est AlwaysFalse, ALORS le champ n’est jamais obligatoire", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: "" }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.texte({
            obligatoire: [
              {
                idChampReference: "champ",
                operateur: "AlwaysFalse",
                valeurs: []
              } as any
            ]
          })
        })}
      >
        <ChampTexte
          name="champ"
          libelle="Champ"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.queryByText(messagesErreur.CHAMP_OBLIGATOIRE)).toBeNull());
  });

  test("LORSQUE interditSeul est actif et le champ est seul, ALORS une erreur apparait", async () => {
    render(
      <MockFormulaire
        valeursInitiales={{ champ: "valeur" }}
        schemaDeValidation={SchemaValidation.objet({
          champ: SchemaValidation.texte({
            interditSeul: { messageErreurSpecifique: "⚠ Champ seul interdit" }
          })
        })}
      >
        <ChampTexte
          name="champ"
          libelle="Champ"
        />
      </MockFormulaire>
    );

    await userEvent.click(screen.getByRole("button", { name: "Valider" }));
    await waitFor(() => expect(screen.getByText("⚠ Champ seul interdit")).toBeDefined());
  });
});
