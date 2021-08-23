import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse } from "../../../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../../../mock/data/ImagePng";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import { idRequete1 } from "../../../../../../mock/data/RequeteV2";
import {
  DataRMCInscriptionAvecUnRC,
  DataRMCInscriptionAvecUnRCA
} from "../../../../../../mock/data/RMCInscription";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configMultiAPi } from "../../../../../../mock/superagent-config/superagent-mock-multi-apis";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { useGenerationInscriptionsHook } from "../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/GenerationInscriptionsHook";

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
  document: ReponseAppelNomenclatureDocummentDelivrance.data[6].id, //CERTIFICAT_SITUATION_RC_RCA
  titulaires: [titulaire]
} as IRequeteTableau;

const dataRMCAutoInscription = DataRMCInscriptionAvecUnRC.concat(
  DataRMCInscriptionAvecUnRCA
);

const HookConsummer: React.FC = () => {
  const res = useGenerationInscriptionsHook(requete, dataRMCAutoInscription);

  return (
    <>
      <div data-testid="resulatIdDoc">
        {res?.idDocumentsReponse && (
          <>{`idDocumentsReponse=${res?.idDocumentsReponse}`}</>
        )}
      </div>
      <div data-testid="resulatContenu">
        {res?.contenuDocumentsReponse && (
          <>{`contenuDocumentReponse1=${res?.contenuDocumentsReponse[0]}`}</>
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
      `idDocumentsReponse=${idDocumentsReponse}`
    );
    expect(resulatContenu.innerHTML).toBe(
      `contenuDocumentReponse1=${imagePngVideBase64}`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
  superagentMockEtatCivil.unset();
});
