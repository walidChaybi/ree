import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { getUtilisateursParTypeRequeteVersOptions } from "@composant/menuTransfert/MenuTransfertUtil";
import { ITransfertPopinForm, TransfertPopin } from "@composant/menuTransfert/TransfertPopin";
import {
  NavigationApercuReqCreationParams,
  useNavigationApercuCreation
} from "@hook/navigationApercuRequeteCreation/NavigationApercuCreationHook";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { ITransfertRequetesParams, useTransfertRequetesApi } from "@hook/requete/TransfertHook";
import { Utilisateur } from "@model/agent/Utilisateur";
import { IFiltreServiceRequeteCreationFormValues } from "@model/form/creation/etablissement/IFiltreServiceRequeteCreation";
import { IRequeteTableauCreation } from "@model/requete/IRequeteTableauCreation";
import { SousTypeCreation } from "@model/requete/enum/SousTypeCreation";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { TypeRequete } from "@model/requete/enum/TypeRequete";
import { Option, Options } from "@util/Type";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { SortOrder } from "@widget/tableau/TableUtils";
import { NB_LIGNES_PAR_APPEL_DEFAUT, NB_LIGNES_PAR_PAGE_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { IColonneCaseACocherParams } from "@widget/tableau/TableauRece/colonneElements/caseACocher/ColonneCasesACocher";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import { RECEContextData } from "../../../../contexts/RECEContextProvider";
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

export const RequetesServiceCreation: React.FC<RequetesServiceCreationProps> = props => {
  // STATES
  const [opEnCours, setOpEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const [parametresLienRequete, setParametresLienRequete] = useState<IQueryParametersPourRequetes>();
  const [paramsAttributionParLot, setParamsAttributionParLot] = useState<ITransfertRequetesParams>();
  const [paramsCreation, setParamsCreation] = useState<NavigationApercuReqCreationParams | undefined>();
  const [idRequetesSelectionneesAttribueeA, setIdRequetesSelectionneesAttribueeA] = useState<string[]>([]);
  const [estTableauARafraichir, setEstTableauARafraichir] = useState<boolean>(false);

  const { decrets } = useContext(RECEContextData);

  const { dataState, paramsTableau, onSubmit } = useRequeteCreationApiHook(
    TypeAppelRequete.REQUETE_CREATION_SERVICE,
    parametresLienRequete,
    setParametresLienRequete
  );

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsMiseAJour);
  useNavigationApercuCreation(paramsCreation);

  const { succesDuTransfert } = useTransfertRequetesApi(paramsAttributionParLot);

  const changementDePage = (link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetes-service");
    if (queryParametersPourRequetes) {
      setParametresLienRequete(queryParametersPourRequetes);
    }
  };

  const handleChangeSortTableau = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: statutsRequetesCreation,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
    };

    setParametresLienRequete(queryParameters);
  }, []);

  const rafraichirTableau = () => {
    if (parametresLienRequete) {
      setParametresLienRequete({ ...parametresLienRequete });
    }
    setIdRequetesSelectionneesAttribueeA([]);
  };

  useEffect(() => {
    if (succesDuTransfert) {
      props.setPopinAttribuerAOuvert(false);
      rafraichirTableau();
      setOpEnCours(false);
    }
  }, [succesDuTransfert]);

  useEffect(() => {
    if (estTableauARafraichir) {
      setEstTableauARafraichir(false);
    }
  }, [estTableauARafraichir]);

  const onValidateAttribuerA = (requetes: IRequeteTableauCreation[], agent?: Option) => {
    const requetesSelectionnees = requetes.filter(requete => idRequetesSelectionneesAttribueeA.includes(requete.idRequete));
    setOpEnCours(true);
    setParamsAttributionParLot({
      requetes: requetesSelectionnees.map(requete => ({
        id: requete.idRequete,
        statut: StatutRequete.getEnumFromLibelle(requete.statut).nom
      })),
      idUtilisateurAAssigner: agent?.cle,
      libelleAction: `Attribuée à  ${agent?.libelle}`,
      estTransfert: false
    });
  };

  const getUtilisateursAsOptions = (
    requetes: IRequeteTableauCreation[],
    utilisateurs: Utilisateur[],
    seulementUtilisateursActifs = false
  ): Options => {
    const utilisateursFiltres = seulementUtilisateursActifs ? utilisateurs.filter(utilisateur => utilisateur.actif) : utilisateurs;

    return requetes
      .filter(requete => idRequetesSelectionneesAttribueeA.includes(requete.idRequete))
      .reduce((listeUtilisateurs, requete) => {
        const options = getUtilisateursParTypeRequeteVersOptions(
          TypeRequete.CREATION,
          SousTypeCreation.getEnumFor(requete.sousType),
          "",
          utilisateurConnecte,
          false,
          utilisateursFiltres
        ).filter(option => !listeUtilisateurs.map(utilisateur => utilisateur.cle).includes(option.cle));

        return listeUtilisateurs.concat(options);
      }, [] as Options);
  };

  const colonneCaseACocherAttribueAParams: IColonneCaseACocherParams<IRequeteTableauCreation, string> = {
    identifiantsSelectionnes: idRequetesSelectionneesAttribueeA,
    setIdentifiantsSelectionnes: setIdRequetesSelectionneesAttribueeA,
    getIdentifiant: (data: IRequeteTableauCreation) => data.idRequete,
    contientHeader: true
  };

  const { utilisateurs, utilisateurConnecte } = useContext(RECEContextData);

  const columnHeaders = getColonnesTableauRequetesServiceCreation(colonneCaseACocherAttribueAParams);

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
        visible={opEnCours || !decrets || !utilisateurConnecte || !utilisateurs}
        onTimeoutEnd={() => setOpEnCours(false)}
        onClick={() => setOpEnCours(false)}
      />
      <FiltreServiceRequeteCreationForm onSubmit={soumettreFiltre} />
      {estTableauARafraichir ? (
        <PageChargeur />
      ) : (
        <TableauRece
          idKey={"idRequete"}
          sortOrderByState={parametresLienRequete?.tri}
          sortOrderState={parametresLienRequete?.sens}
          onClickOnLine={getOnClickSurLigneTableauEspaceCreation(setOpEnCours, setParamsMiseAJour, setParamsCreation, utilisateurConnecte)}
          columnHeaders={columnHeaders}
          dataState={dataState}
          paramsTableau={paramsTableau}
          goToLink={changementDePage}
          handleChangeSort={handleChangeSortTableau}
          messageAucunResultat={RenderMessageZeroRequete()}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
          onChangementDePage={() => setIdRequetesSelectionneesAttribueeA([])}
        />
      )}
      <TransfertPopin
        open={props.popinAttribuerAOuvert}
        onClose={() => props.setPopinAttribuerAOuvert(false)}
        titre={"Attribuer à un officier de l'état civil"}
        options={getUtilisateursAsOptions(dataState, utilisateurs, true)}
        onValidate={(valeurs: ITransfertPopinForm) => onValidateAttribuerA(dataState, valeurs.optionChoisie)}
      />
    </>
  );
};
