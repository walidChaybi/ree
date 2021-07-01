import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configMultiAPi } from "../../../../../../../src/mock/superagent-config/superagent-mock-multi-apis";
import { idDocumentReponse1 } from "../../../../../../mock/data/DocumentReponse";
import { imagePngVideBase64 } from "../../../../../../mock/data/ImagePng";
import { ReponseAppelNomenclatureDocummentDelivrance } from "../../../../../../mock/data/nomenclatures";
import { idRequete1 } from "../../../../../../mock/data/RequeteV2";
import { Sexe } from "../../../../../../model/etatcivil/enum/Sexe";
import {
  IRequeteTableau,
  ITitulaireRequeteTableau
} from "../../../../../../model/requete/v2/IRequeteTableau";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { useGenerationCertificatSituationRMCAutoVide } from "../../../../../../views/pages/rechercheMultiCriteres/autoActesInscriptions/hook/generationCertificatSituationRMCAutoVideHook/GenerationCertificatSituationRMCAutoVideHook";
const superagentMock = require("superagent-mock")(request, configMultiAPi);

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
  document: ReponseAppelNomenclatureDocummentDelivrance.data[1].id, //CERTIFICAT_SITUATION_PACS
  titulaires: [titulaire]
} as IRequeteTableau;
const dataRMCAutoInscription = [] as IResultatRMCInscription[];
const dataRMCAutoActe = [] as IResultatRMCActe[];

const HookConsummer: React.FC = () => {
  const res = useGenerationCertificatSituationRMCAutoVide(
    requete,
    dataRMCAutoInscription,
    dataRMCAutoActe
  );
  return (
    <div data-testid="resulat">
      {`idDocumentReponse=${res?.idDocumentReponse}, idAction=${res?.idAction},
      contenuDocumentReponse=${res?.contenuDocumentReponse}`}
    </div>
  );
};

test("Attendu: la génération d'un certificat de situation pour une recherche RMC auto vide et une demande PACS et tituliare Masculin fonctionne correctement", async () => {
  render(<HookConsummer></HookConsummer>);
  await waitFor(() => {
    expect(
      screen.getByText(
        `idDocumentReponse=${idDocumentReponse1}, idAction=123456789, contenuDocumentReponse=${imagePngVideBase64}`
      )
    ).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
