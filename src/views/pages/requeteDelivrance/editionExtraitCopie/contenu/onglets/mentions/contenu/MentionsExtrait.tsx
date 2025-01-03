import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { IMentionAffichage } from "@model/etatcivil/acte/mention/IMentionAffichage";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention, MARIAGE, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { Generateur } from "@util/generateur/Generateur";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback } from "react";
import { mappingMentionAffichageVersListeItem } from "../../../../../../../common/mapping/mappingMentions";
import { handleBlur, handleCheckBox, handleReorga, selectionneEtMiseAJour } from "../GestionMentionsUtil";
import { AjoutMention } from "./AjoutMention";
import { ModificationMention } from "./ModificationMention";

export interface SectionModificationMentionProps {
  estExtraitPlurilingue: boolean;
  mentions: IMentionAffichage[];
  mentionSelect?: IMentionAffichage;
  mentionsApi?: IMention[];
  setMentionSelect: any;
  setMentions: any;
  setMentionAjout: any;
  mentionAjout?: IMentionAffichage;
  natureActe?: NatureActe;
}

export const MentionsExtrait: React.FC<SectionModificationMentionProps> = ({
  mentions,
  mentionSelect,
  mentionsApi,
  setMentionSelect,
  setMentions,
  setMentionAjout,
  mentionAjout,
  natureActe,
  estExtraitPlurilingue
}) => {
  const handleOnBlur = useCallback(() => {
    handleBlur(mentions, mentionSelect, mentionsApi, setMentionSelect, setMentions, estExtraitPlurilingue);
  }, [mentions, mentionSelect, mentionsApi, setMentionSelect, setMentions, estExtraitPlurilingue]);

  const handleChangeSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (mentionSelect) {
        const nature = NatureMention.depuisId(event.target.value) as INatureMention;
        const nouvelleMention = { ...mentionSelect, nature };
        setMentionSelect(nouvelleMention);

        const mentionsMiseAJour = [...mentions];
        const indexMention = mentions?.findIndex(el => el.id === mentionSelect?.id);
        mentionsMiseAJour[indexMention].nature = nature;
        if (estExtraitPlurilingue) {
          mentionsMiseAJour[indexMention].texte = Mention.getPlurilingueAPartirTexte(nouvelleMention?.texte, nature);
        }
        setMentions(mentionsMiseAJour);
      }
    },
    [mentionSelect, setMentionSelect, mentions, setMentions, estExtraitPlurilingue]
  );

  const handleChangeTexte = useCallback(
    (event: any) => {
      if (mentionSelect) {
        const temp = { ...mentionSelect };
        temp.texte = event.target.value;
        setMentionSelect(temp);
      }
    },
    [mentionSelect, setMentionSelect]
  );

  const onClickSupprimer = useCallback(
    (index: number) => {
      if (mentions) {
        const temp = [...mentions];
        temp.splice(index, 1);
        setMentions(temp);
      }
    },
    [mentions, setMentions]
  );

  const handleAjoutSelect = useCallback(
    (event: any) => {
      const nature = NatureMention.depuisId(event.target.value) as INatureMention;
      if (!event.target.value) {
        setMentionAjout(undefined);
      } else if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.nature = nature;
        if (estExtraitPlurilingue) {
          temp.texte = texteParDefautPlurilingue(nature);
        }
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: estExtraitPlurilingue ? texteParDefautPlurilingue(nature) : "",
          nature: nature,
          numeroOrdre: getNumeroOrdreMention(mentions),
          estPresent: true,
          estSupprimable: true,
          nouveau: true
        } as IMentionAffichage);
      }
    },
    [mentionAjout, mentions, setMentionAjout, estExtraitPlurilingue]
  );
  const handleAjoutTexte = useCallback(
    (event: any) => {
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.texte = event.target.value;
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: event.target.value,
          nature: { id: null } as unknown as INatureMention,
          numeroOrdre: getNumeroOrdreMention(mentions),
          estPresent: true,
          estSupprimable: true,
          nouveau: true
        } as IMentionAffichage);
      }
    },
    [mentions, mentionAjout, setMentionAjout]
  );

  const handleAjoutMention = useCallback(() => {
    if (mentionAjout) {
      const futurMentionSelect = { ...mentionAjout };
      if (estExtraitPlurilingue) {
        mentionAjout.texte = Mention.getPlurilingueAPartirTexte(mentionAjout.texte, mentionAjout.nature);
      }
      let nouvellesMentions: IMentionAffichage[] = [];
      if (mentions) {
        nouvellesMentions = [...mentions];
      }
      nouvellesMentions.push(mentionAjout);
      nouvellesMentions.forEach((mention, index) => (mention.numeroOrdre = index + 1));
      setMentions(nouvellesMentions);
      setMentionSelect(futurMentionSelect);
      setMentionAjout(undefined);
    }
  }, [mentionAjout, mentions, setMentionSelect, setMentionAjout, setMentions, estExtraitPlurilingue]);

  return (
    <>
      {mentions && mentions.length > 0 && (
        <>
          <ListeGlisserDeposer
            elementSelect={mentionSelect?.id}
            setElementSelect={(
              id // @ts-ignore
            ) => selectionneEtMiseAJour(mentions, mentionSelect, setMentionSelect, id, estExtraitPlurilingue)}
            liste={mappingMentionAffichageVersListeItem(mentions)}
            handleReorga={(oldIndex: number, newIndex: number) => handleReorga(mentions, setMentions, oldIndex, newIndex)}
            handleCheckbox={id => handleCheckBox(mentions, setMentions, id)}
            onClickSupprimer={onClickSupprimer}
            deverrouille={true}
            afficheDragHandle={true}
            useDragHandle={true}
            libellesSontTitres={false}
          />
          <ModificationMention
            natureActe={natureActe}
            mentionSelect={mentionSelect}
            handleChangeSelect={handleChangeSelect}
            handleOnBlur={handleOnBlur}
            handleChangeTexte={handleChangeTexte}
            estExtraitPlurilingue={estExtraitPlurilingue}
          />
        </>
      )}
      <AjoutMention
        natureActe={natureActe}
        mentionAjout={mentionAjout}
        handleAjoutSelect={handleAjoutSelect}
        handleAjoutMention={handleAjoutMention}
        handleAjoutTexte={handleAjoutTexte}
        estExtraitPlurilingue={estExtraitPlurilingue}
      />
    </>
  );
};

function getNumeroOrdreMention(mentions: IMentionAffichage[] | undefined): number {
  return mentions ? mentions.length + 1 : 0;
}

function texteParDefautPlurilingue(natureMention?: NatureMention) {
  if (natureMention === NatureMention.depuisCode(MARIAGE)) {
    return "JJ-MM-AAAA <Lieu événement> <NOM du conjoint> <Prénoms du conjoint>";
  } else {
    return "JJ-MM-AAAA <Lieu événement>";
  }
}
