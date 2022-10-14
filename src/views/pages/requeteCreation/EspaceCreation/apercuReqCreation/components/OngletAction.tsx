import { RECEContext } from "@core/body/RECEContext";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { IUuidRequeteParams } from "../../../../../../model/params/IUuidRequeteParams";
import { IEchange } from "../../../../../../model/requete/IEchange";
import { IRequeteCreation } from "../../../../../../model/requete/IRequeteCreation";
import { SuiviObservationsRequete } from "../../../../../common/composant/suivis/SuiviObservationRequete";
import { getLibelle } from "../../../../../common/util/Utils";
import { BoutonPrendreEnChargeCreation } from "./BoutonPrendreEnChargeCreation";
import { Item } from "./Item/Item";
import { ItemEchangesRetourSDANF } from "./Item/ItemEchangesRetourSDANF";
import { ListeActionsRetourSDANF } from "./ListeActions";
import "./scss/VoletPieceJustificativesEtActions.scss";
interface OngletActionProps {
  echanges?: IEchange[];
  requete: IRequeteCreation;
}

export const OngletAction: React.FC<OngletActionProps> = props => {
  const { rechargementPage } = useContext(RECEContext);

  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [echanges, setEchanges] = React.useState<IEchange[] | undefined>(
    props.echanges
  );

  const estPresentBoutonPriseEnCharge =
    autorisePrendreEnChargeDepuisPageCreation(props.requete);

  return (
    <>
      <Item titre={getLibelle("Retour SDANF")}>
        <ItemEchangesRetourSDANF echanges={echanges} />

        <ListeActionsRetourSDANF
          setEchanges={setEchanges}
          echanges={echanges}
          statusRequete={props.requete.statutCourant}
          idRequeteCorbeilleAgent={props.requete.idUtilisateur}
          idRequeteParam={idRequeteParam}
        />
      </Item>

      <SuiviObservationsRequete
        idRequete={idRequeteParam}
        observations={props.requete.observations}
      />

      {estPresentBoutonPriseEnCharge && (
        <BoutonPrendreEnChargeCreation
          requete={props.requete}
          onClick={rechargementPage}
        />
      )}
    </>
  );
};
