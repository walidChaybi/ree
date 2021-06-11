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
  const urlNouvelleRequete = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCInteresse
  );
  return <>{urlNouvelleRequete}</>;
};

test("Création requête délivrance hook", async () => {
  render(<HookConsummerInteresse />);

  waitFor(() => {
    expect(
      screen.getAllByText("1072bc37-f889-4365-8f75-912166b767dd")
    ).toBeDefined();
  });
});

const HookConsummerMandataire: React.FC = () => {
  const urlNouvelleRequete = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCMandataire
  );
  return <>{urlNouvelleRequete}</>;
};

test("Création requête délivrance hook", async () => {
  render(<HookConsummerMandataire />);

  waitFor(() => {
    expect(
      screen.getAllByText("1072bc37-f889-4365-8f75-912166b767dd")
    ).toBeDefined();
  });
});

const HookConsummerInstitutionnel: React.FC = () => {
  const urlNouvelleRequete = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCInstitutionnel
  );
  return <>{urlNouvelleRequete}</>;
};

test("Création requête délivrance hook", async () => {
  render(<HookConsummerInstitutionnel />);

  waitFor(() => {
    expect(
      screen.getAllByText("1072bc37-f889-4365-8f75-912166b767dd")
    ).toBeDefined();
  });
});

const HookConsummerParticulier: React.FC = () => {
  const urlNouvelleRequete = useCreationRequeteDelivranceRDCSC(
    RequeteRDCSCParticulier
  );
  return <>{urlNouvelleRequete}</>;
};

test("Création requête délivrance hook", async () => {
  render(<HookConsummerParticulier />);

  waitFor(() => {
    expect(
      screen.getAllByText("1072bc37-f889-4365-8f75-912166b767dd")
    ).toBeDefined();
  });
});
