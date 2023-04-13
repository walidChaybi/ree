import {
  IGenerationCertificatSituationParams,
  useGenerationCertificatSituationHook
} from "@hook/generation/generationCertificatSituationHook/GenerationCertificatSituationHook";
import {
  INbInscriptionsInfos,
  specificationPhraseRMCAutoVide
} from "@hook/generation/generationCertificatSituationHook/specificationTitreDecretPhrase/specificationPhraseRMCAutoVide";
import { idDocumentsReponse } from "@mock/data/DocumentReponse";
import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { ReponseAppelNomenclatureDocummentDelivrance } from "@mock/data/nomenclatures";
import { idRequeteRDCSC } from "@mock/data/requeteDelivrance";
import { Sexe } from "@model/etatcivil/enum/Sexe";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { ITitulaireRequeteTableau } from "@model/requete/ITitulaireRequeteTableau";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

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

const nbInscriptionsInfos = {
  nbActe: 0,
  nbPacs: 0,
  nbRc: 0,
  nbRca: 0
} as INbInscriptionsInfos;

const params = {
  requete,
  nbInscriptionsInfos,
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

test("Attendu: la génération d'un certificat de situation pour une recherche RMC auto vide et une demande PACS et titulaire Masculin fonctionne correctement", async () => {
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
