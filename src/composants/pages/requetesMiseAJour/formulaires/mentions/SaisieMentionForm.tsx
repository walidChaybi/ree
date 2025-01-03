import { CONFIG_GET_METAMODELE_TYPE_MENTION } from "@api/configurations/requete/miseAJour/GetMetamodeleTypeMentionConfigApi";
import { TEXTE_MENTION } from "@composant/formulaire/ConstantesNomsForm";
import { IMetamodeleTypeMention } from "@model/etatcivil/acte/mention/IMetaModeleTypeMention";
import { ITypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { logError } from "@util/LogManager";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { IconErrorMessage } from "@widget/formulaire/erreur/IconeErreurMessage";
import { useFormikContext } from "formik";
import { useContext, useEffect, useState } from "react";
import { EditionMiseAJourContext } from "../../../../../contexts/EditionMiseAJourContextProvider";
import useFetchApi from "../../../../../hooks/api/FetchApiHook";
import ChampsZoneTexte from "../../../../commun/champs/ChampsZoneTexte";
import AideALaSaisieMention from "./AideALaSaisieMentionForm";
import { IListeTypeMentionSelectionne } from "./AjoutMentionsMiseAJour";
import "./scss/MiseAJourMentionsForm.scss";

export interface IListesTypesMentionForm {
  typeMentionSelectionne: ITypeMention | null;
  typesMentionsAModifier?: IListeTypeMentionSelectionne;
}

const SaisieMentionForm: React.FC<IListesTypesMentionForm> = ({ typeMentionSelectionne }) => {
  const { metamodeleTypeMention, indexMentionModifiee, listeMentions } = useContext(EditionMiseAJourContext.Valeurs);
  const { setMetamodeleTypeMention } = useContext(EditionMiseAJourContext.Actions);

  const { setFieldValue } = useFormikContext<IListesTypesMentionForm>();
  const { appelApi: appelApiGetMetamodeleTypeMention } = useFetchApi(CONFIG_GET_METAMODELE_TYPE_MENTION);

  const [aideALaSaisieDisponible, setAideALaSaisieDisponible] = useState<boolean>(); // TODO-REFACTO : à retirer lorsque les aides à la saisies sans metamodeles auront la valeur aideSaisieAssistee = false

  useEffect(() => {
    setMetamodeleTypeMention(undefined);
    typeMentionSelectionne?.estSaisieAssistee &&
      appelApiGetMetamodeleTypeMention({
        parametres: { path: { idTypeMention: typeMentionSelectionne.id } },
        apresSucces: (metamodele: IMetamodeleTypeMention) => {
          setMetamodeleTypeMention(metamodele);
          setAideALaSaisieDisponible(false); // TODO-REFACTO : à retirer lorsque les aides à la saisies sans metamodeles auront la valeur aideSaisieAssistee = false
        },
        apresErreur: erreurs => {
          setAideALaSaisieDisponible(true); // TODO-REFACTO : à retirer lorsque les aides à la saisies sans metamodeles auront la valeur aideSaisieAssistee = false
          logError({
            messageUtilisateur: "Impossible de récupérer les metamodeles",
            error: erreurs[0]
          });
        }
      });
  }, [typeMentionSelectionne]);

  useEffect(() => {
    if (indexMentionModifiee === undefined || !listeMentions[indexMentionModifiee]) return;
    setFieldValue(TEXTE_MENTION, listeMentions[indexMentionModifiee].texte, false);
  }, [indexMentionModifiee]);

  return (
    <div className="ListesTypesMentionForm">
      {typeMentionSelectionne &&
        (gestionnaireFeatureFlag.estActif(FeatureFlag.FF_AIDE_A_LA_SAISIE_MENTION) &&
        typeMentionSelectionne.estSaisieAssistee &&
        !aideALaSaisieDisponible ? ( // TODO-REFACTO : à retirer lorsque les aides à la saisies sans metamodeles auront la valeur aideSaisieAssistee = false
          metamodeleTypeMention && <AideALaSaisieMention />
        ) : (
          <div className="selectFieldMentions">
            {aideALaSaisieDisponible && (
              <div className="my-4 text-bleu">
                <IconErrorMessage /> L'aide à la saisie n'est pas encore disponible pour ce type de mention
              </div> // TODO-REFACTO : à retirer lorsque les aides à la saisies sans metamodeles auront la valeur aideSaisieAssistee = false
            )}
            <div className="flex w-full justify-center pt-2">
              <div className="w-3/4">
                <ChampsZoneTexte
                  name={TEXTE_MENTION}
                  className="h-48 w-full"
                  placeholder="Texte mention à ajouter"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SaisieMentionForm;
