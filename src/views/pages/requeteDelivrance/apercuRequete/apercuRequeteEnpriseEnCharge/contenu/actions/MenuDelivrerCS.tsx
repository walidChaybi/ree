import { IActionOption } from "@model/requete/IActionOption";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { receUrl } from "@router/ReceUrls";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { getLibelle, supprimerNullEtUndefinedDuTableau } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { mappingRequeteDelivranceToRequeteTableau } from "../../../mapping/ReqDelivranceToReqTableau";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";
import {
  filtrerListeActionsParDocumentDemande,
  menuDelivrerActions
} from "./MenuUtilsCS";

export const MenuDelivrerCS: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    mappingRequeteDelivranceToRequeteTableau(props.requete),
    inscriptions,
    actes
  );

  const listeActionsFiltreParSousTypes: IActionOption[] =
    filtrerListeActionsParSousTypes(props.requete, menuDelivrerActions);

  const handleDelivrerMenu = () => {
    setOperationEnCours(true);
    setInscriptions(
      props.inscriptions
        ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
        : []
    );
    setActes(props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : []);
  };

  /////////////////////////////////////
  // Certificat de situation
  /////////////////////////////////////
  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      setOperationEnCours(false);
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeliverCertificatSituation, history]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={filtrerListeActionsParDocumentDemande(
          listeActionsFiltreParSousTypes,
          props.requete
        )}
        onSelect={handleDelivrerMenu}
      />
    </>
  );
};
