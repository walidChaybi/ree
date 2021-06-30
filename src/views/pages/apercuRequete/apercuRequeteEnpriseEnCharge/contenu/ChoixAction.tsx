import React, { useRef, useState } from "react";
import { ParametresComposition } from "../../../../../model/composition/IParametresComposition";
import { IReponseNegativeDemandeIncomplete } from "../../../../../model/composition/IReponseNegativeDemandeIncomplete";
import { OBJET_COURRIER_CERTIFICAT_SITUATION } from "../../../../../model/composition/Objets";
import { SousTypeDelivrance } from "../../../../../model/requete/v2/enum/SousTypeDelivrance";
import { TRequete } from "../../../../../model/requete/v2/IRequete";
import { IRequeteDelivrance } from "../../../../../model/requete/v2/IRequeteDelivrance";
import messageManager from "../../../../common/util/messageManager";
import { OperationEnCours } from "../../../../common/widget/attente/OperationEnCours";
import {
  IActionOption,
  MenuAction
} from "../../../../common/widget/menu/MenuAction";
import { ConfirmationPopin } from "../../../../common/widget/popin/ConfirmationPopin";
import { getLibelle } from "../../../../common/widget/Text";
import { useReponseNegative } from "./hook/ChoixReponseNegativeHook";
import "./scss/ChoixAction.scss";
import { estSeulementActeMariage } from "./VerificationChoixSeulementActeMariage";

interface IActionProps {
  requete: TRequete;
  selected?: Map<string, string>;
}

export const ChoixAction: React.FC<IActionProps> = props => {
  const refReponseNegativeOptions0 = useRef(null);
  const refReponseNegativeOptions1 = useRef(null);
  const refReponseNegativeOptions2 = useRef(null);
  const refReponseNegativeOptions3 = useRef(null);
  const refDelivrerOptions0 = useRef(null);

  const [operationEnCours, setOperationEnCours] = useState<boolean>(false);
  const [reponseNegative, setReponseNegative] = useState<
    IReponseNegativeDemandeIncomplete | undefined
  >();

  useReponseNegative(reponseNegative, props.requete);

  const [hasMessageBloquant, setHasMessageBloquant] = useState<boolean>(false);

  const delivrerOptions: IActionOption[] = [
    {
      value: 0,
      label: getLibelle("Certificat de situation"),
      sousTypes: [SousTypeDelivrance.RDCSC, SousTypeDelivrance.RDCSD],
      ref: refDelivrerOptions0
    }
  ];

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

  const handleDelivrerMenu = (indexMenu: number) => {
    // todo
  };

  const handleReponseNegativeMenu = async (indexMenu: number) => {
    switch (indexMenu) {
      case 0:
        setOperationEnCours(true);
        const newReponseNegative = await createReponseNegativePourCompositionApi(
          OBJET_COURRIER_CERTIFICAT_SITUATION,
          props.requete as IRequeteDelivrance
        );
        setReponseNegative(newReponseNegative);
        break;
      case 1:
        if (!estSeulementActeMariage(props.requete, props.selected)) {
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
      />
      <div className="bloc-choix-action">
        <div className="panel">Actions</div>
        <MenuAction
          titre={"Délivrer"}
          listeActions={delivrerOptions}
          onSelect={handleDelivrerMenu}
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
      </div>
    </>
  );
};

async function createReponseNegativePourCompositionApi(
  objet: string,
  requete?: IRequeteDelivrance
) {
  const reponseNegative = {} as IReponseNegativeDemandeIncomplete;
  await ParametresComposition.ajoutParametresComposition(reponseNegative);
  if (requete) {
    reponseNegative.objet_courrier = objet;

    if (requete.requerant) {
      reponseNegative.identite_requerant = `${requete.requerant.nomFamille} ${requete.requerant.prenom}`;

      if (requete.requerant.adresse) {
        reponseNegative.adresse_requerant = {
          ligne2: requete.requerant.adresse.ligne2,
          ligne3: requete.requerant.adresse.ligne3,
          ligne4: requete.requerant.adresse.ligne4,
          ligne5: requete.requerant.adresse.ligne5,
          ligne6: requete.requerant.adresse.codePostal,
          ligne7: requete.requerant.adresse.ville
        };
      }
    } else {
      messageManager.showErrorAndClose(
        "Erreur inattendue: Pas de requérent pour la requête"
      );
    }
  }
  return reponseNegative;
}
