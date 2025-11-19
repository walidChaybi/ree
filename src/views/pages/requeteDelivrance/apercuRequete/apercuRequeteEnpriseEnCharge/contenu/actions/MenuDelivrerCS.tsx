import { IInscriptionRc } from "@model/etatcivil/rcrca/IInscriptionRC";
import { IActionOption } from "@model/requete/IActionOption";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { estRenseigne } from "@util/Utils";
import { reinitialiserOnClick } from "@views/common/composant/menuTransfert/MenuTransfertUtil";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { RECEContextData } from "../../../../../../../contexts/RECEContextProvider";
import LiensRECE from "../../../../../../../router/LiensRECE";
import { INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT } from "../../../../../../../router/infoPages/InfoPagesEspaceDelivrance";
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
  const location = useLocation();
  const navigate = useNavigate();
  const refs = useRef([]);
  const { decrets } = useContext(RECEContextData);

  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [inscriptionRcRadiation, setInscriptionRcRadiation] = useState<IInscriptionRc | undefined>();
  const [inscriptions, setInscriptions] = useState<TResultatRMCInscription[] | undefined>();
  const boutonsPopin = {
    label: "OK",
    action: () => {
      setMessagesBloquant(undefined);
      reinitialiserOnClick(refs);
    }
  };

  useEffect(() => {
    if (props.inscriptions?.length && props.inscriptionsRC?.length && estPresentRcTypeModification(props.inscriptions)) {
      const { inscrptionsRCModification, inscriptionsRCRadiation } = getInscriptionsDeTypeModificationEtRadiation(props.inscriptionsRC);

      if (estMemeNombreDeRCModificationEtRadiation(inscriptionsRCRadiation, inscrptionsRCModification)) {
        const tableauRCRadiationTrier: IInscriptionRc[] = triTableauRCRadiationParDate(inscriptionsRCRadiation);

        setInscriptionRcRadiation(tableauRCRadiationTrier[tableauRCRadiationTrier.length - 1]);
      }
    }
  }, [props.inscriptionsRC, props.inscriptions]);

  const resultDeliverCertificatSituation = useDelivrerCertificatSituationHook(
    props.requete.documentDemande?.code ?? "",
    mappingRequeteDelivranceToRequeteTableau(props.requete),
    inscriptions,
    inscriptionRcRadiation
  );

  const listeActionsFiltreParSousTypes: IActionOption[] = filtrerListeActionsParSousTypes(props.requete, menuDelivrerActions);

  const handleDelivrerMenu = () => {
    const messageBloquant = afficherMessageBloquant();

    if (messageBloquant) {
      setMessagesBloquant([messageBloquant]);
    } else {
      setOperationEnCours(true);
      setInscriptions(props.inscriptions ? props.inscriptions.filter(inscription => inscription !== null) : []);
    }
  };

  const afficherMessageBloquant = (): string => {
    let messageBloquant = "";
    if (props.requete.documentDemande?.code === ECodeDocumentDelivrance.CODE_ATTESTATION_PACS) {
      if (props.inscriptions?.length === 0 && props.actes?.length === 0) {
        messageBloquant = "Il faut sélectionner au moins un PACS au statut fiche actif";
      } else if (props.actes && props.actes.length > 0) {
        messageBloquant = "Votre sélection n'est pas cohérente avec le choix de l'action de réponse";
      }
    }

    if (
      !inscriptionRcRadiation &&
      DocumentDelivrance.estDocumentDemandeDeTypeRc(props.requete.documentDemande) &&
      estPresentRcTypeModification(props.inscriptions)
    ) {
      messageBloquant = "La radiation n'est pas enregistrée";
    }

    return messageBloquant;
  };

  /////////////////////////////////////
  // Certificat de situation
  /////////////////////////////////////
  useEffect(() => {
    if (resultDeliverCertificatSituation) {
      setOperationEnCours(false);
      navigate(LiensRECE.genererLien(INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url, { idRequeteParam: props.requete.id }), {
        replace: true
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeliverCertificatSituation, location, navigate]);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours || !decrets}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Délivrer"}
        listeActions={filtrerListeActionsParDocumentDemande(listeActionsFiltreParSousTypes, props.requete)}
        onSelect={handleDelivrerMenu}
        refs={refs}
      />
      <ConfirmationPopin
        estOuvert={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={[boutonsPopin]}
      />
    </>
  );
};
