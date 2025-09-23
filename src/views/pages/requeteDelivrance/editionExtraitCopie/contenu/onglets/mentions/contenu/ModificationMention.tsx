import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { ENatureActe } from "@model/etatcivil/enum/NatureActe";
import { OptionVide, SelectRece } from "@widget/formulaire/champsSaisie/SelectField";
import React from "react";
import { getOptionsMentions } from "../GestionMentionsUtil";

interface ModificationMentionProps {
  natureActe?: keyof typeof ENatureActe;
  mentionSelect?: IMentionAffichage;
  handleChangeSelect: (event: any) => void;
  handleOnBlur: () => void;
  handleChangeTexte: (event: any) => void;
  estExtraitPlurilingue: boolean;
}

export const ModificationMention: React.FC<ModificationMentionProps> = ({
  natureActe,
  mentionSelect,
  handleChangeSelect,
  handleOnBlur,
  handleChangeTexte,
  estExtraitPlurilingue
}) => {
  return (
    <div className="FormMention Modification">
      <h3>{"Modification d'une mention"}</h3>
      <div className="SelectModif">
        <span className="SelectNature">
          <label>{"Nature mention"}</label>
          <SelectRece
            optionVide={OptionVide.NON_PRESENTE}
            options={getOptionsMentions(estExtraitPlurilingue, natureActe)}
            placeholder="Nature sélectionnée"
            value={mentionSelect?.nature?.id ?? ""}
            onChange={handleChangeSelect}
            ariaLabel="Nature sélectionnée"
            onBlur={handleOnBlur}
          />
        </span>
      </div>
      <textarea
        value={mentionSelect?.texte ?? ""}
        onChange={handleChangeTexte}
        aria-label="Texte sélectionné"
        onBlur={handleOnBlur}
      />
    </div>
  );
};
