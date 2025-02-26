import { useNavigationApercuDelivrance } from "@hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { Provenance } from "@model/requete/enum/Provenance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { userDroitCOMEDEC } from "../../../../mock/data/mockConnectedUserAvecDroit";

const requete1: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  sousType: SousTypeDelivrance.RDC.libelleCourt!,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idService: "1"
};

const HookConsummerNavigation: React.FC = () => {
  const res = useNavigationApercuDelivrance("/rece/rece-ui/mesrequetes", requete1);
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test apercu traitement", () => {
  const { getByTestId } = render(elementAvecContexte(<HookConsummerNavigation />, userDroitCOMEDEC));
  waitFor(() => {
    expect(getByTestId("url").textContent).toBe("/rece/rece-ui/mesrequetes/apercurequetedelivrance/0");
  });
});

const requete2: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  sousType: SousTypeDelivrance.RDC.libelleCourt!,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idService: "1"
};

const HookConsummerNavigation2: React.FC = () => {
  const res = useNavigationApercuDelivrance("/rece/rece-ui/mesrequetes", requete2);
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test apercu traitement", () => {
  const { getByTestId } = render(elementAvecContexte(<HookConsummerNavigation2 />, userDroitCOMEDEC));
  waitFor(() => {
    expect(getByTestId("url").textContent).toBe("/rece/rece-ui/mesrequetes/apercurequetedelivrance/0");
  });
});

const requete3: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  sousType: SousTypeDelivrance.RDCSC.libelleCourt!,
  statut: StatutRequete.BROUILLON.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idService: "1"
};

const HookConsummerNavigation3: React.FC = () => {
  const res = useNavigationApercuDelivrance("/rece/rece-ui/mesrequetes", requete3);
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test Brouillon", () => {
  const { getByTestId } = render(elementAvecContexte(<HookConsummerNavigation3 />, userDroitCOMEDEC));
  waitFor(() => {
    expect(getByTestId("url").textContent).toBe("/rece/rece-ui/mesrequetes/saisircertificatsituation/0");
  });
});

const requete4: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.DOUBLON.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idService: "1",
  sousType: SousTypeDelivrance.RDCSC.libelleCourt!
};

const HookConsummerNavigation4: React.FC = () => {
  const res = useNavigationApercuDelivrance("/rece/rece-ui/mesrequetes/saisirextraitcopie", requete4);
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test Doublon", () => {
  const { getByTestId } = render(elementAvecContexte(<HookConsummerNavigation4 />, userDroitCOMEDEC));
  waitFor(() => {
    expect(getByTestId("url").textContent).toBe("/rece/rece-ui/mesrequetes/apercurequetedelivrance/0");
  });
});
const requete5: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  sousType: SousTypeDelivrance.RDCSC.libelleCourt!,
  statut: StatutRequete.A_VALIDER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idService: "1"
};

const HookConsummerNavigation5: React.FC = () => {
  const res = useNavigationApercuDelivrance("/rece/rece-ui/mesrequetes", requete5);
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test A valider", () => {
  const { getByTestId } = render(elementAvecContexte(<HookConsummerNavigation5 />, userDroitCOMEDEC));
  waitFor(() => {
    expect(getByTestId("url").textContent).toBe("/rece/rece-ui/mesrequetes/apercurequetetraitement/0");
  });
});
