import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IRMCActeInscription } from "../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { aplatirTableau, getValeurOuVide } from "../../../common/util/Utils";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { NB_LIGNES_PAR_APPEL } from "../../../common/widget/tableau/TableUtils";
import { getLibelle } from "../../../common/widget/Text";
import { ChoixAction } from "../../apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ChoixAction";
import { useDetailRequeteApiHook } from "../../detailRequete/hook/DetailRequeteHook";
import { ICriteresRecherche } from "../../rechercheMultiCriteres/acteArchive/hook/RMCActeArchiveApiHook";
import { useRMCActeApiHook } from "../../rechercheMultiCriteres/acteInscription/hook/RMCActeApiHook";
import { useRMCInscriptionApiHook } from "../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { RMCAutoResultats } from "../../rechercheMultiCriteres/autoActesInscriptions/RMCAutoResultats";
import { useRMCAutoRequeteApiHook } from "../../rechercheMultiCriteres/autoRequetes/hook/RMCAutoRequeteApiHook";
import { RMCRequetesAssocieesResultats } from "../../rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import { BandeauRequete } from "../contenu/BandeauRequete";
import {
  DocumentsReponses,
  infoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { FenetreDocumentReponse } from "../contenu/document/FenetreDocumentReponse";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import { AlertesActes } from "./contenu/AlertesActes/AlertesActes";
import { BoutonNouvelleRMC } from "./contenu/BoutonNouvelleRMC";
import {
  AlertesActeApiHookParameters,
  useAlertesActeApiHook
} from "./contenu/hook/AlertesActeApiHook";
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

  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<
    IResultatRMCActe[] | undefined
  >(dataHistory?.dataRMCAutoActe);

  const [dataTableauRMCAutoActe, setDataTableauRMCAutoActe] = useState<
    IParamsTableau | undefined
  >(dataHistory?.dataTableauRMCAutoActe);

  const [dataRMCAutoInscription, setDataRMCAutoInscription] = useState<
    IResultatRMCInscription[] | undefined
  >(dataHistory?.dataRMCAutoInscription);

  const [
    dataTableauRMCAutoInscription,
    setDataTableauRMCAutoInscription
  ] = useState<IParamsTableau | undefined>(
    dataHistory?.dataTableauRMCAutoInscription
  );

  // const dataRMCAutoActe = dataHistory?.dataRMCAutoActe;
  // const dataTableauRMCAutoActe = dataHistory?.dataTableauRMCAutoActe;
  // const dataRMCAutoInscription = dataHistory?.dataRMCAutoInscription;
  // const dataTableauRMCAutoInscription =
  // dataHistory?.dataTableauRMCAutoInscription;

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

  useEffect(() => {
    if (dataRMCActe && dataTableauRMCActe) {
      setDataRMCAutoActe(dataRMCActe);
      setDataTableauRMCAutoActe(dataTableauRMCActe);
    }
  }, [dataRMCActe, dataTableauRMCActe]);

  useEffect(() => {
    if (dataRMCInscription && dataTableauRMCInscription) {
      setDataRMCAutoInscription(dataRMCInscription);
      setDataTableauRMCAutoInscription(dataTableauRMCInscription);
    }
  }, [dataRMCInscription, dataTableauRMCInscription]);

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

  // Gestion RMC auto Requete
  const dataRequetes = dataHistory?.dataRequetes;
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
  const [
    alertesActeApiParameters,
    setalertesActeApiParameters
  ] = useState<AlertesActeApiHookParameters>();
  const [actes, setActes] = useState<Map<number, IResultatRMCActe>>(
    new Map([])
  );
  const [inscriptions, setInscriptions] = useState<
    Map<number, IResultatRMCInscription>
  >(new Map([]));

  const alertes = useAlertesActeApiHook(alertesActeApiParameters);

  const onClickCheckboxActe = useCallback(
    (index: number, isChecked: boolean, data: IResultatRMCActe): void => {
      const newSelected = new Map(actes);
      if (isChecked) {
        newSelected.set(index, data);
      } else {
        newSelected.delete(index);
      }
      setActes(newSelected);
      setalertesActeApiParameters({
        isChecked,
        idActe: data?.idActe,
        registre: data?.registre,
        alertes
      });
    },
    [actes, alertes]
  );

  const onClickCheckboxInscription = useCallback(
    (
      index: number,
      isChecked: boolean,
      data: IResultatRMCInscription
    ): void => {
      const newSelected = new Map(inscriptions);
      if (isChecked) {
        newSelected.set(index, data);
      } else {
        newSelected.delete(index);
      }
      setInscriptions(newSelected);
    },
    [inscriptions]
  );

  // Gestion des documents délivrés
  const [documentReponse, setDocumentReponse] = useState<infoDocumentAffiche>({
    id: "",
    nom: ""
  });

  const [isFenetreOuverte, setIsFenetreOuverte] = useState<boolean>(false);

  function toggleFenetre() {
    setIsFenetreOuverte(!isFenetreOuverte);
  }

  function openFenetre(infoDoc: infoDocumentAffiche) {
    setDocumentReponse(infoDoc);
    toggleFenetre();
  }

  return (
    <div className="ApercuRequetePriseEnCharge">
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      {detailRequeteState && (
        <>
          {isFenetreOuverte === true && (
            <FenetreDocumentReponse
              toggleFenetre={toggleFenetre}
              numRequete={detailRequeteState.numero}
              idDocument={documentReponse.id}
              nom={getValeurOuVide(documentReponse.nom)}
            />
          )}
          <BandeauRequete detailRequete={detailRequeteState} />
          <div className="contenu-requete">
            <div className="side left">
              <ResumeRequeteV2 requete={detailRequeteState} />
              <SuiviActionsRequete actions={detailRequeteState?.actions} />
              <SuiviObservationsRequete
                observations={detailRequeteState?.observations}
              />
              <DocumentsReponses
                documents={
                  (detailRequeteState as IRequeteDelivrance).documentsReponses
                }
                setDocumentAffiche={openFenetre}
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
                    dataAlertes={aplatirTableau(Array.from(alertes.values()))}
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
                    resetRMC={nouvelleRecherche}
                    setRangeInscription={setRangeInscription}
                    setRangeActe={setRangeActe}
                  />
                )}
              <BoutonNouvelleRMC
                setValuesRMC={setValuesRMC}
                setNouvelleRecherche={setNouvelleRecherche}
                setCriteresRechercheActe={setCriteresRechercheActe}
                setCriteresRechercheInscription={
                  setCriteresRechercheInscription
                }
              />
              <AlertesActes alertesActes={alertes} ajouterAlerte={true} />
              <ChoixAction
                requete={detailRequeteState}
                actes={Array.from(actes.values())}
                inscriptions={Array.from(inscriptions.values())}
              />
              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
