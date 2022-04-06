import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { ReponseAppelDetailRequeteDelivrance } from "../../../../../mock/data/DetailRequeteDelivrance";
import {
  idFicheActe1,
  idFicheActeMariage
} from "../../../../../mock/data/ficheActe";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { ChoixDelivrance } from "../../../../../model/requete/enum/ChoixDelivrance";
import { Validation } from "../../../../../model/requete/enum/Validation";
import {
  IGenerationECParams,
  useGenerationEC
} from "../../../../../views/common/hook/generation/generationECHook/generationECHook";
import { mappingRequeteDelivrance } from "../../../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configEtatcivil[0],
  configComposition[0]
]);

const ecMariageSansFiliationparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data),
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
  validation: Validation.N
};

const ecMariageAvecFiliationparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data),
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION,
  validation: Validation.N
};

const ecNaissanceSansFiliationparams: IGenerationECParams = {
  idActe: idFicheActe1,
  requete: mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data),
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION,
  validation: Validation.N
};

const ecNaissancePlurilingueparams: IGenerationECParams = {
  idActe: idFicheActe1,
  requete: mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data),
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE,
  validation: Validation.N
};

const ecCopieActeImageMariageparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: mappingRequeteDelivrance(ReponseAppelDetailRequeteDelivrance.data),
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE,
  validation: Validation.N
};

const HookConsumer: React.FC<IGenerationECParams> =
  ecMariageFiliationparams => {
    const resultat = useGenerationEC(ecMariageFiliationparams);

    return <div>{resultat?.resultGenerationUnDocument?.idDocumentReponse}</div>;
  };

test("Attendu: un extrait de mariage sans filiation est généré via useGenerationEC", async () => {
  render(<HookConsumer {...ecMariageSansFiliationparams} />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeInTheDocument();
  });
});

test("Attendu: un extrait de mariage avec filiation est généré via useGenerationEC", async () => {
  render(<HookConsumer {...ecMariageAvecFiliationparams} />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeInTheDocument();
  });
});

test("Attendu: un extrait de naissance sans filiation est généré via useGenerationEC", async () => {
  render(<HookConsumer {...ecNaissanceSansFiliationparams} />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeInTheDocument();
  });
});

test("Attendu: un extrait de naissance plurilingue est généré via useGenerationEC", async () => {
  render(<HookConsumer {...ecNaissancePlurilingueparams} />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeInTheDocument();
  });
});

test("Attendu: une copie intégrale mariage est générée via useGenerationEC", async () => {
  render(<HookConsumer {...ecCopieActeImageMariageparams} />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
