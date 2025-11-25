import { TRequeteRMCAutoDto } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { Nationalite } from "@model/etatcivil/enum/Nationalite";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { AvancementProjetActe } from "@model/requete/enum/AvancementProjetActe";
import { NatureProjetEtablissement } from "@model/requete/enum/NatureProjetEtablissement";
import { Provenance } from "@model/requete/enum/Provenance";
import { Qualite } from "@model/requete/enum/Qualite";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeCanal } from "@model/requete/enum/TypeCanal";
import { TypeObjetTitulaire } from "@model/requete/enum/TypeObjetTitulaire";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { UnionActuelle } from "@model/requete/enum/UnionActuelle";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { ENatureActeTranscrit } from "@model/requete/NatureActeTranscription";
import { ITableauRMC } from "@model/rmc/ITableauRMC";
import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { TitulaireRequeteAssociee } from "@model/rmc/requete/TitulaireRequeteAssociee";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { describe, expect, Mock, test, vi } from "vitest";
import { IParametresRecherche } from "../../../../../composants/commun/tableau/Tableau";
import TableauRMCRequetesAssociees from "../../../../../composants/pages/rmc/TableauRMCRequetesAssociees";
import { useRMCAutoRequetesAssociees } from "../../../../../hooks/rmc/requetesAssociees/RMCAutoRequetesAssocieesHook";
import { useRMCRequetesAssociees } from "../../../../../hooks/rmc/requetesAssociees/RMCRequetesAssocieesHook";
import { useTableauRMCRequetesAssociees } from "../../../../../hooks/rmc/requetesAssociees/TableauRMCRequetesAssocieesHook";
import DateRECE from "../../../../../utils/DateRECE";

const MOCK_REQUETE_DELIVRANCE_ASSOCIEE: RequeteAssociee<"DELIVRANCE"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "DELIVRANCE",
  sousType: "RDD",
  statut: "À traiter",
  numero: "ER3MKS"
};

const MOCK_REQUETE_INFORMATION_ASSOCIEE: RequeteAssociee<"INFORMATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "INFORMATION",
  sousType: "INFORMATION",
  statut: "À traiter",
  numero: "ER3MKS"
};

const MOCK_REQUETE_CREATION_ASSOCIEE_RCTC: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCTC",
  statut: "À traiter",
  numero: "ER3MKS"
};

const MOCK_REQUETE_CREATION_ASSOCIEE_RCTD: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCTD",
  statut: "À traiter",
  numero: "ER3MKS"
};

const MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR: RequeteAssociee<"CREATION"> = {
  id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
  dateCreation: "14/11/2025",
  titulaires: [],
  type: "CREATION",
  sousType: "RCEXR",
  statut: "À traiter",
  numero: "ER3MKS"
};

const MOCK_RESULTATS_POST_RMC_AUTO_REQUETE: TRequeteRMCAutoDto[] = [
  {
    id: "62f3b260-0d69-4c4e-8708-3722500b34c3",
    numero: "ER3MKS",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763127593073,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "62975430-1f3c-4628-b183-01af4722374a",
    numero: "BVW1S7",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763122070897,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "62964fb4-505e-468d-96a3-20155c24b329",
    numero: "QKQ5KV",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763121962097,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "6254214b-2399-49b5-a8e3-457107a3d35c",
    numero: "45EWZ6",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763118026753,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "6218a0d3-95a8-48f1-9979-0d09b9184d46",
    numero: "175HYR",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763114432491,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "61f99714-a207-4285-a101-897c4dde8af1",
    numero: "LZTFAE",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763112545929,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  },
  {
    id: "61f29245-4344-4750-8dbd-d167c1fe045d",
    numero: "Z4VTSU",
    statut: "A_TRAITER",
    type: "CREATION",
    sousType: "RCTC",
    dateCreation: 1763112146853,
    titulaires: [
      {
        nom: "Rossi",
        prenom: ""
      }
    ]
  }
];

const MOCK_REQUETES_ASSOCIEES = MOCK_RESULTATS_POST_RMC_AUTO_REQUETE.map(RequeteAssociee.depuisDto).filter(
  (requete): requete is TRequeteAssociee => requete !== null
);

const MOCK_REQUETE_CREATION_TRANSCRIPTION: IRequeteCreationTranscription = {
  id: "63076a61-cd73-4032-8bf9-bf30ec009e0a",
  idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
  numeroFonctionnel: "NCJXAI",
  dateCreation: 1763128777217,
  canal: TypeCanal.COURRIER,
  type: TypeRequete.CREATION,
  actions: [
    {
      id: "630777b9-356c-458f-af27-4cee223e23b5",
      numeroOrdre: 2,
      libelle: "Transmise à Département Transcription",
      date: DateRECE.depuisDateArrayDTO([14, 11, 2025]),
      idUtilisateur: "9afbf23b-c31d-40f8-ae5e-2f8bb4cb9e3f",
      nomUtilisateur: "SKYWALKER",
      prenomUtilisateur: "Rey",
      phraseHistorique: ""
    },
    {
      id: "630719ad-daa5-44d3-a06b-0e13002874bc",
      numeroOrdre: 1,
      libelle: "Saisie de la requête",
      date: DateRECE.depuisDateArrayDTO([14, 11, 2025]),
      idUtilisateur: "9afbf23b-c31d-40f8-ae5e-2f8bb4cb9e3f",
      nomUtilisateur: "SKYWALKER",
      prenomUtilisateur: "Rey",
      phraseHistorique: ""
    }
  ],
  titulaires: [
    {
      id: "6307e32d-a898-4c9b-b51c-1e58f4bff515",
      position: 1,
      nomNaissance: "Rossi",
      anneeNaissance: 1998,
      dateNaissanceFormatee: "1998",
      sexe: Sexe.MASCULIN.libelle,
      nationalite: Nationalite.INCONNUE,
      prenoms: [
        {
          numeroOrdre: 1,
          prenom: "Gnol"
        }
      ],
      parentsTitulaire: [],
      evenementUnions: [],
      typeObjetTitulaire: TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT,
      nationalites: [],
      prenomsDemande: [],
      suiviDossiers: [
        {
          idSuiviDossier: "63073b0c-bb3d-483e-b4aa-15c6ab5c18f0",
          anneeEvenement: "1998",
          natureProjet: NatureProjetEtablissement.NAISSANCE,
          avancement: AvancementProjetActe.A_SAISIR,
          unionActuelle: UnionActuelle.NON_RENSEIGNE
        }
      ]
    }
  ],
  idService: "48248f2d-846d-458b-b101-5ad102434af0",
  piecesJustificatives: [],
  requerant: {
    id: "6307c725-07e7-4bfd-a419-047aaf1fc3a6",
    dateCreation: new Date("1763128777200"),
    nomFamille: "",
    nomUsage: "",
    prenom: "",
    lienRequerant: {
      id: "63074a80-8c1f-441b-a5f3-ccafb9ee592d",
      lien: "PERE_MERE"
    },
    qualiteRequerant: {
      qualite: Qualite.PARTICULIER
    }
  },
  observations: [],
  lienRequerant: {
    typeLienRequerant: "PERE_MERE"
  },
  sousType: SousTypeCreation.RCTC,
  provenance: Provenance.COURRIER,
  documentsPj: [],
  personnesSauvegardees: [],
  numeroDossier: "DOS.AGADIR.2025.T.000084",
  natureActeTranscrit: ENatureActeTranscrit.NAISSANCE_MINEUR,
  typeRegistre: {
    id: "88993bc6-9849-4122-93df-a592a74466d0",
    poste: "AGADIR"
  },
  numero: "NCJXAI",
  statutCourant: {
    statut: StatutRequete.A_TRAITER,
    dateEffet: 1763128777217
  }
};

const MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE = { ...MOCK_REQUETE_CREATION_TRANSCRIPTION, titulaires: [] };

const MOCK_PARAMETRES_RECHERCHE: IParametresRecherche = {
  tri: "titulaires",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}`
};

vi.mock("@views/pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage", () => ({
  ApercuRequetePage: ({ idRequeteAAfficher }: { idRequeteAAfficher: string }) => <div>ApercuRequetePage {idRequeteAAfficher}</div>
}));
vi.mock("@views/pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage", () => ({
  ApercuReqInfoPage: ({ idRequeteAAfficher }: { idRequeteAAfficher: string }) => <div>ApercuReqInfoPage {idRequeteAAfficher}</div>
}));
vi.mock("@views/pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage", () => ({
  ApercuRequeteEtablissementSimplePage: ({ idRequeteAAfficher }: { idRequeteAAfficher: string }) => (
    <div>ApercuRequeteEtablissementSimplePage {idRequeteAAfficher}</div>
  )
}));
vi.mock("@views/pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage", () => ({
  ApercuReqCreationTranscriptionSimplePage: ({ idRequeteAAfficher }: { idRequeteAAfficher: string }) => (
    <div>ApercuReqCreationTranscriptionSimplePage {idRequeteAAfficher}</div>
  )
}));
vi.mock("../../../../../composants/commun/conteneurs/FenetreExterne", () => ({
  default: ({ children, apresFermeture }: { children: React.ReactNode; apresFermeture: () => void }) => (
    <div>
      FenetreExterne
      <div>{children}</div>
      <button onClick={apresFermeture}>Fermer la fenêtre</button>
    </div>
  )
}));

vi.mock("../../../../../hooks/rmc/requetesAssociees/RMCRequetesAssocieesHook", () => ({ useRMCRequetesAssociees: vi.fn() }));
vi.mock("../../../../../hooks/rmc/requetesAssociees/RMCAutoRequetesAssocieesHook", () => ({ useRMCAutoRequetesAssociees: vi.fn() }));
vi.mock("../../../../../hooks/rmc/requetesAssociees/TableauRMCRequetesAssocieesHook", () => ({ useTableauRMCRequetesAssociees: vi.fn() }));

describe("TableauRMCRequetesAssociees", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("DOIT afficher le composant un chargement QUAND le chargement des requêtes est en cours", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcAutoRequete: true
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: null,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    const { container } = render(
      <TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE.titulaires} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher un tableau vide et aucune requête trouvée QUAND un tableau sans requête est assigné", async () => {
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: null,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(
      ({ setTableauRMC }: { setTableauRMC: React.Dispatch<React.SetStateAction<ITableauRMC | null>> }) => {
        setTimeout(() => {
          setTableauRMC({
            requetesAssociees: [],
            nombreTotalLignes: 0
          });
        }, 0);

        return { enAttenteDeReponseApiRmcAutoRequete: false };
      }
    );

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE.titulaires} />);

    await waitFor(() => {
      expect(screen.getByText(/Aucune requête n'a été trouvée./i)).toBeDefined();
    });
  });

  test("DOIT afficher un tableau de requête QUAND le tableau de requête est assigné", async () => {
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: null,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockImplementation((requetes: TRequeteAssociee[]) =>
        requetes.map(req => ({
          cle: req.id,
          donnees: {
            titulaires: (
              <>
                {(req.titulaires || []).map((titulaire: TitulaireRequeteAssociee) => (
                  <span key={`${titulaire.nom} ${titulaire.prenom ?? ""}`.trim()}>
                    {`${titulaire.nom.toUpperCase()} ${titulaire.prenom ?? ""}`.trim()}
                    <br />
                  </span>
                ))}
              </>
            ),
            libelleSousTypeCourt: req.sousType,
            dateCreation: req.dateCreation,
            statut: req.statut
          },
          onClick: vi.fn()
        }))
      ),
      onFermetureFenetreExterne: vi.fn()
    });
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(
      ({ setTableauRMC }: { setTableauRMC: React.Dispatch<React.SetStateAction<ITableauRMC | null>> }) => {
        setTimeout(() => {
          setTableauRMC({
            requetesAssociees: MOCK_REQUETES_ASSOCIEES,
            nombreTotalLignes: MOCK_REQUETES_ASSOCIEES.length
          });
        }, 0);

        return { enAttenteDeReponseApiRmcAutoRequete: false };
      }
    );

    const { container } = render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Nouvelle recherche multi critères/i })).toBeDefined();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test("DOIT déclencher la recherche multicritères QUAND on clique sur le bouton dédié", async () => {
    const gererClicNouvelleRMC = vi.fn();

    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC,
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: null,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [], nombreTotalLignes: 0 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE.titulaires} />);

    const nomBoutonNouvelleRMC = /Nouvelle recherche multi critères/i;
    await waitFor(() => expect(screen.getByRole("button", { name: nomBoutonNouvelleRMC })).toBeDefined());

    fireEvent.click(screen.getByRole("button", { name: nomBoutonNouvelleRMC }));

    expect(gererClicNouvelleRMC).toHaveBeenCalled();
  });

  test("DOIT afficher la popin QUAND estPopinOuverte est true", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [], nombreTotalLignes: 0 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: true,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: null,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE.titulaires} />);

    await waitFor(() => expect(screen.getByRole("dialog")).toBeDefined());
  });

  test("DOIT afficher la fenêtre externe avec le composant ApercuRequetePage QUAND une requête délivrance associee est sélectionnée", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [MOCK_REQUETE_DELIVRANCE_ASSOCIEE], nombreTotalLignes: 1 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_DELIVRANCE_ASSOCIEE,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      const textComposant = `ApercuRequetePage ${MOCK_REQUETE_DELIVRANCE_ASSOCIEE.id}`;
      expect(screen.getByText(textComposant)).toBeDefined();
    });
  });

  test("DOIT afficher la fenêtre externe avec le composant ApercuReqInfoPage QUAND une requête information associee est sélectionnée", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [MOCK_REQUETE_INFORMATION_ASSOCIEE], nombreTotalLignes: 1 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_INFORMATION_ASSOCIEE,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      const textComposant = `ApercuReqInfoPage ${MOCK_REQUETE_INFORMATION_ASSOCIEE.id}`;
      expect(screen.getByText(textComposant)).toBeDefined();
    });
  });

  test("DOIT afficher la fenêtre externe avec le composant ApercuReqCreationTranscriptionSimplePage QUAND une requête création associee sous type RCTC est sélectionnée", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [MOCK_REQUETE_CREATION_ASSOCIEE_RCTC], nombreTotalLignes: 1 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_CREATION_ASSOCIEE_RCTC,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      const textComposant = `ApercuReqCreationTranscriptionSimplePage ${MOCK_REQUETE_CREATION_ASSOCIEE_RCTC.id}`;
      expect(screen.getByText(textComposant)).toBeDefined();
    });
  });

  test("DOIT afficher la fenêtre externe avec le composant ApercuReqCreationTranscriptionSimplePage QUAND une requête création associee sous type RCTD est sélectionnée", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [MOCK_REQUETE_CREATION_ASSOCIEE_RCTD], nombreTotalLignes: 1 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_CREATION_ASSOCIEE_RCTD,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      const textComposant = `ApercuReqCreationTranscriptionSimplePage ${MOCK_REQUETE_CREATION_ASSOCIEE_RCTD.id}`;
      expect(screen.getByText(textComposant)).toBeDefined();
    });
  });

  test("DOIT afficher la fenêtre externe avec le composant ApercuRequeteEtablissementSimplePage QUAND une requête création associee sous type RCEXR est sélectionnée", async () => {
    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR], nombreTotalLignes: 1 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne: vi.fn()
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires} />);

    await waitFor(() => {
      const textComposant = `ApercuRequeteEtablissementSimplePage ${MOCK_REQUETE_CREATION_ASSOCIEE_RCEXR.id}`;
      expect(screen.getByText(textComposant)).toBeDefined();
    });
  });

  test("DOIT appeler onFermetureFenetreExterne QUAND apresFermeture est appelé dans FenetreExterne", async () => {
    const onFermetureFenetreExterne = vi.fn();

    (useRMCAutoRequetesAssociees as Mock).mockImplementation(({ setTableauRMC }) => {
      setTimeout(() => {
        setTableauRMC({ requetesAssociees: [], nombreTotalLignes: 0 });
      }, 0);
      return { enAttenteDeReponseApiRmcAutoRequete: false };
    });
    (useRMCRequetesAssociees as Mock).mockReturnValue({
      enAttenteDeReponseApiRmcRequete: false,
      estPopinOuverte: false,
      setValeursRMCRequete: vi.fn(),
      setCriteresRechercheRequete: vi.fn(),
      gererClicNouvelleRMC: vi.fn(),
      onFermeturePopin: vi.fn()
    });
    (useTableauRMCRequetesAssociees as Mock).mockReturnValue({
      requeteSelectionnee: MOCK_REQUETE_CREATION_ASSOCIEE_RCTC,
      parametresRecherche: MOCK_PARAMETRES_RECHERCHE,
      setParametresRecherche: vi.fn(),
      mapRequetesAssocieesCommeLignesTableau: vi.fn().mockReturnValue([]),
      onFermetureFenetreExterne
    });

    render(<TableauRMCRequetesAssociees titulairesRequete={MOCK_REQUETE_CREATION_TRANSCRIPTION_SANS_TITULAIRE.titulaires} />);

    const boutonFermeture = await screen.findByRole("button", { name: /Fermer la fenêtre/i });

    fireEvent.click(boutonFermeture);

    expect(onFermetureFenetreExterne).toHaveBeenCalledTimes(1);
  });
});
