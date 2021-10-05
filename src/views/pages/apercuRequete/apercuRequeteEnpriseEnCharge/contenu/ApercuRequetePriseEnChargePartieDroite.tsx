import React, { useCallback, useEffect, useState } from "react";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../model/agent/IOfficier";
import { IAlerte } from "../../../../../model/etatcivil/fiche/IAlerte";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IRMCActeInscription } from "../../../../../model/rmc/acteInscription/rechercheForm/IRMCActeInscription";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "../../../../common/hook/v2/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "../../../../common/hook/v2/alertes/DeleteAlerteActeHookApi";
import {
  GetAlertesActeApiHookParameters,
  useGetAlertesActeApiHook
} from "../../../../common/hook/v2/alertes/GetAlertesActeApiHook";
import { IParamsTableau } from "../../../../common/util/GestionDesLiensApi";
import { aplatirTableau } from "../../../../common/util/Utils";
import { IAjouterAlerteFormValue } from "../../../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { getLibelle } from "../../../../common/widget/Text";
import { useRMCActeApiHook } from "../../../rechercheMultiCriteres/acteInscription/hook/RMCActeApiHook";
import {
  ICriteresRecherche,
  useRMCInscriptionApiHook
} from "../../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { RMCAutoResultats } from "../../../rechercheMultiCriteres/autoActesInscriptions/RMCAutoResultats";
import { ChoixAction } from "./actions/ChoixAction";
import { AlertesActes } from "./alertesActes/AlertesActes";
import { BoutonNouvelleRMCActeInscription } from "./rechercheMultiCriteres/BoutonNouvelleRMCActeInscription";

interface ApercuRequetePriseEnChargePartieDroiteProps {
  detailRequete: TRequete;
  dataRMCAutoActe: IResultatRMCActe[];
  dataTableauRMCAutoActe: IParamsTableau;
  dataRMCAutoInscription: IResultatRMCInscription[];
  dataTableauRMCAutoInscription: IParamsTableau;
}

export const ApercuRequetePriseEnChargePartieDroite: React.FC<ApercuRequetePriseEnChargePartieDroiteProps> = props => {
  /* Etats RMC Auto */
  const [dataRMCAutoActe, setDataRMCAutoActe] = useState<
    IResultatRMCActe[] | undefined
  >(props.dataRMCAutoActe);

  const [dataTableauRMCAutoActe, setDataTableauRMCAutoActe] = useState<
    IParamsTableau | undefined
  >(props.dataTableauRMCAutoActe);

  const [dataRMCAutoInscription, setDataRMCAutoInscription] = useState<
    IResultatRMCInscription[] | undefined
  >(props.dataRMCAutoInscription);

  const [
    dataTableauRMCAutoInscription,
    setDataTableauRMCAutoInscription
  ] = useState<IParamsTableau | undefined>(props.dataTableauRMCAutoInscription);

  /* Etats RMC manuelle */
  const [
    nouvelleRMCActeInscription,
    setNouvelleRMCActeInscription
  ] = useState<boolean>(false);

  const [
    valuesRMCActeInscription,
    setValuesRMCActeInscription
  ] = useState<IRMCActeInscription>({});

  const [
    criteresRechercheActe,
    setCriteresRechercheActe
  ] = useState<ICriteresRecherche>();

  const [
    criteresRechercheInscription,
    setCriteresRechercheInscription
  ] = useState<ICriteresRecherche>();

  /* Etat actes sélectionnés */
  const [actes, setActes] = useState<Map<number, IResultatRMCActe>>(
    new Map([])
  );

  /* Etat inscriptions sélectionnées */
  const [inscriptions, setInscriptions] = useState<
    Map<number, IResultatRMCInscription>
  >(new Map([]));

  /* Etat ajout des alertes possible */
  const [ajoutAlertePossible, setAjoutAlertePossible] = useState<boolean>(
    false
  );

  /* Etat alertes associées aux actes sélectionnés */
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  /* Etat paramètres d'appel de l'API de récupération des alertes */
  const [
    alertesActeApiHookParameters,
    setAlertesActeApiHookParameters
  ] = useState<GetAlertesActeApiHookParameters>();

  /* Etat paramètres d'appel de l'API d'ajout d'une alerte */
  const [
    ajouterAlerteActeApiHookParameters,
    setAjouterAlerteActeApiHookParameters
  ] = useState<AddAlerteActeApiHookParameters>();

  /*  Etat paramètres d'appel de l'API de suppression d'une alerte */
  const [
    deleteAlerteActeApiHookParameters,
    setDeleteAlerteActeApiHookParameters
  ] = useState<DeleteAlerteActeApiHookParameters>();

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des actes */
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

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des inscriptions */
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

  /* Hooks RMC manuelle */
  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    criteresRechercheActe
  );

  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  /* Actualisation des résultats de la RMC manuelle */
  useEffect(() => {
    setActes(new Map([]));
    setInscriptions(new Map([]));
  }, [nouvelleRMCActeInscription]);

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

  /* Gestion de la pagination pour la RMC */
  const setRangeInscription = (rangeInscription: string) => {
    if (valuesRMCActeInscription && rangeInscription !== "") {
      setCriteresRechercheInscription({
        valeurs: valuesRMCActeInscription,
        range: rangeInscription
      });
    }
  };

  const setRangeActe = (rangeActe: string) => {
    if (valuesRMCActeInscription && rangeActe !== "") {
      setCriteresRechercheActe({
        valeurs: valuesRMCActeInscription,
        range: rangeActe
      });
    }
  };

  /* Hook d'appel de l'API de récupération des alertes associées à un acte */
  const resultatGetAlertesActe = useGetAlertesActeApiHook(
    alertesActeApiHookParameters
  );

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

  /* Gestion de l'affichage des boutons d'ajout des alertes */
  useEffect(() => {
    if (props.detailRequete) {
      setAjoutAlertePossible(
        provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
          (props.detailRequete as IRequeteDelivrance)?.provenanceRequete
            ?.provenance?.libelle
        )
      );
    }
  }, [props.detailRequete]);

  /* Ajout d'une alerte */
  const ajouterAlerteCallBack = useCallback(
    (idActe: string, value: IAjouterAlerteFormValue) => {
      setAjouterAlerteActeApiHookParameters({
        idActe,
        idTypeAlerte: value?.idTypeAlerte,
        complementDescription: value?.complementDescription,
        provenanceRequete: (props.detailRequete as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
      });
    },
    [props.detailRequete]
  );

  const resultatAjoutAlerte = useAddAlerteActeApiHook(
    ajouterAlerteActeApiHookParameters
  );
  useEffect(() => {
    if (resultatAjoutAlerte) {
      /* màj des alertes*/
      const newAlertes = new Map(alertes);
      const idActe = resultatAjoutAlerte.idActe || "";
      newAlertes?.get(idActe)?.unshift(resultatAjoutAlerte);
      setAlertes(newAlertes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatAjoutAlerte]);

  /* Suppression d'une alerte */
  const supprimerAlerteCallBack = useCallback(
    (idAlerteActe: string, idActe: string) => {
      setDeleteAlerteActeApiHookParameters({
        idAlerteActe,
        idActe,
        provenanceRequete: (props.detailRequete as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
      });
    },
    [props.detailRequete]
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
    <div className="side right">
      {dataRMCAutoActe &&
        dataTableauRMCAutoActe &&
        dataRMCAutoInscription &&
        dataTableauRMCAutoInscription && (
          <RMCAutoResultats
            dataAlertes={aplatirTableau(Array.from(alertes.values()))}
            ajoutAlertePossible={ajoutAlertePossible}
            dataRequete={props.detailRequete}
            dataRMCAutoActe={dataRMCAutoActe}
            dataTableauRMCAutoActe={dataTableauRMCAutoActe}
            dataRMCAutoInscription={dataRMCAutoInscription}
            dataTableauRMCAutoInscription={dataTableauRMCAutoInscription}
            onClickCheckboxTableauActes={onClickCheckboxActe}
            onClickCheckboxTableauInscriptions={onClickCheckboxInscription}
            resetRMC={nouvelleRMCActeInscription}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
          />
        )}
      <BoutonNouvelleRMCActeInscription
        setValuesRMCActeInscription={setValuesRMCActeInscription}
        setNouvelleRMCActeInscription={setNouvelleRMCActeInscription}
        setCriteresRechercheActe={setCriteresRechercheActe}
        setCriteresRechercheInscription={setCriteresRechercheInscription}
      />
      <AlertesActes
        alertes={alertes}
        ajoutAlertePossible={ajoutAlertePossible}
        ajouterAlerteCallBack={ajouterAlerteCallBack}
        supprimerAlerteCallBack={supprimerAlerteCallBack}
      />
      <ChoixAction
        requete={props.detailRequete}
        actes={Array.from(actes.values())}
        inscriptions={Array.from(inscriptions.values())}
      />
      <BoutonRetour message={getLibelle("<< Retour")} />
    </div>
  );
};
