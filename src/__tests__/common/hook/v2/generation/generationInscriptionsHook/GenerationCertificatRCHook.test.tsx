import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse } from "../../../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../../../mock/data/ImagePng";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import { idRequete1 } from "../../../../../../mock/data/RequeteV2";
import { DataRMCInscriptionAvecUnRC } from "../../../../../../mock/data/RMCInscription";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configMultiAPi } from "../../../../../../mock/superagent-config/superagent-mock-multi-apis";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { useGenerationCertificatRCHook } from "../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/GenerationCertificatRCHook";

const superagentMock = require("superagent-mock")(request, configMultiAPi);
const superagentMockEtatCivil = require("superagent-mock")(
  request,
  configEtatcivil
);

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
  idRequete: idRequete1,
  document: ReponseAppelNomenclatureDocummentDelivrance.data[5].id, //CERTIFICAT_SITUATION_RC
  titulaires: [titulaire]
} as IRequeteTableau;

const dataRMCAutoInscription = DataRMCInscriptionAvecUnRC;

const HookConsummer: React.FC = () => {
  const res = useGenerationCertificatRCHook(requete, dataRMCAutoInscription);

  return (
    <>
      <div data-testid="resulatIdDoc">
        {res?.idDocumentsReponse && (
          <>{`idDocumentReponse=${res?.idDocumentsReponse[1]}`}</>
        )}
      </div>
      <div data-testid="resulatContenu">
        {res?.contenuDocumentsReponse && (
          <>{`contenuDocumentReponse=${res?.contenuDocumentsReponse[0]}`}</>
        )}
      </div>
    </>
  );
};

beforeAll(() => {
  DocumentDelivrance.init();
});

test("Attendu: la génération d'un certificat d'inscription RC", async () => {
  render(<HookConsummer></HookConsummer>);
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");
  const resulatContenu = screen.getByTestId("resulatContenu");

  await waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentReponse=${idDocumentsReponse[1]}`
    );
    expect(resulatContenu.innerHTML).toBe(
      `contenuDocumentReponse=${imagePngVideBase64}`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
  superagentMockEtatCivil.unset();
});
