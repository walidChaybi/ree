import React, { useRef, useState } from "react";
import { IRMCActeInscription } from "../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { AutoScroll } from "../../../common/widget/autoScroll/autoScroll";
import { useRMCActeApiHook } from "./hook/RMCActeApiHook";
import {
  ICriteresRecherche,
  useRMCInscriptionApiHook
} from "./hook/RMCInscriptionApiHook";
import { RMCActeInscriptionResultats } from "./resultats/RMCActeInscriptionResultats";
import { RMCActeInscriptionForm } from "./RMCActeInscriptionForm";
import "./scss/RMCActeInscriptionPage.scss";

export const RMCActeInscriptionPage: React.FC = () => {
  const [valuesRMC, setValuesRMC] = useState<IRMCActeInscription>({});

  const [nouvelleRecherche, setNouvelleRecherche] = useState<boolean>(false);

  const [
    criteresRechercheActe,
    setCriteresRechercheActe
  ] = useState<ICriteresRecherche>();

  const [
    criteresRechercheInscription,
    setCriteresRechercheInscription
  ] = useState<ICriteresRecherche>();

  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    criteresRechercheActe
  );

  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  const setRangeActe = (range: string) => {
    if (valuesRMC && range !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const setRangeInscription = (range: string) => {
    if (valuesRMC && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMC,
        range
      });
    }
  };

  const RMCActeInscriptionRef = useRef();

  return (
    <>
      <RMCActeInscriptionForm
        setValuesRMC={setValuesRMC}
        setNouvelleRecherche={setNouvelleRecherche}
        setCriteresRechercheActe={setCriteresRechercheActe}
        setCriteresRechercheInscription={setCriteresRechercheInscription}
      />
      <AutoScroll
        autoScroll={nouvelleRecherche}
        baliseRef={RMCActeInscriptionRef}
      />
      {dataRMCActe &&
        dataTableauRMCActe &&
        dataRMCInscription &&
        dataTableauRMCInscription && (
          <RMCActeInscriptionResultats
            typeRMC="Classique"
            dataRMCActe={dataRMCActe}
            dataTableauRMCActe={dataTableauRMCActe}
            dataRMCInscription={dataRMCInscription}
            dataTableauRMCInscription={dataTableauRMCInscription}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
            resetRMC={nouvelleRecherche}
          />
        )}
    </>
  );
};
