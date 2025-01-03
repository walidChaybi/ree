import {
  creationRequeteCreationEtTransmissionService,
  deleteDocumentsReponseApi,
  mettreAJourStatutApresSignature,
  patchMiseAJourIdSuiviDossier,
  patchModificationAvancementProjet,
  patchUtilisateurAssigneRequete,
  postAjoutPieceJustificativeAUneRequeteCreation,
  postCreationAction,
  postMessageRetourSDANF,
  postObservation,
  postPieceJustificative,
  postRequetesServiceCreation,
  postRetourValideur,
  postSauvegardePersonneEtActeSelectionne,
  postTableauRequetesDelivranceService,
  postTransfertValideur,
  postValiderProjetActe,
  updateStatutRequeteCreation,
  updateStatutRequeteInformation
} from "@api/appels/requeteApi";
import { IEchange } from "@model/requete/IEchange";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { ITypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { describe, expect, test, vi } from "vitest";

describe("Test des appels API requête", () => {
  test("Couverture en attendant le passage a useFetch", async () => {
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

    await patchUtilisateurAssigneRequete({
      nomOec: "",
      prenomOec: ""
    });
    expect(spyFetch).toHaveBeenCalled();

    await mettreAJourStatutApresSignature("", "");
    expect(spyFetch).toHaveBeenCalled();

    await creationRequeteCreationEtTransmissionService(
      {
        natureActeTranscrit: "",
        villeRegistre: "",
        lienRequerant: undefined,
        canal: "",
        provenance: "",
        requerant: undefined,
        sousType: "",
        titulaires: [],
        type: ""
      },
      ""
    );
    expect(spyFetch).toHaveBeenCalled();

    await deleteDocumentsReponseApi("");
    expect(spyFetch).toHaveBeenCalled();

    await postPieceJustificative("", {
      id: "",
      nom: "",
      mimeType: "",
      taille: 0,
      contenu: "",
      typePieceJustificative: {} as ITypePieceJustificative
    });
    expect(spyFetch).toHaveBeenCalled();

    await postCreationAction("", "");
    expect(spyFetch).toHaveBeenCalled();

    await postTransfertValideur("", "", "", "");
    expect(spyFetch).toHaveBeenCalled();

    await postRetourValideur("", "", "", "");
    expect(spyFetch).toHaveBeenCalled();

    await updateStatutRequeteInformation("", {} as StatutRequete);
    expect(spyFetch).toHaveBeenCalled();

    await updateStatutRequeteCreation("", {} as StatutRequete);
    expect(spyFetch).toHaveBeenCalled();

    await postObservation("", "");
    expect(spyFetch).toHaveBeenCalled();

    await postMessageRetourSDANF("", {} as IEchange);
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
});
