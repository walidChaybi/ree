import {
  handleReorga,
  mappingMentionsFormVersTableauMentions
} from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourMentions/MiseAJourMentions";
import { UN, ZERO } from "@util/Utils";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useContext, useState } from "react";
import { T } from "vitest/dist/chunks/environment.0M5R1SX_";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import { MiseAJourMentionsForm } from "./MiseAJourMentionsForm";

const CARACTERES_MAXIMUM_LIBELLE_LISTE = 300;

interface IMiseAJourMentions {
  refFormulaire?: React.MutableRefObject<FormikProps<T & FormikValues> | null>;
}

const MiseAJourMentions: React.FC<IMiseAJourMentions> = ({ refFormulaire }) => {
  const { listeMentions, estMentionEnCoursDeSaisie, indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setIndexMentionModifiee } = useContext(EditionMiseAJourContext.Actions);

  const { setListeMentions } = useContext(EditionMiseAJourContext.Actions);
  const [estPoppinOuverte, setEstPoppinOuverte] = useState<boolean>(false);
  const [itemASupprimer, setItemASupprimer] = useState<number>();

  const getLibelleTitreFormulaire = () => {
    let libelle: string;
    if (indexMentionModifiee !== undefined) {
      libelle = "Modification d'une mention";
    } else {
      libelle = listeMentions.length === ZERO ? "Ajout d'une mention" : "Ajout d'une autre mention";
    }
    return libelle;
  };

  const ouvrirPopinSupression = (value: boolean, idItem?: number) => {
    setItemASupprimer(idItem);
    setEstPoppinOuverte(value);
  };

  const supprimerMention = (id?: number) => {
    if (id === undefined) return;
    const listeMentionsFiltree = listeMentions.reduce(
      (liste, mention) => {
        if (mention.numeroOrdre !== id + UN) {
          liste.push({
            ...mention,
            numeroOrdre: liste.length + UN
          });
        }
        return liste;
      },
      [] as typeof listeMentions
    );
    setListeMentions(listeMentionsFiltree);
    setEstPoppinOuverte(false);
    setItemASupprimer(undefined);
  };

  const onClickModifierMention = (id: number) => setIndexMentionModifiee(id);

  const onClickSupprimerMention = (id: number) => ouvrirPopinSupression(true, id);

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionsFormVersTableauMentions(listeMentions, !estMentionEnCoursDeSaisie)}
        handleReorga={(indexPrec: number, indexCourant: number) => handleReorga(listeMentions, setListeMentions, indexPrec, indexCourant)}
        onClickSupprimer={onClickSupprimerMention}
        onClickModifier={onClickModifierMention}
        afficheDragHandle={!estMentionEnCoursDeSaisie}
        useDragHandle={false}
        libellesSontTitres={false}
        nombreCaracteresMaximum={CARACTERES_MAXIMUM_LIBELLE_LISTE}
        afficheInfoBulle
      />
      <MiseAJourMentionsForm
        libelleTitreFormulaire={getLibelleTitreFormulaire()}
        refFormulaire={refFormulaire}
      />
      <ConfirmationPopin
        boutons={[
          {
            label: "OK",
            action: () => {
              supprimerMention(itemASupprimer);
            }
          },
          {
            label: "Annuler",
            action: () => {
              ouvrirPopinSupression(false);
            }
          }
        ]}
        estOuvert={estPoppinOuverte}
        messages={[`Vous avez demandé la suppression d'une mention.\n\nVoulez-vous continuer ?`]}
      />
    </>
  );
};

export default MiseAJourMentions;
