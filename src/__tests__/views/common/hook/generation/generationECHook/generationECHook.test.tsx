import {
  IGenerationECParams,
  useGenerationEC
} from "@hook/generation/generationECHook/generationECHook";
import { ReponseAppelDetailRequeteDelivrance } from "@mock/data/DetailRequeteDelivrance";
import { idFicheActe1, idFicheActeMariage } from "@mock/data/ficheActe";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { Validation } from "@model/requete/enum/Validation";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { getRequeteWithChoixDelivrance } from "../../../../../__tests__utils__/testsUtil";

const ecMariageSansFiliationparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: getRequeteWithChoixDelivrance(
    ReponseAppelDetailRequeteDelivrance.data,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
  ),
  validation: Validation.N,
  mentionsRetirees: [],
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
};

const ecMariageAvecFiliationparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: getRequeteWithChoixDelivrance(
    ReponseAppelDetailRequeteDelivrance.data,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
  ),
  mentionsRetirees: [],
  validation: Validation.N,
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_AVEC_FILIATION
};

const ecNaissanceSansFiliationparams: IGenerationECParams = {
  idActe: idFicheActe1,
  requete: getRequeteWithChoixDelivrance(
    ReponseAppelDetailRequeteDelivrance.data,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
  ),
  mentionsRetirees: [],
  validation: Validation.N,
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_SANS_FILIATION
};

const ecNaissancePlurilingueparams: IGenerationECParams = {
  idActe: idFicheActe1,
  requete: getRequeteWithChoixDelivrance(
    ReponseAppelDetailRequeteDelivrance.data,
    ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
  ),
  mentionsRetirees: [],
  validation: Validation.N,
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_EXTRAIT_PLURILINGUE
};

const ecCopieActeImageMariageparams: IGenerationECParams = {
  idActe: idFicheActeMariage,
  requete: getRequeteWithChoixDelivrance(
    ReponseAppelDetailRequeteDelivrance.data,
    ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
  ),
  mentionsRetirees: [],
  validation: Validation.N,
  choixDelivrance: ChoixDelivrance.DELIVRER_EC_COPIE_INTEGRALE
};

const HookConsumer: React.FC<
  IGenerationECParams
> = ecMariageFiliationparams => {
  const resultat = useGenerationEC(ecMariageFiliationparams);

  return <div>{resultat?.resultGenerationUnDocument?.idDocumentReponse}</div>;
};

test("Attendu: un extrait de mariage sans filiation est généré via useGenerationEC", () => {
  render(<HookConsumer {...ecMariageSansFiliationparams} />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeDefined();
  });
});

test("Attendu: un extrait de mariage avec filiation est généré via useGenerationEC", () => {
  render(<HookConsumer {...ecMariageAvecFiliationparams} />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeDefined();
  });
});

test("Attendu: un extrait de naissance sans filiation est généré via useGenerationEC", () => {
  render(<HookConsumer {...ecNaissanceSansFiliationparams} />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeDefined();
  });
});

test("Attendu: un extrait de naissance plurilingue est généré via useGenerationEC", () => {
  render(<HookConsumer {...ecNaissancePlurilingueparams} />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeDefined();
  });
});

test("Attendu: une copie intégrale mariage est générée via useGenerationEC", () => {
  render(<HookConsumer {...ecCopieActeImageMariageparams} />);

  waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).toBeDefined();
  });
});
