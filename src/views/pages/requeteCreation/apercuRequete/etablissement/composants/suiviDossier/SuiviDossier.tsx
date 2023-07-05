import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import { getLibelle } from "@util/Utils";
import React from "react";
import { useParams } from "react-router";
import { IUuidRequeteParams } from "../../../../../../../model/params/IUuidRequeteParams";
import { IEchange } from "../../../../../../../model/requete/IEchange";
import { IRequeteCreationEtablissement } from "../../../../../../../model/requete/IRequeteCreationEtablissement";
import { Item } from "../item/Item";
import { ItemEchangesRetourSDANF } from "../item/ItemEchangesRetourSDANF";
import "../scss/OngletsApercuCreationEtablissement.scss";
import { ListeActionsRetourSDANF } from "./ListeActions";
interface ISuiviDossierProps {
  echanges?: IEchange[];
  requete?: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
}

export const SuiviDossier: React.FC<ISuiviDossierProps> = props => {
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
    </>
  );
};
