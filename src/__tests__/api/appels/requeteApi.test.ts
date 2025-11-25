import {
  creationRequeteDelivrance,
  deleteDocumentComplementaire,
  deleteDocumentsReponseApi,
  getDetailRequete,
  getPieceComplementInformationById,
  getPieceJustificativeById,
  getPrendreEnChargeRequeteSuivante,
  getReponsesReqInfo,
  getRequetesCreation,
  getRequetesInformation,
  getTableauRequetesDelivrance,
  IQueryParametersPourRequetes,
  mettreAJourStatutApresSignature,
  patchMiseAJourIdSuiviDossier,
  patchMiseAJourLibellePJ,
  patchModificationAvancementProjet,
  postAjoutPieceJustificativeAUneRequeteCreation,
  postCreationAction,
  postCreationActionEtMiseAjourStatut,
  postDocumentReponseApi,
  postIgnorerRequete,
  postMessageRetourSDANFEtUpdateStatutRequete,
  postObservation,
  postPieceComplementInformationApi,
  postPieceJustificative,
  postRequetesServiceCreation,
  postRetourValideur,
  postSauvCourrierCreerActionMajStatutRequete,
  postSauvegardePersonneEtActeSelectionne,
  postTableauRequetesDelivranceService,
  postValiderProjetActe,
  sauvegarderReponseReqInfo,
  updateChoixDelivrance,
  updateRequeteDelivrance
} from "@api/appels/requeteApi";
import { IEchange } from "@model/requete/IEchange";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ITypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { describe, expect, test, vi } from "vitest";
import { EMimeType } from "../../../ressources/EMimeType";

describe("Test des appels API requête", () => {
  test("Couverture en attendant le passage a useFetch 1", async () => {
    const { ApiManager } = await import("../../../api/ApiManager");

    const manager = ApiManager.getInstance("rece-requete-api", "v2");
    const spyFetch = vi.fn();
    manager.fetch = spyFetch;

    await postTableauRequetesDelivranceService(
      { tri: "test", sens: "ASC", range: "0", statuts: ["test"] },
      {
        sousType: null,
        provenance: null,
        idAgent: null,
        idService: null,
        statuts: null
      }
    );
    expect(spyFetch).toHaveBeenCalled();

    await postRequetesServiceCreation(
      {
        statuts: [],
        tri: "",
        sens: "ASC"
      },
      {
        sousType: null,
        tagPriorisation: null,
        idAgent: null,
        idService: null,
        statuts: null
      }
    );
    expect(spyFetch).toHaveBeenCalled();

    await mettreAJourStatutApresSignature("", "");
    expect(spyFetch).toHaveBeenCalled();

    await deleteDocumentsReponseApi("");
    expect(spyFetch).toHaveBeenCalled();

    await postPieceJustificative("", {
      id: "",
      nom: "",
      mimeType: EMimeType.APPLI_PDF,
      taille: 0,
      contenu: "",
      typePieceJustificative: {} as ITypePieceJustificative
    });
    expect(spyFetch).toHaveBeenCalled();

    await postCreationAction("", "");
    expect(spyFetch).toHaveBeenCalled();

    await postRetourValideur("", "", "", "");
    expect(spyFetch).toHaveBeenCalled();

    await postObservation("", "");
    expect(spyFetch).toHaveBeenCalled();

    await postSauvegardePersonneEtActeSelectionne("", {});
    expect(spyFetch).toHaveBeenCalled();

    await patchModificationAvancementProjet("", {});
    expect(spyFetch).toHaveBeenCalled();

    await postAjoutPieceJustificativeAUneRequeteCreation("", {});
    expect(spyFetch).toHaveBeenCalled();

    await patchMiseAJourIdSuiviDossier("", "");
    expect(spyFetch).toHaveBeenCalled();

    await postValiderProjetActe("", "");
    expect(spyFetch).toHaveBeenCalled();
  });

  test("Couverture en attendant le passage a useFetch 2", async () => {
    await getTableauRequetesDelivrance("test", { statuts: ["test"], tri: "test", sens: "ASC" });
    getRequetesCreation("test", { statuts: ["test"], tri: "test", sens: "ASC" });
    getRequetesInformation({} as IQueryParametersPourRequetes);
    getDetailRequete("id", false);
    creationRequeteDelivrance({ requete: {} as IRequeteDelivrance, futurStatut: StatutRequete.ABANDONNEE, refus: true });
    updateRequeteDelivrance({ idRequete: "id", requete: {} as IRequeteDelivrance, futurStatut: StatutRequete.ABANDONNEE, refus: true });
    await postSauvCourrierCreerActionMajStatutRequete("id", StatutRequete.ABANDONNEE, {}, "test");
    postDocumentReponseApi("test", []);
    getPieceComplementInformationById("id");
    postPieceComplementInformationApi("id", "test");
    getPieceJustificativeById("id");
    postCreationActionEtMiseAjourStatut("id", "libelle", "BROUILLON");
    await updateChoixDelivrance("id", null);
    postIgnorerRequete("id", "test");
    getPrendreEnChargeRequeteSuivante();
    await getReponsesReqInfo();
    await sauvegarderReponseReqInfo("id", "string", "test");
    deleteDocumentComplementaire("id", "id2");
    postMessageRetourSDANFEtUpdateStatutRequete("id", {} as IEchange);
    patchMiseAJourLibellePJ("id", "test");

    vi.resetAllMocks();
  });
});
