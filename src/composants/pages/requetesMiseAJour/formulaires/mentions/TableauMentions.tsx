import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import { EEvent, useEventDispatch, useEventState } from "../../../../../hooks/EventHook";
import Bouton from "../../../../commun/bouton/Bouton";
import BoutonIcon from "../../../../commun/bouton/BoutonIcon";
import ConteneurAvecBordure from "../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import ConteneurModale from "../../../../commun/conteneurs/modale/ConteneurModale";
import { IMentionEnCours, IMiseAJourForm } from "../../PartieFormulaire";

interface ITableauMentionsProps {
  setAfficherOngletAnalyseMarginale: (afficher: boolean, mottf?: string) => void;
}

const formaterTexteMention = (texteMention: string): string =>
  `${texteMention.charAt(0).toUpperCase()}${texteMention.substring(1)}${texteMention.endsWith(".") ? "" : "."}`;

const TableauMentions: React.FC<ITableauMentionsProps> = ({ setAfficherOngletAnalyseMarginale }) => {
  const { setFieldValue, values, setValues, initialValues } = useFormikContext<IMiseAJourForm>();
  const [indexASupprimer, setIndexASupprimer] = useState<number | null>(null);
  const [afficherModaleAnalyseMarginale, setAfficherModaleAnalyseMarginale] = useState<boolean>(false);
  const { envoyer: modifierMention } = useEventDispatch<IMentionEnCours | null>(EEvent.MODIFIER_MENTION);
  const [modificationEnCours, setModificationEnCours] = useState<boolean>(false);
  const [mentionEnCours, setMentionEnCours] = useEventState<IMentionEnCours | null>(EEvent.ENREGISTRER_MENTION, null);

  useEffect(() => {
    if (mentionEnCours === null) {
      return;
    }

    if (!mentionEnCours.mention.texte.length) {
      setMentionEnCours(null);

      return;
    }

    if (mentionEnCours.index === null) {
      setFieldValue("mentions", [
        ...values.mentions,
        { ...mentionEnCours.mention, texte: formaterTexteMention(mentionEnCours.mention.texte) }
      ]);
      setAfficherModaleAnalyseMarginale(
        Boolean(TypeMention.getTypeMentionById(mentionEnCours.mention.idTypeMention)?.affecteAnalyseMarginale)
      );
      setMentionEnCours(null);

      return;
    }

    const modifiee = values.mentions[mentionEnCours.index];
    if (modifiee.idTypeMention !== mentionEnCours.mention.idTypeMention || modifiee.texte !== mentionEnCours.mention.texte) {
      setFieldValue(
        "mentions",
        values.mentions.map((mention, index) =>
          index === mentionEnCours.index
            ? { ...mentionEnCours.mention, texte: formaterTexteMention(mentionEnCours.mention.texte) }
            : mention
        )
      );
    }
    setMentionEnCours(null);
    setModificationEnCours(false);
  }, [mentionEnCours]);

  useEffect(() => {
    let mentionAffectantAnalyseMarginale = null;
    for (let mentionSaisie of values.mentions) {
      const mention = TypeMention.getTypeMentionById(mentionSaisie.idTypeMention);
      if (mention?.affecteAnalyseMarginale) {
        mentionAffectantAnalyseMarginale = mention;
        break;
      }
    }

    if (mentionAffectantAnalyseMarginale && Boolean(values.analyseMarginale.motif)) {
      return;
    }

    const motif = mentionAffectantAnalyseMarginale
      ? `Suite à apposition de mention ${mentionAffectantAnalyseMarginale.libelle.split(" ")[0]}`
      : "";
    setAfficherOngletAnalyseMarginale(Boolean(mentionAffectantAnalyseMarginale), motif);
    motif ? setFieldValue("analyseMarginale.motif", motif) : setValues({ ...values, analyseMarginale: initialValues.analyseMarginale });
  }, [values.mentions]);

  return (
    <ConteneurAvecBordure titreEnTete="Mention(s) ajoutée(s)">
      <List
        values={values.mentions}
        onChange={({ oldIndex, newIndex }) => setFieldValue("mentions", arrayMove(values.mentions, oldIndex, newIndex))}
        renderList={({ children, props }) => (
          <div
            className="grid gap-2 pt-3"
            {...props}
          >
            {values.mentions.length ? children : <span className="text-start text-sm italic">{"Aucune mention ajoutée"}</span>}
          </div>
        )}
        renderItem={({ value, props }) => (
          <div {...props}>
            <div className="flex cursor-move items-center gap-2 rounded-lg border border-solid border-bleu bg-white px-2 py-4 text-start transition-colors hover:bg-bleu-transparent">
              <span
                className="line-clamp-2 flex-grow"
                title={value.texte}
              >
                {value.texte}
              </span>

              <div className="flex gap-3 px-2">
                <BoutonIcon
                  title={`Modifier la ${Number(props.key) + 1}${props.key === 0 ? "ère" : "ème"} mention`}
                  onClick={() => {
                    modifierMention({ index: props.key ?? null, mention: value });
                    setModificationEnCours(true);
                  }}
                  disabled={modificationEnCours}
                >
                  <Edit />
                </BoutonIcon>

                <BoutonIcon
                  title={`Supprimer la ${Number(props.key) + 1}${props.key === 0 ? "ère" : "ème"} mention`}
                  onClick={() => setIndexASupprimer(props.key ?? null)}
                  disabled={modificationEnCours}
                  danger
                >
                  <Delete />
                </BoutonIcon>
              </div>
            </div>
          </div>
        )}
        lockVertically
        transitionDuration={150}
        disabled={!values.mentions.length || modificationEnCours}
      />

      {indexASupprimer !== null && (
        <ConteneurModale fermerModale={() => setIndexASupprimer(null)}>
          <div className="rounded-md border-[2px] border-solid border-bleu-sombre bg-blanc p-6 shadow-lg">
            <div className="p-6 text-center">
              <div>{"Vous avez demandé la suppression d'une mention."}</div>
              <div>{"Voulez-vous continuer ?"}</div>
            </div>

            <div className="flex justify-center gap-6">
              <Bouton
                title="Confirmer la suppression de la mention"
                onClick={() => {
                  const mentions = [...values.mentions];
                  mentions.splice(indexASupprimer, 1);
                  setFieldValue("mentions", mentions);
                  setIndexASupprimer(null);
                }}
              >
                {"OK"}
              </Bouton>

              <Bouton
                title="Annuler la suppression de la mention"
                onClick={() => setIndexASupprimer(null)}
                styleBouton="secondaire"
              >
                {"Annuler"}
              </Bouton>
            </div>
          </div>
        </ConteneurModale>
      )}
      {afficherModaleAnalyseMarginale && (
        <ConteneurModale>
          <div className="rounded-md border-[2px] border-solid border-bleu-sombre bg-blanc p-6 shadow-lg">
            <div className="p-6">{"Veuillez vérifier s'il y a lieu de mettre à jour l'analyse marginale"}</div>
            <Bouton
              title="J'ai lu ce message"
              onClick={() => {
                setAfficherModaleAnalyseMarginale(false);
              }}
            >
              {"OK"}
            </Bouton>
          </div>
        </ConteneurModale>
      )}
    </ConteneurAvecBordure>
  );
};

export default TableauMentions;
