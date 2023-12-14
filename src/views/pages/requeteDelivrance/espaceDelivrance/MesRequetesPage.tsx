import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "@api/appels/requeteApi";
import {
  ICreationActionEtMiseAjourStatutParams,
  usePostCreationActionEtMiseAjourStatutApi
} from "@hook/requete/ActionHook";
import {
  ICreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "@hook/requete/CreationActionMiseAjourStatutEtRmcAutoHook";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import WithHabilitation from "@util/habilitation/WithHabilitation";
import { getMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { Bouton } from "@widget/boutonAntiDoubleSubmit/Bouton";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { BoutonSignature } from "@widget/signature/BoutonSignature";
import {
  NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE,
  NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import { SortOrder } from "@widget/tableau/TableUtils";
import React, { useCallback, useEffect, useState } from "react";
import { validerMentionsPlusieursDocuments } from "../editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import {
  dateStatutColumnHeaders,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import {
  goToLinkRequete,
  miseAjourOuRedirection
} from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApiHook } from "./hook/DonneesRequeteDelivranceApiHook";
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
    urlWithParam: string,
    pasDeTraitementAuto: boolean
  ) => void;
}

export const MesRequetesPage: React.FC<MesRequetesPageProps> = props => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<
    ICreationActionMiseAjourStatutEtRmcAutoHookParams | undefined
  >();
  const [lancerMajRequeteBouton, setLancerMajRequeteBouton] =
    useState<ICreationActionEtMiseAjourStatutParams>();

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
  const { dataState, paramsTableau } = useRequeteDelivranceApiHook(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_DELIVRANCE,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

  const goToLink = useCallback((link: string) => {
    const queryParametersPourRequetes = goToLinkRequete(link, "mesrequetes");
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
    miseAjourOuRedirection(
      requeteSelect,
      setParamsMiseAJour,
      props,
      idRequete,
      data,
      idx,
      URL_MES_REQUETES_DELIVRANCE
    );
  }

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
          <Bouton
            className="finConsultation"
            onClick={e => finDeConsultation(id, e)}
          >
            {getLibelle("Fin consultation")}
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
        noRows={getMessageZeroRequete()}
        enChargement={enChargement}
        icone={{ keyColonne: "actions", getIcone: getBoutonFinConsultation }}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ESPACE_DELIVRANCE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ESPACE_DELIVRANCE}
      >
        <BoutonSignerLeLot
          libelle={getLibelle("Signer le lot")}
          validerMentionsPlusieursDocuments={validerMentionsPlusieursDocuments}
        />
      </TableauRece>

      <BoutonRetour />
    </>
  );
};

const BoutonSignerLeLot = WithHabilitation(
  BoutonSignature,
  "BoutonSignerLeLot"
);
