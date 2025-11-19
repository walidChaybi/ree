import { CONFIG_POST_REQUETE_TRANSCRIPTION } from "@api/configurations/requete/creation/PostRequeteTranscriptionConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { TYPE_PIECE_JUSTIFICATIVE } from "@mock/data/NomenclatureTypePieceJustificative";
import { ISaisieRDCForm, SaisieRDCForm } from "@model/form/delivrance/ISaisieRDCForm";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mappingRequeteDelivrance } from "@views/common/hook/requete/DetailRequeteHook";
import { Formik } from "formik";
import { useParams } from "react-router";
import { describe, expect, test, vi } from "vitest";
import BlocEvenement from "../../../../../composants/pages/requetesDelivrance/saisirRequete/BlocEvenement";
import BlocMandant from "../../../../../composants/pages/requetesDelivrance/saisirRequete/BlocMandant";
import BlocRequerant from "../../../../../composants/pages/requetesDelivrance/saisirRequete/BlocRequerant";
import FormulaireExtraitCopieDelivrance from "../../../../../composants/pages/requetesDelivrance/saisirRequete/FormulaireExtraitCopieDelivrance";
import PageSaisieRDC from "../../../../../pages/requetesDelivrance/PageSaisieRDC";

const requeteRDC = {
  id: "a4cefb71-8457-4f6b-937e-34b49335d404",
  numeroFonctionnel: "54j654j4jyfjtj456j4",
  idSagaDila: 45,
  dateCreation: 1612342296,
  canal: "COURRIER",
  type: "DELIVRANCE",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
  idService: "6737d2f8-f2af-450d-a376-f22f6df6ff1d",
  actions: [
    {
      id: "1d189cd9-0df0-45dc-a4cf-0174eb621234",
      numeroOrdre: 2,
      libelle: "Saisie de la requête",
      dateAction: 1583794800000,
      idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985894",
      trigramme: "Dylan Bob"
    },
    {
      id: "1d189cd9-0df0-45dc-a4cf-0174eb621235",
      numeroOrdre: 1,
      libelle: "À traiter",
      dateAction: 1583794800000,
      idUtilisateur: "204b8563-c7f8-4748-9daa-f26558985895",
      trigramme: "Lennon John"
    }
  ],
  titulaires: [
    {
      id: "0343e28b-b6f7-4dd4-bb81-3a38454907fb",
      position: 1,
      nomNaissance: "Campball",
      nomUsage: "",
      anneeNaissance: 1963,
      moisNaissance: 10,
      jourNaissance: 10,
      villeNaissance: "Guangzhou",
      paysNaissance: "Samoa",
      sexe: "MASCULIN",
      nationalite: "FRANCAISE",
      prenoms: [],
      parentsTitulaire: [
        {
          id: "624c6c8a-b623-4508-b241-e96a408cdde8",
          position: 1,
          nomNaissance: "JAMBON",
          prenoms: [
            {
              id: "a1acf689-b2e3-4fc1-8e15-077c810608ec",
              numeroOrdre: 1,
              prenom: "Jean"
            }
          ]
        },
        {
          id: "624c6c8a-b623-4508-b241-e96a408cdde9",
          position: 2,
          nomNaissance: "BONO",
          prenoms: [
            {
              id: "a1acf689-b2e3-4fc1-8e15-077c810608ed",
              numeroOrdre: 1,
              prenom: "Jen"
            },
            {
              id: "a1acf689-b2e3-4fc1-8e15-077c810609cd",
              numeroOrdre: 2,
              prenom: "Michèle"
            }
          ]
        }
      ]
    },
    {
      id: "a0b8eef9-5525-47d1-b971-0e9acbcad49d",
      position: 2,
      nomNaissance: "Ambrosia",
      nomUsage: "",
      anneeNaissance: 1941,
      moisNaissance: 3,
      jourNaissance: 26,
      villeNaissance: "Taiyuan",
      paysNaissance: "Portugal",
      sexe: "FEMININ",
      nationalite: "FRANCAISE",
      prenoms: [
        {
          id: "3377d3d1-6bbe-428b-9df5-f559bb8a465b",
          numeroOrdre: 2,
          prenom: "Zoé"
        },
        {
          id: "8221bf78-2d0b-4810-be0d-020a1b07a6df",
          numeroOrdre: 3,
          prenom: "Thérèse"
        },
        {
          id: "b113fa06-005f-4f8e-8576-95cd8ac35a99",
          numeroOrdre: 1,
          prenom: "Antoinette"
        }
      ],
      parentsTitulaire: [
        {
          id: "624c6c8a-b623-4508-b241-e96a408cddf7",
          position: 1,
          nomNaissance: "DUVAL",
          prenoms: [
            {
              id: "5ef2184f-eaec-4939-80f1-6e77a7636ce0",
              numeroOrdre: 1,
              prenom: "Marcel"
            }
          ]
        },
        {
          id: "c8a59637-7487-4056-af5a-5f50b03f0705",
          position: 2,
          nomNaissance: "DELAHYE",
          prenoms: [
            {
              id: "6892f48b-6486-475e-b0ef-e1124964066d",
              numeroOrdre: 1,
              prenom: "Augustine"
            }
          ]
        }
      ]
    }
  ],
  piecesJustificatives: [
    {
      id: "519900ee-c9a0-4d41-8673-512949b64946",
      nom: "Carte professionelle",
      mimeType: "png",
      taille: 20,
      contenu: "contenu",
      typePieceJustificative: TYPE_PIECE_JUSTIFICATIVE[0]
    }
  ],
  requerant: {
    id: "97d0e400-19d3-47fa-aedb-137002a96f18",
    dateCreation: 1528192343,
    nomFamille: "",
    prenom: "",
    courriel: "cjacques@candw.fr",
    telephone: "0152698741",
    adresse: {
      id: "074acd89-be79-4272-afe0-bb64925ee9ca",
      ligne2: "5 place de l'Eglise",
      ligne3: "",
      ligne4: "",
      ligne5: "",
      codePostal: "44000",
      ville: "Nantes",
      pays: "FRANCE"
    },
    qualite: "INSTITUTIONNEL",
    detailQualiteRece: null,
    detailQualiteParticulier: null,
    detailQualiteMandataireHabilite: null,
    detailQualiteInstitutionnel: {
      id: "94cb55b0-7cb1-4d65-9aae-e6c972e29ed9",
      type: "TRIBUNAL",
      nom: "TGI Marseille",
      nature: null
    },
    detailQualiteAutreProfessionnel: null,
    lienRequerant: null
  },
  mandant: {
    id: "94a2b37f-3744-4c3c-a53d-61c80c86a90d",
    typeMandant: "PERSONNE_PHYSIQUE",
    nom: "RANU",
    prenom: "THIERRY",
    raisonSociale: "",
    lienMandant: "TITULAIRE",
    natureLien: null
  },
  statut: {
    id: "2c055d1a-b437-48b1-bbd2-fa94d7defba2",
    statutRequete: "A_TRAITER",
    dateEffet: 1594714272000,
    raisonStatut: ""
  },
  lienRequerant: null,
  sousType: "RDD",
  motif: "RETRAITE",
  complementMotif: "",
  dateDelivranceDemat: null,
  provenance: "PLANETE",
  documentDemande: "Attestation de PACS",
  nombreExemplairesDemandes: null,
  provenanceRece: null,
  provenanceServicePublic: null,
  documentsReponses: [],
  evenement: {
    id: "0fb80e4f-ab5c-4f26-afcc-3199b67aa2f0",
    natureActe: "NAISSANCE",
    jour: 12,
    mois: 5,
    annee: 2019,
    ville: null,
    pays: "TUNISIE"
  }
} as any as IRequeteDelivrance;

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn()
  };
});

const mockUseParams = vi.mocked(useParams);

DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

describe("Formulaire saisie RDC - affichage des blocs", () => {
  test("DOIT afficher le formulaire avec les valeurs par défaut QUAND l'ID n'est pas présent", async () => {
    const { container } = render(<PageSaisieRDC />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher le formulaire avec les valeurs de la requête QUAND l'ID est présent", async () => {
    const { container } = await act(async () =>
      render(
        <Formik<ISaisieRDCForm>
          initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteRDC))}
          onSubmit={() => {}}
        >
          <FormulaireExtraitCopieDelivrance />
        </Formik>
      )
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("NE DOIT PAS afficher le bloc identité QUAND le typeRequerant est titulaire 1", async () => {
    const requeteAvecTypeRequerantTitulaire1 = {
      ...requeteRDC,
      requerant: {
        ...requeteRDC.requerant,
        qualite: "TITULAIRE1"
      }
    };

    const { container } = render(
      <Formik<ISaisieRDCForm>
        initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteAvecTypeRequerantTitulaire1))}
        onSubmit={() => {}}
      >
        <BlocRequerant />
      </Formik>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT lancer l'enregistrement POST de la requête QUAND l'utilisateur clique sur le bouton 'Prendre en charge'", async () => {
    MockApi.deployer(CONFIG_POST_REQUETE_TRANSCRIPTION);

    render(
      <Formik<ISaisieRDCForm>
        initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteRDC))}
        onSubmit={() => {}}
      >
        <PageSaisieRDC />
      </Formik>
    );

    const mockApi = MockApi.getMock();

    const boutonPrendreEnCharge: HTMLButtonElement = screen.getByTitle("Prendre en charge");
    fireEvent.click(boutonPrendreEnCharge);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    });

    MockApi.stopMock();
  });
});

describe("Bloc évènement", () => {
  test("DOIT afficher le bloc évènement QUAND la nature de l'acte est mariage", async () => {
    const requeteAvecNatureActeMariage = {
      ...requeteRDC,
      evenement: {
        ...requeteRDC.evenement,
        natureActe: "MARIAGE"
      }
    };

    const { container } = await act(async () =>
      render(
        <Formik<ISaisieRDCForm>
          initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteAvecNatureActeMariage))}
          onSubmit={() => {}}
        >
          <BlocEvenement />
        </Formik>
      )
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Bloc mandant", () => {
  test("DOIT afficher le bloc mandant", async () => {
    const { container } = render(
      <Formik<ISaisieRDCForm>
        initialValues={SaisieRDCForm.valeursInitiales(null)}
        onSubmit={() => {}}
      >
        <BlocMandant />
      </Formik>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Bloc identité", () => {
  test("DOIT afficher le bloc identité QUAND le typeRequerant est mandataire habilité", async () => {
    const requeteAvecTypeRequerantMandataire = {
      ...requeteRDC,
      requerant: {
        ...requeteRDC.requerant,
        qualite: "MANDATAIRE_HABILITE"
      }
    };

    const { container } = render(
      <Formik<ISaisieRDCForm>
        initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteAvecTypeRequerantMandataire))}
        onSubmit={() => {}}
      >
        <BlocRequerant />
      </Formik>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher le bloc identité QUAND le typeRequerant est autre professionnel", async () => {
    const requeteAvecTypeRequerantAutreProfessionnel = {
      ...requeteRDC,
      requerant: {
        ...requeteRDC.requerant,
        qualite: "AUTRE_PROFESSIONNEL"
      }
    };

    const { container } = render(
      <Formik<ISaisieRDCForm>
        initialValues={SaisieRDCForm.valeursInitiales(mappingRequeteDelivrance(requeteAvecTypeRequerantAutreProfessionnel))}
        onSubmit={() => {}}
      >
        <BlocRequerant />
      </Formik>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
