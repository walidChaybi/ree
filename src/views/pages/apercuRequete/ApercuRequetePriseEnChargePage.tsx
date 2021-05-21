/* istanbul ignore file */
// TODO à supprimer lors de l'implémentation de la page

import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IResultatRMCActe } from "../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../common/util/GestionDesLiensApi";
import { BoutonRetour } from "../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../common/widget/Text";
import { useDetailRequeteApiHook } from "../detailRequete/hook/DetailRequeteHook";
import { RMCAutoResultats } from "../rechercheMultiCriteres/auto/RMCAutoResultats";
import { ChoixAction } from "./actions/ChoixAction";

interface idRequeteParams {
  idRequete: string;
}

interface dataRMCAuto {
  dataRequetes: any[];
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const { idRequete } = useParams<idRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const history = useHistory();
  const [dataHistory] = useState<dataRMCAuto>(
    history.location.state as dataRMCAuto
  );

  const dataRequetes = dataHistory.dataRequetes;
  const dataRMCAutoActe = dataHistory.dataRMCAutoActe;
  const dataTableauRMCAutoActe = dataHistory.dataTableauRMCAutoActe;
  const dataRMCAutoInscription = dataHistory.dataRMCAutoInscription;
  const dataTableauRMCAutoInscription =
    dataHistory.dataTableauRMCAutoInscription;

  return (
    <>
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      <h1>
        {getLibelle(`Aperçu de la requête en prise en charge ${idRequete}`)}
      </h1>
      {dataRMCAutoActe &&
        dataTableauRMCAutoActe &&
        dataRMCAutoInscription &&
        dataTableauRMCAutoInscription && (
          <RMCAutoResultats
            dataRMCAutoActe={dataRMCAutoActe}
            dataTableauRMCAutoActe={dataTableauRMCAutoActe}
            dataRMCAutoInscription={dataRMCAutoInscription}
            dataTableauRMCAutoInscription={dataTableauRMCAutoInscription}
          />
        )}
      <ChoixAction requete={detailRequeteState?.data} />
      <BoutonRetour message={getLibelle("<< Retour")} />
    </>
  );
};
