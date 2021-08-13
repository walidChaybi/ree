import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { Provenance } from "../../../../model/requete/v2/enum/Provenance";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { useNavigationApercu } from "../../../../views/common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuHook";
import { storeRece } from "../../../../views/common/util/storeRece";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const requete1: IRequeteTableau = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1"
};

storeRece.utilisateurCourant = userDroitCOMEDEC;

const HookConsummerNavigation: React.FC = () => {
  const res = useNavigationApercu("/rece/rece-ui/mesrequetesv2", requete1);
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
        "/rece/rece-ui/mesrequetesv2/apercurequete/0"
      )
    );
  });
});

const requete2: IRequeteTableau = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_TRAITER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1"
};

storeRece.utilisateurCourant = userDroitCOMEDEC;

const HookConsummerNavigation2: React.FC = () => {
  const res = useNavigationApercu("/rece/rece-ui/mesrequetesv2", requete2);
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
        "/rece/rece-ui/mesrequetesv2/apercurequete/0"
      )
    );
  });
});

const requete3: IRequeteTableau = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.BROUILLON.libelle,
  idUtilisateur: "idUtilisateurConnectedUser",
  provenance: Provenance.COURRIER.libelle,
  idEntiteRattachement: "1"
};

const HookConsummerNavigation3: React.FC = () => {
  const res = useNavigationApercu("/rece/rece-ui/mesrequetesv2", requete3);
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
        "/rece/rece-ui/mesrequetesv2/saisircertificatsituation/0"
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
