import { CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER } from "@api/configurations/etatCivil/acte/transcription/PatchIdActeSuiviDossierConfigApi";
import { CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PatchProjetActeTranscriptionConfigApi";
import { CONFIG_POST_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PostProjetActeTranscriptionConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT from "@api/traitements/projetActe/transcription/TraitementEnregistrerProjetActeTranscrit";
import { MockApi } from "@mock/appelsApi/MockApi";
import { projetActe, projetActeNaissanceDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import {
  IProjetActeTranscritForm,
  ProjetActeNaissanceTranscriptionForm
} from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach } from "node:test";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT", () => {
  const terminerTraitement = vi.fn();
  const appelPostProjetActeTranscription = vi.fn();

  const saisieProjetActeTranscription: IProjetActeTranscritForm = {
    titulaires: [
      {
        nomActeEtranger: "greenwald",
        nomRetenuOEC: "prenomUn prenomDeux prenomTrois",
        nomSouhaite: "",
        nomSecable: {
          nomPartie1: "prenomUn prenomDeux",
          nomPartie2: "prenomTrois",
          secable: true
        },
        prenomsChemin: PrenomsForm.valeursInitiales(),
        sexe: "FEMININ",
        dateNaissance: {
          jour: "19",
          mois: "01",
          annee: "2025",
          heure: "09",
          minute: "42"
        },
        lieuNaissance: {
          preposition: "A",
          ville: "",
          region: "",
          pays: "",
          adresse: ""
        }
      }
    ],
    declarant: {
      identite: "TIERS",
      nom: "LeTiers",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      sexe: "MASCULIN",
      age: "45",
      qualite: "La grand frère",
      profession: "plombier",
      sansProfession: false,
      domicile: {
        typeLieu: "Étranger",
        ville: "Pekin",
        etatProvince: "china",
        pays: "Chine",
        adresse: "21 jump street"
      },
      complement: "Chez qui..."
    },
    parents: {
      parent1: {
        sexe: "MASCULIN",
        nom: "Patamob",
        prenomsChemin: PrenomsForm.valeursInitiales(),
        dateNaissance: {
          jour: "",
          mois: "",
          annee: ""
        },
        lieuNaissance: {
          typeLieu: "Étranger",
          ville: "Pekin",
          adresse: "",
          departement: "",
          arrondissement: "",
          pays: "Chine",
          etatProvince: ""
        },
        sansProfession: false,
        profession: "sculpteur",
        domicile: {
          typeLieu: "Inconnu",
          ville: "",
          adresse: "",
          departement: "",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: true,
        age: "34"
      },
      parent2: {
        sexe: "FEMININ",
        nom: "Patamob",
        prenomsChemin: PrenomsForm.valeursInitiales(),
        dateNaissance: {
          jour: "10",
          mois: "10",
          annee: "2000"
        },
        lieuNaissance: {
          typeLieu: "France",
          ville: "Nantes",
          adresse: "",
          departement: "Loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        sansProfession: false,
        profession: "UX Designer",
        domicile: {
          typeLieu: "France",
          ville: "Nantes",
          adresse: "36 tour Lu",
          departement: "loire atlantique",
          arrondissement: "",
          pays: "",
          etatProvince: ""
        },
        renseignerAge: false,
        age: ""
      },
      domicileCommun: false
    },
    acteEtranger: {
      typeActe: "AUTRE",
      referenceComplement: "REF.2454.14245",
      infoTypeActe: "acte divers",
      dateEnregistrement: {
        jour: "12",
        mois: "01",
        annee: "2025"
      },
      lieuEnregistrement: {
        ville: "Pekin",
        pays: "Chine",
        etatProvince: "",
        preposition: "A"
      },
      redacteur: "officier"
    },
    mentions: {
      mentions: "RAS"
    },
    formuleFinale: {
      identiteDemandeur: "TIERS",
      nom: "nomDemandeur",
      prenomsChemin: PrenomsForm.valeursInitiales(),
      qualite: "Agent",
      pieceProduite: "COPIE",
      autresPieces: "",
      legalisationApostille: "APOSTILLE",
      modeDepot: "TRANSMISE",
      identiteTransmetteur: "LE_REQUERANT",
      phraseSignature: "Titres Honorifiques, Qualité, Fonction,",
      libelleDecret: ""
    },
    autresEnonciations: {
      enonciations: "RAS"
    },
    soumissionFormulaire: {
      avecEnregistrement: false,
      action: null,
      avecMajStatut: false,
      apresEnregistrement: false
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("DOIT terminer sans appeler les API QUAND l'id de la requête n'est pas présent", () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    act(() => {
      result.current.lancer({
        projetActe: null,
        requete: { ...requeteCreationTranscription, id: "" },
        valeursSaisies: {} as IProjetActeTranscritForm
      });
    });

    expect(appelPostProjetActeTranscription).not.toHaveBeenCalled();
    expect(terminerTraitement).toHaveBeenCalled();
  });

  test("DOIT appeler la méthode patch QUAND l'id du projet d'acte est présent et que des modification sur le formulaire sont faites", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    MockApi.deployer(
      CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION,
      {
        body: ProjetActeNaissanceTranscriptionForm.versDtoPatch(saisieProjetActeTranscription, projetActe!, requeteCreationTranscription)
      },
      { data: projetActeNaissanceDto }
    );

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        requete: requeteCreationTranscription,
        projetActe: projetActe,
        valeursSaisies: {
          ...saisieProjetActeTranscription,
          soumissionFormulaire: {
            avecEnregistrement: true,
            action: null,
            avecMajStatut: false,
            apresEnregistrement: false
          }
        }
      });
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT lancer le post du projet d'acte QUAND l'id du projet d'acte n'est pas présent", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    MockApi.deployer(
      CONFIG_POST_PROJET_ACTE_TRANSCRIPTION,
      { body: ProjetActeNaissanceTranscriptionForm.versDtoPost(saisieProjetActeTranscription, requeteCreationTranscription) },
      { data: projetActeNaissanceDto }
    );

    MockApi.deployer(CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER, { path: { idSuivi: "12563", idActe: "6190b304-18dc-43e5-a53a-02612dbadeae" } });

    MockApi.deployer(CONFIG_PATCH_STATUT_REQUETE_CREATION);

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        requete: requeteCreationTranscription,
        projetActe: null,
        valeursSaisies: {
          ...saisieProjetActeTranscription,
          soumissionFormulaire: {
            avecEnregistrement: true,
            action: null,
            avecMajStatut: true,
            apresEnregistrement: false
          }
        }
      });
    });

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
      expect(mockApi.history.patch.length).toBe(2);

      expect(mockApi.history.patch[0].url).toContain(`statut=A_SIGNER`);
      expect(mockApi.history.patch[1].url).toContain(`/suiviDossier/12563`);
      expect(mockApi.history.patch[1].url).toContain(`/acte/6190b304-18dc-43e5-a53a-02612dbadeae`);
    });

    MockApi.stopMock();
  });

  test("DOIT pas lancer la mise à jour du statut de la requête QUAND l'utilisateur ne possède pas le droit signer_acte", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    MockApi.deployer(
      CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION,
      {
        body: undefined
      },
      { data: projetActeNaissanceDto }
    );

    MockApi.deployer(CONFIG_PATCH_STATUT_REQUETE_CREATION);

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        requete: requeteCreationTranscription,
        projetActe: projetActe,
        valeursSaisies: {
          ...saisieProjetActeTranscription,
          soumissionFormulaire: {
            avecEnregistrement: true,
            action: null,
            avecMajStatut: false,
            apresEnregistrement: false
          }
        }
      });
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
    });

    MockApi.stopMock();
  });

  test("DOIT lancer la mise à jour du statut de la requete QUAND le projet d'acte existe et que le statut est EN_TRAITEMENT", async () => {
    const { result } = renderHook(() => TRAITEMENT_ENREGISTRER_PROJET_ACTE_TRANSCRIT.Lancer(terminerTraitement));

    MockApi.deployer(CONFIG_PATCH_ID_ACTE_SUIVI_DOSSIER, { path: { idSuivi: "12563", idActe: "6190b304-18dc-43e5-a53a-02612dbadeae" } });

    MockApi.deployer(CONFIG_PATCH_STATUT_REQUETE_CREATION);

    const mockApi = MockApi.getMock();

    act(() => {
      result.current.lancer({
        requete: requeteCreationTranscription,
        projetActe: null,
        valeursSaisies: {
          ...saisieProjetActeTranscription,
          soumissionFormulaire: {
            avecEnregistrement: false,
            action: null,
            avecMajStatut: true,
            apresEnregistrement: false
          }
        }
      });
    });

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(1);
      expect(mockApi.history.patch[0].url).toContain(`statut=A_SIGNER`);
    });

    MockApi.stopMock();
  });
});
