import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { DocumentDelivrance } from "../../../../../../../model/requete/enum/DocumentDelivrance";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import {
  ICreerCourrierECParam,
  useCreerCourrierEC
} from "../../../../../../common/hook/requete/creerCourrierECHook";
import { filtrerListeActions } from "../../../../../../common/util/RequetesUtils";
import { getUrlPrecedente } from "../../../../../../common/util/route/routeUtil";
import {
  getLibelle,
  supprimerNullEtUndefinedDuTableau
} from "../../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../../common/widget/menu/GroupeBouton";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "../../../../../../common/widget/popin/ConfirmationPopin";
import { PATH_EDITION, receUrl } from "../../../../../../router/ReceUrls";
import { DocumentEC } from "../../../../editionExtraitCopie/enum/DocumentEC";
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
  nonVide,
  sousTypeCreationCourrierAutomatique
} from "./MenuDelivrerUtil";

export const MenuDelivrer: React.FC<IChoixActionDelivranceProps> = props => {
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
  const [courrierEcParams, setCourrierEcParamss] =
    useState<ICreerCourrierECParam>();

  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] =
    useState<UpdateChoixDelivranceProps>();

  useCreerCourrierEC(courrierEcParams);

  const redirection = useCallback(
    (index: DocumentEC) => {
      receUrl.replaceUrl(
        history,
        `${getUrlPrecedente(history.location.pathname)}/${PATH_EDITION}/${
          props.requete.id
        }/${actes?.[0].idActe}`,
        index
      );
    },
    [actes, history, props.requete.id]
  );

  useEffect(() => {
    setInscriptions(
      props.inscriptions
        ? supprimerNullEtUndefinedDuTableau(props.inscriptions)
        : undefined
    );
    setActes(
      props.actes ? supprimerNullEtUndefinedDuTableau(props.actes) : undefined
    );
  }, [props.actes, props.inscriptions]);

  // 1 - Mise à jour du choix delivrance
  const updateChoixDelivranceResultat = useUpdateChoixDelivrance(
    paramUpdateChoixDelivrance
  );

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
      sousTypeCreationCourrierAutomatique(props.requete.sousType)
    ) {
      const requeteAvecChoixDelivrance = { ...props.requete, choixDelivrance };
      setOperationEnCours(true);
      setCourrierEcParamss({
        ...compositionCourrierAutomatique(
          choixDelivrance,
          options,
          props.requete
        ),
        requete: requeteAvecChoixDelivrance,
        idActe: actes[0]?.idActe,
        handleCourrierEnregistre: redirection,
        setOperationEnCours
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateChoixDelivranceResultat, options]);

  const delivrerOptions: IActionOption[] =
    getOptionsMenuDelivrer(refDelivrerOptions0);

  const handleDelivrerMenu = (indexMenu: number) => {
    setChoixDelivrance(delivrerOptions[indexMenu].choixDelivrance);
    controleCoherenceEntreDocumentSelectionneEtActionDelivrer(
      props,
      actes,
      inscriptions,
      indexMenu,
      setBoutonsPopin,
      setMessagesBloquant,
      listeActions
    );
    // La redirection (cf. useEffect) s'effectue uniquement s'il n'y a pas de
    // message bloquant (cf. state) de la part de 'controleCoherenceEntreDocumentSelectionneEtActionDelivrer'
  };

  // Le contrôle de cohérence a eu lieu
  useEffect(() => {
    if (choixDelivrance && messagesBloquant && messagesBloquant.length === 0) {
      // Le contrôle de cohérence a eu lieu et pas de message bloquant
      setOperationEnCours(true);
      // Déclanche le hook de mise à jour du choix de délivrance
      setParamUpdateChoixDelivrance({
        requete: props.requete,
        choixDelivrance
      });
    }
  }, [messagesBloquant, choixDelivrance, props.requete]);

  // La mise à jour du choix de délivrance et du statut ont été effectués (cf.)
  useEffect(() => {
    if (
      updateChoixDelivranceResultat?.idRequete &&
      props.requete.sousType === SousTypeDelivrance.RDC
    ) {
      redirection(DocumentEC.Courrier);
    }
  }, [updateChoixDelivranceResultat, redirection, props.requete.sousType]);

  const listeActions = filtrerListeActions(props.requete, delivrerOptions);

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={getLibelle("Délivrer")}
        listeActions={listeActions}
        onSelect={handleDelivrerMenu}
      />
      {nonVide(messagesBloquant) && (
        <ConfirmationPopin
          isOpen={true}
          // @ts-ignore messagesBloquant est forcément !== undefined
          messages={messagesBloquant}
          boutons={boutonsPopin}
        />
      )}
    </>
  );
};
