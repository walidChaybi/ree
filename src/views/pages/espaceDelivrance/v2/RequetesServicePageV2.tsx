import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { StatutRequete } from "../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteTableauDelivrance } from "../../../../model/requete/v2/IRequeteTableauDelivrance";
import { autorisePrendreEnChargeTableau } from "../../../common/util/RequetesUtils";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "../../../common/widget/attente/OperationEnCours";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import { SortOrder } from "../../../common/widget/tableau/TableUtils";
import {
  NB_LIGNES_PAR_APPEL_DEFAUT,
  NB_LIGNES_PAR_PAGE_DEFAUT
} from "../../../common/widget/tableau/v2/TableauPaginationConstantes";
import { TableauRece } from "../../../common/widget/tableau/v2/TableauRece";
import { TableauTypeColumn } from "../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../common/widget/Text";
import { URL_REQUETES_SERVICE_V2 } from "../../../router/ReceUrls";
import {
  CreationActionMiseAjourStatutEtRmcAutoHookParams,
  useCreationActionMiseAjourStatutEtRmcAuto
} from "../../apercuRequete/commun/hook/CreationActionMiseAjourStatutEtRmcAutoHook";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requeteColumnHeaders,
  StatutsRequetesEspaceDelivrance
} from "./EspaceDelivranceParamsV2";
import { goToLinkRequete } from "./EspaceDelivranceUtilsV2";
import { useRequeteDelivranceApi } from "./hook/DonneesRequeteDelivranceHookV2";
import "./scss/RequeteTableauV2.scss";

/** TODO ETAPE 2 : Bouton "Attribué à" */
// import {
//   useUtilisateurApi,
//   IUtilisateurApi
// } from "./DonneesUtilisateursServiceHook";
// import {
//   SelectDialog,
//   FormValues,
//   SelectElements
// } from "../../common/widget/form/SelectDialog";
// import { getText } from "../../common/widget/Text";
// import {
//   useUtilisateurRequeteApi,
//   IQueryParametersAssigneRequetes
// } from "./UtilisateurAssigneRequeteHook";
// import {
//   MessagePopin,
//   PopinMessageType
// } from "../../common/widget/popin/MessagePopin";

/** FIN TODO ETAPE 2 : Bouton "Attribué à" */

const columnsRequestesService = [
  ...requeteColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.AttribueA],
    title: getLibelle("Attribué à"),
    align: "center"
    /** TODO ETAPE 2 : Bouton "Attribué à" */
    /*,"",(row: IDataTable, selectedUser?: string) => {return getIconOfficierEtatCivil(row, setQueryChangeOecRequest);}*/
    /** FIN TODO ETAPE 2 : Bouton "Attribué à" */
  }),
  ...dateStatutColumnHeaders
];
interface MesRequetesServicePageProps {
  setParamsRMCAuto: (
    id: string,
    requete: IRequeteTableauDelivrance,
    urlWithParam: string
  ) => void;
}

export const RequetesServicePageV2: React.FC<MesRequetesServicePageProps> =
  props => {
    /** TODO ETAPE 2 : Bouton "Attribué à" */
    // const [isSuccessAssigne, setIsSuccessAssigne] = React.useState<boolean>(false);
    // const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<IQueryParametersAssigneRequetes>();
    /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

    const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

    const [paramsMiseAJour, setParamsMiseAJour] =
      useState<CreationActionMiseAjourStatutEtRmcAutoHookParams | undefined>();

    const [linkParameters, setLinkParameters] =
      React.useState<IQueryParametersPourRequetesV2>({
        statuts: StatutsRequetesEspaceDelivrance,
        tri: "dateStatut",
        sens: "ASC",
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      });
    const [enChargement, setEnChargement] = React.useState(true);
    const [operationEnCours, setOperationEnCours] = useState<boolean>(false);

    const { dataState, paramsTableau } = useRequeteDelivranceApi(
      linkParameters,
      TypeAppelRequete.REQUETE_SERVICE,
      setEnChargement
    );

    /** TODO ETAPE 2 : Bouton "Attribué à" */
    // const users = useUtilisateurApi({idArobas: props.officier?.idSSO});
    // const { sucessState } = useUtilisateurRequeteApi(queryChangeOecRequest,dataState);
    // useEffect(() => {
    //   setIsSuccessAssigne(true);
    // }, [sucessState]);
    // const getIconOfficierEtatCivil = (
    //   row: IDataTable,
    //   functionCallBack?: (queryParam: IQueryParametersAssigneRequetes) => void
    // ): JSX.Element => {
    //   const utilisateurs = convertUsersToSelect(users.dataState);
    //   const utilisateurParDefaut = utilisateurs.find(
    //     utilisateur => utilisateur.value === row.nomOec
    //   );
    //   return (
    //     <div className={"SelectOfficierEtatCivil"}>
    //       <span className="AttributionOEC">{row.nomOec}</span>
    //       <SelectDialog
    //         listOfElements={utilisateurs}
    //         defaultElementId={utilisateurParDefaut !== undefined ? utilisateurParDefaut.key : undefined }
    //         title={getText("pages.delivrance.monService.officierEtatCivilSelect.title")}
    //         libelle={getText("pages.delivrance.monService.officierEtatCivilSelect.libelle")}
    //         validate={(req: FormValues) => {
    //           const utilisateur = users.dataState.find(u => u.idUtilisateur === (req.selectedItem !== undefined ? req.selectedItem.key : undefined));
    //           if (utilisateur !== undefined && functionCallBack !== undefined) {
    //             functionCallBack({ idReponse: row.reponse?.idReponse, nomOec: utilisateur.nom, prenomOec: utilisateur.prenom });
    //           }
    //         }}
    //       />
    //     </div>
    //   );
    // };
    /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

    function goToLink(link: string) {
      const queryParametersPourRequetes = goToLinkRequete(
        link,
        "requetesService"
      );
      if (queryParametersPourRequetes) {
        setLinkParameters(queryParametersPourRequetes);
      }
    }

    useCreationActionMiseAjourStatutEtRmcAuto(paramsMiseAJour);

    const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
      const queryParameters = {
        statuts: StatutsRequetesEspaceDelivrance,
        tri,
        sens,
        range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
      };
      setLinkParameters(queryParameters);
    }, []);

    function onClickOnLine(
      idRequete: string,
      data: IRequeteTableauDelivrance[],
      idx: number
    ) {
      setOperationEnCours(true);
      const requeteSelect = data[idx];
      if (autorisePrendreEnChargeTableau(requeteSelect)) {
        setParamsMiseAJour({
          libelleAction: "Prendre en charge",
          statutRequete: StatutRequete.PRISE_EN_CHARGE,
          requete: requeteSelect,
          urlCourante: URL_REQUETES_SERVICE_V2
        });
      } else {
        props.setParamsRMCAuto(idRequete, data[idx], URL_REQUETES_SERVICE_V2);
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
          columnHeaders={columnsRequestesService}
          dataState={dataState}
          paramsTableau={paramsTableau}
          goToLink={goToLink}
          handleChangeSort={handleChangeSort}
          noRows={zeroRequete}
          enChargement={enChargement}
          nbLignesParPage={NB_LIGNES_PAR_PAGE_DEFAUT}
          nbLignesParAppel={NB_LIGNES_PAR_APPEL_DEFAUT}
        />
        <BoutonRetour />
        {/* TODO ETAPE 2 : Bouton "Attribué à"  */}
        {/* <MessagePopin message={sucessState} messageType={PopinMessageType.Success} isOpen={isSuccessAssigne} /> */}
        {/* FIN TODO ETAPE 2 : Bouton "Attribué à"  */}
      </>
    );
  };

/** TODO ETAPE 2 : Bouton "Attribué à" */
// function convertUsersToSelect(
//   utilisateurs: IUtilisateurApi[]
// ): SelectElements[] {
//   const elements = [];
//   for (const utilisateur of utilisateurs) {
//     elements.push({
//       key: utilisateur.idUtilisateur,
//       value: `${utilisateur.prenom} ${utilisateur.nom}`
//     });
//   }
//   return elements;
// }

/** FIN TODO ETAPE 2 : Bouton "Attribué à" */
