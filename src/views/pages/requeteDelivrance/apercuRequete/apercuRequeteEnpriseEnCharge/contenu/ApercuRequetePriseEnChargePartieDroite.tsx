import React, { useCallback, useEffect, useState } from "react";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../../model/agent/IOfficier";
import { IAlerte } from "../../../../../../model/etatcivil/fiche/IAlerte";
import { IRequeteDelivrance } from "../../../../../../model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { AlertesActes } from "../../../../../common/composant/alertesActe/AlertesActes";
import { GetAlertesActeApiHookParameters } from "../../../../../common/hook/alertes/GetAlertesActeApiHook";
import {
  GetNbrTitulairesActeHookParameters,
  useGetNbrTitulairesActeApiHook
} from "../../../../../common/hook/repertoires/NbrTitulairesActeHook";
import { aplatirTableau } from "../../../../../common/util/Utils";
import { BoutonRetour } from "../../../../../common/widget/navigation/BoutonRetour";
import { RMCAuto } from "../../../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { DataRMCAuto } from "../ApercuRequetePriseEnChargePage";
import { ChoixAction } from "./actions/ChoixAction";

interface RMCAutoParams {
  requete: IRequeteDelivrance;
  range: string;
}

interface ApercuRequetePriseEnChargePartieDroiteProps {
  detailRequete: IRequeteDelivrance;
  dataHistory?: DataRMCAuto;
}

export const ApercuRequetePriseEnChargePartieDroite: React.FC<
  ApercuRequetePriseEnChargePartieDroiteProps
> = ({ detailRequete, dataHistory }) => {
  /* Etat actes sélectionnés */
  const [actes, setActes] = useState<Map<number, IResultatRMCActe>>(
    new Map([])
  );

  /* Etat alertes associées aux aajoutAlertePossiblectes sélectionnés */
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  /* Etat inscriptions sélectionnées */
  const [inscriptions, setInscriptions] = useState<
    Map<number, IResultatRMCInscription>
  >(new Map([]));

  /* Etat inscriptions sélectionnées */
  const [addActe, setAddActe] = useState<GetAlertesActeApiHookParameters>();

  /* Etat paramètres d'appel de l'API de récupération du nombre de titulaires d'un acte */
  const [nbrTitulairesActeHookParameters, setNbrTitulairesActeHookParameters] =
    useState<GetNbrTitulairesActeHookParameters>();

  /* Nombre de titulaires associés aux actes sélectionnés */
  const [nbrTitulairesActe, setNbrTitulairesActe] = useState<
    Map<string, number>
  >(new Map([]));

  /* Etat ajout des alertes possible */
  const [ajoutAlertePossible, setAjoutAlertePossible] =
    useState<boolean>(false);

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

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des actes */
  const onClickCheckboxActe = useCallback(
    (index: number, isChecked: boolean, data: IResultatRMCActe): void => {
      const newSelected = new Map(actes);
      if (isChecked) {
        newSelected.set(index, data);
        setAddActe({ idActe: data.idActe, isChecked: true });
      } else {
        setAddActe({ idActe: data.idActe, isChecked: false });
        newSelected.delete(index);
      }
      setActes(newSelected);
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

  /* Remise à zéro des résultats de la RMC */
  const resetActeInscription = useCallback(() => {
    setActes(new Map([]));
    setInscriptions(new Map([]));
  }, []);

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
        detailRequete={detailRequete}
        addActe={addActe}
        ajoutAlerte={setAlertes}
        ajoutAlertePossible={ajoutAlertePossible}
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
