import {
  ICreerCourrierECParams,
  useCreerCourrierEC
} from "@hook/requete/creerCourrierECHook";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "@model/requete/IActionOption";
import { IResultatRMCActe } from "@model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "@model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { estRenseigne, getLibelle } from "@util/Utils";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { DocumentEC } from "../../../../../../../model/requete/enum/DocumentEC";
import { useOptionsCourriersApiHook } from "../../../apercuCourrier/contenu/hook/OptionsCourriersHook";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceApiHook";
import {
  compositionCourrierAutomatique,
  controleCoherenceEntreDocumentSelectionneEtActionDelivrer,
  getIdCourrierAuto,
  getOptionsMenuDelivrer,
  redirection
} from "./MenuUtilEC";

export const MenuDelivrerEC: React.FC<IChoixActionDelivranceProps> = props => {
  const history = useHistory();
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] =
    useState<UpdateChoixDelivranceProps>();
  const [courrierEcParams, setCourrierEcParams] =
    useState<ICreerCourrierECParams>();

  useCreerCourrierEC(courrierEcParams);

  useEffect(() => {
    setInscriptions(props.inscriptions);
    setActes(props.actes);
  }, [props.actes, props.inscriptions]);

  // 1 - Mise à jour du choix delivrance
  const updateChoixDelivranceResultat = useUpdateChoixDelivrance(
    paramUpdateChoixDelivrance
  );

  const redirectionCallback = useCallback(
    (index: DocumentEC) => {
      redirection({
        idActe: actes?.[0] ? actes[0].idActe : "",
        idRequete: updateChoixDelivranceResultat?.idRequete,
        history,
        index
      });
    },
    [actes, history, updateChoixDelivranceResultat]
  );

  // 2 - Récuperer les options pour la génération du courrier auto
  const options = useOptionsCourriersApiHook(
    DocumentDelivrance.getDocumentDelivrance(
      getIdCourrierAuto(choixDelivrance)
    ),
    props.requete
  );

  // 2bis - Création des paramètre pour la génération du courrier auto
  useEffect(() => {
    if (
      actes &&
      updateChoixDelivranceResultat?.idRequete &&
      choixDelivrance &&
      options &&
      SousTypeDelivrance.estSousTypeCreationCourrierAutomatique(
        props.requete.sousType
      )
    ) {
      const requeteAvecChoixDelivrance = { ...props.requete, choixDelivrance };
      setOperationEnCours(true);
      setCourrierEcParams({
        ...compositionCourrierAutomatique(
          choixDelivrance,
          options,
          props.requete
        ),
        requete: requeteAvecChoixDelivrance,
        idActe: actes[0]?.idActe,
        handleDocumentEnregistre: redirectionCallback,
        setOperationEnCours
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChoixDelivranceResultat, options]);

  const delivrerOptions: IActionOption[] =
    getOptionsMenuDelivrer(refDelivrerOptions0);

  const handleDelivrerMenu = (indexMenu: number) => {
    setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
    controleCoherenceEntreDocumentSelectionneEtActionDelivrer({
      indexMenu,
      actes,
      inscriptions,
      actions,
      requete: props.requete,
      titulairesActeMap: props.titulairesActe,
      nbTitulairesActeMap: props.nbrTitulairesActe,
      alertesActe: props.alertesActe,
      setBoutonsPopin,
      setMessagesBloquant
    });
    // La redirection (cf. useEffect) s'effectue uniquement si messageBloquant=[] après les contrôles (cf. state)
  };

  // Le contrôle de cohérence a eu lieu
  useEffect(() => {
    if (choixDelivrance && messagesBloquant && messagesBloquant.length === 0) {
      // Pas de message bloquant (messageBloquant=[] quand il a fait les controles & pas d'erreurs, tandis que messageBloquant=undefined quand c'est pas encore fait)
      setOperationEnCours(true);
      setParamUpdateChoixDelivrance({
        requete: props.requete,
        choixDelivrance
      });
    }
  }, [messagesBloquant, choixDelivrance, props.requete]);

  // La mise à jour du choix de délivrance et du statut ont été effectués
  useEffect(() => {
    if (
      updateChoixDelivranceResultat?.idRequete &&
      props.requete.sousType === SousTypeDelivrance.RDC
    ) {
      redirectionCallback(DocumentEC.Courrier);
    }
  }, [
    updateChoixDelivranceResultat,
    redirectionCallback,
    props.requete.sousType
  ]);

  const actions = filtrerListeActionsParSousTypes(
    props.requete,
    delivrerOptions
  );

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={actions}
        onSelect={handleDelivrerMenu}
      />
      <ConfirmationPopin
        isOpen={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={boutonsPopin}
      />
    </>
  );
};
