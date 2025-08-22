import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { SelectRece } from "@widget/formulaire/champsSaisie/SelectField";
import React from "react";
import { MdAdd } from "react-icons/md";
import { getOptionsMentions } from "../GestionMentionsUtil";

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
      <h3>{"Ajout d'une mention"}</h3>
      <div className="SelectAjout">
        <span className="SelectNature">
          <label>{"Nature mention"}</label>
          <SelectRece
            options={getOptionsMentions(estExtraitPlurilingue, natureActe)}
            placeholder="Nature ajoutée"
            value={mentionAjout?.nature?.id ?? ""}
            onChange={handleAjoutSelect}
            ariaLabel="Nature ajoutée"
          />
        </span>
        <span className="ConteneurBouton">
          <button
            disabled={!mentionAjout || mentionAjout.texte === "" || !mentionAjout.nature?.id}
            onClick={handleAjoutMention}
            title="Ajouter la mention"
          >
            <MdAdd />
          </button>
        </span>
      </div>
      <textarea
        value={mentionAjout?.texte ?? ""}
        onChange={handleAjoutTexte}
        placeholder="Texte mention à ajouter"
        disabled={estExtraitPlurilingue && !mentionAjout?.nature}
      />
    </div>
  );
};
