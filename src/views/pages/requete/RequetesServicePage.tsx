import React, { useEffect } from "react";
import { Box } from "reakit/Box";
import { getText } from "../../common/widget/Text";
import {
  TableauRece,
  TableauTypeColumn
} from "../../common/widget/tableau/TableauRece";
import {
  useRequeteApi,
  IQueryParametersPourRequetes,
  TypeAppelRequete
} from "./DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";

import { AppUrls } from "../../router/UrlManager";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { IDataTable } from "./MesRequetesPage";
import LabelIcon from "@material-ui/icons/Label";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete,
  tableauHeader,
  indexParamsReq
} from "./RequetesUtils";
import {
  SelectDialog,
  SelectElements,
  FormValues
} from "../../common/widget/form/SelectDialog";
import "./sass/RequeteTableau.scss";
import {
  useUtilisateurApi,
  IUtilisateurApi
} from "./DonneesUtilisateursServiceHook";
import { HeaderTableauRequete } from "../../../model/requete/HeaderTableauRequete";
import {
  useUtilisateurRequeteApi,
  IQueryParametersAssigneRequetes
} from "./UtilisateurAssigneRequeteHook";
import {
  MessagePopin,
  PopinMessageType
} from "../../common/widget/MessagePopin";

import { IOfficierSSOApi } from "../../core/login/LoginHook";

function getIconPrioriteRequeteService(row: IDataTable): JSX.Element {
  return (
    <Box
      title={getMessagePrioriteDeLaRequete(row.dateDerniereMaj)}
      aria-label={getMessagePrioriteDeLaRequete(row.dateDerniereMaj)}
      aria-hidden={true}
    >
      <LabelIcon className={prioriteDeLaRequete(row.dateDerniereMaj)} />
    </Box>
  );
}

interface MesRequetesServicePageProps {
  officier?: IOfficierSSOApi;
}

export const RequetesServicePage: React.FC<MesRequetesServicePageProps> = props => {
  const [isSuccessAssigne, setIsSuccessAssigne] = React.useState<boolean>(
    false
  );

  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("ASC");
  const [sortOrderByState, setSortOrderByState] = React.useState<string>(
    "dateStatut"
  );

  const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<
    IQueryParametersAssigneRequetes
  >();

  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState,
    range: undefined
  });

  const getColumnHeaders = (utilisateurs: SelectElements[]) => {
    return [
      new TableauTypeColumn(
        [HeaderTableauRequete.IdSagaDila],
        false,
        tableauHeader
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.SousTypeRequete],
        true,
        tableauHeader,
        "referentiel.sousTypeRequete.court"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.Canal],
        true,
        tableauHeader,
        "referentiel.canal"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.NatureActe],
        true,
        tableauHeader,
        "referentiel.natureActe"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.TypeActe],
        true,
        tableauHeader,
        "pages.requete.consultation.documentDelivre.type"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.Requerant, HeaderTableauRequete.LibelleRequerant],
        false,
        tableauHeader
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.NomOec],
        false,
        tableauHeader,
        "",
        (row: IDataTable, selectedUser?: string) => {
          return getIconOfficierEtatCivil(row, setQueryChangeOecRequest);
        }
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.DateCreation],
        false,
        tableauHeader
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.DateStatut],
        false,
        tableauHeader
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.Statut],
        true,
        tableauHeader,
        "referentiel.statutRequete"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.PrioriteRequete],
        false,
        tableauHeader,
        "",
        getIconPrioriteRequeteService
      )
    ];
  };

  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = ""
  } = useRequeteApi(
    linkParameters,
    TypeAppelRequete.REQUETE_SERVICE,
    props.officier
  );

  const { sucessState } = useUtilisateurRequeteApi(
    queryChangeOecRequest,
    dataState
  );

  useEffect(() => {
    setIsSuccessAssigne(true);
  }, [sucessState]);

  const users = useUtilisateurApi({
    idArobas: props.officier?.idSSO
  });

  const getIconOfficierEtatCivil = (
    row: IDataTable,
    functionCallBack?: (queryParam: IQueryParametersAssigneRequetes) => void
  ): JSX.Element => {
    const utilisateurs = convertUsersToSelect(users.dataState);

    const utilisateurParDefaut = utilisateurs.find(
      uilisateur => uilisateur.value === row.nomOec
    );

    return (
      <div className={"SelectOfficierEtatCivil"}>
        <span className="AttributionOEC">{row.nomOec}</span>
        <SelectDialog
          listOfElements={utilisateurs}
          defaultElementId={
            utilisateurParDefaut !== undefined
              ? utilisateurParDefaut.key
              : undefined
          }
          title={getText(
            "pages.delivrance.monService.officierEtatCivilSelect.title"
          )}
          libelle={getText(
            "pages.delivrance.monService.officierEtatCivilSelect.libelle"
          )}
          validate={(req: FormValues) => {
            const utilisateur = users.dataState.find(
              u =>
                u.idUtilisateur ===
                (req.selectedItem !== undefined
                  ? req.selectedItem.key
                  : undefined)
            );

            if (utilisateur !== undefined && functionCallBack !== undefined) {
              functionCallBack({
                idReponse: row.reponse?.idReponse,
                nomOec: utilisateur.nom,
                prenomOec: utilisateur.prenom
              });
            }
          }}
        />
      </div>
    );
  };

  function goToLink(link: string) {
    let queryParameters: IQueryParametersPourRequetes;
    if (link.indexOf("range") > 0) {
      let params = [];
      params = link.split("requetes?")[1].split("&");
      queryParameters = {
        statut: params[indexParamsReq.Statut].split("=")[1] as StatutRequete,
        tri: params[indexParamsReq.Tri].split("=")[1],
        sens: params[indexParamsReq.Sens].split("=")[1] as SortOrder,
        range: params[indexParamsReq.Range].split("=")[1]
      };
      setLinkParameters(queryParameters);
    }
  }

  // TODO droit sur le bouton signature ?
  return (
    <>
      <TableauRece
        idKey={"idRequete"}
        onClickOnLine={getUrlBack}
        sortOrderByState={sortOrderByState}
        sortOrderState={sortOrderState}
        columnHeaders={getColumnHeaders(convertUsersToSelect(users.dataState))}
        dataState={dataState}
        rowsNumberState={rowsNumberState}
        nextDataLinkState={nextDataLinkState}
        setSortOrderState={setSortOrderState}
        setSortOrderByState={setSortOrderByState}
        goToLink={goToLink}
      />
      <BoutonRetour />
      <MessagePopin
        message={sucessState}
        messageType={PopinMessageType.Success}
        isOpen={isSuccessAssigne}
        setIsOpen={setIsSuccessAssigne}
      />
    </>
  );
};

function getUrlBack(identifiantRequete: string): string {
  return `${AppUrls.ctxRequetesServiceUrl}/${identifiantRequete}`;
}

function convertUsersToSelect(
  utilisateurs: IUtilisateurApi[]
): SelectElements[] {
  const elements = [];
  for (const utilisateur of utilisateurs) {
    elements.push({
      key: utilisateur.idUtilisateur,
      value: `${utilisateur.prenom} ${utilisateur.nom}`
    });
  }
  return elements;
}
