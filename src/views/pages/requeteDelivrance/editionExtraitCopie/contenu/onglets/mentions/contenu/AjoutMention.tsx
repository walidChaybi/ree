import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { getLibelle, getValeurOuVide } from "@util/Utils";
import { SelectRece } from "@widget/formulaire/champsSaisie/SelectField";
import React from "react";
import { getOptionsMentions, IMentionAffichage } from "../GestionMentionsUtil";

interface AjoutMentionProps {
  natureActe?: NatureActe;
  mentionAjout?: IMentionAffichage;
  handleAjoutSelect: (event: any) => void;
  handleAjoutMention: () => void;
  handleAjoutTexte: (event: any) => void;
  estExtraitPlurilingue: boolean;
}

export const AjoutMention: React.FC<AjoutMentionProps> = ({
  natureActe,
  mentionAjout,
  handleAjoutSelect,
  handleAjoutMention,
  handleAjoutTexte,
  estExtraitPlurilingue
}) => {
  return (
    <div className="FormMention Ajout">
      <h3>{getLibelle("Ajout d'une mention")}</h3>
      <div className="SelectAjout">
        <span className="SelectNature">
          <label>{getLibelle("Nature mention")}</label>
          <SelectRece
            options={getOptionsMentions(estExtraitPlurilingue, natureActe)}
            label="Nature ajoutée"
            value={NatureMention.getUuidFromNature(mentionAjout?.nature)}
            onChange={handleAjoutSelect}
          />
        </span>
        <span className="ConteneurBouton">
          <button
            disabled={
              !mentionAjout ||
              mentionAjout.texte === "" ||
              mentionAjout.nature === NatureMention.getEnumFor("")
            }
            onClick={handleAjoutMention}
            title="Ajouter la mention"
          >
            +
          </button>
        </span>
      </div>
      <textarea
        value={getValeurOuVide(mentionAjout?.texte)}
        onChange={handleAjoutTexte}
        placeholder="Texte mention à ajouter"
        disabled={estExtraitPlurilingue && !Boolean(mentionAjout?.nature)}
      />
    </div>
  );
};
