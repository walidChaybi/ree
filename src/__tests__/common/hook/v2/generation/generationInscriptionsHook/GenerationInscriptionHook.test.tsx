import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { idDocumentsReponse2 } from "../../../../../../mock/data/DocumentReponse";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import { idRequeteRDCSC } from "../../../../../../mock/data/RequeteV2";
import {
  DataRMCInscriptionAvecUnPACS,
  DataRMCInscriptionAvecUnRC,
  DataRMCInscriptionAvecUnRCA
} from "../../../../../../mock/data/RMCInscription";
import { configComposition } from "../../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2GeneInscription } from "../../../../../../mock/superagent-config/superagent-mock-requetes-v2-gene-inscription";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import { DocumentDelivrance } from "../../../../../../model/requete/v2/enum/DocumentDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../../model/requete/v2/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "../../../../../../model/requete/v2/ITitulaireRequeteTableau";
import { useGenerationInscriptionsHook } from "../../../../../../views/common/hook/v2/generation/generationInscriptionsHook/GenerationInscriptionsHook";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configComposition[0],
  configRequetesV2GeneInscription[0]
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
  document: ReponseAppelNomenclatureDocummentDelivrance.data[6].id, //CERTIFICAT_SITUATION_RC_RCA
  titulaires: [titulaire]
} as IRequeteTableauDelivrance;

const dataRMCAutoInscription = [
  ...DataRMCInscriptionAvecUnRC,
  ...DataRMCInscriptionAvecUnRCA,
  ...DataRMCInscriptionAvecUnPACS
];
const HookConsummer: React.FC = () => {
  const res = useGenerationInscriptionsHook(
    requete,
    dataRMCAutoInscription,
    true
  );

  return (
    <>
      <div data-testid="resulatIdDoc">
        {res?.idDocumentsReponse && (
          <>{`idDocumentsReponse=${res?.idDocumentsReponse}`}</>
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

  await waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentsReponse=${idDocumentsReponse2}`
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
