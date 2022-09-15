import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { Generateur } from "@util/generateur/Generateur";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import React, { useCallback } from "react";
import {
  handleBlur,
  handleCheckBox,
  handleReorga,
  IMentionAffichage,
  mappingVersListe,
  selectionneEtMiseAJour
} from "../GestionMentionsUtil";
import { AjoutMention } from "./AjoutMention";
import { ModificationMention } from "./ModificationMention";

export interface SectionModificationMentionProps {
  estExtraitPlurilingue: boolean;
  mentions?: IMentionAffichage[];
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
    handleBlur(
      mentions,
      mentionSelect,
      mentionsApi,
      setMentionSelect,
      setMentions,
      estExtraitPlurilingue
    );
  }, [
    mentions,
    mentionSelect,
    mentionsApi,
    setMentionSelect,
    setMentions,
    estExtraitPlurilingue
  ]);

  const handleChangeSelect = useCallback(
    (event: any) => {
      if (mentionSelect) {
        const temp = { ...mentionSelect };
        temp.nature = NatureMention.getEnumFor(event.target.value);
        setMentionSelect(temp);
      }
    },
    [mentionSelect, setMentionSelect]
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
      if (mentionAjout) {
        const temp = { ...mentionAjout };
        temp.nature = NatureMention.getEnumFor(event.target.value);
        setMentionAjout(temp);
      } else {
        setMentionAjout({
          id: Generateur.genereCleUnique(),
          texte: estExtraitPlurilingue
            ? texteParDefautPlurilingue(natureActe)
            : "",
          nature: NatureMention.getEnumFor(event.target.value),
          numeroOrdre: getNumeroOrdreMention(mentions),
          estPresent: true,
          aPoubelle: true,
          nouveau: true
        } as IMentionAffichage);
      }
    },
    [mentionAjout, mentions, setMentionAjout, estExtraitPlurilingue, natureActe]
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
          nature: NatureMention.getEnumFor(""),
          numeroOrdre: getNumeroOrdreMention(mentions),
          estPresent: true,
          aPoubelle: true,
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
        mentionAjout.texte = Mention.getPlurilingueAPartirTexte(
          mentionAjout.texte,
          mentionAjout.nature
        );
      }
      let nouvellesMentions: IMentionAffichage[] = [];
      if (mentions) {
        nouvellesMentions = [...mentions];
      }
      nouvellesMentions.push(mentionAjout);
      nouvellesMentions.forEach(
        (mention, index) => (mention.numeroOrdre = index + 1)
      );
      setMentions(nouvellesMentions);
      setMentionSelect(futurMentionSelect);
      setMentionAjout(undefined);
    }
  }, [
    mentionAjout,
    mentions,
    setMentionSelect,
    setMentionAjout,
    setMentions,
    estExtraitPlurilingue
  ]);

  return (
    <>
      {mentions && mentions.length > 0 && (
        <>
          <ListeGlisserDeposer
            elementSelect={mentionSelect?.id}
            setElementSelect={(
              id // @ts-ignore
            ) =>
              selectionneEtMiseAJour(
                mentions,
                mentionSelect,
                setMentionSelect,
                id
              )
            }
            liste={mappingVersListe(mentions)}
            handleReorga={(oldIndex: number, newIndex: number) =>
              handleReorga(mentions, setMentions, oldIndex, newIndex)
            }
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

function getNumeroOrdreMention(
  mentions: IMentionAffichage[] | undefined
): number {
  return mentions ? mentions.length + 1 : 0;
}

function texteParDefautPlurilingue(natureActe?: NatureActe) {
  if (natureActe === NatureActe.MARIAGE) {
    return "JJ-MM-AA <Lieu événement> <NOM du conjoint> <Prénoms du conjoint>";
  } else {
    return "JJ-MM-AA <Lieu événement>";
  }
}
