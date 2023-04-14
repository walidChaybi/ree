import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { RECEContext } from "@core/body/RECEContext";
import { autorisePrendreEnChargeDepuisPageCreation } from "@util/RequetesUtils";
import { getLibelle } from "@util/Utils";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { IUuidRequeteParams } from "../../../../../../../model/params/IUuidRequeteParams";
import { IEchange } from "../../../../../../../model/requete/IEchange";
import { IRequeteCreationEtablissement } from "../../../../../../../model/requete/IRequeteCreationEtablissement";
import { BoutonPrendreEnChargeCreation } from "../BoutonPrendreEnChargeCreation";
import { Item } from "../item/Item";
import { ItemEchangesRetourSDANF } from "../item/ItemEchangesRetourSDANF";
import "../scss/OngletsApercuCreationEtablissement.scss";
import { ListeActionsRetourSDANF } from "./ListeActions";
interface OngletActionProps {
  echanges?: IEchange[];
  requete?: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
}

export const Action: React.FC<OngletActionProps> = props => {
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
          statusRequete={props.requete?.statutCourant}
          idRequeteCorbeilleAgent={props.requete?.idUtilisateur}
          idRequeteParam={idRequeteParam}
          modeConsultation={props.modeConsultation}
        />
      </Item>

      <SuiviObservationsRequete
        idRequete={idRequeteParam}
        observations={props.requete?.observations}
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
