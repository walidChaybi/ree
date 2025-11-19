import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback, useMemo } from "react";
import { BoutonVerrouillage } from "../../../../../../../common/composant/formulaire/boutons/BoutonVerrouillage";
import { mappingMentionAffichageVersListeItem } from "../../../../../../../common/mapping/mappingMentions";
import { handleCheckBox } from "../GestionMentionsUtil";

interface MentionsCopieProps {
  mentions?: IMentionAffichage[];
  setMentions: (mentions: IMentionAffichage[]) => void;
  estDeverrouille: boolean;
  setEstdeverrouille: (estDeverrouille: boolean) => void;
}

export const MentionsCopie: React.FC<MentionsCopieProps> = props => {
  const mentionsAffichees = useMemo(() => {
    return props.mentions ? props.mentions.filter(el => !el.estSupprimable) : [];
  }, [props.mentions]);

  const handleCheck = useCallback(
    (id: number) => {
      const mentionCochee = mentionsAffichees[id];
      const index = props.mentions ? props.mentions.findIndex(mention => mention.id === mentionCochee.id) : -1;
      handleCheckBox(props.mentions, props.setMentions, index);
    },
    [mentionsAffichees, props.mentions, props.setMentions]
  );

  return (
    <>
      <ListeGlisserDeposer
        afficheDragHandle={true}
        useDragHandle={true}
        liste={mappingMentionAffichageVersListeItem(mentionsAffichees)}
        handleCheckbox={handleCheck}
        deverrouille={props.estDeverrouille}
        libellesSontTitres={false}
      />
      {props.estDeverrouille && (
        <p>
          {"Désélectionner les mentions qui ne doivent pas être éditées"}
          <br />
          {"Un clic sur une ligne inactive la sélection, un autre clic la réactive"}
        </p>
      )}
      {props.mentions && props.mentions.length > 0 && (
        <BoutonVerrouillage
          estVerrouille={!props.estDeverrouille}
          toggleVerrouilllage={() => props.setEstdeverrouille(!props.estDeverrouille)}
          libelle="les mentions de la copie intégrale"
        />
      )}
    </>
  );
};
