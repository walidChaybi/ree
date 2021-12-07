import React, { useEffect, useState } from "react";
import { IRequeteDelivrance } from "../../../../../model/requete/IRequeteDelivrance";
import { IRequeteTableauDelivrance } from "../../../../../model/requete/IRequeteTableauDelivrance";
import { ICriteresRMCRequete } from "../../../../../model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "../../../../../model/rmc/requete/IRMCRequete";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { getLibelle } from "../../../../common/util/Utils";
import { Fieldset } from "../../../../common/widget/fieldset/Fieldset";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "../../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { useRMCRequeteApiHook } from "../../requete/hook/RMCRequeteApiHook";
import { useRMCAutoRequeteApiHook } from "../hook/RMCAutoRequeteApiHook";
import "../scss/RMCRequetesAssocieesResultats.scss";
import { RMCTableauRequetesAssociees } from "./RMCTableauRequetesAssociees";

export interface RMCRequetesAssocieesResultatsProps {
  requete: IRequeteDelivrance;
}

export const RMCRequetesAssocieesResultats: React.FC<RMCRequetesAssocieesResultatsProps> = props => {
  /* Etats RMC */
  const [requetesTableau, setRequetesTableau] = useState<
    IRequeteTableauDelivrance[]
  >();
  const [paramsTableau, setParamsTableau] = useState<IParamsTableau>();

  /* Etats RMC manuelle*/
  const [nouvelleRMCRequete, setNouvelleRMCRequete] = useState<boolean>(false);
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});

  const [
    criteresRechercheRequete,
    setCriteresRechercheRequete
  ] = useState<ICriteresRMCRequete>();

  /* Hook d'appel de l'API RMC Auto requêtes */
  const {
    dataRMCAutoRequete,
    dataTableauRMCAutoRequete
  } = useRMCAutoRequeteApiHook(
    props.requete,
    `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
  );

  /* Hook d'appel de l'API RMC manuelle requêtes */
  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(
    criteresRechercheRequete
  );

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    if (dataRMCAutoRequete && dataTableauRMCAutoRequete) {
      setRequetesTableau(dataRMCAutoRequete);
      setParamsTableau(dataTableauRMCAutoRequete);
    }
  }, [dataRMCAutoRequete, dataTableauRMCAutoRequete]);

  useEffect(() => {
    if (dataRMCRequete && dataTableauRMCRequete) {
      setRequetesTableau(dataRMCRequete);
      setParamsTableau(dataTableauRMCRequete);
    }
  }, [dataRMCRequete, dataTableauRMCRequete]);

  /* Gestion de la pagination pour la RMC */
  const setRangeRequete = (rangeRequete: string) => {
    if (valuesRMCRequete && rangeRequete !== "") {
      setCriteresRechercheRequete({
        valeurs: valuesRMCRequete,
        range: rangeRequete
      });
    }
  };

  return (
    <>
      {requetesTableau && paramsTableau && (
        <Fieldset titre={getLibelle("Autres requêtes associées au titulaire")}>
          <div className="RMCRequetesAssocieesResultats">
            <RMCTableauRequetesAssociees
              dataRMCRequete={requetesTableau}
              dataTableauRMCRequete={paramsTableau}
              setRangeRequete={setRangeRequete}
              setNouvelleRMCRequete={setNouvelleRMCRequete}
              setValuesRMCRequete={setValuesRMCRequete}
              setCriteresRechercheRequete={setCriteresRechercheRequete}
              resetTableauRequete={nouvelleRMCRequete}
            />
          </div>
        </Fieldset>
      )}
    </>
  );
};
