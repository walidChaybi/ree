import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getInformationsFicheActe } from "../../../../../api/appels/etatcivilApi";
import { IReponseNegative } from "../../../../../model/composition/IReponseNegative";
import {
  IReponseNegativeDemandeIncompleteComposition,
  NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE,
  ReponseNegativeDemandeIncompleteComposition
} from "../../../../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import {
  IReponseNegativeFrancaisComposition,
  NOM_DOCUMENT_REFUS_FRANCAIS,
  ReponseNegativeFrancaisComposition
} from "../../../../../model/composition/IReponseNegativeFrancaisComposition";
import {
  IReponseNegativeMariageComposition,
  NOM_DOCUMENT_REFUS_MARIAGE,
  ReponseNegativeMariageComposition
} from "../../../../../model/composition/IReponseNegativeMariageComposition";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { mapActe } from "../../../../common/hook/v2/repertoires/MappingRepertoires";
import messageManager from "../../../../common/util/messageManager";
import { filtrerListeActions } from "../../../../common/util/RequetesUtils";
import { supprimerNullEtUndefinedDuTableau } from "../../../../common/util/Utils";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { ConfirmationPopin } from "../../../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../../../common/widget/Text";
import { receUrl } from "../../../../router/ReceUrls";
import { IActionProps } from "./ChoixAction";
import { useReponseNegative } from "./hook/ChoixReponseNegativeHook";
import { estSeulementActeMariage } from "./VerificationChoixSeulementActeMariage";

export const MenuReponseNegative: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refReponseNegativeOptions0 = useRef(null);
  const refReponseNegativeOptions1 = useRef(null);
  const refReponseNegativeOptions2 = useRef(null);
  const refReponseNegativeOptions3 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [reponseNegative, setReponseNegative] = useState<
    IReponseNegative | undefined
  >();

  const resultatReponseNegative = useReponseNegative(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseNegative,
    props.requete.id
  );

  useEffect(() => {
    if (resultatReponseNegative) {
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    setOperationEnCours(false);
  }, [resultatReponseNegative, history]);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE = 0;
  const INDEX_ACTION_TRACE_MARIAGE_ACTIF = 1;
  const INDEX_ACTION_RESSORTISSANT_FRANCAIS = 2;
  const INDEX_ACTION_IGNORER_REQUETE = 3;

  const reponseNegativeOptions: IActionOption[] = [
    {
      value: INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE,
      label: getLibelle(
        "Requête incomplète ou illisible, complément d'information nécessaire"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions0
    },
    {
      value: INDEX_ACTION_TRACE_MARIAGE_ACTIF,
      label: getLibelle("Trace d'un mariage actif, courrier de non délivrance"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions1
    },
    {
      value: INDEX_ACTION_RESSORTISSANT_FRANCAIS,
      label: getLibelle(
        "Ressortissant français ou né en France, courrier de non délivrance"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions2
    },
    {
      value: INDEX_ACTION_IGNORER_REQUETE,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions3
    }
  ];

  const handleReponseNegativeMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case INDEX_ACTION_REQUETE_INCOMPLETE_ILLISIBLE:
        setOperationEnCours(true);
        const contenuReponseNegativeDemandeIncomplete = await createReponseNegativePourCompositionApiDemandeIncomplete(
          props.requete as IRequeteDelivrance
        );
        setReponseNegative({
          contenu: contenuReponseNegativeDemandeIncomplete,
          fichier: NOM_DOCUMENT_REFUS_DEMANDE_INCOMPLETE
        });
        break;
      case INDEX_ACTION_TRACE_MARIAGE_ACTIF:
        const acteSelected = supprimerNullEtUndefinedDuTableau(
          props.acteSelected
        );
        const inscriptionSelected = supprimerNullEtUndefinedDuTableau(
          props.inscriptionSelected
        );
        if (
          !estSeulementActeMariage(
            props.requete,
            acteSelected,
            inscriptionSelected
          )
        ) {
          setHasMessageBloquant(true);
        } else {
          setOperationEnCours(true);
          const newReponseNegativeMariage = await createReponseNegativePourCompositionApiMariage(
            props.requete as IRequeteDelivrance,
            acteSelected?.[0]
          );
          setReponseNegative({
            contenu: newReponseNegativeMariage,
            fichier: NOM_DOCUMENT_REFUS_MARIAGE
          });
        }
        break;
      case INDEX_ACTION_RESSORTISSANT_FRANCAIS:
        setOperationEnCours(true);
        const newReponseNegativeFrancais = await createReponseNegativePourCompositionApiFrancais(
          props.requete as IRequeteDelivrance
        );
        setReponseNegative({
          contenu: newReponseNegativeFrancais,
          fichier: NOM_DOCUMENT_REFUS_FRANCAIS
        });
        break;
    }
  };

  return (
    <>
      <OperationEnCours
        visible={operationEnCours}
        onTimeoutEnd={() => setOperationEnCours(false)}
        onClick={() => setOperationEnCours(false)}
      />
      <MenuAction
        titre={"Réponse négative"}
        listeActions={filtrerListeActions(
          props.requete as IRequeteDelivrance,
          reponseNegativeOptions
        )}
        onSelect={handleReponseNegativeMenu}
      />
      {hasMessageBloquant === true && (
        <ConfirmationPopin
          isOpen={true}
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
              }
            }
          ]}
        />
      )}
    </>
  );
};

export const createReponseNegativePourCompositionApiDemandeIncomplete = async (
  requete?: IRequeteDelivrance
) => {
  let reponseNegative = {} as IReponseNegativeDemandeIncompleteComposition;
  if (requete && requete.requerant) {
    reponseNegative = ReponseNegativeDemandeIncompleteComposition.creerReponseNegative(
      requete.requerant,
      requete.canal,
      requete.numero
    );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérant pour la requête"
    );
  }

  return reponseNegative;
};

export const createReponseNegativePourCompositionApiMariage = async (
  requete: IRequeteDelivrance,
  acte: IResultatRMCActe | undefined
) => {
  let reponseNegative = {} as IReponseNegativeMariageComposition;
  if (requete && requete.requerant && acte) {
    const infoActe = await getInformationsFicheActe(acte.idActe);
    reponseNegative = ReponseNegativeMariageComposition.creerReponseNegative(
      requete,
      mapActe(infoActe.body.data)
    );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérant pour la requête"
    );
  }

  return reponseNegative;
};

export const createReponseNegativePourCompositionApiFrancais = async (
  requete: IRequeteDelivrance
) => {
  let reponseNegative = {} as IReponseNegativeFrancaisComposition;
  if (requete && requete.requerant) {
    reponseNegative = ReponseNegativeFrancaisComposition.creerReponseNegative(
      requete
    );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérant pour la requête"
    );
  }

  return reponseNegative;
};
