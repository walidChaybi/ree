import { CONFIG_POST_RMC_REQUETE } from "@api/configurations/requete/rmc/PostRMCRequeteConfigApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { ICriteresRMCRequete } from "@model/rmc/requete/ICriteresRMCRequete";
import { mappingCriteresRMCRequeteVersDto } from "@model/rmc/requete/ICriteresRMCRequeteDto";
import { IRMCRequeteForm } from "@model/rmc/requete/IRMCRequete";
import { RequeteTableauRMC, TRequeteTableauRMC } from "@model/rmc/requete/RequeteTableauRMC";
import { IParamsTableau, getParamsTableauDepuisHeaders } from "@util/GestionDesLiensApi";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { AutoScroll } from "@widget/autoScroll/autoScroll";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import useFetchApi from "../../../../hooks/api/FetchApiHook";
import AfficherMessage from "../../../../utils/AfficherMessage";
import { RMCRequeteForm } from "./RMCRequeteForm";
import { RMCRequeteResultats } from "./resultats/RMCRequeteResultats";
import "./scss/RMCRequetePage.scss";

export const RMCRequetePage: React.FC = () => {
  const [valuesRMCRequete, setValuesRMCRequete] = useState<IRMCRequeteForm<keyof typeof ETypeRequete | ""> | null>(null);
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [criteresRMCRequete, setCriteresRMCRequete] = useState<ICriteresRMCRequete>();

  const [dataRMCRequete, setDataRMCRequete] = useState<TRequeteTableauRMC[]>();
  const [dataTableauRMCRequete, setDataTableauRMCRequete] = useState<IParamsTableau>();
  const { utilisateurs, services } = useContext(RECEContextData);
  const { appelApi: rechercheRequetes } = useFetchApi(CONFIG_POST_RMC_REQUETE);

  useEffect(() => {
    if (!criteresRMCRequete?.valeurs) return;

    rechercheRequetes({
      parametres: { query: { range: criteresRMCRequete.range }, body: mappingCriteresRMCRequeteVersDto(criteresRMCRequete.valeurs) },
      apresSucces: (requetes, headers) => {
        setDataRMCRequete(
          requetes
            ?.map(requete => RequeteTableauRMC.depuisDto(requete, utilisateurs, services))
            .filter((requete): requete is TRequeteTableauRMC => requete !== null)
        );
        setDataTableauRMCRequete(getParamsTableauDepuisHeaders(headers));
      },
      apresErreur: erreurs => {
        console.error("Erreur lors de la RMC requête auto :", erreurs);
        AfficherMessage.erreur("Impossible de récupérer les requetes de la recherche multi-critères", { erreurs });
        criteresRMCRequete?.onErreur?.();
      }
    });
  }, [criteresRMCRequete]);

  const setRangeRequete = (rangeRequete: string) => {
    if (valuesRMCRequete && rangeRequete !== "") {
      setCriteresRMCRequete({
        valeurs: valuesRMCRequete,
        range: rangeRequete,
        onErreur: () => setOpEnCours(false)
      });
    }
  };

  const lancerRercherche = useCallback((criteres: ICriteresRMCRequete) => {
    setOpEnCours(true);
    setCriteresRMCRequete({
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
        setValuesRMCRequete={setValuesRMCRequete}
        setCriteresRechercheRequete={lancerRercherche}
      />
      <AutoScroll
        autoScroll={Boolean(dataRMCRequete)}
        baliseRef={RMCRequeteRef}
      />

      {dataRMCRequete &&
        dataTableauRMCRequete &&
        (opEnCours ? (
          <PageChargeur />
        ) : (
          <RMCRequeteResultats
            dataRMCRequete={dataRMCRequete}
            dataTableauRMCRequete={dataTableauRMCRequete}
            setRangeRequete={setRangeRequete}
          />
        ))}
    </>
  );
};
