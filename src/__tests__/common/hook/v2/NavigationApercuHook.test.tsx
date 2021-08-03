import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import { userDroitCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { TypeRequete } from "../../../../model/requete/v2/enum/TypeRequete";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { useNavigationApercu } from "../../../../views/common/hook/v2/navigationApercuRequeteRmcAuto/NavigationApercuHook";
import { storeRece } from "../../../../views/common/util/storeRece";

const requete: IRequeteTableau = {
  idRequete: "0",
  type: TypeRequete.DELIVRANCE.libelle,
  statut: StatutRequete.A_VALIDER.libelle,
  idUtilisateur: "idUtilisateurConnectedUser"
};

storeRece.utilisateurCourant = userDroitCOMEDEC;

const HookConsummerNavigation: React.FC = () => {
  const res = useNavigationApercu("/rece/rece-ui/mesrequetesv2", requete);
  return <div data-testid="url">{res?.url}</div>;
};

test("test apercu traitement", async () => {
  await act(async () => {
    const { getByTestId } = render(<HookConsummerNavigation />);
    await waitFor(() =>
      expect(getByTestId("url").textContent).toBe(
        "/rece/rece-ui/mesrequetesv2/apercurequetetraitement/0"
      )
    );
  });
});
