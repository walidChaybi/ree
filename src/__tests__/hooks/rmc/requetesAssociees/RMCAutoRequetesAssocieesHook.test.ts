import { CONFIG_POST_RMC_AUTO_REQUETE, TRequeteRMCAutoDto } from "@api/configurations/requete/rmc/PostRMCAutoRequeteConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
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
import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { renderHook, waitFor } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { describe, expect, test, vi } from "vitest";
import { useRMCAutoRequetesAssociees } from "../../../../hooks/rmc/requetesAssociees/RMCAutoRequetesAssocieesHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import DateRECE from "../../../../utils/DateRECE";
import TableauUtils from "../../../../utils/TableauUtils";

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

describe("RMCAutoRequetesAssocieesAutoHook", () => {
  let setTableauRMC = vi.fn();

  beforeEach(() => {
    setTableauRMC = vi.fn();
  });

  test("DOIT définir un tableau vide QUAND la requete ne contient aucun titulaire", () => {
    renderHook(() => useRMCAutoRequetesAssociees({ titulairesRequete: [], setTableauRMC }));

    expect(setTableauRMC).toHaveBeenCalledWith({ requetesAssociees: [], nombreTotalLignes: 0 });
  });

  test("DOIT suite à l'appel API remplir le tableau QUAND la requete contient un titulaire", async () => {
    const headers = { "content-range": "0/" + MOCK_RESULTATS_POST_RMC_AUTO_REQUETE.length };
    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_REQUETE,
      {
        query: { range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}` }
      },
      {
        data: MOCK_RESULTATS_POST_RMC_AUTO_REQUETE,
        headers
      }
    );

    const { result } = renderHook(() =>
      useRMCAutoRequetesAssociees({ titulairesRequete: MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires, setTableauRMC })
    );

    expect(result.current.enAttenteDeReponseApiRmcAutoRequete).toBe(true);
    await waitFor(() => {
      expect(result.current.enAttenteDeReponseApiRmcAutoRequete).toBe(false);
    });

    expect(setTableauRMC).toHaveBeenCalledWith({
      requetesAssociees: MOCK_RESULTATS_POST_RMC_AUTO_REQUETE.map(RequeteAssociee.depuisDto).filter(
        (requete): requete is TRequeteAssociee => requete !== null
      ),
      nombreTotalLignes: TableauUtils.recupererNombreTotalLignesDepuisHeaders(headers)
    });

    MockApi.stopMock();
  });

  test("DOIT afficher un message d'erreur et ne pas modifier le tableau QUAND l'appel API échoue", async () => {
    const afficherErreurSpy = vi.spyOn(AfficherMessage, "erreur").mockImplementation(() => {});

    MockApi.deployer(
      CONFIG_POST_RMC_AUTO_REQUETE,
      {
        query: { range: `0-${NB_LIGNES_PAR_APPEL_REQUETE_ASSOCIEES}` }
      },
      {
        codeHttp: 500
      }
    );

    const { result } = renderHook(() =>
      useRMCAutoRequetesAssociees({
        titulairesRequete: MOCK_REQUETE_CREATION_TRANSCRIPTION.titulaires,
        setTableauRMC
      })
    );

    expect(result.current.enAttenteDeReponseApiRmcAutoRequete).toBe(true);
    await waitFor(() => {
      expect(result.current.enAttenteDeReponseApiRmcAutoRequete).toBe(false);
    });
    await waitFor(() => {
      expect(afficherErreurSpy).toHaveBeenCalled();
    });

    expect(afficherErreurSpy).toHaveBeenCalledWith("Une erreur est survenue lors de la RMC automatique de requêtes", expect.any(Object));

    expect(setTableauRMC).not.toHaveBeenCalled();

    MockApi.stopMock();
    afficherErreurSpy.mockRestore();
  });
});
