import { useGenerationInscriptionsHook } from "@hook/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { idDocumentsReponse2 } from "../../../../../mock/data/DocumentReponse";
import {
  MOCK_RESULTAT_RMC_INSCRIPTION_PACS,
  MOCK_RESULTAT_RMC_INSCRIPTION_RC,
  MOCK_RESULTAT_RMC_INSCRIPTION_RCA
} from "../../../../../mock/data/RMCInscription";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../mock/data/nomenclatures";
import { idRequeteRDCSC } from "../../../../../mock/data/requeteDelivrance";

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

const dataRMCAutoInscription = [MOCK_RESULTAT_RMC_INSCRIPTION_RC, MOCK_RESULTAT_RMC_INSCRIPTION_RCA, MOCK_RESULTAT_RMC_INSCRIPTION_PACS]
  .map(ResultatRMCInscription.depuisDto)
  .filter((inscription): inscription is TResultatRMCInscription => inscription !== null);

const HookConsummer: React.FC = () => {
  const res = useGenerationInscriptionsHook(requete, dataRMCAutoInscription, true);

  return <div data-testid="resulatIdDoc">{res?.idDocumentsReponse && <>{`idDocumentsReponse=${res?.idDocumentsReponse}`}</>}</div>;
};

test("Attendu: la génération d'un certificat d'inscription RC", () => {
  render(
    <MockRECEContextProvider>
      <HookConsummer></HookConsummer>
    </MockRECEContextProvider>
  );
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");

  waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(`idDocumentsReponse=${idDocumentsReponse2}`);
  });
});
