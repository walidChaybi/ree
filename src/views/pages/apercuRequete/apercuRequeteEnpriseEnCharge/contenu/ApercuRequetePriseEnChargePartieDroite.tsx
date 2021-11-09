import React, { useCallback, useEffect, useState } from "react";
import { provenanceCOMEDECDroitDelivrerCOMEDECouNonCOMEDECDroitDelivrer } from "../../../../../model/agent/IOfficier";
import { IAlerte } from "../../../../../model/etatcivil/fiche/IAlerte";
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
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_DEFAUT
} from "../../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { getLibelle } from "../../../../common/widget/Text";
import { useRMCActeApiHook } from "../../../rechercheMultiCriteres/acteInscription/hook/RMCActeApiHook";
import { ICriteresRechercheActeInscription } from "../../../rechercheMultiCriteres/acteInscription/hook/RMCActeInscriptionUtils";
import { useRMCInscriptionApiHook } from "../../../rechercheMultiCriteres/acteInscription/hook/RMCInscriptionApiHook";
import { goToLinkRMC } from "../../../rechercheMultiCriteres/acteInscription/resultats/RMCTableauCommun";
import { useRMCAutoActeApiHook } from "../../../rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoActeApiHook";
import { useRMCAutoInscriptionApiHook } from "../../../rechercheMultiCriteres/autoActesInscriptions/hook/RMCAutoInscriptionApiHook";
import { RMCAutoResultats } from "../../../rechercheMultiCriteres/autoActesInscriptions/RMCAutoResultats";
import { DataRMCAuto } from "../ApercuRequetePriseEnChargePage";
import { ChoixAction } from "./actions/ChoixAction";
import { AlertesActes } from "./alertesActes/AlertesActes";
import { BoutonNouvelleRMCActeInscription } from "./rechercheMultiCriteres/BoutonNouvelleRMCActeInscription";

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
  /* Etats RMC Auto */
  const [rmcAutoActe, setRmcAutoActe] = useState<
    IResultatRMCActe[] | undefined
  >(dataHistory?.dataRMCAutoActe);

  const [tableauRMCAutoActe, setTableauRMCAutoActe] = useState<
    IParamsTableau | undefined
  >(dataHistory?.dataTableauRMCAutoActe);

  const [rmcAutoInscription, setRmcAutoInscription] = useState<
    IResultatRMCInscription[] | undefined
  >(dataHistory?.dataRMCAutoInscription);

  const [tableauRMCAutoInscription, setTableauRMCAutoInscription] = useState<
    IParamsTableau | undefined
  >(dataHistory?.dataTableauRMCAutoInscription);

  /* Etats RMC manuelle */
  const [nouvelleRMCActeInscription, setNouvelleRMCActeInscription] = useState<
    boolean
  >(false);

  const [valuesRMCActeInscription, setValuesRMCActeInscription] = useState<
    IRMCActeInscription
  >({});

  const [criteresRechercheActe, setCriteresRechercheActe] = useState<
    ICriteresRechercheActeInscription
  >();

  const [
    criteresRechercheInscription,
    setCriteresRechercheInscription
  ] = useState<ICriteresRechercheActeInscription>();

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

  // Critères de recherche pour alimenter les données des fiches Acte en effet leur pagination/navigation est indépendante du tableau de résultats
  const [criteresRechercheFicheActe, setCriteresRechercheFicheActe] = useState<
    ICriteresRechercheActeInscription
  >();

  // Critères de recherche pour alimenter les données des fiches Inscription en effet leur pagination/navigation est indépendante du tableau de résultats
  const [
    criteresRechercheFicheInscription,
    setCriteresRechercheFicheInscription
  ] = useState<ICriteresRechercheActeInscription>();

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

  const [paramsRMCAuto, setParamsRMCAuto] = useState<RMCAutoParams>();

  useEffect(() => {
    if (!dataHistory) {
      setParamsRMCAuto({
        requete: detailRequete,
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      });
    }
  }, [detailRequete, dataHistory]);

  /* Hooks RMC Auto */
  const { dataRMCAutoActe, dataTableauRMCAutoActe } = useRMCAutoActeApiHook(
    paramsRMCAuto?.requete,
    `0-${NB_LIGNES_PAR_APPEL_ACTE}`
  );
  const {
    dataRMCAutoInscription,
    dataTableauRMCAutoInscription
  } = useRMCAutoInscriptionApiHook(
    paramsRMCAuto?.requete,
    paramsRMCAuto?.range
  );

  /* Hooks RMC manuelle */
  const { dataRMCActe, dataTableauRMCActe } = useRMCActeApiHook(
    criteresRechercheActe
  );
  const {
    dataRMCInscription,
    dataTableauRMCInscription
  } = useRMCInscriptionApiHook(criteresRechercheInscription);

  /* Actualisation des résultats de la RMC */
  useEffect(() => {
    setActes(new Map([]));
    setInscriptions(new Map([]));
  }, [nouvelleRMCActeInscription]);

  useEffect(() => {
    if (dataRMCAutoActe && dataTableauRMCAutoActe) {
      setRmcAutoActe(dataRMCAutoActe);
      setTableauRMCAutoActe(dataTableauRMCAutoActe);
    }
  }, [dataRMCAutoActe, dataTableauRMCAutoActe]);

  useEffect(() => {
    if (dataRMCAutoInscription && dataTableauRMCAutoInscription) {
      setRmcAutoInscription(dataRMCAutoInscription);
      setTableauRMCAutoInscription(dataTableauRMCAutoInscription);
    }
  }, [dataRMCAutoInscription, dataTableauRMCAutoInscription]);

  useEffect(() => {
    if (dataRMCActe && dataTableauRMCActe) {
      setRmcAutoActe(dataRMCActe);
      setTableauRMCAutoActe(dataTableauRMCActe);
    }
  }, [dataRMCActe, dataTableauRMCActe]);

  useEffect(() => {
    if (dataRMCInscription && dataTableauRMCInscription) {
      setRmcAutoInscription(dataRMCInscription);
      setTableauRMCAutoInscription(dataTableauRMCInscription);
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

  /** Récupération des résultats rmc pour une fiche Acte lors d'une navigation */
  const resultatRMCFicheActe = useRMCActeApiHook(criteresRechercheFicheActe);

  /** Récupération des résultats rmc pour une fiche Inscription lors d'une navigation */
  const resultatRMCFicheInscription = useRMCInscriptionApiHook(
    criteresRechercheFicheInscription
  );

  const getLignesSuivantesOuPrecedentesActe = useCallback(
    (ficheIdentifiant: string, lien: string) => {
      const range = goToLinkRMC(lien);
      if (valuesRMCActeInscription && range) {
        setCriteresRechercheFicheActe({
          valeurs: valuesRMCActeInscription,
          range,
          ficheIdentifiant
        });
      }
    },
    [valuesRMCActeInscription]
  );

  const getLignesSuivantesOuPrecedentesInscription = useCallback(
    (ficheIdentifiant: string, lien: string) => {
      const range = goToLinkRMC(lien);
      if (valuesRMCActeInscription && range) {
        setCriteresRechercheFicheInscription({
          valeurs: valuesRMCActeInscription,
          range,
          ficheIdentifiant
        });
      }
    },
    [valuesRMCActeInscription]
  );

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
          (detailRequete as IRequeteDelivrance)?.provenanceRequete?.provenance
            ?.libelle
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
        provenanceRequete: (detailRequete as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
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
        provenanceRequete: (detailRequete as IRequeteDelivrance)
          ?.provenanceRequete?.provenance?.libelle
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
    <div className="side right">
      {rmcAutoActe &&
        tableauRMCAutoActe &&
        rmcAutoInscription &&
        tableauRMCAutoInscription && (
          <RMCAutoResultats
            dataAlertes={aplatirTableau(Array.from(alertes.values()))}
            ajoutAlertePossible={ajoutAlertePossible}
            dataRequete={detailRequete}
            dataRMCAutoActe={rmcAutoActe}
            dataTableauRMCAutoActe={tableauRMCAutoActe}
            dataRMCAutoInscription={rmcAutoInscription}
            dataTableauRMCAutoInscription={tableauRMCAutoInscription}
            onClickCheckboxTableauActes={onClickCheckboxActe}
            onClickCheckboxTableauInscriptions={onClickCheckboxInscription}
            resetRMC={nouvelleRMCActeInscription}
            setRangeInscription={setRangeInscription}
            setRangeActe={setRangeActe}
            getLignesSuivantesOuPrecedentesActe={
              getLignesSuivantesOuPrecedentesActe
            }
            idFicheActe={resultatRMCFicheActe?.ficheIdentifiant}
            dataRMCFicheActe={resultatRMCFicheActe?.dataRMCActe}
            dataTableauRMCFicheActe={resultatRMCFicheActe?.dataTableauRMCActe}
            getLignesSuivantesOuPrecedentesInscription={
              getLignesSuivantesOuPrecedentesInscription
            }
            idFicheInscription={resultatRMCFicheInscription?.ficheIdentifiant}
            dataRMCFicheInscription={
              resultatRMCFicheInscription?.dataRMCInscription
            }
            dataTableauRMCFicheInscription={
              resultatRMCFicheInscription?.dataTableauRMCInscription
            }
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
        requete={detailRequete}
        actes={Array.from(actes.values())}
        inscriptions={Array.from(inscriptions.values())}
      />
      <BoutonRetour message={getLibelle("<< Retour")} />
    </div>
  );
};
