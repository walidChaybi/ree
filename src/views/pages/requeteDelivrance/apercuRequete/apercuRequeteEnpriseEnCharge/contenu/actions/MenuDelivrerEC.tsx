import { IActionOption } from "@model/requete/IActionOption";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { DocumentEC } from "@model/requete/enum/DocumentEC";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { filtrerListeActionsParSousTypes } from "@util/RequetesUtils";
import { estRenseigne } from "@util/Utils";
import { ICreerCourrierECParams, useCreerCourrierEC } from "@views/common/hook/requete/creerCourrierECHook";
import { OperationEnCours } from "@widget/attente/OperationEnCours";
import { GroupeBouton } from "@widget/menu/GroupeBouton";
import { ConfirmationPopin, IBoutonPopin } from "@widget/popin/ConfirmationPopin";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useOptionsCourriersApiHook } from "../../../apercuCourrier/contenu/hook/OptionsCourriersHook";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  compositionCourrierAutomatique,
  controleCoherenceEntreDocumentSelectionneEtActionDelivrer,
  getIdCourrierAuto,
  getOptionsMenuDelivrer,
  redirection
} from "./MenuUtilEC";
import { UpdateChoixDelivranceProps, useUpdateChoixDelivrance } from "./hook/UpdateChoixDelivranceApiHook";

export const MenuDelivrerEC: React.FC<IChoixActionDelivranceProps> = props => {
  const navigate = useNavigate();
  const refs = useRef([]);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [actes, setActes] = useState<ResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<TResultatRMCInscription[] | undefined>();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] = useState<UpdateChoixDelivranceProps>();
  const [courrierEcParams, setCourrierEcParams] = useState<ICreerCourrierECParams>();

  useCreerCourrierEC(courrierEcParams);

  useEffect(() => {
    setInscriptions(props.inscriptions);
    setActes(props.actes);
  }, [props.actes, props.inscriptions]);

  // 1 - Mise à jour du choix delivrance
  const updateChoixDelivranceResultat = useUpdateChoixDelivrance(paramUpdateChoixDelivrance);

  const redirectionCallback = useCallback(
    (index: DocumentEC) => {
      redirection({
        navigate,
        idActe: actes?.[0] ? actes[0].id : "",
        idRequete: updateChoixDelivranceResultat?.idRequete,
        index
      });
    },
    [actes, navigate, updateChoixDelivranceResultat]
  );

  // 2 - Récuperer les options pour la génération du courrier auto
  const options = useOptionsCourriersApiHook(DocumentDelivrance.depuisId(getIdCourrierAuto(choixDelivrance)), props.requete);

  // 2bis - Création des paramètre pour la génération du courrier auto
  useEffect(() => {
    if (
      actes &&
      updateChoixDelivranceResultat?.idRequete &&
      choixDelivrance &&
      options &&
      SousTypeDelivrance.estSousTypeCreationCourrierAutomatique(props.requete.sousType)
    ) {
      const requeteAvecChoixDelivrance = {
        ...props.requete,
        choixDelivrance
      };
      setOperationEnCours(true);
      setCourrierEcParams({
        ...compositionCourrierAutomatique(choixDelivrance, options, props.requete),
        requete: requeteAvecChoixDelivrance,
        idActe: actes[0]?.id,
        handleDocumentEnregistre: redirectionCallback,
        setOperationEnCours
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChoixDelivranceResultat, options]);

  const delivrerOptions: IActionOption[] = getOptionsMenuDelivrer();

  const handleDelivrerMenu = (indexMenu: number) => {
    setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
    controleCoherenceEntreDocumentSelectionneEtActionDelivrer({
      indexMenu,
      actes,
      inscriptions,
      requete: props.requete,
      titulairesActeMap: props.titulairesActe,
      nbTitulairesActeMap: props.nbrTitulairesActe,
      alertesActe: props.alertesActe,
      refs,
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
    if (updateChoixDelivranceResultat?.idRequete && props.requete.sousType === SousTypeDelivrance.RDC) {
      redirectionCallback(DocumentEC.Courrier);
    }
  }, [updateChoixDelivranceResultat, redirectionCallback, props.requete.sousType]);

  const actions = filtrerListeActionsParSousTypes(props.requete, delivrerOptions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Délivrer"}
        listeActions={actions}
        onSelect={handleDelivrerMenu}
        refs={refs}
      />
      <ConfirmationPopin
        estOuvert={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={boutonsPopin}
      />
    </>
  );
};
