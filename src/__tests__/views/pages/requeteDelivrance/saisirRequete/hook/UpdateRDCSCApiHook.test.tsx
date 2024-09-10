import {
  RequeteRDCSCInstitutionnel,
  RequeteRDCSCInteresse,
  RequeteRDCSCMandataire,
  RequeteRDCSCParticulier
} from "@mock/data/DataRDCSC";
import { UpdateRequeteRDCSC } from "@model/form/delivrance/ISaisirRDCSCPageForm";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { useUpdateRequeteDelivranceRDCSC } from "@pages/requeteDelivrance/saisirRequete/hook/UpdateRDCSCApiHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

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

test("Maj requête délivrance hook intéressé", () => {
  render(<HookConsummerInteresse />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerMandataire: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieMandataire);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook mandataire", () => {
  render(<HookConsummerMandataire />);
  waitForResultat(StatutRequete.PRISE_EN_CHARGE, false);
});

const HookConsummerInstitutionnel: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieInstitution);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook institution", () => {
  render(<HookConsummerInstitutionnel />);
  waitForResultat(StatutRequete.A_TRAITER, true);
});

const HookConsummerParticulier: React.FC = () => {
  const resultat = useUpdateRequeteDelivranceRDCSC(saisieParticulier);
  return (
    <>{`${resultat?.requete.id},${resultat?.futurStatut.libelle},${resultat?.refus}`}</>
  );
};

test("Maj requête délivrance hook particuler", () => {
  render(<HookConsummerParticulier />);
  waitForResultat(StatutRequete.BROUILLON, false);
});

function waitForResultat(futurStatut: StatutRequete, refus: boolean) {
  waitFor(() => {
    expect(
      screen.getByText(
        `1072bc37-f889-4365-8f75-912166b767dd,${futurStatut.libelle},${refus}`
      )
    ).toBeDefined();
  });
}
