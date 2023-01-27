import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import { listeUtilisateursToOptionsBis } from "@composant/menuTransfert/MenuTransfertUtil";
import { TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  TransfertParLotParams,
  useTransfertsApi
} from "@hook/requete/TransfertHook";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { IEtatCheckboxColonne } from "@pages/rechercheMultiCriteres/acteInscription/resultats/checkboxColumn/CheckboxColumn";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { autorisePrendreEnChargeReqTableauCreation } from "@util/RequetesUtils";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { TableauTypeColumn } from "@widget/tableau/TableauRece/TableauTypeColumn";
import { SortOrder } from "@widget/tableau/TableUtils";
import React, { useCallback, useEffect, useState } from "react";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { setParamsUseApercuCreation } from "../commun/requeteCreationUtils";
import { useRequeteCreationApi } from "../hook/DonneesRequeteCreationApiHook";
import { statutsRequetesCreation } from "./params/EspaceCreationParams";
import { getColonnesTableauRequetesServiceCreation } from "./params/RequetesServiceCreationParams";

interface RequetesServiceCreationProps {
  queryParametersPourRequetes: IQueryParametersPourRequetes;
  popinAttribuerAOuvert: boolean;
  setPopinAttribuerAOuvert: Function;
}

export const RequetesServiceCreation: React.FC<
  RequetesServiceCreationProps
> = props => {
  // STATEs
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [parametresLienRequete, setParametresLienRequete] =
    useState<IQueryParametersPourRequetes>(props.queryParametersPourRequetes);
  const [enChargement, setEnChargement] = React.useState(true);
  const [paramsAttributionParLot, setParamAttributionParLot] =
    useState<TransfertParLotParams>();
  const [paramsCreation, setParamsCreation] = useState<
    NavigationApercuReqCreationParams | undefined
  >();

  const { dataState, paramsTableau } = useRequeteCreationApi(
    parametresLienRequete,
    TypeAppelRequete.REQUETE_CREATION_SERVICE,
    setEnChargement
  );

  const [columnHeaders, setColumnHeaders] = useState<TableauTypeColumn[]>([]);

  const [etat, setEtat] = useState<IEtatCheckboxColonne>({ coche: false });

  useEffect(() => {
    setColumnHeaders(getColonnesTableauRequetesServiceCreation(etat));
  }, [etat]);

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);
  useNavigationApercuCreation(paramsCreation);

  const resultatTransfertsApi = useTransfertsApi(paramsAttributionParLot);

  const changementDePage = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(
      link,
      "requetesService"
    );
    if (queryParametersPourRequetes) {
      setParametresLienRequete(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSortTableau = useCallback(
    (tri: string, sens: SortOrder) => {
      const queryParameters = {
        statuts: statutsRequetesCreation,
        tri,
        sens,
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      };

      setParametresLienRequete(queryParameters);
    },
    []
  );

  const rafraichirTableau = () => {
    setParametresLienRequete({ ...parametresLienRequete });
    setEtat({ coche: false });
  };

  useEffect(() => {
    if (dataState?.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOpEnCours = () => {
    setOpEnCours(false);
  };

  useEffect(() => {
    if (resultatTransfertsApi) {
      onClosePopinAttribuerA();
      rafraichirTableau();
      finOpEnCours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultatTransfertsApi]);

  function onClickOnLineTableau(
    idRequete: string,
    data: IRequeteTableauCreation[],
    idx: number
  ) {
    setOpEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauCreation(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: StatutRequete.PRISE_EN_CHARGE.libelle,
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_MES_REQUETES_CREATION,
        typeRequete: TypeRequete.CREATION
      });
    } else {
      setParamsUseApercuCreation(
        idRequete,
        setParamsCreation,
        requeteSelect.sousType,
        requeteSelect.statut,
        requeteSelect.idUtilisateur
      );
    }
  }

  const onClosePopinAttribuerA = () => {
    props.setPopinAttribuerAOuvert(false);
  };

  const filtrerRequetesChecked = (requetes: IRequeteTableauCreation[]) =>
    requetes.filter(requete => requete.attribueAChecked);

  const onValidateAttribuerA = (
    requetes: IRequeteTableauCreation[],
    agent?: Option
  ) => {
    const requetesChecked = filtrerRequetesChecked(requetes);
    setOpEnCours(true);
    setParamAttributionParLot({
      idRequetes: requetesChecked.map(requete => requete.idRequete),
      statutRequete: requetesChecked.map(requete =>
        StatutRequete.getEnumFromLibelle(requete?.statut)
      ),
      idUtilisateur: agent?.value,
      libelleAction: `Attribuée à  ${agent?.str}`,
      estTransfert: false
    } as TransfertParLotParams);
  };

  const getUtilisateursAsOptions = (
    requetes: IRequeteTableauCreation[]
  ): Options => {
    return filtrerRequetesChecked(requetes).reduce(
      (listeUtilisateurs, requete) => {
        const options = listeUtilisateursToOptionsBis(
          TypeRequete.CREATION,
          SousTypeCreation.getEnumFor(requete.sousType),
          requete.idUtilisateur || "",
          false
        ).filter(
          option =>
            !listeUtilisateurs
              .map(utilisateur => utilisateur.value)
              .includes(option.value)
        );

        return listeUtilisateurs.concat(options);
      },
      [] as Options
    );
  };

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={finOpEnCours}
        onClick={finOpEnCours}
      />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={parametresLienRequete.tri}
        sortOrderState={parametresLienRequete.sens}
        onClickOnLine={onClickOnLineTableau}
        columnHeaders={columnHeaders}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={changementDePage}
        handleChangeSort={handleChangeSortTableau}
        noRows={zeroRequete}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
      />

      <TransfertPopin
        open={props.popinAttribuerAOuvert}
        onClose={onClosePopinAttribuerA}
        titre={getLibelle("Attribuer à un officier de l'état civil")}
        options={getUtilisateursAsOptions(dataState)}
        onValidate={(agent?: Option) => onValidateAttribuerA(dataState, agent)}
      />
    </>
  );
};
