import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { useUpdateRequeteDelivranceRDCSC } from "../../../../views/pages/saisirRequete/hook/UpdateRDCSCApiHook";
import { UpdateRequeteRDCSC } from "../../../../views/pages/saisirRequete/modelForm/ISaisirRDCSCPageModel";
import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "../data/DataRDCSC";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

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
    <>{`${resultat?.idRequete},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook intéressé", async () => {
  render(<HookConsummerInteresse />);
  await waitForResultat(false, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieMandataire);
  return (
    <>{`${resultat?.idRequete},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook mandataire", async () => {
  render(<HookConsummerMandataire />);
  await waitForResultat(false, true);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieInstitution);
  return (
    <>{`${resultat?.idRequete},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook institution", async () => {
  render(<HookConsummerInstitutionnel />);
  await waitForResultat(true, false);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieParticulier);
  return (
    <>{`${resultat?.idRequete},${resultat?.brouillon},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook particuler", async () => {
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
