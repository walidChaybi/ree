import { getLibelle, UN, ZERO } from "@util/Utils";
import {
  ListeGlisserDeposer,
  ListeItem
} from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import React, { useContext, useState } from "react";
import {
  IMentions,
  MiseAJourMentionsContext
} from "../../ApercuRequeteMiseAJourPage";
import { MiseAJourMentionsForm } from "./form/MiseAJourMentionsForm";


const CARACTERES_MAXIMUM_LIBELLE_LISTE = 300;

const MiseAJourMentions: React.FC = () => {
  const { listeMentions, setListeMentions } = useContext(
    MiseAJourMentionsContext
  );
  const [estPoppinOuverte, setEstPoppinOuverte] = useState<boolean>(false);
  const [itemASupprimer, setItemASupprimer] = useState<number>();

  const libelleTitreFormulaire =
    listeMentions.length === ZERO
      ? getLibelle("Ajout d'une mention")
      : getLibelle("Ajout d'une autre mention");

  function handlePopinSupression(value: boolean, idItem?: number) {
    setItemASupprimer(idItem);
    setEstPoppinOuverte(value);
  }

  function supprimerMention(id?: number) {
    if (id !== undefined) {
      const listeMentionsFiltree = listeMentions
        .filter(mention => {
          return mention.numeroOrdre !== id + UN;
        })
        .map((mention, index) => {
          return {
            ...mention,
            numeroOrdre: Number(index) + UN
          };
        });
      setListeMentions(listeMentionsFiltree);
      setEstPoppinOuverte(false);
      setItemASupprimer(undefined);
    }
  }

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionsFormVersTableauMentions(listeMentions)}
        handleReorga={(indexPrec: number, indexCourant: number) =>
          handleReorga(listeMentions, setListeMentions, indexPrec, indexCourant)
        }
        onClickSupprimer={id => handlePopinSupression(true, id)}
        onClickModifier={() => {
          throw new Error("Function not implemented.");
        }}
        afficheDragHandle={true}
        useDragHandle={false}
        libellesSontTitres={false}
        nombreCaracteresMaximum={CARACTERES_MAXIMUM_LIBELLE_LISTE}
        afficheInfoBulle
      />
      <MiseAJourMentionsForm libelleTitreFormulaire={libelleTitreFormulaire} />
      <ConfirmationPopin
        boutons={[
          {
            label: getLibelle("OK"),
            action: () => {
              supprimerMention(itemASupprimer);
            }
          },
          {
            label: getLibelle("Annuler"),
            action: () => {
              handlePopinSupression(false);
            }
          }
        ]}
        isOpen={estPoppinOuverte}
        messages={[
          `Vous avez demandé la suppression d'une mention.\n\nVoulez-vous continuer ?`
        ]}
      />
    </>
  );
};

export default MiseAJourMentions;

function mappingMentionsFormVersTableauMentions(
  mentions: IMentions[]
): ListeItem[] {
  return mentions.map((mention, index) => {
    return {
      id: `${index}.${mention.typeMention}`,
      estSupprimable: true,
      estModifiable: true,
      checkbox: true,
      libelle: mention.texte
    };
  });
}

function handleReorga(
  mentions: IMentions[] | undefined,
  setMentions: any,
  oldIndex: number,
  newIndex: number
) {
  if (mentions) {
    const newList = [...mentions];
    const item = newList[oldIndex];
    newList.splice(oldIndex, UN);
    newList.splice(newIndex, ZERO, item);
    newList.forEach((el, index) => {
      el.numeroOrdre = index + UN;
    });
    setMentions(newList);
  }
}
