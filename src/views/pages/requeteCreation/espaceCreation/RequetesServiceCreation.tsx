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
import { IFiltreServiceRequeteCreationFormValues } from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option, Options } from "@util/Type";
import { getLibelle } from "@util/Utils";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { SortOrder } from "@widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { IColonneCaseACocherParams } from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import React, { useCallback, useEffect, useState } from "react";
import { useRequeteCreationApiHook } from "../../../common/hook/requete/creation/RequeteCreationApiHook";
import { goToLinkRequete } from "../../requeteDelivrance/espaceDelivrance/EspaceDelivranceUtils";
import { FiltreServiceRequeteCreationForm } from "../commun/composants/FiltreServiceRequeteCreationForm/FiltreServiceRequeteCreationForm";
import { getOnClickSurLigneTableauEspaceCreation } from "./EspaceCreationUtils";
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
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [parametresLienRequete, setParametresLienRequete] =
    useState<IQueryParametersPourRequetes>();
  const [enChargement, setEnChargement] = React.useState(false);
  const [paramsAttributionParLot, setParamAttributionParLot] =
    useState<TransfertParLotParams>();
  const [paramsCreation, setParamsCreation] = useState<
    NavigationApercuReqCreationParams | undefined
  >();
  const [
    idRequetesSelectionneesAttribueeA,
    setIdRequetesSelectionneesAttribueeA
  ] = useState<string[]>([]);
  const [estTableauARafraichir, setEstTableauARafraichir] =
    useState<boolean>(false);

  const { dataState, paramsTableau, onSubmit } = useRequeteCreationApiHook(
    TypeAppelRequete.REQUETE_CREATION_SERVICE,
    setEnChargement,
    parametresLienRequete
  );

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
    if (parametresLienRequete) {
      setParametresLienRequete({ ...parametresLienRequete });
    }
    setIdRequetesSelectionneesAttribueeA([]);
  };

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

  useEffect(() => {
    setEstTableauARafraichir(false);
  }, [estTableauARafraichir]);

  const onClosePopinAttribuerA = () => {
    props.setPopinAttribuerAOuvert(false);
  };

  const filtrerRequetesChecked = (requetes: IRequeteTableauCreation[]) =>
    requetes.filter(requete =>
      idRequetesSelectionneesAttribueeA.includes(requete.idRequete)
    );

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
      idUtilisateur: agent?.cle,
      libelleAction: `Attribuée à  ${agent?.libelle}`,
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
              .map(utilisateur => utilisateur.cle)
              .includes(option.cle)
        );

        return listeUtilisateurs.concat(options);
      },
      [] as Options
    );
  };

  const colonneCaseACocherAttribueAParams: IColonneCaseACocherParams<
    IRequeteTableauCreation,
    string
  > = {
    identifiantsSelectionnes: idRequetesSelectionneesAttribueeA,
    setIdentifiantsSelectionnes: setIdRequetesSelectionneesAttribueeA,
    getIdentifiant: (data: IRequeteTableauCreation) => data.idRequete,
    contientHeader: true
  };

  const columnHeaders = getColonnesTableauRequetesServiceCreation(
    colonneCaseACocherAttribueAParams
  );

  function soumettreFiltre(values: IFiltreServiceRequeteCreationFormValues) {
    if (!parametresLienRequete && !values.numeroRequete) {
      setParametresLienRequete(props.queryParametersPourRequetes);
    }
    onSubmit(values);
    setEstTableauARafraichir(true);
  }

  return (
    <>
      <OperationEnCours
        visible={opEnCours}
        onTimeoutEnd={finOpEnCours}
        onClick={finOpEnCours}
      />
      <FiltreServiceRequeteCreationForm onSubmit={soumettreFiltre} />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={parametresLienRequete?.tri}
        sortOrderState={parametresLienRequete?.sens}
        onClickOnLine={getOnClickSurLigneTableauEspaceCreation(
          setOpEnCours,
          setParamsMiseAJour,
          setParamsCreation
        )}
        columnHeaders={columnHeaders}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={changementDePage}
        handleChangeSort={handleChangeSortTableau}
        noRows={getMessageZeroRequete()}
        enChargement={enChargement}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        onChangementDePage={() => setIdRequetesSelectionneesAttribueeA([])}
        resetTableau={estTableauARafraichir}
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
