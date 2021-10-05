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
  const [
    valuesRMCActeInscription,
    setValuesRMCActeInscription
  ] = useState<IRMCActeInscription>({});

  const [
    nouvelleRMCActeInscription,
    setNouvelleRMCActeInscription
  ] = useState<boolean>(false);

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
    if (valuesRMCActeInscription && range !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMCActeInscription,
        range
      });
    }
  };

  const setRangeInscription = (range: string) => {
    if (valuesRMCActeInscription && range !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription,
        range
      });
    }
  };

  const RMCActeInscriptionRef = useRef();

  return (
    <>
      <RMCActeInscriptionForm
        setValuesRMCActeInscription={setValuesRMCActeInscription}
        setNouvelleRMCActeInscription={setNouvelleRMCActeInscription}
        setCriteresRechercheActe={setCriteresRechercheActe}
        setCriteresRechercheInscription={setCriteresRechercheInscription}
      />
      <AutoScroll
        autoScroll={nouvelleRMCActeInscription}
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
            resetRMC={nouvelleRMCActeInscription}
          />
        )}
    </>
  );
};
