import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IAlerte } from "../../../../model/etatcivil/fiche/IAlerte";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../model/IOfficierSSOApi";
import { IRequeteDelivrance } from "../../../../model/requete/v2/IRequeteDelivrance";
import { IRequeteTableau } from "../../../../model/requete/v2/IRequeteTableau";
import { IRMCActeInscription } from "../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "../../../common/hook/v2/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "../../../common/hook/v2/alertes/DeleteAlerteActeHookApi";
import {
  GetAlertesActeApiHookParameters,
  useGetAlertesActeApiHook
} from "../../../common/hook/v2/alertes/GetAlertesActeApiHook";
import { IParamsTableau } from "../../../common/util/GestionDesLiensApi";
import { ProtectionApercu } from "../../../common/util/route/Protection/ProtectionApercu";
import { aplatirTableau, getValeurOuVide } from "../../../common/util/Utils";
import { IAjouterAlerteFormValue } from "../../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
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
import { mappingRequeteDelivranceToRMC } from "../../rechercheMultiCriteres/common/mapping/RMCMappingUtil";
import { BandeauRequete } from "../contenu/BandeauRequete";
import {
  DocumentsReponses,
  InfoDocumentAffiche
} from "../contenu/document/DocumentsReponses";
import { FenetreDocumentReponse } from "../contenu/document/FenetreDocumentReponse";
import { SuiviActionsRequete } from "../contenu/SuiviActionsRequete";
import { SuiviObservationsRequete } from "../contenu/SuiviObservationRequete";
import { mappingRequeteDelivranceToRequeteTableau } from "../mapping/ReqDelivranceToReqTableau";
import { ResumeRequeteV2 } from "../resume/ResumeRequeteV2";
import { AlertesActes } from "./contenu/AlertesActes/AlertesActes";
import { BoutonNouvelleRMC } from "./contenu/BoutonNouvelleRMC";

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

  // Gestion RMC auto Requete
  const [dataRequetes, setDataRequete] = useState<
    IRequeteTableau[] | undefined
  >(dataHistory?.dataRequetes);
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

  useEffect(() => {
    if (dataHistory === undefined && detailRequeteState) {
      const dataRequete = mappingRequeteDelivranceToRequeteTableau(
        detailRequeteState as IRequeteDelivrance
      );
      setDataRequete([dataRequete]);
      setCriteresRechercheInscription({
        valeurs: mappingRequeteDelivranceToRMC(
          detailRequeteState as IRequeteDelivrance
        ),
        range: range
      });
      setCriteresRechercheActe({
        valeurs: mappingRequeteDelivranceToRMC(
          detailRequeteState as IRequeteDelivrance
        ),
        range: range
      });
    }
  }, [dataHistory, detailRequeteState, range]);

  const setRangeActe = (rangeActe: string) => {
    if (valuesRMC && rangeActe !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMC,
        range: rangeActe
      });
    }
  };

  const setRangeInscription = (rangeInscription: string) => {
    if (valuesRMC && rangeInscription !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMC,
        range: rangeInscription
      });
    }
  };

  // Gestion du clic sur une colonne de type checkbox
  const [inscriptions, setInscriptions] = useState<
    Map<number, IResultatRMCInscription>
  >(new Map([]));
  const [
    alertesActeApiHookParameters,
    setAlertesActeApiHookParameters
  ] = useState<GetAlertesActeApiHookParameters>();
  const [actes, setActes] = useState<Map<number, IResultatRMCActe>>(
    new Map([])
  );
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

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

  const onClickCheckboxActe = useCallback(
    (index: number, isChecked: boolean, data: IResultatRMCActe): void => {
      const newSelected = new Map(actes);
      if (isChecked) {
        newSelected.set(index, data);
      } else {
        newSelected.delete(index);
      }
      setActes(newSelected);
      setAlertesActeApiHookParameters({ idActe: data?.idActe, isChecked });
    },
    [actes]
  );

  const resultatGetAlertesActe = useGetAlertesActeApiHook(
    alertesActeApiHookParameters
  );

  useEffect(() => {
    setActes(new Map([]));
    setInscriptions(new Map([]));
  }, [nouvelleRecherche]);

  /* Actualisation de la liste des alertes des actes sélectionnés */
  useEffect(() => {
    if (alertesActeApiHookParameters) {
      const newAlertes = new Map(alertes);
      if (alertesActeApiHookParameters.isChecked && resultatGetAlertesActe) {
        newAlertes.set(
          alertesActeApiHookParameters.idActe,
          resultatGetAlertesActe
        );
      } else {
        newAlertes.delete(alertesActeApiHookParameters.idActe);
      }
      setAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertesActeApiHookParameters, resultatGetAlertesActe]);

  // Gestion des documents délivrés
  const [documentReponse, setDocumentReponse] = useState<InfoDocumentAffiche>({
    id: "",
    nom: ""
  });

  const [isFenetreOuverte, setIsFenetreOuverte] = useState<boolean>(false);

  function toggleFenetre() {
    setIsFenetreOuverte(!isFenetreOuverte);
  }

  function openFenetre(infoDoc: InfoDocumentAffiche) {
    setDocumentReponse(infoDoc);
    toggleFenetre();
  }

  // Gestion affichage des boutons d'ajout des alertes
  const [ajoutAlertePossible, setAjoutAlertePossible] = useState<boolean>(
    false
  );
  useEffect(() => {
    if (detailRequeteState) {
      setAjoutAlertePossible(
        provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
          (detailRequeteState as IRequeteDelivrance)?.provenanceRequete
            ?.provenance?.libelle
        )
      );
    }
  }, [detailRequeteState]);

  /* Ajout d'une alerte */
  const [
    ajouterAlerteActeApiHookParameters,
    setAjouterAlerteActeApiHookParameters
  ] = useState<AddAlerteActeApiHookParameters>();

  const ajouterAlerteCallBack = useCallback(
    (idActe: string, value: IAjouterAlerteFormValue) => {
      setAjouterAlerteActeApiHookParameters({
        idActe,
        idTypeAlerte: value?.idTypeAlerte,
        complementDescription: value?.complementDescription,
        provenanceRequete: (detailRequeteState as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequeteState]
  );

  const alerte = useAddAlerteActeApiHook(ajouterAlerteActeApiHookParameters);
  useEffect(() => {
    if (alerte) {
      /* màj des alertes*/
      const newAlertes = new Map(alertes);
      const idActe = alerte.idActe || "";
      newAlertes?.get(idActe)?.unshift(alerte);
      setAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerte]);

  /* Suppression d'une alerte */
  const [
    deleteAlerteActeApiHookParameters,
    setDeleteAlerteActeApiHookParameters
  ] = useState<DeleteAlerteActeApiHookParameters>();

  const supprimerAlerteCallBack = useCallback(
    (idAlerteActe: string, idActe: string) => {
      setDeleteAlerteActeApiHookParameters({
        idAlerteActe,
        idActe,
        provenanceRequete: (detailRequeteState as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequeteState]
  );

  const resultatSuppressionAlerte = useDeleteAlerteActeApiHook(
    deleteAlerteActeApiHookParameters
  );
  useEffect(() => {
    if (resultatSuppressionAlerte) {
      /* màj des alertes*/
      const newAlertes = new Map(alertes);

      const idAlerteActe =
        deleteAlerteActeApiHookParameters?.idAlerteActe || "";
      const idActe = deleteAlerteActeApiHookParameters?.idActe || "";

      const nouvellesAlertesDeLActe =
        newAlertes?.get(idActe)?.filter(a => a.id !== idAlerteActe) || [];

      newAlertes.set(idActe, nouvellesAlertesDeLActe);

      setAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatSuppressionAlerte]);

  return (
    <div className="ApercuRequetePriseEnCharge">
      <title>{getLibelle("Aperçu de la requête en prise en charge")}</title>
      {detailRequeteState && (
        <ProtectionApercu statut={detailRequeteState?.statutCourant.statut}>
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
                    ajoutAlertePossible={ajoutAlertePossible}
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
              <AlertesActes
                alertes={alertes}
                ajoutAlertePossible={ajoutAlertePossible}
                ajouterAlerteCallBack={ajouterAlerteCallBack}
                supprimerAlerteCallBack={supprimerAlerteCallBack}
              />
              <ChoixAction
                requete={detailRequeteState}
                actes={Array.from(actes.values())}
                inscriptions={Array.from(inscriptions.values())}
              />
              <BoutonRetour message={getLibelle("<< Retour")} />
            </div>
          </div>
        </ProtectionApercu>
      )}
    </div>
  );
};
