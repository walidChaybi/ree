import { SuiviObservationsRequete } from "@composant/suivis/SuiviObservationsRequete";
import TableauSuiviDossier from "@pages/requeteCreation/commun/composants/TableauSuiviDossier/TableauSuiviDossier";
import { getLibelle } from "@util/Utils";
import React, { useState } from "react";
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
  requete: IRequeteCreationEtablissement;
  modeConsultation?: boolean;
}

export const SuiviDossier: React.FC<ISuiviDossierProps> = props => {
  const { idRequeteParam } = useParams<IUuidRequeteParams>();
  const [echanges, setEchanges] = useState<IEchange[] | undefined>(
    props.echanges
  );
  return (
    <>
      <TableauSuiviDossier requete={props.requete} />
      <Item titre={getLibelle("Retour SDANF")}>
        <ItemEchangesRetourSDANF echanges={echanges} />

        <ListeActionsRetourSDANF
          setEchanges={setEchanges}
          echanges={echanges}
          statusRequete={props.requete?.statutCourant.statut}
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
