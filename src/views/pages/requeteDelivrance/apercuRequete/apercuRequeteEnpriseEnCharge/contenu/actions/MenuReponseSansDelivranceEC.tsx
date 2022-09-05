import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChoixDelivrance } from "../../../../../../../model/requete/enum/ChoixDelivrance";
import { SousTypeDelivrance } from "../../../../../../../model/requete/enum/SousTypeDelivrance";
import { IActionOption } from "../../../../../../../model/requete/IActionOption";
import { IResultatRMCActe } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { IResultatRMCInscription } from "../../../../../../../model/rmc/acteInscription/resultat/IResultatRMCInscription";
import { resetDoubleSubmit } from "../../../../../../common/composant/menuTransfert/MenuTransfertUtil";
import { filtrerListeActions } from "../../../../../../common/util/RequetesUtils";
import { estRenseigne, getLibelle } from "../../../../../../common/util/Utils";
import { GroupeBouton } from "../../../../../../common/widget/menu/GroupeBouton";
import {
  ConfirmationPopin,
  IBoutonPopin
} from "../../../../../../common/widget/popin/ConfirmationPopin";
import { DocumentEC } from "../../../../editionExtraitCopie/enum/DocumentEC";
import { IgnoreRequetePopin } from "../IgnoreRequetePopin";
import { IChoixActionDelivranceProps } from "./ChoixAction";
import {
  UpdateChoixDelivranceProps,
  useUpdateChoixDelivrance
} from "./hook/UpdateChoixDelivranceApiHook";
import {
  controleCoherenceEntreDocumentSelectionneEtActionReponseSansDelivrance,
  estChoixIgnorerRequete,
  getOptionsMenuReponseSansDelivrance,
  redirection
} from "./MenuUtilEC";

export const MenuReponseSansDelivranceEC: React.FC<
  IChoixActionDelivranceProps
> = props => {
  const history = useHistory();
  const refReponseSansDelivranceOptions0 = useRef(null);

  const [actes, setActes] = useState<IResultatRMCActe[] | undefined>();
  const [inscriptions, setInscriptions] = useState<
    IResultatRMCInscription[] | undefined
  >();
  const [messagesBloquant, setMessagesBloquant] = useState<string[]>();
  const [boutonsPopin, setBoutonsPopin] = useState<IBoutonPopin[]>();
  const [choixDelivrance, setChoixDelivrance] = useState<ChoixDelivrance>();
  const [paramUpdateChoixDelivrance, setParamUpdateChoixDelivrance] =
    useState<UpdateChoixDelivranceProps>();
  const [popinIgnorerOuverte, setPopinIgnorerOuverte] =
    useState<boolean>(false);

  // 0 - Initialiser inscriptions & actes (en retirant les valeurs falsy)
  useEffect(() => {
    setInscriptions(props.inscriptions?.filter(Boolean));
    setActes(props.actes?.filter(Boolean));
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

  const reponseSansDelivranceOptions: IActionOption[] =
    getOptionsMenuReponseSansDelivrance(refReponseSansDelivranceOptions0);

  const handleReponseSansDelivranceMenu = (indexMenu: number) => {
    //TODO: Avec une seule popin, on pourrait faire estChoixIgnorerRequete() dans controleCoherence
    if (estChoixIgnorerRequete(indexMenu)) setPopinIgnorerOuverte(true);
    else {
      setChoixDelivrance(
        reponseSansDelivranceOptions[indexMenu].choixDelivrance
      );
      controleCoherenceEntreDocumentSelectionneEtActionReponseSansDelivrance({
        actes,
        inscriptions,
        actions,
        requete: props.requete,
        setBoutonsPopin,
        setMessagesBloquant
      });
    }
    // La redirection (cf. useEffect) s'effectue uniquement s'il n'y a pas de
    // message bloquant (cf. state) de la part de 'controleCoherenceEntreDocumentSelectionneEtActionReponseSansDelivrance'
  };

  // Le contrôle de cohérence a eu lieu
  useEffect(() => {
    if (choixDelivrance && messagesBloquant && messagesBloquant.length === 0) {
      // Le contrôle de cohérence a eu lieu et pas de message bloquant
      // Déclenche le hook de mise à jour du choix de délivrance
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
      redirectionCallback(DocumentEC.Courrier);
    }
  }, [
    updateChoixDelivranceResultat,
    redirectionCallback,
    props.requete.sousType
  ]);

  const actions = filtrerListeActions(
    props.requete,
    reponseSansDelivranceOptions
  );

  return (
    <>
      <GroupeBouton
        titre={getLibelle("Réponse sans délivrance")}
        listeActions={actions}
        onSelect={handleReponseSansDelivranceMenu}
      />
      <ConfirmationPopin
        isOpen={estRenseigne(messagesBloquant)}
        messages={messagesBloquant}
        boutons={boutonsPopin}
      />
      {/* TODO: Fusionner les deux popin ? */}
      <IgnoreRequetePopin
        isOpen={popinIgnorerOuverte}
        onClosePopin={() => {
          setPopinIgnorerOuverte(false);
          resetDoubleSubmit(actions);
        }}
        requete={props.requete}
      />
    </>
  );
};
