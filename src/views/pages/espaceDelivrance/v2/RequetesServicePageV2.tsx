import React, { useCallback, useEffect, useState } from "react";
import {
  IQueryParametersPourRequetesV2,
  TypeAppelRequete
} from "../../../../api/appels/requeteApi";
import { getMessageZeroRequete } from "../../../common/util/tableauRequete/TableauRequeteUtils";
import { BoutonRetour } from "../../../common/widget/navigation/BoutonRetour";
import {
  NB_LIGNES_PAR_APPEL,
  SortOrder
} from "../../../common/widget/tableau/TableUtils";
import { TableauRece } from "../../../common/widget/tableau/v2/TableauRece";
import { TableauTypeColumn } from "../../../common/widget/tableau/v2/TableauTypeColumn";
import { getLibelle } from "../../../common/widget/Text";
import { URL_REQUETES_SERVICE_V2 } from "../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  HeaderTableauRequete,
  requerantColumnHeaders,
  requeteColumnHeaders,
  StatutsRequetesEspaceDelivrance
} from "./EspaceDelivranceParamsV2";
import { goToLinkRequete } from "./EspaceDelivranceUtilsV2";
import { useRequeteApi } from "./hook/DonneesRequeteHookV2";
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
    keys: [HeaderTableauRequete.Document],
    title: getLibelle("Document"),
    align: "center"
  }),
  ...requerantColumnHeaders,
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
  setParamsRMCAuto: (id: string, data: any[], urlWithParam: string) => void;
}

export const RequetesServicePageV2: React.FC<MesRequetesServicePageProps> = props => {
  /** TODO ETAPE 2 : Bouton "Attribué à" */
  // const [isSuccessAssigne, setIsSuccessAssigne] = React.useState<boolean>(false);
  // const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<IQueryParametersAssigneRequetes>();
  /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

  const [zeroRequete, setZeroRequete] = useState<JSX.Element>();

  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetesV2>({
    statuts: StatutsRequetesEspaceDelivrance,
    tri: "dateStatut",
    sens: "ASC",
    range: `0-${NB_LIGNES_PAR_APPEL}`
  });

  const { dataState, paramsTableau } = useRequeteApi(
    linkParameters,
    TypeAppelRequete.REQUETE_SERVICE
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

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: StatutsRequetesEspaceDelivrance,
      tri,
      sens,
      range: `0-${NB_LIGNES_PAR_APPEL}`
    };
    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(identifiant: string, data: any[]) {
    props.setParamsRMCAuto(identifiant, data, URL_REQUETES_SERVICE_V2);
  }

  useEffect(() => {
    if (dataState && dataState.length === 0) {
      setZeroRequete(getMessageZeroRequete());
    }
  }, [dataState]);

  return (
    <>
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
