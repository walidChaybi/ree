import React, { useCallback, useEffect, useState } from "react";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../../model/agent/IOfficier";
import { IAlerte } from "../../../../../../model/etatcivil/fiche/IAlerte";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  AddAlerteActeApiHookParameters,
  useAddAlerteActeApiHook
} from "../../../../../common/hook/alertes/AddAlerteActeHookApi";
import {
  DeleteAlerteActeApiHookParameters,
  useDeleteAlerteActeApiHook
} from "../../../../../common/hook/alertes/DeleteAlerteActeHookApi";
import {
  GetAlertesActeApiHookParameters,
  useGetAlertesActeApiHook
} from "../../../../../common/hook/alertes/GetAlertesActeApiHook";
import {
  GetNbrTitulairesActeHookParameters,
  useGetNbrTitulairesActeApiHook
} from "../../../../../common/hook/repertoires/NbrTitulairesActeHook";
import { aplatirTableau } from "../../../../../common/util/Utils";
import { IAjouterAlerteFormValue } from "../../../../../common/widget/alertes/ajouterAlerte/contenu/PopinAjouterAlertes";
import { BoutonRetour } from "../../../../../common/widget/navigation/BoutonRetour";
import { RMCAuto } from "../../../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { DataRMCAuto } from "../ApercuRequetePriseEnChargePage";
import { ChoixAction } from "./actions/ChoixAction";
import { AlertesActes } from "./alertesActes/AlertesActes";

interface RMCAutoParams {
  requete: IRequeteDelivrance;
  range: string;
}

interface ApercuRequetePriseEnChargePartieDroiteProps {
  detailRequete: IRequeteDelivrance;
  dataHistory?: DataRMCAuto;
}

export const ApercuRequetePriseEnChargePartieDroite: React.FC<ApercuRequetePriseEnChargePartieDroiteProps> = ({
  detailRequete,
  dataHistory
}) => {
  /* Etat actes sélectionnés */
  const [actes, setActes] = useState<Map<number, IResultatRMCActe>>(
    new Map([])
  );

  /* Etat inscriptions sélectionnées */
  const [inscriptions, setInscriptions] = useState<
    Map<number, IResultatRMCInscription>
  >(new Map([]));

  /* Etat paramètres d'appel de l'API de récupération du nombre de titulaires d'un acte */
  const [
    nbrTitulairesActeHookParameters,
    setNbrTitulairesActeHookParameters
  ] = useState<GetNbrTitulairesActeHookParameters>();

  /* Nombre de titulaires associés aux actes sélectionnés */
  const [nbrTitulairesActe, setNbrTitulairesActe] = useState<
    Map<string, number>
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
      setNbrTitulairesActeHookParameters({ idActe: data?.idActe, isChecked });
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

  /* Remise à zéro des résultats de la RMC */
  const resetActeInscription = useCallback(() => {
    setActes(new Map([]));
    setInscriptions(new Map([]));
    setAlertes(new Map([]));
    setNbrTitulairesActe(new Map([]));
  }, []);

  /* Hook d'appel de l'API de récupération du nombre de titulaires associés à un acte */
  const resultatGetNbrTitulairesActe = useGetNbrTitulairesActeApiHook(
    nbrTitulairesActeHookParameters
  );

  /* Actualisation de la liste des nombres de titulaires des actes sélectionnés */
  useEffect(() => {
    if (nbrTitulairesActeHookParameters) {
      const newNbrTitulairesActe = new Map(nbrTitulairesActe);
      if (
        nbrTitulairesActeHookParameters.isChecked &&
        resultatGetNbrTitulairesActe
      ) {
        newNbrTitulairesActe.set(
          nbrTitulairesActeHookParameters.idActe,
          resultatGetNbrTitulairesActe
        );
      } else {
        newNbrTitulairesActe.delete(nbrTitulairesActeHookParameters.idActe);
      }
      setNbrTitulairesActe(newNbrTitulairesActe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nbrTitulairesActeHookParameters, resultatGetNbrTitulairesActe]);

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
    if (detailRequete) {
      setAjoutAlertePossible(
        provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer(
          detailRequete?.provenanceRequete?.provenance?.libelle
        )
      );
    }
  }, [detailRequete]);

  /* Ajout d'une alerte */
  const ajouterAlerteCallBack = useCallback(
    (idActe: string, value: IAjouterAlerteFormValue) => {
      setAjouterAlerteActeApiHookParameters({
        idActe,
        idTypeAlerte: value?.idTypeAlerte,
        complementDescription: value?.complementDescription,
        provenanceRequete: detailRequete?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequete]
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
        provenanceRequete: detailRequete?.provenanceRequete?.provenance?.libelle
      });
    },
    [detailRequete]
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
    <>
      <RMCAuto
        requete={detailRequete}
        dataHistory={dataHistory}
        dataAlertes={aplatirTableau(Array.from(alertes.values()))}
        ajoutAlertePossible={ajoutAlertePossible}
        onClickCheckboxTableauActes={onClickCheckboxActe}
        onClickCheckboxTableauInscriptions={onClickCheckboxInscription}
        reset={resetActeInscription}
      />
      <AlertesActes
        alertes={alertes}
        ajoutAlertePossible={ajoutAlertePossible}
        ajouterAlerteCallBack={ajouterAlerteCallBack}
        supprimerAlerteCallBack={supprimerAlerteCallBack}
      />
      <ChoixAction
        requete={detailRequete}
        actes={Array.from(actes.values())}
        inscriptions={Array.from(inscriptions.values())}
        nbrTitulairesActe={nbrTitulairesActe}
      />
      <BoutonRetour />
    </>
  );
};
