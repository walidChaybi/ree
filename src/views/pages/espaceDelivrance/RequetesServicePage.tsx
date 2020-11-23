import React, { /*useEffect,*/ useCallback } from "react";
import { Box } from "reakit/Box";
import {
  TableauRece,
  TableauTypeColumn
} from "../../common/widget/tableau/TableauRece";
import { useRequeteApi } from "./hook/DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";

import { AppUrls } from "../../router/UrlManager";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { IDataTable } from "./MesRequetesPage";
import LabelIcon from "@material-ui/icons/Label";

import "./sass/RequeteTableau.scss";

import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";

import { IOfficierSSOApi } from "../../core/login/LoginHook";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete,
  indexParamsReq
} from "../../common/util/RequetesUtils";
import {
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "../../../api/appels/requeteApi";

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
// } from "../../common/widget/MessagePopin";

/** FIN TODO ETAPE 2 : Bouton "Attribué à" */

function getIconPrioriteRequeteService(row: IDataTable): JSX.Element {
  return (
    <Box
      title={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-label={getMessagePrioriteDeLaRequete(row.dateStatut)}
      aria-hidden={true}
    >
      <LabelIcon className={prioriteDeLaRequete(row.dateStatut)} />
    </Box>
  );
}

interface MesRequetesServicePageProps {
  officier?: IOfficierSSOApi;
}

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  /** TODO ETAPE 2 : Bouton "Attribué à" */
  // const [isSuccessAssigne, setIsSuccessAssigne] = React.useState<boolean>(
  //   false
  // );

  // const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<
  //   IQueryParametersAssigneRequetes
  // >();
  /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    statuts: [
      StatutRequete.ASigner,
      StatutRequete.ATraiterDemat,
      StatutRequete.AImprimer
    ],
    tri: "dateStatut",
    sens: "ASC",
    range: undefined
  });
  const style = {
    width: "5em"
  };
  const columnHeaders = [
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.IdSagaDila],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.idSagaDila",
      align: "center",
      style
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.SousTypeRequete],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.sousTypeRequete",
      getTextRefentiel: true,
      rowLibelle: "referentiel.sousTypeRequete.court",
      align: "center",
      style: {
        width: "8.5em"
      }
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.Canal],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.canal",
      getTextRefentiel: true,
      rowLibelle: "referentiel.canal",
      align: "center",
      style
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.NatureActe],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.natureActe",
      getTextRefentiel: true,
      rowLibelle: "referentiel.natureActe",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.TypeActe],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.typeActe",
      getTextRefentiel: true,
      rowLibelle: "pages.requete.consultation.documentDelivre.type",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [
        HeaderTableauRequete.Requerant,
        HeaderTableauRequete.LibelleRequerant
      ],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.requerant",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.NomOec],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.nomOec",
      align: "center"
      /** TODO ETAPE 2 : Bouton "Attribué à" */
      /*,
        "",
        (row: IDataTable, selectedUser?: string) => {
          return getIconOfficierEtatCivil(row, setQueryChangeOecRequest);
        }*/
      /** FIN TODO ETAPE 2 : Bouton "Attribué à" */
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.DateCreation],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateCreation",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.DateStatut],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.dateStatut",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.Statut],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.statut",
      getTextRefentiel: true,
      rowLibelle: "referentiel.statutRequete",
      align: "center"
    }),
    new TableauTypeColumn({
      keys: [HeaderTableauRequete.PrioriteRequete],
      colLibelle: "pages.delivrance.mesRequetes.tableau.header.prioriteRequete",
      getIcon: getIconPrioriteRequeteService,
      align: "center",
      style
    })
  ];

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = "",
    previousDataLinkState = ""
  } = useRequeteApi(
    linkParameters,
    TypeAppelRequete.REQUETE_SERVICE,
    props.officier
  );

  /** TODO ETAPE 2 : Bouton "Attribué à" */
  // const users = useUtilisateurApi({
  //   idArobas: props.officier?.idSSO
  // });
  // const { sucessState } = useUtilisateurRequeteApi(
  //   queryChangeOecRequest,
  //   dataState
  // );
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
  //         defaultElementId={
  //           utilisateurParDefaut !== undefined
  //             ? utilisateurParDefaut.key
  //             : undefined
  //         }
  //         title={getText(
  //           "pages.delivrance.monService.officierEtatCivilSelect.title"
  //         )}
  //         libelle={getText(
  //           "pages.delivrance.monService.officierEtatCivilSelect.libelle"
  //         )}
  //         validate={(req: FormValues) => {
  //           const utilisateur = users.dataState.find(
  //             u =>
  //               u.idUtilisateur ===
  //               (req.selectedItem !== undefined
  //                 ? req.selectedItem.key
  //                 : undefined)
  //           );

  //           if (utilisateur !== undefined && functionCallBack !== undefined) {
  //             functionCallBack({
  //               idReponse: row.reponse?.idReponse,
  //               nomOec: utilisateur.nom,
  //               prenomOec: utilisateur.prenom
  //             });
  //           }
  //         }}
  //       />
  //     </div>
  //   );
  // };

  /** FIN TODO ETAPE 2 : Bouton "Attribué à" */

  function goToLink(link: string) {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        statuts: [params[indexParamsReq.Statut].split("=")[1] as StatutRequete],
        tri: params[indexParamsReq.Tri].split("=")[1],
        sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
        range: params[indexParamsReq.Range].split("=")[1]
      };
      setLinkParameters(queryParameters);
    }
  }

  const handleChangeSort = useCallback((tri: string, sens: SortOrder) => {
    const queryParameters = {
      statuts: [
        StatutRequete.ASigner,
        StatutRequete.ATraiterDemat,
        StatutRequete.AImprimer
      ],
      tri: tri,
      sens: sens
    };

    setLinkParameters(queryParameters);
  }, []);

  // TODO droit sur le bouton signature ?
  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        sortOrderByState={linkParameters.tri}
        sortOrderState={linkParameters.sens}
        onClickOnLine={getUrlBack}
        columnHeaders={columnHeaders}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        previousDataLinkState={previousDataLinkState}
        goToLink={goToLink}
        handleChangeSort={handleChangeSort}
      />
      <BoutonRetour />
      {/* TODO ETAPE 2 : Bouton "Attribué à"  */}
      {/* <MessagePopin
        message={sucessState}
        messageType={PopinMessageType.Success}
        isOpen={isSuccessAssigne}
      /> */}
      {/* FIN TODO ETAPE 2 : Bouton "Attribué à"  */}
    </>
  );
};

function getUrlBack(identifiantRequete: string): string {
  return `${AppUrls.ctxRequetesServiceUrl}/${identifiantRequete}`;
}

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
