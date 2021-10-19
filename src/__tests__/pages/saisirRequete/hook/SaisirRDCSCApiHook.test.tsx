import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useCreationRequeteDelivranceRDCSC } from "../../../../views/pages/saisirRequete/hook/SaisirRDCSCApiHook";
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
    <>{`${resultat?.requete.id},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook intéressé", async () => {
  render(<HookConsummerInteresse />);
  await waitForResultat(false, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook mandataire", async () => {
  render(<HookConsummerMandataire />);
  await waitForResultat(false, true);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCInstitutionnel
  );
  return (
    <>{`${resultat?.requete.id},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook institutionnel", async () => {
  render(<HookConsummerInstitutionnel />);
  await waitForResultat(true, false);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useCreationRequeteDelivranceRDCSC(RequeteRDCSCParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Création requête délivrance hook particulier", async () => {
  render(<HookConsummerParticulier />);
  await waitForResultat(false, false);
});
async function waitForResultat(brouillon: boolean, refus: boolean) {
  await waitFor(() => {
    expect(
      screen.getByText(
        `1072bc37-f889-4365-8f75-912166b767dd,${brouillon},${refus}`
      )
    ).toBeInTheDocument();
  });
}
