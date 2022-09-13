import React from "react";
import { useParams } from "react-router";
import { IUuidRequeteParams } from "../../../../../../model/params/IUuidRequeteParams";
import { IEchange } from "../../../../../../model/requete/IEchange";
import { IRequeteCreation } from "../../../../../../model/requete/IRequeteCreation";
import { SuiviObservationsRequete } from "../../../../../common/composant/suivis/SuiviObservationRequete";
import { getLibelle } from "../../../../../common/util/Utils";
import { Item } from "./Item/Item";
import { ItemEchangesRetourSDANF } from "./Item/ItemEchangesRetourSDANF";
import { ListeActionsRetourSDANF } from "./ListeActions";
import "./scss/VoletPieceJustificativesEtActions.scss";
interface OngletActionProps {
  echanges?: IEchange[];
  requete: IRequeteCreation;
}

export const OngletAction: React.FC<OngletActionProps> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [echanges, setEchanges] = React.useState<IEchange[] | undefined>(
    props.echanges
  );

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
    </>
  );
};
