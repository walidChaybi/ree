import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../mock/data/connectedUserAvecDroit";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { Provenance } from "../../../model/requete/enum/Provenance";
import { SousTypeDelivrance } from "../../../model/requete/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../model/requete/enum/StatutRequete";
import { TypeRequete } from "../../../model/requete/enum/TypeRequete";
import { IRequeteTableauDelivrance } from "../../../model/requete/IRequeteTableauDelivrance";
import { useNavigationApercuDelivrance } from "../../../views/common/hook/navigationApercuRequeteDelivrance/NavigationApercuDelivranceHook";
import { storeRece } from "../../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, configRequetes);

const requete1: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1"
};

storeRece.utilisateurCourant = userDroitCOMEDEC;

const HookConsummerNavigation: React.FC = () => {
  const res = useNavigationApercuDelivrance(
    "/rece/rece-ui/mesrequetes",
    requete1
  );
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test apercu traitement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetes/apercurequetedelivrance/0"
      )
    );
  });
});

const requete2: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1"
};

storeRece.utilisateurCourant = userDroitCOMEDEC;

const HookConsummerNavigation2: React.FC = () => {
  const res = useNavigationApercuDelivrance(
    "/rece/rece-ui/mesrequetes",
    requete2
  );
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test apercu traitement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation2 />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetes/apercurequetedelivrance/0"
      )
    );
  });
});

const requete3: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.BROUILLON.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1",
  sousType: SousTypeDelivrance.RDCSC.libelleCourt
};

const HookConsummerNavigation3: React.FC = () => {
  const res = useNavigationApercuDelivrance(
    "/rece/rece-ui/mesrequetes",
    requete3
  );
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test Brouillon", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation3 />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetes/saisircertificatsituation/0"
      )
    );
  });
});

const requete4: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.DOUBLON.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1",
  sousType: SousTypeDelivrance.RDCSC.libelleCourt
};

const HookConsummerNavigation4: React.FC = () => {
  const res = useNavigationApercuDelivrance(
    "/rece/rece-ui/mesrequetes/saisirextraitcopie",
    requete4
  );
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test Doublon", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation4 />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetes/apercurequetedelivrance/0"
      )
    );
  });
});
const requete5: IRequeteTableauDelivrance = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_VALIDER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1",
  sousType: SousTypeDelivrance.RDCSC.libelleCourt
};

const HookConsummerNavigation5: React.FC = () => {
  const res = useNavigationApercuDelivrance(
    "/rece/rece-ui/mesrequetes",
    requete5
  );
  return (
    <>
      <div data-testid="url">{res?.url}</div>
      <div data-testid="isRmcAuto">{res?.isRmcAuto}</div>
    </>
  );
};

test("test A valider", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation5 />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetes/edition/0"
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
