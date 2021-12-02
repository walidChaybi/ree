import React, { useCallback } from "react";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../../../api/appels/requeteApi";
import { HeaderTableauRequete } from "../../../../../model/requete/HeaderTableauRequete";
import { StatutRequete } from "../../../../../model/requete/StatutRequete";
import { BoutonRetour } from "../../../../common/widget/navigation/BoutonRetour";
import { SortOrder } from "../../../../common/widget/tableau/TableUtils";
import {
  TableauRece,
  TableauTypeColumn
} from "../../../../common/widget/tableau/v1/TableauRece";
import { URL_REQUETES_SERVICE_ID } from "../../../../router/ReceUrls";
import {
  dateStatutColumnHeaders,
  requerantColumnHeaders,
  requeteColumnHeaders
} from "./EspaceDelivranceParams";
import { goToLinkRequete } from "./EspaceDelivranceUtils";
import { useRequeteApi } from "./hook/DonneesRequeteHook";
import "./scss/RequeteTableau.scss";

/** TODO ETAPE 2 : Bouton "Attribué à" */
// import {
//   useUtilisateurApi,
//   IUtilisateurApi
// } from "./DonneesUtilisateursServiceHook";
// import {
//   SelectDialog,
//   FormValues,
//   SelectElements
// } from "../../../common/widget/form/SelectDialog";
// import { getText } from "../../../common/widget/Text";
// import {
//   useUtilisateurRequeteApi,
//   IQueryParametersAssigneRequetes
// } from "./UtilisateurAssigneRequeteHook";
// import {
//   MessagePopin,
//   PopinMessageType
// } from "../../../common/widget/popin/MessagePopin";

/** FIN TODO ETAPE 2 : Bouton "Attribué à" */

const columnsRequestesService = [
  ...requeteColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.TypeActe],
    title: "pages.delivrance.mesRequetes.tableau.header.typeActe",
    rowLibelle: "pages.requete.consultation.documentDelivre.type",
    align: "center"
  }),
  ...requerantColumnHeaders,
  new TableauTypeColumn({
    keys: [HeaderTableauRequete.NomOec],
    title: "pages.delivrance.mesRequetes.tableau.header.nomOec",
    align: "center"
    /** TODO ETAPE 2 : Bouton "Attribué à" */
    /*,"",(row: IDataTable, selectedUser?: string) => {return getIconOfficierEtatCivil(row, setQueryChangeOecRequest);}*/
    /** FIN TODO ETAPE 2 : Bouton "Attribué à" */
  }),
  ...dateStatutColumnHeaders
];
interface MesRequetesServicePageProps {
  getUrlBack: (id: string, data: any[], urlWithParam: string) => void;
}

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  /** TODO ETAPE 2 : Bouton "Attribué à" */
  // const [isSuccessAssigne, setIsSuccessAssigne] = React.useState<boolean>(false);
  // const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<IQueryParametersAssigneRequetes>();
  /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

  const [
    linkParameters,
    setLinkParameters
  ] = React.useState<IQueryParametersPourRequetes>({
    statuts: [
      StatutRequete.ASigner,
      StatutRequete.ATraiterDemat,
      StatutRequete.AImprimer
    ],
    tri: "dateStatut",
    sens: "ASC",
    range: undefined
  });

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = "",
    previousDataLinkState = ""
  } = useRequeteApi(linkParameters, TypeAppelRequete.REQUETE_SERVICE);

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
      statuts: [
        StatutRequete.ASigner,
        StatutRequete.ATraiterDemat,
        StatutRequete.AImprimer
      ],
      tri,
      sens
    };

    setLinkParameters(queryParameters);
  }, []);

  function onClickOnLine(identifiant: string, data: any[]) {
    props.getUrlBack(identifiant, data, URL_REQUETES_SERVICE_ID);
  }

  // TODO droit sur le bouton signature ?
  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={onClickOnLine}
        columnHeaders={columnsRequestesService}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
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
