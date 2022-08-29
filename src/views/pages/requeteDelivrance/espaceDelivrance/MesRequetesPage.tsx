import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/IRequeteTableauDelivrance";
import {
  CreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "../../../common/hook/requete/ActionHook";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../../common/hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import WithHabilitation from "../../../common/util/habilitation/WithHabilitation";
import { autorisePrendreEnChargeReqTableauDelivrance } from "../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "../../../common/util/Utils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { Bouton } from "../../../common/widget/boutonAntiDoubleSubmit/Bouton";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { BoutonSignature } from "../../../common/widget/signature/BoutonSignature";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "../../../common/widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import { URL_MES_REQUETES_DELIVRANCE } from "../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import { goToLinkRequete } from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApi } from "./hook/DonneesRequeteDelivranceHook";
import "./scss/RequeteTableau.scss";

const columnsMesRequestes = [
  ...requeteColumnHeaders,
  ...dateStatutColumnHeaders
];

interface MesRequetesPageProps {
  miseAJourCompteur: () => void;
  setParamsRMCAuto: (
    id: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string
  ) => void;
}

export const MesRequetesPage: React.FC<MesRequetesPageProps> = props => {
  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [lancerMajRequeteBouton, setLancerMajRequeteBouton] =
    useState<CreationActionEtMiseAjourStatutParams>();

  const idAction = usePostCreationActionEtMiseAjourStatutApi(
    lancerMajRequeteBouton
  );

  const [linkParameters, setLinkParameters] =
    React.useState<IQueryParametersPourRequetes>({
      statuts: StatutRequete.getStatutsMesRequetes(),
      tri: "dateStatut",
      sens: "ASC",
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    });
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteDelivranceApi(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_DELIVRANCE,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "requetes");
    if (queryParametersPourRequetes) {
      setLinkParameters(queryParametersPourRequetes);
    }
  }, []);

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutRequete.getStatutsMesRequetes(),
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
    };

    setLinkParameters(queryParameters);
  }, []);

  /**
   * Test sur cette fonction trop compliqué et longue à faire par rapport à la valeur ajouté
   */
  /* istanbul ignore next */
  const handleReload = useCallback(() => {
    setLinkParameters({ ...linkParameters });
    if (props.miseAJourCompteur !== undefined) {
      props.miseAJourCompteur();
    }
  }, [linkParameters, props]);

  function onClickOnLine(
    idRequete: string,
    data: IRequeteTableauDelivrance[],
    idx: number
  ) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    if (autorisePrendreEnChargeReqTableauDelivrance(requeteSelect)) {
      setParamsMiseAJour({
        libelleAction: "Prendre en charge",
        statutRequete: StatutRequete.PRISE_EN_CHARGE,
        requete: requeteSelect,
        urlCourante: URL_MES_REQUETES_DELIVRANCE
      });
    } else {
      props.setParamsRMCAuto(idRequete, data[idx], URL_MES_REQUETES_DELIVRANCE);
    }
  }

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const finDeConsultation = useCallback((id: string, event: any) => {
    event.stopPropagation();
    setLancerMajRequeteBouton({
      libelleAction: StatutRequete.TRAITE_DELIVRE_DEMAT.libelle,
      statutRequete: StatutRequete.TRAITE_DELIVRE_DEMAT,
      requeteId: id
    });
  }, []);

  useEffect(() => {
    if (idAction) {
      setLinkParameters({
        statuts: StatutRequete.getStatutsMesRequetes(),
        tri: "dateStatut",
        sens: "ASC",
        range: `0-${NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}`
      });
    }
  }, [idAction]);

  function getBoutonFinConsultation(
    id: string,
    sousType: string,
    idUtilisateur: string,
    statut?: string
  ): JSX.Element {
    return (
      <>
        {statut === "Traitée - Répondue" && (
          <Bouton onClick={e => finDeConsultation(id, e)}>
            {getLibelle("Fin de consultation")}
          </Bouton>
        )}
      </>
    );
  }

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsMesRequestes}
        dataState={dataState}
        paramsTableau={paramsTableau}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
        handleReload={handleReload}
        noRows={zeroRequete}
        enChargement={enChargement}
        icone={{ keyColonne: "actions", getIcone: getBoutonFinConsultation }}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
      >
        <BoutonSignerLeLot libelle={getLibelle("Signer le lot")} />
      </TableauRece>

      <BoutonRetour />
    </>
  );
};

const BoutonSignerLeLot = WithHabilitation(
  BoutonSignature,
  "BoutonSignerLeLot"
);
