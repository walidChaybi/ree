import { reinitialiserOnClick } from "@composant/menuTransfert/MenuTransfertUtil";
import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IActionOption } from "@model/requete/IActionOption";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { CODE_ATTESTATION_PACS } from "@model/requete/enum/DocumentDelivranceConstante";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { receUrl } from "@router/ReceUrls";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import {
  estRenseigne,
  getLibelle,
  supprimerNullEtUndefinedDuTableau
} from "@util/Utils";
import { replaceUrl } from "@util/route/UrlUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { mappingRequeteDelivranceToRequeteTableau } from "../../../mapping/ReqDelivranceToReqTableau";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  estMemeNombreDeRCModificationEtRadiation,
  estPresentRcTypeModification,
  filtrerListeActionsParDocumentDemande,
  getInscriptionsDeTypeModificationEtRadiation,
  menuDelivrerActions,
  triTableauRCRadiationParDate
} from "./MenuUtilsCS";
import { useDelivrerCertificatSituationHook } from "./hook/DelivrerCertificatSituationHook";

export const MenuDelivrerCS: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();
  const refs = useRef([]);

  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptionRcRadiation, setInscriptionsRcRadiation] = useState<
    IInscriptionRc | undefined
  >();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();
  const boutonsPopin = {
    label: "OK",
    action: () => {
      setMessagesBloquant(undefined);
      reinitialiserOnClick(refs);
    }
  };

  useEffect(() => {
    if (
      props.inscriptions?.length &&
      props.inscriptionsRC?.length &&
      estPresentRcTypeModification(props.inscriptions)
    ) {
      const { inscrptionsRCModification, inscriptionsRCRadiation } =
        getInscriptionsDeTypeModificationEtRadiation(props.inscriptionsRC);

      if (
        estMemeNombreDeRCModificationEtRadiation(
          inscriptionsRCRadiation,
          inscrptionsRCModification
        )
      ) {
        const tableauRCRadiationTrier: IInscriptionRc[] =
          triTableauRCRadiationParDate(inscriptionsRCRadiation);

        setInscriptionsRcRadiation(
          tableauRCRadiationTrier[tableauRCRadiationTrier.length - 1]
        );
      }
    }
  }, [props.inscriptionsRC, props.inscriptions]);

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    props.requete.documentDemande.code,
    mappingRequeteDelivranceToRequeteTableau(props.requete),
    inscriptions,
    actes,
    inscriptionRcRadiation
  );

  const listeActionsFiltreParSousTypes: IActionOption[] =
    filtrerListeActionsParSousTypes(props.requete, menuDelivrerActions);

  const handleDelivrerMenu = () => {
    const messageBloquant = afficherMessageBloquant();

    if (messageBloquant) {
      setMessagesBloquant([messageBloquant]);
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

  const afficherMessageBloquant = (): string => {
    let messageBloquant = "";
    if (props.requete.documentDemande.code === CODE_ATTESTATION_PACS) {
      if (props.inscriptions?.length === 0 && props.actes?.length === 0) {
        messageBloquant = getLibelle(
          "Il faut sélectionner au moins un PACS au statut fiche actif"
        );
      } else if (props.actes && props.actes.length > 0) {
        messageBloquant = getLibelle(
          "Votre sélection n'est pas cohérente avec le choix de l'action de réponse"
        );
      }
    }

    if (
      !inscriptionRcRadiation &&
      DocumentDelivrance.estDocumentDemandeDeTypeRc(
        props.requete.documentDemande
      ) &&
      estPresentRcTypeModification(props.inscriptions)
    ) {
      messageBloquant = getLibelle("La radiation n'est pas enregistrée");
    }

    return messageBloquant;
  };

  /////////////////////////////////////
  // Certificat de situation
  /////////////////////////////////////
  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      setOperationEnCours(false);
      const url = receUrl.getUrlApercuTraitementAPartirDe({
        url: history.location.pathname
      });
      replaceUrl(history, url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeliverCertificatSituation, history]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={filtrerListeActionsParDocumentDemande(
          listeActionsFiltreParSousTypes,
          props.requete
        )}
        onSelect={handleDelivrerMenu}
        refs={refs}
      />
      <ConfirmationPopin
        isOpen={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={[boutonsPopin]}
      />
    </>
  );
};
