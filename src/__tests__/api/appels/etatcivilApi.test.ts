import {
  addAlerteActe,
  composerDocumentFinal,
  deleteAlerteActe,
  getActesInscriptionsSauvegardes,
  getBulletinIdentificationByIdActe,
  getMentions,
  getProjetActe,
  getRegistrePapierParIdProjetActe,
  getTitulaireAnalyseMarginalByIdActe,
  integrerActeSigne,
  majEtatCivilSuiteSaisieExtrait,
  patchProjetActe,
  postCorpsTexte,
  postMentions,
  postProjetActe,
  updateDateDerniereDelivranceRcRcaPacs
} from "@api/appels/etatcivilApi";

import { TModeAuthentification } from "@model/agent/types";
import { IActeInscriptionSauvegardeDto } from "@model/etatcivil/acte/IActeInscriptionSauvegardeDto";
import { IProjetActe } from "@model/etatcivil/acte/projetActe/IProjetActe";
import { ETypeExtrait } from "@model/etatcivil/enum/ETypeExtrait";
import { IInfosCarteSignature } from "@model/signature/IInfosCarteSignature";
import { IExtraitSaisiAEnvoyer } from "@views/common/hook/acte/MajEtatCivilSuiteSaisieExtraitApiHook";
import { IMentionMiseAJourDto } from "@views/common/hook/acte/mentions/MiseAJourMentionsApiHook";
import { AddAlerteActeApiHookParameters } from "@views/common/hook/alertes/AddAlerteActeHookApi";
import { DeleteAlerteActeApiHookParameters } from "@views/common/hook/alertes/DeleteAlerteActeHookApi";
import { IDerniereDelivranceRcRcaPacsParams } from "@views/common/hook/repertoires/DerniereDelivranceRcRcaPacsApiHook";
import { describe, expect, test, vi } from "vitest";

describe("Test des appels API etatcivil", () => {
  test("Couverture en attendant le passage a useFetch", async () => {
    const { ApiManager } = await import("../../../api/ApiManager");

    const manager = ApiManager.getInstance("rece-etatcivil-api", "v1");
    const spyFetch = vi.fn();
    manager.fetch = spyFetch;

    getActesInscriptionsSauvegardes({} as IActeInscriptionSauvegardeDto[]);
    getProjetActe("id");
    postProjetActe({} as IProjetActe);
    patchProjetActe({} as IProjetActe);
    composerDocumentFinal("id", "test", "test");
    integrerActeSigne("idActe", "test", {} as IInfosCarteSignature, {} as TModeAuthentification);
    getRegistrePapierParIdProjetActe("id");
    await getMentions("id");
    postMentions("id", {} as IMentionMiseAJourDto[]);
    await postCorpsTexte("id", "corpsExtrait", "test" as keyof typeof ETypeExtrait);
    deleteAlerteActe({} as DeleteAlerteActeApiHookParameters);
    updateDateDerniereDelivranceRcRcaPacs({} as IDerniereDelivranceRcRcaPacsParams[]);
    majEtatCivilSuiteSaisieExtrait("id", {} as IExtraitSaisiAEnvoyer);
    getTitulaireAnalyseMarginalByIdActe(["test"]);
    addAlerteActe({} as AddAlerteActeApiHookParameters);
    deleteAlerteActe({} as DeleteAlerteActeApiHookParameters);
    updateDateDerniereDelivranceRcRcaPacs({} as IDerniereDelivranceRcRcaPacsParams[]);
    majEtatCivilSuiteSaisieExtrait("id", {} as IExtraitSaisiAEnvoyer);
    getBulletinIdentificationByIdActe("id");

    expect(spyFetch).toHaveBeenCalled();

    vi.resetAllMocks();
  });
});
