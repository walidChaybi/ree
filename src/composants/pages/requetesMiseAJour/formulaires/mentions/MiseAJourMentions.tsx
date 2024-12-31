import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { IMiseAJourMentionsForm } from "@model/form/miseAJour/IMiseAJourMentionsForm";
import {
  handleReorga,
  mappingMentionsFormVersTableauMentions
} from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourMentions/MiseAJourMentions";
import { UN, ZERO } from "@util/Utils";
import { ListeGlisserDeposer } from "@widget/listeGlisserDeposer/ListeGlisserDeposer";
import { ConfirmationPopin } from "@widget/popin/ConfirmationPopin";
import { FormikProps, FormikValues } from "formik";
import React, { useContext, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import Bouton from "../../../../commun/bouton/Bouton";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";
import ChoixTypeMention from "./ChoixTypeMention";
import { MiseAJourMentionsForm } from "./MiseAJourMentionsForm";

const CARACTERES_MAXIMUM_LIBELLE_LISTE = 300;

interface IMiseAJourMentions {
  refFormulaire?: React.MutableRefObject<FormikProps<FormikValues> | null>;
}

export interface IListeTypeMentionSelectionne {
  niveau1: ITypeMention | null;
  niveau2: ITypeMention | null;
  niveau3: ITypeMention | null;
}

export interface ITypesMentionSelectionne {
  typeMention: ITypeMention | null;
  listeTypeMentionAssociee: IListeTypeMentionSelectionne | null;
}

const MiseAJourMentions: React.FC<IMiseAJourMentions> = ({ refFormulaire }) => {
  const { listeMentions, indexMentionModifiee } = useContext(EditionMiseAJourContext.Valeurs);
  const { setIndexMentionModifiee } = useContext(EditionMiseAJourContext.Actions);

  const { setListeMentions } = useContext(EditionMiseAJourContext.Actions);
  const [estPoppinOuverte, setEstPoppinOuverte] = useState<boolean>(false);
  const [itemASupprimer, setItemASupprimer] = useState<number>();
  const [typeMentionSelectionne, setTypeMentionSelectionne] = useState<ITypesMentionSelectionne | null>(null);
  const [afficherModaleAnalyseMarginale, setAfficherModaleAnalyseMarginale] = useState<boolean>(false);
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

  const onClickModifierMention = (id: number) => {
    setIndexMentionModifiee(id);
  };

  const onClickSupprimerMention = (id: number) => ouvrirPopinSupression(true, id);

  const onValidationMention = (values: IMiseAJourMentionsForm | Record<string, any>) => {
    const indexMention = indexMentionModifiee !== undefined ? indexMentionModifiee + UN : Number(listeMentions.length) + UN;

    const nouveauTableauMention = [
      ...listeMentions.filter(mention => mention.numeroOrdre !== indexMention),
      {
        texte: values.texteMention.trim().endsWith(".") ? values.texteMention.trim() : `${values.texteMention.trim()}.`,
        typeMention: {
          idMentionNiveauUn: typeMentionSelectionne?.listeTypeMentionAssociee?.niveau1?.id ?? "",
          idMentionNiveauDeux: typeMentionSelectionne?.listeTypeMentionAssociee?.niveau2?.id ?? "",
          idMentionNiveauTrois: typeMentionSelectionne?.listeTypeMentionAssociee?.niveau3?.id ?? ""
        },
        numeroOrdre: indexMention
      }
    ];
    setListeMentions(nouveauTableauMention.sort((a, b) => a.numeroOrdre - b.numeroOrdre));
    resetSaisieMention();
    typeMentionSelectionne?.typeMention?.affecteAnalyseMarginale && setAfficherModaleAnalyseMarginale(true);
  };

  const resetSaisieMention = () => {
    setTypeMentionSelectionne(null);
    indexMentionModifiee !== undefined && setIndexMentionModifiee(undefined);
  };

  return (
    <>
      <ListeGlisserDeposer
        liste={mappingMentionsFormVersTableauMentions(listeMentions, !typeMentionSelectionne)}
        handleReorga={(indexPrec: number, indexCourant: number) => handleReorga(listeMentions, setListeMentions, indexPrec, indexCourant)}
        onClickSupprimer={onClickSupprimerMention}
        onClickModifier={onClickModifierMention}
        afficheDragHandle={!typeMentionSelectionne}
        useDragHandle={false}
        libellesSontTitres={false}
        nombreCaracteresMaximum={CARACTERES_MAXIMUM_LIBELLE_LISTE}
        afficheInfoBulle
      />
      <h3>{getLibelleTitreFormulaire()}</h3>
      <ChoixTypeMention
        natureActe={NatureActe.NAISSANCE}
        typeMentionSelectionne={typeMentionSelectionne}
        setTypeMentionSelectionne={setTypeMentionSelectionne}
      />
      {typeMentionSelectionne?.typeMention && (
        <MiseAJourMentionsForm
          typeMentionSelectionne={typeMentionSelectionne.typeMention}
          onValidationMention={onValidationMention}
          onResetFormulaire={resetSaisieMention}
          refFormulaire={refFormulaire}
        />
      )}
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

      {afficherModaleAnalyseMarginale && (
        <ConteneurModale>
          <div className="rounded-md border-[2px] border-solid border-bleu-sombre bg-blanc p-6 shadow-lg">
            <div className="p-6">{"Veuillez vérifier s'il y a lieu de mettre à jour l'analyse marginale"}</div>
            <Bouton onClick={() => setAfficherModaleAnalyseMarginale(false)}>{"OK"}</Bouton>
          </div>
        </ConteneurModale>
      )}
    </>
  );
};

export default MiseAJourMentions;
