import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";

import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { List, arrayMove } from "react-movable";
import { EEventState, useEventDispatch } from "../../../../../../hooks/EventHook";
import Bouton from "../../../../../commun/bouton/Bouton";
import BoutonIcon from "../../../../../commun/bouton/BoutonIcon";
import ConteneurAvecBordure from "../../../../../commun/conteneurs/formulaire/ConteneurAvecBordure";
import ConteneurModale from "../../../../../commun/conteneurs/modale/ConteneurModale";
import { IMentionEnCours, IMentionMiseAJour, IMiseAJourForm } from "../../../PartieFormulaire";

interface ITableauMentionsProps {
  setAfficherOngletAnalyseMarginale: (afficher: boolean) => void;
  setMotif: (motif: string) => void;
  formulaireMentionEnCoursDeSaisie: boolean;
  donneesMentions: IMentionMiseAJour[];
}

const TableauMentions: React.FC<ITableauMentionsProps> = ({
  setAfficherOngletAnalyseMarginale,
  setMotif,
  formulaireMentionEnCoursDeSaisie,
  donneesMentions
}) => {
  const { setFieldValue, values, submitForm } = useFormikContext<IMiseAJourForm>();
  const [indexASupprimer, setIndexASupprimer] = useState<number | null>(null);
  const { envoyer: modifierMention } = useEventDispatch<IMentionEnCours | null>(EEventState.MODIFIER_MENTION);

  useEffect(() => {
    setFieldValue("mentions", donneesMentions);
  }, [donneesMentions]);

  useEffect(() => {
    const mentionsAffectantAnalyseMarginale: IMentionMiseAJour[] = values.mentions.filter(mention => mention.affecteAnalyseMarginale);

    setAfficherOngletAnalyseMarginale(Boolean(mentionsAffectantAnalyseMarginale.length));

    const motifMention =
      mentionsAffectantAnalyseMarginale.length === 1
        ? `Suite à apposition de mention ${TypeMention.depuisIdTypeMention(mentionsAffectantAnalyseMarginale[0].idTypeMention)?.libelle.split(" ")[0]}`
        : "";

    setMotif(motifMention);

    if (values.mentions !== donneesMentions) submitForm();
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
          <div
            key={props.key}
            {...(() => {
              const { key, ...autres } = props;

              return autres;
            })()}
          >
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
                  aria-label={`Modifier la ${Number(props.key) + 1}${props.key === 0 ? "ère" : "ème"} mention`}
                  onClick={() => {
                    modifierMention({ index: props.key ?? null, mention: value });
                  }}
                  disabled={formulaireMentionEnCoursDeSaisie}
                >
                  <MdEdit aria-hidden />
                </BoutonIcon>

                {values.mentions.length > 1 && (
                  <BoutonIcon
                    title={`Supprimer la ${Number(props.key) + 1}${props.key === 0 ? "ère" : "ème"} mention`}
                    aria-label={`Supprimer la ${Number(props.key) + 1}${props.key === 0 ? "ère" : "ème"} mention`}
                    onClick={() => setIndexASupprimer(props.key ?? null)}
                    disabled={formulaireMentionEnCoursDeSaisie}
                    danger
                  >
                    <MdDelete aria-hidden />
                  </BoutonIcon>
                )}
              </div>
            </div>
          </div>
        )}
        lockVertically
        transitionDuration={150}
        disabled={!values.mentions.length || formulaireMentionEnCoursDeSaisie}
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
                type="submit"
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
    </ConteneurAvecBordure>
  );
};

export default TableauMentions;
