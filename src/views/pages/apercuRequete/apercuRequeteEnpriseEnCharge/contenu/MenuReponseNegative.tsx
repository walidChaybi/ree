import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getInformationsFicheActe } from "../../../../../api/appels/etatcivilApi";
import {
  IReponseNegativeDemandeIncompleteComposition,
  ReponseNegativeDemandeIncompleteComposition
} from "../../../../../model/composition/IReponseNegativeDemandeIncompleteComposition";
import {
  IReponseNegativeMariageComposition,
  ReponseNegativeMariageComposition
} from "../../../../../model/composition/IReponseNegativeMariageComposition";
import { OBJET_COURRIER_CERTIFICAT_SITUATION } from "../../../../../model/composition/ObjetsComposition";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { StatutRequete } from "../../../../../model/requete/v2/enum/StatutRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import { IResultatRMCActe } from "../../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { mapActe } from "../../../../common/hook/v2/repertoires/MappingRepertoires";
import messageManager from "../../../../common/util/messageManager";
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
import { useReponseNegativeDemandeIncomplete } from "./hook/ChoixReponseNegativeDemandeIncompleteHook";
import { useReponseNegativeMariage } from "./hook/ChoixReponseNegativeMariageHook";
import { estSeulementActeMariage } from "./VerificationChoixSeulementActeMariage";

export const MenuReponseNegative: React.FC<IActionProps> = props => {
  const history = useHistory();

  const refReponseNegativeOptions0 = useRef(null);
  const refReponseNegativeOptions1 = useRef(null);
  const refReponseNegativeOptions2 = useRef(null);
  const refReponseNegativeOptions3 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [
    reponseNegativeDemandeIncomplete,
    setReponseNegativeDemandeIncomplete
  ] = useState<IReponseNegativeDemandeIncompleteComposition | undefined>();
  const [reponseNegativeMariage, setReponseNegativeMariage] =
    useState<IReponseNegativeMariageComposition | undefined>();

  const resultatReponseNegativeDemandeIncomplete =
    useReponseNegativeDemandeIncomplete(
      StatutRequete.A_VALIDER.libelle,
      StatutRequete.A_VALIDER,
      reponseNegativeDemandeIncomplete,
      props.requete.id
    );

  const resultatReponseNegativeMariage = useReponseNegativeMariage(
    StatutRequete.A_VALIDER.libelle,
    StatutRequete.A_VALIDER,
    reponseNegativeMariage,
    props.requete.id
  );

  useEffect(() => {
    if (
      resultatReponseNegativeMariage ||
      resultatReponseNegativeDemandeIncomplete
    ) {
      const url = receUrl.getUrlApercuTraitementAPartirDe(
        history.location.pathname
      );
      receUrl.replaceUrl(history, url);
    }
    setOperationEnCours(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resultatReponseNegativeDemandeIncomplete,
    resultatReponseNegativeMariage,
    history
  ]);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const reponseNegativeOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle(
        "Requête incomplète ou illisible, complément d'information nécessaire"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions0
    },
    {
      value: 1,
      label: getLibelle("Trace d'un mariage actif, courrier de non délivrance"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions1
    },
    {
      value: 2,
      label: getLibelle(
        "Ressortissant français ou né en France, courrier de non délivrance"
      ),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions2
    },
    {
      value: 3,
      label: getLibelle("Ignorer la requête (fin du traitement)"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refReponseNegativeOptions3
    }
  ];

  const handleReponseNegativeMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case 0:
        setOperationEnCours(true);
        const newReponseNegativeDemandeIncomplete =
          await createReponseNegativePourCompositionApiDemandeIncomplete(
            OBJET_COURRIER_CERTIFICAT_SITUATION,
            props.requete as IRequeteDelivrance
          );
        setReponseNegativeDemandeIncomplete(
          newReponseNegativeDemandeIncomplete
        );
        break;
      case 1:
        const acteSelected = supprimerNullEtUndefinedDuTableau(
          props.acteSelected
        );
        if (
          acteSelected &&
          estSeulementActeMariage(props.requete, acteSelected)
        ) {
          setOperationEnCours(true);
          const newReponseNegativeMariage =
            await createReponseNegativePourCompositionApiMariage(
              props.requete as IRequeteDelivrance,
              acteSelected[0]
            );
          setReponseNegativeMariage(newReponseNegativeMariage);
        } else if (
          !estSeulementActeMariage(
            props.requete,
            supprimerNullEtUndefinedDuTableau(props.acteSelected)
          ) ||
          props.inscriptionSelected?.length !== 0
        ) {
          setHasMessageBloquant(true);
        }
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
        listeActions={reponseNegativeOptions.filter(r => {
          const requete = props.requete as IRequeteDelivrance;
          return r.sousTypes
            ? r.sousTypes.find(st => st === requete?.sousType) != null
            : true;
        })}
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

async function createReponseNegativePourCompositionApiDemandeIncomplete(
  objet: string,
  requete?: IRequeteDelivrance
) {
  let reponseNegative = {} as IReponseNegativeDemandeIncompleteComposition;
  if (requete && requete.requerant) {
    reponseNegative =
      ReponseNegativeDemandeIncompleteComposition.creerReponseNegative(
        objet,
        requete.requerant,
        requete.numero
      );
  } else {
    messageManager.showErrorAndClose(
      "Erreur inattendue: Pas de requérant pour la requête"
    );
  }

  return reponseNegative;
}

export async function createReponseNegativePourCompositionApiMariage(
  requete: IRequeteDelivrance,
  acte: IResultatRMCActe | undefined
) {
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
}
