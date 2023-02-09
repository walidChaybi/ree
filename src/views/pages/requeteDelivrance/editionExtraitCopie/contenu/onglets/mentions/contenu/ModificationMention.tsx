import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { SelectRece } from "@widget/formulaire/champsSaisie/SelectField";
import React from "react";
import { getOptionsMentions } from "../GestionMentionsUtil";

interface ModificationMentionProps {
  natureActe?: NatureActe;
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
      <h3>{getLibelle("Modification d'une mention")}</h3>
      <div className="SelectModif">
        <span className="SelectNature">
          <label>{getLibelle("Nature mention")}</label>
          <SelectRece
            pasPremiereOptionVide={true}
            options={getOptionsMentions(estExtraitPlurilingue, natureActe)}
            label="Nature sélectionnée"
            value={NatureMention.getUuidFromNature(mentionSelect?.nature)}
            onChange={handleChangeSelect}
            aria-label="Nature sélectionnée"
            onBlur={handleOnBlur}
          />
        </span>
      </div>
      <textarea
        value={getValeurOuVide(mentionSelect?.texte)}
        onChange={handleChangeTexte}
        aria-label="Texte sélectionné"
        onBlur={handleOnBlur}
      />
    </div>
  );
};
