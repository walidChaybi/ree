import { BoutonVerrouillage } from "@composant/formulaire/boutons/BoutonVerrouillage";
import { getLibelle } from "@util/Utils";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback } from "react";
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
        <BoutonVerrouillage
          estVerrouille={!props.estDeverrouille}
          toggleVerrouilllage={() =>
            props.setEstdeverrouille(!props.estDeverrouille)
          }
          libelle="les mentions de la copie intégrale"
        />
      )}
    </>
  );
};
