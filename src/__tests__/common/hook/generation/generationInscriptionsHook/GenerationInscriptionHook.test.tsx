import { useGenerationInscriptionsHook } from "@hook/generation/generationInscriptionsHook/GenerationInscriptionsHook";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { idDocumentsReponse2 } from "../../../../../mock/data/DocumentReponse";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../mock/data/nomenclatures";
import { idRequeteRDCSC } from "../../../../../mock/data/requeteDelivrance";
import {
    DataRMCInscriptionAvecUnPACS,
    DataRMCInscriptionAvecUnRC,
    DataRMCInscriptionAvecUnRCA
} from "../../../../../mock/data/RMCInscription";



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

test("Attendu: la génération d'un certificat d'inscription RC", async () => {
  render(<HookConsummer></HookConsummer>);
  const resulatIdDoc = screen.getByTestId("resulatIdDoc");

  await waitFor(() => {
    expect(resulatIdDoc.innerHTML).toBe(
      `idDocumentsReponse=${idDocumentsReponse2}`
    );
  });
});


