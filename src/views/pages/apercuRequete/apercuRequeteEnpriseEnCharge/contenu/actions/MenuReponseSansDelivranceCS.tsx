import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IReponseSansDelivranceCS } from "../../../../../../model/composition/IReponseSansDelivranceCS";
import { NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE } from "../../../../../../model/composition/IReponseSansDelivranceCSDemandeIncompleteComposition";
import { NOM_DOCUMENT_REFUS_FRANCAIS } from "../../../../../../model/composition/IReponseSansDelivranceCSFrancaisComposition";
import { NOM_DOCUMENT_REFUS_MARIAGE } from "../../../../../../model/composition/IReponseSansDelivranceCSMariageComposition";
import { SousTypeDelivrance } from "../../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../../model/requete/v2/enum/StatutRequete";
import { IActionOption } from "../../../../../../model/requete/v2/IActionOption";
import { IRequeteDelivrance } from "../../../../../../model/requete/v2/IRequeteDelivrance";
import { DoubleSubmitUtil } from "../../../../../common/util/DoubleSubmitUtil";
import { filtrerListeActions } from "../../../../../common/util/RequetesUtils";
import { supprimerNullEtUndefinedDuTableau } from "../../../../../common/util/Utils";
import { OperationEnCours } from "../../../../../common/widget/attente/OperationEnCours";
import { GroupeBouton } from "../../../../../common/widget/menu/GroupeBouton";
import { ConfirmationPopin } from "../../../../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../../../../common/widget/Text";
import { receUrl } from "../../../../../router/ReceUrls";
import { IgnoreRequetePopin } from "../IgnoreRequetePopin";
import { IActionProps } from "./ChoixAction";
import { useReponseSansDelivranceCS } from "./hook/ChoixReponseSansDelivranceCSHook";
import {
  createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete,
  createReponseSansDelivranceCSPourCompositionApiFrancais,
  createReponseSansDelivranceCSPourCompositionApiMariage,
  estSeulementActeMariage
} from "./ReponseSansDelivranceCSFonctions";

export const MenuReponseSansDelivranceCS: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refReponseSansDelivranceCSOptions0 = useRef(null);
  const refReponseSansDelivranceCSOptions1 = useRef(null);
  const refReponseSansDelivranceCSOptions2 = useRef(null);
  const refReponseSansDelivranceCSOptions3 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [reponseSansDelivranceCS, setReponseSansDelivranceCS] =
    useState<IReponseSansDelivranceCS | undefined>();
  const [popinOuverte, setPopinOuverte] = useState<boolean>(false);

  const resultatReponseSansDelivranceCS = useReponseSansDelivranceCS(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseSansDelivranceCS,
    props.requete.id
  );

  useEffect(() => {
    if (resultatReponseSansDelivranceCS) {
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    setOperationEnCours(false);
  }, [resultatReponseSansDelivranceCS, history]);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE = 0;
  const INDEX_ACTION_TRACE_MARIAGE_ACTIF = 1;
  const INDEX_ACTION_RESSORTISSANT_FRANCAIS = 2;
  const INDEX_ACTION_IGNORER_REQUETE = 3;

  const reponseSansDelivranceCSOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE,
      label: getLibelle(
        "Requête incomplète ou illisible, complément d'information nécessaire"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseSansDelivranceCSOptions0
    },
    {
      value: INDEX_ACTION_TRACE_MARIAGE_ACTIF,
      label: getLibelle("Trace d'un mariage actif, courrier de non délivrance"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseSansDelivranceCSOptions1
    },
    {
      value: INDEX_ACTION_RESSORTISSANT_FRANCAIS,
      label: getLibelle(
        "Ressortissant français ou né en France, courrier de non délivrance"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseSansDelivranceCSOptions2
    },
    {
      value: INDEX_ACTION_IGNORER_REQUETE,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseSansDelivranceCSOptions3
    }
  ];

  const handleReponseSansDelivranceCSMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE:
        setOperationEnCours(true);
        const contenuReponseSansDelivranceCSDemandeIncomplete =
          await createReponseSansDelivranceCSPourCompositionApiDemandeIncomplete(
            props.requete as IRequeteDelivrance
          );
        setReponseSansDelivranceCS({
          contenu: contenuReponseSansDelivranceCSDemandeIncomplete,
          fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
        });
        break;
      case INDEX_ACTION_TRACE_MARIAGE_ACTIF:
        const actes = supprimerNullEtUndefinedDuTableau(props.actes);
        const inscriptions = supprimerNullEtUndefinedDuTableau(
          props.inscriptions
        );
        if (!estSeulementActeMariage(props.requete, actes, inscriptions)) {
          setHasMessageBloquant(true);
        } else {
          setOperationEnCours(true);
          const newReponseSansDelivranceCSMariage =
            await createReponseSansDelivranceCSPourCompositionApiMariage(
              props.requete as IRequeteDelivrance,
              actes?.[0]
            );
          setReponseSansDelivranceCS({
            contenu: newReponseSansDelivranceCSMariage,
            fichier: NOM_DOCUMENT_REFUS_MARIAGE
          });
        }
        break;
      case INDEX_ACTION_RESSORTISSANT_FRANCAIS:
        setOperationEnCours(true);
        const newReponseSansDelivranceCSFrancais =
          await createReponseSansDelivranceCSPourCompositionApiFrancais(
            props.requete as IRequeteDelivrance
          );
        setReponseSansDelivranceCS({
          contenu: newReponseSansDelivranceCSFrancais,
          fichier: NOM_DOCUMENT_REFUS_FRANCAIS
        });
        break;
      case INDEX_ACTION_IGNORER_REQUETE:
        setPopinOuverte(true);
        break;
    }
  };

  const resetDoubleSubmit = () => {
    listeActions.forEach(el => {
      DoubleSubmitUtil.remetPossibiliteDoubleSubmit(el.ref?.current);
    });
  };

  const listeActions = filtrerListeActions(
    props.requete as IRequeteDelivrance,
    reponseSansDelivranceCSOptions
  );

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <GroupeBouton
        titre={"Réponse sans délivrance"}
        listeActions={listeActions}
        onSelect={handleReponseSansDelivranceCSMenu}
      />
      <IgnoreRequetePopin
        isOpen={popinOuverte}
        onClosePopin={() => {
          setPopinOuverte(false);
          resetDoubleSubmit();
        }}
        requete={props.requete}
      />
      <ConfirmationPopin
        isOpen={hasMessageBloquant}
        messages={[
          getLibelle(
            "Votre sélection n'est pas cohérente avec le choix de l'action de réponse négative."
          )
        ]}
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              setHasMessageBloquant(false);
              resetDoubleSubmit();
            }
          }
        ]}
      />
    </>
  );
};
