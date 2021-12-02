import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { useCreationRequeteDelivranceRDC } from "../../../../../views/pages/requeteDelivrance/saisirRequete/hook/CreerRDCApiHook";
import {
  RequeteRDCAutreProfessionnnel,
  RequeteRDCInstitutionnel,
  RequeteRDCMandataire,
  RequeteRDCParticulier,
  RequeteRDCTitulaire
} from "../data/DataRDC";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const HookConsummerTitulaire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCTitulaire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", async () => {
  render(<HookConsummerTitulaire />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", async () => {
  render(<HookConsummerMandataire />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCInstitutionnel);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook institutionnel", async () => {
  render(<HookConsummerInstitutionnel />);
  await waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(RequeteRDCParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook particulier", async () => {
  render(<HookConsummerParticulier />);
  await waitForResultat(StatutRequete.BROUILLON, false);
});

const HookConsummerAutreProfessionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDC(
    RequeteRDCAutreProfessionnnel
  );
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook autre professionnel", async () => {
  render(<HookConsummerAutreProfessionnel />);
  await waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
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
