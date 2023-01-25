import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { IRMCRequete } from "@model/rmc/requete/IRMCRequete";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { AutoScroll } from "@widget/autoScroll/autoScroll";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRMCRequeteApiHook } from "./hook/RMCRequeteApiHook";
import { RMCRequeteResultats } from "./resultats/RMCRequeteResultats";
import { RMCRequeteForm } from "./RMCRequeteForm";
import "./scss/RMCRequetePage.scss";

export const RMCRequetePage: React.FC = () => {
  const [nouvelleRMCRequete, setNouvelleRMCRequete] = useState<boolean>(false);
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequete>({});
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [criteresRechercheRequete, setCriteresRechercheRequete] =
    useState<ICriteresRMCRequete>();

  const { dataRMCRequete, dataTableauRMCRequete } = useRMCRequeteApiHook(
    criteresRechercheRequete
  );

  const setRangeRequete = (rangeRequete: string) => {
    if (valuesRMCRequete && rangeRequete !== "") {
      setCriteresRechercheRequete({
        valeurs: valuesRMCRequete,
        range: rangeRequete,
        onErreur: () => setOpEnCours(false)
      });
    }
  };

  const lancerRercherche = useCallback((criteres: ICriteresRMCRequete) => {
    setOpEnCours(true);
    setCriteresRechercheRequete({
      ...criteres,
      onErreur: () => setOpEnCours(false)
    });
  }, []);

  useEffect(() => {
    if (dataRMCRequete) {
      setOpEnCours(false);
    }
  }, [dataRMCRequete]);

  const RMCRequeteRef = useRef();

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={() => setOpEnCours(false)}
      ></OperationEnCours>
      <RMCRequeteForm
        setNouvelleRMCRequete={setNouvelleRMCRequete}
        setValuesRMCRequete={setValuesRMCRequete}
        setCriteresRechercheRequete={lancerRercherche}
      />
      <AutoScroll autoScroll={nouvelleRMCRequete} baliseRef={RMCRequeteRef} />
      {dataRMCRequete && dataTableauRMCRequete && (
        <RMCRequeteResultats
          dataRMCRequete={dataRMCRequete}
          dataTableauRMCRequete={dataTableauRMCRequete}
          setRangeRequete={setRangeRequete}
          resetRMC={nouvelleRMCRequete}
        />
      )}
    </>
  );
};
