import React from "react";
import { Box } from "reakit/Box";
import { Text, getText } from "../../common/widget/Text";
import {
  TableauRece,
  TableauTypeColumn
} from "../../common/widget/tableau/TableauRece";
import {
  useRequeteApi,
  IQueryParametersPourRequetes
} from "./DonneesRequeteHook";
import { StatutRequete } from "../../../model/requete/StatutRequete";
import { SortOrder } from "../../common/widget/tableau/TableUtils";

import { AppUrls } from "../../router/UrlManager";
import { BoutonRetour } from "../../common/widget/BoutonRetour";
import { IDataTable } from "./MesRequetesPage";
import LabelIcon from "@material-ui/icons/Label";
import {
  getMessagePrioriteDeLaRequete,
  prioriteDeLaRequete
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

export const RequetesServicePage: React.FC = () => {
  const [sortOrderState, setSortOrderState] = React.useState<SortOrder>("ASC");
  const [sortOrderByState, setSortOrderByState] = React.useState<string>(
    "dateStatut"
  );

  const [queryChangeOecRequest, setQueryChangeOecRequest] = React.useState<
    IQueryParametersAssigneRequetes
  >();

  // TODO : unmock nomOec, prenomOec, add service
  const [linkParameters, setLinkParameters] = React.useState<
    IQueryParametersPourRequetes
  >({
    nomOec: "Garisson",
    prenomOec: "Juliette",
    statut: StatutRequete.ASigner,
    tri: sortOrderByState,
    sens: sortOrderState
  });

  const getColumnHeaders = (utilisateurs: SelectElements[]) => {
    return [
      new TableauTypeColumn(
        [HeaderTableauRequete.IdSagaDila],
        false,
        "pages.delivrance.mesRequetes.tableau.header"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.SousTypeRequete],
        true,
        "pages.delivrance.mesRequetes.tableau.header",
        "referentiel.sousTypeRequete"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.Canal],
        true,
        "pages.delivrance.mesRequetes.tableau.header",
        "referentiel.canal"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.NatureActe],
        true,
        "pages.delivrance.mesRequetes.tableau.header",
        "referentiel.natureActe"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.TypeActe],
        true,
        "pages.delivrance.mesRequetes.tableau.header",
        "pages.requete.consultation.documentDelivre.type"
      ),
      new TableauTypeColumn(
        [
          HeaderTableauRequete.Requerant,
          HeaderTableauRequete.NomOuRaisonSociale
        ],
        false,
        "pages.delivrance.mesRequetes.tableau.header"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.NomOec],
        false,
        "pages.delivrance.mesRequetes.tableau.header",
        "",
        (row: IDataTable, selectedUser?: string) => {
          return getIconOfficierEtatCivil(row, setQueryChangeOecRequest);
        }
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.DateCreation],
        false,
        "pages.delivrance.mesRequetes.tableau.header"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.DateDerniereMaj],
        false,
        "pages.delivrance.mesRequetes.tableau.header"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.Statut],
        true,
        "pages.delivrance.mesRequetes.tableau.header",
        "referentiel.statutRequete"
      ),
      new TableauTypeColumn(
        [HeaderTableauRequete.PrioriteRequete],
        false,
        "pages.delivrance.mesRequetes.tableau.header",
        "",
        getIconPrioriteRequeteService
      )
    ];
  };

  // TODO : utiliser les vrai pasramètre quand le ws sera mis à jour
  const {
    dataState = [],
    rowsNumberState = 0,
    nextDataLinkState = ""
  } = useRequeteApi(linkParameters);

  useUtilisateurRequeteApi(queryChangeOecRequest, dataState);

  // TODO : utiliser les vrai pasramètre quand le ws sera mis à jour
  const users = useUtilisateurApi({
    service: "servicemock"
  });

  const getIconOfficierEtatCivil = (
    row: IDataTable,
    functionCallBack?: (queryParam: IQueryParametersAssigneRequetes) => void
  ): JSX.Element => {
    const utilisateurs = convertUsersToSelect(users.dataState);

    const utilisateurParDefaut = utilisateurs.find(u => u.value === row.nomOec);

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
                u.idArobas ===
                (req.selectedItem !== undefined
                  ? req.selectedItem.key
                  : undefined)
            );

            if (utilisateur !== undefined && functionCallBack !== undefined) {
              functionCallBack({
                idRequete: row.idRequete,
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
        nomOec: params[0].split("=")[1],
        prenomOec: params[1].split("=")[1],
        statut: params[2].split("=")[1] as StatutRequete,
        tri: params[3].split("=")[1],
        sens: params[4].split("=")[1] as SortOrder,
        range: params[5].split("=")[1]
      };
      setLinkParameters(queryParameters);
    }
  }

  // TODO droit sur le bouton signature ?
  return (
    <>
      <h3 id="TableauRequetesTitre" hidden={true}>
        <Text messageId="pages.delivrance.monService.tableau.titre" />
      </h3>
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
      key: utilisateur.idArobas,
      value: `${utilisateur.prenom} ${utilisateur.nom}`
    });
  }
  return elements;
}
