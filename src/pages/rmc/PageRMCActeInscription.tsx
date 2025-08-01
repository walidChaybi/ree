import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React, { useEffect, useRef, useState } from "react";

import { IRMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { RMCActeInscriptionResultats } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";
import { goToLinkRMC } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";
import { IParamsTableau } from "@util/GestionDesLiensApi";
import { RMCActeInscription } from "../../composants/pages/rmc/formulaire/RMCActeInscription";
import { RMCContextProvider } from "../../contexts/RMCContextProvider";
import { StockageLocal } from "../../utils/StockageLocal";
import { useRmcActeApi } from "./useRmcActeApi";
import { useRmcInscriptionApi } from "./useRmcInscriptionApi";

export const PageRMCActeInscription: React.FC = () => {
  useEffect(() => {
    const event = new CustomEvent("refreshStyles");
    if (window.top) {
      window.top.dispatchEvent(event);
    }
  }, []);

  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<IRMCActeInscriptionForm | null>(null);
  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<boolean>(false);

  const [dataRMCActe, setDataRMCActe] = useState<ResultatRMCActe[] | null>(null);
  const [dataTableauRMCActe, setDataTableauRMCActe] = useState<IParamsTableau | null>(null);
  const [dataRMCInscription, setDataRMCInscription] = useState<TResultatRMCInscription[] | null>(null);
  const [dataTableauRMCInscription, setDataTableauRMCInscription] = useState<IParamsTableau | null>(null);

  const [idFicheActe, setIdFicheActe] = useState<string>();
  const [idFicheInscription, setIdFicheInscription] = useState<string>();

  const tableauResultatRef = useRef<HTMLDivElement | null>(null);

  const { appellerRmcInscriptionApi, enAttenteRMCInscription } = useRmcInscriptionApi(
    setDataRMCInscription,
    setDataTableauRMCInscription,
    setIdFicheInscription
  );

  const { appellerRmcActeApi, enAttenteRMCActe } = useRmcActeApi(setDataRMCActe, setDataTableauRMCActe, setIdFicheActe);

  const rechercherPlageSuivante = (range: string, type: "ACTE" | "INSCRIPTION", ficheIdentifiant?: string) => {
    if (!valuesRMCActeInscription) return;
    switch (type) {
      case "ACTE":
        return appellerRmcActeApi(valuesRMCActeInscription, range, ficheIdentifiant);
      case "INSCRIPTION":
        return appellerRmcInscriptionApi(valuesRMCActeInscription, range, ficheIdentifiant);
    }
  };

  const getLignesSuivantesOuPrecedentes = (ficheIdentifiant: string, lien: string, type: "ACTE" | "INSCRIPTION") => {
    const range = goToLinkRMC(lien);
    if (!valuesRMCActeInscription || !range) return;
    rechercherPlageSuivante(range, type, ficheIdentifiant);
  };

  useEffect(() => {
    if (dataRMCActe && dataTableauRMCActe && dataRMCInscription && dataTableauRMCInscription)
      tableauResultatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [dataRMCActe, dataTableauRMCActe, dataRMCInscription, dataTableauRMCInscription]);

  const onSubmitRMCActeInscription = async (valeurs: IRMCActeInscriptionForm) => {
    StockageLocal.stocker("CRITERES_RMC_ACTE_INSCRIPTION", valeurs);
    appellerRmcActeApi(valeurs, `0-${NB_LIGNES_PAR_APPEL_ACTE}`);
    appellerRmcInscriptionApi(valeurs, `0-${NB_LIGNES_PAR_APPEL_INSCRIPTION}`);

    setNouvelleRMCActeInscription(true);
    setValuesRMCActeInscription(valeurs);
    setNouvelleRMCActeInscription(false);
  };

  return (
    <>
      <RMCContextProvider>
        <RMCActeInscription onSubmit={onSubmitRMCActeInscription} />
      </RMCContextProvider>

      {dataRMCActe && dataTableauRMCActe && dataRMCInscription && dataTableauRMCInscription && (
        <RMCActeInscriptionResultats
          ref={tableauResultatRef}
          typeRMC="Classique"
          dataRMCActe={dataRMCActe}
          dataTableauRMCActe={dataTableauRMCActe}
          dataRMCInscription={dataRMCInscription}
          dataTableauRMCInscription={dataTableauRMCInscription}
          setRangeInscription={range => rechercherPlageSuivante(range, "INSCRIPTION")}
          setRangeActe={range => rechercherPlageSuivante(range, "ACTE")}
          resetRMC={nouvelleRMCActeInscription}
          nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
          nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
          nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
          nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
          getLignesSuivantesOuPrecedentesActe={(ficheIdentifiant: string, lien: string) =>
            getLignesSuivantesOuPrecedentes(ficheIdentifiant, lien, "ACTE")
          }
          idFicheActe={idFicheActe}
          dataRMCFicheActe={dataRMCActe!}
          dataTableauRMCFicheActe={dataTableauRMCActe!}
          getLignesSuivantesOuPrecedentesInscription={(ficheIdentifiant: string, lien: string) =>
            getLignesSuivantesOuPrecedentes(ficheIdentifiant, lien, "INSCRIPTION")
          }
          idFicheInscription={idFicheInscription}
          dataRMCFicheInscription={dataRMCInscription}
          dataTableauRMCFicheInscription={dataTableauRMCInscription}
          rmcActeEnCours={enAttenteRMCActe}
          rmcInscriptionEnCours={enAttenteRMCInscription}
        />
      )}
    </>
  );
};
