import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { NB_LIGNES_PAR_APPEL } from "../../../common/widget/tableau/TableUtils";
import { getLibelle } from "../../../common/widget/Text";
import { ChoixAction } from "../../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ChoixAction";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { RMCAutoResultats } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAutoResultats";
import { useRMCAutoRequeteApiHook } from "../../rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";
import { RMCRequetesAssocieesResultats } from "../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { BandeauRequete } from "../contenu/BandeauRequete";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
interface DataRMCAuto {
  dataRequetes: any[];
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

interface IdRequeteParams {
  idRequete: string;
}

export const ApercuRequetePriseEnChargePage: React.FC = () => {
  const { idRequete } = useParams<IdRequeteParams>();

  const { detailRequeteState } = useDetailRequeteApiHook(idRequete);

  const history = useHistory();
  const [dataHistory] = useState<DataRMCAuto | undefined>(
    history.location.state as DataRMCAuto
  );

  const dataRequetes = dataHistory?.dataRequetes;
  const dataRMCAutoActe = dataHistory?.dataRMCAutoActe;
  const dataTableauRMCAutoActe = dataHistory?.dataTableauRMCAutoActe;
  const dataRMCAutoInscription = dataHistory?.dataRMCAutoInscription;
  const dataTableauRMCAutoInscription =
    dataHistory?.dataTableauRMCAutoInscription;

  //**** RMC AUTO ****//
  const [range, setRange] = useState<string>(`0-${NB_LIGNES_PAR_APPEL}`);

  const {
    dataRMCAutoRequete,
    dataTableauRMCAutoRequete
  } = useRMCAutoRequeteApiHook(idRequete, dataRequetes, range);

  const setRangeRequete = (value: string) => {
    if (value !== "") {
      setRange(value);
    }
  };

  // Gestion du clic sur une colonne de type checkbox
  const [acteSelected, setActeSelected] = useState<IResultatRMCActe[]>();
  const [inscriptionSelected, setInscriptionSelected] = useState<
    IResultatRMCInscription[]
  >();

  const onClickCheckboxActe = (
    index: number,
    isChecked: boolean,
    data: IResultatRMCActe
  ): void => {
    const tableau = !acteSelected ? [] : [...acteSelected];
    if (isChecked) {
      tableau[index] = data;
    } else {
      tableau.splice(index, 1);
    }
    setActeSelected(tableau);
  };

  const onClickCheckboxInscription = (
    index: number,
    isChecked: boolean,
    data: IResultatRMCInscription
  ): void => {
    const tableau = !inscriptionSelected ? [] : [...inscriptionSelected];
    if (isChecked) {
      tableau[index] = data;
    } else {
      tableau.splice(index, 1);
    }
    setInscriptionSelected(tableau);
  };

  return (
    <>
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      {detailRequeteState && (
        <>
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={detailRequeteState}></ResumeRequeteV2>
              <SuiviActionsRequete actions={detailRequeteState?.actions} />
              <SuiviObservationsRequete
                observations={detailRequeteState?.observations}
              />
              {dataRMCAutoRequete && dataTableauRMCAutoRequete && (
                <RMCRequetesAssocieesResultats
                  dataRMCAutoRequete={dataRMCAutoRequete}
                  dataTableauRMCAutoRequete={dataTableauRMCAutoRequete}
                  setRangeRequete={setRangeRequete}
                />
              )}
            </div>
            <div className="side right">
              {dataRMCAutoActe &&
                dataTableauRMCAutoActe &&
                dataRMCAutoInscription &&
                dataTableauRMCAutoInscription && (
                  <RMCAutoResultats
                    dataRequete={detailRequeteState}
                    dataRMCAutoActe={dataRMCAutoActe}
                    dataTableauRMCAutoActe={dataTableauRMCAutoActe}
                    dataRMCAutoInscription={dataRMCAutoInscription}
                    dataTableauRMCAutoInscription={
                      dataTableauRMCAutoInscription
                    }
                    onClickCheckboxTableauActes={onClickCheckboxActe}
                    onClickCheckboxTableauInscriptions={
                      onClickCheckboxInscription
                    }
                  />
                )}
              <ChoixAction
                requete={detailRequeteState}
                acteSelected={acteSelected}
                inscriptionSelected={inscriptionSelected}
              />
              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
