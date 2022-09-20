import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { IGetAlertesActeApiHookParameters } from "@hook/alertes/GetAlertesActeApiHook";
import {
  GetNbrTitulairesActeHookParameters,
  useGetNbrTitulairesActeApiHook
} from "@hook/repertoires/NbrTitulairesActeHook";
import {
  GetTitulairesActeHookParameters,
  useGetTitulairesActeApiHook
} from "@hook/repertoires/TitulairesActeHook";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { IAlerte } from "@model/etatcivil/fiche/IAlerte";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { aplatirTableau } from "@util/Utils";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import React, { useCallback, useEffect, useState } from "react";
import { RMCAuto } from "../../../../rechercheMultiCriteres/autoActesInscriptions/RMCAuto";
import { DataRMCAuto } from "../ApercuRequetePriseEnChargePage";
import { ChoixAction } from "./actions/ChoixAction";

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
  const [addActe, setAddActe] = useState<IGetAlertesActeApiHookParameters>();

  /* Etat paramètres d'appel de l'API de récupération des titulaires d'un acte */
  const [titulairesActeHookParameters, setTitulairesActeHookParameters] =
    useState<GetTitulairesActeHookParameters>();

  /* Etat paramètres d'appel de l'API de récupération du nombre de titulaires d'un acte */
  const [nbrTitulairesActeHookParameters, setNbrTitulairesActeHookParameters] =
    useState<GetNbrTitulairesActeHookParameters>();

  /* Titulaires associés aux actes sélectionnés */
  const [titulairesActe, setTitulairesActe] = useState<
    Map<string, ITitulaireActe[]>
  >(new Map([]));

  /* Nombre de titulaires associés aux actes sélectionnés */
  const [nbrTitulairesActe, setNbrTitulairesActe] = useState<
    Map<string, number>
  >(new Map([]));

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
      setTitulairesActeHookParameters({ idActe: data?.idActe, isChecked });
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

  /* Hook d'appel de l'API de récupération des titulaires associés à un acte */
  const resultatGetTitulairesActe = useGetTitulairesActeApiHook(
    titulairesActeHookParameters
  );

  /* Hook d'appel de l'API de récupération du nombre de titulaires associés à un acte */
  const resultatGetNbrTitulairesActe = useGetNbrTitulairesActeApiHook(
    nbrTitulairesActeHookParameters
  );

  /* Actualisation de la liste des nombres de titulaires et des titulaires des actes sélectionnés */
  useEffect(() => {
    if (nbrTitulairesActeHookParameters && titulairesActeHookParameters) {
      const newNbrTitulairesActe = new Map(nbrTitulairesActe);
      const newTitulairesActe = new Map(titulairesActe);
      if (
        nbrTitulairesActeHookParameters.isChecked &&
        resultatGetNbrTitulairesActe &&
        resultatGetTitulairesActe
      ) {
        newNbrTitulairesActe.set(
          nbrTitulairesActeHookParameters.idActe,
          resultatGetNbrTitulairesActe
        );
        newTitulairesActe.set(
          titulairesActeHookParameters.idActe,
          resultatGetTitulairesActe
        );
      } else {
        newNbrTitulairesActe.delete(nbrTitulairesActeHookParameters.idActe);
        newTitulairesActe.delete(titulairesActeHookParameters.idActe);
      }
      setNbrTitulairesActe(newNbrTitulairesActe);
      setTitulairesActe(newTitulairesActe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nbrTitulairesActeHookParameters,
    resultatGetNbrTitulairesActe,
    titulairesActeHookParameters,
    resultatGetTitulairesActe
  ]);

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
        onClickCheckboxTableauActes={onClickCheckboxActe}
        onClickCheckboxTableauInscriptions={onClickCheckboxInscription}
        reset={resetActeInscription}
      />
      <AlertesActes
        detailRequete={detailRequete}
        addActe={addActe}
        ajoutAlerte={setAlertes}
      />
      <ChoixAction
        requete={detailRequete}
        actes={Array.from(actes.values())}
        inscriptions={Array.from(inscriptions.values())}
        titulairesActe={titulairesActe}
        nbrTitulairesActe={nbrTitulairesActe}
      />
      <BoutonRetour />
    </>
  );
};
