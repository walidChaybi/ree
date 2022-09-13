import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useUpdateRequeteDelivranceRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/UpdateRDCSCApiHook";
import { UpdateRequeteRDCSC } from "@pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRDCSCPageModel";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "../data/DataRDCSC";

const superagentMock = require("superagent-mock")(request, configRequetes);

const saisieInteresse = {
  ...RequeteRDCSCInteresse,
  idRequete: "1072bc37-f889-4365-8f75-912166b767dd"
} as UpdateRequeteRDCSC;

const saisieMandataire = {
  ...RequeteRDCSCMandataire,
  idRequete: "1072bc37-f889-4365-8f75-912166b767dd"
} as UpdateRequeteRDCSC;

const saisieInstitution = {
  ...RequeteRDCSCInstitutionnel,
  idRequete: "1072bc37-f889-4365-8f75-912166b767dd"
} as UpdateRequeteRDCSC;

const saisieParticulier = {
  ...RequeteRDCSCParticulier,
  idRequete: "1072bc37-f889-4365-8f75-912166b767dd"
} as UpdateRequeteRDCSC;

const HookConsummerInteresse: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieInteresse);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook intéressé", async () => {
  render(<HookConsummerInteresse />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook mandataire", async () => {
  render(<HookConsummerMandataire />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieInstitution);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook institution", async () => {
  render(<HookConsummerInstitutionnel />);
  await waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook particuler", async () => {
  render(<HookConsummerParticulier />);
  await waitForResultat(StatutRequete.BROUILLON, false);
});

async function waitForResultat(futurStatut: StatutRequete, refus: boolean) {
  await waitFor(() => {
    expect(
      screen.getByText(
        `1072bc37-f889-4365-8f75-912166b767dd,${futurStatut.libelle},${refus}`
      )
    ).toBeDefined();
  });
}

afterAll(() => {
  superagentMock.unset();
});
