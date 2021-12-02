import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { useCreationRequeteDelivranceRDCSC } from "../../../../../views/pages/requeteDelivrance/saisirRequete/hook/CreerRDCSCApiHook";
import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "../data/DataRDCSC";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsummerInteresse: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCInteresse);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook intéressé", async () => {
  render(<HookConsummerInteresse />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", async () => {
  render(<HookConsummerMandataire />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCInstitutionnel
  );
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook institutionnel", async () => {
  render(<HookConsummerInstitutionnel />);
  await waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook particulier", async () => {
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
