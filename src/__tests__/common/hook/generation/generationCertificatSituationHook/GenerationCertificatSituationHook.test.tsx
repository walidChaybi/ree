import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse } from "../../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../../mock/data/ImagePng";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../mock/data/nomenclatures";
import { idRequeteRDCSC } from "../../../../../mock/data/requeteDelivrance";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { Sexe } from "../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "../../../../../model/requete/ITitulaireRequeteTableau";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
    IGenerationCertificatSituationParams,
    useGenerationCertificatSituationHook
} from "../../../../../views/common/hook/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import { specificationPhraseRMCAutoVide } from "../../../../../views/common/hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configComposition[0]
]);

const titulaire = {
  nom: "nom",
  prenoms: ["p1", "p2"],
  jourNaissance: 1,
  moisNaissance: 2,
  anneeNaissance: 2000,
  villeNaissance: "villeNaissance",
  paysNaissance: "paysNaissance",
  sexe: Sexe.MASCULIN
} as ITitulaireRequeteTableau;

const requete = {
  idRequete: idRequeteRDCSC,
  document: ReponseAppelNomenclatureDocummentDelivrance.data[1].id, //CERTIFICAT_SITUATION_PACS
  titulaires: [titulaire]
} as IRequeteTableauDelivrance;

const dataRMCAutoInscription = [] as IResultatRMCInscription[];
const dataRMCAutoActe = [] as IResultatRMCActe[];

const params = {
  requete,
  dataRMCAutoInscription,
  dataRMCAutoActe,
  specificationPhrase: specificationPhraseRMCAutoVide
} as IGenerationCertificatSituationParams;

const HookConsummer: React.FC = () => {
  const res = useGenerationCertificatSituationHook(params);
  return (
    <>
      <div data-testid="resulatIdDoc">
        <>{`idDocumentReponse=${res?.idDocumentReponse}`}</>
      </div>
      <div data-testid="resulatContenu">
        <>{`contenuDocumentReponse=${res?.contenuDocumentReponse}`}</>
      </div>
    </>
  );
};

beforeAll(() => {
  DocumentDelivrance.init();
});

test("Attendu: la génération d'un certificat de situation pour une recherche RMC auto vide et une demande PACS et tituliare Masculin fonctionne correctement", async () => {
  render(<HookConsummer></HookConsummer>);
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");
  const resulatContenu = screen.getByTestId("resulatContenu");

  await waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentReponse=${idDocumentsReponse[0]}`
    );
    expect(resulatContenu.innerHTML).toBe(
      `contenuDocumentReponse=${imagePngVideBase64}`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
