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
  estDeverouille: boolean;
  setEstDeverouille: (estDeverouille: boolean) => void;
}

export const MentionsCopie: React.FC<MentionsCopieProps> = props => {
  const handleCheck = useCallback(
    (id: string) => {
      handleCheckBox(props.mentions, props.setMentions, id);
    },
    [props.mentions, props.setMentions]
  );

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingVersListe(props.mentions ? props.mentions : [])}
        handleCheckbox={handleCheck}
        deverouille={props.estDeverouille}
      />

      {props.estDeverouille && (
        <p>
          {getLibelle(
            "Désélectionner les mentions qui ne doivent pas être éditées"
          )}
          <br />
          {getLibelle(
            "Un clic sur un ligne inactive la sélection, un autre clic la réactive"
          )}
        </p>
      )}
      <div className="Deverouillage">
        <p>
          <input
            type="checkbox"
            checked={props.estDeverouille}
            title={getLibelle("Cliquer pour déverouiller")}
            onChange={() => props.setEstDeverouille(!props.estDeverouille)}
          />
          {getLibelle("Déverouillage des mentions de la copie intégrale")}
        </p>
        <Warning />
      </div>
    </>
  );
};
