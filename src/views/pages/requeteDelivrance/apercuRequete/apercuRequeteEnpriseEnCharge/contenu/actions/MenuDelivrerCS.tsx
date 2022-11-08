import { CODE_ATTESTATION_PACS } from "@model/requete/enum/DocumentDelivranceConstante";
import { IActionOption } from "@model/requete/IActionOption";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { receUrl } from "@router/ReceUrls";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import {
  estRenseigne,
  getLibelle,
  supprimerNullEtUndefinedDuTableau
} from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
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

  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();
  const boutonsPopin = {
    label: "OK",
    action: () => setMessagesBloquant(undefined)
  };

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    props.requete.documentDemande.code,
    mappingRequeteDelivranceToRequeteTableau(props.requete),
    inscriptions,
    actes
  );

  const listeActionsFiltreParSousTypes: IActionOption[] =
    filtrerListeActionsParSousTypes(props.requete, menuDelivrerActions);

  const handleDelivrerMenu = () => {
    let messageErreur = "";

    if (props.requete.documentDemande.code === CODE_ATTESTATION_PACS) {
      if (props.inscriptions?.length === 0 && props.actes?.length === 0) {
        messageErreur = getLibelle(
          "Il faut sélectionner au moins un PACS au statut fiche actif"
        );
      } else if (props.actes && props.actes.length > 0) {
        messageErreur = getLibelle(
          "Votre sélection n'est pas cohérente avec le choix de l'action de réponse"
        );
      }
    }

    if (messageErreur) {
      setMessagesBloquant([messageErreur]);
    } else {
      setOperationEnCours(true);
      setInscriptions(
        props.inscriptions
          ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
          : []
      );
      setActes(
        props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : []
      );
    }
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
      <ConfirmationPopin
        isOpen={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={[boutonsPopin]}
      />
    </>
  );
};
