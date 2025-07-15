import { IQueryParametersPourRequetes, TypeAppelRequete } from "@api/appels/requeteApi";
import { RECEContextData } from "@core/contexts/RECEContext";
import { ICreationActionEtMiseAjourStatutParams, usePostCreationActionEtMiseAjourStatutApi } from "@hook/requete/ActionHook";
import {
  ICreationActionMiseAjourStatutEtRedirectionParams,
  useCreationActionMiseAjourStatutEtRedirectionHook
} from "@hook/requete/CreationActionMiseAjourStatutEtRedirectionHook";
import { IRequeteTableauDelivrance } from "@model/requete/IRequeteTableauDelivrance";
import { EStatutRequete, StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { RenderMessageZeroRequete } from "@util/tableauRequete/TableauRequeteUtils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { BoutonDoubleSubmit } from "@widget/boutonAntiDoubleSubmit/BoutonDoubleSubmit";
import { BoutonRetour } from "@widget/navigation/BoutonRetour";
import { SortOrder } from "@widget/tableau/TableUtils";
import { TableauRece } from "@widget/tableau/TableauRece/TableauRece";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PageChargeur from "../../../../composants/commun/chargeurs/PageChargeur";
import SignatureDelivrance from "../../../../composants/commun/signature/SignatureDelivrance";
import { dateStatutColumnHeaders, requeteColumnHeaders } from "./EspaceDelivranceParams";
import { goToLinkRequete, miseAjourOuRedirection } from "./EspaceDelivranceUtils";
import { useRequeteDelivranceApiHook } from "./hook/DonneesRequeteDelivranceApiHook";
import "./scss/RequeteTableau.scss";

const columnsMesRequestes = [...requeteColumnHeaders, ...dateStatutColumnHeaders];

const NOMBRE_REQUETES = {
  parPage: 30,
  parAppel: 90
};

interface MesRequetesPageProps {
  miseAJourCompteur: () => void;
  setNavigationApercuDelivranceParams: (requete: IRequeteTableauDelivrance, urlWithParam: string) => void;
}

export const MesRequetesPage: React.FC<MesRequetesPageProps> = props => {
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [paramsMiseAJour, setParamsMiseAJour] = useState<ICreationActionMiseAjourStatutEtRedirectionParams | undefined>();
  const [lancerMajRequeteBouton, setLancerMajRequeteBouton] = useState<ICreationActionEtMiseAjourStatutParams>();

  const { decrets, utilisateurConnecte } = useContext(RECEContextData);
  const idAction = usePostCreationActionEtMiseAjourStatutApi(lancerMajRequeteBouton);

  const [linkParameters, setLinkParameters] = React.useState<IQueryParametersPourRequetes>({
    statuts: StatutRequete.getStatutsMesRequetes(),
    tri: "dateStatut",
    sens: "ASC",
    range: `0-${NOMBRE_REQUETES.parAppel}`
  });
  const [enChargement, setEnChargement] = React.useState(true);
  const { dataState, paramsTableau } = useRequeteDelivranceApiHook(
    linkParameters,
    TypeAppelRequete.MES_REQUETES_DELIVRANCE,
    setEnChargement
  );

  useCreationActionMiseAjourStatutEtRedirectionHook(paramsMiseAJour);

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
      range: `0-${NOMBRE_REQUETES.parAppel}`
    };

    setLinkParameters(queryParameters);
  }, []);

  /**
   * Test sur cette fonction trop compliqué et longue à faire par rapport à la valeur ajouté
   */
  const handleReload = useCallback(() => {
    setLinkParameters({ ...linkParameters });
    if (props.miseAJourCompteur !== undefined) {
      props.miseAJourCompteur();
    }
  }, [linkParameters, props]);

  function onClickOnLine(idRequete: string, data: IRequeteTableauDelivrance[], idx: number) {
    setOperationEnCours(true);
    const requeteSelect = data[idx];
    miseAjourOuRedirection(
      requeteSelect,
      setParamsMiseAJour,
      props.setNavigationApercuDelivranceParams,
      idRequete,
      data,
      idx,
      URL_MES_REQUETES_DELIVRANCE,
      utilisateurConnecte
    );
  }

  const finOperationEnCours = () => {
    setOperationEnCours(false);
  };

  const finDeConsultation = useCallback((id: string, event: any) => {
    event.stopPropagation();
    setLancerMajRequeteBouton({
      libelleAction: EStatutRequete.TRAITE_DELIVRE_DEMAT,
      statutRequete: "TRAITE_DELIVRE_DEMAT",
      requeteId: id
    });
  }, []);

  useEffect(() => {
    if (idAction) {
      setLinkParameters({
        statuts: StatutRequete.getStatutsMesRequetes(),
        tri: "dateStatut",
        sens: "ASC",
        range: `0-${NOMBRE_REQUETES.parAppel}`
      });
    }
  }, [idAction]);

  function getBoutonFinConsultation(id: string, sousType: string, idUtilisateur: string, statut?: string): JSX.Element {
    return (
      <>
        {statut === "Traitée - Répondue" && (
          <BoutonDoubleSubmit
            className="finConsultation"
            onClick={e => finDeConsultation(id, e)}
          >
            {"Fin consultation"}
          </BoutonDoubleSubmit>
        )}
      </>
    );
  }

  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !decrets}
        onTimeoutEnd={finOperationEnCours}
        onClick={finOperationEnCours}
      />
      {enChargement ? (
        <PageChargeur />
      ) : (
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
          noRows={RenderMessageZeroRequete()}
          icone={{ keyColonne: "actions", getIcone: getBoutonFinConsultation }}
          nbLignesParPage={NOMBRE_REQUETES.parPage}
          nbLignesParAppel={NOMBRE_REQUETES.parAppel}
        >
          <SignatureDelivrance
            titreBouton="Signer le lot"
            titreModale="Signature des documents"
            numerosFonctionnel={dataState
              .slice(0, NOMBRE_REQUETES.parPage)
              .filter(requete => requete.numero && requete.statut === StatutRequete.A_SIGNER.libelle)
              .map(requete => requete.numero as string)}
            apreSignature={() => handleReload()}
          />
        </TableauRece>
      )}

      <BoutonRetour />
    </>
  );
};
