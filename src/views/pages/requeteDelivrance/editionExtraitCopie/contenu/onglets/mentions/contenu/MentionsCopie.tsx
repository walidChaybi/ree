import { Warning } from "@material-ui/icons";
import React, { useCallback } from "react";
import { getLibelle } from "../../../../../../../common/util/Utils";
import { ListeGlisserDeposer } from "../../../../../../../common/widget/listeGlisserDeposer/ListeGlisserDeposer";
import {
  handleCheckBox,
  IMentionAffichage,
  mappingVersListe
} from "./../GestionMentionsUtil";

interface MentionsCopieProps {
  mentions?: IMentionAffichage[];
  setMentions: (mentions: IMentionAffichage[]) => void;
  estDeverrouille: boolean;
  setEstdeverrouille: (estDeverrouille: boolean) => void;
}

export const MentionsCopie: React.FC<MentionsCopieProps> = props => {
  const handleCheck = useCallback(
    (id: number) => {
      handleCheckBox(props.mentions, props.setMentions, id);
    },
    [props.mentions, props.setMentions]
  );

  return (
    <>
      <ListeGlisserDeposer
        afficheDragHandle={true}
        useDragHandle={true}
        liste={mappingVersListe(
          props.mentions ? props.mentions.filter(el => !el.aPoubelle) : []
        )}
        handleCheckbox={handleCheck}
        deverrouille={props.estDeverrouille}
        libellesSontTitres={false}
      />

      {props.estDeverrouille && (
        <p>
          {getLibelle(
            "Désélectionner les mentions qui ne doivent pas être éditées"
          )}
          <br />
          {getLibelle(
            "Un clic sur une ligne inactive la sélection, un autre clic la réactive"
          )}
        </p>
      )}
      {props.mentions && props.mentions.length > 0 && (
        <div className="Deverouillage">
          <p>
            <input
              type="checkbox"
              checked={props.estDeverrouille}
              title={getLibelle("Cliquer pour déverrouiller")}
              onChange={() => props.setEstdeverrouille(!props.estDeverrouille)}
            />
            {getLibelle("Déverrouillage des mentions de la copie intégrale")}
          </p>
          <Warning />
        </div>
      )}
    </>
  );
};
