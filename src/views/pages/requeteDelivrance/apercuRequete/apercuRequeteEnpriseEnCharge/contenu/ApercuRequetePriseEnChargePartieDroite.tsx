import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { useGetInscriptionsRCApiHook } from "@hook/acte/InscriptionsRcHook";
import {
  IGetAlertesActeApiHookParameters,
  useGetAlertesActeApiHook
} from "@hook/alertes/GetAlertesActeApiHook";
import {
  GetNbrTitulairesActeHookParameters,
  useGetNbrTitulairesActeApiHook
} from "@hook/repertoires/NbrTitulairesActeHook";
import {
  GetTitulairesActeHookParameters,
  useGetTitulairesActeApiHook
} from "@hook/repertoires/TitulairesActeHook";
import { ITitulaireActe } from "@model/etatcivil/acte/ITitulaireActe";
import { InscriptionRcUtil } from "@model/etatcivil/enum/TypeInscriptionRc";
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
  const [actesSelectionnes, setActesSelectionnees] = useState<
    IResultatRMCActe[]
  >([]);

  /* Etat alertes associées aux aajoutAlertePossible actes sélectionnés */
  const [alertes, setAlertes] = useState<Map<string, IAlerte[]>>(new Map([]));

  /* Etat inscriptions sélectionnées */
  const [inscriptionsSelectionnees, setInscriptionsSelectionnees] = useState<
    IResultatRMCInscription[]
  >([]);

  /* Etat inscriptions sélectionnées */
  const [addActe, setAddActe] = useState<IGetAlertesActeApiHookParameters>();
  const [idPersonne, setIdPersonne] = useState<string>("");

  /* Etat paramètres d'appel de l'API de récupération des titulaires d'un acte */
  const [titulairesActeHookParameters, setTitulairesActeHookParameters] =
    useState<GetTitulairesActeHookParameters>();

  /* Etat paramètres d'appel de l'API de récupération du nombre de titulaires d'un acte */
  const [nbrTitulairesActeHookParameters, setNbrTitulairesActeHookParameters] =
    useState<GetNbrTitulairesActeHookParameters>();

  /* Etat paramètres d'appel de l'API de récupération des alertes d'un acte */
  const [alertesActeHookParameters, setAlertesActeHookParameters] =
    useState<IGetAlertesActeApiHookParameters>();

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
    (
      event: React.ChangeEvent<HTMLInputElement>,
      data: IResultatRMCActe
    ): void => {
      let nouveauxActesSelectionnes = [...actesSelectionnes];
      const estCoche: boolean = event?.target.checked;
      if (estCoche) {
        nouveauxActesSelectionnes.push(data);
      } else {
        nouveauxActesSelectionnes = decocheElementDuTableauActe(
          actesSelectionnes,
          data.idActe
        );
      }
      setAddActe({ idActe: data.idActe, isChecked: estCoche });
      setActesSelectionnees(nouveauxActesSelectionnes);
      setNbrTitulairesActeHookParameters({
        idActe: data?.idActe,
        isChecked: estCoche
      });
      setTitulairesActeHookParameters({
        idActe: data?.idActe,
        isChecked: estCoche
      });
      setAlertesActeHookParameters({
        idActe: data?.idActe,
        isChecked: estCoche
      });
    },
    [actesSelectionnes]
  );

  /* Gestion du clic sur une colonne de type checkbox dans le tableau des inscriptions */
  const onClickCheckboxInscription = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      data: IResultatRMCInscription
    ): void => {
      let nouvellesInscriptionsSelectionnees = [...inscriptionsSelectionnees];
      if (event?.target.checked) {
        nouvellesInscriptionsSelectionnees.push(data);
      } else {
        nouvellesInscriptionsSelectionnees = decocheElementDuTableauInscription(
          inscriptionsSelectionnees,
          data.idInscription
        );
      }

      setInscriptionsSelectionnees(nouvellesInscriptionsSelectionnees);
      if (
        nouvellesInscriptionsSelectionnees.length &&
        InscriptionRcUtil.estDeTypeModificationViaLibelle(data.typeInscription)
      ) {
        setIdPersonne(nouvellesInscriptionsSelectionnees[0].idPersonne);
      }
    },
    [inscriptionsSelectionnees]
  );

  /* Hook d'appel de l'API de récupération des titulaires associés à un acte */
  const resultatGetTitulairesActe = useGetTitulairesActeApiHook(
    titulairesActeHookParameters
  );

  /* Hook d'appel de l'API de récupération du nombre de titulaires associés à un acte */
  const resultatGetNbrTitulairesActe = useGetNbrTitulairesActeApiHook(
    nbrTitulairesActeHookParameters
  );

  /* Hook d'appel de l'API de récupération des alertes associées à un acte */
  const resultatGetAlertesActe = useGetAlertesActeApiHook(
    alertesActeHookParameters
  );
  const resultatGetInscriptionsRC = useGetInscriptionsRCApiHook(idPersonne);

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
    setActesSelectionnees([]);
    setInscriptionsSelectionnees([]);
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
        actes={actesSelectionnes}
        inscriptions={inscriptionsSelectionnees}
        inscriptionsRC={resultatGetInscriptionsRC}
        titulairesActe={titulairesActe}
        nbrTitulairesActe={nbrTitulairesActe}
        alertesActe={resultatGetAlertesActe?.alertes}
      />
      <BoutonRetour />
    </>
  );
};

function decocheElementDuTableauInscription(
  inscriptions: IResultatRMCInscription[],
  id: string
): IResultatRMCInscription[] {
  return inscriptions.filter(inscription => inscription.idInscription !== id);
}

function decocheElementDuTableauActe(
  actes: IResultatRMCActe[],
  id: string
): IResultatRMCActe[] {
  return actes.filter(inscription => inscription.idActe !== id);
}

